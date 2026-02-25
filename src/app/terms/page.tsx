import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import TermsContent from "@/components/terms/TermsContent";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import CountProvider from "@/components/CountProvider";
import { getSupabase } from "@/lib/supabase";

const BASE_COUNT = 63482;

const TERMS_NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/#faq" },
];

export const metadata: Metadata = {
  title: "Terms of Service — Logo.ai | AI-Powered Logo Generator",
  description:
    "Read the Terms of Service for Logo.ai, the AI-powered logo generator launching April 2026. You own what you create. Full commercial rights are included.",
};

export default async function TermsPage() {
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
      <Navbar links={TERMS_NAV_LINKS} />
      <TermsContent />
      <FinalCTA />
      <Footer />
    </CountProvider>
  );
}
