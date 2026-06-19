// Client-side logo asset generation. Takes the purchased logo PNG (a data-URL)
// and produces the various deliverables the dashboard offers — transparent /
// white-background PNGs, black & white colour variations, a square social
// image, a favicon, an SVG wrapper, a PDF, a palette .txt and a licence PDF.
//
// The source is a raster PNG, so "SVG/EPS/PDF" embed that raster (they are
// valid files, not hand-traced vectors). Everything runs in the browser.

export interface PaletteColor {
  name?: string
  hex?: string
  desc?: string
}

// Soft band for anti-aliased white removal: pixels whose darkest channel is
// >= WHITE_HI are fully dropped; between WHITE_LO and WHITE_HI they fade out
// (partial alpha) so edges stay smooth instead of jagged/stair-stepped.
const WHITE_LO = 238
const WHITE_HI = 252

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function makeCanvas(w: number, h: number) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return c
}

function canvasToBlob(canvas: HTMLCanvasElement, type = 'image/png'): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), type),
  )
}

// Draw the source and return its ImageData for pixel work.
async function getPixels(src: string) {
  const img = await loadImage(src)
  const w = img.naturalWidth || 1024
  const h = img.naturalHeight || 1024
  const canvas = makeCanvas(w, h)
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0)
  return { ctx, canvas, data: ctx.getImageData(0, 0, w, h), w, h }
}

// Alpha below this in the final cutout is treated as stray fringe/glow and
// dropped to fully transparent — kills the faint halo that otherwise shows as a
// glow on dark backgrounds, without touching the solid logo or its real edge.
const ALPHA_FLOOR = 26

// White/near-white background -> transparent. Fast, exact, no dependencies —
// but it also deletes any white *inside* the logo (punching holes) and only
// works on white backgrounds. Used as the dependable fallback for the AI path.
export async function transparentPng(src: string): Promise<Blob> {
  const { ctx, canvas, data } = await getPixels(src)
  const px = data.data
  for (let i = 0; i < px.length; i += 4) {
    const m = Math.min(px[i], px[i + 1], px[i + 2]) // darkest channel
    if (m >= WHITE_HI) {
      px[i + 3] = 0
    } else if (m > WHITE_LO) {
      // Feather the near-white edge: fade alpha across the soft band.
      const fade = 1 - (m - WHITE_LO) / (WHITE_HI - WHITE_LO)
      px[i + 3] = Math.round(px[i + 3] * fade)
    }
    if (px[i + 3] < ALPHA_FLOOR) px[i + 3] = 0 // drop fringe
  }
  ctx.putImageData(data, 0, 0)
  return canvasToBlob(canvas)
}

// Drop near-transparent fringe pixels (a soft halo / glow) to fully clear. Used
// to clean the AI cutout, whose mask can leave a faint matte around the logo.
async function defringe(blob: Blob): Promise<Blob> {
  try {
    const dataUrl = await blobToDataUrl(blob)
    const img = await loadImage(dataUrl)
    const w = img.naturalWidth || 1024
    const h = img.naturalHeight || 1024
    const canvas = makeCanvas(w, h)
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, 0, 0)
    const data = ctx.getImageData(0, 0, w, h)
    const px = data.data
    for (let i = 0; i < px.length; i += 4) {
      if (px[i + 3] < ALPHA_FLOOR) px[i + 3] = 0
    }
    ctx.putImageData(data, 0, 0)
    return await canvasToBlob(canvas)
  } catch {
    return blob // never fail the download over a cosmetic cleanup
  }
}

// ── Option A: AI background removal ──────────────────────────────────────────
// @imgly/background-removal runs a real segmentation model (U²-Net) in the
// browser. Unlike the threshold method it keeps white *inside* the logo and
// copes with non-white backgrounds. The model is several MB, so it is lazily
// imported only when first needed and cached. Returns null on ANY failure so
// callers transparently fall back to the threshold method.
async function removeBgAI(src: string): Promise<Blob | null> {
  try {
    const { removeBackground } = await import('@imgly/background-removal')
    const out = await removeBackground(src)
    // Guard against an empty/odd result.
    return out && out.size > 0 ? out : null
  } catch {
    return null
  }
}

