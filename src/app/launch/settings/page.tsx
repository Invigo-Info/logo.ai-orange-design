'use client'

import { useState } from 'react'
import LogoWordmark from '@/components/home/LogoWordmark'

// Account settings. PROGRAMMER: hydrate the initial values from the
// authenticated user (GET /api/account) and persist each section with its own
// request (see the per-section notes). All fields below are wired to local
// state only — no save actually persists yet.
export default function SettingsPage() {
  const [name, setName] = useState('John Mayer')
  const [email, setEmail] = useState('john@example.com')
  const [profileSaved, setProfileSaved] = useState(false)

  const [pwCurrent, setPwCurrent] = useState('')
  const [pwNew, setPwNew] = useState('')
  const [pwConfirm, setPwConfirm] = useState('')
  const [pwSaved, setPwSaved] = useState(false)

  function saveProfile(e: React.FormEvent) {
    e.preventDefault()
    // PROGRAMMER: PATCH /api/account { name, email }. If email changes, send a
    // verification email before switching the login address.
    setProfileSaved(true)
  }

  function savePassword(e: React.FormEvent) {
    e.preventDefault()
    if (!pwNew || pwNew !== pwConfirm) return
    // PROGRAMMER: POST /api/account/password { current, new }. Verify the
    // current password server-side; reject if it doesn't match.
    setPwSaved(true)
    setPwCurrent(''); setPwNew(''); setPwConfirm('')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 20px 100px' }}>
      {/* Top bar */}
      <div style={{ width: '100%', maxWidth: 620, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" aria-label="LOGO.AI — home" style={{ display: 'inline-flex', color: 'var(--m-ink)' }}>
          <LogoWordmark className="h-[26px]" />
        </a>
        <a href="/launch/dashboard" className="m-sans" style={{ fontSize: 13, fontWeight: 600, color: 'var(--m-text-soft)', textDecoration: 'none' }}>
          ← Back to dashboard
        </a>
      </div>

      <div style={{ width: '100%', maxWidth: 620, marginTop: 36 }}>
        <h1 className="m-display" style={{ fontSize: 'clamp(24px,3vw,30px)', fontWeight: 700, color: 'var(--m-ink)' }}>Settings</h1>
        <p className="m-sans" style={{ marginTop: 6, fontSize: 14, color: 'var(--m-text-soft)' }}>Manage your account and sign-in details.</p>

        {/* Profile */}
        <form onSubmit={saveProfile} style={cardStyle}>
          <h2 className="m-display" style={sectionTitle}>Profile</h2>
          <label className="m-sans" htmlFor="set-name" style={labelStyle}>Name</label>
          <input id="set-name" value={name} onChange={(e) => { setName(e.target.value); setProfileSaved(false) }} className="m-sans" style={inputStyle} />
          <label className="m-sans" htmlFor="set-email" style={{ ...labelStyle, marginTop: 16 }}>Email</label>
          <input id="set-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setProfileSaved(false) }} className="m-sans" style={inputStyle} />
          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
            <button type="submit" className="m-sans" style={primaryBtn}>Save changes</button>
            {profileSaved && <span className="m-sans" style={savedNote}>✓ Saved</span>}
          </div>
        </form>

        {/* Password */}
        <form onSubmit={savePassword} style={cardStyle}>
          <h2 className="m-display" style={sectionTitle}>Password</h2>
          <label className="m-sans" htmlFor="pw-cur" style={labelStyle}>Current password</label>
          <input id="pw-cur" type="password" value={pwCurrent} onChange={(e) => { setPwCurrent(e.target.value); setPwSaved(false) }} className="m-sans" style={inputStyle} autoComplete="current-password" />
          <div className="flex flex-col sm:flex-row" style={{ gap: 14, marginTop: 16 }}>
            <div style={{ flex: 1 }}>
              <label className="m-sans" htmlFor="pw-new" style={labelStyle}>New password</label>
              <input id="pw-new" type="password" value={pwNew} onChange={(e) => { setPwNew(e.target.value); setPwSaved(false) }} className="m-sans" style={inputStyle} autoComplete="new-password" />
            </div>
            <div style={{ flex: 1 }}>
              <label className="m-sans" htmlFor="pw-conf" style={labelStyle}>Confirm new password</label>
              <input id="pw-conf" type="password" value={pwConfirm} onChange={(e) => { setPwConfirm(e.target.value); setPwSaved(false) }} className="m-sans" style={inputStyle} autoComplete="new-password" />
            </div>
          </div>
          {pwNew && pwConfirm && pwNew !== pwConfirm && (
            <p className="m-sans" style={{ marginTop: 10, fontSize: 12, color: '#ef6a5a' }}>Passwords don&rsquo;t match.</p>
          )}
          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
            <button type="submit" disabled={!pwCurrent || !pwNew || pwNew !== pwConfirm} className="m-sans" style={{ ...primaryBtn, opacity: (!pwCurrent || !pwNew || pwNew !== pwConfirm) ? 0.5 : 1, cursor: (!pwCurrent || !pwNew || pwNew !== pwConfirm) ? 'not-allowed' : 'pointer' }}>Update password</button>
            {pwSaved && <span className="m-sans" style={savedNote}>✓ Password updated</span>}
          </div>
        </form>

        {/* Danger zone */}
        <div style={{ ...cardStyle, borderColor: 'rgba(239,106,90,0.4)' }}>
          <h2 className="m-display" style={sectionTitle}>Delete account</h2>
          <p className="m-sans" style={{ fontSize: 13, color: 'var(--m-text-soft)', lineHeight: 1.5 }}>
            Permanently delete your account and all saved logos. Purchased logos remain yours, but you&rsquo;ll lose access to re-download them here. This can&rsquo;t be undone.
          </p>
          {/* PROGRAMMER: DELETE /api/account behind a confirmation modal + re-auth. */}
          <button type="button" className="m-sans" style={{ marginTop: 16, padding: '11px 20px', borderRadius: 'var(--m-radius-md)', background: 'transparent', color: '#ef6a5a', fontSize: 13, fontWeight: 700, border: '1px solid rgba(239,106,90,0.5)', cursor: 'pointer' }}>
            Delete my account
          </button>
        </div>
      </div>
    </div>
  )
}

const cardStyle: React.CSSProperties = {
  marginTop: 22, padding: 'clamp(20px,3vw,28px)', borderRadius: 16,
  border: '1px solid var(--m-border)', background: 'var(--m-surface)',
}
const sectionTitle: React.CSSProperties = { fontSize: 16, fontWeight: 700, color: 'var(--m-ink)', marginBottom: 16 }
const labelStyle: React.CSSProperties = { display: 'block', marginBottom: 7, fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', color: 'var(--m-text-soft)' }
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px', borderRadius: 'var(--m-radius-md)',
  border: '1px solid var(--m-border)', background: 'var(--m-surface-alt)',
  color: 'var(--m-ink)', fontSize: 14, outline: 'none',
}
const primaryBtn: React.CSSProperties = {
  padding: '11px 22px', borderRadius: 'var(--m-radius-md)', background: 'var(--m-brand)',
  color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer',
}
const savedNote: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: 'var(--m-success)' }
