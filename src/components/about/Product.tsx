import ScrollReveal from "../ScrollReveal";

const FEATURES = [
  {
    title: "Logo Files",
    description: "SVG, PNG, JPG, and PDF formats",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3l1.76 3.57 3.94.63-2.85 2.78.67 3.92L10 12.1l-3.52 1.8.67-3.92L4.3 7.2l3.94-.63L10 3z" stroke="#E8420D" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
    accent: true,
  },
  {
    title: "Brand Colors",
    description: "HEX, RGB, and CMYK values",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="6.5" stroke="#E8420D" strokeWidth="1.5" />
        <circle cx="10" cy="10" r="2.5" stroke="#E8420D" strokeWidth="1.3" />
      </svg>
    ),
    accent: true,
  },
  {
    title: "Font Guide",
    description: "Hand-picked font pairings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M6.5 16L10 4l3.5 12M7.5 13h5" stroke="#E8E8E6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: false,
  },
  {
    title: "Business Card Design",
    description: "Print-ready layouts, front and back",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="5" width="16" height="10" rx="2" stroke="#E8420D" strokeWidth="1.5" />
        <path d="M6 9h4M6 12h6" stroke="#E8420D" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    accent: true,
  },
  {
    title: "Social Media Kit",
    description: "Profile pics, covers, and story templates",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="3" stroke="#E8420D" strokeWidth="1.5" />
        <circle cx="10" cy="9" r="2.5" stroke="#E8420D" strokeWidth="1.3" />
        <path d="M5 16c0-2.5 2.2-4 5-4s5 1.5 5 4" stroke="#E8420D" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    accent: true,
  },
  {
    title: "Brand Guide",
    description: "Usage rules, spacing guides, and dos & don'ts",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="4" y="2" width="12" height="16" rx="2" stroke="#E8E8E6" strokeWidth="1.5" />
        <path d="M7 6h6M7 9h6M7 12h4" stroke="#E8E8E6" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    accent: false,
  },
];

export default function Product() {
  return (
    <section className="relative z-[2] py-[120px] px-4 md:px-8 bg-[#09090B]">
      <div className="max-w-[1100px] mx-auto md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* ── Left: Feature card grid ── */}
          <ScrollReveal delay={1}>
            <div className="grid grid-cols-2 gap-4">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="rounded-[16px] border border-[rgba(232,232,230,.10)] bg-[rgba(232,232,230,.03)] p-5 flex items-start gap-4"
                >
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${
                      f.accent
                        ? "bg-[rgba(232,66,13,.12)] border border-[rgba(232,66,13,.2)]"
                        : "bg-[rgba(232,232,230,.06)] border border-[rgba(232,232,230,.10)]"
                    }`}
                  >
                    {f.icon}
                  </div>
                  {/* Text */}
                  <div>
                    <div className="font-display text-[0.85rem] font-semibold text-cream mb-1">
                      {f.title}
                    </div>
                    <div className="font-sans text-[0.75rem] leading-[1.6] font-normal text-cream-35">
                      {f.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* ── Right: Text content ── */}
          <div>
            {/* .section-tag */}
            <ScrollReveal>
              <div className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-accent mb-4">
                What We Built
              </div>
            </ScrollReveal>

            {/* .section h2 */}
            <ScrollReveal delay={1}>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.15] tracking-[-0.03em] mb-6 text-cream">
                The world&apos;s most
                <br />
                advanced logo
                <br />
                generator
              </h2>
            </ScrollReveal>

            {/* p.desc paragraphs */}
            <ScrollReveal delay={2}>
              <p className="font-sans text-[1.02rem] leading-[1.8] font-normal text-cream-55 mb-5 max-w-[460px]">
                Logo.ai doesn&apos;t recycle templates. It actually{" "}
                <strong className="text-cream font-semibold">designs</strong> — from
                scratch, every single time.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={3}>
              <p className="font-sans text-[1.02rem] leading-[1.8] font-normal text-cream-55 mb-5 max-w-[460px]">
                Describe your brand. In under 60 seconds, our AI generates stunning,
                original logos and a{" "}
                <strong className="text-cream font-semibold">complete brand kit</strong>{" "}
                — ready to use anywhere.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={3}>
              <p className="font-sans text-[1.02rem] leading-[1.8] font-normal text-cream-55 mb-5 max-w-[460px]">
                We showed early demos to founders. Their first reaction?{" "}
                <strong className="text-cream font-semibold">
                  &quot;This can&apos;t be real.&quot;
                </strong>
              </p>
            </ScrollReveal>

            <ScrollReveal delay={3}>
              <p className="font-sans text-[1.02rem] leading-[1.8] font-semibold text-cream italic">
                It is.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
