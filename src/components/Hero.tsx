"use client";

import { useEffect, useState } from "react";
import EmailBar from "./EmailBar";
import { useCount } from "./CountProvider";

const TOTAL = 2_000_000;
const COUNTDOWN_START = new Date("2026-04-01T00:00:00").getTime();
const COUNTDOWN_END = new Date("2026-08-01T00:00:00").getTime();

export default function Hero() {
  const { count, setCount } = useCount();
  const [time, setTime] = useState({ d: "61", h: "00", m: "00" });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const pad = (n: number) => String(n).padStart(2, "0");

    const tick = () => {
      const now = Date.now();
      const r = Math.max(0, COUNTDOWN_END - now);
      setTime({
        d: pad(Math.floor(r / 864e5)),
        h: pad(Math.floor((r % 864e5) / 36e5)),
        m: pad(Math.floor((r % 36e5) / 6e4)),
      });

      const claimedRatio = Math.min(Math.max(count / TOTAL, 0), 1);
      const timeSpan = COUNTDOWN_END - COUNTDOWN_START;
      const elapsed = now - COUNTDOWN_START;
      const timeRatio = Math.min(Math.max(elapsed / timeSpan, 0), 1);
      setProgress(Math.max(claimedRatio, timeRatio) * 100);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [count]);

  return (
    <section
      id="top"
      className="relative z-[2] pt-[140px] pb-[100px] text-center overflow-hidden bg-b0 hero-glow"
    >
      <div className="flex flex-col items-center px-6 md:px-8 relative z-[2] max-w-[920px] mx-auto">
        {/* Countdown pill (top) */}
        <div className="inline-flex items-center gap-2 mb-6 opacity-0 animate-rise-1 rounded-full border border-cream-10 bg-cream-05 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-hi animate-pulse-dot" aria-hidden />
          <span className="font-sans text-[0.74rem] font-semibold tracking-[0.1em] uppercase text-cream">
            Launching in {time.d}d : {time.h}h : {time.m}m
          </span>
        </div>

        {/* Eyebrow */}
        <p className="text-[0.68rem] font-semibold tracking-[0.18em] uppercase text-cream-55 mb-5 opacity-0 animate-rise-2">
          World&rsquo;s Best AI Logo Generator
        </p>

        {/* Headline */}
        <h1 className="font-display text-[clamp(2.6rem,6.4vw,4.6rem)] font-extrabold leading-[1.04] tracking-[-0.03em] mb-6 text-cream opacity-0 animate-rise-2 whitespace-pre-line">
          {"Get Your Free Logo\nin Seconds"}
        </h1>

        {/* Subhead */}
        <p className="font-sans text-[1.125rem] font-normal text-cream-80 leading-[1.55] max-w-[520px] mb-9 opacity-0 animate-rise-3">
          Free logo for the first 2,000,000 users. Claim your spot now.
        </p>

        {/* CTA */}
        <div className="relative inline-flex flex-col items-center gap-3 opacity-0 animate-rise-4 hero-cta-glow w-full">
          <div id="hero-email" className="w-full flex justify-center">
            <EmailBar source="hero" onSignupSuccess={(c) => setCount(c)} />
          </div>

          <p className="text-[0.78rem] text-cream-55 font-medium relative z-[2]">
            No spam. No credit card. Just a free logo.
          </p>
          <p className="text-[0.74rem] text-cream-35 relative z-[2] -mt-1.5 max-w-[460px] text-center leading-[1.5]">
            We&rsquo;ll email you the moment we go live so you can generate your
            free logo.
          </p>
        </div>

        {/* Progress */}
        <div className="mt-9 flex flex-col items-center gap-3 w-full max-w-[440px] relative z-[1] opacity-0 animate-rise-5">
          <div className="w-full h-1.5 rounded-[100px] bg-cream-10 overflow-hidden">
            <div
              className="h-full rounded-[100px] bg-gradient-to-r from-accent to-accent-hi shadow-[0_0_12px_rgba(232,66,13,.4)] transition-[width] duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-[0.8rem] text-cream-55 font-medium">
            <strong className="text-cream">{count.toLocaleString()}</strong>{" "}
            <span className="text-cream-35">of 2,000,000 free logos claimed</span>
          </p>

          <p className="text-[0.72rem] text-cream-35 italic mt-1">
            Going fast. Don&rsquo;t miss yours.
          </p>
        </div>
      </div>

    </section>
  );
}
