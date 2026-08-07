import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kitsu Digital — Premium Digital Products That Convert",
  description:
    "We build high-converting websites, SaaS platforms, and digital experiences for ambitious brands. 147+ projects delivered, $12M+ revenue generated for clients.",
  keywords: [
    "digital agency",
    "web development",
    "UI/UX design",
    "SaaS development",
    "e-commerce",
    "AI automation",
    "branding",
    "SEO",
    "landing pages",
  ],
  authors: [{ name: "Kitsu Digital" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Kitsu Digital — Premium Digital Products That Convert",
    description:
      "We build high-converting websites, SaaS platforms, and digital experiences for ambitious brands.",
    url: "https://kitsudigital.com",
    siteName: "Kitsu Digital",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitsu Digital — Premium Digital Products That Convert",
    description:
      "We build high-converting websites, SaaS platforms, and digital experiences for ambitious brands.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kitsu Digital",
    description:
      "Premium digital agency building high-converting websites, SaaS platforms, and digital experiences.",
    url: "https://kitsudigital.com",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["English"],
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jakarta.variable} ${grotesk.variable} antialiased`}
        style={{
          backgroundColor: "#0A0A0F",
          color: "#FFFFFF",
          fontFamily: "var(--font-inter), sans-serif",
        }}
      >
        <div className="noise-overlay" aria-hidden="true" />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
