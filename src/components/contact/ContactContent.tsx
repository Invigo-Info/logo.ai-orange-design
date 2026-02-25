"use client";

import { useState, useRef, useCallback, type FormEvent } from "react";
import ScrollReveal from "../ScrollReveal";

/* ════════════════════════════════════════════
   FAQ Accordion
   ════════════════════════════════════════════ */

const FAQ_DATA = [
  {
    q: "When does Logo.ai launch?",
    a: "April 2026. Sign up now and we'll email you the moment it's live so you can create yours right away.",
  },
  {
    q: "How much does it cost?",
    a: "Your first logo is completely free. No credit card needed.",
  },
  {
    q: "How many free logos are available?",
    a: "We're giving away 500,000 free logos during launch. Once they're claimed, standard pricing begins.",
  },
  {
    q: "What do I get with my free logo?",
    a: "A custom, original logo designed from scratch for your brand — plus high-resolution files ready for web, print, and social media.",
  },
  {
    q: "How is this different from other logo makers?",
    a: "Most logo makers use templates and swap in your name. Logo.ai designs from scratch around your brand, so your logo doesn't look made by a tool. It looks like a top agency created it — clean, sharp, and truly custom.",
  },
  {
    q: "Will my logo be unique?",
    a: "Yes. Every logo is created from scratch for your brand. No templates. No recycled designs.",
  },
  {
    q: "Do I own the logo Logo.ai creates?",
    a: "Yes. Once you download your logo, it's yours. Full commercial rights. Use it anywhere.",
  },
  {
    q: "What file formats are included?",
    a: "SVG, PNG, JPG, and PDF. Ready for web, print, and social.",
  },
];

/* Last FAQ has a link, handle separately */
const LAST_FAQ = {
  q: "How do I get in touch with the team?",
  a: null as null, // rendered as JSX
};

