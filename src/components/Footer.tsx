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
  { label: "Mockups", href: "#preview" },
  { label: "Free Logo Generator", href: "#cta-section" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Press", href: "/press" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Terms of Use", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
];

export default function Footer() {
  return (
    <footer className="relative z-[2] border-t border-cream-05 bg-b0 pt-16 pb-10 px-6 md:px-8">
      <div className="max-w-[1240px] mx-auto">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-cream-05">
          <div className="flex flex-col gap-3">
            <div className="font-display font-bold text-[1.5rem] text-cream tracking-[-0.03em]">
              logo.ai
            </div>
            <p className="text-[0.92rem] text-cream-55 max-w-[420px]">
              Free logos for the first 2,000,000 users. Professional, original,
              ready in seconds.
            </p>
          </div>
          <div className="flex items-center gap-4 text-[0.72rem] text-cream-35">
            <div className="inline-flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 1L2 3v3.2C2 8.6 3.7 10.5 6 11c2.3-.5 4-2.4 4-4.8V3L6 1z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
              </svg>
              SSL Secure
            </div>
            <span className="text-cream-18">•</span>
            <span>Your data is safe</span>
          </div>
        </div>

        {/* Column grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-8 py-12">
          <FooterColumn title="Popular Industries" items={POPULAR_INDUSTRIES.map((l) => ({ label: l, href: "#examples" }))} />
          <FooterColumn title="Popular Styles" items={POPULAR_STYLES.map((l) => ({ label: l, href: "#examples" }))} />
          <FooterColumn title="Popular Symbols" items={POPULAR_SYMBOLS.map((l) => ({ label: l, href: "#examples" }))} />
          <FooterColumn title="Popular Colors" items={POPULAR_COLORS.map((l) => ({ label: l, href: "#examples" }))} />
          <FooterColumn title="Quick Links" items={QUICK_LINKS} />
          <FooterColumn title="Company" items={COMPANY_LINKS} extra={<FooterColumn title="Legal" items={LEGAL_LINKS} compact />} />
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-cream-05 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
          <p className="text-[0.75rem] text-cream-35">
            © {new Date().getFullYear()} Logo.ai · All rights reserved.
          </p>
          <p className="text-[0.7rem] text-cream-18 text-center md:text-right">
            Logo.ai is an independent service. Free for the first 2,000,000 users.
          </p>
        </div>
      </div>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  items: { label: string; href: string }[];
  extra?: React.ReactNode;
  compact?: boolean;
}

function FooterColumn({ title, items, extra, compact }: FooterColumnProps) {
  return (
    <div className={`flex flex-col gap-3 ${compact ? "mt-6" : ""}`}>
      <p className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-cream-55">
        {title}
      </p>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="text-[0.82rem] text-cream-55 hover:text-cream transition-colors duration-150 no-underline"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      {extra}
    </div>
  );
}
