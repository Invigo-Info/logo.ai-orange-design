"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/aboutData";

function useCountUp(end: number, duration: number, trigger: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(end * eased);
      setValue(current);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [end, duration, trigger]);

  return value;
}

function StatItem({ suffix, label, numericEnd }: {
  value: string;
  suffix: string;
  label: string;
  numericEnd: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(numericEnd, 1800, visible);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const displayValue = () => {
    if (!visible) return "0";
    if (numericEnd === 100) return `${count}K`;
    if (numericEnd === 1000) return count.toLocaleString();
    return String(count);
  };

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      {/* Number: Sora, large extrabold, cream — suffix also cream */}
      <div className="font-display text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold tracking-[-0.03em] text-cream">
        {displayValue()}{suffix}
      </div>
      {/* Label: Sora, uppercase, small, tracking, c35 */}
      <div className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-cream-35">
        {label}
      </div>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="relative z-[2] py-16 md:py-20 px-4 md:px-8 bg-[#09090B] border-b border-[rgba(232,232,230,.05)]">
      <div className="max-w-[960px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative z-[2]">
        {stats.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
