"use client";

import Link from "next/link";
import ScrollReveal from "../ScrollReveal";

/* ── Shared sub-components ── */

function PolicySection({
  tag,
  heading,
  children,
}: {
  tag: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <ScrollReveal>
      <section className="py-14 md:py-20 border-t border-cream-05">
        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[rgba(232,66,13,.06)] border border-[rgba(232,66,13,.15)] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-accent">
            {tag}
          </span>
        </span>
        <h2 className="font-display text-[clamp(1.4rem,3vw,1.8rem)] font-bold tracking-[-0.03em] leading-[1.2] mb-6 text-cream">
          {heading}
        </h2>
        {children}
      </section>
    </ScrollReveal>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-cream-55 text-base leading-[1.8] mb-5 last:mb-0 [&_strong]:text-cream [&_strong]:font-semibold [&_a]:text-accent-hi [&_a]:font-medium [&_a]:border-b [&_a]:border-[rgba(232,66,13,.2)] [&_a]:transition-colors [&_a]:duration-200 hover:[&_a]:border-[rgba(232,66,13,.5)]">
      {children}
    </p>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative pl-5 text-cream-55 text-base leading-[1.8] mb-3 last:mb-0 [&_strong]:text-cream [&_strong]:font-semibold">
      <span className="absolute left-0 top-[12px] w-[5px] h-[5px] rounded-full bg-accent opacity-60" />
      {children}
    </li>
  );
}

function PolicyList({ children }: { children: React.ReactNode }) {
  return <ul className="list-none my-5 p-0">{children}</ul>;
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-7 py-6 px-7 border-l-[3px] border-accent bg-[rgba(232,66,13,.06)] rounded-r-xl">
      <p className="text-cream text-[1.02rem] font-medium leading-[1.7] mb-0">
        {children}
      </p>
    </div>
  );
}

/* ── Cookie table data ── */

const COOKIE_ROWS = [
  {
    type: "Essential",
    desc: "Required for the site to work. These handle things like page loading and security. You can't turn these off.",
  },
  {
    type: "Analytics",
    desc: "Help us understand how visitors use our site — which pages are popular, where people drop off, and how we can improve. All data is anonymous.",
  },
  {
    type: "Functional",
    desc: "Remember your preferences like language or region so you don't have to set them every time you visit.",
  },
];

/* ── Main content ── */

export default function CookiesContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative z-[2] pt-40 pb-20 md:pt-40 md:pb-20 text-center overflow-hidden hero-glow">
        <ScrollReveal>
          <div className="max-w-[720px] mx-auto px-5 md:px-8 text-center">
            <h1 className="font-display text-[clamp(2.8rem,6.5vw,4.8rem)] font-extrabold leading-[1.06] tracking-[-0.05em] mb-5 text-cream">
              Cookie Policy
            </h1>
            <p className="font-display text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-cream-35">
              Last updated: February 23, 2026
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Sections */}
      <div className="relative z-[2] max-w-[720px] mx-auto px-5 md:px-8">
        <PolicySection tag="What Are Cookies" heading="The short version">
          <P>
            Cookies are small text files stored on your device when you visit a
            website. They help us remember your preferences, understand how you
            use our site, and improve your experience.
          </P>
          <P>
            This policy explains what cookies we use, why we use them, and how
            you can control them.
          </P>
        </PolicySection>

        <PolicySection tag="Cookies We Use" heading="What's on our site">
          <P>We keep it simple. Here&apos;s what we use and why:</P>

          {/* Cookie table */}
          <table className="w-full border-collapse my-6">
            <thead>
              <tr>
                <th className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-cream-35 text-left py-3.5 px-4 border-b border-cream-10">
                  Type
                </th>
                <th className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-cream-35 text-left py-3.5 px-4 border-b border-cream-10">
                  What it does
                </th>
              </tr>
            </thead>
            <tbody>
              {COOKIE_ROWS.map((row) => (
                <tr key={row.type} className="border-b border-cream-05 last:border-b-0">
                  <td className="text-[0.92rem] text-cream-55 py-4 px-4 leading-[1.6] align-top">
                    <strong className="text-cream font-semibold block mb-0.5">
                      {row.type}
                    </strong>
                  </td>
                  <td className="text-[0.92rem] text-cream-55 py-4 px-4 leading-[1.6] align-top">
                    {row.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Highlight>
            We don&apos;t use advertising or tracking cookies. We never sell your
            data to advertisers.
          </Highlight>
        </PolicySection>

        <PolicySection
          tag="Third-Party Cookies"
          heading="Partners who may set cookies"
        >
          <P>
            Some trusted third-party services we use may place their own cookies
            on your device:
          </P>
          <PolicyList>
            <Li>
              <strong>Analytics providers</strong> — To help us measure site
              traffic and usage patterns
            </Li>
            <Li>
              <strong>Email service providers</strong> — To track whether our
              emails were opened or clicked
            </Li>
          </PolicyList>
          <P>
            These partners have their own cookie and privacy policies. We only
            work with providers who meet our standards for data protection.
          </P>
        </PolicySection>

        <PolicySection tag="Your Choices" heading="You're in control">
          <P>You can manage cookies in several ways:</P>
          <PolicyList>
            <Li>
              <strong>Browser settings</strong> — Most browsers let you block or
              delete cookies. Check your browser&apos;s help section for
              instructions.
            </Li>
            <Li>
              <strong>Clear existing cookies</strong> — You can delete cookies
              already stored on your device through your browser settings.
            </Li>
            <Li>
              <strong>Opt out of analytics</strong> — Many analytics providers
              offer opt-out tools. Check their websites for details.
            </Li>
          </PolicyList>
          <P>
            Keep in mind that blocking certain cookies may affect how our site
            works. Essential cookies are required for basic functionality.
          </P>
        </PolicySection>

        <PolicySection
          tag="How Long Do Cookies Last"
          heading="Cookie duration"
        >
          <P>
            We use two types based on how long they stick around:
          </P>
          <PolicyList>
            <Li>
              <strong>Session cookies</strong> — Temporary. They disappear when
              you close your browser.
            </Li>
            <Li>
              <strong>Persistent cookies</strong> — Stay on your device for a
              set period (usually up to 12 months) or until you delete them.
            </Li>
          </PolicyList>
        </PolicySection>

        <PolicySection tag="Changes" heading="Updates to this policy">
          <P>
            We may update this Cookie Policy from time to time — for example,
            when we add new features or start using new tools. If we make
            significant changes, we&apos;ll let you know on our site.
          </P>
          <P>
            Continued use of Logo.ai after changes means you accept the updated
            policy.
          </P>
        </PolicySection>

        <PolicySection tag="Contact Us" heading="Questions about cookies?">
          <P>
            We&apos;re here to help. Email us at{" "}
            <a href="mailto:contact@logo.ai">contact@logo.ai</a>
          </P>
          <P>
            For broader privacy questions, check out our{" "}
            <Link
              href="/privacy"
              className="text-accent-hi font-medium border-b border-[rgba(232,66,13,.2)] transition-colors duration-200 hover:border-[rgba(232,66,13,.5)]"
            >
              Privacy Policy
            </Link>
            .
          </P>
        </PolicySection>
      </div>
    </>
  );
}
