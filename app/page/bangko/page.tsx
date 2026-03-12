import type { Metadata } from "next";
import CityLandingPage from "@/app/components/CityLandingPage";

export const metadata: Metadata = {
    title: "Jasa Gestun Paylater Aman & Murah di Bangko | Paylaterku",
    description: "Layanan gestun area Bangko untuk Paylater & CC. Solusi mudah, cepat cair, terpercaya tanpa biaya tersembunyi. Khusus warga Bangko dan sekitarnya.",
    keywords: "gestun bangko, jasa gestun bangko, pencairan paylater bangko, gestun kartu kredit bangko, paylaterku bangko",
    alternates: {
        canonical: "https://www.paylaterku.net/page/bangko",
    },
};

export default function BangkoPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        name: "Paylaterku Bangko",
                        description: "Jasa gestun paylater dan kartu kredit terpercaya di Bangko.",
                        url: "https://www.paylaterku.net/page/bangko",
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: "Bangko",
                            addressRegion: "Jambi",
                            addressCountry: "ID",
                        },
                    }),
                }}
            />
            <CityLandingPage
                cityName="Bangko"
                heroHeadline={
                    <>
                        Jasa Gestun{" "}
                        <span
                            className="block bg-clip-text text-transparent"
                            style={{ backgroundImage: "linear-gradient(90deg, #a78bfa, #38bdf8, #34d399)" }}
                        >
                            Cepat & Aman
                        </span>{" "}
                        di Bangko
                    </>
                }
                heroDescription="Tinggal di Bangko? Cairkan limit e-wallet Anda secara praktis tanpa repot. Nikmati layanan gestun dengan sistem online 100% aman, transparan, serta jaminan proses langsung masuk ke rekening."
            />
        </>
    );
}
