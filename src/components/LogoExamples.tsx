"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { categories, categoryKeys } from "@/data/logoData";
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

function getInitialCategory(): string {
  if (typeof window === "undefined") return "restaurant";
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (stored && stored in categories) return stored;
  return "restaurant";
}

function buildDisplayItems(categoryKey: string) {
  const cat = categories[categoryKey];
  const items = cat?.items || [];
  const indexed = items.map((item, idx) => ({ ...item, imgIndex: idx + 1 }));
  if (indexed.length > DISPLAY_COUNT) {
    return shuffleAndPick(indexed, DISPLAY_COUNT);
  }
  return indexed;
}

export default function LogoExamples() {
  const [active, setActive] = useState("restaurant");
  const [displayItems, setDisplayItems] = useState<
    Array<{ n: string; t: string; bg: string; tc: string; imgIndex: number }>
  >([]);

  // On mount: restore persisted category and build randomized items
  useEffect(() => {
    const restored = getInitialCategory();
    setActive(restored);
    setDisplayItems(buildDisplayItems(restored));
  }, []);

  const handleSelect = (key: string) => {
    setActive(key);
    sessionStorage.setItem(STORAGE_KEY, key);
    setDisplayItems(buildDisplayItems(key));
  };

  const tabMap: Record<string, string> = {};
  Object.entries(categories).forEach(([k, v]) => {
    tabMap[k] = v.l;
  });

  const folder = categories[active]?.folder || "";

  return (
    <section className="bg-b1 py-20 md:py-[80px] px-4 md:px-8 relative">
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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-3.5 max-w-[1060px] mx-auto">
        {displayItems.map((item) => (
          <div
            key={`${active}-${item.imgIndex}`}
            className="group bg-b1 border border-cream-10 rounded-xl p-1 text-center transition-all duration-[400ms] ease-[cubic-bezier(.16,1,.3,1)] relative hover:border-cream-18 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(0,0,0,.25)]"
          >
            <div className="rounded-[10px] aspect-square relative overflow-hidden">
              <Image
                src={`/logo-examples/${folder}/${item.imgIndex}.png`}
                alt={item.n}
                fill
                unoptimized
                className="object-cover transition-transform duration-[600ms]  group-hover:scale-110"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
