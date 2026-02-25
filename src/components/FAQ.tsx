"use client";

import { useState } from "react";
import { faqs } from "@/data/faqData";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      id="faq"
      className="bg-b0 py-20 md:py-[120px] px-4 md:px-8 relative section-fade-from-b1"
    >
      <SectionHeader
        eyebrow="FAQ"
        title="Questions? Answers."
        className="mb-12 md:mb-16"
      />

      <ScrollReveal delay={3}>
        <div className="max-w-[720px] mx-auto flex flex-col gap-0">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`border-b border-cream-10 overflow-hidden ${i === 0 ? "border-t" : ""}`}
              >
                {/* Question */}
                <button
                  onClick={() => toggle(i)}
                  className="flex justify-between items-center gap-4 w-full py-6 cursor-pointer select-none transition-colors duration-200 text-left group/q hover:text-accent-hi"
                >
                  <span className="font-display text-[0.95rem] font-semibold tracking-[-0.01em] text-cream">
                    {faq.q}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? "bg-[rgba(232,66,13,.06)] border-[rgba(232,66,13,.2)]"
                        : "bg-cream-05 border-cream-10"
                    }`}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    >
                      <line
                        x1="7" y1="2" x2="7" y2="12"
                        stroke={isOpen ? "#FF5C2E" : "#E8E8E6"}
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                      <line
                        x1="2" y1="7" x2="12" y2="7"
                        stroke={isOpen ? "#FF5C2E" : "#E8E8E6"}
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-[400ms] ease-[cubic-bezier(.16,1,.3,1)] ${
                    isOpen ? "max-h-[300px]" : "max-h-0"
                  }`}
                >
                  <div className="pb-6 text-[0.92rem] text-cream-55 leading-[1.7]">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}
