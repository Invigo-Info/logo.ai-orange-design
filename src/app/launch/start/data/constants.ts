export const LOGO_PRICE = 49
export const PREVIEW_COUNT = 10

// How many real logos to generate (in parallel) on the Generating screen.
// Each Gemini image call is ~10s, so this trades wall-clock + cost for choice.
// If generation fails, the results screen falls back to the SVG previews.
export const GEN_COUNT = 4

// Real coffee-shop logo previews. We have 5 unique images; the results
// grid shows them cycled twice (10 slots total).
export const PREVIEW_LOGOS = [
  '/preview-logos/coffee-1.png',
  '/preview-logos/coffee-2.png',
  '/preview-logos/coffee-3.png',
  '/preview-logos/coffee-4.png',
  '/preview-logos/coffee-5.png',
]
export const RESERVATION_MINUTES = 30
