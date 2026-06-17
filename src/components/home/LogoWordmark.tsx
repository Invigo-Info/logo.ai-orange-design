/**
 * The LOGO.AI lockup — the linked orange rings + a Montserrat wordmark with a
 * square slab-style period. The wordmark uses `currentColor`; the rings keep
 * the brand orange; the weight follows --logo-weight (default 800). "LOGO" is
 * locked to a fixed advance (textLength) so the square dot + "AI" stay put at
 * any weight.
 */
export default function LogoWordmark({
  className = "",
  label = "LOGO.AI",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 218 43.74"
      className={`logo-wordmark block w-auto ${className}`}
    >
      {/* linked rings */}
      <g transform="translate(6.00,35.10)">
        <g
          fill="none"
          stroke="#ff5a1f"
          strokeWidth="7.50"
          transform="translate(24.53,-13.23) scale(0.85) translate(-24.53,13.23)"
        >
          <circle cx="15.87" cy="-13.23" r="12.12" />
          <circle cx="33.19" cy="-13.23" r="12.12" />
        </g>
      </g>

      {/* wordmark */}
      <g transform="translate(6.00,35.10)">
        <text
          className="logo-text"
          x="58"
          y="0"
          fontSize="36"
          textLength="104"
          lengthAdjust="spacing"
        >
          LOGO
        </text>
        <rect className="logo-dot-sq" x="164" y="-6.5" width="6.5" height="6.5" />
        <text className="logo-text" x="172" y="0" fontSize="36">
          AI
        </text>
      </g>
    </svg>
  );
}
