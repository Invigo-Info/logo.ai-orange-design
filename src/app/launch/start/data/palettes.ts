export type Palette = {
  name: string
  colors: { name: string; hex: string; desc: string }[]
}

export type PaletteWithHint = Palette & { hint: string }

export const PALETTES: PaletteWithHint[] = [
  {
    name: 'Bold',
    hint: 'Punchy and high-energy',
    colors: [
      { name: 'Crimson',  hex: '#DC2626', desc: 'A confident, attention-grabbing red' },
      { name: 'Charcoal', hex: '#1F2937', desc: 'Anchors the palette with depth' },
      { name: 'Cream',    hex: '#FEF3C7', desc: 'Softens the contrast' },
    ],
  },
  {
    name: 'Cool',
    hint: 'Calm and trustworthy',
    colors: [
      { name: 'Deep Navy', hex: '#1E3A5F', desc: 'Conveys authority and trust' },
      { name: 'Sky Blue',  hex: '#3B82F6', desc: 'Adds clarity and approachability' },
      { name: 'Soft Mint', hex: '#A7F3D0', desc: 'A fresh, modern accent' },
    ],
  },
  {
    name: 'Warm',
    hint: 'Friendly and inviting',
    colors: [
      { name: 'Burnt Orange', hex: '#EA580C', desc: 'Bright and welcoming' },
      { name: 'Brick',        hex: '#9A3412', desc: 'Grounds the palette with warmth' },
      { name: 'Buttercream',  hex: '#FEF3C7', desc: 'A soft, cosy backdrop' },
    ],
  },
  {
    name: 'Earthy',
    hint: 'Natural and grounded',
    colors: [
      { name: 'Terracotta', hex: '#C2410C', desc: 'A rich, organic warmth' },
      { name: 'Olive',      hex: '#65A30D', desc: 'Steady and natural' },
      { name: 'Sand',       hex: '#FED7AA', desc: 'A neutral, calming base' },
    ],
  },
  {
    name: 'Elegant',
    hint: 'Refined and premium',
    colors: [
      { name: 'Charcoal',   hex: '#1F2937', desc: 'Sophisticated and timeless' },
      { name: 'Blush',      hex: '#F9A8D4', desc: 'Soft, modern, distinctive' },
      { name: 'Champagne',  hex: '#FDE68A', desc: 'A subtle premium accent' },
    ],
  },
  {
    name: 'Mono',
    hint: 'Minimal and timeless',
    colors: [
      { name: 'Black',      hex: '#111827', desc: 'Sharp and definitive' },
      { name: 'Mid Grey',   hex: '#6B7280', desc: 'Balances the contrast' },
      { name: 'Light Grey', hex: '#E5E7EB', desc: 'Quiet and clean' },
    ],
  },
]
