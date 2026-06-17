'use client'

import { useEffect, useState } from 'react'
import LogoWordmark from '@/components/home/LogoWordmark'

// Billing & purchases. PROGRAMMER: load the real purchase history and payment
// method from your payment provider (e.g. Stripe). LOGO.AI sells one-time logo
// purchases (no subscription), so this lists individual orders + invoices.
export default function BillingPage() {
  const [brand, setBrand] = useState('Velvet Roast')

  useEffect(() => {
    try {
      const raw = localStorage.getItem('logoai_brief')
      if (!raw) return
      const b = JSON.parse(raw)
      if (typeof b.brandName === 'string' && b.brandName.trim()) setBrand(b.brandName.trim())
    } catch {}
  }, [])

  // PROGRAMMER: replace with real orders from the payment provider.
  const purchases = [
    { id: 'inv_001', item: `${brand} — logo & brand kit`, date: 'Jun 13, 2026', amount: '$49.00', status: 'Paid' },
  ]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 20px 100px' }}>
      {/* Top bar */}
      <div style={{ width: '100%', maxWidth: 640, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" aria-label="LOGO.AI — home" style={{ display: 'inline-flex', color: 'var(--m-ink)' }}>
          <LogoWordmark className="h-[26px]" />
        </a>
        <a href="/launch/dashboard" className="m-sans" style={{ fontSize: 13, fontWeight: 600, color: 'var(--m-text-soft)', textDecoration: 'none' }}>
          ← Back to dashboard
        </a>
      </div>

      <div style={{ width: '100%', maxWidth: 640, marginTop: 36 }}>
        <h1 className="m-display" style={{ fontSize: 'clamp(24px,3vw,30px)', fontWeight: 700, color: 'var(--m-ink)' }}>Billing</h1>
        <p className="m-sans" style={{ marginTop: 6, fontSize: 14, color: 'var(--m-text-soft)' }}>
          One-time purchases — no subscription, nothing recurring.
        </p>

        {/* Purchase history */}
        <div style={card}>
          <h2 className="m-display" style={cardTitle}>Purchase history</h2>
          <div style={{ marginTop: 4, borderRadius: 12, border: '1px solid var(--m-border)', overflow: 'hidden' }}>
            {purchases.map((p, i) => (
              <div key={p.id} className="flex flex-col sm:flex-row sm:items-center" style={{ gap: 10, padding: '14px 16px', borderTop: i === 0 ? 'none' : '1px solid var(--m-border)' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="m-sans" style={{ fontSize: 14, fontWeight: 600, color: 'var(--m-ink)' }}>{p.item}</div>
                  <div className="m-sans" style={{ fontSize: 12, color: 'var(--m-text-soft)', marginTop: 2 }}>{p.date}</div>
                </div>
                <div className="m-sans" style={{ fontSize: 14, fontWeight: 600, color: 'var(--m-ink)' }}>{p.amount}</div>
                <span className="m-sans" style={{ padding: '3px 9px', borderRadius: 6, background: 'var(--m-success)', color: '#fff', fontSize: 11, fontWeight: 700 }}>{p.status}</span>
                {/* PROGRAMMER: link to the provider-hosted invoice PDF for this order. */}
                <a href="/coming-soon" className="m-sans" style={{ fontSize: 13, fontWeight: 600, color: 'var(--m-brand)', textDecoration: 'none', whiteSpace: 'nowrap' }}>Invoice ↓</a>
              </div>
            ))}
          </div>
        </div>

        {/* Payment method */}
        <div style={card}>
          <h2 className="m-display" style={cardTitle}>Payment method</h2>
          <div className="flex flex-col sm:flex-row sm:items-center" style={{ gap: 12 }}>
            <div className="flex items-center" style={{ gap: 12, flex: 1, minWidth: 0 }}>
              <span aria-hidden="true" style={{ width: 42, height: 30, borderRadius: 6, border: '1px solid var(--m-border)', background: 'var(--m-surface-alt)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--m-text-soft)' }}>VISA</span>
              <div className="m-sans" style={{ fontSize: 14, color: 'var(--m-ink)' }}>
                •••• •••• •••• 4242 <span style={{ color: 'var(--m-text-soft)' }}>· expires 08/29</span>
              </div>
            </div>
            {/* PROGRAMMER: open the provider's customer portal / update-card flow. */}
            <a href="/coming-soon" className="m-sans" style={{ flexShrink: 0, padding: '9px 18px', borderRadius: 'var(--m-radius-md)', background: 'transparent', color: 'var(--m-ink)', fontSize: 13, fontWeight: 600, border: '1px solid var(--m-border)', textDecoration: 'none' }}>
              Update
            </a>
          </div>
        </div>

        <p className="m-sans" style={{ marginTop: 18, fontSize: 12, color: 'var(--m-text-soft)', textAlign: 'center' }}>
          Questions about a charge? <a href="/launch/feedback" style={{ color: 'var(--m-brand)', textDecoration: 'none', fontWeight: 600 }}>Contact us</a>.
        </p>
      </div>
    </div>
  )
}

const card: React.CSSProperties = {
  marginTop: 22, padding: 'clamp(20px,3vw,28px)', borderRadius: 16,
  border: '1px solid var(--m-border)', background: 'var(--m-surface)',
}
const cardTitle: React.CSSProperties = { fontSize: 16, fontWeight: 700, color: 'var(--m-ink)', marginBottom: 16 }
