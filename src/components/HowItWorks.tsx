import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";

const steps = [
  {
    num: "01",
    title: "Sign up today",
    desc: "Enter your email to claim your spot. We'll email you the moment we go live so you can generate your free logo.",
  },
  {
    num: "02",
    title: "Tell us about your brand",
    desc: "Just enter your business name and a few words about what it does. That's it.",
  },
  {
    num: "03",
    title: "Our AI does the work",
    desc: "In seconds, our AI turns your brand details into 10 original logos — with the right style, colors, and fonts to match your brand.",
  },
  {
    num: "04",
    title: "Preview and download",
    desc: "See your logos, pick your favorite, and download it free. No credit card, no catch — just your logo.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="bg-b0 py-20 md:py-[120px] px-4 md:px-8 relative"
    >
      <SectionHeader
        eyebrow="How It Works"
        title="Your free logo in 60 seconds — on launch day"
        description="No design skills needed. Sign up today. The moment we go live, your free logo is waiting."
        className="mb-16 md:mb-20"
      />

      <div className="max-w-[1180px] mx-auto relative">
        {/* Horizontal dotted connector across desktop */}
        <div
          aria-hidden
          className="hidden md:block absolute top-[30px] left-[12%] right-[12%] border-t border-dashed border-[rgba(232,66,13,.35)]"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={(i + 1) as 1 | 2 | 3}>
              <div className="flex flex-col items-center text-center px-2 relative z-[2]">
                {/* Circle badge */}
                <div className="h-[60px] w-[60px] rounded-full border-2 border-[rgba(232,66,13,.55)] bg-b0 grid place-items-center mb-5">
                  <span className="font-display text-[1.1rem] font-bold text-accent-hi">
                    {step.num}
                  </span>
                </div>
                {/* Title */}
                <h3 className="font-display text-[1.1rem] md:text-[1.15rem] font-bold text-cream mb-3 tracking-[-0.01em]">
                  {step.title}
                </h3>
                {/* Description */}
                <p className="text-[0.88rem] text-cream-55 leading-[1.6] max-w-[240px]">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Trust statement */}
        <ScrollReveal delay={5}>
          <p className="text-[0.85rem] text-cream-55 mt-9 md:mt-11 max-w-[640px] mx-auto px-4 flex items-center justify-center gap-2 w-full">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="text-accent-hi shrink-0"
              aria-hidden
            >
              <path
                d="M11.5 3.8 5.6 9.7 2.5 6.6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-center">
              Your brand details stay private — never shared, never sold, only
              used to make your logos.
            </span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
