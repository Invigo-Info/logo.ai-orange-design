"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import type { DynamicCategory } from "@/lib/getLogoCategories";
import CategoryTabsAdvanced from "./CategoryTabsAdvanced";
import SectionHeader from "./SectionHeader";

const DISPLAY_COUNT = 12;
const STORAGE_KEY = "logoExamples_activeCategory";

function shuffleAndPick<T>(array: T[], count: number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

interface DisplayItem {
  imgIndex: number;
}

function buildDisplayItems(count: number): DisplayItem[] {
  const indexed = Array.from({ length: count }, (_, i) => ({
    imgIndex: i + 1,
  }));
  if (indexed.length > DISPLAY_COUNT) {
    return shuffleAndPick(indexed, DISPLAY_COUNT);
  }
  return indexed;
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
  const initialItems = useMemo(
    () =>
      Array.from({ length: Math.min(defaultCount, DISPLAY_COUNT) }, (_, i) => ({
        imgIndex: i + 1,
      })),
    [defaultCount],
  );

  const [active, setActive] = useState(defaultKey);
  const [displayItems, setDisplayItems] = useState<DisplayItem[]>(initialItems);

  useEffect(() => {
    // After hydration: restore session category or shuffle the default
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored && stored in categoryMap && stored !== defaultKey) {
      setActive(stored);
      setDisplayItems(buildDisplayItems(categoryMap[stored]?.count ?? 0));
    } else {
      setDisplayItems(buildDisplayItems(categoryMap[defaultKey]?.count ?? 0));
    }
  }, [categoryMap, defaultKey]);

  const handleSelect = (key: string) => {
    setActive(key);
    sessionStorage.setItem(STORAGE_KEY, key);
    setDisplayItems(buildDisplayItems(categoryMap[key]?.count ?? 0));
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
              src={`/logo-examples/${folder}/${item.imgIndex}.png`}
              alt={`Logo ${item.imgIndex}`}
              fill
              unoptimized
              className="object-cover transition-transform duration-[600ms] group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
