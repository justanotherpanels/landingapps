import type { Metadata } from "next";
import CityLandingPage from "@/app/components/CityLandingPage";

export const metadata: Metadata = {
    title: "Gestun Singkawang Online Aman | Jasa Gestun Paylaterku",
    description: "Bingung cari jasa gestun yang berjejaring kuat di Singkawang? Layanan online kami menjamin proteksi data bank & e-wallet untuk pencairan berbagai paylater.",
    keywords: "gestun singkawang, jasa gestun singkawang, paylater singkawang, gestun online singkawang",
    alternates: {
        canonical: "https://www.paylaterku.net/page/singkawang",
    },
};

export default function SingkawangPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        name: "Paylaterku Singkawang",
                        description: "Jasa gestun online dan cc terpecaya di Singkawang.",
                        url: "https://www.paylaterku.net/page/singkawang",
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: "Singkawang",
                            addressRegion: "Kalimantan Barat",
                            addressCountry: "ID",
                        },
                    }),
                }}
            />
            <CityLandingPage
                cityName="Singkawang"
                heroHeadline={
                    <>
                        Layanan Gestun{" "}
                        <span
                            className="block bg-clip-text text-transparent"
                            style={{ backgroundImage: "linear-gradient(90deg, #a78bfa, #38bdf8, #34d399)" }}
                        >
                            Fleksibel
                        </span>{" "}
                        di Singkawang
                    </>
                }
                heroDescription="Bagi kawan-kawan Singkawang, sekarang dana cepat bisa cair dalam genggaman. Hanya registrasi 1-menit di Paylaterku, limit paylater segera berubah jadi saldo bank atau e-wallet."
            />
        </>
    );
}
