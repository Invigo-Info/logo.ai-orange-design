import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PrivacyContent from "@/components/privacy/PrivacyContent";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import CountProvider from "@/components/CountProvider";
import { getSupabase } from "@/lib/supabase";

const BASE_COUNT = 63482;

const PRIVACY_NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/#faq" },
];

export const metadata: Metadata = {
  title: "Privacy Policy — Logo.ai | Your Data, Your Control",
  description:
    "Learn how Logo.ai collects, uses, and protects your personal information. We never sell your data to third parties. Read our full privacy policy here.",
};

export default async function PrivacyPage() {
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
      <Navbar links={PRIVACY_NAV_LINKS} />
      <PrivacyContent />
      <FinalCTA />
      <Footer />
    </CountProvider>
  );
}
