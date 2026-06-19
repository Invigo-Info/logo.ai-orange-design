'use client'

// Checkout modal — Design N. Direct port of the HEADSHOT S1
// CheckoutModal: top bar with "Secure Checkout", social-proof strip,
// two-column body (payment methods + card form on left, order summary
// on right), green Stripe-style pay button, animated success screen.
// Recoloured with launch's terracotta + success tokens. Single-item
// pricing — one logo at $49.

import { useEffect, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'

type PaymentMethod = 'card' | 'applepay' | 'gpay' | 'paypal'

type Props = {
  open: boolean
  index: number
  price: number
  preview: ReactNode
  onClose: () => void
  onPaid: () => void
  /** Where to send the user after they hit the success-screen CTA. */
  dashboardHref?: string
  /** When set, the success-screen CTA calls this instead of navigating to
   *  dashboardHref — used when checkout happens *inside* the dashboard so it
   *  reveals the bought logo in place rather than reloading the page. */
  onViewDashboard?: () => void
}

/* ---------- icons ---------- */

function LockIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ stroke: 'var(--n-check, #00A63E)' }} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ stroke: 'var(--n-check, #00A63E)' }} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ stroke: 'var(--n-check, #00A63E)' }} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}
function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}
function Spinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="n-co-spin">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function CardBrand({ label, bg, color = '#FFFFFF', w = 38 }: { label: string; bg: string; color?: string; w?: number }) {
  return (
    <span
      className="m-display flex items-center justify-center"
      style={{
        width: w,
        height: 24,
        borderRadius: 4,
        background: bg,
        color,
        fontSize: 9,
        fontWeight: 800,
        letterSpacing: '0.06em',
      }}
    >
      {label}
    </span>
  )
}

/* ---------- modal ---------- */

