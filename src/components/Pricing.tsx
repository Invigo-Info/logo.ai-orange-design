"use client";

import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";

type Item = { title: string; desc: string };

const INCLUDED: Item[] = [
  {
    title: "Your logo in every format you need",
    desc: "(PNG, SVG, PDF, EPS)",
  },
  {
    title: "Transparent background",
    desc: "— works on any background color",
  },
  {
    title: "Brand Guidelines PDF",
    desc: "— how to use your logo, its exact colors, and matching fonts",
  },
  {
    title: "Full commercial license",
    desc: "— use it anywhere you want",
  },
  {
    title: "Yours forever",
    desc: "— re-download as many times as you want",
  },
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
      className="bg-b0 py-20 md:py-[120px] px-4 md:px-8 relative"
    >
      <SectionHeader
        eyebrow="Pricing"
        title="Designer-quality logos — free at launch"
        description="A freelance designer costs $1,500+. Other AI tools charge $20–$96/year. We're giving ours away free to the first 2,000,000 users."
        className="mb-12 md:mb-14"
      />

      <ScrollReveal delay={1}>
        <div className="max-w-[540px] mx-auto rounded-3xl p-[1px] bg-gradient-to-b from-accent via-cream-10 to-cream-10 shadow-[0_0_60px_rgba(232,66,13,.12)]">
        <div className="rounded-[calc(1.5rem-1px)] bg-b1 p-8 md:p-10 relative overflow-hidden">
          {/* Accent glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[480px] h-[320px] bg-[radial-gradient(ellipse,rgba(232,66,13,.28),transparent_65%)] pointer-events-none" />

          {/* Free at launch badge */}
          <p className="relative text-center font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-accent mb-7">
            Free at Launch
          </p>

          {/* Price */}
          <div className="relative flex flex-col items-center mb-2">
            <span className="font-display text-[1.4rem] text-cream-35 line-through font-medium mb-2">
              $49
            </span>
            <span className="font-display text-[4rem] md:text-[4.4rem] font-extrabold text-cream leading-none tracking-[-0.03em]">
              Free
            </span>
          </div>

          {/* Price subhead */}
          <p className="text-center text-[0.86rem] text-white/70 mt-8 mb-4 leading-[1.5] max-w-[400px] mx-auto">
            Free for the first 2,000,000 users — no subscription, no credit
            card, no catch.
          </p>
          <p className="text-center text-[0.92rem] font-semibold text-cream mb-10">
            100% yours to keep forever.
          </p>

          {/* What you get divider */}
          <div className="relative flex items-center my-10">
            <div className="flex-1 h-px bg-cream-10" />
            <span className="px-3 font-sans text-[0.73rem] font-semibold uppercase tracking-[0.16em] text-[rgba(232,232,230,0.65)]">
              What you get — free
            </span>
            <div className="flex-1 h-px bg-cream-10" />
          </div>

          {/* Included list */}
          <ul className="flex flex-col gap-5 mb-10">
            {INCLUDED.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-accent-hi shrink-0 mt-1"
                  aria-hidden
                >
                  <path d="M11.5 3.8 5.6 9.7 2.5 6.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-[0.92rem] leading-[1.5] text-cream-55">
                  <span className="font-semibold text-cream">{item.title}</span>{" "}
                  {item.desc}
                </p>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="h-px bg-cream-10 my-10" />

          {/* CTA */}
          <div className="flex justify-center">
            <button
              onClick={scrollToCTA}
              className="h-12 px-7 rounded-full bg-accent text-white font-sans text-[0.92rem] font-semibold shadow-[0_0_24px_rgba(232,66,13,.25)] hover:bg-accent-hi hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(232,66,13,.35)] transition-all duration-300"
            >
              Get My Free Logo →
            </button>
          </div>

          <p className="text-center text-[0.78rem] text-[rgba(232,232,230,0.65)] mt-7">
            Free for the first 2,000,000 users. No credit card, ever.
          </p>
        </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
