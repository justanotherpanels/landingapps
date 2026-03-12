import type { Metadata } from "next";
import CityLandingPage from "@/app/components/CityLandingPage";

export const metadata: Metadata = {
    title: "Jasa Gestun Paylater Terpercaya di Bandung | Paylaterku",
    description: "Cari jasa gestun di Bandung? Cairkan limit Paylater & Kartu Kredit kamu dengan mudah. Titip dana murah, aman 100%, dan terpercaya di Bandung Raya.",
    keywords: "gestun bandung, jasa gestun bandung, cairkan paylater bandung, gestun kartu kredit bandung, paylaterku bandung",
    alternates: {
        canonical: "https://www.paylaterku.net/page/bandung",
    },
};

export default function BandungPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        name: "Paylaterku Bandung",
                        description: "Jasa gestun paylater dan kartu kredit terpercaya di Bandung.",
                        url: "https://www.paylaterku.net/page/bandung",
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: "Bandung",
                            addressRegion: "Jawa Barat",
                            addressCountry: "ID",
                        },
                    }),
                }}
            />
            <CityLandingPage
                cityName="Bandung"
                heroHeadline={
                    <>
                        Pencairan Limit{" "}
                        <span
                            className="block bg-clip-text text-transparent"
                            style={{ backgroundImage: "linear-gradient(90deg, #a78bfa, #38bdf8, #34d399)" }}
                        >
                            Paylater & CC
                        </span>{" "}
                        di Bandung
                    </>
                }
                heroDescription="Warga Bandung dan sekitarnya, butuh dana cepat dan aman? Kami adalah jasa gestun terfavorit dengan fee terjangkau, proses cepat tanpa keluar rumah, semua serba otomatis via sistem."
            />
        </>
    );
}