export default function NCheckoutModal({ open, index, price, preview, onClose, onPaid, dashboardHref = '/launch/dashboard', onViewDashboard }: Props) {
  const router = useRouter()
  const [method, setMethod] = useState<PaymentMethod>('card')
  const [paying, setPaying] = useState(false)
  const [success, setSuccess] = useState(false)
  const [orderNum] = useState(() => `LA-${Date.now().toString(36).toUpperCase()}`)

  useEffect(() => {
    if (!open) {
      setSuccess(false)
      setPaying(false)
      return
    }
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !success) onClose()
    }
    document.addEventListener('keydown', onEsc)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onEsc)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose, success])

  if (!open) return null

  const total = price
  const original = Math.round(price * 1.8)
  const discount = original - total
  const fmt = (n: number) => `$${n}`

  function handlePay() {
    setPaying(true)
    setTimeout(() => {
      setPaying(false)
      setSuccess(true)
      onPaid()
    }, 1200)
  }

  return (
    <div
      role="presentation"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      style={{
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        padding: 16,
      }}
    >
      <style>{`
        @keyframes nCoFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes nCoScale { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes nCoSpin { to { transform: rotate(360deg); } }
        .n-co-spin { animation: nCoSpin 0.8s linear infinite; }
        .n-co-field:focus { border-color: var(--m-brand) !important; }
      `}</style>

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="n-co-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full"
        style={{
          maxWidth: 960,
          margin: '8px 0',
          borderRadius: 16,
          overflow: 'hidden',
          background: 'var(--n-checkout-modal-bg, #F8F9FB)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
          animation: 'nCoFade 0.25s ease',
        }}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between"
          style={{
            background: 'var(--m-surface)',
            borderBottom: '1px solid var(--m-border)',
            padding: '14px 20px',
          }}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="m-sans inline-flex items-center gap-1"
              aria-label="Back"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--m-text-soft)', fontSize: 13 }}
            >
              <BackIcon />
              <span>Back</span>
            </button>
            <span className="hidden sm:inline-block" style={{ width: 1, height: 20, background: 'var(--m-border)' }} />
            <span
              className="hidden sm:inline m-display"
              style={{
                fontFamily: 'var(--m-logo-font, var(--m-font-wordmark), serif)',
                fontWeight: 'var(--m-logo-weight, 400)',
                fontSize: 20,
                color: 'var(--m-logo-color, var(--m-ink))',
                letterSpacing: 'var(--m-logo-tracking, -0.02em)',
              }}
            >
              LOGO<span style={{ color: 'var(--m-logo-color, var(--m-brand))' }}>.</span>AI
            </span>
          </div>
          <div
            className="m-display inline-flex items-center gap-1.5"
            style={{ color: 'var(--m-success)', fontSize: 12, fontWeight: 700 }}
          >
            <LockIcon />
            Secure Checkout
          </div>
        </div>

        {success ? (
          /* --- success screen --- */
          <div className="flex flex-col items-center" style={{ padding: '40px 24px' }}>
            <div
              className="flex items-center justify-center"
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: '#F0FDF4',
                animation: 'nCoScale 0.4s ease-out',
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" style={{ stroke: 'var(--n-check, #00A63E)' }} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>

            <h2 className="m-display mt-5" style={{ fontSize: 24, fontWeight: 700, color: 'var(--m-ink)' }}>
              Payment Successful!
            </h2>

            {/* The logo they just bought */}
            <div
              className="mt-6 overflow-hidden"
              style={{ width: '100%', maxWidth: 320, aspectRatio: '1 / 1', borderRadius: 16, border: '1px solid var(--m-border)', background: '#FFFFFF', position: 'relative' }}
            >
              <div style={{ position: 'absolute', inset: 0 }}>{preview}</div>
            </div>

            <div
              className="w-full overflow-hidden mt-5"
              style={{ maxWidth: 420, borderRadius: 16, border: '1px solid var(--m-border)', background: 'var(--m-surface)' }}
            >
              <div style={{ padding: '16px 24px' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="m-display" style={{ fontSize: 15, fontWeight: 700, color: 'var(--m-ink)' }}>
                      Logo #{index + 1}
                    </span>
                    <span className="m-sans" style={{ marginLeft: 8, fontSize: 13, color: 'var(--m-text-soft)' }}>
                      · Full vector pack
                    </span>
                  </div>
                  <span className="m-display" style={{ fontSize: 15, fontWeight: 700, color: 'var(--m-brand)' }}>
                    {fmt(total)}
                  </span>
                </div>
              </div>
              <div
                style={{
                  borderTop: '1px solid var(--m-border)',
                  background: '#F8F9FB',
                  padding: '10px 24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <p className="m-sans" style={{ fontSize: 12, color: 'var(--m-text-soft)' }}>
                  Order {orderNum}
                </p>
                <p className="m-sans" style={{ fontSize: 12, color: 'var(--m-text-soft)' }}>
                  Receipt sent to your email
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onViewDashboard) onViewDashboard()
                else router.push(dashboardHref)
              }}
              className="m-cta-btn w-full mt-7 inline-flex items-center justify-center gap-2"
              style={{
                maxWidth: 420,
                padding: '14px 16px',
                borderRadius: 12,
                border: 'none',
                color: 'var(--m-on-brand, #FFFFFF)',
                fontFamily: 'var(--m-font-sans), sans-serif',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              View in my dashboard
              <ArrowIcon />
            </button>

            <p className="m-sans mt-4" style={{ fontSize: 12, color: 'var(--m-text-soft)' }}>
              Powered by <span className="m-display" style={{ color: '#6772E5', fontWeight: 700 }}>stripe</span>
            </p>
          </div>
        ) : (
          <>
            {/* Social proof strip */}
            <div
              className="m-sans"
              style={{
                borderBottom: '1px solid var(--m-border)',
                background: 'var(--n-checkout-strip-bg, linear-gradient(to right, #F5E2DA, #F0EEE6))',
                padding: '8px 20px',
                textAlign: 'center',
                fontSize: 12,
                color: 'var(--m-text-soft)',
              }}
            >
              <span style={{ letterSpacing: '0.12em', color: 'var(--n-rating-star, #16A34A)' }}>★★★★★</span>{' '}
              <strong style={{ color: 'var(--m-ink)' }}>4.9/5</strong> Verified Average Rating · Trusted by{' '}
              <strong style={{ color: 'var(--m-ink)' }}>180,000+</strong> brands
            </div>

            {/* Body */}
            <div
              className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 lg:gap-6"
              style={{ padding: 16 }}
            >
              {/* LEFT — payment method */}
              <div
                className="overflow-hidden"
                style={{ borderRadius: 16, border: '1px solid var(--m-border)', background: 'var(--m-surface)' }}
              >
                <div style={{ padding: '16px 20px 2px' }}>
                  <h2 id="n-co-title" className="m-display" style={{ fontSize: 18, fontWeight: 700, color: 'var(--m-ink)' }}>
                    Select your payment method
                  </h2>
                  <p className="m-sans" style={{ fontSize: 12, color: 'var(--m-text-soft)', marginTop: 2 }}>
                    All transactions are encrypted and secure
                  </p>
                </div>

                <div className="flex flex-col gap-2" style={{ padding: '14px 20px' }}>
                  <MethodOption
                    selected={method === 'card'}
                    onSelect={() => setMethod('card')}
                    name="Credit / Debit Card"
                    icons={
                      <>
                        <CardBrand label="VISA" bg="#1A1F71" />
                        <CardBrand label="MC" bg="#FF5F00" />
                        <CardBrand label="AMEX" bg="#016FD0" />
                      </>
                    }
                  />
                  <MethodOption
                    selected={method === 'applepay'}
                    onSelect={() => setMethod('applepay')}
                    name="Apple Pay"
                    icons={<CardBrand label=" Pay" bg="#000000" w={50} />}
                  />
                  <MethodOption
                    selected={method === 'gpay'}
                    onSelect={() => setMethod('gpay')}
                    name="Google Pay"
                    icons={
                      <span
                        className="m-display flex items-center"
                        style={{ height: 24, gap: 1, padding: '0 8px', borderRadius: 4, border: '1px solid var(--m-border)', background: '#FFFFFF', fontSize: 13, fontWeight: 600 }}
                      >
                        <span style={{ color: '#4285F4' }}>G</span>
                        <span style={{ color: '#EA4335' }}>o</span>
                        <span style={{ color: '#FBBC05' }}>o</span>
                        <span style={{ color: '#4285F4' }}>g</span>
                        <span style={{ color: '#34A853' }}>l</span>
                        <span style={{ color: '#EA4335' }}>e</span>
                        <span style={{ marginLeft: 3, color: '#5F6368' }}>Pay</span>
                      </span>
                    }
                  />
                  <MethodOption
                    selected={method === 'paypal'}
                    onSelect={() => setMethod('paypal')}
                    name="PayPal"
                    icons={<CardBrand label="PayPal" bg="#003087" w={56} />}
                  />
                </div>

                {method === 'card' && (
                  <div style={{ padding: '0 20px 14px' }}>
                    <Field label="Card Number">
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="1234 5678 9012 3456"
                        className="n-co-field w-full"
                        style={fieldInputStyle}
                      />
                    </Field>
                    <div className="grid grid-cols-3 gap-2.5">
                      <Field label="Expiry">
                        <input type="text" placeholder="MM / YY" className="n-co-field w-full" style={fieldInputStyle} />
                      </Field>
                      <Field label="CVC">
                        <input type="text" inputMode="numeric" placeholder="123" className="n-co-field w-full" style={fieldInputStyle} />
                      </Field>
                      <Field label="Name on Card">
                        <input type="text" placeholder="John Doe" className="n-co-field w-full" style={fieldInputStyle} />
                      </Field>
                    </div>
                  </div>
                )}

                {method !== 'card' && (
                  <div style={{ padding: '0 20px 14px' }}>
                    <div
                      className="m-sans"
                      style={{
                        borderRadius: 8,
                        border: '1px dashed var(--m-border)',
                        background: '#FAFBFF',
                        padding: '16px 14px',
                        textAlign: 'center',
                        fontSize: 13,
                        color: 'var(--m-text-soft)',
                      }}
                    >
                      You&rsquo;ll be redirected to complete payment with{' '}
                      {method === 'applepay' ? 'Apple Pay' : method === 'gpay' ? 'Google Pay' : 'PayPal'}.
                    </div>
                  </div>
                )}

                <div style={{ padding: '0 20px 14px' }}>
                  <button
                    type="button"
                    className="m-sans"
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--m-brand)', fontSize: 12 }}
                  >
                    Got a coupon or discount? Enter it here.
                  </button>
                </div>

                <div
                  className="flex flex-wrap gap-3.5 m-sans"
                  style={{ borderTop: '1px solid var(--m-border)', padding: '10px 20px', fontSize: 11, color: 'var(--m-text-soft)' }}
                >
                  <TrustItem icon={<LockIcon />}>SSL encrypted</TrustItem>
                  <TrustItem icon={<ClockIcon />}>No subscriptions</TrustItem>
                  <TrustItem icon={<CheckIcon />}>No hidden fees</TrustItem>
                </div>
              </div>

              {/* RIGHT — order summary */}
              <div className="flex flex-col gap-3 self-start" style={{ position: 'sticky', top: 16 }}>
                <div
                  className="overflow-hidden"
                  style={{ borderRadius: 16, border: '1px solid var(--m-border)', background: 'var(--m-surface)' }}
                >
                  <div
                    className="flex items-center justify-between"
                    style={{ borderBottom: '1px solid var(--m-border)', padding: '14px 20px' }}
                  >
                    <h3 className="m-display" style={{ fontSize: 15, fontWeight: 700, color: 'var(--m-ink)' }}>
                      Order Summary
                    </h3>
                  </div>

                  {/* item */}
                  <div style={{ borderBottom: '1px solid var(--m-border)', padding: '14px 20px' }}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="m-display" style={{ fontSize: 14, fontWeight: 700, color: 'var(--m-ink)' }}>
                          Logo #{index + 1}
                        </div>
                        {discount > 0 && (
                          <span
                            className="m-display"
                            style={{
                              display: 'inline-block',
                              marginTop: 4,
                              padding: '1px 6px',
                              borderRadius: 4,
                              background: '#FFF0F0',
                              color: '#E53E3E',
                              fontSize: 10,
                              fontWeight: 700,
                            }}
                          >
                            {Math.round((discount / original) * 100)}% OFF
                          </span>
                        )}
                      </div>
                      <div className="m-display" style={{ textAlign: 'right', fontSize: 14, fontWeight: 700, color: 'var(--m-ink)' }}>
                        {discount > 0 && (
                          <span style={{ marginRight: 6, fontSize: 12, fontWeight: 400, color: '#B0B0C0', textDecoration: 'line-through' }}>
                            {fmt(original)}
                          </span>
                        )}
                        {fmt(total)}
                      </div>
                    </div>

                    {/* preview thumb */}
                    <div
                      className="mt-3 relative overflow-hidden"
                      style={{ aspectRatio: '4 / 3', borderRadius: 10, border: '1px solid var(--m-border)', background: 'var(--m-surface-alt)' }}
                    >
                      {preview}
                    </div>

                    <ul className="flex flex-col gap-1.5" style={{ marginTop: 10 }}>
                      {[
                        'Every format you need — PNG, SVG, PDF, EPS',
                        'Transparent background — works on any colour',
                        'Re-download anytime — no recurring fees',
                        'Full commercial license — use it anywhere',
                        '100% satisfaction guarantee — or full refund',
                      ].map((b) => (
                        <li key={b} className="flex items-start gap-1.5 m-sans" style={{ fontSize: 12, lineHeight: 1.4, color: 'var(--m-text-soft)' }}>
                          <CheckIcon />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* totals */}
                  <div style={{ borderBottom: '1px solid var(--m-border)', padding: '10px 20px' }}>
                    <div className="flex justify-between m-sans" style={{ fontSize: 13, color: 'var(--m-text-soft)' }}>
                      <span>Subtotal</span>
                      <span style={discount > 0 ? { color: '#B0B0C0', textDecoration: 'line-through' } : undefined}>
                        {fmt(original)}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between m-sans" style={{ marginTop: 4, fontSize: 13, color: 'var(--m-success)' }}>
                        <span>Discount</span>
                        <span>−{fmt(discount)}</span>
                      </div>
                    )}
                    <div
                      className="flex justify-between m-display"
                      style={{ marginTop: 6, paddingTop: 6, borderTop: '1px solid var(--m-border)', fontSize: 15, fontWeight: 700, color: 'var(--m-ink)' }}
                    >
                      <span>Total <span className="m-sans" style={{ fontWeight: 500, fontSize: 12, color: 'var(--m-text-soft)' }}>(one-time)</span></span>
                      <span style={{ fontSize: 16, color: 'var(--m-brand)' }}>{fmt(total)}</span>
                    </div>
                    <div
                      className="m-sans text-center"
                      style={{ marginTop: 8, fontSize: 11, color: 'var(--m-text-soft)', lineHeight: 1.4 }}
                    >
                      One-time payment · No subscription · No hidden fees
                    </div>
                  </div>

                  {/* pay button (S1 uses green/success) */}
                  <div style={{ padding: '14px 20px' }}>
                    <button
                      type="button"
                      onClick={handlePay}
                      disabled={paying}
                      className="m-display w-full inline-flex items-center justify-center gap-2"
                      style={{
                        padding: '12px 14px',
                        borderRadius: 10,
                        border: 'none',
                        background: 'var(--m-success)',
                        color: 'var(--m-on-brand, #FFFFFF)',
                        fontSize: 15,
                        fontWeight: 700,
                        cursor: paying ? 'wait' : 'pointer',
                        opacity: paying ? 0.7 : 1,
                        transition: 'background 0.15s ease, opacity 0.15s ease',
                      }}
                      onMouseEnter={(e) => { if (!paying) (e.currentTarget as HTMLElement).style.background = 'var(--m-success-bold, #00903A)' }}
                      onMouseLeave={(e) => { if (!paying) (e.currentTarget as HTMLElement).style.background = 'var(--m-success)' }}
                    >
                      {paying ? (
                        <>
                          <Spinner />
                          Processing…
                        </>
                      ) : (
                        <>
                          <LockIcon size={16} />
                          Pay {fmt(total)} · one-time
                        </>
                      )}
                    </button>
                  </div>

                  <div
                    className="flex items-center justify-between"
                    style={{ borderTop: '1px solid var(--m-border)', padding: '10px 20px' }}
                  >
                    <div className="flex items-center gap-1.5">
                      <ShieldIcon />
                      <strong className="m-display" style={{ fontSize: 12, color: 'var(--m-ink)' }}>
                        100% Money-Back Guarantee
                      </strong>
                    </div>
                    <div className="flex items-center gap-1 m-sans" style={{ fontSize: 10, color: '#B0B0C0' }}>
                      Powered by <span className="m-display" style={{ color: '#6772E5', fontWeight: 700 }}>stripe</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ---------- sub-components ---------- */

const fieldInputStyle = {
  padding: '9px 12px',
  borderRadius: 8,
  border: '1px solid var(--m-border)',
  background: 'var(--m-surface)',
  fontFamily: 'var(--m-font-sans), sans-serif',
  fontSize: 14,
  color: 'var(--m-ink)',
  outline: 'none',
  transition: 'border-color 0.15s ease',
} as const

function MethodOption({
  selected,
  onSelect,
  name,
  icons,
}: {
  selected: boolean
  onSelect: () => void
  name: string
  icons: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex items-center justify-between"
      style={{
        padding: '11px 16px',
        borderRadius: 10,
        border: `2px solid ${selected ? 'var(--m-brand)' : 'var(--m-border)'}`,
        background: selected ? 'var(--m-brand-soft)' : 'var(--m-surface)',
        cursor: 'pointer',
        transition: 'border-color 0.15s ease, background 0.15s ease',
      }}
    >
      <span className="flex items-center gap-3">
        <span
          className="flex items-center justify-center shrink-0"
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            border: `2px solid ${selected ? 'var(--m-brand)' : 'var(--m-border)'}`,
            background: selected ? 'var(--m-brand)' : 'transparent',
            transition: 'border-color 0.15s ease, background 0.15s ease',
          }}
        >
          {selected && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFFFFF' }} />}
        </span>
        <span className="m-display" style={{ fontSize: 15, fontWeight: 600, color: 'var(--m-ink)' }}>
          {name}
        </span>
      </span>
      <span className="flex items-center gap-1.5">{icons}</span>
    </button>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block" style={{ marginBottom: 10 }}>
      <span
        className="block m-display"
        style={{
          marginBottom: 4,
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--m-text-soft)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
      {children}
    </label>
  )
}

function TrustItem({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="flex items-center gap-1.5">
      <span style={{ color: 'var(--m-success)' }}>{icon}</span>
      {children}
    </span>
  )
}
