"use client";

import { useState, useEffect, useMemo, useCallback } from "react";

interface CategoryTabsAdvancedProps {
  tabs: Record<string, string>;
  active: string;
  onSelect: (key: string) => void;
  className?: string;
}

const DESKTOP_PER_PAGE = 16;
const MOBILE_PER_PAGE = 8;
const MOBILE_BREAKPOINT = 768;

const TAB_CLASS_BASE =
  "px-3 py-1.5 md:px-[22px] md:py-2.5 border rounded-full text-[0.66rem] md:text-[0.78rem] font-medium tracking-[0.01em] font-sans transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0";
const TAB_ACTIVE = "bg-accent border-accent text-white font-semibold";
const TAB_INACTIVE =
  "bg-transparent border-cream-10 text-cream-55 hover:border-cream-18 hover:text-cream";

const ARROW_BASE =
  "shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full border bg-cream-05 flex items-center justify-center transition-all duration-300 absolute top-1/2 -translate-y-1/2 z-10";
const ARROW_DISABLED =
  "border-cream-18 text-cream-18 cursor-not-allowed opacity-50";
const ARROW_ENABLED =
  "border-cream-35 text-cream-55 hover:bg-cream-10 hover:border-accent hover:text-accent hover:shadow-[0_0_14px_rgba(232,66,13,.25)] cursor-pointer active:scale-90";

function useIsMobile(breakpoint = MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}

export default function CategoryTabsAdvanced({
  tabs,
  active,
  onSelect,
  className = "",
}: CategoryTabsAdvancedProps) {
  const entries = useMemo(() => Object.entries(tabs), [tabs]);
  const isMobile = useIsMobile();
  const perPage = isMobile ? MOBILE_PER_PAGE : DESKTOP_PER_PAGE;
  const totalPages = Math.max(1, Math.ceil(entries.length / perPage));

  const [page, setPage] = useState(0);

  // When perPage changes (resize) or active tab changes, clamp page and
  // ensure the active category's page is shown.
  useEffect(() => {
    const activeIdx = entries.findIndex(([key]) => key === active);
    if (activeIdx >= 0) {
      const activePage = Math.floor(activeIdx / perPage);
      setPage((prev) => {
        const clamped = Math.min(prev, totalPages - 1);
        // Only jump to active page if it's not already visible
        if (clamped !== activePage && prev !== activePage) {
          return activePage;
        }
        return clamped;
      });
    } else {
      setPage((prev) => Math.min(prev, totalPages - 1));
    }
  }, [perPage, totalPages, active, entries]);

  const goTo = useCallback(
    (dir: -1 | 1) => {
      setPage((p) => {
        const next = p + dir;
        return Math.max(0, Math.min(next, totalPages - 1));
      });
    },
    [totalPages],
  );

  const isFirst = page === 0;
  const isLast = page >= totalPages - 1;

  const start = page * perPage;
  const visibleEntries = entries.slice(start, start + perPage);

  const showNav = totalPages > 1;

  return (
    <div className={`relative ${className}`}>
      <div className="relative max-w-[1060px] mx-auto">
        {/* Left arrow — pinned to left edge, vertically centered */}
        {showNav && (
          <button
            onClick={() => goTo(-1)}
            disabled={isFirst}
            aria-label="Previous categories"
            className={`${ARROW_BASE} left-1 md:left-0 ${isFirst ? ARROW_DISABLED : ARROW_ENABLED}`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8.5 3.5L5 7l3.5 3.5" />
            </svg>
          </button>
        )}

        {/* Category pills — centered with side padding for arrows */}
        <div
          className={`flex flex-wrap justify-center gap-1.5 md:gap-2 ${
            showNav ? "px-11 md:px-12" : "px-2 md:px-0"
          }`}
        >
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

        {/* Right arrow — pinned to right edge, vertically centered */}
        {showNav && (
          <button
            onClick={() => goTo(1)}
            disabled={isLast}
            aria-label="Next categories"
            className={`${ARROW_BASE} right-1 md:right-0 ${isLast ? ARROW_DISABLED : ARROW_ENABLED}`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5.5 3.5L9 7l-3.5 3.5" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
