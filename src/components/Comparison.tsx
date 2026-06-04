import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";

type Cell = boolean | string;
type Row = { label: string; freelance: Cell; otherAI: Cell; logoai: Cell };

const ROWS: Row[] = [
  { label: "Looks like a designer made it", freelance: true, otherAI: false, logoai: true },
  { label: "Time to results", freelance: "2–4 weeks", otherAI: "Minutes", logoai: "60 seconds" },
  { label: "Price", freelance: "$500–$5,000", otherAI: "$20–$80", logoai: "Free" },
  { label: "No design skills needed", freelance: true, otherAI: true, logoai: true },
  { label: "Free to try", freelance: false, otherAI: false, logoai: true },
  { label: "Vector files (SVG, PDF, EPS)", freelance: true, otherAI: false, logoai: true },
  { label: "Transparent background (PNG)", freelance: true, otherAI: false, logoai: true },
  { label: "Brand Guidelines PDF included", freelance: false, otherAI: false, logoai: true },
  { label: "Full commercial license", freelance: true, otherAI: false, logoai: true },
  { label: "You own the logo forever", freelance: true, otherAI: false, logoai: true },
  { label: "Re-download anytime", freelance: false, otherAI: false, logoai: true },
  { label: "No subscription, ever", freelance: true, otherAI: false, logoai: true },
];

function renderCell(value: Cell, highlight = false) {
  if (typeof value === "string") {
    return (
      <span
        className={`text-[0.85rem] font-medium ${highlight ? "text-cream font-semibold" : "text-cream-55"}`}
      >
        {value}
      </span>
    );
  }
  if (value) {
    return (
      <span
        className={`h-6 w-6 rounded-full grid place-items-center mx-auto ${
          highlight
            ? "bg-[rgba(232,66,13,.18)] border border-[rgba(232,66,13,.35)]"
            : "bg-cream-05 border border-cream-10"
        }`}
        aria-label="Yes"
      >
        <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
          <path
            d="M11.5 3.8 5.6 9.7 2.5 6.6"
            stroke={highlight ? "#FF5C2E" : "#E8E8E6"}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  return (
    <span
      className="h-6 w-6 rounded-full grid place-items-center mx-auto bg-cream-05 border border-cream-10"
      aria-label="No"
    >
      <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
        <path d="M3 3l8 8M11 3l-8 8" stroke="rgba(232,232,230,.35)" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export default function Comparison() {
  return (
    <section
      id="compare"
      className="bg-b0 py-20 md:py-[120px] px-4 md:px-8 relative section-fade-from-b1"
    >
      <SectionHeader
        eyebrow="How We Compare"
        title="Better, faster, and free"
        description="See how we compare to a freelance designer or other AI tools."
        className="mb-12 md:mb-16"
      />

      <ScrollReveal delay={1}>
        <div className="max-w-[1080px] mx-auto rounded-2xl border border-cream-10 bg-b1 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="border-b border-cream-10">
                  <th className="text-left p-4 md:p-5 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-cream-35">
                    {/* spacer */}
                  </th>
                  <th className="p-4 md:p-5 text-center">
                    <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-cream-35">
                      Freelance Designer
                    </span>
                  </th>
                  <th className="p-4 md:p-5 text-center">
                    <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-cream-35">
                      Other AI Tools
                    </span>
                  </th>
                  <th className="p-4 md:p-5 text-center bg-[rgba(232,66,13,.08)]">
                    <span className="block text-[0.72rem] font-bold uppercase tracking-[0.12em] text-accent-hi">
                      Logo.ai
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 1 ? "bg-cream-05/30" : ""}
                  >
                    <td className="p-4 md:p-5 text-[0.85rem] text-cream-80 font-medium border-t border-cream-05">
                      {row.label}
                    </td>
                    <td className="p-4 md:p-5 text-center border-t border-cream-05">
                      {renderCell(row.freelance)}
                    </td>
                    <td className="p-4 md:p-5 text-center border-t border-cream-05">
                      {renderCell(row.otherAI)}
                    </td>
                    <td className="p-4 md:p-5 text-center border-t border-cream-05 bg-[rgba(232,66,13,.06)]">
                      {renderCell(row.logoai, true)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
