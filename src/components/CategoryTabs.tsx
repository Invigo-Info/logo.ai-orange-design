"use client";

interface CategoryTabsProps {
  tabs: Record<string, string>;
  active: string;
  onSelect: (key: string) => void;
  className?: string;
}

export default function CategoryTabs({
  tabs,
  active,
  onSelect,
  className = "",
}: CategoryTabsProps) {
  return (
    <div
      className={`flex flex-wrap justify-center gap-1 md:gap-2 max-w-[960px] mx-auto ${className}`}
    >
      {Object.entries(tabs).map(([key, label]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`px-3 py-1.5 md:px-[22px] md:py-2.5 border rounded-full text-[0.66rem] md:text-[0.78rem] font-medium tracking-[0.01em] font-sans transition-all duration-300 cursor-pointer ${
            active === key
              ? "bg-accent border-accent text-white font-semibold"
              : "bg-transparent border-cream-10 text-cream-55 hover:border-cream-18 hover:text-cream"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
