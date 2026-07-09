/**
 * All homepage copy, lifted verbatim from the v19 pre-launch content doc.
 * Kept as data so sections stay declarative and the copy is easy to update.
 */

export const nav = {
  tagline: "Free logos for the first 2,000,000 users",
  // Main nav, left to right.
  links: [
    { label: "Gallery", href: "/#gallery" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Who It's For", href: "/#" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/#faq" },
  ],
  // Dropdowns, in order, after the links.
  dropdowns: [
    {
      label: "Company",
      items: [
        { label: "About Us", href: "/about" },
        { label: "Our Story", href: "/our-story" },
        { label: "Team", href: "/team" },
        { label: "Why LOGO.AI", href: "/why-logo-ai" },
        { label: "Manifesto", href: "/manifesto" },
        { label: "Press", href: "/press" },
        { label: "Contact Support", href: "/contact" },
      ],
    },
    {
      label: "Browse Logos",
      items: [
        { label: "By Industry", href: "/coming-soon" },
        { label: "By Style", href: "/coming-soon" },
        { label: "By Symbol", href: "/coming-soon" },
        { label: "By Color", href: "/coming-soon" },
      ],
    },
  ],
  cta: "Get My Free Logo",
};

export const hero = {
  kicker: "World's Best AI Logo Generator",
  title: "Get Your Free Logo in Seconds",
  sub: "Free logo for the first 2,000,000 users. Claim yours now.",
  fine1: "No spam. No credit card. Just a free logo.",
  fine2: "We'll email you the moment we go live so you can generate your free logo.",
  logosRemaining: "1,669,349",
  logosTotal: "2,000,000",
  daysUntilLaunch: "55",
};

export const gallery = {
  kicker: "Gallery",
  title: "See what your free logo could look like",
  sub: "Each logo below was made by our AI. Yours can be too — free, at launch.",
  // Real sample marks from the logo library.
  images: [
    { src: "/gallery/restaurant-logo-1.webp", label: "Restaurant" },
    { src: "/gallery/coffee-shop-logo-1.webp", label: "Coffee shop" },
    { src: "/gallery/bakery-logo-1.webp", label: "Bakery" },
    { src: "/gallery/boutique-logo-1.webp", label: "Boutique" },
    { src: "/gallery/gym-logo-1.webp", label: "Gym" },
    { src: "/gallery/barbershop-logo-1.webp", label: "Barbershop" },
    { src: "/gallery/hair-salon-logo-1.webp", label: "Hair salon" },
    { src: "/gallery/nail-studio-logo-1.webp", label: "Nail studio" },
    { src: "/gallery/tattoo-studio-logo-1.webp", label: "Tattoo studio" },
    { src: "/gallery/pet-grooming-logo-1.webp", label: "Pet grooming" },
    { src: "/gallery/clothing-brand-logo-1.webp", label: "Clothing brand" },
    { src: "/gallery/content-creator-logo-1.webp", label: "Content creator" },
    { src: "/gallery/food-truck-logo-1.webp", label: "Food truck" },
    { src: "/gallery/landscaping-company-logo-1.webp", label: "Landscaping company" },
    { src: "/gallery/cleaning-service-logo-1.webp", label: "Cleaning service" },
    { src: "/gallery/e-commerce-brand-logo-7.webp", label: "E-commerce brand" },
  ],
};

export const mockups = {
  kicker: "Real-World",
  title: "Picture your logo everywhere",
  sub: "Here's how our logos look on websites, business cards, signage, and anywhere your brand needs to show up.",
  // Carousel of full real-world brand scenes (one large landscape mockup each).
  frames: [
    { src: "/mockups/restaurant/1.webp", alt: "A restaurant brand across storefront, packaging, signage and more" },
    { src: "/mockups/restaurant/2.webp", alt: "A restaurant brand across storefront, packaging, signage and more" },
    { src: "/mockups/restaurant/3.webp", alt: "A restaurant brand across storefront, packaging, signage and more" },
    { src: "/mockups/restaurant/4.webp", alt: "A restaurant brand across storefront, packaging, signage and more" },
  ],
};

export const howItWorks = {
  kicker: "How It Works",
  title: "Your free logo in 60 seconds — on launch day",
  sub: "No design skills needed. Sign up today. The moment we go live, your free logo is waiting.",
  steps: [
    {
      title: "Sign up today",
      body: "Enter your email to claim your spot. We'll email you the moment we go live so you can generate your free logo.",
    },
    {
      title: "Tell us about your brand",
      body: "Just enter your business name and a few words about what it does. That's it.",
    },
    {
      title: "Our AI does the work",
      body: "In seconds, our AI turns your brand details into 10 original logos — with the right style, colors, and fonts to match your brand.",
    },
    {
      title: "Preview and download your free logo",
      body: "See your logos, pick your favorite, and download it free. No credit card, no catch — just your logo.",
    },
  ],
  privacy: "Your brand details stay private — never shared, never sold, only used to make your logos.",
};

export const testimonialsSection = {
  kicker: "Early Access",
  title: "People didn't believe it was AI",
  sub: "A few of the first people who tried it, in their own words.",
  featured: {
    quote:
      "I showed it to two designers I've worked with for years. Neither could tell it wasn't made by hand. That's never happened with an AI tool before.",
    name: "Daniel Brooks",
    role: "Studio Owner, San Francisco CA",
  },
  reviews: [
    {
      quote:
        "Every other generator gave me the same recycled icons. This one actually understood what my brand was about.",
      name: "Marisa Font",
      role: "Hot Sauce Maker, Oakland CA",
    },
    {
      quote:
        "I'd been stuck on my logo for three months. This gave me one I loved in under a minute. I almost couldn't believe it.",
      name: "Kevin Tran",
      role: "Newsletter Founder, San Jose CA",
    },
    {
      quote:
        "I hired a designer last year and never even used what they made. This gave me something sharper in a minute. Genuinely stunned.",
      name: "Allison Reyes",
      role: "Bookkeeper, Berkeley CA",
    },
    {
      quote:
        "My bakery finally looks like a real brand. Customers assume I paid a studio for it. It took me about a minute.",
      name: "Theo Walsh",
      role: "Bakery Owner, San Francisco CA",
    },
    {
      quote:
        "I've tried every AI logo tool out there and they're all junk. This is the first one that didn't feel like AI. It's my actual logo now.",
      name: "Ananya Iyer",
      role: "Podcast Host, Oakland CA",
    },
    {
      quote:
        "I expected something I'd have to fix or redo. Instead it looked finished right away. I just used it as-is.",
      name: "Marcus Bell",
      role: "Mobile Mechanic, San Jose CA",
    },
    {
      quote:
        "The day I changed my logo, three clients messaged to ask who designed it. It was me, in about a minute.",
      name: "Hannah Cole",
      role: "Photographer, Berkeley CA",
    },
    {
      quote:
        "My co-founder and I never agree on anything. He took one look at the logo and said 'that's the one.' First time that's ever happened.",
      name: "Eric Nakamura",
      role: "Startup Co-Founder, San Francisco CA",
    },
    {
      quote:
        "It handed me ten options and I wanted to use half of them. I did not expect that to be my problem.",
      name: "Caleb Owens",
      role: "Brewery Founder, San Jose CA",
    },
  ],
};

export const useCases = {
  kicker: "Use Cases",
  title: "Use your logo everywhere your brand goes",
  sub: "Your logo is the face of your business. Here's where you'll put yours.",
  groups: [
    {
      title: "Digital Presence",
      items: [
        { title: "Website & landing pages", body: "The first thing visitors see — make a polished impression in the header, footer, and browser tab icon." },
        { title: "Social media profiles", body: "Instagram, Facebook, LinkedIn, X — a clean profile picture that looks consistent everywhere." },
        { title: "Email signatures", body: "Add your brand to every email you send — clients and prospects remember a polished look." },
        { title: "Your online store", body: "Shopify, Etsy, your own site — branded storefronts convert better." },
      ],
    },
    {
      title: "Marketing & Sales",
      items: [
        { title: "Pitch decks & proposals", body: "Look the part on every slide, cover page, and one-pager you send to clients or investors." },
        { title: "Invoices & contracts", body: "Branded paperwork looks more credible — and gets paid faster." },
        { title: "Ads & social posts", body: "A consistent logo across ads builds recognition over time." },
        { title: "Email campaigns & newsletters", body: "Branded marketing emails feel more professional — and stand out in crowded inboxes." },
      ],
    },
    {
      title: "Physical & Print",
      items: [
        { title: "Business cards & print", body: "Your logo prints sharp on business cards, brochures, and flyers." },
        { title: "Storefront signage", body: "Your logo stays sharp at any size — from window decals to giant signs." },
        { title: "Packaging & products", body: "Boxes, labels, tags, merch — full commercial license means you can put your logo on anything." },
        { title: "Event banners & posters", body: "Stand out at trade shows, pop-ups, and conferences with a logo that holds up at any size." },
      ],
    },
  ],
};

export const pricing = {
  kicker: "Pricing",
  title: "Designer-quality logos — free at launch",
  sub: "A freelance designer costs $1,500+. Other AI tools charge $20–$96/year. We're giving ours away free to the first 2,000,000 users.",
  priceWas: "$49",
  priceNow: "Free",
  priceNote: "Free for the first 2,000,000 users — no subscription, no credit card, no catch.",
  ownership: "100% yours to keep forever.",
  featuresHeading: "What you get — free",
  features: [
    "Your logo in every format you need (PNG, SVG, PDF, EPS)",
    "Transparent background — works on any background color",
    "Brand Guidelines PDF — how to use your logo, its exact colors, and matching fonts",
    "Full commercial license — use it anywhere you want",
    "Yours forever — re-download as many times as you want",
  ],
  cta: "Get My Free Logo",
  ctaFine: "Free for the first 2,000,000 users. No credit card, ever.",
};

export const compare = {
  kicker: "How We Compare",
  title: "Better, faster, and free",
  sub: "See how we compare to a freelance designer or other AI tools.",
  columns: ["Freelance Designer", "Other AI Tools", "Logo.AI"],
  rows: [
    { feature: "Looks like a designer made it", values: ["yes", "no", "yes"] },
    { feature: "Time to results", values: ["1–3 weeks", "5–15 minutes", "Under 60 seconds"] },
    { feature: "Price", values: ["$500–$2,500", "$20–$96/year", "Free at launch*"] },
    { feature: "No design skills needed", values: ["no", "no", "yes"] },
    { feature: "Free to download", values: ["no", "no", "yes"] },
    { feature: "Free — nothing to lose", values: ["no", "no", "yes"] },
    { feature: "Vector files (SVG, PDF, EPS)", values: ["yes", "Costs extra", "yes"] },
    { feature: "Transparent background (PNG)", values: ["Sometimes", "Sometimes", "yes"] },
    { feature: "Brand Guidelines PDF included", values: ["Costs extra", "no", "yes"] },
    { feature: "Full commercial license", values: ["Sometimes", "Sometimes", "yes"] },
    { feature: "You own the logo forever", values: ["Sometimes", "no", "yes"] },
    { feature: "Re-download anytime", values: ["no", "no", "yes"] },
    { feature: "No subscription, ever", values: ["no", "no", "yes"] },
  ],
  footnote: "* Free for the first 2,000,000 users. After that, $49 one-time.",
};

export const faq = {
  kicker: "FAQ",
  title: "Your questions, answered",
  sub: "Everything you need to know before you sign up for your free logo.",
  items: [
    { q: "Is the logo actually free?", a: "Yes — completely free for the first 2,000,000 users. No credit card, no trial, no catch. Sign up now to claim your spot, then download your logo free on launch day." },
    { q: "Why are you giving logos away for free?", a: "We're launching soon and we want the world to see what Logo.AI can do. The best way to do that is to let 2,000,000 founders, creators, and small business owners experience it themselves — free." },
    { q: "What if the free spots run out before I sign up?", a: "Your spot is reserved the moment you sign up. If you're in before we hit 2,000,000, your free logo is guaranteed — no matter how many people sign up after you." },
    { q: "When exactly can I get my logo?", a: "We're launching soon. The moment we go live, you'll be able to log in and generate your free logo. We'll send you a reminder email on launch day." },
    { q: "Do I need design skills?", a: "No. Just enter your business name and a few words about what it does — our AI handles the style, colors, fonts, and layout for you. No design skills, no Photoshop, no creative brief needed." },
    { q: "How many logos will I see?", a: "Each time you generate, you'll see 10 logos to choose from. Don't love them? Generate again — free. For the first 2,000,000 users, downloading is free too. No payment, ever." },
    { q: "What's included in the free logo?", a: "Everything. Your logo in every format (PNG, SVG, PDF, EPS) with a transparent background, full commercial license, Brand Guidelines PDF, and yours forever — re-download as many times as you want." },
    { q: "Will my logo be unique to me?", a: "Yes. Our AI creates each logo from scratch based on your brand details — no two are alike. Once you download, it's yours alone." },
    { q: "What if I don't love my logo?", a: "Generate again — free. You can generate as many times as you want until you find one you love. Don't love any of them? Walk away — your spot is still free." },
    { q: "What happens after the 2,000,000 free logos are gone?", a: "After the launch offer ends, Logo.AI will be $49 — one-time, no subscription. So if you're reading this, now is the time to claim yours free." },
    { q: "What happens to my email address?", a: "We'll send you a launch day reminder and that's it. No spam, no sales emails, no sharing your data with anyone. Ever." },
    { q: "Can I trademark my free logo?", a: "Yes. Since you fully own it and have a commercial license, you can register your logo as a trademark in your country. Whether it can be trademarked depends on your local laws and how unique the design is — so it's worth checking with a trademark lawyer." },
  ],
};

export const blog = {
  kicker: "Blog",
  title: "Logo & branding tips for your business",
  sub: "Practical guides to help you build a brand that stands out.",
  cards: [
    { title: "Logomark, wordmark, or combination mark?", preview: "The first logo decision every founder skips — and the one that makes everything after it easier.", image: "/images/blog/logo-types/hero-brand-flatlay.webp", href: "/blog/logomark-vs-wordmark" },
    { title: "Maximalism is back: breaking the minimalist rules", preview: "Loud is back — here's how to go bold in 2026 without making a mess.", image: "/images/blog/maximalism/hero-maximalist.webp", href: "/blog/maximalism" },
    { title: "5 logo mistakes that make your brand look amateur", preview: "Common pitfalls to avoid when building your brand identity.", image: "/mockups/website.jpeg", href: "#" },
  ],
  cta: "See all posts",
};

export const finalCta = {
  kicker: "Get Started",
  title: "Ready to Get Your Free Logo?",
  sub: "1,669,349 logos remaining. Don't miss out.",
  fine1: "No spam. No credit card. Just a free logo.",
  fine2: "We'll email you the moment we go live so you can generate your free logo.",
};

export const footer = {
  brand: "Logo.AI",
  tagline: "Free logos for the first 2,000,000 users",
  columns: [
    { title: "Popular Industries", links: ["Restaurant Logos", "Coffee Shop Logos", "Bakery Logos", "Boutique Logos", "Gym Logos"] },
    { title: "Popular Styles", links: ["Minimalist Logos", "Vintage Logos", "Monogram Logos", "Wordmark Logos", "Modern Logos"] },
    { title: "Popular Symbols", links: ["Crown Logos", "Animal Logos", "Leaf Logos", "Mountain Logos", "Star Logos"] },
    { title: "Popular Colors", links: ["Black & White Logos", "Blue Logos", "Gold Logos", "Green Logos", "Pink Logos"] },
    { title: "Quick Links", links: ["Gallery", "How It Works", "FAQ", "Blog", "Who It's For", "Free Logo Generator"] },
    { title: "Company", links: ["About Us", "Our Story", "Team", "Why LOGO.AI", "Press", "Manifesto", "Contact Support"] },
    { title: "Explore", links: ["Wall of Love", "$0 Brand Playbook", "AI vs Designer", "Science Behind the Logo"] },
    { title: "Legal", links: ["Terms of Use", "Privacy Policy", "Refund Policy", "Security Policy", "Commercial License", "Cookie Policy"] },
  ],
  trust: "✓ SSL Secure  ·  ✓ Stripe Payments  ·  ✓ Your data is safe",
  copyright: "Copyright © 2026 Logo.AI. All rights reserved.",
};
