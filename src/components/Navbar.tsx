"use client";

import Link from "next/link";

const DEFAULT_LINKS = [
  { label: "About", href: "/about" },
  { label: "FAQ", href: "#faq" },
];

interface NavbarProps {
  links?: { label: string; href: string }[];
}

export default function Navbar({ links = DEFAULT_LINKS }: NavbarProps) {
  const scrollToCTA = () => {
    document.getElementById("sign-up")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-5 md:px-12 h-16 flex justify-between items-center bg-[rgba(9,9,11,.8)] backdrop-blur-[20px] backdrop-saturate-[1.4] border-b border-cream-05">
      {/* Logo */}
      <Link
        href="/"
        className="font-display text-[1.2rem] font-bold text-cream tracking-[-0.03em] no-underline"
      >
        logo<span className="text-accent">.</span>ai
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-3.5">
        {/* Nav links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.82rem] font-medium text-cream-55 transition-colors duration-200 hover:text-cream no-underline"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={scrollToCTA}
          className="h-[38px] px-[22px] rounded-full border-none bg-accent text-white text-[0.78rem] font-semibold inline-flex items-center transition-all duration-300 cursor-pointer shadow-[0_0_16px_rgba(232,66,13,.15)] hover:bg-accent-hi hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(232,66,13,.25)]"
        >
          Get My Free Logo
        </button>
      </div>
    </nav>
  );
}
