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

const WHITE_CUTOFF = 238 // pixels brighter than this on all channels = background

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

// White/near-white background -> transparent.
export async function transparentPng(src: string): Promise<Blob> {
  const { ctx, canvas, data } = await getPixels(src)
  const px = data.data
  for (let i = 0; i < px.length; i += 4) {
    if (px[i] >= WHITE_CUTOFF && px[i + 1] >= WHITE_CUTOFF && px[i + 2] >= WHITE_CUTOFF) {
      px[i + 3] = 0
    }
  }
  ctx.putImageData(data, 0, 0)
  return canvasToBlob(canvas)
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
    const isBg = px[i] >= WHITE_CUTOFF && px[i + 1] >= WHITE_CUTOFF && px[i + 2] >= WHITE_CUTOFF
    if (isBg) {
      px[i + 3] = 0
    } else {
      px[i] = v
      px[i + 1] = v
      px[i + 2] = v
    }
  }
  ctx.putImageData(data, 0, 0)
  return canvasToBlob(canvas)
}

// Centre the (background-removed) logo on a square canvas. bg=null => transparent.
export async function squarePng(src: string, size: number, bg: string | null): Promise<Blob> {
  const transparent = await transparentPng(src)
  const img = await loadImage(URL.createObjectURL(transparent))
  const canvas = makeCanvas(size, size)
  const ctx = canvas.getContext('2d')!
  if (bg) {
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, size, size)
  }
  const pad = size * 0.12
  const max = size - pad * 2
  const scale = Math.min(max / img.width, max / img.height)
  const dw = img.width * scale
  const dh = img.height * scale
  ctx.drawImage(img, (size - dw) / 2, (size - dh) / 2, dw, dh)
  return canvasToBlob(canvas)
}

// Wrap an already-transparent PNG blob in a valid SVG container (embedded
// raster). Shared by svgWrap and the colour-variation exports so the SVG
// carries the SAME colours as its paired PNG (full colour, black, or white).
async function svgFromTransparent(transparent: Blob): Promise<Blob> {
  const dataUrl = await blobToDataUrl(transparent)
  const img = await loadImage(dataUrl)
  const w = img.naturalWidth || 1024
  const h = img.naturalHeight || 1024
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <image width="${w}" height="${h}" xlink:href="${dataUrl}"/>
</svg>`
  return new Blob([svg], { type: 'image/svg+xml' })
}

// Wrap the transparent (full-colour) PNG in a valid SVG container.
export async function svgWrap(src: string): Promise<Blob> {
  return svgFromTransparent(await transparentPng(src))
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
  const png = mode === 'color' ? await transparentPng(src) : await monoPng(src, mode)
  const svg = await svgFromTransparent(png)
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
      return { filename: `${safe}-transparent.png`, blob: await transparentPng(src) }
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
      return { filename: `${safe}-favicon-512.png`, blob: await squarePng(src, 512, null) }
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
