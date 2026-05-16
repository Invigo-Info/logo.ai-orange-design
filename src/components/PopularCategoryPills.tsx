"use client";

interface PopularCategoryPillsProps {
  popular: { key: string; label: string }[];
  active: string;
  onSelect: (key: string) => void;
  onBrowseAll: () => void;
  className?: string;
}

const PILL_BASE =
  "px-3.5 py-1.5 md:px-[18px] md:py-2 border rounded-full text-[0.7rem] md:text-[0.78rem] font-medium tracking-[0.01em] font-sans transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0";

const PILL_ACTIVE = "bg-accent border-accent text-white font-semibold shadow-[0_0_18px_rgba(232,66,13,.28)]";

const PILL_INACTIVE =
  "bg-transparent border-cream-10 text-cream-55 hover:border-cream-18 hover:text-cream";

const BROWSE_ALL =
  "px-3.5 py-1.5 md:px-[18px] md:py-2 border rounded-full text-[0.7rem] md:text-[0.78rem] font-semibold tracking-[0.01em] font-sans transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 bg-[rgba(125,189,255,0.08)] border-[rgba(125,189,255,0.35)] text-[#9ec8ff] hover:bg-[rgba(125,189,255,0.14)] hover:border-[rgba(125,189,255,0.55)] hover:text-[#cfe2ff]";

export default function PopularCategoryPills({
  popular,
  active,
  onSelect,
  onBrowseAll,
  className = "",
}: PopularCategoryPillsProps) {
  return (
    <div className={`max-w-[1100px] mx-auto ${className}`}>
      <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 px-2 md:px-0">
        {popular.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => onSelect(key)}
            className={`${PILL_BASE} ${active === key ? PILL_ACTIVE : PILL_INACTIVE}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex justify-center mt-6 md:mt-8">
        <button
          type="button"
          onClick={onBrowseAll}
          aria-label="Search more categories"
          className={BROWSE_ALL}
        >
          Search More Categories
        </button>
      </div>
    </div>
  );
}