// One-shot cache: a single "Download all" triggers several conversions off the
// same source logo; without this each would re-run the multi-second AI model.
let bgCache: { src: string; blob: Blob } | null = null

// Best-effort transparent PNG: AI segmentation first, fast threshold fallback.
// This is what the user-facing "PNG — transparent" and "Full color" exports use.
export async function transparentPngBest(src: string): Promise<Blob> {
  if (bgCache && bgCache.src === src) return bgCache.blob
  const ai = await removeBgAI(src)
  // AI result gets a defringe pass to remove the soft halo; the threshold path
  // already floors its own alpha inline.
  const blob = ai ? await defringe(ai) : await transparentPng(src)
  bgCache = { src, blob }
  return blob
}

// Flatten onto a solid white background.
export async function whiteBgPng(src: string): Promise<Blob> {
  const img = await loadImage(src)
  const w = img.naturalWidth || 1024
  const h = img.naturalHeight || 1024
  const canvas = makeCanvas(w, h)
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, w, h)
  ctx.drawImage(img, 0, 0)
  return canvasToBlob(canvas)
}

// Recolour every non-background pixel to a single solid colour, keeping the
// shape's anti-aliased alpha. Used for the all-black / all-white variations.
export async function monoPng(src: string, color: 'black' | 'white'): Promise<Blob> {
  const { ctx, canvas, data } = await getPixels(src)
  const px = data.data
  const v = color === 'black' ? 0 : 255
  for (let i = 0; i < px.length; i += 4) {
    const m = Math.min(px[i], px[i + 1], px[i + 2]) // darkest channel
    if (m >= WHITE_HI) {
      px[i + 3] = 0
    } else {
      // Recolour every shape pixel; feather near-white edges so the silhouette
      // keeps smooth anti-aliased edges instead of a hard, jagged outline.
      if (m > WHITE_LO) {
        const fade = 1 - (m - WHITE_LO) / (WHITE_HI - WHITE_LO)
        px[i + 3] = Math.round(px[i + 3] * fade)
      }
      px[i] = v
      px[i + 1] = v
      px[i + 2] = v
    }
  }
  ctx.putImageData(data, 0, 0)
  return canvasToBlob(canvas)
}

// The content rectangle of a transparent image. When `markOnly` is set and the
// logo is a vertical stack (a symbol above the brand-name text, separated by a
// gap of empty rows), it returns just the TOP symbol band — so a favicon shows
// the recognisable mark instead of an unreadable squished wordmark. Falls back
// to the full content box when there's no clear split (icon-only or side-by-side
// layouts).
function contentRegion(
  data: ImageData,
  markOnly: boolean,
): { x: number; y: number; w: number; h: number } {
  const { width: W, height: H, data: px } = data
  const A = 24 // alpha above this = real content (ignore faint anti-alias dust)
  const rowHas = new Array<boolean>(H).fill(false)
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (px[(y * W + x) * 4 + 3] > A) {
        rowHas[y] = true
        break
      }
    }
  }
  let top = 0
  while (top < H && !rowHas[top]) top++
  let bot = H - 1
  while (bot >= 0 && !rowHas[bot]) bot--
  if (bot < top) return { x: 0, y: 0, w: W, h: H } // empty → whole frame

  let yTop = top
  let yBot = bot
  if (markOnly) {
    // First contiguous content band from the top.
    let bandEnd = top
    while (bandEnd <= bot && rowHas[bandEnd]) bandEnd++
    // Size of the gap that follows, and whether more content (text) sits below.
    let gapEnd = bandEnd
    while (gapEnd <= bot && !rowHas[gapEnd]) gapEnd++
    const gap = gapEnd - bandEnd
    const bandH = bandEnd - top
    const GAP_MIN = Math.max(4, Math.round(H * 0.02))
    // Only split if there's a real gap, real content below it, and the top band
    // is a meaningful chunk (not a stray speck).
    if (gapEnd <= bot && gap >= GAP_MIN && bandH >= H * 0.06) {
      yTop = top
      yBot = bandEnd - 1
    }
  }

  // Horizontal bounds for the chosen vertical range.
  let minX = W
  let maxX = -1
  for (let y = yTop; y <= yBot; y++) {
    for (let x = 0; x < W; x++) {
      if (px[(y * W + x) * 4 + 3] > A) {
        if (x < minX) minX = x
        if (x > maxX) maxX = x
      }
    }
  }
  if (maxX < 0) return { x: 0, y: top, w: W, h: bot - top + 1 }
  return { x: minX, y: yTop, w: maxX - minX + 1, h: yBot - yTop + 1 }
}

