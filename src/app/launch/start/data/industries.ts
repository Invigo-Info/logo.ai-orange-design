// Step-2 business-type typeahead — fallback data only.
//
// The live source of suggestions is the AI endpoint (/api/suggest, kind
// 'industry'), debounced as the user types. This short list is ONLY shown
// when that call fails or the user is offline, so the form always works.
// (It used to be a 500+ entry hardcoded taxonomy — removed in favour of AI.)

export type IndustryEntry = { key: string; label: string }

export const INDUSTRY_FALLBACK: IndustryEntry[] = [
  { key: 'restaurant',  label: 'Restaurant' },
  { key: 'coffee',      label: 'Coffee Shop' },
  { key: 'bakery',      label: 'Bakery' },
  { key: 'bar',         label: 'Bar / Brewery' },
  { key: 'foodtruck',   label: 'Food Truck' },
  { key: 'boutique',    label: 'Boutique' },
  { key: 'ecommerce',   label: 'E-commerce Store' },
  { key: 'salon',       label: 'Salon / Spa' },
  { key: 'fitness',     label: 'Fitness / Gym' },
  { key: 'yoga',        label: 'Yoga / Pilates Studio' },
  { key: 'agency',      label: 'Creative Agency' },
  { key: 'tech',        label: 'Tech / SaaS' },
  { key: 'consulting',  label: 'Consulting' },
  { key: 'realestate',  label: 'Real Estate' },
  { key: 'photo',       label: 'Photography' },
  { key: 'wedding',     label: 'Wedding / Events' },
  { key: 'trades',      label: 'Construction / Trades' },
  { key: 'cleaning',    label: 'Cleaning Service' },
  { key: 'pet',         label: 'Pet Services' },
  { key: 'beauty',      label: 'Beauty / Cosmetics' },
  { key: 'health',      label: 'Health / Wellness' },
  { key: 'education',   label: 'Education / Tutoring' },
]
