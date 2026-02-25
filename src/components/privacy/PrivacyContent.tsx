"use client";

import ScrollReveal from "../ScrollReveal";

/* ── Individual policy section ── */
interface PolicySectionProps {
  tag: string;
  heading: string;
  children: React.ReactNode;
}

function PolicySection({ tag, heading, children }: PolicySectionProps) {
  return (
    <ScrollReveal>
      <section className="py-14 md:py-20 border-t border-cream-05">
        {/* Tag pill */}
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

/* ── Styled paragraph ── */
function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-cream-55 text-base leading-[1.8] mb-5 last:mb-0 [&_strong]:text-cream [&_strong]:font-semibold [&_a]:text-accent-hi [&_a]:font-medium [&_a]:border-b [&_a]:border-[rgba(232,66,13,.2)] [&_a]:transition-colors [&_a]:duration-200 hover:[&_a]:border-[rgba(232,66,13,.5)]">
      {children}
    </p>
  );
}

/* ── Styled list ── */
function PolicyList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-none my-5 p-0 [&_li]:relative [&_li]:pl-5 [&_li]:text-cream-55 [&_li]:text-base [&_li]:leading-[1.8] [&_li]:mb-3 [&_li:last-child]:mb-0 [&_li_strong]:text-cream [&_li_strong]:font-semibold">
      {children}
    </ul>
  );
}

/* ── List bullet dot (rendered per item) ── */
function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative">
      <span className="absolute left-0 top-[12px] w-[5px] h-[5px] rounded-full bg-accent opacity-60" />
      {children}
    </li>
  );
}

/* ── Highlight block ── */
function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-7 py-6 px-7 border-l-[3px] border-accent bg-[rgba(232,66,13,.06)] rounded-r-xl">
      <p className="text-cream text-[1.02rem] font-medium leading-[1.7] mb-0">
        {children}
      </p>
    </div>
  );
}

/* ── Main content ── */
export default function PrivacyContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative z-[2] pt-40 pb-20 md:pt-40 md:pb-20 text-center overflow-hidden hero-glow">
        <ScrollReveal>
          <div className="max-w-[720px] mx-auto px-5 md:px-8 text-center">
            <h1 className="font-display text-[clamp(2.8rem,6.5vw,4.8rem)] font-extrabold leading-[1.06] tracking-[-0.05em] mb-5 text-cream">
              Privacy Policy
            </h1>
            <p className="font-display text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-cream-35">
              Last updated: February 23, 2026
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Policy sections */}
      <div className="relative z-[2] max-w-[720px] mx-auto px-5 md:px-8">
        <PolicySection tag="Who We Are" heading="Your privacy matters to us">
          <P>
            Logo.ai is an AI-powered logo and brand identity platform. This
            Privacy Policy explains how we collect, use, and protect your
            information when you use our website and services.
          </P>
          <P>
            By using Logo.ai, you agree to this policy. If you don&apos;t agree,
            please don&apos;t use our services.
          </P>
        </PolicySection>

        <PolicySection
          tag="What We Collect"
          heading="What information we gather"
        >
          <P>
            Right now, we&apos;re in pre-launch mode. Here&apos;s what we
            collect:
          </P>
          <PolicyList>
            <Li>
              <strong>Email address</strong> — When you sign up for a free logo
              or contact us
            </Li>
            <Li>
              <strong>Name</strong> — If you provide it through our contact form
            </Li>
            <Li>
              <strong>Usage data</strong> — Basic info like pages visited,
              browser type, and device (collected automatically)
            </Li>
          </PolicyList>
          <P>When we launch, we may also collect:</P>
          <PolicyList>
            <Li>
              <strong>Account info</strong> — Name, email, and password when you
              create an account
            </Li>
            <Li>
              <strong>Payment info</strong> — Processed securely through our
              payment provider (we never store card numbers)
            </Li>
            <Li>
              <strong>Content you create</strong> — Logos and brand assets you
              generate
            </Li>
          </PolicyList>
        </PolicySection>

        <PolicySection
          tag="How We Use It"
          heading="What we do with your information"
        >
          <P>We use your information to:</P>
          <PolicyList>
            <Li>Send you updates about our launch and your free logo</Li>
            <Li>Respond to your questions and messages</Li>
            <Li>Improve our website and services</Li>
            <Li>Process payments (when we launch)</Li>
            <Li>Provide customer support</Li>
          </PolicyList>
          <Highlight>
            We will never sell your personal information to third parties.
          </Highlight>
        </PolicySection>

        <PolicySection tag="Cookies" heading="How we use cookies">
          <P>
            We use cookies to make our site work better. These small files help
            us:
          </P>
          <PolicyList>
            <Li>Remember your preferences</Li>
            <Li>Understand how people use our site</Li>
            <Li>Improve your experience</Li>
          </PolicyList>
          <P>
            You can turn off cookies in your browser settings, but some features
            may not work properly.
          </P>
        </PolicySection>

        <PolicySection
          tag="Third-Party Services"
          heading="Partners we work with"
        >
          <P>We work with trusted partners to run our service:</P>
          <PolicyList>
            <Li>
              <strong>Analytics</strong> — To understand how people use our site
            </Li>
            <Li>
              <strong>Email services</strong> — To send you updates
            </Li>
            <Li>
              <strong>Payment processors</strong> — To handle transactions
              securely (at launch)
            </Li>
          </PolicyList>
          <P>
            These partners have their own privacy policies and only access what
            they need to do their job.
          </P>
        </PolicySection>

        <PolicySection tag="Your Rights" heading="You're in control">
          <P>You have control over your data. You can:</P>
          <PolicyList>
            <Li>
              <strong>Access</strong> — Ask what info we have about you
            </Li>
            <Li>
              <strong>Correct</strong> — Fix any incorrect information
            </Li>
            <Li>
              <strong>Delete</strong> — Request we delete your data
            </Li>
            <Li>
              <strong>Unsubscribe</strong> — Opt out of marketing emails anytime
            </Li>
          </PolicyList>
          <P>
            Just email us at{" "}
            <a href="mailto:contact@logo.ai">contact@logo.ai</a> and
            we&apos;ll help you out.
          </P>
        </PolicySection>

        <PolicySection
          tag="Data Security"
          heading="How we protect your data"
        >
          <P>
            We take security seriously. We use industry-standard measures to
            protect your information, including encryption and secure servers.
          </P>
          <P>
            That said, no system is 100% secure. We do our best to protect your
            data, but we can&apos;t guarantee absolute security.
          </P>
        </PolicySection>

        <PolicySection
          tag="Children's Privacy"
          heading="A note about children"
        >
          <P>
            Logo.ai is not intended for children under 13. We don&apos;t
            knowingly collect information from children. If you believe a child
            has provided us with personal information, please contact us and
            we&apos;ll delete it.
          </P>
        </PolicySection>

        <PolicySection tag="Changes" heading="Updates to this policy">
          <P>
            We may update this policy from time to time. If we make significant
            changes, we&apos;ll let you know by email or by posting a notice on
            our site.
          </P>
          <P>
            Continued use of Logo.ai after changes means you accept the updated
            policy.
          </P>
        </PolicySection>

        <PolicySection
          tag="Contact Us"
          heading="Questions about your privacy?"
        >
          <P>
            We&apos;re here to help. Email us at{" "}
            <a href="mailto:contact@logo.ai">contact@logo.ai</a>
          </P>
        </PolicySection>
      </div>
    </>
  );
}
