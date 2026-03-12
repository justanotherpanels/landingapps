import type { Metadata } from "next";
import CityLandingPage from "@/app/components/CityLandingPage";

export const metadata: Metadata = {
    title: "Jasa Gestun Paylater di Pontianak - Cepat Cair & Aman | Paylaterku",
    description: "Cairkan limit kredit paylater, Kredivo, Shopee Paylater Anda dengan fee paling ramah di Pontianak. Transaksi sepenuhnya online dalam satu dashboard aman.",
    keywords: "gestun pontianak, jasa gestun pontianak, paylater pontianak, gestun murah pontianak, gestun cc pontianak",
    alternates: {
        canonical: "https://www.paylaterku.net/page/pontianak",
    },
};

export default function PontianakPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        name: "Paylaterku Pontianak",
                        description: "Jasa gestun online di Pontianak, aman dan proses cepat.",
                        url: "https://www.paylaterku.net/page/pontianak",
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: "Pontianak",
                            addressRegion: "Kalimantan Barat",
                            addressCountry: "ID",
                        },
                    }),
                }}
            />
            <CityLandingPage
                cityName="Pontianak"
                heroHeadline={
                    <>
                        Proses Gestun{" "}
                        <span
                            className="block bg-clip-text text-transparent"
                            style={{ backgroundImage: "linear-gradient(90deg, #a78bfa, #38bdf8, #34d399)" }}
                        >
                            100% Digital
                        </span>{" "}
                        dari Pontianak
                    </>
                }
                heroDescription="Khatulistiwa menyapa! Saatnya wujudkan kebutuhan Anda dengan merubah saldo paylater dan cc menjadi uang tunai aman, tak perlu keluar biaya lebih. Flat fee dan proses anti spam hanya di Paylaterku!"
            />
        </>
    );
}
