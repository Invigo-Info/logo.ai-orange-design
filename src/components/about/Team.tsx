import ScrollReveal from "../ScrollReveal";

const LOCATIONS = ["San Francisco (HQ)", "Singapore", "Tallinn", "Dubai"];

export default function Team() {
  return (
    <section className="relative z-[2] py-[120px] px-4 md:px-8 bg-[#111113] border-t border-b border-[rgba(232,232,230,.05)]">
      <div className="max-w-[720px] mx-auto text-center relative z-[2] px-6">
        {/* .section-tag: Sora 0.68rem/600 uppercase tracking-0.14em accent mb-4 */}
        <ScrollReveal>
          <div className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-accent mb-4">
            The Team
          </div>
        </ScrollReveal>

        {/* .section h2: Sora clamp(1.8rem,3.5vw,2.6rem)/700 leading-1.15 tracking--0.03em cream mb-5 */}
        <ScrollReveal delay={1}>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.15] tracking-[-0.03em] mb-5 text-cream">
            50+ people. 4 countries. One
            <br />
            mission.
          </h2>
        </ScrollReveal>

        {/* p.desc: 1.02rem/1.8 400 c55, strong: cream/600 */}
        <ScrollReveal delay={2}>
          <p className="font-sans text-[1.02rem] leading-[1.8] font-normal text-cream-55 mb-8">
            A global team of AI researchers, brand designers, and product engineers.
            Perfectionists. Problem-solvers. Experts in generative AI, machine learning,
            typography, color theory, and brand strategy —{" "}
            <strong className="text-cream font-semibold">
              the exact mix needed to build something like Logo.ai.
            </strong>
          </p>
        </ScrollReveal>

        {/* Location pills */}
        <ScrollReveal delay={3}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {LOCATIONS.map((loc) => (
              <div
                key={loc}
                className="inline-flex items-center gap-2 py-[7px] px-4 rounded-full border border-[rgba(232,232,230,.10)]"
              >
                <span className="w-[6px] h-[6px] rounded-full bg-accent" />
                <span className="font-sans text-[0.78rem] font-medium text-cream-55">
                  {loc}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
