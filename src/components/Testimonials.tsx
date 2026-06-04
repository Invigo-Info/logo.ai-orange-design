import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";

const REVIEWS = [
  {
    name: "Ben Hartley",
    title: "Coffee Roaster",
    location: "Oakland, CA",
    quote:
      "It looks like we paid a studio. We didn't. I generated a logo for our coffee company and the next was genuinely clean — the kind of thing I'd have expected to wait three weeks and a few thousand dollars for. It's been on our bags for three months. Customers keep asking who designed it.",
  },
  {
    name: "Preethi Nair",
    title: "Startup Co-founder",
    location: "San Francisco, CA",
    quote:
      "First time our whole team agreed on anything brand-related. We typed in our company name and what we build, generated ten options, and dropped them in Slack for a vote. We agreed within an hour. The one we picked still looks sharp on everything from the favicon to the deck.",
  },
  {
    name: "Marcus Webb",
    title: "Startup Founder",
    location: "San Francisco, CA",
    quote:
      "Three investors asked about our branding. I dropped the logo into our deck and three investors on separate calls commented on it. It looked considered — like we'd thought about our brand as carefully as our product. I told them how I got it. Two asked for the link.",
  },
  {
    name: "Claire Sutton",
    title: "Architect",
    location: "Berkeley, CA",
    quote:
      "I briefed two designers last year. Neither got this close. Four months, two designers, endless revisions, and I never loved the result. The first batch here had one I'd have happily paid for the deck. It nailed it the same day. It actually looks like it belongs to my firm.",
  },
  {
    name: "James Okonkwo",
    title: "Shop Owner",
    location: "San Jose, CA",
    quote:
      "The logo was the only thing left. You're it's done. My store was finished for two weeks before I could land a logo I generated two options, found one that looked like a real brand, and launched three days later. It holds up on the packaging and the lab equally well.",
  },
  {
    name: "Suki Park",
    title: "App Co-founder",
    location: "San Francisco, CA",
    quote:
      "Updated our App Store listing. It finally looks like a real product. The icon reads perfectly even at the tiny App Store size, which is harder than it sounds. Downloads ticked up the week after we updated it.",
  },
  {
    name: "Rosa Delgado",
    title: "Restaurant Owner",
    location: "San Jose, CA",
    quote:
      "My embroidery supplier said it was one of the cleanest files they'd seen. I needed something for staff uniforms. I downloaded the vector file and sent it over, and my supplier called to say the lines were so clean it stitched perfectly first time. The logo itself looks like a proper restaurant brand.",
  },
  {
    name: "Theo Marchetti",
    title: "Co-Founder, Sales Lead",
    location: "Berkeley, CA",
    quote:
      "They assumed we'd worked with a designer for months. We generated options the morning of our first customer meeting and picked one over breakfast. It looked polished enough that they assumed we'd had a designer on it for months. It took us about a minute.",
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

      <div className="max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {REVIEWS.map((r, i) => (
          <ScrollReveal key={r.name} delay={(i % 3) as 0 | 1 | 2 | 3}>
            <article className="h-full rounded-2xl border border-cream-10 bg-b1 p-6 md:p-7 flex flex-col gap-4">
              {/* Stars */}
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg
                    key={j}
                    width="13"
                    height="13"
                    viewBox="0 0 14 14"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M7 1l1.76 3.57L12.7 5.2l-2.85 2.78.67 3.92L7 10.1l-3.52 1.8.67-3.92L1.3 5.2l3.94-.63L7 1z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-[0.92rem] leading-[1.6] text-cream-80 flex-1">
                {r.quote}
              </p>

              {/* Author line */}
              <div className="pt-2 mt-auto">
                <p className="text-[0.88rem]">
                  <span className="font-semibold text-cream">{r.name}</span>
                  <span className="text-cream-35"> — {r.title}, {r.location}</span>
                </p>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
