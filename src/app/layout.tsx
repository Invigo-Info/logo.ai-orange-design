import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "World’s Best AI Logo Generator — Logo.ai",
  description:
    "Create a custom logo in seconds. Secure your free logo at launch—first 1,000,000 users only. Join the waitlist now. No credit card required.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,700&family=Outfit:wght@300;400;500;600;700;800&family=Sora:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-b0 text-cream overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
