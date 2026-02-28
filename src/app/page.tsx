import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoExamples from "@/components/LogoExamples";
import HowItWorks from "@/components/HowItWorks";
import LogoPreview from "@/components/LogoPreview";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import CountProvider from "@/components/CountProvider";
import { getSupabase } from "@/lib/supabase";
import {
  getLogoCategories,
  getMockupCategories,
} from "@/lib/getLogoCategories";

const BASE_COUNT = 63482;

// ✅ ADD THIS — ISR: revalidate every 60s as a safety net
// On-demand revalidation (from route.ts) is the primary trigger;
// this is a fallback so the count never goes stale for more than 60s.
export const revalidate = 60;

export default async function Home() {
  const [logoCategories, mockupCategories] = await Promise.all([
    getLogoCategories(),
    getMockupCategories(),
  ]);
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
      <Navbar />
      <Hero />
      <LogoExamples categories={logoCategories} />
      <HowItWorks />
      <LogoPreview categories={mockupCategories} />
      <FAQ />
      <FinalCTA />
      <Footer />
    </CountProvider>
  );
}
