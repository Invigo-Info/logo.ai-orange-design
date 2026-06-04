const POPULAR_INDUSTRIES = [
  "Restaurant Logos",
  "Coffee Shop Logos",
  "Bakery Logos",
  "Boutique Logos",
  "Gym Logos",
];

const POPULAR_STYLES = [
  "Minimalist Logos",
  "Vintage Logos",
  "Monogram Logos",
  "Wordmark Logos",
  "Modern Logos",
];

const POPULAR_SYMBOLS = [
  "Crown Logos",
  "Animal Logos",
  "Leaf Logos",
  "Mountain Logos",
  "Star Logos",
];

const POPULAR_COLORS = [
  "Black & White Logos",
  "Blue Logos",
  "Gold Logos",
  "Green Logos",
  "Pink Logos",
];

const QUICK_LINKS = [
  { label: "Gallery", href: "#examples" },
  { label: "How It Works", href: "#how" },
  { label: "FAQ", href: "#faq" },
  { label: "Blog", href: "#blog" },
  { label: "Who It's For", href: "#use-cases" },
  { label: "Free Logo Generator", href: "#hero-email" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Story", href: "/about" },
  { label: "Team", href: "/about" },
  { label: "Why LOGO.AI", href: "/about" },
  { label: "Press", href: "/press" },
  { label: "Manifesto", href: "/about" },
  { label: "Contact Support", href: "/contact" },
];

const EXPLORE_LINKS = [
  { label: "Before & After", href: "#examples" },
  { label: "Wall of Love", href: "#reviews" },
  { label: "$0 Brand Playbook", href: "#blog" },
  { label: "AI vs Designer", href: "#compare" },
  { label: "Science Behind the Logo", href: "#blog" },
];

const LEGAL_LINKS = [
  { label: "Terms of Use", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund Policy", href: "/terms" },
  { label: "Security Policy", href: "/privacy" },
  { label: "Commercial License", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

export default function Footer() {
  return (
    <footer className="relative z-[2] border-t border-cream-05 bg-b0 pt-16 pb-10 px-6 md:px-10">
      <div className="max-w-[1280px] mx-auto">
        {/* Brand block */}
        <div className="mb-12">
          <div className="font-display font-extrabold text-[1.6rem] text-cream tracking-[-0.02em]">
            LOGO.AI
          </div>
          <p className="text-[0.86rem] text-cream-55 mt-2">
            Free logos for the first 2,000,000 users
          </p>
        </div>

        {/* Row 1: popular categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 mb-12">
          <FooterColumn title="Popular Industries" items={POPULAR_INDUSTRIES.map((l) => ({ label: l, href: "#examples" }))} />
          <FooterColumn title="Popular Styles" items={POPULAR_STYLES.map((l) => ({ label: l, href: "#examples" }))} />
          <FooterColumn title="Popular Symbols" items={POPULAR_SYMBOLS.map((l) => ({ label: l, href: "#examples" }))} />
          <FooterColumn title="Popular Colors" items={POPULAR_COLORS.map((l) => ({ label: l, href: "#examples" }))} />
        </div>

        {/* Row 2: functional columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 pb-12 border-b border-cream-05">
          <FooterColumn title="Quick Links" items={QUICK_LINKS} />
          <FooterColumn title="Company" items={COMPANY_LINKS} />
          <FooterColumn title="Explore" items={EXPLORE_LINKS} />
          <FooterColumn title="Legal" items={LEGAL_LINKS} />
        </div>

        {/* Bottom row: trust badges + copyright */}
        <div className="pt-8 flex flex-col-reverse md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-5 text-[0.78rem] text-cream-55">
            <TrustItem label="SSL Secure" />
            <TrustItem label="Stripe Payments" />
            <TrustItem label="Your data is safe" />
          </div>
          <p className="text-[0.76rem] text-cream-35 text-center md:text-right">
            Copyright © {new Date().getFullYear()} LOGO.AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function TrustItem({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="text-accent-hi" aria-hidden>
        <path d="M11.5 3.8 5.6 9.7 2.5 6.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </span>
  );
}

interface FooterColumnProps {
  title: string;
  items: { label: string; href: string }[];
}

function FooterColumn({ title, items }: FooterColumnProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-sans text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-accent">
        {title}
      </p>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="text-[0.86rem] text-cream-55 hover:text-cream transition-colors duration-150 no-underline"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
