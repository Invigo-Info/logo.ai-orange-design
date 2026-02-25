import ScrollReveal from "./ScrollReveal";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`text-center mx-auto px-6 ${className}`}>
      {/* Section tag pill */}
      <ScrollReveal>
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[rgba(232,66,13,.06)] border border-[rgba(232,66,13,.15)] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-accent">
            {eyebrow}
          </span>
        </div>
      </ScrollReveal>

      {/* Heading */}
      <ScrollReveal delay={1}>
        <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.15] tracking-[-0.03em] mb-5 text-cream md:whitespace-nowrap">
          {title}
        </h2>
      </ScrollReveal>

      {/* Description */}
      {description && (
        <ScrollReveal delay={2}>
          <p className="text-[1.02rem] leading-[1.8] font-normal text-cream-55">
            {description}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}
