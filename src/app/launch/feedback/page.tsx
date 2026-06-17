'use client'

import { useState } from 'react'
import LogoWordmark from '@/components/home/LogoWordmark'

const TYPES = ['Idea', 'Bug', 'Question', 'Other']

export default function FeedbackPage() {
  const [type, setType] = useState('Idea')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim()) return
    // PROGRAMMER: POST { type, message, email } to your feedback endpoint
    // (DB / email / tool like Linear or Canny). This is a mock.
    setSent(true)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 20px 80px' }}>
      {/* Top bar */}
      <div style={{ width: '100%', maxWidth: 560, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" aria-label="LOGO.AI — home" style={{ display: 'inline-flex', color: 'var(--m-ink)' }}>
          <LogoWordmark className="h-[26px]" />
        </a>
        <a href="/launch/dashboard" className="m-sans" style={{ fontSize: 13, fontWeight: 600, color: 'var(--m-text-soft)', textDecoration: 'none' }}>
          ← Back to dashboard
        </a>
      </div>

      <div style={{ width: '100%', maxWidth: 560, marginTop: 40, borderRadius: 18, border: '1px solid var(--m-border)', background: 'var(--m-surface)', padding: 'clamp(24px,4vw,36px)' }}>
        {sent ? (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div aria-hidden="true" style={{ width: 48, height: 48, borderRadius: '50%', margin: '0 auto', background: 'var(--m-success)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700 }}>✓</div>
            <h1 className="m-display" style={{ marginTop: 16, fontSize: 22, fontWeight: 700, color: 'var(--m-ink)' }}>Thanks for the feedback!</h1>
            <p className="m-sans" style={{ marginTop: 8, fontSize: 14, color: 'var(--m-text-muted)' }}>We read every message — it genuinely helps us improve.</p>
            <a href="/launch/dashboard" className="m-sans" style={{ marginTop: 22, display: 'inline-flex', padding: '12px 22px', borderRadius: 'var(--m-radius-md)', background: 'var(--m-brand)', color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
              Back to dashboard
            </a>
          </div>
        ) : (
          <form onSubmit={submit}>
            <h1 className="m-display" style={{ fontSize: 'clamp(22px,3vw,26px)', fontWeight: 700, color: 'var(--m-ink)' }}>Send us feedback</h1>
            <p className="m-sans" style={{ marginTop: 8, fontSize: 14, color: 'var(--m-text-soft)', lineHeight: 1.5 }}>
              Found a bug, have an idea, or something didn&rsquo;t feel right? Tell us — it goes straight to the team.
            </p>

            {/* Type */}
            <div className="m-sans" style={{ marginTop: 22, fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', color: 'var(--m-text-soft)' }}>What&rsquo;s this about?</div>
            <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {TYPES.map((t) => {
                const active = t === type
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className="m-sans"
                    style={{
                      padding: '8px 16px',
                      borderRadius: 9999,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: active ? '1px solid var(--m-brand)' : '1px solid var(--m-border)',
                      background: active ? 'var(--m-brand)' : 'transparent',
                      color: active ? '#fff' : 'var(--m-text-muted)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {t}
                  </button>
                )
              })}
            </div>

            {/* Message */}
            <label className="m-sans" htmlFor="fb-msg" style={{ display: 'block', marginTop: 20, fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', color: 'var(--m-text-soft)' }}>Your message</label>
            <textarea
              id="fb-msg"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="What's on your mind?"
              className="m-sans"
              style={{ marginTop: 8, width: '100%', resize: 'vertical', padding: '12px 14px', borderRadius: 'var(--m-radius-md)', border: '1px solid var(--m-border)', background: 'var(--m-surface-alt)', color: 'var(--m-ink)', fontSize: 14, lineHeight: 1.5, outline: 'none' }}
            />

            {/* Email (optional) */}
            <label className="m-sans" htmlFor="fb-email" style={{ display: 'block', marginTop: 18, fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', color: 'var(--m-text-soft)' }}>Email <span style={{ fontWeight: 400, textTransform: 'none' }}>(optional — if you&rsquo;d like a reply)</span></label>
            <input
              id="fb-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="m-sans"
              style={{ marginTop: 8, width: '100%', padding: '12px 14px', borderRadius: 'var(--m-radius-md)', border: '1px solid var(--m-border)', background: 'var(--m-surface-alt)', color: 'var(--m-ink)', fontSize: 14, outline: 'none' }}
            />

            <button
              type="submit"
              disabled={!message.trim()}
              className="m-sans"
              style={{ marginTop: 24, width: '100%', padding: '14px', borderRadius: 'var(--m-radius-lg)', background: 'var(--m-brand)', color: '#fff', fontSize: 15, fontWeight: 700, border: 'none', cursor: message.trim() ? 'pointer' : 'not-allowed', opacity: message.trim() ? 1 : 0.5 }}
            >
              Send feedback
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
