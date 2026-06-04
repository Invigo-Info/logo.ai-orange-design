"use client";

import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";

const INCLUDED = [
  "PNG, SVG, PDF, EPS formats",
  "Transparent background",
  "Brand Guidelines PDF",
  "Full commercial license",
  "Re-download forever",
  "No subscription, ever",
];

export default function Pricing() {
  const scrollToCTA = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const target = isMobile ? "sign-up" : "hero-email";
    const el = document.getElementById(target);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      el.querySelector<HTMLInputElement>("input[type='email']")?.focus();
    }, 600);
  };

  return (
    <section
      id="pricing"
      className="bg-b1 py-20 md:py-[120px] px-4 md:px-8 relative section-fade-from-b0"
    >
      <SectionHeader
        eyebrow="Pricing"
        title="Designer-quality logos — free at launch"
        description="Free for the first 2,000,000 users — no subscription, no credit card, no catch. 100% yours to keep forever."
        className="mb-12 md:mb-16"
      />

      <ScrollReveal delay={1}>
        <div className="max-w-[640px] mx-auto rounded-3xl border border-cream-10 bg-b0 p-8 md:p-12 relative overflow-hidden">
          {/* Accent glow */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[420px] h-[280px] bg-[radial-gradient(ellipse,rgba(232,66,13,.18),transparent_60%)] pointer-events-none" />

          {/* Price */}
          <div className="relative flex items-baseline justify-center gap-3 mb-2">
            <span className="font-display text-[1.6rem] text-cream-35 line-through font-semibold">
              $49
            </span>
            <span className="font-display text-[3.4rem] md:text-[4rem] font-extrabold text-cream leading-none tracking-[-0.03em]">
              Free
            </span>
          </div>
          <p className="text-center text-[0.82rem] text-cream-35 mb-8">
            one-time, forever
          </p>

          {/* Included list */}
          <ul className="flex flex-col gap-3 mb-9 max-w-[420px] mx-auto">
            {INCLUDED.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[0.92rem] text-cream-80 leading-[1.5]"
              >
                <span className="h-5 w-5 rounded-full bg-[rgba(232,66,13,.12)] border border-[rgba(232,66,13,.25)] grid place-items-center shrink-0 mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                    <path d="M11.5 3.8 5.6 9.7 2.5 6.6" stroke="#FF5C2E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex justify-center">
            <button
              onClick={scrollToCTA}
              className="h-12 px-7 rounded-full bg-accent text-white text-[0.92rem] font-semibold shadow-[0_0_24px_rgba(232,66,13,.25)] hover:bg-accent-hi hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(232,66,13,.35)] transition-all duration-300"
            >
              Get My Free Logo →
            </button>
          </div>

          <p className="text-center text-[0.72rem] text-cream-35 mt-6">
            *Free for the first 2,000,000 users. After that, $49 one-time.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
