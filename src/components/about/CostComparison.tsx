import ScrollReveal from "../ScrollReveal";

export default function CostComparison() {
  return (
    <section className="relative z-[2] py-[120px] px-4 md:px-8 bg-[#09090B]">
      <div className="max-w-[1100px] mx-auto md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          {/* ── Left: Text ── */}
          <div>
            {/* .section-tag — Sora 0.68rem/600 uppercase tracking-0.14em accent */}
            <ScrollReveal>
              <div className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-accent mb-4">
                The Problem
              </div>
            </ScrollReveal>

            {/* .section h2 — font-family:var(--display) = Sora, clamp(1.8rem,3.5vw,2.6rem), 700, 1.15, -.03em, cream, mb 20px */}
            <ScrollReveal delay={1}>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.15] tracking-[-0.03em] mb-5 text-cream">
                Great branding
                <br />
                shouldn&apos;t cost a
                <br />
                fortune
              </h2>
            </ScrollReveal>

            {/* p.desc — font-family:var(--body) = Outfit, 1.02rem, 1.8, 400, c55, mb 20px */}
            <ScrollReveal delay={2}>
              <p className="font-sans text-[1.02rem] leading-[1.8] font-normal text-cream-55 mb-5 max-w-[460px]">
                Everyone&apos;s building a brand now — startups, creators, freelancers,
                side projects. And the first thing every one of them needs is a logo.
              </p>
            </ScrollReveal>

            {/* p.desc strong — color:var(--cream), font-weight:600 */}
            <ScrollReveal delay={3}>
              <p className="font-sans text-[1.02rem] leading-[1.8] font-normal text-cream-55 mb-5 max-w-[460px]">
                But getting one? That&apos;s where it breaks down. Hire a designer —{" "}
                <strong className="text-cream font-semibold">$5,000+</strong> and weeks
                of back-and-forth. Use a logo maker? Cheap, but you end up with a
                generic template that looks like a million other brands.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={3}>
              <p className="font-sans text-[1.02rem] leading-[1.8] font-semibold text-cream">
                That gap shouldn&apos;t exist.
              </p>
            </ScrollReveal>
          </div>

          {/* ── Right: .visual-panel ── */}
          {/* rounded-[24px] border-cream-10 gradient(170deg,c05,transparent) p-[40px_28px] overflow-hidden */}
          <ScrollReveal delay={1}>
            <div
              className="relative rounded-[24px] border border-cream-10 overflow-hidden"
              style={{
                background: "linear-gradient(170deg, rgba(232,232,230,0.05), transparent)",
                padding: "40px 28px",
              }}
            >
              {/* .visual-panel-glow */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: "-40%",
                  left: "-20%",
                  width: "140%",
                  height: "140%",
                  background:
                    "radial-gradient(ellipse at 30% 30%, rgba(232,66,13,0.04), transparent 60%)",
                }}
              />

              {/* .problem-visual — flex-col gap-5 */}
              <div className="flex flex-col gap-5 relative z-[1]">
                {/* ── Designer row ── */}
                {/* .problem-row: p-[20px_24px] rounded-[16px] border rgba(232,66,13,.2) bg rgba(232,66,13,.04) */}
                <div className="flex items-center gap-4 py-5 px-6 rounded-[16px] border border-[rgba(232,66,13,.2)] bg-[rgba(232,66,13,.04)]">
                  {/* .problem-row-icon: 52×52 rounded-[12px] bg rgba(232,66,13,.12) */}
                  <div className="w-[52px] h-[52px] rounded-[12px] shrink-0 flex items-center justify-center bg-[rgba(232,66,13,.12)]">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <circle cx="11" cy="11" r="8" stroke="#FF5C2E" strokeWidth="1.5" />
                      <path d="M11 7v4.5" stroke="#FF5C2E" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="11" cy="14.5" r="0.85" fill="#FF5C2E" />
                    </svg>
                  </div>

                  {/* .problem-row-text */}
                  <div className="flex-1 min-w-0">
                    {/* .problem-row-label: 0.85rem/600 cream mb-[2px] */}
                    <div className="text-[0.85rem] font-semibold text-cream mb-[2px]">
                      Hire a designer
                    </div>
                    {/* .problem-row-sub: 0.78rem c35 */}
                    <div className="text-[0.78rem] text-cream-35">
                      Weeks of waiting &amp; revisions
                    </div>
                  </div>

                  {/* .problem-row-price: Sora 1.4rem/700 cream nowrap tracking--0.02em */}
                  <div className="font-display text-[1.4rem] font-bold text-cream whitespace-nowrap tracking-[-0.02em]">
                    $5,000+
                  </div>

                  {/* .problem-row-x: 28×28 circle bg rgba(232,66,13,.15) color accent-hi 0.75rem/600 */}
                  <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center bg-[rgba(232,66,13,.15)]">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 2l6 6M8 2l-6 6" stroke="#FF5C2E" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* .vs-badge: py-[6px] px-5 pill border-dashed-c10 Sora 0.6rem/600 c35 tracking-[3px] uppercase */}
                <div className="self-center py-[6px] px-5 rounded-full border border-dashed border-cream-10 font-display text-[0.6rem] font-semibold text-cream-35 uppercase" style={{ letterSpacing: "3px" }}>
                  VS
                </div>

                {/* ── Logo makers row ── */}
                {/* .problem-row.orange: border rgba(255,170,50,.2) bg rgba(255,170,50,.04) */}
                <div className="flex items-center gap-4 py-5 px-6 rounded-[16px] border border-[rgba(255,170,50,.2)] bg-[rgba(255,170,50,.04)]">
                  {/* .problem-row-icon orange: bg rgba(255,170,50,.12) color #ffaa33 */}
                  <div className="w-[52px] h-[52px] rounded-[12px] shrink-0 flex items-center justify-center bg-[rgba(255,170,50,.12)]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="2" y="2" width="7" height="7" rx="1.5" fill="#ffaa33" />
                      <rect x="11" y="2" width="7" height="7" rx="1.5" fill="#ffaa33" opacity="0.55" />
                      <rect x="2" y="11" width="7" height="7" rx="1.5" fill="#ffaa33" opacity="0.55" />
                      <rect x="11" y="11" width="7" height="7" rx="1.5" fill="#ffaa33" opacity="0.3" />
                    </svg>
                  </div>

                  {/* .problem-row-text */}
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.85rem] font-semibold text-cream mb-[2px]">
                      Logo makers
                    </div>
                    <div className="text-[0.78rem] text-cream-35">
                      Generic, cookie-cutter look
                    </div>
                  </div>

                  {/* .problem-row-price */}
                  <div className="font-display text-[1.4rem] font-bold text-cream whitespace-nowrap tracking-[-0.02em]">
                    Cheap
                  </div>

                  {/* .problem-row-x orange: bg rgba(255,170,50,.15) color #ffaa33 */}
                  <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center bg-[rgba(255,170,50,.15)]">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 2l6 6M8 2l-6 6" stroke="#ffaa33" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
