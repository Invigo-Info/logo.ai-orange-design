// POST /api/suggest — server-side AI suggestion endpoint for the /launch
// onboarding. The API keys live ONLY here (process.env); they are never sent
// to the browser. The client (useLiveSuggestions) already debounces, caches,
// validates shapes, and falls back to its static lists, so on ANY failure we
// simply return { suggestions: [] } and the UI shows the fallback — users
// never see an error.
//
// Provider: prefers Gemini (GEMINI_API_KEY); falls back to OpenAI
// (OPENAI_API_KEY) if Gemini isn't configured. If neither key is set, returns
// empty and the onboarding uses its built-in static lists.
//
// Handles six "kinds": industry | description | tagline | impression |
// palette | style. Each returns { suggestions: [...] } and (for the steps
// that preselect) { recommended: [...] }, in the exact shapes the client
// validators expect (see useLiveSuggestions.ts).

import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini'
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash'

const SYSTEM_PROMPT =
  'You generate concise, on-brand suggestions for a logo-creation onboarding. Always reply with ONLY the requested JSON object — no prose, no markdown fences.'

// Calls the configured provider and returns the raw JSON text (a string the
// caller then JSON.parses), or null on any failure. Gemini is preferred.
async function generateJSON(instruction: string, signal: AbortSignal): Promise<string | null> {
  const geminiKey = process.env.GEMINI_API_KEY
  const openaiKey = process.env.OPENAI_API_KEY

  if (geminiKey) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${geminiKey}`
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: 'user', parts: [{ text: instruction }] }],
        generationConfig: {
          temperature: 0.8,
          responseMimeType: 'application/json',
          // gemini-2.5-flash "thinks" by default, which adds seconds of
          // latency and can blow the timeout on the bigger prompts (palette
          // / style). These are short structured outputs that don't need it,
          // so disable thinking for fast, reliable responses.
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
      signal,
    })
    if (!res.ok) return null
    const data = await res.json()
    const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text
    return text ?? null
  }

  if (openaiKey) {
    const res = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${openaiKey}` },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        temperature: 0.8,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: instruction },
        ],
      }),
      signal,
    })
    if (!res.ok) return null
    const data = await res.json()
    const text: string | undefined = data?.choices?.[0]?.message?.content
    return text ?? null
  }

  return null // no provider configured
}

interface Body {
  kind?: string
  brand?: string
  industry?: string
  niche?: string
  description?: string
  impressions?: string
  query?: string
}

// Empty response — the client treats this as "no live data" and keeps its
// static fallback list. Used for every error path so the UI never breaks.
const empty = () => NextResponse.json({ suggestions: [], recommended: [] })

function contextLines(b: Body): string {
  const lines: string[] = []
  if (b.brand) lines.push(`Business name: ${b.brand}`)
  if (b.industry) lines.push(`Industry / business type: ${b.industry}`)
  if (b.niche) lines.push(`Niche: ${b.niche}`)
  if (b.description) lines.push(`What they do: ${b.description}`)
  if (b.impressions) lines.push(`Desired brand feel: ${b.impressions}`)
  if (b.query) lines.push(`User is currently typing: "${b.query}"`)
  return lines.join('\n')
}

