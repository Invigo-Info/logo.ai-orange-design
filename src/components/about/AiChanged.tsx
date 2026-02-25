import ScrollReveal from "../ScrollReveal";

export default function AiChanged() {
  return (
    /* .tp-section: relative z-2, padding 100px 0 80px, overflow-hidden */
    <section className="relative z-[2] pt-[100px] pb-[80px] px-4 md:px-8 bg-[#09090B] overflow-hidden">
      {/* .tp-bg — radial masked background glow (no image, using gradient to mimic) */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full opacity-[0.35]"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(232,66,13,0.06), transparent 70%)",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 70%)",
          }}
        />
      </div>

      {/* .tp-content: relative z-2 */}
      <div className="relative z-[2] max-w-[720px] mx-auto px-6 text-center">
        {/* .section-tag: Sora 0.68rem/600 uppercase tracking-0.14em accent mb-4 */}
        <ScrollReveal>
          <div className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-accent mb-4">
            The Turning Point
          </div>
        </ScrollReveal>

        {/* .tp-section h2: Sora clamp(1.8rem,3.5vw,2.6rem)/700 leading-1.15 tracking--0.03em cream mb-5 */}
        <ScrollReveal delay={1}>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.15] tracking-[-0.03em] mb-5 text-cream">
            Then AI changed the game
          </h2>
        </ScrollReveal>

        {/* p.desc: 1.02rem/1.8 400 c55 mb-5 */}
        <ScrollReveal delay={2}>
          <p className="font-sans text-[1.02rem] leading-[1.8] font-normal text-cream-55 mb-10">
            When AI started transforming how things are made, we saw the opening
            we&apos;d been waiting for.
          </p>
        </ScrollReveal>

        {/* Quote card — dark card with accent left border */}
        <ScrollReveal delay={2}>
          <div className="relative rounded-[16px] border border-cream-10 bg-b1 overflow-hidden max-w-[580px] mx-auto">
            {/* Accent left border — gradient from accent top to transparent bottom */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[3px]"
              style={{
                background: "linear-gradient(to bottom, #E8420D, transparent)",
              }}
            />
            {/* Bottom edge glow */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(232,66,13,0.2), transparent)",
              }}
            />
            <div className="py-7 px-8 pl-9 text-left">
              <p className="font-sans text-[1.02rem] leading-[1.8] font-normal text-cream">
                What if getting a world-class logo was as simple as describing your brand?
                No designers. No templates. No waiting.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Closing bold line */}
        <ScrollReveal delay={3}>
          <p className="font-sans text-[1.02rem] leading-[1.8] font-semibold text-cream mt-12">
            That question became Logo.ai.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
