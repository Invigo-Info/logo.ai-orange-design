"use client";

import { useState, type FormEvent } from "react";
import ScrollReveal from "../ScrollReveal";

/* ════════════════════════════════════════════
   Value Card
   ════════════════════════════════════════════ */

function ValueCard({
  icon,
  title,
  desc,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay?: number;
}) {
  return (
    <ScrollReveal delay={delay}>
      <div className="p-10 md:px-7 rounded-3xl border border-cream-10 bg-gradient-to-br from-cream-05 to-transparent text-center transition-all duration-[400ms] hover:-translate-y-1 hover:border-cream-18 hover:shadow-[0_20px_60px_rgba(0,0,0,.3)]">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center bg-[rgba(232,66,13,.06)] border border-[rgba(232,66,13,.15)] text-accent-hi">
          {icon}
        </div>
        <div className="font-display text-[1.05rem] font-bold tracking-[-0.02em] text-cream mb-2.5">
          {title}
        </div>
        <div className="text-[0.88rem] text-cream-55 leading-[1.6]">{desc}</div>
      </div>
    </ScrollReveal>
  );
}

/* ════════════════════════════════════════════
   SVG Icons (matching the HTML exactly)
   ════════════════════════════════════════════ */

const BuildersIcon = (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 22L10 7l5 8 4-5 4 12" />
    <path d="M3 22h22" />
  </svg>
);

const SelfStartersIcon = (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="14" cy="14" r="10" />
    <path d="M14 8v6l4 3" />
  </svg>
);

const LongTermIcon = (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 20c2-6 5-10 8-13 3 3 6 7 8 13" />
    <path d="M8 18h12" />
  </svg>
);

/* ════════════════════════════════════════════
   Interest Form
   ════════════════════════════════════════════ */

const INTEREST_OPTIONS = [
  { value: "engineering", label: "Engineering" },
  { value: "data-science", label: "Data Science" },
  { value: "ux-ui-design", label: "UX/UI Design" },
  { value: "product-management", label: "Product Management" },
  { value: "marketing", label: "Marketing" },
  { value: "operations", label: "Operations" },
  { value: "other", label: "Other" },
];

const inputClass =
  "w-full px-5 py-3.5 rounded-xl border border-cream-10 bg-[rgba(255,255,255,.03)] text-cream font-sans text-[0.92rem] outline-none transition-all duration-300 placeholder:text-cream-18 focus:border-[rgba(232,66,13,.4)] focus:shadow-[0_0_0_4px_rgba(232,66,13,.08)] appearance-none";

function InterestForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 px-6 text-center">
        {/* Success icon */}
        <div className="w-12 h-12 rounded-full border border-cream-10 bg-[rgba(232,66,13,.06)] flex items-center justify-center text-accent-hi">
          <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="9" fill="currentColor" opacity=".15" />
            <path
              d="M5.5 9.5l2 2 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-[0.95rem] text-cream-55 leading-[1.6]">
          <strong className="text-cream font-semibold">
            Thanks for reaching out!
          </strong>{" "}
          We&apos;ll review your submission and get back to you if there&apos;s
          a fit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
      {/* Email */}
      <div className="flex flex-col gap-2">
        <label className="font-display text-[0.65rem] tracking-[0.12em] uppercase text-cream-35 font-semibold">
          Email
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          required
          className={inputClass}
        />
      </div>

      {/* Area of Interest */}
      <div className="flex flex-col gap-2">
        <label className="font-display text-[0.65rem] tracking-[0.12em] uppercase text-cream-35 font-semibold">
          Area of Interest
        </label>
        <select
          required
          defaultValue=""
          className={`${inputClass} pr-10 bg-no-repeat bg-[right_16px_center] bg-[length:12px_12px]`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none' stroke='%23888' stroke-width='1.5' stroke-linecap='round'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5'/%3E%3C/svg%3E")`,
          }}
        >
          <option value="" disabled>
            Select an area
          </option>
          {INTEREST_OPTIONS.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-b1 text-cream"
            >
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Portfolio */}
      <div className="flex flex-col gap-2">
        <label className="font-display text-[0.65rem] tracking-[0.12em] uppercase text-cream-35 font-semibold">
          LinkedIn / Portfolio
        </label>
        <input
          type="url"
          placeholder="https://linkedin.com/in/you"
          className={inputClass}
        />
      </div>

      {/* Why */}
      <div className="flex flex-col gap-2">
        <label className="font-display text-[0.65rem] tracking-[0.12em] uppercase text-cream-35 font-semibold">
          Why Logo.ai?
        </label>
        <textarea
          placeholder="Tell us what excites you about what we're building."
          className={`${inputClass} resize-y min-h-[100px] leading-[1.6]`}
        />
      </div>

      {/* Submit */}
      <div className="mt-1.5">
        <button
          type="submit"
          className="relative z-[1] px-8 py-4 rounded-full border-none bg-accent text-white font-semibold text-[0.9rem] whitespace-nowrap shadow-[0_0_30px_rgba(232,66,13,.15)] transition-all duration-300 cursor-pointer inline-flex items-center gap-2 hover:bg-accent-hi hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(232,66,13,.25),0_10px_40px_rgba(0,0,0,.3)]"
        >
          Submit &rarr;
        </button>
      </div>
    </form>
  );
}

