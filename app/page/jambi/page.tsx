import type { Metadata } from "next";
import CityLandingPage from "@/app/components/CityLandingPage";

export const metadata: Metadata = {
    title: "Jasa Gestun Paylater & Kartu Kredit di Jambi | Paylaterku",
    description: "Butuh pencairan dana paylater atau cc di Jambi? Kami beri layanan gestun terbaik, fee flat, otomatis by sistem. Tidak perlu chat bertele-tele.",
    keywords: "gestun jambi, jasa gestun jambi, gestun kartu kredit jambi, paylaterku jambi, gestun cepat jambi",
    alternates: {
        canonical: "https://www.paylaterku.net/page/jambi",
    },
};

export default function JambiPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        name: "Paylaterku Jambi",
                        description: "Jasa gestun paylater dan kartu kredit terpercaya di Jambi.",
                        url: "https://www.paylaterku.net/page/jambi",
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: "Jambi",
                            addressRegion: "Jambi",
                            addressCountry: "ID",
                        },
                    }),
                }}
            />
            <CityLandingPage
                cityName="Jambi"
                heroHeadline={
                    <>
                        Solusi Gestun{" "}
                        <span
                            className="block bg-clip-text text-transparent"
                            style={{ backgroundImage: "linear-gradient(90deg, #a78bfa, #38bdf8, #34d399)" }}
                        >
                            Tanpa Ribet
                        </span>{" "}
                        Untuk Area Jambi
                    </>
                }
                heroDescription="Warga kota Jambi yang butuh dana tambahan dari limit Paylater. Cukup proses secara online kapanpun, kami transparan terkait fee sejak awal."
            />
        </>
    );
}
