"use client";

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

/* ── Main content ── */

export default function TermsContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative z-[2] pt-40 pb-20 md:pt-40 md:pb-20 text-center overflow-hidden hero-glow">
        <ScrollReveal>
          <div className="max-w-[720px] mx-auto px-5 md:px-8 text-center">
            <h1 className="font-display text-[clamp(2.8rem,6.5vw,4.8rem)] font-extrabold leading-[1.06] tracking-[-0.05em] mb-5 text-cream">
              Terms of Service
            </h1>
            <p className="font-display text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-cream-35">
              Last updated: February 23, 2026
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Sections */}
      <div className="relative z-[2] max-w-[720px] mx-auto px-5 md:px-8">
        <PolicySection
          tag="Agreement to Terms"
          heading="By using Logo.ai, you agree"
        >
          <P>
            By accessing or using Logo.ai, you agree to be bound by these Terms
            of Service. If you don&apos;t agree to these terms, please
            don&apos;t use our services.
          </P>
          <P>
            We may update these terms from time to time. Continued use of
            Logo.ai after changes means you accept the new terms.
          </P>
        </PolicySection>

        <PolicySection
          tag="What Logo.ai Does"
          heading="What we're building"
        >
          <P>
            Logo.ai is an AI-powered logo platform that creates custom logos and
            brand assets. We&apos;re currently in pre-launch mode, collecting
            signups for free logos at launch.
          </P>
          <P>
            When we launch in April 2026, you&apos;ll be able to create, edit,
            and download logos and brand assets through our platform.
          </P>
        </PolicySection>

        <PolicySection
          tag="Your Account"
          heading="Keeping your account safe"
        >
          <P>
            When we launch, you may need to create an account to use Logo.ai.
            You&apos;re responsible for:
          </P>
          <PolicyList>
            <Li>Keeping your login information secure</Li>
            <Li>All activity that happens under your account</Li>
            <Li>
              Letting us know immediately if you suspect unauthorized access
            </Li>
          </PolicyList>
          <P>
            We reserve the right to suspend or terminate accounts that violate
            these terms.
          </P>
        </PolicySection>

        <PolicySection tag="Ownership" heading="You own what you create">
          <P>
            When you create a logo with Logo.ai and download it:
          </P>
          <PolicyList>
            <Li>
              <strong>You own it.</strong> Full commercial rights. Use your logo
              anywhere — your website, products, merch, everywhere.
            </Li>
            <Li>
              <strong>It&apos;s yours forever.</strong> We don&apos;t revoke
              rights after download.
            </Li>
            <Li>
              <strong>No royalties.</strong> You don&apos;t owe us anything
              beyond the original price.
            </Li>
          </PolicyList>
          <P>
            We may use anonymized versions of generated designs to improve our
            AI. This will never include your brand name or identifying
            information.
          </P>
        </PolicySection>

        <PolicySection tag="Restrictions" heading="What you can't do">
          <P>When using Logo.ai, you agree not to:</P>
          <PolicyList>
            <Li>Use our service for anything illegal</Li>
            <Li>
              Create logos that infringe on others&apos; trademarks or
              copyrights
            </Li>
            <Li>Resell or redistribute logos you didn&apos;t create</Li>
            <Li>Attempt to hack, disrupt, or overload our systems</Li>
            <Li>Use bots or automated tools to access our service</Li>
            <Li>Create content that&apos;s hateful, violent, or harmful</Li>
          </PolicyList>
        </PolicySection>

        <PolicySection
          tag="Payments &amp; Refunds"
          heading="How payments work"
        >
          <P>When we launch:</P>
          <PolicyList>
            <Li>Prices will be listed clearly before purchase</Li>
            <Li>
              Payments are processed securely through trusted providers
            </Li>
            <Li>Refund policy details will be available at launch</Li>
          </PolicyList>
          <Highlight>
            Your first logo is free. No credit card needed.
          </Highlight>
        </PolicySection>

        <PolicySection
          tag="Service Availability"
          heading="Uptime and maintenance"
        >
          <P>
            We work hard to keep Logo.ai running smoothly, but we can&apos;t
            guarantee 100% uptime. We may need to temporarily pause the service
            for maintenance or updates.
          </P>
          <P>
            We&apos;re not responsible for any losses caused by service
            interruptions.
          </P>
        </PolicySection>

        <PolicySection
          tag="Intellectual Property"
          heading="What belongs to us"
        >
          <P>
            Logo.ai — including our website, branding, AI technology, and
            content — belongs to us. You can&apos;t copy, modify, or
            redistribute any part of our platform without permission.
          </P>
          <P>
            Our name &ldquo;Logo.ai&rdquo; and logo are trademarks. Please
            don&apos;t use them without our written consent.
          </P>
        </PolicySection>

        <PolicySection tag="Disclaimer" heading='Provided "as is"'>
          <P>
            Logo.ai is provided &ldquo;as is&rdquo; without warranties of any
            kind. We don&apos;t guarantee that:
          </P>
          <PolicyList>
            <Li>The service will be error-free or uninterrupted</Li>
            <Li>Generated logos won&apos;t resemble existing designs</Li>
            <Li>Our service will meet your specific needs</Li>
          </PolicyList>
          <P>
            We recommend doing a trademark search before using any logo
            commercially.
          </P>
        </PolicySection>

        <PolicySection
          tag="Limitation of Liability"
          heading="Our liability is limited"
        >
          <P>
            To the maximum extent permitted by law, Logo.ai and its team
            won&apos;t be liable for any indirect, incidental, or consequential
            damages arising from your use of our service.
          </P>
          <P>
            Our total liability is limited to the amount you paid us in the 12
            months before the claim.
          </P>
        </PolicySection>

        <PolicySection
          tag="Governing Law"
          heading="Where the rules apply"
        >
          <P>
            These terms are governed by the laws of the State of California,
            United States. Any disputes will be resolved in the courts of San
            Francisco, California.
          </P>
        </PolicySection>

        <PolicySection
          tag="Contact Us"
          heading="Questions about these terms?"
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
