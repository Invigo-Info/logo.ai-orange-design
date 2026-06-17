// Design N — same visual system as Design M (HEADSHOT design tokens +
// Claude terracotta palette), different content. Reuses the .m-theme scope
// and the same fonts so MHeader / MFooter (imported from prelaunch) render
// identically. The token <style> block is duplicated here so /launch is
// self-contained — visiting it doesn't run prelaunch's layout.

import type { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Logo.AI — Professional logos in 60 seconds',
  description:
    'Professional logos in 60 seconds. Describe your brand and our AI generates designer-quality logos — free to generate and preview, pay only if you love it.',
}

// Fonts come from the root layout (Montserrat display + Inter body). The
// .m-theme block below points --m-font-* at those vars so the onboarding
// matches the main site's typography exactly.

export default function NLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Identical token block to prelaunch/layout.tsx — keeps /launch
          self-contained and pixel-matched to /prelaunch. */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Mozilla Headline + Mozilla Text — design-L's typefaces, loaded so
           the Freepik toggle can use them (see [data-brand-color="freepik"]
           below). No other toggle references them. */
        .m-theme {
          /* === Remapped to the new logo site (dark editorial + orange) === */
          --m-brand: #ff5a1f;
          --m-brand-strong: #e54e18;
          --m-brand-deep: #cc4416;
          --m-brand-soft: rgba(255, 90, 31, 0.14);
          --m-brand-bg: #0e0e0e;
          --m-brand-glow: rgba(255, 90, 31, 0.5);
          --m-brand-on-dark: #ff5a1f;

          /* Ink/text inverted for the dark theme (light text on dark bg). */
          --m-ink-deep: #f3f1ee;
          --m-ink: #f3f1ee;
          --m-ink-2: #e8e6e1;
          --m-text: #c9c7c1;
          --m-text-muted: #8a8a92;
          --m-text-soft: #8a8a92;
          --m-text-faint: #6f6f77;
          --m-text-on-dark: #e8e6e1;
          --m-text-on-dark-muted: #8a8a92;

          --m-surface: #141417;
          --m-surface-alt: #1b1b1f;
          --m-surface-section-dark: #0a0a0c;
          --m-surface-card-dark: #141417;

          --m-border: rgba(255, 255, 255, 0.12);
          --m-border-soft: rgba(255, 255, 255, 0.07);
          --m-border-medium: rgba(255, 255, 255, 0.18);
          --m-border-dark: rgba(255, 255, 255, 0.24);

          --m-success: #2fb85f;
          --m-success-bright: #00C950;
          --m-success-bold: #00BC7D;
          --m-danger: #FB2C36;
          --m-star: #FFBA00;

          --m-radius-sm: 6px;
          --m-radius-md: 8px;
          --m-radius-lg: 10px;
          --m-radius-xl: 16px;
          --m-radius-pill: 9999px;

          /* Hero eyebrow — plain text by default (no pill background, no
             shadow ring, no padding). Toggles can override per scope. */
          --n-hero-eyebrow-bg: transparent;
          --n-hero-eyebrow-shadow: none;
          --n-hero-eyebrow-pad: 0;

          /* How-It-Works cards — lifted to --m-surface-alt with no shadow,
             matching the Risk-Free section card style. */
          --n-howitworks-card-bg: var(--m-surface-alt);
          --n-howitworks-card-shadow: none;

          /* Footer trust-tick + footer link hover — both use the brand
             colour by default. Toggles can override per scope. */
          --n-footer-check: var(--m-brand);
          --n-footer-link-hover: var(--m-brand);

          /* Global font defaults — Mozilla Headline (display + logo) and
             Mozilla Text (sans). Any toggle that wants its own typography
             can override these vars in its scoped block. */
          --m-font-display: var(--font-montserrat), system-ui, sans-serif;
          --m-font-sans: var(--font-inter), system-ui, sans-serif;
          --m-font-wordmark: var(--font-montserrat), serif;
          --m-font-poppins: var(--font-montserrat), sans-serif;
          --m-logo-font: var(--m-font-display);
          --m-logo-weight: 800;
          --m-logo-size: 28px;

          background: #0a0a0c;
          color: var(--m-ink);
          font-family: var(--m-font-sans), ui-sans-serif, system-ui, -apple-system,
            "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .m-display { font-family: var(--m-font-display), system-ui, sans-serif; }
        .m-sans    { font-family: var(--m-font-sans), system-ui, sans-serif; }

        .m-h1 { font-family: var(--m-font-display), serif; font-weight: 700; font-size: 60px; line-height: 68px; letter-spacing: -2.8px; color: var(--m-ink); }
        .m-h2 { font-family: var(--m-font-display), serif; font-weight: 600; font-size: 48px; line-height: 60px; letter-spacing: -1.6px; color: var(--m-ink-deep); }
        .m-h3 { font-family: var(--m-font-display), serif; font-weight: 600; font-size: 24px; line-height: 32px; color: var(--m-ink); }
        .m-eyebrow { font-family: var(--m-font-sans), sans-serif; font-weight: 600; font-size: 14px; line-height: 20px; letter-spacing: 0.7px; text-transform: uppercase; }
        .m-eyebrow-lg { font-family: var(--m-font-sans), sans-serif; font-weight: 600; font-size: 16px; line-height: 24px; letter-spacing: 3.2px; text-transform: uppercase; color: var(--m-text-on-dark-muted); }
        .m-sub { font-family: var(--m-font-sans), sans-serif; font-weight: 400; font-size: 20px; line-height: 32.5px; color: var(--m-text-muted); }
        .m-body { font-family: var(--m-font-sans), sans-serif; font-weight: 400; font-size: 16px; line-height: 24px; color: var(--m-text); }
        .m-body-sm { font-family: var(--m-font-sans), sans-serif; font-weight: 400; font-size: 14px; line-height: 22.75px; color: var(--m-text-muted); }
        .m-cta-lg { font-family: var(--m-font-sans), sans-serif; font-weight: 600; font-size: 20px; line-height: 28px; color: var(--m-on-brand, #FFFFFF); }
        .m-nav { font-family: var(--m-font-sans), sans-serif; font-weight: 600; font-size: 14px; line-height: 24px; }

        @media (max-width: 768px) {
          .m-h1 { font-size: 42px; line-height: 50px; letter-spacing: -1.7px; }
          .m-h2 { font-size: 32px; line-height: 40px; letter-spacing: -1px; white-space: normal !important; }
          .m-h3 { font-size: 20px; line-height: 28px; }
          .m-sub { font-size: 17px; line-height: 27px; }
          .m-cta-lg { font-size: 17px; line-height: 24px; }
        }

        @media (max-width: 480px) {
          .m-h1 { font-size: 34px; line-height: 42px; }
          .m-h2 { font-size: 26px; line-height: 32px; }
        }

        @keyframes m-marquee-left {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .m-marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: m-marquee-left 60s linear infinite;
        }
        .m-marquee-row:hover .m-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .m-marquee-track { animation: none; }
        }

        /* Shared CTA button — class-based hover so it isn't overridden by
           an inline background. Buttons drop their inline background and
           use this instead. */
        .m-cta-btn {
          background: var(--m-brand);
          color: var(--m-on-brand, #FFFFFF);
          transition: background 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
        }
        .m-cta-btn:hover {
          background: var(--m-brand-deep);
        }
        .m-cta-btn:active {
          transform: translateY(1px);
        }

        /* Shared card chrome — 1px border, no hover animation. Cards
           drop their inline border and use this instead. The hover lift
           was removed site-wide because most cards on this page are
           informational (Risk-Free, Built For, How-It-Works, Use Cases,
           Reviews); the lift was implying interactivity that didn't
           exist. Clickable cards (NBlog) get their own affordance via
           the next/link cursor + image scale on hover. */
        .m-card-hover {
          border: 1px solid var(--m-border);
        }

        /* Footer link hover — muted by default, brightens on hover.
           Links drop their inline color and use this instead. */
        .m-footer-link {
          color: var(--m-text-on-dark-muted);
          transition: color 0.15s ease;
        }
        .m-footer-link:hover {
          color: var(--n-footer-link-hover, #FFFFFF);
        }

        /* Scroll-reveal — initial hidden state; NReveal toggles
           .m-reveal-in once the section enters the viewport. */
        .m-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s cubic-bezier(0.23,1,0.32,1), transform 0.6s cubic-bezier(0.23,1,0.32,1);
        }
        .m-reveal-in {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .m-reveal, .m-reveal-in {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .m-cta-btn:active { transform: none; }
        }

        @media (max-width: 768px) {
          .m-theme { overflow-x: hidden; }
        }

        /* Colours that set data-hide-hero-carousel hide the landing hero
           carousel (e.g. the Character.AI theme). */
        .m-theme[data-hide-hero-carousel] [data-n-hero-carousel] { display: none; }


        /* Vermillion Black — a dark theme on the Freepik base: true
           pure-black surfaces (#000000, neutral / no warmth) with the
           vermillion #E7420F CTA. A stark sibling of the warm-toned
           Vermillion toggle. Scoped entirely to this toggle. */
        .m-theme[data-brand-color="vermillion-pure-black"] {
          --m-ink-deep: #FFFFFF;
          --m-ink: #F5F5F5;
          --m-ink-2: #F5F5F5;
          --m-text: #C9C9C9;
          --m-text-muted: #AEAEAE;
          --m-text-soft: #8A8A8A;
          --m-text-faint: #6E6E6E;
          --m-text-on-dark: #F5F5F5;
          --m-text-on-dark-muted: #AEAEAE;

          /* design-L's Mozilla typefaces — carried over from the Freepik base. */
          --m-font-display: var(--font-montserrat), sans-serif;
          --m-font-sans: var(--font-inter), sans-serif;

          /* True pure-black surfaces — neutral, no warmth. Cards lift
             barely a percent off pure black, matching the sync.so
             "almost-not-there" treatment used across all dark toggles. */
          --m-surface: #000000;
          --m-surface-alt: #060607;

          /* Hairline borders — card edges read as a faint single-pixel
             highlight, not a visible outline. */
          --m-border: #161616;
          --m-border-soft: #101010;
          --m-border-medium: #222225;
          --m-border-dark: #161616;

          --n-footer-bg: var(--m-surface);
          --n-footer-border: 1px solid var(--m-border);
          --n-footer-divider: transparent;
          --n-mockup-frame-bg: var(--m-surface);
          --n-mockup-frame-border-css: 2px solid var(--m-brand);
          --n-mockup-frame-shadow: var(--n-pricing-shadow);
          --n-mockup-frame-pad: 0;
          --n-mockups-section-bg: var(--m-surface);
          --n-mockups-bg: var(--m-surface);
          --n-pricing-section-bg: var(--m-surface);
          --m-header-bg: rgba(0,0,0,0.85);
          --m-header-border: rgba(255,255,255,0.1);
          --n-faq-row-bg: #060607;
          --n-cta-band-bg: transparent;
          --n-cta-band-pad: 0;
          --n-cta-btn-bg: var(--m-brand);
          --n-cta-btn-bg-hover: var(--m-brand-deep);
          --n-cta-btn-fg: #FFFFFF;
          /* Monochrome pass — vermillion is the one accent; rating stars and
             no-crosses stay neutral grey. */
          --m-star: #C9C9C9;
          --n-rating-star: #C9C9C9;
          --n-check: #E7420F;
          --m-success: #E7420F;
          --m-success-bright: #E7420F;
          --m-success-bold: #E7420F;
          --n-yes: #E7420F;
          --n-no: #3A3A3A;
          --n-no-mark: #9A9A9A;
          /* Hero highlight figures (4.6M / 180,000+ / 90+ countries / 4.9/5)
             — white instead of the brand vermillion, so they read as bold
             white highlights against the pure-black hero. */
          --n-hero-highlight: #FFFFFF;
          --n-checkout-modal-bg: #060607;
          --n-checkout-strip-bg: #060607;
          /* Shared card treatment (matches sync.so / sync.so Orange):
             - How It Works cards transparent (outline-only via m-card-hover)
             - Use Cases cards filled with surface-alt, no border
             - Category pills hover with brand outline + brand text */
          --n-step-card-bg: var(--m-surface-alt);
          --n-step-card-shadow: none;
          --n-usecase-card-bg: var(--m-surface-alt);
          --n-usecase-card-border: 1px solid transparent;
          --n-pill-hover-border: 1px solid var(--m-brand);
          --n-pill-hover-bg: var(--m-surface);
          --n-pill-hover-color: var(--m-brand);
          --n-pricing-shadow: 0 12px 32px rgba(231,66,15,0.22), 0 2px 10px rgba(0,0,0,0.5);
          /* Logo wordmark — Mozilla Headline 700, white, 28px. */
          --m-logo-font: var(--m-font-display);
          --m-logo-weight: 700;
          --m-logo-size: 28px;
          --m-logo-color: #FFFFFF;
        }

        /* Vermillion Freepik — Vermillion Black's #E7420F CTA on the old
           Freepik graphite base (#0D0D0D page, #18181B cards). More
           "lifted" / grey than charcoal; visible borders since the cards
           aren't hugging the page. Typography inherits the global Mozilla. */
        .m-theme[data-brand-color="vermillion-freepik"] {
          --m-ink-deep: #FFFFFF;
          --m-ink: #F5F5F5;
          --m-ink-2: #F5F5F5;
          --m-text: #C9C9C9;
          --m-text-muted: #AEAEAE;
          --m-text-soft: #8A8A8A;
          --m-text-faint: #6E6E6E;
          --m-text-on-dark: #F5F5F5;
          --m-text-on-dark-muted: #AEAEAE;

          --m-font-display: var(--font-montserrat), sans-serif;
          --m-font-sans: var(--font-inter), sans-serif;

          /* Freepik graphite base. */
          --m-surface: #0D0D0D;
          --m-surface-alt: #18181B;

          /* Freepik visible borders — cards are noticeably lifted so the
             border needs to be visible (hairline would disappear into the
             card fill). */
          --m-border: #2A2A2A;
          --m-border-soft: #1E1E1E;
          --m-border-medium: #3A3A3A;
          --m-border-dark: #2A2A2A;

          --n-footer-bg: var(--m-surface);
          --n-footer-border: 1px solid var(--m-border);
          --n-footer-divider: transparent;
          --n-mockup-frame-bg: var(--m-surface);
          --n-mockup-frame-border-css: 2px solid var(--m-brand);
          --n-mockup-frame-shadow: var(--n-pricing-shadow);
          --n-mockup-frame-pad: 0;
          --n-mockups-section-bg: var(--m-surface);
          --n-mockups-bg: var(--m-surface);
          --n-pricing-section-bg: var(--m-surface);
          --m-header-bg: rgba(13,13,13,0.85);
          --m-header-border: rgba(255,255,255,0.1);
          --n-faq-row-bg: #18181B;
          --n-cta-band-bg: transparent;
          --n-cta-band-pad: 0;
          --n-cta-btn-bg: var(--m-brand);
          --n-cta-btn-bg-hover: var(--m-brand-deep);
          --n-cta-btn-fg: #FFFFFF;
          /* Monochrome pass — vermillion is the one accent. */
          --m-star: #C9C9C9;
          --n-rating-star: #C9C9C9;
          --n-check: #E7420F;
          --m-success: #E7420F;
          --m-success-bright: #E7420F;
          --m-success-bold: #E7420F;
          --n-yes: #E7420F;
          --n-no: #3A3A3A;
          --n-no-mark: #9A9A9A;
          --n-hero-highlight: #FFFFFF;
          --n-checkout-modal-bg: #0D0D0D;
          --n-checkout-strip-bg: #18181B;
          /* Shared card treatment — matches the rest of the dark toggles. */
          --n-step-card-bg: var(--m-surface-alt);
          --n-step-card-shadow: none;
          --n-usecase-card-bg: var(--m-surface-alt);
          --n-usecase-card-border: 1px solid transparent;
          --n-pill-hover-border: 1px solid var(--m-brand);
          --n-pill-hover-bg: var(--m-surface);
          --n-pill-hover-color: var(--m-brand);
          --n-pricing-shadow: 0 12px 32px rgba(231,66,15,0.22), 0 2px 10px rgba(0,0,0,0.5);
          --m-logo-font: var(--m-font-display);
          --m-logo-weight: 700;
          --m-logo-size: 28px;
          --m-logo-color: #FFFFFF;
        }

        /* Vermillion Charcoal — Vermillion Black's #E7420F CTA on Purple
           Black's softer charcoal base (#050505 / #0A0A0A) instead of pure
           black. Same hairline borders + transparent-card treatment as the
           other dark toggles. Typography inherits the global Mozilla. */
        .m-theme[data-brand-color="vermillion-charcoal"] {
          --m-ink-deep: #FFFFFF;
          --m-ink: #F5F5F5;
          --m-ink-2: #F5F5F5;
          --m-text: #C9C9C9;
          --m-text-muted: #AEAEAE;
          --m-text-soft: #8A8A8A;
          --m-text-faint: #6E6E6E;
          --m-text-on-dark: #F5F5F5;
          --m-text-on-dark-muted: #AEAEAE;

          --m-font-display: var(--font-montserrat), sans-serif;
          --m-font-sans: var(--font-inter), sans-serif;

          /* Purple Black's charcoal base — #050505 page, #0A0A0A cards. */
          --m-surface: #050505;
          --m-surface-alt: #0A0A0A;

          /* Hairline borders. */
          --m-border: #161616;
          --m-border-soft: #101010;
          --m-border-medium: #222225;
          --m-border-dark: #161616;

          --n-footer-bg: var(--m-surface);
          --n-footer-border: 1px solid var(--m-border);
          --n-footer-divider: transparent;
          --n-mockup-frame-bg: var(--m-surface);
          --n-mockup-frame-border-css: 2px solid var(--m-brand);
          --n-mockup-frame-shadow: var(--n-pricing-shadow);
          --n-mockup-frame-pad: 0;
          --n-mockups-section-bg: var(--m-surface);
          --n-mockups-bg: var(--m-surface);
          --n-pricing-section-bg: var(--m-surface);
          --m-header-bg: rgba(5,5,5,0.85);
          --m-header-border: rgba(255,255,255,0.1);
          /* Section rhythm — Mockups + FAQ lift to --m-surface-alt so the
             page reads as three breakpoints instead of one continuous dark
             scroll. FAQ rows flip to --m-surface so they still read as
             cards against the lifted section. (Matches Purple Charcoal.) */
          --n-mockups-section-bg: var(--m-surface-alt);
          --n-mockups-bg: var(--m-surface-alt);
          --n-faq-section-bg: var(--m-surface-alt);
          --n-faq-row-bg: var(--m-surface);
          --n-cta-band-bg: transparent;
          --n-cta-band-pad: 0;
          --n-cta-btn-bg: var(--m-brand);
          --n-cta-btn-bg-hover: var(--m-brand-deep);
          --n-cta-btn-fg: #FFFFFF;
          /* Monochrome pass — vermillion is the one accent; rating stars
             and no-crosses stay neutral grey. */
          --m-star: #C9C9C9;
          --n-rating-star: #C9C9C9;
          --n-check: #E7420F;
          --m-success: #E7420F;
          --m-success-bright: #E7420F;
          --m-success-bold: #E7420F;
          --n-yes: #E7420F;
          --n-no: #3A3A3A;
          --n-no-mark: #9A9A9A;
          /* Hero highlight figures — white. */
          --n-hero-highlight: #FFFFFF;
          --n-checkout-modal-bg: #0A0A0A;
          --n-checkout-strip-bg: #0A0A0A;
          /* Shared card treatment — matches the rest of the dark toggles. */
          --n-step-card-bg: var(--m-surface-alt);
          --n-step-card-shadow: none;
          --n-usecase-card-bg: var(--m-surface-alt);
          --n-usecase-card-border: 1px solid transparent;
          --n-pill-hover-border: 1px solid var(--m-brand);
          --n-pill-hover-bg: var(--m-surface);
          --n-pill-hover-color: var(--m-brand);
          --n-pricing-shadow: 0 12px 32px rgba(231,66,15,0.22), 0 2px 10px rgba(0,0,0,0.5);
          /* Audit fixes scoped to Vermillion Charcoal — same pattern as
             Purple Charcoal but with vermillion tint for the Logo.AI wash. */
          --n-compare-logoai-bg: rgba(231, 66, 15, 0.08);
          --n-hero-marquee-card-bg: var(--m-surface-alt);
          --n-faq-row-border: 1px solid var(--m-border);
          --n-pricing-divider: var(--m-border-medium);
          /* Logo wordmark — Mozilla Headline 700, white, 28px. */
          --m-logo-font: var(--m-font-display);
          --m-logo-weight: 700;
          --m-logo-size: 28px;
          --m-logo-color: #FFFFFF;
        }

        /* Electric Violet — vivid electric blue-violet #5A3FE6 picked to
           render IDENTICALLY across browsers/displays. The earlier #0000FF
           / #3322EE pushed the blue channel to 93–100%, sitting right at
           the edge of the sRGB gamut, where Chrome's display-p3 pipeline
           clipped it toward purple while Firefox kept it flat-blue.
           #5A3FE6 sits well inside sRGB so no browser has to clip → same
           look everywhere. Same dark-surface base as the other sync.so
           toggles; typography inherits the global Mozilla. */
        .m-theme[data-brand-color="electric-violet-pure-black"] {
          --m-ink-deep: #FFFFFF;
          --m-ink: #FFFFFF;
          --m-ink-2: #FFFFFF;
          --m-text: #D4D4D4;
          --m-text-muted: #A1A1AA;
          --m-text-soft: #A1A1AA;
          --m-text-faint: #A1A1AA;
          --m-text-on-dark: #FFFFFF;
          --m-text-on-dark-muted: #D4D4D4;

          /* Pure-black surfaces — sync.so's site black. Cards lift barely
             a percent off the page so the fill reads as "almost not there",
             matching sync.so/studios — the previous #0A0B0C was already
             subtle but still photographed as a visible grey block on pure
             black, so drop it another stop. */
          --m-surface: #000000;
          --m-surface-alt: #060607;

          /* Hairline borders — sync.so's card edges read as a faint
             single-pixel highlight. */
          --m-border: #161616;
          --m-border-soft: #101010;
          --m-border-medium: #222225;
          --m-border-dark: #161616;


          --n-footer-bg: var(--m-surface);
          --n-footer-border: 1px solid var(--m-border);
          --n-footer-divider: transparent;
          --n-mockup-frame-bg: var(--m-surface);
          --n-mockup-frame-border-css: 2px solid var(--m-brand);
          --n-mockup-frame-shadow: var(--n-pricing-shadow);
          --n-mockup-frame-pad: 0;
          --n-mockups-section-bg: var(--m-surface);
          --n-mockups-bg: var(--m-surface);
          --n-pricing-section-bg: var(--m-surface);
          --m-header-bg: rgba(0,0,0,0.85);
          --m-header-border: rgba(255,255,255,0.1);
          --n-faq-row-bg: #060607;
          --n-cta-band-bg: transparent;
          --n-cta-band-pad: 0;
          --n-cta-btn-bg: var(--m-brand);
          --n-cta-btn-bg-hover: var(--m-brand-deep);
          --n-cta-btn-fg: #FFFFFF;
          /* Monochrome accent — Electric Violet is the one CTA colour; stars
             + no-crosses stay neutral grey, checks fold into brand. */
          --m-star: #A1A1AA;
          --n-rating-star: #A1A1AA;
          --n-check: #5A3FE6;
          --m-success: #5A3FE6;
          --m-success-bright: #5A3FE6;
          --m-success-bold: #5A3FE6;
          --n-yes: #5A3FE6;
          --n-no: #3A3A3A;
          --n-no-mark: #A1A1AA;
          /* Hero highlight figures — white, same as VB / sync.so. */
          --n-hero-highlight: #FFFFFF;
          --n-checkout-modal-bg: #060607;
          --n-checkout-strip-bg: #060607;
          /* Shared card treatment — matches the rest of the dark toggles:
             transparent How It Works cards, filled Use Cases, brand-
             coloured pill hovers. */
          --n-step-card-bg: var(--m-surface-alt);
          --n-step-card-shadow: none;
          --n-usecase-card-bg: var(--m-surface-alt);
          --n-usecase-card-border: 1px solid transparent;
          --n-pill-hover-border: 1px solid var(--m-brand);
          --n-pill-hover-bg: var(--m-surface);
          --n-pill-hover-color: var(--m-brand);
          --n-pricing-shadow: 0 12px 32px rgba(90,63,230,0.28), 0 2px 10px rgba(0,0,0,0.5);
          /* Logo wordmark — Mozilla Headline 700, white, 28px (inherits
             from the global root; matches VB / sync.so). */
          --m-logo-font: var(--m-font-display);
          --m-logo-weight: 700;
          --m-logo-size: 28px;
          --m-logo-color: #FFFFFF;
        }

        /* Electric Violet Freepik — #5A3FE6 CTA on Freepik's graphite base
           (#0D0D0D / #18181B). Visible borders since the cards are
           noticeably lifted off the page. Typography inherits global Mozilla. */
        .m-theme[data-brand-color="electric-violet-freepik"] {
          --m-ink-deep: #FFFFFF;
          --m-ink: #F5F5F5;
          --m-ink-2: #F5F5F5;
          --m-text: #C9C9C9;
          --m-text-muted: #AEAEAE;
          --m-text-soft: #8A8A8A;
          --m-text-faint: #6E6E6E;
          --m-text-on-dark: #F5F5F5;
          --m-text-on-dark-muted: #AEAEAE;

          --m-font-display: var(--font-montserrat), sans-serif;
          --m-font-sans: var(--font-inter), sans-serif;

          /* Freepik graphite base. */
          --m-surface: #0D0D0D;
          --m-surface-alt: #18181B;

          /* Freepik visible borders. */
          --m-border: #2A2A2A;
          --m-border-soft: #1E1E1E;
          --m-border-medium: #3A3A3A;
          --m-border-dark: #2A2A2A;

          --n-footer-bg: var(--m-surface);
          --n-footer-border: 1px solid var(--m-border);
          --n-footer-divider: transparent;
          --n-mockup-frame-bg: var(--m-surface);
          --n-mockup-frame-border-css: 2px solid var(--m-brand);
          --n-mockup-frame-shadow: var(--n-pricing-shadow);
          --n-mockup-frame-pad: 0;
          --n-mockups-section-bg: var(--m-surface);
          --n-mockups-bg: var(--m-surface);
          --n-pricing-section-bg: var(--m-surface);
          --m-header-bg: rgba(13,13,13,0.85);
          --m-header-border: rgba(255,255,255,0.1);
          --n-faq-row-bg: #18181B;
          --n-cta-band-bg: transparent;
          --n-cta-band-pad: 0;
          --n-cta-btn-bg: var(--m-brand);
          --n-cta-btn-bg-hover: var(--m-brand-deep);
          --n-cta-btn-fg: #FFFFFF;
          --m-star: #C9C9C9;
          --n-rating-star: #C9C9C9;
          --n-check: #5A3FE6;
          --m-success: #5A3FE6;
          --m-success-bright: #5A3FE6;
          --m-success-bold: #5A3FE6;
          --n-yes: #5A3FE6;
          --n-no: #3A3A3A;
          --n-no-mark: #9A9A9A;
          --n-hero-highlight: #FFFFFF;
          --n-checkout-modal-bg: #0D0D0D;
          --n-checkout-strip-bg: #18181B;
          --n-step-card-bg: var(--m-surface-alt);
          --n-step-card-shadow: none;
          --n-usecase-card-bg: var(--m-surface-alt);
          --n-usecase-card-border: 1px solid transparent;
          --n-pill-hover-border: 1px solid var(--m-brand);
          --n-pill-hover-bg: var(--m-surface);
          --n-pill-hover-color: var(--m-brand);
          --n-pricing-shadow: 0 12px 32px rgba(90,63,230,0.28), 0 2px 10px rgba(0,0,0,0.5);
          --m-logo-font: var(--m-font-display);
          --m-logo-weight: 700;
          --m-logo-size: 28px;
          --m-logo-color: #FFFFFF;
        }

        /* Bright Vermillion — punchier sibling of Vermillion Black. CTA
           #FF5A1F is a more energetic orange-red; everything else matches
           the standard dark-toggle treatment. Typography inherits the
           global Mozilla. */
        .m-theme[data-brand-color="bright-vermillion-pure-black"] {
          --m-ink-deep: #FFFFFF;
          --m-ink: #F5F5F5;
          --m-ink-2: #F5F5F5;
          --m-text: #C9C9C9;
          --m-text-muted: #AEAEAE;
          --m-text-soft: #8A8A8A;
          --m-text-faint: #6E6E6E;
          --m-text-on-dark: #F5F5F5;
          --m-text-on-dark-muted: #AEAEAE;

          --m-font-display: var(--font-montserrat), sans-serif;
          --m-font-sans: var(--font-inter), sans-serif;

          /* Pure-black surfaces — cards lift barely a percent off the
             page, matching the rest of the dark toggles. */
          --m-surface: #000000;
          --m-surface-alt: #060607;

          /* Hairline borders. */
          --m-border: #161616;
          --m-border-soft: #101010;
          --m-border-medium: #222225;
          --m-border-dark: #161616;

          --n-footer-bg: var(--m-surface);
          --n-footer-border: 1px solid var(--m-border);
          --n-footer-divider: transparent;
          --n-mockup-frame-bg: var(--m-surface);
          --n-mockup-frame-border-css: 2px solid var(--m-brand);
          --n-mockup-frame-shadow: var(--n-pricing-shadow);
          --n-mockup-frame-pad: 0;
          --n-mockups-section-bg: var(--m-surface);
          --n-mockups-bg: var(--m-surface);
          --n-pricing-section-bg: var(--m-surface);
          --m-header-bg: rgba(0,0,0,0.85);
          --m-header-border: rgba(255,255,255,0.1);
          --n-faq-row-bg: #060607;
          --n-cta-band-bg: transparent;
          --n-cta-band-pad: 0;
          --n-cta-btn-bg: var(--m-brand);
          --n-cta-btn-bg-hover: var(--m-brand-deep);
          --n-cta-btn-fg: #FFFFFF;
          /* Monochrome accent — Bright Vermillion is the one CTA colour;
             stars + no-crosses stay neutral grey, checks fold into brand. */
          --m-star: #C9C9C9;
          --n-rating-star: #C9C9C9;
          --n-check: #FF5A1F;
          --m-success: #FF5A1F;
          --m-success-bright: #FF5A1F;
          --m-success-bold: #FF5A1F;
          --n-yes: #FF5A1F;
          --n-no: #3A3A3A;
          --n-no-mark: #9A9A9A;
          /* Hero highlight figures — white. */
          --n-hero-highlight: #FFFFFF;
          --n-checkout-modal-bg: #060607;
          --n-checkout-strip-bg: #060607;
          /* Shared card treatment — matches the rest of the dark toggles. */
          --n-step-card-bg: var(--m-surface-alt);
          --n-step-card-shadow: none;
          --n-usecase-card-bg: var(--m-surface-alt);
          --n-usecase-card-border: 1px solid transparent;
          --n-pill-hover-border: 1px solid var(--m-brand);
          --n-pill-hover-bg: var(--m-surface);
          --n-pill-hover-color: var(--m-brand);
          --n-pricing-shadow: 0 12px 32px rgba(255,90,31,0.28), 0 2px 10px rgba(0,0,0,0.5);
          /* Logo wordmark — Mozilla Headline 700, white, 28px. */
          --m-logo-font: var(--m-font-display);
          --m-logo-weight: 700;
          --m-logo-size: 28px;
          --m-logo-color: #FFFFFF;
        }

        /* Bright Vermillion Freepik — #FF5A1F CTA on Freepik's graphite
           base (#0D0D0D / #18181B). Visible borders. Typography inherits
           the global Mozilla. */
        .m-theme[data-brand-color="bright-vermillion-freepik"] {
          --m-ink-deep: #FFFFFF;
          --m-ink: #F5F5F5;
          --m-ink-2: #F5F5F5;
          --m-text: #C9C9C9;
          --m-text-muted: #AEAEAE;
          --m-text-soft: #8A8A8A;
          --m-text-faint: #6E6E6E;
          --m-text-on-dark: #F5F5F5;
          --m-text-on-dark-muted: #AEAEAE;

          --m-font-display: var(--font-montserrat), sans-serif;
          --m-font-sans: var(--font-inter), sans-serif;

          --m-surface: #0D0D0D;
          --m-surface-alt: #18181B;

          --m-border: #2A2A2A;
          --m-border-soft: #1E1E1E;
          --m-border-medium: #3A3A3A;
          --m-border-dark: #2A2A2A;

          --n-footer-bg: var(--m-surface);
          --n-footer-border: 1px solid var(--m-border);
          --n-footer-divider: transparent;
          --n-mockup-frame-bg: var(--m-surface);
          --n-mockup-frame-border-css: 2px solid var(--m-brand);
          --n-mockup-frame-shadow: var(--n-pricing-shadow);
          --n-mockup-frame-pad: 0;
          --n-mockups-section-bg: var(--m-surface);
          --n-mockups-bg: var(--m-surface);
          --n-pricing-section-bg: var(--m-surface);
          --m-header-bg: rgba(13,13,13,0.85);
          --m-header-border: rgba(255,255,255,0.1);
          --n-faq-row-bg: #18181B;
          --n-cta-band-bg: transparent;
          --n-cta-band-pad: 0;
          --n-cta-btn-bg: var(--m-brand);
          --n-cta-btn-bg-hover: var(--m-brand-deep);
          --n-cta-btn-fg: #FFFFFF;
          --m-star: #C9C9C9;
          --n-rating-star: #C9C9C9;
          --n-check: #FF5A1F;
          --m-success: #FF5A1F;
          --m-success-bright: #FF5A1F;
          --m-success-bold: #FF5A1F;
          --n-yes: #FF5A1F;
          --n-no: #3A3A3A;
          --n-no-mark: #9A9A9A;
          --n-hero-highlight: #FFFFFF;
          --n-checkout-modal-bg: #0D0D0D;
          --n-checkout-strip-bg: #18181B;
          --n-step-card-bg: var(--m-surface-alt);
          --n-step-card-shadow: none;
          --n-usecase-card-bg: var(--m-surface-alt);
          --n-usecase-card-border: 1px solid transparent;
          --n-pill-hover-border: 1px solid var(--m-brand);
          --n-pill-hover-bg: var(--m-surface);
          --n-pill-hover-color: var(--m-brand);
          --n-pricing-shadow: 0 12px 32px rgba(255,90,31,0.28), 0 2px 10px rgba(0,0,0,0.5);
          --m-logo-font: var(--m-font-display);
          --m-logo-weight: 700;
          --m-logo-size: 28px;
          --m-logo-color: #FFFFFF;
        }

        /* Charcoal Vermillion — Bright Vermillion's #FF5A1F CTA on Purple
           Black's softer charcoal base (#050505 / #0A0A0A) instead of pure
           black. Reads a hair warmer / less "void" than the pure-black
           toggles. Same hairline borders + transparent-card treatment as
           the other dark toggles. Typography inherits the global Mozilla. */
        .m-theme[data-brand-color="bright-vermillion-charcoal"] {
          --m-ink-deep: #FFFFFF;
          --m-ink: #F5F5F5;
          --m-ink-2: #F5F5F5;
          --m-text: #C9C9C9;
          --m-text-muted: #AEAEAE;
          --m-text-soft: #8A8A8A;
          --m-text-faint: #6E6E6E;
          --m-text-on-dark: #F5F5F5;
          --m-text-on-dark-muted: #AEAEAE;

          --m-font-display: var(--font-montserrat), sans-serif;
          --m-font-sans: var(--font-inter), sans-serif;

          /* Purple Black's charcoal base — #050505 page, #0A0A0A cards. */
          --m-surface: #050505;
          --m-surface-alt: #0A0A0A;

          /* Hairline borders. */
          --m-border: #161616;
          --m-border-soft: #101010;
          --m-border-medium: #222225;
          --m-border-dark: #161616;

          --n-footer-bg: var(--m-surface);
          --n-footer-border: 1px solid var(--m-border);
          --n-footer-divider: transparent;
          --n-mockup-frame-bg: var(--m-surface);
          --n-mockup-frame-border-css: 2px solid var(--m-brand);
          --n-mockup-frame-shadow: var(--n-pricing-shadow);
          --n-mockup-frame-pad: 0;
          --n-mockups-section-bg: var(--m-surface);
          --n-mockups-bg: var(--m-surface);
          --n-pricing-section-bg: var(--m-surface);
          --m-header-bg: rgba(5,5,5,0.85);
          --m-header-border: rgba(255,255,255,0.1);
          --n-faq-row-bg: #0A0A0A;
          --n-cta-band-bg: transparent;
          --n-cta-band-pad: 0;
          --n-cta-btn-bg: var(--m-brand);
          --n-cta-btn-bg-hover: var(--m-brand-deep);
          --n-cta-btn-fg: #FFFFFF;
          /* Monochrome accent — Bright Vermillion is the one CTA colour;
             stars + no-crosses stay neutral grey, checks fold into brand. */
          --m-star: #C9C9C9;
          --n-rating-star: #C9C9C9;
          --n-check: #FF5A1F;
          --m-success: #FF5A1F;
          --m-success-bright: #FF5A1F;
          --m-success-bold: #FF5A1F;
          --n-yes: #FF5A1F;
          --n-no: #3A3A3A;
          --n-no-mark: #9A9A9A;
          /* Hero highlight figures — white. */
          --n-hero-highlight: #FFFFFF;
          --n-checkout-modal-bg: #0A0A0A;
          --n-checkout-strip-bg: #0A0A0A;
          /* Shared card treatment — matches the rest of the dark toggles. */
          --n-step-card-bg: var(--m-surface-alt);
          --n-step-card-shadow: none;
          --n-usecase-card-bg: var(--m-surface-alt);
          --n-usecase-card-border: 1px solid transparent;
          --n-pill-hover-border: 1px solid var(--m-brand);
          --n-pill-hover-bg: var(--m-surface);
          --n-pill-hover-color: var(--m-brand);
          --n-pricing-shadow: 0 12px 32px rgba(255,90,31,0.28), 0 2px 10px rgba(0,0,0,0.5);
          /* Logo wordmark — Mozilla Headline 700, white, 28px. */
          --m-logo-font: var(--m-font-display);
          --m-logo-weight: 700;
          --m-logo-size: 28px;
          --m-logo-color: #FFFFFF;
        }


        /* Charcoal Violet — Electric Violet's #5A3FE6 CTA on Purple Black's
           softer charcoal base (#050505 / #0A0A0A) instead of pure black.
           Same hairline borders + transparent-card treatment as the other
           dark toggles. Typography inherits the global Mozilla. */
        .m-theme[data-brand-color="electric-violet-charcoal"] {
          --m-ink-deep: #FFFFFF;
          --m-ink: #F5F5F5;
          --m-ink-2: #F5F5F5;
          --m-text: #C9C9C9;
          --m-text-muted: #AEAEAE;
          --m-text-soft: #8A8A8A;
          --m-text-faint: #6E6E6E;
          --m-text-on-dark: #F5F5F5;
          --m-text-on-dark-muted: #AEAEAE;

          --m-font-display: var(--font-montserrat), sans-serif;
          --m-font-sans: var(--font-inter), sans-serif;

          /* Purple Black's charcoal base — #050505 page, #0A0A0A cards. */
          --m-surface: #050505;
          --m-surface-alt: #0A0A0A;

          /* Hairline borders. */
          --m-border: #161616;
          --m-border-soft: #101010;
          --m-border-medium: #222225;
          --m-border-dark: #161616;

          --n-footer-bg: var(--m-surface);
          --n-footer-border: 1px solid var(--m-border);
          --n-footer-divider: transparent;
          --n-mockup-frame-bg: var(--m-surface);
          --n-mockup-frame-border-css: 2px solid var(--m-brand);
          --n-mockup-frame-shadow: var(--n-pricing-shadow);
          --n-mockup-frame-pad: 0;
          --n-mockups-section-bg: var(--m-surface);
          --n-mockups-bg: var(--m-surface);
          --n-pricing-section-bg: var(--m-surface);
          --m-header-bg: rgba(5,5,5,0.85);
          --m-header-border: rgba(255,255,255,0.1);
          --n-faq-row-bg: #0A0A0A;
          --n-cta-band-bg: transparent;
          --n-cta-band-pad: 0;
          --n-cta-btn-bg: var(--m-brand);
          --n-cta-btn-bg-hover: var(--m-brand-deep);
          --n-cta-btn-fg: #FFFFFF;
          /* Monochrome accent — Electric Violet is the one CTA colour;
             stars + no-crosses stay neutral grey, checks fold into brand. */
          --m-star: #C9C9C9;
          --n-rating-star: #C9C9C9;
          --n-check: #5A3FE6;
          --m-success: #5A3FE6;
          --m-success-bright: #5A3FE6;
          --m-success-bold: #5A3FE6;
          --n-yes: #5A3FE6;
          --n-no: #3A3A3A;
          --n-no-mark: #9A9A9A;
          /* Hero highlight figures — white. */
          --n-hero-highlight: #FFFFFF;
          --n-checkout-modal-bg: #0A0A0A;
          --n-checkout-strip-bg: #0A0A0A;
          /* Shared card treatment — matches the rest of the dark toggles. */
          --n-step-card-bg: var(--m-surface-alt);
          --n-step-card-shadow: none;
          --n-usecase-card-bg: var(--m-surface-alt);
          --n-usecase-card-border: 1px solid transparent;
          --n-pill-hover-border: 1px solid var(--m-brand);
          --n-pill-hover-bg: var(--m-surface);
          --n-pill-hover-color: var(--m-brand);
          --n-pricing-shadow: 0 12px 32px rgba(90,63,230,0.28), 0 2px 10px rgba(0,0,0,0.5);
          /* Logo wordmark — Mozilla Headline 700, white, 28px. */
          --m-logo-font: var(--m-font-display);
          --m-logo-weight: 700;
          --m-logo-size: 28px;
          --m-logo-color: #FFFFFF;
        }

        /* ─────────────────────────────────────────────────────────────
           Vermillion Black — onboarding: centered-minimal layout.
           Same questions, same one-per-step flow. Only the visual
           design changes: massive question-as-headline, generous
           breathing room, no card chrome, vertically-centered content,
           minimal header (no border, ultra-thin progress hairline,
           step-number badge hidden). Typeform / Framer feel.
           ───────────────────────────────────────────────────────────── */

        /* The onboarding now uses the landing-page MHeader directly
           (with hideNav), so logo placement / size / divider are inherited
           from the landing nav automatically — no header overrides needed.
           The remaining VB-only tweaks below target the progress + back
           sub-section (data-n-step-controls). */

        /* Unify the page background to pure black so MHeader (var(--m-surface))
           and the rest of the onboarding share one continuous colour — no
           visible band between header and content. The brand-bg #0C0C0C is
           reserved for alternating sections on the landing page; the
           onboarding doesn't need that mid-tone. */
        .m-theme[data-brand-color="vermillion-pure-black"] [data-n-start] {
          background: var(--m-surface) !important;
        }

        /* Progress + back sub-section — sticky directly below the nav
           (min-h-[68px]) so the progress bar follows the user if the step
           ever overflows. z below the nav so the nav still covers it on
           scroll. */
        .m-theme[data-brand-color="vermillion-pure-black"] [data-n-step-controls] {
          position: sticky;
          top: 68px;
          z-index: 40;
        }
        /* Progress bar — clearer track + vermillion fill so it actually
           reads as a progress bar (not a faint hairline). */
        .m-theme[data-brand-color="vermillion-pure-black"] [data-n-step-controls] > div > div:first-child {
          background: rgba(255,255,255,0.1) !important;
        }
        .m-theme[data-brand-color="vermillion-pure-black"] [data-n-step-controls] > div > div:first-child > div {
          background: var(--m-brand) !important;
        }
        /* Hide the step-number circle — redundant with the progress bar
           above. The back link on the left is the only thing in that row. */
        .m-theme[data-brand-color="vermillion-pure-black"] [data-n-step-controls] span[aria-label^="Step "] {
          display: none !important;
        }

        /* Main content — wider, top-aligned (not vertically centered) so
           the question sits in the upper third and the dropdown / chip
           grid below the input has room to expand without clipping.
           Tighter top padding so most steps fit in one viewport. */
        .m-theme[data-brand-color="vermillion-pure-black"] [data-n-start] > main {
          max-width: 840px !important;
          padding: 32px 24px 140px !important;
        }
        @media (min-width: 768px) {
          .m-theme[data-brand-color="vermillion-pure-black"] [data-n-start] > main {
            padding: 48px 32px 160px !important;
          }
        }

        /* Step heading — smaller than the original Framer-hero size so a
           full step fits in one viewport on a standard laptop. */
        .m-theme[data-brand-color="vermillion-pure-black"] [data-n-start] > main h2.m-display {
          font-size: clamp(24px, 3.8vw, 36px) !important;
          line-height: 1.15 !important;
          letter-spacing: -0.02em !important;
          font-weight: 700 !important;
        }
        /* Subtitle — slightly larger and lighter. */
        .m-theme[data-brand-color="vermillion-pure-black"] [data-n-start] > main h2.m-display + p {
          font-size: 15px !important;
          line-height: 1.5 !important;
          margin-top: 10px !important;
          max-width: 560px !important;
          color: var(--m-text-muted) !important;
        }
        /* Gap between the heading block and the form — generous but no
           longer Framer-extreme so steps fit in viewport. */
        .m-theme[data-brand-color="vermillion-pure-black"] [data-n-start] > main > div > div.text-center:first-child {
          margin-bottom: 28px !important;
        }
        @media (min-width: 768px) {
          .m-theme[data-brand-color="vermillion-pure-black"] [data-n-start] > main > div > div.text-center:first-child {
            margin-bottom: 36px !important;
          }
        }
        /* Description / tagline suggestions — show as a 2-col grid instead of
           a stacked list (the businessplan.ai "ready-to-click answers" feel).
           1 col on mobile so each chip stays readable. */
        .m-theme[data-brand-color="vermillion-pure-black"] [data-n-start] [data-n-suggestions] {
          display: grid !important;
          grid-template-columns: 1fr;
          gap: 10px !important;
        }
        @media (min-width: 640px) {
          .m-theme[data-brand-color="vermillion-pure-black"] [data-n-start] [data-n-suggestions] {
            grid-template-columns: 1fr 1fr;
          }
        }
        .m-theme[data-brand-color="vermillion-pure-black"] [data-n-start] [data-n-suggestions] > button {
          height: 100%;
        }
        /* "We've selected … for your brand" preselect note — restyled in
           VB as a quiet caption line (no pill, no background) so the
           AI-pick signal carries without crowding the step. */
        .m-theme[data-brand-color="vermillion-pure-black"] [data-n-start] [data-n-preselect-note] {
          background: transparent !important;
          padding: 0 !important;
          border-radius: 0 !important;
          color: var(--m-text-soft) !important;
          font-style: italic !important;
          font-size: 13px !important;
          font-weight: 400 !important;
          line-height: 1.5 !important;
        }

        /* Purple Black — a dark theme on the Freepik base: much-darker
           near-pure-black surfaces (#050505) with design-L's purple #7543E3
           CTA. Scoped entirely to this toggle. */
        .m-theme[data-brand-color="purple-charcoal"] {
          --m-ink-deep: #FFFFFF;
          --m-ink: #F5F5F5;
          --m-ink-2: #F5F5F5;
          --m-text: #C9C9C9;
          --m-text-muted: #AEAEAE;
          --m-text-soft: #8A8A8A;
          --m-text-faint: #6E6E6E;
          --m-text-on-dark: #F5F5F5;
          --m-text-on-dark-muted: #AEAEAE;

          --m-font-display: var(--font-montserrat), sans-serif;
          --m-font-sans: var(--font-inter), sans-serif;

          /* Much-darker near-pure-black surfaces. Cards lift just a
             few stops off the page, matching the sync.so "almost-not-
             there" treatment used across all dark toggles. */
          --m-surface: #050505;
          --m-surface-alt: #0A0A0A;

          /* Hairline borders — card edges read as a faint single-pixel
             highlight, not a visible outline. */
          --m-border: #161616;
          --m-border-soft: #101010;
          --m-border-medium: #222225;
          --m-border-dark: #161616;

          --n-footer-bg: var(--m-surface);
          --n-footer-border: 1px solid var(--m-border);
          --n-footer-divider: transparent;
          --n-mockup-frame-bg: var(--m-surface);
          --n-mockup-frame-border-css: 2px solid var(--m-brand);
          --n-mockup-frame-shadow: var(--n-pricing-shadow);
          --n-mockup-frame-pad: 0;
          --n-mockups-section-bg: var(--m-surface);
          --n-mockups-bg: var(--m-surface);
          --n-pricing-section-bg: var(--m-surface);
          --m-header-bg: rgba(5,5,5,0.85);
          --m-header-border: rgba(255,255,255,0.1);
          /* Section rhythm — Mockups + FAQ lift to --m-surface-alt so the
             page reads as three breakpoints instead of one continuous
             dark scroll. FAQ rows flip to --m-surface so they still read
             as cards against the lifted section. */
          --n-mockups-section-bg: var(--m-surface-alt);
          --n-mockups-bg: var(--m-surface-alt);
          --n-faq-section-bg: var(--m-surface-alt);
          --n-faq-row-bg: var(--m-surface);
          --n-cta-band-bg: transparent;
          --n-cta-band-pad: 0;
          --n-cta-btn-bg: var(--m-brand);
          --n-cta-btn-bg-hover: var(--m-brand-deep);
          --n-cta-btn-fg: #FFFFFF;
          --m-star: #C9C9C9;
          --n-rating-star: #C9C9C9;
          --n-check: #7543E3;
          --m-success: #7543E3;
          --m-success-bright: #7543E3;
          --m-success-bold: #7543E3;
          --n-yes: #7543E3;
          --n-no: #3A3A3A;
          --n-no-mark: #9A9A9A;
          /* Hero highlight figures — white on the dark surface. */
          --n-hero-highlight: #FFFFFF;
          --n-checkout-modal-bg: #0A0A0A;
          --n-checkout-strip-bg: #0A0A0A;
          /* Shared card treatment (matches sync.so / sync.so Orange):
             - How It Works cards transparent (outline-only via m-card-hover)
             - Use Cases cards filled with surface-alt, no border
             - Category pills hover with brand outline + brand text */
          --n-step-card-bg: var(--m-surface-alt);
          --n-step-card-shadow: none;
          --n-usecase-card-bg: var(--m-surface-alt);
          --n-usecase-card-border: 1px solid transparent;
          --n-pill-hover-border: 1px solid var(--m-brand);
          --n-pill-hover-bg: var(--m-surface);
          --n-pill-hover-color: var(--m-brand);
          --n-pricing-shadow: 0 12px 32px rgba(117,67,227,0.22), 0 2px 10px rgba(0,0,0,0.5);
          /* Audit fixes scoped to Purple Charcoal only — other toggles use
             their existing var fallbacks unchanged.
             1. Compare table Logo.AI column — brand-tinted highlight so the
                column actually stands out from the surface-alt header row.
             2. Hero marquee cards — lift to surface-alt so dark-backed
                logos sit on a discernible card.
             3. FAQ row border — bump to --m-border so the row edge reads.
             4. Pricing card divider — bump to --m-border-medium so the
                break between price and features is visible. */
          --n-compare-logoai-bg: rgba(117, 67, 227, 0.08);
          --n-hero-marquee-card-bg: var(--m-surface-alt);
          --n-faq-row-border: 1px solid var(--m-border);
          --n-pricing-divider: var(--m-border-medium);
          /* Logo — Freepik's DM Serif wordmark (no font/weight override). */
          --m-logo-size: 28px;
          --m-logo-color: #FFFFFF;
        }

        /* Purple Freepik — Purple Black's #7543E3 CTA on the old Freepik
           graphite base (#0D0D0D page, #18181B cards). More "lifted" /
           grey than charcoal; visible borders since the cards aren't
           hugging the page. Typography inherits the global Mozilla. */
        .m-theme[data-brand-color="purple-freepik"] {
          --m-ink-deep: #FFFFFF;
          --m-ink: #F5F5F5;
          --m-ink-2: #F5F5F5;
          --m-text: #C9C9C9;
          --m-text-muted: #AEAEAE;
          --m-text-soft: #8A8A8A;
          --m-text-faint: #6E6E6E;
          --m-text-on-dark: #F5F5F5;
          --m-text-on-dark-muted: #AEAEAE;

          --m-font-display: var(--font-montserrat), sans-serif;
          --m-font-sans: var(--font-inter), sans-serif;

          /* Freepik graphite base. */
          --m-surface: #0D0D0D;
          --m-surface-alt: #18181B;

          /* Freepik visible borders — cards are noticeably lifted so the
             border needs to be visible (hairline would disappear into the
             card fill). */
          --m-border: #2A2A2A;
          --m-border-soft: #1E1E1E;
          --m-border-medium: #3A3A3A;
          --m-border-dark: #2A2A2A;

          --n-footer-bg: var(--m-surface);
          --n-footer-border: 1px solid var(--m-border);
          --n-footer-divider: transparent;
          --n-mockup-frame-bg: var(--m-surface);
          --n-mockup-frame-border-css: 2px solid var(--m-brand);
          --n-mockup-frame-shadow: var(--n-pricing-shadow);
          --n-mockup-frame-pad: 0;
          --n-mockups-section-bg: var(--m-surface);
          --n-mockups-bg: var(--m-surface);
          --n-pricing-section-bg: var(--m-surface);
          --m-header-bg: rgba(13,13,13,0.85);
          --m-header-border: rgba(255,255,255,0.1);
          --n-faq-row-bg: #18181B;
          --n-cta-band-bg: transparent;
          --n-cta-band-pad: 0;
          --n-cta-btn-bg: var(--m-brand);
          --n-cta-btn-bg-hover: var(--m-brand-deep);
          --n-cta-btn-fg: #FFFFFF;
          --m-star: #C9C9C9;
          --n-rating-star: #C9C9C9;
          --n-check: #7543E3;
          --m-success: #7543E3;
          --m-success-bright: #7543E3;
          --m-success-bold: #7543E3;
          --n-yes: #7543E3;
          --n-no: #3A3A3A;
          --n-no-mark: #9A9A9A;
          --n-hero-highlight: #FFFFFF;
          --n-checkout-modal-bg: #0D0D0D;
          --n-checkout-strip-bg: #18181B;
          /* Shared card treatment — matches the rest of the dark toggles. */
          --n-step-card-bg: var(--m-surface-alt);
          --n-step-card-shadow: none;
          --n-usecase-card-bg: var(--m-surface-alt);
          --n-usecase-card-border: 1px solid transparent;
          --n-pill-hover-border: 1px solid var(--m-brand);
          --n-pill-hover-bg: var(--m-surface);
          --n-pill-hover-color: var(--m-brand);
          --n-pricing-shadow: 0 12px 32px rgba(117,67,227,0.22), 0 2px 10px rgba(0,0,0,0.5);
          --m-logo-size: 28px;
          --m-logo-color: #FFFFFF;
        }

        /* Purple Pure Black — Purple Black's #7543E3 CTA on the same true
           pure-black base as Vermillion Black (#000000 / #060607).
           Hairline borders to match the rest of the pure-black family.
           Typography inherits the global Mozilla. */
        .m-theme[data-brand-color="purple-pure-black"] {
          --m-ink-deep: #FFFFFF;
          --m-ink: #F5F5F5;
          --m-ink-2: #F5F5F5;
          --m-text: #C9C9C9;
          --m-text-muted: #AEAEAE;
          --m-text-soft: #8A8A8A;
          --m-text-faint: #6E6E6E;
          --m-text-on-dark: #F5F5F5;
          --m-text-on-dark-muted: #AEAEAE;

          --m-font-display: var(--font-montserrat), sans-serif;
          --m-font-sans: var(--font-inter), sans-serif;

          /* True pure-black surfaces — same as Vermillion Black. */
          --m-surface: #000000;
          --m-surface-alt: #060607;

          /* Hairline borders. */
          --m-border: #161616;
          --m-border-soft: #101010;
          --m-border-medium: #222225;
          --m-border-dark: #161616;

          --n-footer-bg: var(--m-surface);
          --n-footer-border: 1px solid var(--m-border);
          --n-footer-divider: transparent;
          --n-mockup-frame-bg: var(--m-surface);
          --n-mockup-frame-border-css: 2px solid var(--m-brand);
          --n-mockup-frame-shadow: var(--n-pricing-shadow);
          --n-mockup-frame-pad: 0;
          --n-mockups-section-bg: var(--m-surface);
          --n-mockups-bg: var(--m-surface);
          --n-pricing-section-bg: var(--m-surface);
          --m-header-bg: rgba(0,0,0,0.85);
          --m-header-border: rgba(255,255,255,0.1);
          --n-faq-row-bg: #060607;
          --n-cta-band-bg: transparent;
          --n-cta-band-pad: 0;
          --n-cta-btn-bg: var(--m-brand);
          --n-cta-btn-bg-hover: var(--m-brand-deep);
          --n-cta-btn-fg: #FFFFFF;
          --m-star: #C9C9C9;
          --n-rating-star: #C9C9C9;
          --n-check: #7543E3;
          --m-success: #7543E3;
          --m-success-bright: #7543E3;
          --m-success-bold: #7543E3;
          --n-yes: #7543E3;
          --n-no: #3A3A3A;
          --n-no-mark: #9A9A9A;
          --n-hero-highlight: #FFFFFF;
          --n-checkout-modal-bg: #060607;
          --n-checkout-strip-bg: #060607;
          /* Shared card treatment — matches the rest of the dark toggles. */
          --n-step-card-bg: var(--m-surface-alt);
          --n-step-card-shadow: none;
          --n-usecase-card-bg: var(--m-surface-alt);
          --n-usecase-card-border: 1px solid transparent;
          --n-pill-hover-border: 1px solid var(--m-brand);
          --n-pill-hover-bg: var(--m-surface);
          --n-pill-hover-color: var(--m-brand);
          --n-pricing-shadow: 0 12px 32px rgba(117,67,227,0.22), 0 2px 10px rgba(0,0,0,0.5);
          --m-logo-size: 28px;
          --m-logo-color: #FFFFFF;
        }

      ` }} />
      <div className="m-theme">
        {children}
      </div>
    </>
  )
}
