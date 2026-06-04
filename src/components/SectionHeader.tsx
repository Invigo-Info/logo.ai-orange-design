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
      {/* Eyebrow */}
      <ScrollReveal>
        <p className="font-sans text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-accent mb-5">
          {eyebrow}
        </p>
      </ScrollReveal>

      {/* Heading */}
      <ScrollReveal delay={1}>
        <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.022em] mb-5 text-cream max-w-[820px] mx-auto">
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