// Per-kind instruction. Each must tell the model to return a JSON object with
// a top-level "suggestions" array (and "recommended" where relevant).
function instructionFor(kind: string, b: Body): string | null {
  const ctx = contextLines(b)
  switch (kind) {
    case 'industry':
      return `You autocomplete business types for a logo onboarding. The user typed: "${b.query ?? ''}".
Return 8 specific, real business-type labels that complete or closely relate to what they typed (e.g. "coff" -> "Coffee Shop", "Coffee Roastery", "Coffee Cart", "Espresso Bar"). Title Case, 1-4 words each, no duplicates, no descriptions.
Respond as JSON: {"suggestions": ["...", ...]}`

    case 'description':
      return `Context:\n${ctx}\n
Write 6 distinct one-line descriptions of what this business does — each 6 to 12 words, concrete and specific to the business, written as a plain statement (no "We are"). Vary the angle (product, audience, vibe). If the user is typing, bias toward their draft but keep variety.
Respond as JSON: {"suggestions": ["...", ...]}`

    case 'tagline':
      return `Context:\n${ctx}\n
Write 14 short brand taglines (2 to 6 words each) that fit THIS business specifically. Punchy and original. STRICTLY avoid clichés: no "your trusted partner", "quality you can trust", "where X meets Y", "excellence", "redefining", "elevate", "unleash", "to the next level". No ending punctuation.
Respond as JSON: {"suggestions": ["...", ...]}`

    case 'impression':
      return `Context:\n${ctx}\n
Return 12 single-word brand-feel adjectives that suit this specific business (Title Case, no duplicates) — e.g. a law firm leans "Authoritative, Discreet, Sharp" not generic "Bold, Playful". Then choose the 3 best for this business.
Respond as JSON: {"suggestions": ["Word", ... 12 total], "recommended": ["Word","Word","Word"]}`

    case 'palette':
      return `Context:\n${ctx}\n
Return 6 colour palettes tailored to this business and its desired feel. Each palette: a 1-word "name", a 3-5 word "hint", and EXACTLY 3 "colors". Each colour: "name" (e.g. "Deep Navy"), "hex" (format #RRGGBB, 6 hex digits), and "desc" (short reason). Make palettes genuinely different from each other and appropriate to the industry. Then pick the single best palette name.
Respond as JSON: {"suggestions": [{"name":"...","hint":"...","colors":[{"name":"...","hex":"#RRGGBB","desc":"..."},{...},{...}]}, ... 6 total], "recommended": ["<best palette name>"]}`

    case 'style':
      return `Context:\n${ctx}\n
For this business, return EXACTLY these 6 logo types in this order: Wordmark, Combination Mark, Abstract Mark, Lettermark, Brandmark, Emblem. For each give: "name" (exactly as listed), "pct" (an integer popularity % for THIS industry; the 6 should roughly sum to 100), "desc" (one short line), and "ex" (2-3 real brand names of that logo type). Then pick the single best style name for this business.
Respond as JSON: {"suggestions": [{"name":"Wordmark","pct":35,"desc":"...","ex":"Google, FedEx"}, ... all 6], "recommended": ["<best style name>"]}`

    default:
      return null
  }
}

export async function POST(req: Request) {
  // No provider key configured -> silent static fallback.
  if (!process.env.GEMINI_API_KEY && !process.env.OPENAI_API_KEY) return empty()

  let body: Body
  try {
    body = await req.json()
  } catch {
    return empty()
  }

  const kind = String(body.kind ?? '')
  const instruction = instructionFor(kind, body)
  if (!instruction) return empty()

  // The model occasionally returns an empty or unparseable result (seen
  // intermittently on the "impression" kind). Try up to twice so a single bad
  // response doesn't drop the step to its generic static fallback.
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 11000)
      const content = await generateJSON(instruction, controller.signal)
      clearTimeout(timeout)
      if (!content) continue

      let parsed: { suggestions?: unknown; recommended?: unknown }
      try {
        // Gemini can occasionally wrap JSON in ```json fences despite the
        // responseMimeType hint — strip them before parsing.
        const cleaned = content.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '')
        parsed = JSON.parse(cleaned)
      } catch {
        continue // bad JSON -> retry once
      }

      const suggestions = Array.isArray(parsed.suggestions) ? parsed.suggestions : []
      const recommended = Array.isArray(parsed.recommended) ? parsed.recommended : []
      // Empty suggestions almost always means a flaky generation — retry once
      // before giving up to the client's static fallback.
      if (suggestions.length === 0 && attempt === 0) continue
      return NextResponse.json({ suggestions, recommended })
    } catch {
      // network error / abort -> retry once, then fall back
    }
  }
  return empty()
}
