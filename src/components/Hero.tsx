"use client";

import { useEffect, useState } from "react";
import EmailBar from "./EmailBar";
import { useCount } from "./CountProvider";

const TOTAL = 500_000;

export default function Hero() {
  const { count, setCount } = useCount();
  const [time, setTime] = useState({ d: "36", h: "00", m: "00", s: "00" });

  useEffect(() => {
    const end = new Date("2026-04-01T00:00:00").getTime();
    const pad = (n: number) => String(n).padStart(2, "0");

    const tick = () => {
      const r = Math.max(0, end - Date.now());
      setTime({
        d: pad(Math.floor(r / 864e5)),
        h: pad(Math.floor((r % 864e5) / 36e5)),
        m: pad(Math.floor((r % 36e5) / 6e4)),
        s: pad(Math.floor((r % 6e4) / 1e3)),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const progress = Math.min((count / TOTAL) * 100, 100);

  return (
    <section
      id="top"
      className="relative z-[2] pt-[160px] pb-[80px] text-center overflow-hidden bg-b0 hero-glow"
    >
      {/* Hero content */}
      <div className="flex flex-col items-center px-6 md:px-8 relative z-[2]">
        {/* Free tag pill */}
        <div className="inline-flex items-center gap-2 mb-8 opacity-0 animate-rise-1 rounded-full border border-[rgba(232,66,13,.18)] bg-[rgba(232,66,13,.06)] px-6 py-2.5">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M7 1l1.76 3.57L12.7 5.2l-2.85 2.78.67 3.92L7 10.1l-3.52 1.8.67-3.92L1.3 5.2l3.94-.63L7 1z"
              fill="#FF5C2E"
            />
          </svg>
          <span className="text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-accent-hi">
            Free for the First 500,000 Users
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-[clamp(2.8rem,6.5vw,4.8rem)] font-extrabold leading-[1.06] tracking-[-0.05em] mb-6 text-center text-cream opacity-0 animate-rise-2">
          Get Your Custom
          <br /> Logo in 60 Seconds
          <br />
        </h1>

        {/* Subhead */}
        <p className="text-[1.12rem] text-cream-55 leading-[1.7] max-w-[500px] mb-11 text-center opacity-0 animate-rise-3">
          Powered by our industry-leading AI Logo Generator.
          {/* Original, professional AI-generated logos.
          <br />
          No agencies. No freelancers. No $5,000+ price tag. */}
        </p>

        {/* CTA wrap with glow */}
        <div className="relative inline-flex flex-col items-center gap-5 opacity-0 animate-rise-4 hero-cta-glow">
          {/* Email form */}
          <EmailBar source="hero" onSignupSuccess={(c) => setCount(c)} />

          {/* Signup note */}
          <p className="text-[0.72rem] text-cream-35 relative z-[2]">
            No spam. No credit card. Just early access.
          </p>
        </div>

        {/* Progress section */}
        <div className="mt-8 flex flex-col items-center gap-3 w-full max-w-[400px] relative z-[1] opacity-0 animate-rise-5">
          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-[100px] bg-cream-10 overflow-hidden">
            <div
              className="h-full rounded-[100px] bg-gradient-to-r from-accent to-accent-hi shadow-[0_0_12px_rgba(232,66,13,.4)] transition-[width] duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Claimed count */}
          <p className="text-[0.78rem] text-cream-35 font-medium">
            <strong className="text-cream-55">{count.toLocaleString()}</strong>{" "}
            of 500,000 free logos claimed
          </p>
        </div>
      </div>

      {/* Countdown */}
      <div className="mt-[60px] text-center">
        <div className="font-display text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-cream-35 mb-5">
          Launching In
        </div>
        <div className="inline-flex gap-2 items-center justify-center">
          {[
            { val: time.d, label: "Days" },
            { val: time.h, label: "Hours" },
            { val: time.m, label: "Min" },
            { val: time.s, label: "Sec" },
          ].map((unit, i) => (
            <div key={unit.label} className="flex items-center">
              {i > 0 && (
                <span className="font-display text-[1.6rem] font-bold text-cream-18 pb-5 mx-1">
                  :
                </span>
              )}
              <div className="flex flex-col items-center gap-1.5 min-w-[56px] sm:min-w-[72px]">
                <div className="py-3 px-3.5 sm:py-4 sm:px-5 rounded-2xl bg-cream-05 border border-cream-10">
                  <span className="font-display text-[1.6rem] sm:text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-[-0.03em] text-cream leading-none block">
                    {unit.val}
                  </span>
                </div>
                <span className="text-[0.62rem] font-semibold tracking-[0.12em] uppercase text-cream-35">
                  {unit.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-b from-transparent to-b1 z-[3] pointer-events-none hidden md:block" />
    </section>
  );
}
