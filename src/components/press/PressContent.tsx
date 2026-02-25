"use client";

import { useState, useCallback } from "react";
import ScrollReveal from "../ScrollReveal";
import { useCount } from "../CountProvider";

/* ════════════════════════════════════════════
   Shared small components
   ════════════════════════════════════════════ */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-accent mb-5">
      {children}
    </div>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[rgba(232,66,13,.06)] border border-[rgba(232,66,13,.15)] font-display text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-accent-hi mb-6">
      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-cream-55 text-base leading-[1.8] font-normal mb-5 last:mb-0 [&_strong]:text-cream [&_strong]:font-semibold">
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.03em] leading-[1.2] mb-8 text-cream">
      {children}
    </h2>
  );
}

/* ════════════════════════════════════════════
   Copy Block
   ════════════════════════════════════════════ */

function CopyBlock({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);

  return (
    <div className="relative bg-gradient-to-br from-cream-05 to-transparent border border-cream-10 rounded-3xl p-7 md:px-8 mb-4 transition-all duration-[400ms] hover:border-cream-18 hover:shadow-[0_20px_60px_rgba(0,0,0,.2)]">
      <div className="flex justify-between items-center mb-4">
        <div className="font-display text-[0.62rem] font-semibold tracking-[0.12em] uppercase text-cream-35">
          {label}
        </div>
        <button
          onClick={handleCopy}
          className={`px-3.5 py-1 rounded-full border font-display text-[0.6rem] font-semibold tracking-[0.08em] uppercase cursor-pointer transition-all duration-200
            ${
              copied
                ? "border-accent text-accent bg-[rgba(232,66,13,.06)]"
                : "border-cream-10 text-cream-35 bg-transparent hover:border-accent hover:text-accent"
            }`}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="text-cream-55 text-[0.92rem] leading-[1.75] font-normal m-0">
        {text}
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════
   Quote Card
   ════════════════════════════════════════════ */

function QuoteCard({
  quote,
  attr,
}: {
  quote: string;
  attr: string;
}) {
  return (
    <div className="py-9 border-b border-cream-05 last:border-b-0 last:pb-0">
      <p className="text-cream-80 text-[1.1rem] leading-[1.7] font-normal mb-4 italic before:content-['\201C'] after:content-['\201D']">
        {quote}
      </p>
      <div className="font-display text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-cream-35">
        {attr}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   Main Press Content
   ════════════════════════════════════════════ */

const PRESS_EMAIL = "press@logo.ai";

export default function PressContent() {
  const { count } = useCount();
  const formatted = count.toLocaleString();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative z-[2] pt-40 pb-20 md:pt-40 md:pb-20 hero-glow">
        <ScrollReveal>
          <div className="max-w-[720px] mx-auto px-5 md:px-6">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[rgba(232,66,13,.06)] border border-[rgba(232,66,13,.15)] font-display text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-accent-hi mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Press
            </span>
            <h1 className="font-display text-[clamp(3rem,7vw,5.2rem)] font-extrabold leading-[1.06] tracking-[-0.05em] mb-5 text-cream">
              Press kit
            </h1>
            <p className="text-[1.15rem] text-cream-55 leading-[1.7] max-w-[480px]">
              Everything you need to cover Logo.ai.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Sections wrapper ── */}
      <div className="relative z-[2] max-w-[720px] mx-auto px-5 md:px-6">

        {/* What We're Building */}
        <ScrollReveal>
          <section className="py-14 md:py-20 border-t border-cream-05">
            <SectionLabel>What We&apos;re Building</SectionLabel>
            <p className="text-[1.1rem] text-cream-55 leading-[1.8] font-normal mb-5">
              Logo.ai is an AI logo generator that creates professional logos and
              complete brand kits in under 60 seconds. Original designs — not
              templates. Every time.
            </p>
            <p className="font-display text-[0.82rem] text-cream-35 tracking-[0.02em] font-medium">
              Launching April 2026.{" "}
              <strong className="text-cream font-bold">{formatted}+</strong> founders
              are already on the waitlist.
            </p>
          </section>
        </ScrollReveal>

        {/* Quick Facts */}
        <ScrollReveal>
          <section className="py-14 md:py-20 border-t border-cream-05">
            <SectionLabel>Quick Facts</SectionLabel>
            <table className="w-full border-collapse">
              <tbody>
                {[
                  ["Launch", "April 2026"],
                  ["Product", "AI logo generator + complete brand kits"],
                  ["Time", "Under 60 seconds"],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-cream-05">
                    <td className="py-5 pr-8 font-display text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-cream-35 w-[130px] whitespace-nowrap align-top">
                      {label}
                    </td>
                    <td className="py-5 text-[0.92rem] leading-[1.6] text-cream-55 align-top">
                      {value}
                    </td>
                  </tr>
                ))}
                <tr className="border-b border-cream-05">
                  <td className="py-5 pr-8 font-display text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-cream-35 w-[130px] whitespace-nowrap align-top">
                    Waitlist
                  </td>
                  <td className="py-5 text-[0.92rem] leading-[1.6] text-cream-55 align-top">
                    <strong className="text-cream font-semibold">
                      {formatted}+ founders, creators, and brand owners
                    </strong>
                  </td>
                </tr>
                <tr className="border-b border-cream-05">
                  <td className="py-5 pr-8 font-display text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-cream-35 w-[130px] whitespace-nowrap align-top">
                    Status
                  </td>
                  <td className="py-5 text-[0.92rem] leading-[1.6] text-cream-55 align-top">
                    Pre-launch
                  </td>
                </tr>
                <tr className="border-b border-cream-05">
                  <td className="py-5 pr-8 font-display text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-cream-35 w-[130px] whitespace-nowrap align-top">
                    Founders
                  </td>
                  <td className="py-5 text-[0.92rem] leading-[1.6] text-cream-55 align-top">
                    <strong className="text-cream font-semibold">
                      Abhinav &amp; Ashwin Reddy
                    </strong>{" "}
                    — brothers and serial entrepreneurs with 30+ years launching
                    technology products across web, mobile, and AI. Multiple
                    successful exits. Products used by millions.
                  </td>
                </tr>
                <tr className="border-b border-cream-05">
                  <td className="py-5 pr-8 font-display text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-cream-35 w-[130px] whitespace-nowrap align-top">
                    HQ
                  </td>
                  <td className="py-5 text-[0.92rem] leading-[1.6] text-cream-55 align-top">
                    San Francisco
                  </td>
                </tr>
                <tr>
                  <td className="py-5 pr-8 font-display text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-cream-35 w-[130px] whitespace-nowrap align-top">
                    Offices
                  </td>
                  <td className="py-5 text-[0.92rem] leading-[1.6] text-cream-55 align-top">
                    Singapore, Tallinn, Dubai
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </ScrollReveal>

        {/* The Story */}
        <ScrollReveal>
          <section className="py-14 md:py-20 border-t border-cream-05">
            <SectionLabel>The Story</SectionLabel>
            <SectionHeading>Why this matters</SectionHeading>
            <P>
              Everyone&apos;s building a brand now — startups, creators,
              freelancers, side projects. And the first thing every one of them
              needs is a logo. But getting one? That&apos;s where it breaks down.
            </P>
            <P>
              Hire a designer? <strong>$5,000+</strong> and weeks of
              back-and-forth. Use a logo maker? Cheap — but you end up with a
              generic template that looks like a million other brands.
            </P>
            <P>
              We didn&apos;t just make a logo maker. We taught an AI to think
              like a designer — to understand balance, spacing, typography, and
              the feel that separates good logos from great ones.
            </P>
            <P>
              The result: describe your brand, and in under 60 seconds you get
              stunning, original logos and a complete brand kit — colors, fonts,
              social media assets, business cards, and brand guidelines. Ready to
              use anywhere.
            </P>
            <P>
              <strong>Why now:</strong> AI has transformed writing, images, and
              code. Logo design is next. Logo.ai is the first tool built from the
              ground up to bring professional-grade branding to everyone.
            </P>
          </section>
        </ScrollReveal>

        {/* The Team */}
        <ScrollReveal>
          <section className="py-14 md:py-20 border-t border-cream-05 bg-gradient-to-b from-cream-05 to-transparent">
            <div className="text-center max-w-[600px] mx-auto">
              <SectionTag>The Team</SectionTag>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.03em] leading-[1.2] mb-8 text-cream text-center">
                50+ people. 4 countries. One mission.
              </h2>
              <p className="text-base text-cream-55 leading-[1.8] font-normal mb-5 text-center">
                A global team of AI researchers, brand designers, and product
                engineers. Perfectionists. Problem-solvers. Experts in generative
                AI, machine learning, typography, color theory, and brand strategy
                —{" "}
                <strong className="text-cream font-semibold">
                  the exact mix needed to build something like Logo.ai.
                </strong>
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 justify-center mt-7">
              {[
                { city: "San Francisco (HQ)", variant: "default" },
                { city: "Singapore", variant: "hi" },
                { city: "Tallinn", variant: "lo" },
                { city: "Dubai", variant: "lo" },
              ].map(({ city, variant }) => (
                <div
                  key={city}
                  className="inline-flex items-center gap-[9px] px-5 py-2.5 rounded-full border border-cream-10 bg-cream-05 text-[0.82rem] text-cream-55 transition-colors duration-300 hover:border-cream-18"
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      variant === "hi"
                        ? "bg-accent-hi shadow-[0_0_10px_rgba(255,92,46,.4)]"
                        : variant === "lo"
                          ? "bg-accent-lo shadow-[0_0_10px_rgba(199,58,12,.4)]"
                          : "bg-accent shadow-[0_0_10px_rgba(232,66,13,.4)]"
                    }`}
                  />
                  {city}
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Leadership */}
        <ScrollReveal>
          <section className="py-14 md:py-20 border-t border-cream-05">
            <div className="text-center max-w-[600px] mx-auto">
              <SectionTag>Leadership</SectionTag>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.03em] leading-[1.2] mb-8 text-cream text-center">
                Led by people who&apos;ve done this before
              </h2>
              <p className="text-base text-cream-55 leading-[1.8] font-normal mb-5 text-center">
                Brothers and serial entrepreneurs who&apos;ve launched technology
                products across every major wave —{" "}
                <strong className="text-cream font-semibold">
                  web, mobile, and now AI
                </strong>
                . Products used by millions, with multiple successful exits.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
              <ScrollReveal className="!transition-delay-100">
                <div className="p-7 md:px-8 rounded-3xl border border-cream-10 bg-gradient-to-br from-cream-05 to-transparent transition-all duration-[400ms] hover:border-cream-18 hover:shadow-[0_20px_60px_rgba(0,0,0,.2)]">
                  <div className="font-display text-base font-bold tracking-[-0.02em] mb-0.5">
                    Abhinav Reddy
                  </div>
                  <div className="text-[0.68rem] text-accent font-semibold uppercase tracking-[0.12em] mb-3">
                    Co-Founder
                  </div>
                  <div className="text-[0.88rem] text-cream-55 leading-[1.6]">
                    Leads product and technology.
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal className="!transition-delay-200">
                <div className="p-7 md:px-8 rounded-3xl border border-cream-10 bg-gradient-to-br from-cream-05 to-transparent transition-all duration-[400ms] hover:border-cream-18 hover:shadow-[0_20px_60px_rgba(0,0,0,.2)]">
                  <div className="font-display text-base font-bold tracking-[-0.02em] mb-0.5">
                    Ashwin Reddy
                  </div>
                  <div className="text-[0.68rem] text-accent font-semibold uppercase tracking-[0.12em] mb-3">
                    Co-Founder
                  </div>
                  <div className="text-[0.88rem] text-cream-55 leading-[1.6]">
                    Leads strategy and growth.
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </ScrollReveal>

        {/* For Journalists */}
        <ScrollReveal>
          <section className="py-14 md:py-20 border-t border-cream-05">
            <SectionLabel>For Journalists</SectionLabel>
            <SectionHeading>Copy-paste descriptions</SectionHeading>
            <CopyBlock
              label="Short Version"
              text="Logo.ai is an AI-powered logo generator launching April 2026. Founded by serial entrepreneurs and brothers Abhinav and Ashwin Reddy, the platform creates professional logos and complete brand kits in under 60 seconds — original designs, not templates."
            />
            <CopyBlock
              label="Full Version"
              text={`Logo.ai is an AI logo generator launching April 2026. Founded by Abhinav and Ashwin Reddy — brothers and serial entrepreneurs who've spent three decades launching technology products across web, mobile, and AI, with multiple successful exits and products used by millions — the platform creates professional logos and complete brand kits in under 60 seconds. Unlike traditional logo makers that recycle templates, Logo.ai generates original designs tailored to each brand. The company is headquartered in San Francisco, with teams in Singapore, Tallinn, and Dubai. Over ${formatted} founders, creators, and brand owners are on the waitlist ahead of launch.`}
            />
          </section>
        </ScrollReveal>

        {/* Quotable */}
        <ScrollReveal>
          <section className="py-14 md:py-20 border-t border-cream-05">
            <SectionLabel>Quotable</SectionLabel>
            <SectionHeading>Pull quotes</SectionHeading>

            {/* Abhinav */}
            <div className="font-display text-[0.72rem] font-bold tracking-[0.1em] uppercase text-cream mb-2 pb-3 border-b border-cream-10">
              Abhinav Reddy, Co-Founder
            </div>
            <QuoteCard
              quote="We studied over 100,000 logos to teach AI what great design actually looks like. Not templates. Not recycled clip art. Real design thinking — baked into every pixel."
              attr="Abhinav Reddy, Co-Founder"
            />
            <QuoteCard
              quote="Designers charge $5,000 and take weeks. Logo makers give you the same template as everyone else. We built the thing that doesn't exist yet — designer-quality logos, instantly, for everyone."
              attr="Abhinav Reddy, Co-Founder"
            />
            <QuoteCard
              quote="When we showed the first demos to founders, they didn't believe it was AI. That's when we knew we had something real."
              attr="Abhinav Reddy, Co-Founder"
            />

            {/* Ashwin */}
            <div className="font-display text-[0.72rem] font-bold tracking-[0.1em] uppercase text-cream mb-2 pb-3 border-b border-cream-10 mt-12">
              Ashwin Reddy, Co-Founder
            </div>
            <QuoteCard
              quote="63,000 founders joined the waitlist before we spent a dollar on marketing. That tells you how broken branding is for startups and creators right now."
              attr="Ashwin Reddy, Co-Founder"
            />
            <QuoteCard
              quote="AI already transformed writing, images, and code. Logo design is next — and we're building the company that owns that moment."
              attr="Ashwin Reddy, Co-Founder"
            />
            <QuoteCard
              quote="Every brand deserves to look like a million bucks on day one. That's not a nice-to-have anymore — it's table stakes. We just made it free."
              attr="Ashwin Reddy, Co-Founder"
            />
          </section>
        </ScrollReveal>

        {/* Brand Guidelines */}
        <ScrollReveal>
          <section className="py-14 md:py-20 border-t border-cream-05">
            <SectionLabel>Brand Guidelines</SectionLabel>
            <SectionHeading>How to write our name</SectionHeading>
            <P>
              Always write as{" "}
              <strong>&ldquo;Logo.ai&rdquo;</strong> — capital L, lowercase
              o-g-o, period, lowercase a-i.
            </P>

            <div className="flex flex-col gap-2.5 my-6">
              {/* Correct */}
              <div className="text-[0.92rem] font-medium text-cream flex items-center gap-2.5">
                <span className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full bg-[rgba(232,66,13,.06)] border border-[rgba(232,66,13,.15)] text-[0.65rem] text-accent">
                  &#x2713;
                </span>
                Logo.ai
              </div>
              {/* Wrong */}
              {["LogoAI", "logoai", "Logo AI", "LOGO.AI", "Logo.Ai"].map(
                (name) => (
                  <div
                    key={name}
                    className="text-[0.92rem] font-normal text-cream-35 line-through decoration-cream-10 flex items-center gap-2.5"
                  >
                    <span className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full bg-cream-05 text-[0.6rem] text-cream-35">
                      &#x2715;
                    </span>
                    {name}
                  </div>
                )
              )}
            </div>

            <P>
              In a sentence:{" "}
              <strong>
                &ldquo;Logo.ai creates professional logos and brand kits in
                seconds.&rdquo;
              </strong>
            </P>
            <P>Full brand guide and assets available at launch.</P>
          </section>
        </ScrollReveal>

        {/* Brand Assets */}
        <ScrollReveal>
          <section className="py-14 md:py-20 border-t border-cream-05">
            <SectionLabel>Brand Assets</SectionLabel>
            <SectionHeading>Available at launch</SectionHeading>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              {[
                "Wordmark (dark & light)",
                "Icon mark",
                "Brand colors (HEX, RGB)",
                "Product screenshots",
                "Founder headshots",
              ].map((asset) => (
                <div
                  key={asset}
                  className="px-6 py-5 rounded-3xl border border-cream-10 bg-gradient-to-br from-cream-05 to-transparent flex items-center gap-3.5 transition-all duration-[400ms] hover:border-cream-18 hover:shadow-[0_20px_60px_rgba(0,0,0,.2)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-[0.88rem] font-normal text-cream-55">
                    {asset}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-7 text-cream-55 text-base leading-[1.8]">
              Need assets early?{" "}
              <a
                href={`mailto:${PRESS_EMAIL}`}
                className="text-accent-hi border-b border-[rgba(232,66,13,.25)] pb-px transition-colors duration-200 hover:border-[rgba(232,66,13,.5)]"
              >
                Email us
              </a>
            </p>
          </section>
        </ScrollReveal>

        {/* Dashed divider */}
        <hr className="border-0 border-t border-dashed border-cream-10 m-0" />

        {/* Contact CTA */}
        <ScrollReveal>
          <section className="relative z-[2] py-[100px] md:pb-[120px] text-center">
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold tracking-[-0.04em] mb-3.5 text-cream">
              Want to cover us?
            </h2>
            <p className="text-base text-cream-55 font-normal mb-9">
              Early access, founder interviews, and assets available on request.
            </p>
            <a
              href={`mailto:${PRESS_EMAIL}`}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-accent text-white font-semibold text-[0.92rem] no-underline shadow-[0_0_20px_rgba(232,66,13,.15)] transition-all duration-300 hover:bg-accent-hi hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(232,66,13,.25),0_10px_40px_rgba(0,0,0,.3)]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {PRESS_EMAIL}
            </a>
          </section>
        </ScrollReveal>
      </div>
    </>
  );
}
