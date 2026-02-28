"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import type { DynamicCategory } from "@/lib/getLogoCategories";
import CategoryTabsAdvanced from "./CategoryTabsAdvanced";
import SectionHeader from "./SectionHeader";

export default function LogoPreview({
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

  const defaultKey =
    "bakery" in categoryMap ? "bakery" : (categories[0]?.key ?? "");

  const [activeCategory, setActiveCategory] = useState(defaultKey);
  const [currentSlide, setCurrentSlide] = useState(0);

  const folder = categoryMap[activeCategory]?.folder ?? "";
  const slideCount = categoryMap[activeCategory]?.count ?? 0;
  const slides = Array.from(
    { length: slideCount },
    (_, i) => `/logo-mockups/${folder}/${i + 1}.png`,
  );

  useEffect(() => {
    setCurrentSlide(0);
  }, [activeCategory]);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [currentSlide, slides.length]);

  return (
    <section
      id="preview"
      className="bg-b1 py-20 md:py-[120px] px-4 md:px-8 relative section-fade-from-b0"
    >
      <SectionHeader
        eyebrow="See It Live"
        title="Logos on Web, Social, and Print"
        description="See Logo.ai logos in real life — website headers, social profiles, business cards, packaging, and more."
        className="mb-10 md:mb-[52px]"
      />

      <CategoryTabsAdvanced
        tabs={tabMap}
        active={activeCategory}
        onSelect={setActiveCategory}
        className="mb-8 md:mb-10"
      />

      {/* Framed preview */}
      <div
        className="max-w-[1200px] mx-auto rounded-[22px] p-1 md:p-1 relative "
        style={{}}
      >
        <div className="relative w-full aspect-[960/520] overflow-hidden rounded-[14px] bg-b3">
          {slides.map((src, i) => (
            <Image
              key={`${activeCategory}-${i}`}
              src={src}
              alt={`${tabMap[activeCategory]} mockup ${i + 1}`}
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
      <div className="flex gap-2.5 justify-center mt-7">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] cursor-pointer ${
              currentSlide === i
                ? "w-7 bg-accent shadow-[0_0_12px_rgba(232,66,13,.35)]"
                : "w-1.5 bg-cream-18 hover:bg-cream-55"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
