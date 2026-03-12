import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mulailah dengan Paylaterku untuk Pencairan Limitmu",
  description: "Masuk ke akun Paylaterku Anda. Cairkan limit Paylater & Kartu Kredit dengan mudah, aman, dan terpercaya. Jasa gestun resmi dengan fee transparan dan proses otomatis.",
  openGraph: {
    title: "Mulailah dengan Paylaterku untuk Pencairan Limitmu",
    description: "Masuk ke akun Paylaterku Anda. Cairkan limit Paylater & Kartu Kredit dengan aman, cepat, dan terpercaya.",
    url: "https://paylaterku.net/auth/login",
    siteName: "Paylaterku",
    images: [
      {
        url: "/seo/pixel.png",
        width: 1200,
        height: 630,
        alt: "Paylaterku - Pencairan Limit Terpercaya",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mulailah dengan Paylaterku untuk Pencairan Limitmu",
    description: "Cairkan limit Paylater & Kartu Kredit Anda dengan aman di Paylaterku. Proses otomatis 24/7.",
    images: ["/seo/pixel.png"],
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
