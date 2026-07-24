"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

const TOTAL = 3_000_000;
// The value the live counter shows at REFERENCE_DATE. The simulation continues
// this exact number so nothing jumps on deploy, then ramps to TOTAL at launch.
const SIMULATED_BASE = 1_942_255;
// Real DB total (BASE_COUNT + counted signups) the app reports at REFERENCE_DATE.
// Signups beyond this are added on top of the simulation, so the visible number
// grows with real signups globally — consistent for every visitor.
const ANCHOR_REAL_COUNT = 72_026;
const REFERENCE_DATE = new Date("2026-07-24T00:00:00").getTime();
const LAUNCH_DATE = new Date("2026-10-01T00:00:00").getTime();
const RATE = (TOTAL - SIMULATED_BASE) / (LAUNCH_DATE - REFERENCE_DATE);
const TICK_INTERVAL = 1_000;

function getSimulatedCount() {
  const elapsed = Date.now() - REFERENCE_DATE;
  if (elapsed <= 0) return SIMULATED_BASE;
  return Math.min(SIMULATED_BASE + Math.floor(RATE * elapsed), TOTAL);
}

interface CountContextType {
  count: number;
  // Register a new real DB total (BASE_COUNT + Supabase signups) returned by
  // the signup API. Kept as `setCount` so callers don't need to change.
  setCount: (realCount: number) => void;
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
  // Real DB total (BASE_COUNT + Supabase signups), from the server and growing
  // as people sign up. Signups beyond ANCHOR_REAL_COUNT are added on top of the
  // simulation, so the count reflects real signups cumulatively for everyone.
  const realCountRef = useRef(initialCount);
  const [count, setCount] = useState(initialCount);

  // Displayed = simulated ramp + real signups since the anchor, floored at the
  // simulation (never below the live curve) and capped at TOTAL.
  const compose = () => {
    const realSignups = Math.max(0, realCountRef.current - ANCHOR_REAL_COUNT);
    return Math.min(getSimulatedCount() + realSignups, TOTAL);
  };

  const registerRealCount = (realCount: number) => {
    realCountRef.current = Math.max(realCountRef.current, realCount);
    setCount((prev) => Math.max(prev, compose()));
  };

  // Auto-increment: use a fixed reference date so the count is
  // deterministic regardless of page load / refresh timing.
  useEffect(() => {
    const tick = () => setCount((prev) => Math.max(prev, compose()));

    tick(); // sync immediately on mount
    const id = setInterval(tick, TICK_INTERVAL);
    return () => clearInterval(id);
    // compose reads a ref + module-level values, so a mount-only effect is correct.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CountContext.Provider value={{ count, setCount: registerRealCount }}>
      {children}
    </CountContext.Provider>
  );
}
