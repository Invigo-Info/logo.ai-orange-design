import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";

const steps = [
  {
    num: "01",
    title: "Sign up today",
    desc: "Drop your email to claim your spot. No credit card. No commitment.",
  },
  {
    num: "02",
    title: "Tell us about your brand",
    desc: "Answer a few quick questions about your business, style, and color preferences.",
  },
  {
    num: "03",
    title: "Our AI does the work",
    desc: "We generate multiple logo options tailored to your brand in seconds.",
  },
  {
    num: "04",
    title: "Preview and download",
    desc: "Pick your favorite, download high-res files in every format you need.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="bg-b0 py-20 md:py-[120px] px-4 md:px-8 relative section-fade-from-b1"
    >
      <SectionHeader
        eyebrow="How It Works"
        title="Your free logo in 60 seconds — on launch day"
        description="Just a few quick taps. No design skills needed."
        className="mb-14 md:mb-[56px]"
      />

      <div className="max-w-[760px] mx-auto relative z-[2]">
        {steps.map((step, i) => (
          <ScrollReveal key={step.num} delay={i > 0 ? i : 0}>
            <div
              className={`grid grid-cols-[52px_1fr] md:grid-cols-[72px_1fr] gap-5 md:gap-9 py-7 md:py-11 relative step-hover transition-[padding] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
                i > 0 ? "border-t border-cream-05" : ""
              }`}
            >
              <div className="font-display text-[2rem] md:text-[2.8rem] font-extrabold text-cream-10 leading-none">
                {step.num}
              </div>
              <div>
                <h3 className="font-display text-[1.1rem] md:text-[1.25rem] font-bold mb-2 tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="text-cream-35 text-[0.85rem] md:text-[0.9rem] leading-[1.65] max-w-[600px]">
                  {step.desc}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={5}>
        <p className="text-center text-[0.82rem] text-cream-35 mt-14 md:mt-16 max-w-[640px] mx-auto px-4">
          Your brand details stay private — never shared, never sold, only used
          to make your logos.
        </p>
      </ScrollReveal>
    </section>
  );
}
