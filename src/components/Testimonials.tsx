import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";

const REVIEWS = [
  {
    name: "Nadia Okafor",
    title: "Founder, Lumen Studio",
    location: "San Francisco, CA",
    quote:
      "Got a logo I actually liked in 90 seconds. Looks designer-made.",
  },
  {
    name: "Ben Hartley",
    title: "Owner, Hartley Coffee Co.",
    location: "Oakland, CA",
    quote:
      "Saved me $2,000. The vector files matched my coffee bag artwork perfectly.",
  },
  {
    name: "Preethi Nair",
    title: "Co-founder, Nara Skincare",
    location: "San Jose, CA",
    quote:
      "Tried three other AI tools — none came close to this output quality.",
  },
  {
    name: "Marcus Webb",
    title: "Operator, Webb Cleaning",
    location: "Berkeley, CA",
    quote:
      "Used my new logo on Day 1 — business cards, van wrap, the works.",
  },
  {
    name: "Claire Sutton",
    title: "Designer, Sutton Floral",
    location: "San Francisco, CA",
    quote:
      "Even as a designer I was impressed. Clean type, balanced spacing.",
  },
  {
    name: "James Okonkwo",
    title: "Founder, Forge Athletic",
    location: "Oakland, CA",
    quote:
      "The brand guidelines PDF was the unexpected hero. Sent it to my printer same day.",
  },
  {
    name: "Suki Park",
    title: "Owner, Park Nail Studio",
    location: "San Jose, CA",
    quote:
      "Looked at twelve options. Picked one. Done before my coffee got cold.",
  },
  {
    name: "Rosa Delgado",
    title: "Chef, Casa Verde Cantina",
    location: "Berkeley, CA",
    quote:
      "Full commercial license, transparent PNGs, SVG, the lot. Couldn't ask for more.",
  },
  {
    name: "Theo Marchetti",
    title: "Co-founder, Marchetti Tattoo",
    location: "San Francisco, CA",
    quote:
      "Felt custom-made for the brand. Better than my last paid designer.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="reviews"
      className="bg-b0 py-20 md:py-[120px] px-4 md:px-8 relative"
    >
      <SectionHeader
        eyebrow="Early Access"
        title="What our first users are saying"
        description="A few of the founders and creators we gave early access to before launch."
        className="mb-12 md:mb-16"
      />

      <div className="max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {REVIEWS.map((r, i) => (
          <ScrollReveal key={r.name} delay={(i % 3) as 0 | 1 | 2 | 3}>
            <article className="h-full rounded-2xl border border-cream-10 bg-b0 p-6 flex flex-col gap-4 hover:border-cream-18 transition-colors duration-300">
              {/* Stars */}
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg
                    key={j}
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M7 1l1.76 3.57L12.7 5.2l-2.85 2.78.67 3.92L7 10.1l-3.52 1.8.67-3.92L1.3 5.2l3.94-.63L7 1z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-[0.95rem] leading-[1.6] text-cream-80 flex-1">
                &ldquo;{r.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-cream-05">
                <div
                  className="h-10 w-10 rounded-full bg-gradient-to-br from-accent/30 to-accent-lo/40 flex items-center justify-center text-[0.78rem] font-semibold text-cream"
                  aria-hidden
                >
                  {r.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className="flex flex-col">
                  <span className="text-[0.85rem] font-semibold text-cream leading-tight">
                    {r.name}
                  </span>
                  <span className="text-[0.72rem] text-cream-35 leading-tight">
                    {r.title} · {r.location}
                  </span>
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
