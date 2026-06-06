import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";

const POSTS = [
  {
    title: "How to choose colors that match your brand",
    excerpt:
      "A simple guide to picking colors that feel right for your business.",
    img: "https://images.unsplash.com/photo-1558244661-d248897f7bc4?w=720&q=70&auto=format&fit=crop",
  },
  {
    title: "5 logo mistakes that make your brand look amateur",
    excerpt:
      "Common pitfalls to avoid when building your visual identity.",
    img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=720&q=70&auto=format&fit=crop",
  },
  {
    title: "Restaurant logo ideas: what works and what doesn't",
    excerpt:
      "Industry-specific tips for crafting a logo that fits your business.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=720&q=70&auto=format&fit=crop",
  },
];

export default function Blog() {
  return (
    <section
      id="blog"
      className="bg-b0 py-20 md:py-[120px] px-4 md:px-8 relative"
    >
      <SectionHeader
        eyebrow="Blog"
        title="Logo &amp; branding tips for your business"
        description="Practical guides to help you build a brand that stands out."
        className="mb-12 md:mb-16"
      />

      <div className="max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {POSTS.map((post, i) => (
          <ScrollReveal key={post.title} delay={(i % 3) as 0 | 1 | 2 | 3}>
            <article className="group h-full rounded-2xl border border-cream-10 bg-b1 overflow-hidden flex flex-col hover:border-accent transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              {/* Cover image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-cream-05">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.img}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-105"
                />
              </div>

              {/* Body */}
              <div className="flex-1 p-5 flex flex-col gap-2.5">
                <h3 className="font-display text-[1rem] md:text-[1.05rem] font-bold leading-[1.35] text-cream">
                  {post.title}
                </h3>
                <p className="text-[0.84rem] text-cream-55 leading-[1.5]">
                  {post.excerpt}
                </p>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <a href="#blog" className="text-[0.86rem] font-semibold text-cream-55 hover:text-accent-hi transition-colors no-underline">
          See All Posts
        </a>
      </div>
    </section>
  );
}
