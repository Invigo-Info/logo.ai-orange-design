'use client'

import { useEffect, useState } from 'react'
import JSZip from 'jszip'
import LogoWordmark from '@/components/home/LogoWordmark'
import { buildAsset, monoPng, blobToDataUrl } from './assets'
import { idbGet } from '../idb'
// Reuse the EXACT logo art + watermark from the generation step so the
// dashboard shows identical logos. PROGRAMMER: for production, extract
// LogoArtwork/WatermarkOverlay into a shared component so the dashboard bundle
// doesn't pull in the whole onboarding page.
import { LogoArtwork, WatermarkOverlay } from '../start/page'
import { PALETTES, type Palette } from '../start/data/palettes'

const PRICE = 49
const PURCHASED = 1 // the variant the user bought
const FALLBACK = { brandName: 'Velvet Roast', tagline: 'Roasted fresh, every morning', paletteIndex: 0 }

// All concepts the user generated, newest first — one combined grid.
// (Real logos differ per generation; the placeholder only has 10 styles.)
const ALL_CONCEPTS = [0, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// The full download center for a purchased logo. PROGRAMMER: each `fmt` maps to
// a real generated asset served from the backend (see handleDownload). These are
// the standard deliverables a logo buyer expects to own outright.
const DOWNLOADS: { group: string; items: { label: string; note: string; fmt: string }[] }[] = [
  {
    group: 'Logo files',
    items: [
      { label: 'PNG — transparent', note: '2048 × 2048px, no background', fmt: 'png-transparent' },
      { label: 'PNG — white background', note: '2048 × 2048px', fmt: 'png-white' },
      { label: 'SVG — vector', note: 'Scales to any size', fmt: 'svg' },
      { label: 'PDF — print-ready', note: 'CMYK, high resolution', fmt: 'pdf' },
      { label: 'EPS — vector source', note: 'For print & designers', fmt: 'eps' },
    ],
  },
  {
    group: 'Color variations',
    items: [
      { label: 'Full color', note: 'PNG + SVG', fmt: 'var-color' },
      { label: 'All black', note: 'PNG + SVG', fmt: 'var-black' },
      { label: 'All white', note: 'PNG + SVG — for dark backgrounds', fmt: 'var-white' },
    ],
  },
  {
    group: 'Brand assets',
    items: [
      { label: 'Favicon', note: '.ico + 512px PNG', fmt: 'favicon' },
      { label: 'Social profile', note: '1024 × 1024px square', fmt: 'social' },
      { label: 'Color palette', note: 'HEX & RGB codes (.txt)', fmt: 'palette' },
      { label: 'Commercial license', note: 'PDF ownership certificate', fmt: 'license' },
    ],
  },
]

type View = 'brand' | 'concepts'

export default function Dashboard() {
  const [view, setView] = useState<View>('brand')
  const [showReview, setShowReview] = useState(false)
  const [agree, setAgree] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [colorMode, setColorMode] = useState<'full' | 'dark' | 'mono'>('full')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewPhase, setReviewPhase] = useState<'rate' | 'write' | 'done'>('rate')
  const [reviewText, setReviewText] = useState('')
  const [brief, setBrief] = useState(FALLBACK)
  // Real generated logos (data-URLs) + which indices were purchased. Empty
  // when the user reached the dashboard without generating real logos (the
  // page then falls back to the SVG placeholder art).
  const [logos, setLogos] = useState<string[]>([])
  const [purchased, setPurchased] = useState<number[]>([])
  // Which asset is currently being generated (its fmt key), or null when idle.
  const [downloading, setDownloading] = useState<string | null>(null)
  // Pre-rendered colour variants of the purchased logo for the preview toggle:
  // `dark` is the all-white version (for the dark backdrop), `mono` the all-black
  // version. Built once from the hero image; null until ready (falls back to full).
  const [previews, setPreviews] = useState<{ dark: string; mono: string } | null>(null)

  // Sentiment split: 4–5★ opens a public review box; 1–3★ opens private feedback.
  function submitReview(n: number) {
    setRating(n)
    setReviewPhase('write')
  }
  function submitWritten() {
    setReviewPhase('done')
    // PROGRAMMER: POST { rating, text: reviewText }. For rating >= 4, this is a
    // public testimonial — surface a review-platform link (Trustpilot/Google)
    // and/or feature it; for <= 3 keep it private and route to the feedback queue.
  }

  function handleLogout() {
    // PROGRAMMER: clear the auth session (cookie / JWT) server-side, then send
    // the user to the marketing home. Replace the inline redirect with your
    // real sign-out call (e.g. POST /api/auth/logout → redirect).
    setProfileOpen(false)
    window.location.href = '/'
  }

  // Download a generated asset. `what === 'all'` builds a .zip of the full pack;
  // any other key (png-transparent, var-black, social, palette, …) generates and
  // downloads that single processed file from the purchased logo.
  async function handleDownload(what: string) {
    if (downloading) return
    const src = purchasedImages[0]
    if (!src) return // placeholder mode — nothing real to process
    const paletteColors = palette?.colors ?? []
    const safe = brand.replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase() || 'logo'
    setDownloading(what)
    try {
      if (what === 'all') {
        // The most useful deliverables, zipped. (PDF/EPS stay as individual
        // downloads to keep the zip fast.)
        const keys = ['png-transparent', 'png-white', 'svg', 'var-color', 'var-black', 'var-white', 'favicon', 'social', 'palette']
        const zip = new JSZip()
        for (const k of keys) {
          const { filename, blob } = await buildAsset(k, src, brand, paletteColors)
          zip.file(filename, blob)
        }
        const blob = await zip.generateAsync({ type: 'blob' })
        const url = URL.createObjectURL(blob)
        triggerDownload(url, `${safe}-logo-pack.zip`)
        setTimeout(() => URL.revokeObjectURL(url), 3000)
      } else {
        const { filename, blob } = await buildAsset(what, src, brand, paletteColors)
        const url = URL.createObjectURL(blob)
        triggerDownload(url, filename)
        setTimeout(() => URL.revokeObjectURL(url), 3000)
      }
    } catch {
      /* generation failed — silently ignore so the UI never breaks */
    } finally {
      setDownloading(null)
      if (!downloaded) {
        setDownloaded(true)
        setShowReview(true) // review nudge on the first download (post-purchase win)
      }
    }
  }

  useEffect(() => {
    try {
      const raw = localStorage.getItem('logoai_brief')
      if (raw) {
        const b = JSON.parse(raw)
        setBrief({
          brandName: typeof b.brandName === 'string' && b.brandName.trim() ? b.brandName.trim() : FALLBACK.brandName,
          tagline: typeof b.tagline === 'string' ? b.tagline : FALLBACK.tagline,
          paletteIndex: typeof b.paletteIndex === 'number' ? b.paletteIndex : FALLBACK.paletteIndex,
        })
      }
      const rawPurchased = localStorage.getItem('logoai:purchased')
      if (rawPurchased) {
        const arr = JSON.parse(rawPurchased)
        if (Array.isArray(arr)) setPurchased(arr.filter((x) => typeof x === 'number'))
      }
    } catch {}
    // Real generated images live in IndexedDB (too big for localStorage at 2K).
    // Fall back to the old localStorage key for sessions created before this.
    idbGet<string[]>('logos')
      .then((arr) => {
        if (Array.isArray(arr) && arr.length) {
          setLogos(arr.filter((x) => typeof x === 'string' && x.startsWith('data:')))
          return
        }
        try {
          const raw = localStorage.getItem('logoai:logos')
          if (raw) {
            const a = JSON.parse(raw)
            if (Array.isArray(a)) setLogos(a.filter((x: unknown) => typeof x === 'string' && (x as string).startsWith('data:')))
          }
        } catch {}
      })
      .catch(() => {})
  }, [])

  const brand = brief.brandName
  const tagline = brief.tagline
  const palette: Palette | null = PALETTES[brief.paletteIndex] ?? PALETTES[0] ?? null

  // The purchased logos as data-URLs. If purchases weren't recorded but real
  // logos exist, treat the first as purchased so the hero + download still work.
  const purchasedImages = (purchased.length ? purchased : logos.length ? [0] : [])
    .map((i) => logos[i])
    .filter((x): x is string => Boolean(x))
  const heroImage = purchasedImages[0] ?? null

  // Build the on-dark (white) and mono (black) previews once the hero loads, so
  // the Full colour / On dark / Mono toggle actually recolours the real logo
  // instead of only swapping the backdrop.
  useEffect(() => {
    if (!heroImage) {
      setPreviews(null)
      return
    }
    let cancelled = false
    setPreviews(null)
    ;(async () => {
      try {
        const [darkBlob, monoBlob] = await Promise.all([
          monoPng(heroImage, 'white'),
          monoPng(heroImage, 'black'),
        ])
        const [dark, mono] = await Promise.all([blobToDataUrl(darkBlob), blobToDataUrl(monoBlob)])
        if (!cancelled) setPreviews({ dark, mono })
      } catch {
        if (!cancelled) setPreviews(null)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [heroImage])

  const navItem = (active: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
    padding: '10px 12px', borderRadius: 10, fontSize: 14, textAlign: 'left', width: '100%',
    cursor: 'pointer', border: active ? '1px solid var(--m-border)' : '1px solid transparent',
    background: active ? 'var(--m-surface-alt)' : 'transparent',
    color: active ? 'var(--m-ink)' : 'var(--m-text-muted)',
    fontWeight: active ? 600 : 500,
  })

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* ── Sidebar ── */}
      <aside style={{ width: 260, flexShrink: 0, borderRight: '1px solid var(--m-border)', padding: '24px 20px', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' }}>
        <a href="/" aria-label="LOGO.AI — home" style={{ display: 'inline-flex', color: 'var(--m-ink)', textDecoration: 'none' }}>
          <LogoWordmark className="h-[26px]" />
        </a>
        <nav style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          <div className="m-sans" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--m-text-soft)', padding: '0 10px 8px' }}>My logos</div>
          <button type="button" className="m-sans" onClick={() => setView('brand')} style={navItem(view === 'brand')}>{brand}</button>
          <button type="button" className="m-sans" onClick={() => setView('concepts')} style={navItem(view === 'concepts')}>
            <span>Other logos</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: view === 'concepts' ? 'var(--m-ink)' : 'var(--m-text-soft)' }}>{logos.length || ALL_CONCEPTS.length}</span>
          </button>
          <a href="/launch/feedback" className="m-sans" style={{ padding: '10px 12px', borderRadius: 10, color: 'var(--m-text-muted)', fontSize: 14, textDecoration: 'none' }}>Feedback</a>
        </nav>
        <div style={{ position: 'relative', paddingTop: 16, borderTop: '1px solid var(--m-border)' }}>
          {profileOpen && (
            <>
              {/* click-away catcher */}
              <div onClick={() => setProfileOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
              <div role="menu" style={{ position: 'absolute', bottom: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 50, borderRadius: 12, border: '1px solid var(--m-border)', background: 'var(--m-surface)', boxShadow: '0 16px 40px rgba(0,0,0,0.5)', padding: 6 }}>
                <a href="/launch/settings" role="menuitem" className="m-sans hover:bg-[var(--m-surface-alt)]" style={menuLink}><IconSettings /> Settings</a>
                <a href="/launch/billing" role="menuitem" className="m-sans hover:bg-[var(--m-surface-alt)]" style={menuLink}><IconBilling /> Billing</a>
                <a href="/launch/feedback" role="menuitem" className="m-sans hover:bg-[var(--m-surface-alt)]" style={menuLink}><IconSupport /> Support</a>
                <div style={{ height: 1, background: 'var(--m-border)', margin: '6px 4px' }} />
                <button type="button" onClick={handleLogout} role="menuitem" className="m-sans hover:bg-[var(--m-surface-alt)]" style={{ ...menuLink, width: '100%', color: 'var(--m-brand)', fontWeight: 600, background: 'transparent', border: 'none', cursor: 'pointer' }}><IconLogout /> Log out</button>
              </div>
            </>
          )}
          <button type="button" onClick={() => setProfileOpen((o) => !o)} aria-haspopup="menu" aria-expanded={profileOpen ? 'true' : 'false'} className="m-sans hover:bg-[var(--m-surface-alt)]" style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '8px', borderRadius: 10, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
            <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--m-brand)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>JM</span>
            <span style={{ lineHeight: 1.3, minWidth: 0, flex: 1 }}>
              <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--m-ink)' }}>John Mayer</span>
              <span style={{ display: 'block', fontSize: 12, color: 'var(--m-text-soft)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>john@example.com</span>
            </span>
            <span aria-hidden="true" style={{ color: 'var(--m-text-soft)', flexShrink: 0, display: 'inline-flex' }}><IconChevron open={profileOpen} /></span>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main style={{ flex: 1, padding: '40px clamp(20px,4vw,56px) 100px', maxWidth: 1320 }}>
        {view === 'brand' ? (
          <>
            {/* Hero — the purchased logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span className="m-sans" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--m-text-soft)' }}>Your logo</span>
              <span style={{ padding: '3px 8px', borderRadius: 6, background: 'var(--m-success)', color: '#fff', fontFamily: 'var(--m-font-sans),sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.04em' }}>PURCHASED</span>
            </div>
            <h1 className="m-display" style={{ fontSize: 'clamp(24px,3vw,30px)', fontWeight: 700, color: 'var(--m-ink)' }}>{brand}</h1>

            <div className="flex flex-col lg:flex-row" style={{ gap: 32, marginTop: 18, alignItems: 'flex-start' }}>
              {/* Left: the purchased logo + the one-click download */}
              <div style={{ width: '100%', maxWidth: 420, flexShrink: 0 }}>
                <div style={{ width: '100%', aspectRatio: '1 / 1', borderRadius: 20, border: '1px solid var(--m-border)', background: colorMode === 'dark' ? '#141413' : '#FFFFFF', overflow: 'hidden', position: 'relative', transition: 'background 0.2s ease' }}>
                  <div style={{ position: 'absolute', inset: 0 }}>
                    {heroImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={colorMode === 'dark' ? previews?.dark ?? heroImage : colorMode === 'mono' ? previews?.mono ?? heroImage : heroImage}
                        alt={`${brand} logo`}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    ) : (
                      <LogoArtwork variant={PURCHASED} brandName={brand} tagline={tagline} palette={palette} colorMode={colorMode} />
                    )}
                  </div>
                </div>

                {/* Live preview toggle — see the logo full-colour, on dark, or in mono */}
                <div className="flex" style={{ gap: 8, marginTop: 14 }}>
                  {([['full', 'Full colour'], ['dark', 'On dark'], ['mono', 'Mono']] as const).map(([key, label]) => {
                    const active = colorMode === key
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setColorMode(key)}
                        aria-pressed={active ? 'true' : 'false'}
                        className="m-sans"
                        style={{ flex: 1, padding: '8px 10px', borderRadius: 9, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: active ? '1px solid var(--m-brand)' : '1px solid var(--m-border)', background: active ? 'rgba(255,90,31,0.14)' : 'transparent', color: active ? 'var(--m-ink)' : 'var(--m-text-muted)', transition: 'all 0.15s ease' }}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => handleDownload('all')}
                  disabled={downloading !== null}
                  className="m-display"
                  style={{ marginTop: 16, width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: '15px 26px', borderRadius: 'var(--m-radius-lg)', background: 'var(--m-brand)', color: '#fff', fontSize: 15, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', border: 'none', cursor: downloading !== null ? 'wait' : 'pointer', opacity: downloading !== null ? 0.75 : 1 }}
                >
                  {downloading === 'all' ? (
                    <>Preparing your files…</>
                  ) : (
                    <>
                      <DlIcon /> Download all files <span style={{ opacity: 0.7, fontWeight: 600, textTransform: 'none' }}>.zip</span>
                    </>
                  )}
                </button>
                <p className="m-sans" style={{ marginTop: 14, fontSize: 13, color: 'var(--m-text-soft)', textAlign: 'center', lineHeight: 1.5 }}>
                  Yours forever, no subscription — or grab any individual file on the right.
                </p>
              </div>

              {/* Right: every individual download, grouped — fills the space beside the logo */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {DOWNLOADS.map((g, gi) => (
                  <div key={g.group} style={{ marginTop: gi === 0 ? 0 : 26 }}>
                    <div className="m-sans" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--m-text-soft)' }}>{g.group}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" style={{ gap: 12, marginTop: 12 }}>
                      {g.items.map((it) => (
                        <DownloadTile key={it.fmt} item={it} busy={downloading === it.fmt} disabled={downloading !== null} onClick={() => handleDownload(it.fmt)} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter opt-in — small, quiet, post-value consent (a thin row, not a card) */}
            <div style={{ marginTop: 36, paddingTop: 18, borderTop: '1px solid var(--m-border)' }}>
              {subscribed ? (
                <div className="m-sans" style={{ fontSize: 13, color: 'var(--m-text-soft)', display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span aria-hidden="true" style={{ color: 'var(--m-success)' }}>✓</span> Subscribed — thanks!
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center" style={{ gap: 12 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer', flex: 1, minWidth: 0 }}>
                    <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} style={{ width: 14, height: 14, accentColor: 'var(--m-brand)', cursor: 'pointer', flexShrink: 0 }} />
                    <span className="m-sans" style={{ fontSize: 13, color: 'var(--m-text-soft)', lineHeight: 1.4 }}>Email me occasional logo &amp; branding tips. No spam, unsubscribe anytime.</span>
                  </label>
                  <button type="button" disabled={!agree} onClick={() => setSubscribed(true)} className="m-sans" style={{ flexShrink: 0, padding: '8px 16px', borderRadius: 'var(--m-radius-md)', background: 'transparent', color: agree ? 'var(--m-brand)' : 'var(--m-text-soft)', fontSize: 13, fontWeight: 700, border: '1px solid ' + (agree ? 'var(--m-brand)' : 'var(--m-border)'), cursor: agree ? 'pointer' : 'not-allowed', opacity: agree ? 1 : 0.6 }}>
                    Subscribe
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* All concepts — one combined grid, newest first */}
            <h1 className="m-display" style={{ fontSize: 'clamp(24px,3vw,30px)', fontWeight: 700, color: 'var(--m-ink)' }}>Your other logos</h1>
            <p className="m-body" style={{ marginTop: 8, maxWidth: 600, fontSize: 15, color: 'var(--m-text-soft)' }}>
              Every logo you generated, saved as a watermarked preview — newest first. Unlock any in HD for ${PRICE}.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginTop: 28 }}>
              {logos.length > 0
                ? logos.map((src, i) => (
                    <RealTile
                      key={i}
                      src={src}
                      brand={brand}
                      isPurchased={purchased.includes(i)}
                      price={PRICE}
                      onBuy={() => setView('brand')}
                    />
                  ))
                : ALL_CONCEPTS.map((v, i) => (
                    <FreeTile key={i + '-' + v} variant={v} brand={brand} tagline={tagline} palette={palette} />
                  ))}
            </div>
          </>
        )}
      </main>

      {/* Review popup — fires on download (the post-purchase win moment). */}
      {showReview && (
        <div role="dialog" aria-modal="true" onClick={() => setShowReview(false)} style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 400, borderRadius: 18, border: '1px solid var(--m-border)', background: 'var(--m-surface)', padding: '30px 26px', textAlign: 'center', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
            {reviewPhase === 'rate' && (
              <>
                <h3 className="m-display" style={{ fontSize: 20, fontWeight: 700, color: 'var(--m-ink)' }}>Your files are downloading</h3>
                <p className="m-sans" style={{ marginTop: 8, fontSize: 14, color: 'var(--m-text-muted)', lineHeight: 1.5 }}>Enjoying LOGO.AI? Tap a star to rate.</p>
                <div role="radiogroup" aria-label="Rate your experience" onMouseLeave={() => setHoverRating(0)} style={{ marginTop: 18, display: 'flex', justifyContent: 'center', gap: 6 }}>
                  {[1, 2, 3, 4, 5].map((n) => {
                    const active = (hoverRating || rating) >= n
                    return (
                      <button
                        key={n}
                        type="button"
                        role="radio"
                        aria-checked={rating === n ? 'true' : 'false'}
                        aria-label={`${n} star${n > 1 ? 's' : ''}`}
                        onMouseEnter={() => setHoverRating(n)}
                        onClick={() => submitReview(n)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 2, fontSize: 34, lineHeight: 1, color: active ? 'var(--m-star)' : 'var(--m-border-medium, rgba(255,255,255,0.22))', transition: 'color 0.12s ease' }}
                      >
                        {active ? '★' : '☆'}
                      </button>
                    )
                  })}
                </div>
                <button type="button" onClick={() => setShowReview(false)} className="m-sans" style={{ marginTop: 18, background: 'transparent', border: 'none', color: 'var(--m-text-soft)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Maybe later</button>
              </>
            )}

            {reviewPhase === 'write' && (
              <>
                <div aria-hidden="true" style={{ fontSize: 24, color: 'var(--m-star)', letterSpacing: 4 }}>{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</div>
                <h3 className="m-display" style={{ marginTop: 12, fontSize: 19, fontWeight: 700, color: 'var(--m-ink)' }}>
                  {rating >= 4 ? 'Awesome — tell us what you loved' : 'Sorry it wasn’t perfect'}
                </h3>
                <p className="m-sans" style={{ marginTop: 6, fontSize: 13, color: 'var(--m-text-muted)', lineHeight: 1.5 }}>
                  {rating >= 4 ? 'Your words may be featured to help other founders.' : 'Tell us what went wrong — this goes privately to our team.'}
                </p>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={3}
                  placeholder={rating >= 4 ? 'What did you love about LOGO.AI?' : 'What could we do better?'}
                  className="m-sans"
                  style={{ marginTop: 14, width: '100%', resize: 'vertical', padding: '11px 13px', borderRadius: 'var(--m-radius-md)', border: '1px solid var(--m-border)', background: 'var(--m-surface-alt)', color: 'var(--m-ink)', fontSize: 14, lineHeight: 1.5, outline: 'none' }}
                />
                <button type="button" onClick={submitWritten} className="m-display" style={{ marginTop: 14, width: '100%', padding: '13px', borderRadius: 'var(--m-radius-lg)', background: 'var(--m-brand)', color: '#fff', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', border: 'none', cursor: 'pointer' }}>
                  {rating >= 4 ? 'Submit review' : 'Send feedback'}
                </button>
                <button type="button" onClick={() => setShowReview(false)} className="m-sans" style={{ marginTop: 10, background: 'transparent', border: 'none', color: 'var(--m-text-soft)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Skip</button>
              </>
            )}

            {reviewPhase === 'done' && (
              <>
                <div aria-hidden="true" style={{ fontSize: 26, color: 'var(--m-star)', letterSpacing: 4 }}>{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</div>
                <h3 className="m-display" style={{ marginTop: 14, fontSize: 20, fontWeight: 700, color: 'var(--m-ink)' }}>Thank you!</h3>
                <p className="m-sans" style={{ marginTop: 8, fontSize: 14, color: 'var(--m-text-muted)', lineHeight: 1.5 }}>
                  {rating >= 4 ? 'Your review helps other founders find us.' : 'We appreciate the feedback — we’re on it.'}
                </p>
                <button type="button" onClick={() => setShowReview(false)} className="m-sans" style={{ marginTop: 20, background: 'transparent', border: 'none', color: 'var(--m-text-soft)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Close</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Trigger a browser download for a data-URL or blob-URL.
function triggerDownload(href: string, filename: string) {
  const a = document.createElement('a')
  a.href = href
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
}

// A real generated logo tile for the "Other logos" grid. Purchased ones show
// clean with a PURCHASED badge; the rest stay watermarked with a buy hint.
function RealTile({ src, brand, isPurchased, price, onBuy }: { src: string; brand: string; isPurchased: boolean; price: number; onBuy: () => void }) {
  return (
    <button
      type="button"
      onClick={isPurchased ? undefined : onBuy}
      className="group relative overflow-hidden"
      style={{ aspectRatio: '1 / 1', borderRadius: 12, border: '1px solid var(--m-border)', background: '#FFFFFF', padding: 0, cursor: isPurchased ? 'default' : 'pointer', textAlign: 'left' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={`${brand} logo`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }} />
      {!isPurchased && <WatermarkOverlay />}
      {isPurchased ? (
        <span className="absolute" style={{ top: 8, left: 8, padding: '3px 8px', borderRadius: 6, background: 'var(--m-success)', color: '#fff', fontFamily: 'var(--m-font-sans),sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.04em' }}>PURCHASED</span>
      ) : (
        <span aria-hidden="true" className="absolute inset-0 opacity-0 group-hover:opacity-100" style={{ transition: 'opacity 0.18s ease', background: 'linear-gradient(to top, rgba(0,0,0,0.42), rgba(0,0,0,0) 55%)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: 10 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 13px', borderRadius: 8, background: 'var(--m-brand)', color: '#fff', fontFamily: 'var(--m-font-sans),sans-serif', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>
            Get for ${price} →
          </span>
        </span>
      )}
    </button>
  )
}

function FreeTile({ variant, brand, tagline, palette }: { variant: number; brand: string; tagline: string; palette: Palette | null }) {
  return (
    <div className="group relative overflow-hidden" style={{ aspectRatio: '1 / 1', borderRadius: 12, border: '1px solid var(--m-border)', background: '#FFFFFF' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <LogoArtwork variant={variant} brandName={brand} tagline={tagline} palette={palette} />
      </div>
      <WatermarkOverlay />
      <span aria-hidden="true" className="absolute inset-0 opacity-0 group-hover:opacity-100" style={{ transition: 'opacity 0.18s ease', background: 'linear-gradient(to top, rgba(0,0,0,0.42), rgba(0,0,0,0) 55%)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: 10 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 13px', borderRadius: 8, background: 'var(--m-brand)', color: '#fff', fontFamily: 'var(--m-font-sans),sans-serif', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>
          Get for ${PRICE} →
        </span>
      </span>
    </div>
  )
}

// Download-to-line arrow used across the download center.
function DlIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
    </svg>
  )
}

// A single downloadable asset as a horizontal tile in a grid.
function DownloadTile({ item, onClick, busy, disabled }: { item: { label: string; note: string; fmt: string }; onClick: () => void; busy?: boolean; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="m-sans hover:border-[var(--m-brand)] hover:bg-[var(--m-surface-alt)]"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, width: '100%', textAlign: 'left', padding: '14px 16px', borderRadius: 12, border: '1px solid var(--m-border)', background: 'var(--m-surface)', cursor: disabled ? 'wait' : 'pointer', opacity: disabled && !busy ? 0.6 : 1, transition: 'border-color 0.15s ease, background 0.15s ease' }}
    >
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--m-ink)' }}>{item.label}</span>
        <span style={{ fontSize: 12, color: 'var(--m-text-soft)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{busy ? 'Preparing…' : item.note}</span>
      </span>
      <span aria-hidden="true" style={{ color: busy ? 'var(--m-brand)' : 'var(--m-text-muted)', flexShrink: 0, display: 'inline-flex' }}><DlIcon /></span>
    </button>
  )
}

// Shared style for profile-menu rows.
const menuLink: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 8,
  fontSize: 13, fontWeight: 500, color: 'var(--m-text-muted)', textDecoration: 'none',
}

const svgProps = { width: 15, height: 15, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }

function IconSettings() {
  return (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function IconBilling() {
  return (
    <svg {...svgProps}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  )
}

function IconSupport() {
  return (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

function IconLogout() {
  return (
    <svg {...svgProps}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s ease' }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