function FaqItem({
  question,
  children,
  isOpen,
  onToggle,
}: {
  question: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const answerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-cream-10 first:border-t first:border-cream-10 overflow-hidden">
      <button
        onClick={onToggle}
        className="flex items-center justify-between gap-4 py-6 w-full text-left cursor-pointer select-none transition-colors duration-200 hover:text-accent-hi bg-transparent border-none"
      >
        <span className="font-display text-[0.95rem] font-semibold tracking-[-0.01em] text-cream">
          {question}
        </span>
        <span
          className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center border transition-all duration-300 ${
            isOpen
              ? "bg-[rgba(232,66,13,.06)] border-[rgba(232,66,13,.2)]"
              : "bg-cream-05 border-cream-10"
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
          >
            <line x1="7" y1="3" x2="7" y2="11" />
            <line x1="3" y1="7" x2="11" y2="7" />
          </svg>
        </span>
      </button>
      <div
        ref={answerRef}
        className="overflow-hidden transition-all duration-[400ms]"
        style={{
          maxHeight: isOpen ? answerRef.current?.scrollHeight ?? 200 : 0,
        }}
      >
        <div className="pb-6 text-[0.92rem] text-cream-55 leading-[1.7] [&_a]:text-accent-hi [&_a]:font-medium [&_a]:border-b [&_a]:border-[rgba(232,66,13,.2)] [&_a]:transition-colors [&_a]:duration-200 hover:[&_a]:border-[rgba(232,66,13,.5)]">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   Contact Form
   ════════════════════════════════════════════ */

const inputClass =
  "w-full px-5 py-3.5 rounded-xl border border-cream-10 bg-[rgba(255,255,255,.03)] text-cream font-sans text-[0.92rem] outline-none transition-all duration-300 placeholder:text-cream-18 focus:border-[rgba(232,66,13,.4)] focus:shadow-[0_0_0_4px_rgba(232,66,13,.08)]";

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 px-6 text-center">
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
          <strong className="text-cream font-semibold">Message sent!</strong>{" "}
          We&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="flex flex-col gap-2">
          <label className="font-display text-[0.65rem] tracking-[0.12em] uppercase text-cream-35 font-semibold">
            First name
          </label>
          <input
            type="text"
            placeholder="Jane"
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-display text-[0.65rem] tracking-[0.12em] uppercase text-cream-35 font-semibold">
            Last name
          </label>
          <input type="text" placeholder="Doe" className={inputClass} />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label className="font-display text-[0.65rem] tracking-[0.12em] uppercase text-cream-35 font-semibold">
          Email
        </label>
        <input
          type="email"
          placeholder="you@company.com"
          required
          className={inputClass}
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label className="font-display text-[0.65rem] tracking-[0.12em] uppercase text-cream-35 font-semibold">
          Message
        </label>
        <textarea
          placeholder="How can we help?"
          required
          className={`${inputClass} resize-y min-h-[120px] leading-[1.6]`}
        />
      </div>

      {/* Submit */}
      <div className="mt-1.5">
        <button
          type="submit"
          className="relative z-[1] px-8 py-4 rounded-full border-none bg-accent text-white font-semibold text-[0.9rem] whitespace-nowrap shadow-[0_0_30px_rgba(232,66,13,.15)] transition-all duration-300 cursor-pointer inline-flex items-center gap-2 hover:bg-accent-hi hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(232,66,13,.25),0_10px_40px_rgba(0,0,0,.3)]"
        >
          Send Message &rarr;
        </button>
      </div>
    </form>
  );
}

/* ════════════════════════════════════════════
   Main Contact Content
   ════════════════════════════════════════════ */

export default function ContactContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggle = useCallback(
    (i: number) => setOpenFaq((prev) => (prev === i ? null : i)),
    []
  );

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative z-[2] pt-40 pb-20 md:pt-40 md:pb-20 text-center overflow-hidden hero-glow">
        <ScrollReveal>
          <div className="max-w-[1100px] mx-auto px-5 md:px-8 text-center">
            <h1 className="font-display text-[clamp(2.8rem,6.5vw,4.8rem)] font-extrabold leading-[1.06] tracking-[-0.05em] mb-6 text-cream">
              Contact us
            </h1>
            <p className="text-[1.12rem] text-cream-55 leading-[1.7] max-w-[520px] mx-auto mb-10">
              Got a question about Logo.ai? Whether it&apos;s about early
              access, partnerships, or just saying hi — we&apos;re here to help.
            </p>
            <div className="flex gap-3.5 justify-center flex-col sm:flex-row items-center max-w-[320px] sm:max-w-none mx-auto">
              <a
                href="#contact-us"
                className="w-full sm:w-auto relative z-[1] px-8 py-4 rounded-full border-none bg-accent text-white font-semibold text-[0.9rem] whitespace-nowrap shadow-[0_0_30px_rgba(232,66,13,.15)] transition-all duration-300 cursor-pointer inline-flex items-center justify-center gap-2 no-underline hover:bg-accent-hi hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(232,66,13,.25),0_10px_40px_rgba(0,0,0,.3)]"
              >
                Get in Touch &darr;
              </a>
              <a
                href="#faqs"
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-cream-10 bg-transparent text-cream font-semibold text-[0.9rem] whitespace-nowrap transition-all duration-300 cursor-pointer inline-flex items-center justify-center gap-2 no-underline hover:border-cream-18 hover:bg-cream-05"
              >
                FAQs &rarr;
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── FAQ ── */}
      <section
        id="faqs"
        className="relative z-[2] py-20 md:py-[120px] bg-b1 border-t border-b border-cream-05"
      >
        <ScrollReveal>
          <div className="max-w-[1100px] mx-auto px-5 md:px-8">
            <div className="text-center max-w-[600px] mx-auto mb-12">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[rgba(232,66,13,.06)] border border-[rgba(232,66,13,.15)] font-display text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-accent mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Frequently Asked Questions
              </span>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.15] tracking-[-0.03em] mb-5 text-cream mt-4">
                Before you reach out
              </h2>
              <p className="text-[1.02rem] text-cream-55 leading-[1.8] font-normal">
                You might find what you need right here.
              </p>
            </div>

            <div className="max-w-[720px] mx-auto flex flex-col">
              {FAQ_DATA.map((faq, i) => (
                <FaqItem
                  key={i}
                  question={faq.q}
                  isOpen={openFaq === i}
                  onToggle={() => toggle(i)}
                >
                  {faq.a}
                </FaqItem>
              ))}
              {/* Last FAQ with link */}
              <FaqItem
                question={LAST_FAQ.q}
                isOpen={openFaq === FAQ_DATA.length}
                onToggle={() => toggle(FAQ_DATA.length)}
              >
                Use the form below or email us at{" "}
                <a href="mailto:contact@logo.ai">contact@logo.ai</a>. We
                usually reply within 24 hours.
              </FaqItem>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Separator ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-cream-05 to-transparent" />

      {/* ── Contact Form ── */}
      <section id="contact-us" className="relative z-[2] py-20 md:py-[120px]">
        <ScrollReveal>
          <div className="max-w-[1100px] mx-auto px-5 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-[60px] items-start">
              {/* Left info */}
              <div>
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[rgba(232,66,13,.06)] border border-[rgba(232,66,13,.15)] font-display text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-accent mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Still Need Help?
                </span>
                <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.03em] leading-[1.2] mb-4 text-cream mt-4">
                  Send us a message
                </h2>
                <p className="text-base text-cream-55 leading-[1.7]">
                  To get in touch, use the form or email us at{" "}
                  <a
                    href="mailto:contact@logo.ai"
                    className="text-accent-hi font-semibold border-b border-[rgba(232,66,13,.2)] transition-colors duration-200 hover:border-[rgba(232,66,13,.5)]"
                  >
                    contact@logo.ai
                  </a>
                </p>
                {/* Response badge */}
                <div className="inline-flex items-center gap-2 px-[18px] py-2 rounded-full border border-cream-10 bg-cream-05 font-display text-[0.65rem] tracking-[0.1em] uppercase text-cream-35 mt-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(232,66,13,.4)] animate-pulse-dot" />
                  We usually reply within 24 hours
                </div>
              </div>

              {/* Right form */}
              <div className="rounded-3xl border border-cream-10 bg-gradient-to-br from-cream-05 to-transparent p-6 md:p-9">
                <ContactForm />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
