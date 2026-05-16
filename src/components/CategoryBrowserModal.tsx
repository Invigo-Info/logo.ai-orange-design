"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { DynamicCategory } from "@/lib/getLogoCategories";

type SortMode = "popular" | "az";

interface CategoryBrowserModalProps {
  open: boolean;
  onClose: () => void;
  categories: DynamicCategory[];
  active: string;
  onSelect: (key: string) => void;
  initialSort?: SortMode;
  onSortChange?: (sort: SortMode) => void;
}

const SORT_KEY = "logoExamples_modalSort";

function isFocusable(el: Element): el is HTMLElement {
  if (!(el instanceof HTMLElement)) return false;
  if (el.hasAttribute("disabled")) return false;
  if (el.getAttribute("aria-hidden") === "true") return false;
  return true;
}

export default function CategoryBrowserModal({
  open,
  onClose,
  categories,
  active,
  onSelect,
  initialSort = "popular",
  onSortChange,
}: CategoryBrowserModalProps) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>(initialSort);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Hydrate sort preference from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SORT_KEY);
      if (stored === "popular" || stored === "az") {
        setSort(stored);
      }
    } catch {
      // ignore storage failures
    }
  }, []);

  // Persist sort preference
  useEffect(() => {
    try {
      localStorage.setItem(SORT_KEY, sort);
    } catch {
      // ignore
    }
    onSortChange?.(sort);
  }, [sort, onSortChange]);

  // Body scroll lock + autofocus search + reset query on open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setQuery("");
    const t = window.setTimeout(() => {
      searchRef.current?.focus();
      searchRef.current?.select();
    }, 30);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [open]);

  // Esc to close + focus trap on Tab
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter(isFocusable);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeEl = document.activeElement as HTMLElement | null;
      if (e.shiftKey && activeEl === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose]
  );

  const totalCount = categories.length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.label.toLowerCase().includes(q));
  }, [categories, query]);

  const { popular, others, flat } = useMemo(() => {
    const list = [...filtered];
    if (sort === "az") {
      list.sort((a, b) => a.label.localeCompare(b.label));
      return { popular: [], others: [], flat: list };
    }
    const popularItems = list
      .filter((c) => c.isPopular)
      .sort((a, b) => a.label.localeCompare(b.label));
    const otherItems = list
      .filter((c) => !c.isPopular)
      .sort((a, b) => a.label.localeCompare(b.label));
    return { popular: popularItems, others: otherItems, flat: [] };
  }, [filtered, sort]);

  const filteredCount = filtered.length;
  const isFiltering = query.trim().length > 0;
  const resultText = isFiltering
    ? `Found ${filteredCount} of ${totalCount}`
    : `Showing all ${totalCount} categories`;

  const handlePick = (key: string) => {
    onSelect(key);
    onClose();
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onMouseDown={handleOverlayClick}
      className="fixed inset-0 z-[80] flex items-start md:items-center justify-center bg-black/75 backdrop-blur-md p-4 md:p-8 overflow-y-auto"
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="category-browser-title"
        className="relative w-full max-w-[760px] max-h-[88vh] flex flex-col bg-b1 border border-cream-10 rounded-2xl md:rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,.55)] overflow-hidden"
      >
        {/* Header */}
        <div className="px-5 md:px-7 pt-5 md:pt-6 pb-4 border-b border-cream-10">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h3
              id="category-browser-title"
              className="font-display text-[1.1rem] md:text-[1.3rem] font-bold text-cream tracking-[-0.01em]"
            >
              All categories
            </h3>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="shrink-0 w-8 h-8 rounded-full text-cream-55 hover:text-cream hover:bg-cream-05 transition-colors flex items-center justify-center"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M3 3l8 8M11 3l-8 8" />
              </svg>
            </button>
          </div>

          <div className="relative mb-4">
            <span className="absolute inset-y-0 left-4 flex items-center text-cream-35 pointer-events-none">
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
                <circle cx="6" cy="6" r="4.2" />
                <path d="M9.5 9.5l3 3" />
              </svg>
            </span>
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 200+ categories..."
              className="w-full pl-10 pr-4 h-11 rounded-full bg-b0 border border-cream-10 text-[0.85rem] text-cream placeholder:text-cream-35 outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(232,66,13,.15)] transition-all"
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-1 p-0.5 rounded-full bg-b0 border border-cream-10">
              <button
                type="button"
                onClick={() => setSort("popular")}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.74rem] font-semibold whitespace-nowrap transition-all ${
                  sort === "popular"
                    ? "bg-accent text-white shadow-[0_0_14px_rgba(232,66,13,.35)]"
                    : "text-cream-55 hover:text-cream"
                }`}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6 1.2c.7 1.6 2.4 2.2 2.4 4.1A2.4 2.4 0 0 1 6 7.7 2.4 2.4 0 0 1 3.6 5.3c0-1.9 1.7-2.5 2.4-4.1Zm0 5.6c.6 0 1.2-.5 1.4-1.2.4 1 1.6 1.5 1.6 3a3 3 0 1 1-6 0c0-1.5 1.2-2 1.6-3 .2.7.8 1.2 1.4 1.2Z" />
                </svg>
                Popular
              </button>
              <button
                type="button"
                onClick={() => setSort("az")}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.74rem] font-semibold whitespace-nowrap transition-all ${
                  sort === "az"
                    ? "bg-accent text-white shadow-[0_0_14px_rgba(232,66,13,.35)]"
                    : "text-cream-55 hover:text-cream"
                }`}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M2 3h7M2 6h5M2 9h3" />
                </svg>
                A-Z
              </button>
            </div>

            <p className="text-[0.74rem] md:text-[0.78rem] text-cream-55">
              {resultText}
            </p>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
          {filteredCount === 0 ? (
            <div className="text-center py-16 text-cream-55 text-sm">
              No categories match &ldquo;{query}&rdquo;.
            </div>
          ) : sort === "popular" ? (
            <>
              {popular.length > 0 && (
                <CategorySection
                  label="MOST POPULAR"
                  items={popular}
                  active={active}
                  showBadge
                  onPick={handlePick}
                  columnsClass="grid-cols-1 sm:grid-cols-2"
                />
              )}
              {others.length > 0 && (
                <CategorySection
                  label="ALL OTHER CATEGORIES"
                  items={others}
                  active={active}
                  showBadge={false}
                  onPick={handlePick}
                  className={popular.length > 0 ? "mt-5" : ""}
                />
              )}
            </>
          ) : (
            <CategorySection
              label=""
              items={flat}
              active={active}
              showBadge={false}
              onPick={handlePick}
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface CategorySectionProps {
  label: string;
  items: DynamicCategory[];
  active: string;
  showBadge: boolean;
  onPick: (key: string) => void;
  className?: string;
  columnsClass?: string;
}

function CategorySection({
  label,
  items,
  active,
  showBadge,
  onPick,
  className = "",
  columnsClass = "grid-cols-2",
}: CategorySectionProps) {
  return (
    <div className={className}>
      {label && (
        <h4 className="px-3 mb-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-cream-35">
          {label}
        </h4>
      )}
      <ul className={`grid ${columnsClass} gap-x-2`}>
        {items.map((c) => {
          const isActive = c.key === active;
          return (
            <li key={c.key}>
              <button
                type="button"
                onClick={() => onPick(c.key)}
                className={`group w-full text-left flex items-center justify-between gap-2 px-2 md:px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-cream hover:bg-cream-05"
                }`}
              >
                <span className="min-w-0 text-[0.75rem] md:text-[0.86rem] font-medium leading-tight break-words">
                  {c.label}
                </span>
                {showBadge && (
                  <span className="shrink-0 inline-flex items-center px-1.5 py-0.5 rounded text-[0.55rem] font-bold tracking-[0.1em] uppercase bg-accent/15 text-accent border border-accent/30">
                    Popular
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
