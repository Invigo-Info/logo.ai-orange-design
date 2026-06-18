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

const IMAGE_MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image'

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

// Per-variant art direction so the batch returns visibly different concepts
// instead of four near-identical logos.
const VARIANTS = [
  'Bold and iconic — a strong, memorable symbol paired with the name.',
  'Minimal and modern — clean geometric simplicity, lots of negative space.',
  'Elegant and refined — a sophisticated, premium feel.',
  'Friendly and approachable — rounded, warm, characterful.',
  'A distinctive abstract mark — a unique, ownable geometric form.',
  'Classic and timeless — understated and professional.',
]

const empty = () => NextResponse.json({ image: null })

function buildPrompt(b: Body): string {
  const colors = (b.colors ?? [])
    .filter((c) => c && c.hex)
    .map((c) => `${c.name ?? ''} ${c.hex}`.trim())
    .join(', ')

  return [
    `Design a professional, original brand logo for a business named "${b.brandName || 'the brand'}".`,
    b.industry ? `Industry: ${b.industry}.` : '',
    b.description ? `What they do: ${b.description}.` : '',
    b.impressions ? `Brand personality: ${b.impressions}.` : '',
    b.style ? `Logo type: ${b.style}.` : '',
    colors ? `Use this colour palette: ${colors}.` : '',
    VARIANTS[(b.variant ?? 0) % VARIANTS.length],
    'The logo must be clean, modern, vector-style, perfectly centered on a plain solid white background, high contrast, well balanced and scalable. Render the brand name with crisp, correct, readable lettering (no misspellings). No photographic background, no mockup, no drop shadow, no watermark, no border, no extra words or taglines.',
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

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:generateContent?key=${key}`
  const payload = JSON.stringify({
    contents: [{ role: 'user', parts: [{ text: buildPrompt(body) }] }],
    generationConfig: { responseModalities: ['IMAGE'] },
  })

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
