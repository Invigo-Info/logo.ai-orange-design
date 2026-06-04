import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoExamples from "@/components/LogoExamples";
import LogoPreview from "@/components/LogoPreview";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import UseCases from "@/components/UseCases";
import Pricing from "@/components/Pricing";
import Comparison from "@/components/Comparison";
import FAQ from "@/components/FAQ";
import Blog from "@/components/Blog";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import CountProvider from "@/components/CountProvider";
import { getSupabase } from "@/lib/supabase";
import {
  getLogoCategories,
  getMockupCategories,
} from "@/lib/getLogoCategories";

const BASE_COUNT = 63482;
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
      <LogoPreview categories={mockupCategories} />
      <HowItWorks />
      <Testimonials />
      <UseCases />
      <Pricing />
      <Comparison />
      <FAQ />
      <Blog />
      <FinalCTA />
      <Footer />
    </CountProvider>
  );
}
