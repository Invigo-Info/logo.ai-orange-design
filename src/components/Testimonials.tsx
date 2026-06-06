import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/${id}?w=120&h=120&fit=crop&crop=faces&auto=format&q=80`;

const TESTIMONIALS = [
  {
    headline: "It looks like we paid a studio. We didn't.",
    body: "I generated a logo for our coffee company and the mark was genuinely clean — the kind of thing I'd have expected to wait three weeks and a few thousand dollars for. It's been on our bags for three months. Customers keep asking who designed it.",
    name: "Ben Hartley",
    meta: "Coffee Roaster, Oakland CA",
    img: UNSPLASH("photo-1507003211169-0a1dd7228f2d"),
  },
  {
    headline: "First time our whole team agreed on anything brand-related.",
    body: "We typed in our company name and what we build, generated ten options, and dropped them in Slack for a team vote. We agreed before the meeting ended. The one we picked still looks sharp on everything from the favicon to the deck.",
    name: "Preethi Nair",
    meta: "Startup Co-Founder, San Francisco CA",
    img: UNSPLASH("photo-1438761681033-6461ffad8d80"),
  },
  {
    headline: "Three investors asked about our branding.",
    body: "I dropped the logo into our deck and three investors on separate calls commented on it. It looked considered — like we'd thought about our brand as carefully as our product. I told them how I got it. Two asked for the link.",
    name: "Marcus Webb",
    meta: "Startup Founder, San Francisco CA",
    img: UNSPLASH("photo-1500648767791-00dcc994a43e"),
  },
  {
    headline: "I briefed two designers last year. Neither got this close.",
    body: "Four months, two designers, endless revisions, and I never loved the result. The first batch here had one I'd have happily paid for. Downloaded it the same day. It actually looks like it belongs to my firm.",
    name: "Claire Sutton",
    meta: "Architect, Berkeley CA",
    img: UNSPLASH("photo-1494790108377-be9c29b29330"),
  },
  {
    headline: "The logo was the only thing left. Now it's done.",
    body: "My store sat finished for two months because I couldn't face the logo. I generated ten options, found one that looked like a real brand, and launched three days later. It holds up on the packaging and the site equally well.",
    name: "James Okonkwo",
    meta: "Shop Owner, San Jose CA",
    img: UNSPLASH("photo-1531427186611-ecfd6d936c79"),
  },
  {
    headline: "Updated our App Store listing. It finally looks like a real product.",
    body: "I generated a logo for our app and picked the clearest one. The icon reads perfectly even at the tiny App Store size, which is harder than it sounds. Downloads ticked up the week after we updated it.",
    name: "Suki Park",
    meta: "App Co-Founder, San Francisco CA",
    img: UNSPLASH("photo-1544005313-94ddf0286df2"),
  },
  {
    headline:
      "My embroidery supplier said it was one of the cleanest files she’d seen.",
    body: "I needed something for staff uniforms. I downloaded the vector file and sent it over, and my supplier called to say the lines were so clean it stitched perfectly first time. The logo itself looks like a proper restaurant brand.",
    name: "Rosa Delgado",
    meta: "Restaurant Owner, San Jose CA",
    img: UNSPLASH("photo-1573496359142-b8d87734a5a2"),
  },
  {
    headline: "They assumed we'd worked with a designer for months.",
    body: "We generated options the morning of our first customer meeting and picked one over breakfast. It looked polished enough that they assumed we'd had a designer on it for months. It took us about a minute.",
    name: "Theo Marchetti",
    meta: "Startup Co-Founder, San Francisco CA",
    img: UNSPLASH("photo-1492562080023-ab3db95bfbce"),
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
        {TESTIMONIALS.map((t, i) => (
          <ScrollReveal key={t.name} delay={(i % 3) as 0 | 1 | 2 | 3}>
            <article className="h-full rounded-2xl border border-cream-10 bg-b1 p-6 md:p-7 flex flex-col transition-all duration-300 hover:border-accent hover:shadow-[0_0_24px_rgba(232,66,13,.15)]">
              {/* Stars */}
              <div className="flex gap-0.5 text-accent mb-5">
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

              {/* Headline */}
              <h3 className="text-[1.02rem] md:text-[1.08rem] font-semibold text-[rgba(232,232,230,0.88)] leading-[1.35] tracking-[-0.01em] mb-5">
                {t.headline}
              </h3>

              {/* Body */}
              <p className="text-[0.92rem] leading-[1.6] !text-[rgba(232,232,230,0.65)] flex-1 mb-8">
                {t.body}
              </p>

              {/* Author line */}
              <div className="mt-auto flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.img}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full shrink-0 object-cover border border-cream-10"
                />
                <div className="text-[0.88rem] leading-tight">
                  <p className="font-semibold text-[rgba(232,232,230,0.88)]">{t.name}</p>
                  <p className="!text-[rgba(232,232,230,0.55)] text-[0.8rem] mt-0.5">
                    {t.meta}
                  </p>
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
