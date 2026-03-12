import type { Metadata } from "next";
import CityLandingPage from "@/app/components/CityLandingPage";

export const metadata: Metadata = {
    title: "Gestun Medan - Cair Paylater & Kartu Kredit Terpercaya | Paylaterku",
    description: "Layanan gestun online 24 jam termurah di Medan. Pencairan Shopee Paylater, Kredivo, hingga semua Kartu Kredit visa/mastercard dalam hitungan menit secara otomatis.",
    keywords: "gestun medan, jasa gestun medan, gestun paylater medan, gestun kartu kredit medan, paylaterku medan",
    alternates: {
        canonical: "https://www.paylaterku.net/page/medan",
    },
};

export default function MedanPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        name: "Paylaterku Medan",
                        description: "Jasa gestun paylater dan kartu kredit online di Medan.",
                        url: "https://www.paylaterku.net/page/medan",
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: "Medan",
                            addressRegion: "Sumatera Utara",
                            addressCountry: "ID",
                        },
                    }),
                }}
            />
            <CityLandingPage
                cityName="Medan"
                heroHeadline={
                    <>
                        Tempat Cairkan{" "}
                        <span
                            className="block bg-clip-text text-transparent"
                            style={{ backgroundImage: "linear-gradient(90deg, #a78bfa, #38bdf8, #34d399)" }}
                        >
                            Limit Terbaik
                        </span>{" "}
                        di Metropolitan Medan
                    </>
                }
                heroDescription="Horas Medan! Temukan jasa gesek tunai paling mutakhir. Kami menggunakan sistem sehingga Anda tidak perlu repot cari admin. Klik, pilih layanan, dan dana landing di rekening!"
            />
        </>
    );
}
