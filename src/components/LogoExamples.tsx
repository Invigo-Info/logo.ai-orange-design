"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import type { DynamicCategory, Subcategory } from "@/lib/getLogoCategories";
import SectionHeader from "./SectionHeader";

const DISPLAY_COUNT = 12;
const STORAGE_KEY = "logoExamples_activeCategory";

function indicesUpTo(count: number, total: number): number[] {
  const clamped = Math.min(Math.max(count, 0), Math.max(total, 0));
  const out: number[] = [];
  for (let i = 0; i < clamped; i++) out.push(i + 1);
  return out;
}

function defaultSubFor(cat: DynamicCategory | undefined): Subcategory | null {
  if (!cat) return null;
  if (cat.count > 0) return null;
  return cat.subcategories.find((s) => s.count > 0) ?? null;
}

const PILL_BASE =
  "px-3.5 py-1.5 md:px-[18px] md:py-2 border rounded-full text-[0.7rem] md:text-[0.78rem] font-medium tracking-[0.01em] font-sans transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0";

const PILL_ACTIVE =
  "bg-accent border-accent text-white font-semibold shadow-[0_0_18px_rgba(232,66,13,.28)]";

const PILL_INACTIVE =
  "bg-transparent border-cream-10 text-cream-55 hover:border-cream-18 hover:text-cream";

const SUB_PILL_BASE =
  "px-3 py-1.5 md:px-3.5 border rounded-full text-[0.68rem] md:text-[0.74rem] font-medium tracking-[0.01em] font-sans transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0";

const SUB_PILL_ACTIVE =
  "bg-accent border-accent text-white font-semibold shadow-[0_0_18px_rgba(232,66,13,.28)]";

const SUB_PILL_INACTIVE =
  "bg-transparent border-cream-10 text-cream-55 hover:border-cream-18 hover:text-cream";

