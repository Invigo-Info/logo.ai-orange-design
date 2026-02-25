export default function AboutHero() {
  return (
    <section className="relative z-[2] pt-[160px] pb-[80px] md:pb-[100px] text-center overflow-hidden bg-[#09090B]">
      <div className="flex flex-col items-center px-6 md:px-8 relative z-[2] max-w-[1000px] mx-auto">
        {/* Eyebrow pill — accent dot + "OUR STORY" */}
        <div className="inline-flex items-center gap-2 mb-8 opacity-0 animate-rise-1 rounded-full border border-[rgba(232,66,13,.18)] bg-[rgba(232,66,13,.06)] px-6 py-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="font-display text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-accent-hi">
            Our Story
          </span>
        </div>

        {/* Heading — Sora, very large, extrabold, cream */}
        <h1 className="font-display text-[clamp(3rem,7.5vw,5.5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] mb-7 text-cream opacity-0 animate-rise-2">
          Why we built this
        </h1>

        {/* Subtitle — Outfit, 1.02rem/1.8, 400, c55 */}
        <p className="font-sans text-[1.02rem] leading-[1.8] font-normal text-cream-55 max-w-[540px] opacity-0 animate-rise-3">
          The story behind Logo.ai — and the team making world-class
          logos accessible to everyone.
        </p>
      </div>
    </section>
  );
}
