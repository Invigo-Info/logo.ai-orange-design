import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CareersContent from "@/components/careers/CareersContent";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import CountProvider from "@/components/CountProvider";
import { getSupabase } from "@/lib/supabase";

const BASE_COUNT = 63482;

const CAREERS_NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/#faq" },
];

export const metadata: Metadata = {
  title: "Careers at Logo.ai — Build the Future of Logo Design",
  description:
    "Logo.ai is looking for builders, self-starters, and long-term thinkers. Excited about AI and want to shape the future of brand design? We'd love to meet you.",
};

export default async function CareersPage() {
  let initialCount = BASE_COUNT;
  try {
    const { count } = await getSupabase()
      .from("early_access_user_emails")
      .select("*", { count: "exact", head: true });
    initialCount = BASE_COUNT + (count ?? 0);
  } catch {
    // fallback to base count
  }

  return (
    <CountProvider initialCount={initialCount}>
      <Navbar links={CAREERS_NAV_LINKS} />
      <CareersContent />
      <FinalCTA />
      <Footer />
    </CountProvider>
  );
}
