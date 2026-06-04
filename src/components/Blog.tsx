import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";

const POSTS = [
  {
    title: "How to choose colors that match your brand",
    tag: "Brand Basics",
    readTime: "6 min read",
    gradient: "from-[#3B5BFF] via-[#7A4BFF] to-[#FF4BB1]",
  },
  {
    title: "5 logo mistakes that make your brand look amateur",
    tag: "Design Tips",
    readTime: "8 min read",
    gradient: "from-[#FF5C2E] via-[#E8420D] to-[#8B2A0A]",
  },
  {
    title: "Restaurant logo ideas: what works and what doesn't",
    tag: "Industry Guides",
    readTime: "10 min read",
    gradient: "from-[#FFB347] via-[#FF7B3A] to-[#C73A0C]",
  },
  {
    title: "Wordmark vs. icon: which logo style fits your brand?",
    tag: "Design Tips",
    readTime: "7 min read",
    gradient: "from-[#16C1A1] via-[#0F8B7A] to-[#0A4A45]",
  },
];

export default function Blog() {
  return (
    <section
      id="blog"
      className="bg-b1 py-20 md:py-[120px] px-4 md:px-8 relative section-fade-from-b0"
    >
      <SectionHeader
        eyebrow="From the Blog"
        title="Logo &amp; branding tips for your business"
        description="Practical guides to help you build a brand that stands out."
        className="mb-12 md:mb-16"
      />

      <div className="max-w-[1180px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {POSTS.map((post, i) => (
          <ScrollReveal key={post.title} delay={(i % 3) as 0 | 1 | 2 | 3}>
            <article className="group h-full rounded-2xl border border-cream-10 bg-b0 overflow-hidden flex flex-col hover:border-cream-18 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              {/* Cover image (decorative gradient with abstract grid texture) */}
              <div className={`relative aspect-[16/10] bg-gradient-to-br ${post.gradient} overflow-hidden`}>
                <div
                  className="absolute inset-0 opacity-30 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                  aria-hidden
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" aria-hidden />
                <span className="absolute top-3 left-3 rounded-full px-3 py-1 bg-black/30 backdrop-blur-md border border-white/15 text-[0.66rem] font-semibold tracking-[0.1em] uppercase text-cream">
                  {post.tag}
                </span>
              </div>

              {/* Body */}
              <div className="flex-1 p-5 flex flex-col gap-3">
                <h3 className="font-display text-[1rem] md:text-[1.05rem] font-bold leading-[1.35] text-cream group-hover:text-accent-hi transition-colors duration-300">
                  {post.title}
                </h3>
                <div className="mt-auto flex items-center justify-between text-[0.72rem] text-cream-35">
                  <span>{post.readTime}</span>
                  <span className="inline-flex items-center gap-1 group-hover:text-accent-hi transition-colors">
                    Read more
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M3 6h6M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <span className="text-[0.82rem] text-cream-35">
          More posts coming soon
        </span>
      </div>
    </section>
  );
}
