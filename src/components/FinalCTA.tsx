"use client";

import { useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import EmailBar from "./EmailBar";
import { useCount } from "./CountProvider";

const TOTAL = 2_000_000;
const COUNTDOWN_START = new Date("2026-04-01T00:00:00").getTime();
const COUNTDOWN_END = new Date("2026-08-01T00:00:00").getTime();

export default function FinalCTA() {
  const { count, setCount } = useCount();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const claimedRatio = Math.min(Math.max(count / TOTAL, 0), 1);
      const span = COUNTDOWN_END - COUNTDOWN_START;
      const elapsed = now - COUNTDOWN_START;
      const timeRatio = Math.min(Math.max(elapsed / span, 0), 1);
      setProgress(Math.max(claimedRatio, timeRatio) * 100);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [count]);

  return (
    <section
      id="sign-up"
      className="relative z-[2] py-20 md:py-[120px] px-4 md:px-8 bg-b0"
    >
      <ScrollReveal>
        <div className="max-w-[920px] mx-auto rounded-[28px] border-2 border-[rgba(232,66,13,.4)] bg-b0 px-6 md:px-12 py-12 md:py-16 text-center relative overflow-hidden">
          {/* Accent glow */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[440px] bg-[radial-gradient(ellipse,rgba(232,66,13,.18),transparent_60%)] pointer-events-none" />

          <h2 className="relative font-display text-[clamp(1.9rem,4.4vw,2.75rem)] font-extrabold tracking-[-0.022em] leading-[1.08] mb-5 text-cream">
            Ready to Get Your Free Logo?
          </h2>

          <p className="relative text-[1.02rem] text-cream-55 leading-[1.55] max-w-[540px] mx-auto mb-9">
            Hundreds of thousands have already claimed theirs. Get yours before
            they&rsquo;re gone.
          </p>

          <div className="relative flex justify-center mb-5">
            <EmailBar source="final_cta" onSignupSuccess={(c) => setCount(c)} />
          </div>

          <p className="relative text-[0.78rem] font-semibold text-cream-55 mb-1">
            No spam. No credit card. Just a free logo.
          </p>
          <p className="relative text-[0.74rem] text-cream-35 mb-8 max-w-[460px] mx-auto leading-[1.5]">
            We&rsquo;ll email you the moment we go live so you can generate
            your free logo.
          </p>

          {/* Progress */}
          <div className="relative max-w-[440px] mx-auto flex flex-col items-center gap-3">
            <p className="text-[0.85rem] text-cream-55 font-medium">
              <strong className="text-cream">{count.toLocaleString()}</strong>
              <span className="text-cream-35"> of 2,000,000 free logos claimed</span>
            </p>
            <div className="w-full h-1.5 rounded-[100px] bg-cream-10 overflow-hidden">
              <div
                className="h-full rounded-[100px] bg-gradient-to-r from-accent to-accent-hi shadow-[0_0_12px_rgba(232,66,13,.4)] transition-[width] duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[0.74rem] text-cream-35 italic mt-1">
              Don&rsquo;t miss yours.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
