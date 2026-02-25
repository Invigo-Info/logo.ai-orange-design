import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PressContent from "@/components/press/PressContent";
import Footer from "@/components/Footer";
import CountProvider from "@/components/CountProvider";
import { getSupabase } from "@/lib/supabase";

const BASE_COUNT = 63482;

const PRESS_NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/#faq" },
];

export const metadata: Metadata = {
  title: "Press & Media — Logo.ai | AI-Powered Logo Generator",
  description:
    "Logo.ai press resources, media inquiries, and brand assets. Get the latest news about the AI logo generator launching April 2026 with 500,000 free logos.",
};

export default async function PressPage() {
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
      <Navbar links={PRESS_NAV_LINKS} />
      <PressContent />
      <Footer />
    </CountProvider>
  );
}
