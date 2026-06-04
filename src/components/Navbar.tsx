"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Gallery", href: "#examples" },
  { label: "How It Works", href: "#how" },
  { label: "Who's It For", href: "#use-cases" },
  { label: "FAQ", href: "#faq" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Story", href: "/about" },
  { label: "Team", href: "/about" },
  { label: "Why LOGO.AI", href: "/about" },
  { label: "Manifesto", href: "/about" },
  { label: "Press", href: "/press" },
  { label: "Contact Support", href: "/contact" },
];

const BROWSE_LINKS = [
  { label: "By Industry", href: "#examples" },
  { label: "By Style", href: "#examples" },
  { label: "By Symbol", href: "#examples" },
  { label: "By Color", href: "#examples" },
];

type Dropdown = "company" | "browse" | null;

interface NavbarProps {
  links?: { label: string; href: string }[];
}

export default function Navbar({ links = NAV_LINKS }: NavbarProps) {
  const [openDropdown, setOpenDropdown] = useState<Dropdown>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const scrollToCTA = () => {
    setMobileOpen(false);
    const isMobile = window.innerWidth < 768;
    const target = isMobile ? "sign-up" : "hero-email";
    const el = document.getElementById(target);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      el.querySelector<HTMLInputElement>("input[type='email']")?.focus();
    }, 600);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-[74px] bg-b0 border-b border-cream-05 flex items-center">
      <div
        ref={wrapRef}
        className="w-full max-w-[1340px] mx-auto px-6 md:px-10 flex items-center justify-between"
      >
        {/* Brand */}
        <Link
          href="/"
          onClick={() => {
            sessionStorage.removeItem("logoExamples_activeCategory");
            sessionStorage.removeItem("logoExamples_page");
            setMobileOpen(false);
          }}
          className="font-display text-[1.5rem] md:text-[1.6rem] font-extrabold text-cream tracking-[-0.02em] no-underline shrink-0"
        >
          LOGO.AI
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-cream-55 transition-colors duration-200 hover:text-cream no-underline"
            >
              {link.label}
            </Link>
          ))}

          {/* Company dropdown */}
          <Dropdown
            label="Company"
            isOpen={openDropdown === "company"}
            onToggle={() =>
              setOpenDropdown(openDropdown === "company" ? null : "company")
            }
            items={COMPANY_LINKS}
            onItemClick={() => setOpenDropdown(null)}
          />

          {/* Browse dropdown */}
          <Dropdown
            label="Browse Logos"
            isOpen={openDropdown === "browse"}
            onToggle={() =>
              setOpenDropdown(openDropdown === "browse" ? null : "browse")
            }
            items={BROWSE_LINKS}
            onItemClick={() => setOpenDropdown(null)}
          />

          <button
            onClick={scrollToCTA}
            className="h-[41px] px-[18px] rounded-full border-none bg-accent text-white font-sans text-[0.88rem] font-semibold inline-flex items-center transition-all duration-300 cursor-pointer hover:bg-accent-hi hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(232,66,13,.25)]"
          >
            Get My Free Logo
          </button>
        </div>

        {/* Mobile CTA + menu toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={scrollToCTA}
            className="h-[36px] px-4 rounded-full bg-accent text-white font-sans text-[0.78rem] font-semibold active:bg-accent-hi"
          >
            Get My Free Logo
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="h-9 w-9 grid place-items-center rounded-full border border-cream-10 text-cream"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              {mobileOpen ? (
                <path
                  d="M2 2l10 10M12 2L2 12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              ) : (
                <>
                  <path d="M2 4h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M2 10h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-[74px] left-0 right-0 bg-b0 border-b border-cream-10 px-6 py-5 flex flex-col gap-1 max-h-[calc(100vh-74px)] overflow-y-auto">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-cream-80 hover:text-cream no-underline"
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-cream-10 my-2" />
          <p className="pt-1 text-[0.66rem] font-semibold tracking-[0.14em] uppercase text-cream-35">
            Browse Logos
          </p>
          {BROWSE_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-1.5 text-[0.88rem] text-cream-55 hover:text-cream no-underline"
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-cream-10 my-2" />
          <p className="pt-1 text-[0.66rem] font-semibold tracking-[0.14em] uppercase text-cream-35">
            Company
          </p>
          {COMPANY_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-1.5 text-[0.88rem] text-cream-55 hover:text-cream no-underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

interface DropdownProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  items: { label: string; href: string }[];
  onItemClick: () => void;
}

function Dropdown({ label, isOpen, onToggle, items, onItemClick }: DropdownProps) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-cream-55 transition-colors duration-200 hover:text-cream inline-flex items-center gap-1.5"
      >
        {label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-3 min-w-[220px] rounded-2xl border border-cream-10 bg-b1/95 backdrop-blur-[20px] shadow-[0_20px_50px_rgba(0,0,0,.5)] p-2">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onItemClick}
              className="block px-3 py-2.5 rounded-xl text-[0.85rem] font-medium text-cream-80 hover:text-cream hover:bg-cream-05 no-underline transition-colors duration-150"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
