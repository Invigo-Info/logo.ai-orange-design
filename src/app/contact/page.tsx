import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ContactContent from "@/components/contact/ContactContent";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import CountProvider from "@/components/CountProvider";
import { getSupabase } from "@/lib/supabase";

const BASE_COUNT = 63482;

const CONTACT_NAV_LINKS = [
  { label: "Why logo.ai", href: "/#how" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/#faq" },
];

export const metadata: Metadata = {
  title: "Contact — Logo.ai | AI-Powered Logo & Brand Design",
  description:
    "Got a question about Logo.ai? Find answers about our launch, pricing, free logos, and what's included — or send us a message. We reply within 24 hours.",
};

export default async function ContactPage() {
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
      <Navbar links={CONTACT_NAV_LINKS} />
      <ContactContent />
      <FinalCTA />
      <Footer />
    </CountProvider>
  );
}
