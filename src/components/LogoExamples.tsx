"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import type { DynamicCategory } from "@/lib/getLogoCategories";
import PopularCategoryPills from "./PopularCategoryPills";
import CategoryBrowserModal from "./CategoryBrowserModal";
import SectionHeader from "./SectionHeader";

const DISPLAY_COUNT = 12;
const STORAGE_KEY = "logoExamples_activeCategory";

function getPageIndices(total: number, page: number, take: number): number[] {
  if (total <= 0) return [];
  const start = page * take;
  const end = Math.min(start + take, total);
  const out: number[] = [];
  for (let i = start; i < end; i++) out.push(i + 1);
  return out;
}

export default function LogoExamples({
  categories,
}: {
  categories: DynamicCategory[];
}) {
  const categoryMap = useMemo(() => {
    const map: Record<string, { folder: string; count: number; label: string }> = {};
    for (const c of categories) {
      map[c.key] = { folder: c.folder, count: c.count, label: c.label };
    }
    return map;
  }, [categories]);

  const popularEntries = useMemo(
    () =>
      categories
        .filter((c) => c.isPopular)
        .map(({ key, label }) => ({ key, label })),
    [categories],
  );

  const defaultKey =
    "restaurant" in categoryMap ? "restaurant" : (categories[0]?.key ?? "");

  const defaultCount = categoryMap[defaultKey]?.count ?? 0;
  const serverIndices = useMemo(
    () => getPageIndices(defaultCount, 0, DISPLAY_COUNT),
    [defaultCount],
  );

  const [active, setActive] = useState(defaultKey);
  const [page, setPage] = useState(0);
  const [displayIndices, setDisplayIndices] = useState<number[]>(serverIndices);
  const [hydrated, setHydrated] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [renderToken, setRenderToken] = useState(0);

  useEffect(() => {
    const storedCategory = sessionStorage.getItem(STORAGE_KEY);
    const activeKey =
      storedCategory && storedCategory in categoryMap
        ? storedCategory
        : defaultKey;

    setActive(activeKey);
    setPage(0);
    setDisplayIndices(
      getPageIndices(categoryMap[activeKey]?.count ?? 0, 0, DISPLAY_COUNT),
    );
    setRenderToken((t) => t + 1);
    setHydrated(true);
  }, [categoryMap, defaultKey]);

  const handleSelect = useCallback(
    (key: string) => {
      setActive(key);
      setPage(0);
      setDisplayIndices(
        getPageIndices(categoryMap[key]?.count ?? 0, 0, DISPLAY_COUNT),
      );
      setRenderToken((t) => t + 1);
      sessionStorage.setItem(STORAGE_KEY, key);
    },
    [categoryMap],
  );

  const totalInCategory = categoryMap[active]?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalInCategory / DISPLAY_COUNT));
  const isFirstPage = page <= 0;
  const isLastPage = page >= totalPages - 1;

  const handleNext = useCallback(() => {
    if (isLastPage) return;
    const nextPage = page + 1;
    setPage(nextPage);
    setDisplayIndices(getPageIndices(totalInCategory, nextPage, DISPLAY_COUNT));
    setRenderToken((t) => t + 1);
  }, [isLastPage, page, totalInCategory]);

  const handlePrev = useCallback(() => {
    if (isFirstPage) return;
    const prevPage = page - 1;
    setPage(prevPage);
    setDisplayIndices(getPageIndices(totalInCategory, prevPage, DISPLAY_COUNT));
    setRenderToken((t) => t + 1);
  }, [isFirstPage, page, totalInCategory]);

  const folder = categoryMap[active]?.folder ?? "";
  const activeLabel = categoryMap[active]?.label ?? "";
  const shownCount = Math.min((page + 1) * DISPLAY_COUNT, totalInCategory);
  const navDisabled = totalInCategory <= DISPLAY_COUNT;

  return (
    <section className="bg-b1 pt-20 pb-32 md:pt-[80px] md:pb-[140px] px-4 md:px-8 relative">
      <SectionHeader
        eyebrow="Gallery"
        title="Logos Created with Logo.ai"
        description="Browse AI-generated logos for different businesses. See the quality and variety you can expect."
        className="mb-14 md:mb-[56px]"
      />

      {hydrated && (
        <>
          <PopularCategoryPills
            popular={popularEntries}
            active={active}
            onSelect={handleSelect}
            onBrowseAll={() => setModalOpen(true)}
            className="mb-8 md:mb-10"
          />

          {/* Toolbar: count + Prev/Next */}
          <div className="max-w-[1340px] mx-auto mb-5 md:mb-6 flex items-center justify-between gap-4 px-1">
            <p className="text-[0.78rem] md:text-[0.85rem] text-cream-55">
              Showing {shownCount} of {totalInCategory}
            </p>

            <div className="inline-flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={isFirstPage || navDisabled}
                aria-label="Previous page"
                className="inline-flex items-center gap-1.5 px-3 md:px-3.5 py-1.5 rounded-full border border-cream-10 text-[0.75rem] md:text-[0.8rem] text-cream-55 hover:text-cream hover:border-cream-35 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-cream-55 disabled:hover:border-cream-10"
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8.5 3.5L5 7l3.5 3.5" />
                </svg>
                Prev
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={isLastPage || navDisabled}
                aria-label="Next page"
                className="inline-flex items-center gap-1.5 px-3 md:px-3.5 py-1.5 rounded-full border border-cream-10 text-[0.75rem] md:text-[0.8rem] text-cream-55 hover:text-cream hover:border-cream-35 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-cream-55 disabled:hover:border-cream-10"
              >
                Next
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5.5 3.5L9 7l-3.5 3.5" />
                </svg>
              </button>
            </div>
          </div>

          <div
            key={renderToken}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 [@media(min-width:480px)]:gap-4 md:gap-5 max-w-[1340px] mx-auto pb-2"
          >
            {displayIndices.map((imgIndex, i) => (
              <div
                key={`${active}-${page}-${imgIndex}`}
                style={{
                  animationDelay: `${Math.min(i, 11) * 28}ms`,
                  opacity: 0,
                }}
                className="group relative aspect-square overflow-hidden rounded-2xl transition-all duration-[400ms] ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(0,0,0,.25)] animate-[rise_520ms_cubic-bezier(.16,1,.3,1)_forwards]"
              >
                <Image
                  src={`/logo-examples/${folder}/${imgIndex}.webp`}
                  alt={`${activeLabel} logo ${imgIndex}`}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-[600ms] group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          <CategoryBrowserModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            categories={categories}
            active={active}
            onSelect={handleSelect}
          />
        </>
      )}
    </section>
  );
}
