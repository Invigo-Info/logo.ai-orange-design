import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";

type Item = { title: string; desc: string };

const COLUMNS: { title: string; items: Item[] }[] = [
  {
    title: "Your Digital Presence",
    items: [
      {
        title: "Website & landing pages",
        desc: "The first thing visitors see — make a polished impression in the header, footer, and browser tab icon.",
      },
      {
        title: "Social media profiles",
        desc: "Instagram, Facebook, LinkedIn, X — a clean profile picture that looks consistent everywhere.",
      },
      {
        title: "Email signatures",
        desc: "Add your brand to every email you send — clients and prospects remember a polished look.",
      },
      {
        title: "Your online store",
        desc: "Shopify, Etsy, your own site — branded storefronts convert better.",
      },
    ],
  },
  {
    title: "Marketing & Sales",
    items: [
      {
        title: "Pitch decks & proposals",
        desc: "Look the part on every slide, cover page, and one-pager you send to clients or investors.",
      },
      {
        title: "Invoices & contracts",
        desc: "Branded paperwork looks more credible — and gets paid faster.",
      },
      {
        title: "Ads & social posts",
        desc: "A consistent logo across ads builds recognition over time.",
      },
      {
        title: "Email campaigns & newsletters",
        desc: "Branded marketing emails feel more professional — and stand out in crowded inboxes.",
      },
    ],
  },
  {
    title: "Physical & Print",
    items: [
      {
        title: "Business cards & print",
        desc: "Your logo prints sharp on business cards, brochures, and flyers.",
      },
      {
        title: "Storefront signage",
        desc: "Your logo stays sharp at any size — from window decals to giant signs.",
      },
      {
        title: "Packaging & products",
        desc: "Boxes, labels, tags, merch — full commercial license means you can put your logo on anything.",
      },
      {
        title: "Event banners & posters",
        desc: "Stand out at trade shows, pop-ups, and conferences with a logo that holds up at any size.",
      },
    ],
  },
];

const ICONS = [
  // Digital
  (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" key="d" aria-hidden>
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 11h16M11 3a13 13 0 010 16M11 3a13 13 0 000 16" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  // Marketing
  (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" key="m" aria-hidden>
      <path d="M3 12l3.5-3.5L11 13l4.5-4.5L19 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 7h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  // Physical
  (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" key="p" aria-hidden>
      <rect x="3" y="5" width="16" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 9h16" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
];

export default function UseCases() {
  return (
    <section
      id="use-cases"
      className="bg-b0 py-20 md:py-[120px] px-4 md:px-8 relative"
    >
      <SectionHeader
        eyebrow="Use Cases"
        title="Use your logo everywhere your brand goes"
        description="Your logo is the face of your business. Here's where you'll put yours."
        className="mb-14 md:mb-16"
      />

      <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {COLUMNS.map((col, i) => (
          <ScrollReveal key={col.title} delay={(i + 1) as 1 | 2 | 3}>
            <div className="h-full rounded-2xl border border-cream-10 bg-b1 p-7 md:p-8 flex flex-col gap-6">
              <h3 className="font-display text-[1.25rem] font-bold text-cream tracking-[-0.01em]">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-5">
                {col.items.map((item, j) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="h-8 w-8 shrink-0 rounded-lg border border-[rgba(232,66,13,.2)] bg-[rgba(232,66,13,.08)] grid place-items-center text-accent-hi">
                      {ICONS[i]}
                      <span className="sr-only">{j + 1}</span>
                    </span>
                    <div className="flex flex-col gap-1">
                      <p className="text-[0.92rem] font-semibold text-cream leading-tight">
                        {item.title}
                      </p>
                      <p className="text-[0.82rem] text-cream-55 leading-[1.5]">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