// Centre the (background-removed) logo on a square canvas, trimmed to its
// content so it fills the frame. bg=null => transparent. `markOnly` isolates the
// symbol for favicons. Uses the AI cutout + high-quality scaling for crisp,
// smooth edges.
export async function squarePng(
  src: string,
  size: number,
  bg: string | null,
  markOnly = false,
): Promise<Blob> {
  const transparent = await transparentPngBest(src)
  const dataUrl = await blobToDataUrl(transparent)
  const img = await loadImage(dataUrl)
  const W = img.naturalWidth || 1024
  const H = img.naturalHeight || 1024

  // Read pixels once to find the region to crop to.
  const probe = makeCanvas(W, H)
  const pctx = probe.getContext('2d')!
  pctx.drawImage(img, 0, 0)
  const region = contentRegion(pctx.getImageData(0, 0, W, H), markOnly)

  const canvas = makeCanvas(size, size)
  const ctx = canvas.getContext('2d')!
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  if (bg) {
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, size, size)
  }
  const pad = size * (markOnly ? 0.08 : 0.1)
  const max = size - pad * 2
  const scale = Math.min(max / region.w, max / region.h)
  const dw = region.w * scale
  const dh = region.h * scale
  ctx.drawImage(img, region.x, region.y, region.w, region.h, (size - dw) / 2, (size - dh) / 2, dw, dh)
  return canvasToBlob(canvas)
}

// Wrap a square PNG blob into a real .ico file. ICO can embed PNG data
// directly (PNG-in-ICO), which every modern browser and Windows reads, so we
// store one 256×256 PNG entry. This is what browsers actually load as a
// favicon — the bare PNG the tile used to hand back was not a usable icon file.
async function pngToIco(png: Blob): Promise<Blob> {
  const data = new Uint8Array(await png.arrayBuffer())
  const header = new Uint8Array(22) // 6-byte ICONDIR + one 16-byte ICONDIRENTRY
  const dv = new DataView(header.buffer)
  dv.setUint16(0, 0, true) // reserved
  dv.setUint16(2, 1, true) // type: 1 = icon
  dv.setUint16(4, 1, true) // image count
  header[6] = 0 // width  (0 means 256)
  header[7] = 0 // height (0 means 256)
  header[8] = 0 // colour-palette count
  header[9] = 0 // reserved
  dv.setUint16(10, 1, true) // colour planes
  dv.setUint16(12, 32, true) // bits per pixel
  dv.setUint32(14, data.length, true) // size of PNG data
  dv.setUint32(18, 22, true) // offset to PNG data
  const out = new Uint8Array(22 + data.length)
  out.set(header, 0)
  out.set(data, 22)
  return new Blob([out], { type: 'image/x-icon' })
}

