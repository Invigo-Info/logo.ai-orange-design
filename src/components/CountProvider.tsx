"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

const TOTAL = 1_000_000;
const SIMULATED_BASE = 63_513;
const REFERENCE_DATE = new Date("2026-02-27T00:00:00").getTime();
const RATE = 193_728 / (14 * 86_400_000); // fixed rate: ~13,838 logos/day (produces 257,241 on Mar 13)
const TICK_INTERVAL = 1_000;

function getSimulatedCount() {
  const elapsed = Date.now() - REFERENCE_DATE;
  if (elapsed <= 0) return SIMULATED_BASE;
  return Math.min(SIMULATED_BASE + Math.floor(RATE * elapsed), TOTAL);
}

interface CountContextType {
  count: number;
  setCount: (count: number) => void;
}

const CountContext = createContext<CountContextType | null>(null);

export function useCount() {
  const ctx = useContext(CountContext);
  if (!ctx) throw new Error("useCount must be used within CountProvider");
  return ctx;
}

export default function CountProvider({
  initialCount,
  children,
}: {
  initialCount: number;
  children: ReactNode;
}) {
  const [count, setCount] = useState(initialCount);

  // Auto-increment: use a fixed reference date so the count is
  // deterministic regardless of page load / refresh timing.
  useEffect(() => {
    const tick = () => {
      const simulated = getSimulatedCount();
      // Use whichever is higher — real signups should never be hidden
      setCount((prev) => Math.max(prev, simulated));
    };

    tick(); // sync immediately on mount
    const id = setInterval(tick, TICK_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}