/* ════════════════════════════════════════════
   Main Careers Content
   ════════════════════════════════════════════ */

export default function CareersContent() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative z-[2] pt-40 pb-20 md:pt-40 md:pb-20 text-center overflow-hidden hero-glow">
        <ScrollReveal>
          <div className="max-w-[1100px] mx-auto px-5 md:px-8 text-center">
            <h1 className="font-display text-[clamp(2.8rem,6.5vw,4.8rem)] font-extrabold leading-[1.06] tracking-[-0.05em] mb-6 text-cream">
              Join Logo.ai
            </h1>
            <p className="text-[1.12rem] text-cream-55 leading-[1.7] max-w-[560px] mx-auto mb-10">
              We&apos;re always looking for exceptional people. If you&apos;re
              excited about AI, have a bias for action, and want to build
              something meaningful — we&apos;d like to hear from you.
            </p>
            <div className="flex gap-3.5 justify-center flex-col sm:flex-row items-center max-w-[320px] sm:max-w-none mx-auto">
              <a
                href="#apply"
                className="w-full sm:w-auto relative z-[1] px-8 py-4 rounded-full border-none bg-accent text-white font-semibold text-[0.9rem] whitespace-nowrap shadow-[0_0_30px_rgba(232,66,13,.15)] transition-all duration-300 cursor-pointer inline-flex items-center justify-center gap-2 no-underline hover:bg-accent-hi hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(232,66,13,.25),0_10px_40px_rgba(0,0,0,.3)]"
              >
                Express Your Interest &darr;
              </a>
              <a
                href="#values"
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-cream-10 bg-transparent text-cream font-semibold text-[0.9rem] whitespace-nowrap transition-all duration-300 cursor-pointer inline-flex items-center justify-center gap-2 no-underline hover:border-cream-18 hover:bg-cream-05"
              >
                What We Value &rarr;
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Values ── */}
      <section
        id="values"
        className="relative z-[2] py-20 md:py-[120px] bg-b1 border-t border-b border-cream-05"
      >
        <ScrollReveal>
          <div className="max-w-[1100px] mx-auto px-5 md:px-8">
            <div className="text-center max-w-[600px] mx-auto">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[rgba(232,66,13,.06)] border border-[rgba(232,66,13,.15)] font-display text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-accent mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                What We Value
              </span>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.15] tracking-[-0.03em] mb-5 text-cream mt-4">
                The Kind of People We Work With
              </h2>
              <p className="text-[1.02rem] text-cream-55 leading-[1.8] font-normal">
                We&apos;re a small team building something big. Here&apos;s what
                matters to us.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
              <ValueCard
                icon={BuildersIcon}
                title="Builders"
                desc="You ship. Ideas are cheap — execution is everything. You'd rather launch and iterate than plan forever."
                delay={1}
              />
              <ValueCard
                icon={SelfStartersIcon}
                title="Self-Starters"
                desc="You don't wait for permission. You figure things out, move fast, and take ownership from day one."
                delay={2}
              />
              <ValueCard
                icon={LongTermIcon}
                title="Long-Term Thinkers"
                desc="You optimize for compounding, not quick wins. You care about building something that lasts."
                delay={3}
              />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Separator ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-cream-05 to-transparent" />

      {/* ── Express Interest Form ── */}
      <section id="apply" className="relative z-[2] py-20 md:py-[120px]">
        <ScrollReveal>
          <div className="max-w-[1100px] mx-auto px-5 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-[60px] items-start">
              {/* Left info */}
              <div>
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[rgba(232,66,13,.06)] border border-[rgba(232,66,13,.15)] font-display text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-accent mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Get In Touch
                </span>
                <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.03em] leading-[1.2] mb-4 text-cream mt-4">
                  Express Your Interest
                </h2>
                <p className="text-[1.02rem] text-cream-55 leading-[1.8] font-normal">
                  No open roles listed? Reach out anyway. We&apos;re always open
                  to meeting great people.
                </p>
              </div>

              {/* Right form */}
              <div className="rounded-3xl border border-cream-10 bg-gradient-to-br from-cream-05 to-transparent p-6 md:p-9">
                <InterestForm />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