export default function LogoExamples({
  categories,
}: {
  categories: DynamicCategory[];
}) {
  const categoryMap = useMemo(() => {
    const map: Record<string, DynamicCategory> = {};
    for (const c of categories) {
      map[c.key] = c;
    }
    return map;
  }, [categories]);

  const defaultKey =
    "restaurant" in categoryMap ? "restaurant" : (categories[0]?.key ?? "");

  const [active, setActive] = useState(defaultKey);
  const [activeSub, setActiveSub] = useState<Subcategory | null>(
    defaultSubFor(categoryMap[defaultKey]),
  );
  const [visibleCount, setVisibleCount] = useState(DISPLAY_COUNT);
  const [hydrated, setHydrated] = useState(false);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const storedCategory = sessionStorage.getItem(STORAGE_KEY);
    const activeKey =
      storedCategory && storedCategory in categoryMap
        ? storedCategory
        : defaultKey;

    setActive(activeKey);
    setActiveSub(defaultSubFor(categoryMap[activeKey]));
    setVisibleCount(DISPLAY_COUNT);
    setHydrated(true);
  }, [categoryMap, defaultKey]);

  const handleSelect = useCallback(
    (key: string) => {
      setActive(key);
      setActiveSub(defaultSubFor(categoryMap[key]));
      setVisibleCount(DISPLAY_COUNT);
      sessionStorage.setItem(STORAGE_KEY, key);
    },
    [categoryMap],
  );

  const handleSelectSub = useCallback((sub: Subcategory) => {
    setActiveSub(sub);
    setVisibleCount(DISPLAY_COUNT);
  }, []);

  const handleSelectAllSub = useCallback(() => {
    setActiveSub(null);
    setVisibleCount(DISPLAY_COUNT);
  }, []);

  const activeCategory = categoryMap[active];
  const totalInCategory = activeSub
    ? activeSub.count
    : (activeCategory?.count ?? 0);

  const folder = activeCategory?.folder ?? "";
  const activeLabel = activeCategory?.label ?? "";
  const activeSubcategories = (activeCategory?.subcategories ?? []).filter(
    (s) => s.count > 0,
  );
  const imagePathBase = activeSub
    ? `/logo-examples/${folder}/${activeSub.slug}`
    : `/logo-examples/${folder}`;
  const altPrefix = activeSub
    ? `${activeSub.label} ${activeLabel}`
    : activeLabel;
  const displayIndices = indicesUpTo(visibleCount, totalInCategory);
  const hasMore = visibleCount < totalInCategory;
  const isExpanded = visibleCount >= totalInCategory && totalInCategory > DISPLAY_COUNT;

  const handleShowMore = useCallback(() => {
    setVisibleCount((v) => v + DISPLAY_COUNT);
  }, []);

  const handleShowLess = useCallback(() => {
    setVisibleCount(DISPLAY_COUNT);
  }, []);

  const trimmedQuery = query.trim().toLowerCase();
  const isFiltering = trimmedQuery.length > 0;

  const visibleCategories = useMemo(() => {
    if (isFiltering) {
      return categories.filter((c) =>
        c.label.toLowerCase().includes(trimmedQuery),
      );
    }
    if (expanded) return categories;
    return categories.filter((c) => c.isPopular);
  }, [categories, isFiltering, trimmedQuery, expanded]);

  const totalCount = categories.length;

  return (
    <section className="bg-b1 pt-20 pb-32 md:pt-[80px] md:pb-[140px] px-4 md:px-8 relative">
      <SectionHeader
        eyebrow="Gallery"
        title="Logos Created with Logo.ai"
        description="Browse AI-generated logos for different businesses. See the quality and variety you can expect."
        className="mb-10 md:mb-12"
      />

      {hydrated && (
        <>
          {/* Search bar */}
          <div className="max-w-[640px] mx-auto mb-7 md:mb-8 px-2">
            <div className="relative">
              <span className="absolute inset-y-0 left-5 flex items-center text-cream-35 pointer-events-none">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="6" cy="6" r="4.2" />
                  <path d="M9.5 9.5l3 3" />
                </svg>
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${totalCount} industries...`}
                aria-label="Search industries"
                className="w-full pl-12 pr-4 h-12 rounded-full bg-b0 border border-cream-10 text-[0.85rem] md:text-[0.9rem] text-cream placeholder:text-cream-35 outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(232,66,13,.15)] transition-all"
              />
            </div>
          </div>

          {/* All categories */}
          <div className="max-w-[1100px] mx-auto">
            {visibleCategories.length === 0 ? (
              <p className="text-center text-cream-55 text-sm py-6">
                No categories match &ldquo;{query}&rdquo;.
              </p>
            ) : (
              <div
                className={
                  expanded || isFiltering
                    ? "flex flex-wrap justify-center gap-1.5 md:gap-2 px-2 md:px-0"
                    : "flex flex-nowrap overflow-x-auto md:flex-wrap md:overflow-visible md:justify-center gap-1.5 md:gap-2 -mx-4 md:mx-0 px-4 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                }
              >
                {visibleCategories.map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleSelect(key)}
                    className={`${PILL_BASE} ${active === key ? PILL_ACTIVE : PILL_INACTIVE}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Show more / Show fewer */}
          {!isFiltering && (
            <div className="flex justify-center mt-5 md:mt-6">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="text-[0.78rem] md:text-[0.82rem] font-semibold text-accent hover:text-accent-hi transition-colors cursor-pointer"
                aria-expanded={expanded}
              >
                {expanded ? "Show fewer" : `See all ${totalCount} industries →`}
              </button>
            </div>
          )}

          {/* Sub-categories */}
          {activeSubcategories.length > 0 && (
            <div className="max-w-[1000px] mx-auto mt-9 md:mt-11">
              <div className="flex flex-nowrap overflow-x-auto md:flex-wrap md:overflow-visible md:justify-center gap-1.5 md:gap-2 -mx-4 md:mx-0 px-4 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <button
                  type="button"
                  onClick={handleSelectAllSub}
                  className={`${SUB_PILL_BASE} ${activeSub === null ? PILL_ACTIVE : SUB_PILL_INACTIVE}`}
                >
                  All
                </button>
                {activeSubcategories.map((sub) => (
                  <button
                    key={sub.slug}
                    type="button"
                    onClick={() => handleSelectSub(sub)}
                    className={`${SUB_PILL_BASE} ${activeSub?.slug === sub.slug ? SUB_PILL_ACTIVE : SUB_PILL_INACTIVE}`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 [@media(min-width:480px)]:gap-4 md:gap-5 max-w-[1340px] mx-auto mt-8 md:mt-10 pb-2">
            {displayIndices.map((imgIndex, i) => (
              <div
                key={`${active}-${activeSub?.slug ?? "all"}-${imgIndex}`}
                style={{
                  animationDelay: `${(i % DISPLAY_COUNT) * 28}ms`,
                  opacity: 0,
                }}
                className="group relative aspect-square overflow-hidden rounded-2xl transition-all duration-[400ms] ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(0,0,0,.25)] animate-[rise_520ms_cubic-bezier(.16,1,.3,1)_forwards]"
              >
                <Image
                  src={`${imagePathBase}/${imgIndex}.webp`}
                  alt={`${altPrefix} logo ${imgIndex}`}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-[600ms] group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          {(hasMore || isExpanded) && (
            <div className="flex flex-col items-center gap-3 md:gap-4 mt-8 md:mt-10">
              <p className="text-[0.78rem] md:text-[0.85rem] text-cream-55">
                Showing {displayIndices.length} of {totalInCategory}
              </p>
              <button
                type="button"
                onClick={hasMore ? handleShowMore : handleShowLess}
                className="group inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full border border-cream-10 text-[0.8rem] md:text-[0.85rem] font-semibold text-cream-55 hover:text-accent hover:border-accent transition-colors cursor-pointer"
              >
                {hasMore ? `Show ${DISPLAY_COUNT} more logos` : "Show fewer"}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className={`relative top-px transition-transform duration-300 ease-out ${
                    hasMore
                      ? "group-hover:translate-y-1"
                      : "rotate-180 group-hover:-translate-y-1"
                  }`}
                >
                  <polyline points="2 4.5, 6 8.5, 10 4.5" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
