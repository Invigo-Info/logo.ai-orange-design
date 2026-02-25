import ScrollReveal from "../ScrollReveal";

export default function SocialProof() {
  return (
    <section className="relative z-[2] py-[120px] px-4 md:px-8 bg-[#111113] border-t border-b border-[rgba(232,232,230,.05)]">
      <div className="max-w-[720px] mx-auto text-center relative z-[2] px-6">
        {/* .section-tag: Sora 0.68rem/600 uppercase tracking-0.14em accent mb-4 */}
        <ScrollReveal>
          <div className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-accent mb-4">
            The Name
          </div>
        </ScrollReveal>

        {/* .section h2: Sora clamp(1.8rem,3.5vw,2.6rem)/700 leading-1.15 tracking--0.03em cream mb-5 */}
        <ScrollReveal delay={1}>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.15] tracking-[-0.03em] mb-5 text-cream">
            A product that earned its name
          </h2>
        </ScrollReveal>

        {/* p.desc: 1.02rem/1.8 400 c55 */}
        <ScrollReveal delay={2}>
          <p className="font-sans text-[1.02rem] leading-[1.8] font-normal text-cream-55 mb-10">
            When we knew we had something special, we wanted a name that
            matched. One of the most sought-after domains in the space — we
            acquired it because the product deserved nothing less.
          </p>
        </ScrollReveal>

        {/* Logo brand card */}
        <ScrollReveal delay={2}>
          <div className="inline-flex items-center gap-4 py-6 px-10 rounded-[20px] border border-[rgba(232,232,230,.10)] bg-[#111113] mb-10">
            {/* Accent circle with checkmark */}
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shrink-0">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M6 11.5l3.5 3.5L16 8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {/* logo.ai text */}
            <div className="font-display text-[2rem] font-extrabold tracking-[-0.03em] text-cream">
              logo<span className="text-accent">.</span>ai
            </div>
          </div>
        </ScrollReveal>

        {/* Closing bold line */}
        <ScrollReveal delay={3}>
          <p className="font-sans text-[1.02rem] leading-[1.8] font-semibold text-cream">
            Simple. Direct. Unforgettable.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
