"use client";

import { useEffect, useState } from "react";
import EmailBar from "./EmailBar";

interface HeroProps {
  initialCount?: number;
}

export default function Hero({ initialCount = 63482 }: HeroProps) {
  const [count, setCount] = useState(initialCount);
  const [time, setTime] = useState({ d: "27", h: "07", m: "19", s: "56" });

  useEffect(() => {
    const end = Date.now() + 27 * 864e5 + 7 * 36e5 + 19 * 6e4 + 56e3;
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

  return (
    <section
      id="top"
      className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden bg-b0 hero-glow"
    >
      {/* Hero content */}
      <div className="flex flex-col items-center pt-[120px] md:pt-[140px] px-6 md:px-8 relative z-[2]">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-9 opacity-0 animate-rise-1">
          <span className="w-7 h-px bg-brand-amber" />
          <span className="font-mono text-[0.68rem] font-medium tracking-[0.15em] uppercase text-brand-amber">
            Free for the First 100,000 Users
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-[clamp(2.8rem,4.8vw,4.6rem)] font-extrabold leading-[1.02] tracking-[-0.035em] mb-5 text-center opacity-0 animate-rise-2">
          Get Your Custom
          <br />
          Logo in <em className="not-italic text-brand-amber">60 Seconds</em>
        </h1>

        {/* Subhead */}
        <p className="text-[1.05rem] text-cream-55 leading-[1.7] max-w-[480px] mb-11 text-center opacity-0 animate-rise-3">
          A professional logo that looks great everywhere.
        </p>

        {/* Email */}
        <div className="opacity-0 animate-rise-4 w-full flex justify-center">
          <EmailBar source="hero" onSignupSuccess={(c) => setCount(c)} />
        </div>

        {/* Proof */}
        <p className="mt-[18px] text-[0.76rem] text-cream-35 text-center opacity-0 animate-rise-5">
          <strong className="text-brand-amber font-semibold">{count.toLocaleString()}</strong> of
          100,000 free logos already taken
        </p>
      </div>

      {/* Countdown */}
      <div className="flex items-center justify-center relative py-14 md:py-20 pb-20 md:pb-20 w-full hero-grid">
        <div className="relative z-[2] text-center">
          <div className="font-mono text-[0.64rem] tracking-[0.18em] uppercase text-cream-35 mb-8">
            Launching In
          </div>
          <div className="flex items-baseline gap-1 sm:gap-1.5 justify-center">
            {[
              { val: time.d, label: "Days" },
              { val: time.h, label: "Hours" },
              { val: time.m, label: "Min" },
              { val: time.s, label: "Sec" },
            ].map((unit, i) => (
              <div key={unit.label} className="flex items-baseline">
                {i > 0 && (
                  <span className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] text-cream-10 leading-none pb-[18px] mx-0.5 sm:mx-1">
                    :
                  </span>
                )}
                <div className="text-center min-w-[56px] sm:min-w-[72px]">
                  <span className="font-serif text-[clamp(2.4rem,4.5vw,4.2rem)] sm:text-[clamp(2.6rem,4.5vw,4.2rem)] font-bold tracking-[-0.03em] text-cream leading-none block">
                    {unit.val}
                  </span>
                  <span className="font-mono text-[0.58rem] tracking-[0.14em] uppercase text-cream-35 mt-2 block">
                    {unit.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-b from-transparent to-b1 z-[3] pointer-events-none hidden md:block" />
    </section>
  );
}
