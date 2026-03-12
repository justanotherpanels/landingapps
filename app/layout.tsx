import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://paylaterku.net"; // Ganti dengan domain asli Anda

export const metadata: Metadata = {
  // ─── Basic SEO ───────────────────────────────────────────────
  title: {
    default: "Jasa Gestun Paylater Terpercaya di Semarang | Paylaterku",
    template: "%s | Paylaterku",
  },
  description:
    "Paylaterku – Jasa gestun paylater dan kartu kredit terpercaya di Semarang. Fee termurah, proses mudah by sistem, aman 100%. Cairkan limit Shopee Paylater, GoPaylater, Kredivo, Akulaku & lebih banyak lagi!",
  keywords: [
    "gestun paylater",
    "jasa gestun",
    "gestun kartu kredit",
    "gestun semarang",
    "cairkan paylater",
    "shopee paylater gestun",
    "gopaylater gestun",
    "kredivo gestun",
    "akulaku gestun",
    "paylaterku",
    "jasa gestun terpercaya",
    "gestun murah",
  ],
  authors: [{ name: "Paylaterku", url: BASE_URL }],
  creator: "Paylaterku",
  publisher: "Paylaterku",
  metadataBase: new URL(BASE_URL),

  // ─── Canonical & Robots ──────────────────────────────────────
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ─── Open Graph (Facebook, WhatsApp, Telegram, dll) ──────────
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
    siteName: "Paylaterku",
    title: "Jasa Gestun Paylater Terpercaya di Semarang | Paylaterku",
    description:
      "Cairkan limit Paylater & Kartu Kredit kamu dengan mudah. Fee termurah, proses by sistem, aman 100%. Tersedia untuk Shopee Paylater, GoPaylater, Kredivo, Akulaku & lainnya!",
    images: [
      {
        url: "/seo/pixel.png",
        width: 1200,
        height: 630,
        alt: "Paylaterku – Jasa Gestun Paylater Terpercaya di Semarang",
        type: "image/png",
      },
    ],
  },

  // ─── Twitter Card ─────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@paylaterku",
    creator: "@paylaterku",
    title: "Jasa Gestun Paylater Terpercaya di Semarang | Paylaterku",
    description:
      "Cairkan limit Paylater & Kartu Kredit kamu dengan mudah. Fee termurah, proses by sistem, aman 100%!",
    images: ["/seo/pixel.png"],
  },

  // ─── App & Icons ─────────────────────────────────────────────
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/seo/pixel.png",
  },

  // ─── Verification (opsional, isi jika ada) ───────────────────
  // verification: {
  //   google: "GOOGLE_VERIFICATION_CODE",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Paylaterku",
    description:
      "Jasa gestun paylater dan kartu kredit terpercaya di Semarang. Fee termurah, proses mudah by sistem.",
    url: BASE_URL,
    logo: `${BASE_URL}/seo/pixel.png`,
    image: `${BASE_URL}/seo/pixel.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Semarang",
      addressRegion: "Jawa Tengah",
      addressCountry: "ID",
    },
    areaServed: "Indonesia",
    serviceType: "Gestun Paylater dan Kartu Kredit",
    priceRange: "Rp 100.000 - Rp 50.000.000",
    currenciesAccepted: "IDR",
    knowsAbout: [
      "Shopee Paylater",
      "GoPaylater",
      "Kredivo",
      "Akulaku",
      "Kartu Kredit",
      "Gestun",
    ],
  };

  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* JSON-LD Structured Data untuk Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

