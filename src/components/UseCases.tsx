import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";

const COLUMNS = [
  {
    title: "Your Digital Presence",
    items: [
      "Website & landing pages",
      "Social media profiles",
      "Email signatures",
      "Online store",
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <rect x="3" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 8h16" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 19h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Marketing & Sales",
    items: [
      "Pitch decks & proposals",
      "Invoices & contracts",
      "Ads & social posts",
      "Email campaigns & newsletters",
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path d="M3 11l3.5-3.5L11 12l4.5-4.5L19 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 7h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Physical & Print",
    items: [
      "Business cards & print",
      "Storefront signage",
      "Packaging & products",
      "Event banners & posters",
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <rect x="3" y="5" width="16" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 9h16" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="7.5" cy="13" r="1.2" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
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

      <div className="max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {COLUMNS.map((col, i) => (
          <ScrollReveal key={col.title} delay={(i + 1) as 1 | 2 | 3}>
            <div className="h-full rounded-2xl border border-cream-10 bg-b1 p-6 md:p-8 flex flex-col gap-5">
              <div className="h-11 w-11 rounded-xl border border-[rgba(232,66,13,.2)] bg-[rgba(232,66,13,.08)] grid place-items-center text-accent-hi">
                {col.icon}
              </div>
              <h3 className="font-display text-[1.15rem] md:text-[1.25rem] font-bold text-cream tracking-[-0.01em]">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[0.92rem] text-cream-55 leading-[1.5]"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="text-accent-hi mt-1 shrink-0"
                      aria-hidden
                    >
                      <path d="M11.5 3.8 5.6 9.7 2.5 6.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{item}</span>
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
