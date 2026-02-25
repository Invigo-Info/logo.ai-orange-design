import ScrollReveal from "../ScrollReveal";

const PILLARS = [
  {
    title: "Research & Training",
    description: "Studied 100K+ professional logos to learn what makes great design tick.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="9" cy="9" r="6" stroke="#E8420D" strokeWidth="1.5" />
        <path d="M13.5 13.5L17 17" stroke="#E8420D" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "AI Model Development",
    description: "Created custom models that actually understand brand identity and design principles.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="3" stroke="#E8420D" strokeWidth="1.5" />
        <path d="M10 7v6M7 10h6" stroke="#E8420D" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Designer Validation",
    description: "Pro designers reviewed and refined every output until it was indistinguishable from human work.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M6 10l3.5 3.5L15 7" stroke="#E8420D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Timeline() {
  return (
    <section className="relative z-[2] py-[120px] px-4 md:px-8 bg-[#111113] border-t border-b border-[rgba(232,232,230,.05)]">
      <div className="max-w-[720px] mx-auto text-center relative z-[2] px-6">
        {/* .section-tag: Sora 0.68rem/600 uppercase tracking-0.14em accent mb-4 */}
        <ScrollReveal>
          <div className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-accent mb-4">
            How We Built It
          </div>
        </ScrollReveal>

        {/* .section h2: Sora clamp(1.8rem,3.5vw,2.6rem)/700 leading-1.15 tracking--0.03em cream mb-5 */}
        <ScrollReveal delay={1}>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.15] tracking-[-0.03em] mb-5 text-cream">
            Two years. Thousands of hours.
            <br />
            One obsession.
          </h2>
        </ScrollReveal>

        {/* p.desc: 1.02rem/1.8 400 c55 */}
        <ScrollReveal delay={2}>
          <p className="font-sans text-[1.02rem] leading-[1.8] font-normal text-cream-55 mb-14">
            We didn&apos;t just make a logo maker. We taught an AI to think like a designer — to
            understand balance, spacing, typography, and the feel that separates good logos from
            great ones.
          </p>
        </ScrollReveal>
      </div>

      {/* 3-column feature cards */}
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-[2] px-4 md:px-8">
        {PILLARS.map((item, i) => (
          <ScrollReveal key={item.title} delay={i > 1 ? 2 : i > 0 ? 1 : 0}>
            <div className="rounded-[16px] border border-[rgba(232,232,230,.10)] bg-[#111113] p-8 pt-10 text-center h-full">
              {/* Icon: accent icon in rounded square */}
              <div className="w-11 h-11 rounded-[10px] bg-[rgba(232,66,13,.1)] border border-[rgba(232,66,13,.2)] flex items-center justify-center mx-auto mb-6">
                {item.icon}
              </div>

              {/* Title: Sora, bold, cream */}
              <h3 className="font-display text-[1rem] font-bold text-cream tracking-[-0.01em] mb-3">
                {item.title}
              </h3>

              {/* Description: Outfit, c55 */}
              <p className="font-sans text-[0.88rem] leading-[1.7] font-normal text-cream-55">
                {item.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
