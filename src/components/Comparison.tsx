import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";

type Cell = boolean | string | { value: string; muted?: boolean };
type Row = { label: string; freelance: Cell; otherAI: Cell; logoai: Cell };

const ROWS: Row[] = [
  { label: "Looks like a designer made it", freelance: true, otherAI: false, logoai: true },
  { label: "Time to results", freelance: "1–3 weeks", otherAI: "5–15 minutes", logoai: { value: "Under 60 seconds" } },
  { label: "Price", freelance: "$500–$2,500", otherAI: "$20–$96/year", logoai: { value: "Free at launch*" } },
  { label: "No design skills needed", freelance: false, otherAI: false, logoai: true },
  { label: "Free to download", freelance: false, otherAI: false, logoai: true },
  { label: "Free — nothing to lose", freelance: false, otherAI: false, logoai: true },
  { label: "Vector files (SVG, PDF, EPS)", freelance: true, otherAI: "Costs extra", logoai: true },
  { label: "Transparent background (PNG)", freelance: { value: "Sometimes", muted: true }, otherAI: { value: "Sometimes", muted: true }, logoai: true },
  { label: "Brand Guidelines PDF included", freelance: "Costs extra", otherAI: false, logoai: true },
  { label: "Full commercial license", freelance: { value: "Sometimes", muted: true }, otherAI: { value: "Sometimes", muted: true }, logoai: true },
  { label: "You own the logo forever", freelance: { value: "Sometimes", muted: true }, otherAI: false, logoai: true },
  { label: "Re-download anytime", freelance: false, otherAI: false, logoai: true },
  { label: "No subscription, ever", freelance: false, otherAI: false, logoai: true },
];

function renderCell(value: Cell, highlight = false) {
  // String or { value, muted }
  if (typeof value === "object" && value !== null && "value" in value) {
    const v = value as { value: string; muted?: boolean };
    return (
      <span
        className={
          v.muted
            ? "text-[0.85rem] italic text-cream-35"
            : highlight
              ? "text-[0.9rem] font-semibold text-cream"
              : "text-[0.85rem] text-cream-55"
        }
      >
        {v.value}
      </span>
    );
  }
  if (typeof value === "string") {
    return (
      <span
        className={`text-[0.85rem] ${highlight ? "text-cream font-semibold" : "text-cream-55"}`}
      >
        {value}
      </span>
    );
  }
  if (value) {
    return (
      <span
        className={`inline-block ${highlight ? "text-accent-hi text-[1.05rem]" : "text-cream-55 text-[1.05rem]"}`}
        aria-label="Yes"
      >
        ✓
      </span>
    );
  }
  return (
    <span className="inline-block text-cream-18 text-[1.05rem]" aria-label="No">
      ×
    </span>
  );
}

export default function Comparison() {
  return (
    <section
      id="compare"
      className="bg-b0 py-20 md:py-[120px] px-4 md:px-8 relative"
    >
      <SectionHeader
        eyebrow="How We Compare"
        title="Better, faster, and free"
        description="See how we compare to a freelance designer or other AI tools."
        className="mb-14 md:mb-16"
      />

      <ScrollReveal delay={1}>
        <div className="max-w-[1080px] mx-auto relative">
          {/* BEST badge above Logo.ai column */}
          <div
            aria-hidden
            className="hidden md:block absolute -top-3 right-[2%] z-[2] pointer-events-none"
            style={{ width: "calc((100% - 32px) * 0.22)" }}
          >
            <div className="flex justify-center">
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-accent text-white font-sans text-[0.66rem] font-bold uppercase tracking-[0.14em] shadow-[0_0_18px_rgba(232,66,13,.4)]">
                Best
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 md:p-5"></th>
                  <th className="p-4 md:p-5 text-center align-middle">
                    <span className="block font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cream-35">
                      Freelance Designer
                    </span>
                  </th>
                  <th className="p-4 md:p-5 text-center align-middle">
                    <span className="block font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cream-35">
                      Other AI Tools
                    </span>
                  </th>
                  <th className="p-4 md:p-5 text-center align-middle rounded-t-2xl border-x-2 border-t-2 border-accent bg-[rgba(232,66,13,.06)]">
                    <span className="block font-sans text-[0.74rem] font-bold uppercase tracking-[0.16em] text-accent-hi">
                      Logo.ai
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={row.label}>
                    <td className="p-4 md:p-5 text-[0.88rem] text-cream-80 font-medium border-t border-cream-05">
                      {row.label}
                    </td>
                    <td className="p-4 md:p-5 text-center border-t border-cream-05">
                      {renderCell(row.freelance)}
                    </td>
                    <td className="p-4 md:p-5 text-center border-t border-cream-05">
                      {renderCell(row.otherAI)}
                    </td>
                    <td
                      className={`p-4 md:p-5 text-center border-t border-cream-05 bg-[rgba(232,66,13,.06)] border-x-2 border-accent ${
                        i === ROWS.length - 1 ? "rounded-b-2xl border-b-2" : ""
                      }`}
                    >
                      {renderCell(row.logoai, true)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-[0.82rem] text-cream-35 mt-8">
            * Free for the first 2,000,000 users. After that, $49 one-time.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
