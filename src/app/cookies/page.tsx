import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CookiesContent from "@/components/cookies/CookiesContent";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import CountProvider from "@/components/CountProvider";
import { getSupabase } from "@/lib/supabase";

const BASE_COUNT = 63482;

const COOKIES_NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/#faq" },
];

export const metadata: Metadata = {
  title: "Cookie Policy — Logo.ai | Clear, Simple, No Tricks",
  description:
    "How Logo.ai uses cookies to improve your experience. No advertising cookies. No tracking cookies. We never sell your data to advertisers. Simple and clear.",
};

export default async function CookiesPage() {
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
      <Navbar links={COOKIES_NAV_LINKS} />
      <CookiesContent />
      <FinalCTA />
      <Footer />
    </CountProvider>
  );
}