// The favicon deliverables: a real .ico (256×256 PNG-in-ICO) plus a 512px PNG.
// Matches the tile's ".ico + 512px PNG" label. Both have a transparent
// background so the icon sits cleanly on any browser-tab colour.
export async function faviconFiles(
  src: string,
  brand: string,
): Promise<{ files: { filename: string; blob: Blob }[] }> {
  const safe = brand.replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase() || 'logo'
  // markOnly=true → favicon shows the symbol, not the unreadable wordmark.
  const png512 = await squarePng(src, 512, null, true)
  const png256 = await squarePng(src, 256, null, true)
  const ico = await pngToIco(png256)
  return {
    files: [
      { filename: `${safe}-favicon.ico`, blob: ico },
      { filename: `${safe}-favicon-512.png`, blob: png512 },
    ],
  }
}

// Wrap an already-transparent PNG blob in a valid SVG container (embedded
// raster). Shared by svgWrap and the colour-variation exports so the SVG
// carries the SAME colours as its paired PNG (full colour, black, or white).
async function svgFromTransparent(transparent: Blob): Promise<Blob> {
  const dataUrl = await blobToDataUrl(transparent)
  const img = await loadImage(dataUrl)
  const w = img.naturalWidth || 1024
  const h = img.naturalHeight || 1024
  // Provide BOTH href (SVG2 / modern viewers) and xlink:href (older viewers) so
  // the embedded image renders everywhere, not just in browsers.
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <image width="${w}" height="${h}" href="${dataUrl}" xlink:href="${dataUrl}"/>
</svg>`
  return new Blob([svg], { type: 'image/svg+xml' })
}

// ── Option B: true vectorization ─────────────────────────────────────────────
// imagetracerjs converts a raster into REAL <path> vector art (not an embedded
// image), so the SVG is infinitely scalable and editable in design tools. We
// trace at a reduced resolution for speed/size — the vector output scales to
// any size regardless. `colorMode: 'mono'` traces a single-colour silhouette
// (for the black/white variants); 'color' keeps the logo's colours. Returns
// null on any failure so callers fall back to the embedded-raster SVG.
// `forceColor` (e.g. '#101010' or '#ffffff') repaints every traced shape that
// single colour — used for the black/white variations. We always trace the
// full-COLOUR transparent image (good geometry) and recolour afterwards, rather
// than tracing a pre-recoloured PNG: a black-on-transparent PNG shares the same
// RGB as its transparent background, which confuses the tracer into a blank SVG.
async function tracedSvg(pngBlob: Blob, forceColor?: string): Promise<Blob | null> {
  try {
    const ImageTracer = (await import('imagetracerjs')).default
    const dataUrl = await blobToDataUrl(pngBlob)
    const img = await loadImage(dataUrl)
    const TRACE_MAX = 1000
    const ow = img.naturalWidth || 1024
    const oh = img.naturalHeight || 1024
    const scale = Math.min(1, TRACE_MAX / Math.max(ow, oh))
    const w = Math.max(1, Math.round(ow * scale))
    const h = Math.max(1, Math.round(oh * scale))
    const canvas = makeCanvas(w, h)
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, 0, 0, w, h)
    const imgd = ctx.getImageData(0, 0, w, h)
    const options: Record<string, number | boolean> = { numberofcolors: 16, colorquantcycles: 3, pathomit: 4, ltres: 1, qtres: 1 }
    let svg = ImageTracer.imagedataToSVG(imgd, options)
    if (!svg || !svg.includes('<path')) return null
    if (forceColor) {
      // Repaint every fill/stroke the target colour; the per-path opacity (0 for
      // the transparent background, 1 for shapes) is preserved, so the result is
      // a clean single-colour silhouette with smooth edges.
      svg = svg
        .replace(/fill="rgb\([^)]*\)"/g, `fill="${forceColor}"`)
        .replace(/stroke="rgb\([^)]*\)"/g, `stroke="${forceColor}"`)
    }
    // imagetracerjs emits a bare <svg width/height …> with no XML prolog and no
    // viewBox. Browsers render that, but strict viewers (Windows Photos,
    // Illustrator, Inkscape, some thumbnailers) show a blank. Add the prolog and
    // a viewBox so the file renders everywhere.
    if (!/viewBox=/.test(svg)) {
      svg = svg.replace(/<svg /, `<svg viewBox="0 0 ${w} ${h}" `)
    }
    if (!/^\s*<\?xml/.test(svg)) {
      svg = `<?xml version="1.0" encoding="UTF-8"?>\n` + svg
    }
    return new Blob([svg], { type: 'image/svg+xml' })
  } catch {
    return null
  }
}

// Wrap the transparent (full-colour) PNG as SVG — real vector paths if tracing
// succeeds, otherwise an embedded-raster SVG.
export async function svgWrap(src: string): Promise<Blob> {
  const transparent = await transparentPngBest(src)
  const traced = await tracedSvg(transparent)
  return traced ?? (await svgFromTransparent(transparent))
}

// The two deliverables for a "Color variation" tile: a transparent PNG and a
// matching SVG, both in the requested colour. 'color' keeps the original
// colours; 'black'/'white' recolour every shape. Returned as a list so the
// caller can zip them (the tile is labelled "PNG + SVG").
export async function colorVariantFiles(
  mode: 'color' | 'black' | 'white',
  src: string,
  brand: string,
): Promise<{ tag: string; files: { filename: string; blob: Blob }[] }> {
  const safe = brand.replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase() || 'logo'
  const tag = mode === 'color' ? 'full-color' : mode === 'black' ? 'black' : 'white'
  // PNG: full colour uses the AI cutout; black/white recolour every shape.
  const png = mode === 'color' ? await transparentPngBest(src) : await monoPng(src, mode)
  // SVG: always TRACE the full-colour transparent image (clean geometry), then
  // force the colour for the mono variants. Tracing the recoloured PNG directly
  // produced blank black/white SVGs (shape & background share the same RGB).
  const base = await transparentPngBest(src)
  const force = mode === 'black' ? '#111111' : mode === 'white' ? '#ffffff' : undefined
  const traced = await tracedSvg(base, force)
  const svg = traced ?? (await svgFromTransparent(png))
  return {
    tag,
    files: [
      { filename: `${safe}-${tag}.png`, blob: png },
      { filename: `${safe}-${tag}.svg`, blob: svg },
    ],
  }
}

// Plain-text palette export (HEX + RGB).
export function paletteTxt(brand: string, palette: PaletteColor[]): Blob {
  const lines = [`${brand} — Brand Colour Palette`, '='.repeat(40), '']
  for (const c of palette) {
    const hex = (c.hex || '').toUpperCase()
    lines.push(`${c.name || 'Colour'}`)
    if (hex) lines.push(`  HEX: ${hex}`)
    const rgb = hexToRgb(hex)
    if (rgb) lines.push(`  RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`)
    if (c.desc) lines.push(`  ${c.desc}`)
    lines.push('')
  }
  return new Blob([lines.join('\n')], { type: 'text/plain' })
}

// A PDF page with the logo centred on white.
export async function pdf(src: string, brand: string): Promise<Blob> {
  const { jsPDF } = await import('jspdf')
  const white = await blobToDataUrl(await whiteBgPng(src))
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const side = Math.min(pageW, pageH) * 0.6
  doc.addImage(white, 'PNG', (pageW - side) / 2, (pageH - side) / 2, side, side)
  doc.setFontSize(10)
  doc.setTextColor(120)
  doc.text(brand, pageW / 2, pageH - 48, { align: 'center' })
  return doc.output('blob')
}

// A simple commercial-licence certificate PDF.
export async function licensePdf(brand: string): Promise<Blob> {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const w = doc.internal.pageSize.getWidth()
  doc.setFontSize(22)
  doc.text('Commercial License Certificate', w / 2, 120, { align: 'center' })
  doc.setFontSize(13)
  doc.setTextColor(70)
  const body = [
    '',
    `This certifies that the logo created for "${brand}" is licensed`,
    'for full commercial use by the purchaser.',
    '',
    'The owner may use, modify, and reproduce this logo across any',
    'medium — digital, print, merchandise and advertising — worldwide,',
    'with no recurring fees and no attribution required.',
    '',
    'Issued by LOGO.AI',
  ]
  doc.text(body, w / 2, 180, { align: 'center' })
  return doc.output('blob')
}

// A valid EPS embedding the logo as an RGB PostScript image (downscaled).
export async function eps(src: string): Promise<Blob> {
  const white = await whiteBgPng(src)
  const img = await loadImage(URL.createObjectURL(white))
  const size = 600
  const canvas = makeCanvas(size, size)
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, size, size)
  ctx.drawImage(img, 0, 0, size, size)
  const px = ctx.getImageData(0, 0, size, size).data
  let hex = ''
  for (let i = 0; i < px.length; i += 4) {
    hex += toHex(px[i]) + toHex(px[i + 1]) + toHex(px[i + 2])
  }
  const eps = `%!PS-Adobe-3.0 EPSF-3.0
%%BoundingBox: 0 0 ${size} ${size}
%%EndComments
gsave
${size} ${size} scale
${size} ${size} 8
[${size} 0 0 -${size} 0 ${size}]
{currentfile ${size * 3} string readhexstring pop}
false 3 colorimage
${chunk(hex, 120)}
grestore
%%EOF
`
  return new Blob([eps], { type: 'application/postscript' })
}

/* ---------- helpers ---------- */

function toHex(n: number) {
  return n.toString(16).padStart(2, '0')
}
function chunk(s: string, n: number) {
  const out: string[] = []
  for (let i = 0; i < s.length; i += n) out.push(s.slice(i, i + n))
  return out.join('\n')
}
function hexToRgb(hex: string) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex)
  if (!m) return null
  const n = parseInt(m[1], 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}
export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(r.result as string)
    r.onerror = reject
    r.readAsDataURL(blob)
  })
}

// Map a download key + source logo to a { filename, blob } pair.
export async function buildAsset(
  fmt: string,
  src: string,
  brand: string,
  palette: PaletteColor[],
): Promise<{ filename: string; blob: Blob }> {
  const safe = brand.replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase() || 'logo'
  switch (fmt) {
    case 'png-transparent':
      return { filename: `${safe}-transparent.png`, blob: await transparentPngBest(src) }
    case 'png-white':
      return { filename: `${safe}-white-bg.png`, blob: await whiteBgPng(src) }
    case 'svg':
      return { filename: `${safe}.svg`, blob: await svgWrap(src) }
    case 'pdf':
      return { filename: `${safe}.pdf`, blob: await pdf(src, brand) }
    case 'eps':
      return { filename: `${safe}.eps`, blob: await eps(src) }
    case 'var-color':
      return { filename: `${safe}-full-color.png`, blob: await transparentPng(src) }
    case 'var-black':
      return { filename: `${safe}-black.png`, blob: await monoPng(src, 'black') }
    case 'var-white':
      return { filename: `${safe}-white.png`, blob: await monoPng(src, 'white') }
    case 'favicon':
      return { filename: `${safe}-favicon-512.png`, blob: await squarePng(src, 512, null, true) }
    case 'social':
      return { filename: `${safe}-social-1024.png`, blob: await squarePng(src, 1024, '#FFFFFF') }
    case 'palette':
      return { filename: `${safe}-palette.txt`, blob: paletteTxt(brand, palette) }
    case 'license':
      return { filename: `${safe}-commercial-license.pdf`, blob: await licensePdf(brand) }
    default:
      return { filename: `${safe}.png`, blob: await whiteBgPng(src) }
  }
}
