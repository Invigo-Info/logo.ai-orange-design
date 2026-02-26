"use client";

import { useState, useRef, useEffect } from "react";

interface CategoryTabsAdvancedProps {
  tabs: Record<string, string>;
  active: string;
  onSelect: (key: string) => void;
  className?: string;
  visibleCount?: number;
}

const TAB_CLASS_BASE =
  "px-3 py-1.5 md:px-[22px] md:py-2.5 border rounded-full text-[0.66rem] md:text-[0.78rem] font-medium tracking-[0.01em] font-sans transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0";
const TAB_ACTIVE = "bg-accent border-accent text-white font-semibold";
const TAB_INACTIVE =
  "bg-transparent border-cream-10 text-cream-55 hover:border-cream-18 hover:text-cream";

export default function CategoryTabsAdvanced({
  tabs,
  active,
  onSelect,
  className = "",
  visibleCount = 16,
}: CategoryTabsAdvancedProps) {
  const entries = Object.entries(tabs);
  const visibleEntries = entries.slice(0, visibleCount);
  const overflowEntries = entries.slice(visibleCount);
  const hasOverflow = overflowEntries.length > 0;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  // Check if active tab is in overflow
  const activeInOverflow = overflowEntries.some(([key]) => key === active);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const inDesktop = dropdownRef.current?.contains(target);
      const inMobile = mobileDropdownRef.current?.contains(target);
      if (!inDesktop && !inMobile) {
        setDropdownOpen(false);
        setSearch("");
      }
    };
    if (dropdownOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setSearch("");
      }
    };
    if (dropdownOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [dropdownOpen]);

  // Filter overflow categories for dropdown
  const filteredOverflow = overflowEntries.filter(([, label]) =>
    label.toLowerCase().includes(search.toLowerCase())
  );

  const handleDropdownSelect = (key: string) => {
    onSelect(key);
    setDropdownOpen(false);
    setSearch("");
  };

  return (
    <div className={`relative ${className}`}>
      {/* ── Desktop: wrapped tabs ── */}
      <div className="hidden md:flex flex-col items-center gap-3">
        <div className="flex flex-wrap justify-center gap-2 max-w-[960px] mx-auto">
          {visibleEntries.map(([key, label]) => (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`${TAB_CLASS_BASE} ${active === key ? TAB_ACTIVE : TAB_INACTIVE}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* More button + dropdown */}
        {hasOverflow && (
          <div ref={dropdownRef} className="relative inline-flex flex-col items-center">
            <button
              onClick={() => {
                setDropdownOpen((p) => !p);
                setSearch("");
              }}
              className={`px-6 py-2.5 rounded-full text-[0.78rem] font-semibold transition-all duration-300 cursor-pointer inline-flex items-center gap-1.5 ${
                dropdownOpen || activeInOverflow
                  ? "bg-accent border border-accent text-white"
                  : "bg-transparent border border-accent text-accent hover:bg-accent hover:text-white"
              }`}
            >
              More
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
              >
                <path d="M3 4.5L6 7.5L9 4.5" />
              </svg>
            </button>

            {/* Dropdown panel */}
            {dropdownOpen && (
              <div className="absolute top-full mt-3 z-50 w-[520px] max-h-[400px] rounded-2xl border border-cream-10 bg-b1 shadow-[0_20px_60px_rgba(0,0,0,.5)] overflow-hidden flex flex-col">
                {/* Search */}
                <div className="flex items-center gap-3 px-5 py-3.5 border-b border-cream-10">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-cream-35 shrink-0"
                  >
                    <circle cx="7" cy="7" r="5" />
                    <path d="M11 11l3 3" strokeLinecap="round" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                    className="flex-1 bg-transparent border-none outline-none text-cream text-[0.88rem] placeholder:text-cream-18 font-sans"
                  />
                  <span className="text-[0.72rem] text-cream-35 font-medium shrink-0">
                    {filteredOverflow.length} found
                  </span>
                </div>

                {/* Category grid */}
                <div className="overflow-y-auto flex-1 p-3">
                  <div className="grid grid-cols-3 gap-1">
                    {filteredOverflow.map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => handleDropdownSelect(key)}
                        className={`text-left px-4 py-3 rounded-xl text-[0.85rem] font-sans transition-all duration-200 cursor-pointer flex items-center justify-between ${
                          active === key
                            ? "bg-[rgba(232,66,13,.1)] border border-accent text-accent font-semibold"
                            : "bg-transparent border border-transparent text-cream-55 hover:bg-cream-05 hover:text-cream"
                        }`}
                      >
                        {label}
                        {active === key && (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path
                              d="M3 7.5l2.5 2.5L11 4.5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                  {filteredOverflow.length === 0 && (
                    <p className="text-center text-cream-35 text-[0.85rem] py-8">
                      No categories found
                    </p>
                  )}
                </div>

                {/* Footer hints */}
                <div className="flex items-center gap-4 px-5 py-2.5 border-t border-cream-10 text-cream-35">
                  <span className="flex items-center gap-1.5 text-[0.65rem]">
                    <kbd className="px-1.5 py-0.5 rounded border border-cream-10 bg-cream-05 text-[0.6rem] font-mono">
                      &uarr;&darr;
                    </kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1.5 text-[0.65rem]">
                    <kbd className="px-1.5 py-0.5 rounded border border-cream-10 bg-cream-05 text-[0.6rem] font-mono">
                      Enter
                    </kbd>
                    Select
                  </span>
                  <span className="flex items-center gap-1.5 text-[0.65rem]">
                    <kbd className="px-1.5 py-0.5 rounded border border-cream-10 bg-cream-05 text-[0.6rem] font-mono">
                      Esc
                    </kbd>
                    Close
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Mobile: wrapped tabs (same as desktop) ── */}
      <div className="md:hidden flex flex-col items-center gap-3">
        <div className="flex flex-wrap justify-center gap-1.5 px-2">
          {visibleEntries.map(([key, label]) => (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`${TAB_CLASS_BASE} ${active === key ? TAB_ACTIVE : TAB_INACTIVE}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Mobile More button + dropdown */}
        {hasOverflow && (
          <div ref={mobileDropdownRef} className="relative inline-flex flex-col items-center">
            <button
              onClick={() => {
                setDropdownOpen((p) => !p);
                setSearch("");
              }}
              className={`px-5 py-2 rounded-full text-[0.72rem] font-semibold transition-all duration-300 cursor-pointer inline-flex items-center gap-1.5 ${
                dropdownOpen || activeInOverflow
                  ? "bg-accent border border-accent text-white"
                  : "bg-transparent border border-accent text-accent hover:bg-accent hover:text-white"
              }`}
            >
              More
              <svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
              >
                <path d="M3 4.5L6 7.5L9 4.5" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute top-full mt-3 z-50 w-[calc(100vw-40px)] max-w-[360px] max-h-[350px] rounded-2xl border border-cream-10 bg-b1 shadow-[0_20px_60px_rgba(0,0,0,.5)] overflow-hidden flex flex-col left-1/2 -translate-x-1/2">
                {/* Search */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-cream-10">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-cream-35 shrink-0"
                  >
                    <circle cx="7" cy="7" r="5" />
                    <path d="M11 11l3 3" strokeLinecap="round" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                    className="flex-1 bg-transparent border-none outline-none text-cream text-[0.82rem] placeholder:text-cream-18 font-sans"
                  />
                  <span className="text-[0.65rem] text-cream-35 font-medium shrink-0">
                    {filteredOverflow.length} found
                  </span>
                </div>

                {/* Category list (single column on mobile) */}
                <div className="overflow-y-auto flex-1 p-2">
                  <div className="flex flex-col gap-0.5">
                    {filteredOverflow.map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => handleDropdownSelect(key)}
                        className={`text-left px-4 py-3 rounded-xl text-[0.82rem] font-sans transition-all duration-200 cursor-pointer flex items-center justify-between ${
                          active === key
                            ? "bg-[rgba(232,66,13,.1)] border border-accent text-accent font-semibold"
                            : "bg-transparent border border-transparent text-cream-55 hover:bg-cream-05 hover:text-cream"
                        }`}
                      >
                        {label}
                        {active === key && (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path
                              d="M3 7.5l2.5 2.5L11 4.5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                  {filteredOverflow.length === 0 && (
                    <p className="text-center text-cream-35 text-[0.82rem] py-6">
                      No categories found
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
