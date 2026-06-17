'use client'

// useLiveSuggestions — generic drop-in hook for any AI-tailored step.
// Returns the static fallback array immediately, then replaces it with
// API-generated suggestions when they arrive. Memoises by context key so
// we don't re-fetch on every re-render. If the API errors or is slow, the
// static array stays — user never sees an error state.
//
// Works with any item type T: strings (description/tagline/impression) or
// objects (palette objects, style objects). The hook trusts the caller to
// pass a `validate` predicate that confirms each AI-returned item is the
// right shape; bad shapes fall back to static silently.

import { useEffect, useRef, useState } from 'react'

export type SuggestKind = 'description' | 'tagline' | 'impression' | 'palette' | 'style'

interface Ctx<T> {
  kind: SuggestKind
  brand: string
  industry?: string | null
  niche?: string
  description?: string
  // Mood / feel words the user picked at step 5 — fed into the palette
  // request so colours reflect them. Comma-joined string.
  impressions?: string
  // What the user is currently typing — sent (debounced) so suggestions can
  // refine toward their draft as they type (description / tagline steps).
  query?: string
  fallback: T[]
  // Whether to actually call the API. Pass false to suppress (e.g. when the
  // user hasn't filled in brand name yet, or the step is not visible).
  enabled?: boolean
  // Predicate that each AI-returned item must satisfy to be accepted.
  // Items that fail validation are filtered out. If too few survive,
  // we fall back to the static array.
  validate: (item: unknown) => item is T
  // Minimum count of valid items to accept the AI response. Default 3.
  minCount?: number
}

export type SuggestStatus = 'idle' | 'loading' | 'done'

interface Result<T> {
  suggestions: T[]
  // The AI's deliberate preselection picks (impression / palette / style
  // steps): the chosen mood words, or the exact name of the chosen palette
  // or style. Empty for kinds that don't use it, or when the live fetch
  // failed (callers then fall back to their own default).
  recommended: string[]
  loading: boolean
  source: 'static' | 'live'
  // Lifecycle for the current context: 'idle' before a fetch is needed,
  // 'loading' while a request is in flight, 'done' once it resolves
  // (success OR failure) or a cache hit. Callers that need to act "once
  // suggestions are ready" should wait for 'done' — it is the only
  // reliable settled signal (`loading` briefly reads false before the
  // fetch effect runs).
  status: SuggestStatus
}

// Module-level cache so multi-component re-mounts share fetched results.
const cache = new Map<string, { items: unknown[]; recommended: string[] }>()

function ctxKey<T>(c: Ctx<T>): string {
  return [
    c.kind,
    c.brand.trim().toLowerCase(),
    c.industry ?? '',
    c.niche ?? '',
    c.description ?? '',
    c.impressions ?? '',
    c.query?.trim().toLowerCase() ?? '',
  ].join('|')
}

export function useLiveSuggestions<T>(ctx: Ctx<T>): Result<T> {
  const enabled = ctx.enabled !== false && ctx.brand.trim().length > 0
  const key = ctxKey(ctx)
  const cached = cache.get(key) as { items: T[]; recommended: string[] } | undefined
  const minCount = ctx.minCount ?? 3

  const [suggestions, setSuggestions] = useState<T[]>(cached?.items ?? ctx.fallback)
  const [recommended, setRecommended] = useState<string[]>(cached?.recommended ?? [])
  const [status, setStatus] = useState<SuggestStatus>(cached ? 'done' : 'idle')
  const [source, setSource] = useState<'static' | 'live'>(cached ? 'live' : 'static')

  const reqRef = useRef(0)

  useEffect(() => {
    if (!enabled) {
      setSuggestions(ctx.fallback)
      setRecommended([])
      setStatus('idle')
      setSource('static')
      return
    }
    if (cached) {
      setSuggestions(cached.items)
      setRecommended(cached.recommended)
      setStatus('done')
      setSource('live')
      return
    }

    const reqId = ++reqRef.current
    setStatus('loading')
    setSource('static')

    const controller = new AbortController()
    // Safety timeout — never leave a caller stuck waiting on a hung
    // request; abort after 12s and settle ('done') on the fallback list.
    const timeoutId = setTimeout(() => controller.abort(), 12000)

    // Debounce the request so as-you-type query changes (description /
    // tagline steps) fire one call after the user pauses, not per keystroke.
    const debounceId = setTimeout(() => {
      fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: ctx.kind,
          brand: ctx.brand.trim(),
          industry: ctx.industry ?? undefined,
          niche: ctx.niche ?? undefined,
          description: ctx.description ?? undefined,
          impressions: ctx.impressions ?? undefined,
          query: ctx.query?.trim() || undefined,
        }),
        signal: controller.signal,
      })
        .then((r) => r.json())
        .then((data: { suggestions?: unknown[]; recommended?: unknown }) => {
          if (reqRef.current !== reqId) return
          const raw = Array.isArray(data.suggestions) ? data.suggestions : []
          const validated = raw.filter(ctx.validate) as T[]
          const rec = Array.isArray(data.recommended)
            ? (data.recommended.filter((x) => typeof x === 'string') as string[])
            : []
          if (validated.length >= minCount) {
            cache.set(key, { items: validated, recommended: rec })
            setSuggestions(validated)
            setRecommended(rec)
            setSource('live')
          }
          setStatus('done')
        })
        .catch(() => {
          if (reqRef.current !== reqId) return
          setStatus('done')
        })
        .finally(() => clearTimeout(timeoutId))
    }, 400)

    return () => {
      clearTimeout(debounceId)
      clearTimeout(timeoutId)
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled])

  return { suggestions, recommended, loading: status === 'loading', source, status }
}

// Common validators for the supported item shapes.

export const isString = (x: unknown): x is string => typeof x === 'string' && x.trim().length > 0

export interface PaletteShape {
  name: string
  hint: string
  colors: { name: string; hex: string; desc: string }[]
}

export const isPalette = (x: unknown): x is PaletteShape => {
  if (!x || typeof x !== 'object') return false
  const p = x as Record<string, unknown>
  if (typeof p.name !== 'string' || typeof p.hint !== 'string') return false
  if (!Array.isArray(p.colors) || p.colors.length !== 3) return false
  for (const c of p.colors) {
    if (!c || typeof c !== 'object') return false
    const co = c as Record<string, unknown>
    if (typeof co.name !== 'string' || typeof co.desc !== 'string') return false
    if (typeof co.hex !== 'string' || !/^#[0-9A-Fa-f]{6}$/.test(co.hex)) return false
  }
  return true
}

export interface StyleShape {
  name: string
  pct: number
  desc: string
  ex: string
}

const VALID_STYLE_NAMES = new Set([
  'Wordmark',
  'Combination Mark',
  'Abstract Mark',
  'Lettermark',
  'Brandmark',
  'Emblem',
])

export const isStyle = (x: unknown): x is StyleShape => {
  if (!x || typeof x !== 'object') return false
  const s = x as Record<string, unknown>
  if (typeof s.name !== 'string' || !VALID_STYLE_NAMES.has(s.name)) return false
  if (typeof s.pct !== 'number') return false
  if (typeof s.desc !== 'string' || typeof s.ex !== 'string') return false
  return true
}
