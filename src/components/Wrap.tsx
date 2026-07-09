import type { ComponentPropsWithoutRef } from "react";

/**
 * Centered content container — max width with responsive horizontal padding.
 * Mirrors the original `.wrap` (max-width:1080px; padding:0 40px, 22px on
 * small screens). Extra props (e.g. data-reveal) are forwarded to the div.
 */
export default function Wrap({
  children,
  className = "",
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...rest}
      className={`mx-auto w-full max-w-[1080px] px-[22px] sm:px-10 ${className}`}
    >
      {children}
    </div>
  );
}
