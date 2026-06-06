"use client";

import { useState, useRef } from "react";

interface EmailBarProps {
  className?: string;
  source?: string;
  size?: "default" | "lg";
  onSignupSuccess?: (newCount: number) => void;
}

export default function EmailBar({
  className = "",
  source,
  size = "default",
  onSignupSuccess,
}: EmailBarProps) {
  const isLg = size === "lg";
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const email = inputRef.current?.value.trim() || "";
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        onSignupSuccess?.(data.count);
      } else {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
    } catch {
      setError(true);
      setTimeout(() => setError(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        className={`inline-flex items-center gap-2.5 py-4 px-6 rounded-full bg-[rgba(232,66,13,.06)] border border-[rgba(232,66,13,.15)] text-[0.92rem] font-medium text-cream ${className}`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="shrink-0 text-accent-hi"
        >
          <path
            d="M13.3 4.3 6.5 11.1 2.7 7.3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        You&apos;re on the list! We&apos;ll email you at launch.
      </div>
    );
  }

  const wrapMax = isLg ? "max-w-[635px]" : "max-w-[460px]";
  const inputPad = isLg ? "h-[60px] px-[22px]" : "h-[60px] px-7 md:px-[22px]";
  const inputText = isLg ? "text-[17px]" : "text-[1rem]";
  const btnPad = isLg ? "h-[60px] px-[26px]" : "h-[60px] px-7";
  const btnText = isLg ? "text-[17px]" : "text-[1rem]";

  return (
    <div
      className={`flex flex-col sm:flex-row gap-2.5 w-full ${wrapMax} ${className}`}
    >
      <input
        ref={inputRef}
        type="email"
        placeholder={error ? "Please enter a valid email" : "Enter your email"}
        className={`flex-1 ${inputPad} ${inputText} rounded-full border bg-b3 text-cream font-sans outline-none transition-all duration-300 placeholder:text-cream-55 ${
          error
            ? "border-red-500"
            : "border-[#3A3A48] focus:border-[rgba(232,66,13,.4)] focus:shadow-[0_0_0_4px_rgba(232,66,13,.08)]"
        }`}
        disabled={loading}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`${btnPad} ${btnText} rounded-full border-none bg-accent text-white font-sans font-semibold whitespace-nowrap shadow-[0_0_30px_rgba(232,66,13,.15)] transition-all duration-300 cursor-pointer hover:bg-accent-hi hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(232,66,13,.25),0_10px_40px_rgba(0,0,0,.3)] disabled:opacity-60 flex items-center gap-2 justify-center shrink-0`}
      >
        {loading ? "Joining..." : "Get My Free Logo →"}
      </button>
    </div>
  );
}
