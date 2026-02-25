import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Best AI Logo Generator — Logo.ai",
  description:
    "Get your custom logo in seconds—original, professional, and tailored to your brand. Free logos for the first 500,000 users. Sign up to claim yours today.",
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
