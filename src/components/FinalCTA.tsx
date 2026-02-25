"use client";

import ScrollReveal from "./ScrollReveal";
import EmailBar from "./EmailBar";
import { useCount } from "./CountProvider";

const TOTAL = 500_000;

export default function FinalCTA() {
  const { count, setCount } = useCount();
  const remaining = TOTAL - count;

  return (
    <section
      id="sign-up"
      className="relative z-[2] py-[120px] md:py-[120px] md:pb-[140px] px-4 md:px-8 text-center overflow-hidden bg-b0 cta-glow cta-grid"
    >
      <ScrollReveal>
        <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold tracking-[-0.04em] leading-[1.1] mb-7 text-cream relative z-[2] md:whitespace-nowrap">
          Ready to Get Your Free Logo?
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={1}>
        <p className="font-display text-[0.85rem] tracking-[-0.01em] text-cream-35 font-medium mb-10 relative z-[2]">
          <strong className="text-cream-55">
            {remaining.toLocaleString()}
          </strong>{" "}
          logos remaining. Don&apos;t miss out.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={2}>
        <div className="max-w-[460px] mx-auto relative z-[2] flex justify-center">
          <EmailBar source="final_cta" onSignupSuccess={(c) => setCount(c)} />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={3}>
        <p className="text-[0.72rem] text-cream-35 mt-5 relative z-[2]">
          No spam. No credit card. Just early access.
        </p>
      </ScrollReveal>
    </section>
  );
}
