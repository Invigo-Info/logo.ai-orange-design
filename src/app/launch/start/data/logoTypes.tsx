import type React from 'react'

export const LOGO_TYPES = [
  { name: 'Wordmark',         pct: 35, desc: 'Brand name only, styled with custom typography', ex: 'Google, Coca-Cola, FedEx' },
  { name: 'Combination Mark', pct: 22, desc: 'Icon paired with text, the most versatile', ex: 'Adidas, Doritos, Lacoste' },
  { name: 'Abstract Mark',    pct: 20, desc: 'Non-representational geometric form, unique and ownable', ex: 'Pepsi, Airbnb, BP' },
  { name: 'Lettermark',       pct: 15, desc: 'Initials only, compact and memorable', ex: 'IBM, HBO, CNN' },
  { name: 'Brandmark',        pct: 5,  desc: 'Icon only, no text — requires strong recognition', ex: 'Apple, Nike, Twitter' },
  { name: 'Emblem',           pct: 3,  desc: 'Text inside a shape like a badge or seal', ex: 'Starbucks, Harley-Davidson' },
]

export const STYLE_ICONS: Record<string, React.ReactNode> = {
  Wordmark: (
    <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <text x="60" y="42" textAnchor="middle" fontFamily="'DM Serif Display', Georgia, serif" fontSize="34" fontWeight="700" fill="currentColor" letterSpacing="-0.5">Aa</text>
    </svg>
  ),
  'Combination Mark': (
    <svg viewBox="0 0 140 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="26" cy="30" r="14" fill="currentColor" />
      <text x="92" y="42" textAnchor="middle" fontFamily="'DM Serif Display', Georgia, serif" fontSize="28" fontWeight="700" fill="currentColor" letterSpacing="-0.5">Aa</text>
    </svg>
  ),
  'Abstract Mark': (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <path d="M40 10 L66 25 L66 55 L40 70 L14 55 L14 25 Z" fill="currentColor" />
    </svg>
  ),
  Lettermark: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <text x="40" y="62" textAnchor="middle" fontFamily="'DM Serif Display', Georgia, serif" fontSize="68" fontWeight="800" fill="currentColor" letterSpacing="-2">A</text>
    </svg>
  ),
  Brandmark: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="40" cy="40" r="26" fill="currentColor" />
    </svg>
  ),
  Emblem: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="40" cy="40" r="30" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="40" cy="40" r="24" fill="none" stroke="currentColor" strokeWidth="1" />
      <text x="40" y="46" textAnchor="middle" fontFamily="'DM Serif Display', Georgia, serif" fontSize="14" fontWeight="700" fill="currentColor" letterSpacing="3">AB</text>
    </svg>
  ),
}
