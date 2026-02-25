const links = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Press", href: "/press" },
  { label: "Privacy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Terms", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="relative z-[2] border-t border-cream-05 py-12 px-6 pb-10 bg-b0">
      <div className="max-w-[680px] mx-auto flex flex-col items-center gap-5 text-center">
        {/* Logo */}
        <div className="font-display font-bold text-[1.4rem] text-cream tracking-[-0.03em]">
          logo<span className="text-accent">.</span>ai
        </div>

        {/* Tagline */}
        <p className="text-[0.92rem] font-medium text-cream-55">
          Professional logos. Ready in seconds.
        </p>

        {/* Links */}
        <div className="flex gap-5 flex-wrap justify-center">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.78rem] text-cream-35 transition-colors duration-200 hover:text-cream"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-[0.75rem] text-cream-35">© 2026 Logo.ai</p>

        {/* Disclaimer */}
        <p className="text-[0.68rem] text-cream-18 -mt-2">
          Logo.ai is an independent service.
        </p>
      </div>
    </footer>
  );
}
