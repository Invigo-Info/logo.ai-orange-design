"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import type { DynamicCategory } from "@/lib/getLogoCategories";
import CategoryTabsAdvanced from "./CategoryTabsAdvanced";
import SectionHeader from "./SectionHeader";

const DISPLAY_COUNT = 12;
const STORAGE_KEY = "logoExamples_activeCategory";
const PAGE_KEY = "logoExamples_page";

interface DisplayItem {
  imgIndex: number;
}

function buildDisplayItems(count: number, page: number): DisplayItem[] {
  if (count <= DISPLAY_COUNT) {
    return Array.from({ length: count }, (_, i) => ({ imgIndex: i + 1 }));
  }
  const totalPages = Math.ceil(count / DISPLAY_COUNT);
  const safePage = page % totalPages;
  const start = safePage * DISPLAY_COUNT;
  const items: DisplayItem[] = [];
  for (let i = 0; i < DISPLAY_COUNT; i++) {
    const imgIndex = ((start + i) % count) + 1;
    items.push({ imgIndex });
  }
  return items;
}

export default function LogoExamples({
  categories,
}: {
  categories: DynamicCategory[];
}) {
  const categoryMap = useMemo(() => {
    const map: Record<string, { folder: string; count: number }> = {};
    for (const c of categories) {
      map[c.key] = { folder: c.folder, count: c.count };
    }
    return map;
  }, [categories]);

  const tabMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const c of categories) {
      map[c.key] = c.label;
    }
    return map;
  }, [categories]);

  const defaultKey = "restaurant" in categoryMap ? "restaurant" : (categories[0]?.key ?? "");

  const defaultCount = categoryMap[defaultKey]?.count ?? 0;
  const serverItems = useMemo(
    () =>
      Array.from({ length: Math.min(defaultCount, DISPLAY_COUNT) }, (_, i) => ({
        imgIndex: i + 1,
      })),
    [defaultCount],
  );

  const [active, setActive] = useState(defaultKey);
  const [displayItems, setDisplayItems] = useState<DisplayItem[]>(serverItems);
  const [pageMap, setPageMap] = useState<Record<string, number>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedPages: Record<string, number> = JSON.parse(
      sessionStorage.getItem(PAGE_KEY) || "{}"
    );
    const storedCategory = sessionStorage.getItem(STORAGE_KEY);
    const activeKey =
      storedCategory && storedCategory in categoryMap ? storedCategory : defaultKey;

    const nextPage = (storedPages[activeKey] ?? -1) + 1;
    const displayPages = { ...storedPages, [activeKey]: nextPage };

    sessionStorage.setItem(PAGE_KEY, JSON.stringify(displayPages));

    setPageMap(displayPages);
    setActive(activeKey);
    setDisplayItems(
      buildDisplayItems(categoryMap[activeKey]?.count ?? 0, nextPage)
    );
    setHydrated(true);
  }, [categoryMap, defaultKey]);

  const handleSelect = (key: string) => {
    setActive(key);
    sessionStorage.setItem(STORAGE_KEY, key);
    const currentPage = pageMap[key] ?? 0;
    setDisplayItems(buildDisplayItems(categoryMap[key]?.count ?? 0, currentPage));

    // Save this category's current page so it persists correctly on refresh
    const storedPages = JSON.parse(sessionStorage.getItem(PAGE_KEY) || "{}");
    storedPages[key] = currentPage;
    sessionStorage.setItem(PAGE_KEY, JSON.stringify(storedPages));
  };

  const folder = categoryMap[active]?.folder ?? "";

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
          <CategoryTabsAdvanced
            tabs={tabMap}
            active={active}
            onSelect={handleSelect}
            className="mb-10 md:mb-[52px]"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 max-w-[1340px] mx-auto pb-2">
            {displayItems.map((item) => (
              <div
                key={`${active}-${item.imgIndex}`}
                className="group relative aspect-square overflow-hidden rounded-2xl transition-all duration-[400ms] ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(0,0,0,.25)]"
              >
                <Image
                  src={`/logo-examples/${folder}/${item.imgIndex}.webp`}
                  alt={`Logo ${item.imgIndex}`}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-[600ms] group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
