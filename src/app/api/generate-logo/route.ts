// POST /api/generate-logo — generates ONE real logo image from the onboarding
// brief using Google's Gemini image model (gemini-2.5-flash-image). The key
// lives ONLY here (process.env.GEMINI_API_KEY); it is never sent to the
// browser. The client calls this once per logo variant (in parallel) on the
// "Generating" screen. On ANY failure we return { image: null } and the
// results screen falls back to its built-in SVG previews — users never see an
// error.

import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
// Image generation takes ~10s; give the function room (Vercel Pro allows >10s).
export const maxDuration = 60

// Default to Imagen standard at 2K (2048×2048) for crisp, high-resolution
// logos. (The "fast" variant only does 1024 and 2K request 400s; the standard
// model supports sampleImageSize "2K".) Override with GEMINI_IMAGE_MODEL /
// GEMINI_IMAGE_SIZE. Models whose name starts with "imagen" use the :predict
// endpoint; Gemini image models use :generateContent.
const IMAGE_MODEL = process.env.GEMINI_IMAGE_MODEL || 'imagen-4.0-generate-001'
const IS_IMAGEN = IMAGE_MODEL.startsWith('imagen')
// "1K" or "2K". Only applies to Imagen standard/ultra (not -fast).
const IMAGE_SIZE = process.env.GEMINI_IMAGE_SIZE || '2K'

interface Body {
  brandName?: string
  tagline?: string
  industry?: string
  description?: string
  impressions?: string
  colors?: { name?: string; hex?: string }[]
  style?: string
  variant?: number
}

// Per-variant art direction so the batch returns visibly different concepts.
// These describe the VISUAL TREATMENT only (mood / weight / feel) and never
// the logo TYPE, so they can't contradict the user's chosen logo style.
const VARIANTS = [
  'Bold and confident treatment.',
  'Minimal and modern — clean, geometric, with generous negative space.',
  'Elegant and refined — sophisticated and premium.',
  'Friendly and approachable — rounded and warm.',
  'Distinctive and unique — a memorable, custom feel.',
  'Classic and timeless — understated and professional.',
]

const empty = () => NextResponse.json({ image: null })

function buildPrompt(b: Body): string {
  const brand = b.brandName || 'the brand'
  // Use colour NAMES only and weave everything into natural prose. Image
  // models transcribe label-like content (hex codes, "Key: a, b, c" lists)
  // straight into the artwork as text, so we never feed them raw metadata.
  const colorNames = (b.colors ?? [])
    .map((c) => c?.name)
    .filter(Boolean)
    .join(' and ')
  // A single feel-word as an adjective for visual mood. We deliberately do NOT
  // pass the description or a list of mood words: the model renders those as a
  // tagline/subtitle. Industry + colours + style keep it input-driven without
  // the text leak.
  const feel = (b.impressions ?? '').split(',')[0]?.trim() || ''

  return [
    `A ${feel ? `${feel.toLowerCase()}, ` : ''}professional ${b.style ? `${b.style} ` : ''}logo for "${brand}"${b.industry ? `, a ${b.industry}` : ''}.`,
    colorNames ? `Use a colour palette of ${colorNames}.` : '',
    VARIANTS[(b.variant ?? 0) % VARIANTS.length],
    'Clean modern flat vector logo, perfectly centered on a plain solid white background, high contrast and scalable. No photographic background, no mockup, no drop shadow, no watermark, no border.',
    // The brand name is the ONLY text that should appear — no tagline/subtitle.
    `The brand name "${brand}" is the only text in the entire image, spelled exactly and correctly. Do not add any tagline, subtitle, slogan, descriptive sentence, colour codes, or any other words.`,
  ]
    .filter(Boolean)
    .join(' ')
}

export async function POST(req: Request) {
  const key = process.env.GEMINI_API_KEY
  if (!key) return empty() // no key -> client falls back to SVG previews

  let body: Body
  try {
    body = await req.json()
  } catch {
    return empty()
  }

  const prompt = buildPrompt(body)
  const method = IS_IMAGEN ? 'predict' : 'generateContent'
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:${method}?key=${key}`
  const imagenParams: Record<string, unknown> = { sampleCount: 1, aspectRatio: '1:1' }
  // -fast doesn't accept sampleImageSize; only set it for standard/ultra.
  if (IS_IMAGEN && !IMAGE_MODEL.includes('fast')) imagenParams.sampleImageSize = IMAGE_SIZE
  const payload = JSON.stringify(
    IS_IMAGEN
      ? { instances: [{ prompt }], parameters: imagenParams }
      : {
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { responseModalities: ['IMAGE'] },
        },
  )

  // The image model can return transient 503 ("model overloaded") / 429 under
  // load. Retry once after a short backoff before giving up to the fallback.
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 35000)
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        signal: controller.signal,
      })
      clearTimeout(timeout)

      if (res.status === 503 || res.status === 429) {
        if (attempt === 0) {
          await new Promise((r) => setTimeout(r, 1500))
          continue // retry once
        }
        return empty()
      }
      if (!res.ok) return empty()

      const data = await res.json()

      if (IS_IMAGEN) {
        // Imagen :predict -> { predictions: [{ bytesBase64Encoded, mimeType }] }
        const pred = data?.predictions?.[0]
        const b64: string | undefined = pred?.bytesBase64Encoded
        if (!b64) return empty()
        return NextResponse.json({
          image: `data:${pred?.mimeType || 'image/png'};base64,${b64}`,
        })
      }

      // Gemini image :generateContent -> inlineData part.
      const parts: { inlineData?: { mimeType?: string; data?: string } }[] =
        data?.candidates?.[0]?.content?.parts ?? []
      const inline = parts.find((p) => p?.inlineData?.data)?.inlineData
      if (!inline?.data) return empty()
      return NextResponse.json({
        image: `data:${inline.mimeType || 'image/png'};base64,${inline.data}`,
      })
    } catch {
      return empty() // network error / abort -> SVG fallback
    }
  }
  return empty()
}
