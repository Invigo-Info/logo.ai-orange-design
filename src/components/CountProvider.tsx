"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

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
  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}
