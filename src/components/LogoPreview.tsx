"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { previewCategories, mockupFolders } from "@/data/previewData";
import CategoryTabs from "./CategoryTabs";
import SectionHeader from "./SectionHeader";

export default function LogoPreview() {
  const [activeCategory, setActiveCategory] = useState("bakery");
  const [currentSlide, setCurrentSlide] = useState(0);

  const folder = mockupFolders[activeCategory] || activeCategory;
  const slides = [1, 2, 3, 4, 5].map((n) => `/logo-mockups/${folder}/${n}.png`);

  useEffect(() => {
    setCurrentSlide(0);
  }, [activeCategory]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 5);
    }, 2200);
    return () => clearInterval(timer);
  }, [currentSlide]);

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

      <CategoryTabs
        tabs={previewCategories}
        active={activeCategory}
        onSelect={setActiveCategory}
        className="mb-8 md:mb-10"
      />

      {/* Framed preview */}
      <div
        className="max-w-[1200px] mx-auto rounded-[22px] p-1 md:p-1 relative border border-cream-18"
        style={
          {
            // background:
            //   "linear-gradient(145deg, rgba(232,66,13,.18), rgba(232,232,230,.08) 50%, rgba(232,66,13,.12))",
            // boxShadow:
            //   "0 0 0 1px rgba(232,66,13,.12), 0 0 80px rgba(232,66,13,.08), 0 0 160px rgba(232,66,13,.04), 0 30px 80px rgba(0,0,0,.5)",
          }
        }
      >
        <div className="relative w-full aspect-[960/520] overflow-hidden rounded-[14px] bg-b3">
          {slides.map((src, i) => (
            <Image
              key={`${activeCategory}-${i}`}
              src={src}
              alt={`${previewCategories[activeCategory]} mockup ${i + 1}`}
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
        {[0, 1, 2, 3, 4].map((i) => (
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
