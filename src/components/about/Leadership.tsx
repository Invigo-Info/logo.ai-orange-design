import ScrollReveal from "../ScrollReveal";
import { teamMembers } from "@/data/aboutData";

export default function Leadership() {
  return (
    <section className="relative z-[2] py-[120px] px-4 md:px-8 bg-[#09090B]">
      <div className="max-w-[720px] mx-auto text-center relative z-[2] px-6">
        {/* .section-tag: Sora 0.68rem/600 uppercase tracking-0.14em accent mb-4 */}
        <ScrollReveal>
          <div className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-accent mb-4">
            Leadership
          </div>
        </ScrollReveal>

        {/* .section h2: Sora clamp(1.8rem,3.5vw,2.6rem)/700 leading-1.15 tracking--0.03em cream mb-5 */}
        <ScrollReveal delay={1}>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.15] tracking-[-0.03em] mb-5 text-cream">
            Led by people who&apos;ve done
            <br />
            this before
          </h2>
        </ScrollReveal>

        {/* p.desc: 1.02rem/1.8 400 c55, strong: cream/600 */}
        <ScrollReveal delay={2}>
          <p className="font-sans text-[1.02rem] leading-[1.8] font-normal text-cream-55 mb-10">
            Brothers and serial entrepreneurs who&apos;ve launched technology products across
            every major wave —{" "}
            <strong className="text-cream font-semibold">web, mobile, and now AI</strong>.
            Products used by millions, with multiple successful exits.
          </p>
        </ScrollReveal>
      </div>

      {/* 2-column founder cards */}
      <div className="max-w-[860px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5 relative z-[2] px-4 md:px-8">
        {teamMembers.map((member, i) => (
          <ScrollReveal key={member.name} delay={i > 0 ? 1 : 0}>
            <div className="rounded-[16px] border border-[rgba(232,232,230,.10)] bg-[#111113] p-8 pt-10 text-center">
              {/* Name: Sora, bold, cream */}
              <h3 className="font-display text-[1.1rem] font-bold text-cream tracking-[-0.01em] mb-2">
                {member.name}
              </h3>
              {/* Title: Sora, uppercase, accent, small */}
              <div className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-accent mb-4">
                {member.title}
              </div>
              {/* Description: Outfit, c55 */}
              <p className="font-sans text-[0.88rem] font-normal text-cream-55">
                {member.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
