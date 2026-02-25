import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AboutHero from "@/components/about/AboutHero";
import CostComparison from "@/components/about/CostComparison";
import AiChanged from "@/components/about/AiChanged";
import Team from "@/components/about/Team";
import Leadership from "@/components/about/Leadership";
import StatsBar from "@/components/about/StatsBar";
import Timeline from "@/components/about/Timeline";
import Product from "@/components/about/Product";
import SocialProof from "@/components/about/SocialProof";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import CountProvider from "@/components/CountProvider";
import { getSupabase } from "@/lib/supabase";

const BASE_COUNT = 63482;

const ABOUT_NAV_LINKS = [
  { label: "Why logo.ai", href: "/#how" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/#faq" },
];

export const metadata: Metadata = {
  title: "About Logo.ai — AI-Powered Logos, Built from Scratch",
  description:
    "Logo.ai creates original, professional logos using AI — not templates. Learn how we're making agency-level brand design accessible to everyone, for free.",
};

export default async function AboutPage() {
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
      <Navbar links={ABOUT_NAV_LINKS} />
      <AboutHero />
      <CostComparison />
      <AiChanged />
      <Team />
      <Leadership />
      <StatsBar />
      <Timeline />
      <Product />
      <SocialProof />
      <FinalCTA />
      <Footer />
    </CountProvider>
  );
}
