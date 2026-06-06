"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import type { DynamicCategory, Subcategory } from "@/lib/getLogoCategories";
import SectionHeader from "./SectionHeader";

const STORAGE_KEY = "logoPreview_activeCategory";

const PILL_BASE =
  "px-3.5 py-1.5 md:px-[18px] md:py-2 border rounded-full text-[0.7rem] md:text-[0.78rem] font-medium tracking-[0.01em] font-sans transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0";

const PILL_ACTIVE =
  "bg-accent border-accent text-white font-semibold shadow-[0_0_18px_rgba(232,66,13,.28)]";

const PILL_INACTIVE =
  "bg-transparent border-cream-18 text-[#B9B9C5] hover:border-cream-35 hover:text-white";

const SUB_PILL_BASE =
  "px-3 py-1.5 md:px-3.5 border rounded-full text-[0.68rem] md:text-[0.74rem] font-medium tracking-[0.01em] font-sans transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0";

const SUB_PILL_ACTIVE =
  "bg-transparent border-accent text-accent font-semibold shadow-[0_0_18px_rgba(232,66,13,.18)]";

const SUB_PILL_INACTIVE =
  "bg-transparent border-cream-10 text-cream-35 hover:border-accent hover:text-accent";

function defaultSubFor(cat: DynamicCategory | undefined): Subcategory | null {
  if (!cat) return null;
  if (cat.count > 0) return null;
  return cat.subcategories.find((s) => s.count > 0) ?? null;
}

export default function LogoPreview({
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
    "bakery" in categoryMap ? "bakery" : (categories[0]?.key ?? "");

  const [active, setActive] = useState(defaultKey);
  const [activeSub, setActiveSub] = useState<Subcategory | null>(
    defaultSubFor(categoryMap[defaultKey]),
  );
  const [hydrated, setHydrated] = useState(false);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const storedCategory = sessionStorage.getItem(STORAGE_KEY);
    const activeKey =
      storedCategory && storedCategory in categoryMap
        ? storedCategory
        : defaultKey;

    setActive(activeKey);
    setActiveSub(defaultSubFor(categoryMap[activeKey]));
    setHydrated(true);
  }, [categoryMap, defaultKey]);

  const handleSelect = useCallback(
    (key: string) => {
      setActive(key);
      setActiveSub(defaultSubFor(categoryMap[key]));
      setCurrentSlide(0);
      sessionStorage.setItem(STORAGE_KEY, key);
    },
    [categoryMap],
  );

  const handleSelectSub = useCallback((sub: Subcategory) => {
    setActiveSub(sub);
    setCurrentSlide(0);
  }, []);

  const handleSelectAllSub = useCallback(() => {
    setActiveSub(null);
    setCurrentSlide(0);
  }, []);

  const activeCategory = categoryMap[active];
  const folder = activeCategory?.folder ?? "";
  const slideCount = activeSub
    ? activeSub.count
    : (activeCategory?.count ?? 0);
  const imagePathBase = activeSub
    ? `/logo-mockups/${folder}/${encodeURIComponent(activeSub.slug)}`
    : `/logo-mockups/${folder}`;
  const altPrefix = activeSub
    ? `${activeSub.label} ${activeCategory?.label ?? ""}`
    : (activeCategory?.label ?? "");

  const slides = useMemo(
    () =>
      Array.from(
        { length: slideCount },
        (_, i) => `${imagePathBase}/${i + 1}.webp`,
      ),
    [imagePathBase, slideCount],
  );

  const activeSubcategories = (activeCategory?.subcategories ?? []).filter(
    (s) => s.count > 0,
  );

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [slides.length]);

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
    <section
      id="preview"
      className="bg-b0 py-20 md:py-[120px] px-4 md:px-8 relative"
    >
      <SectionHeader
        eyebrow="Real-World"
        title="Picture your logo everywhere"
        description="Here's how our logos look on websites, business cards, signage, and anywhere your brand needs to show up."
        className="mb-10 md:mb-[52px]"
      />

      {hydrated && (
        <>
          {/* Search bar */}
          <div className="max-w-[460px] mx-auto mb-7 md:mb-8 px-2">
            <div className="relative">
              <span className="absolute inset-y-0 left-5 flex items-center text-cream-70 pointer-events-none">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${totalCount} industries...`}
                aria-label="Search industries"
                className="w-full pl-12 pr-4 h-12 rounded-full bg-b3 border border-[#2E2E38] text-[12px] font-normal text-cream placeholder:text-white/50 placeholder:text-[12px] placeholder:font-normal outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(232,66,13,.15)] transition-all"
              />
            </div>
          </div>

          {/* Category pills */}
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
            <div className="flex justify-center mt-7 md:mt-9 mb-10 md:mb-14">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="group inline-flex items-center gap-1.5 text-[0.78rem] md:text-[0.82rem] font-medium text-[#B9B9C5] hover:text-accent transition-colors cursor-pointer"
                aria-expanded={expanded}
              >
                {expanded ? "Show Fewer" : `See All ${totalCount} Industries`}
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
                    expanded
                      ? "rotate-180 group-hover:-translate-y-1"
                      : "group-hover:translate-y-1"
                  }`}
                >
                  <polyline points="2 4.5, 6 8.5, 10 4.5" />
                </svg>
              </button>
            </div>
          )}

          {/* Sub-categories */}
          {activeSubcategories.length > 0 && (
            <div className="max-w-[1000px] mx-auto mb-8 md:mb-10">
              <div className="flex flex-nowrap overflow-x-auto md:flex-wrap md:overflow-visible md:justify-center gap-1.5 md:gap-2 -mx-4 md:mx-0 px-4 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <button
                  type="button"
                  onClick={handleSelectAllSub}
                  className={`${SUB_PILL_BASE} ${activeSub === null ? SUB_PILL_ACTIVE : SUB_PILL_INACTIVE}`}
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
        </>
      )}

      {/* Framed preview */}
      <div className="max-w-[1200px] mx-auto rounded-[22px] p-1 md:p-1 relative">
        <div className="relative w-full aspect-[960/520] overflow-hidden rounded-[14px] bg-b3">
          {slides.map((src, i) => (
            <Image
              key={`${active}-${activeSub?.slug ?? "all"}-${i}`}
              src={src}
              alt={`${altPrefix} mockup ${i + 1}`}
              fill
              unoptimized
              className={`object-cover transition-opacity duration-[800ms] ease-in-out ${
                currentSlide === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex gap-2.5 justify-center mt-7 relative z-[1]">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] cursor-pointer ${
              currentSlide === i
                ? "w-8 bg-accent shadow-[0_0_12px_rgba(232,66,13,.35)]"
                : "w-2 bg-cream-35 hover:bg-cream-55"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
