import type { Metadata } from "next";
import CityLandingPage from "@/app/components/CityLandingPage";

export const metadata: Metadata = {
    title: "Jasa Gestun Paylater Terpercaya Jabodetabek | Paylaterku Jakarta",
    description: "Cari jasa gestun di Jakarta? Kami bantu cairkan limit Paylater & Kartu Kredit kamu 24 jam nonstop dari mana saja. Cepat, murah, aman dan langsung cair.",
    keywords: "gestun jakarta, jasa gestun jakarta, cairkan paylater jakarta, gestun kartu kredit jakarta, paylaterku jakarta, gestun jabodetabek",
    alternates: {
        canonical: "https://www.paylaterku.net/page/jakarta",
    },
};

export default function JakartaPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        name: "Paylaterku Jakarta",
                        description: "Jasa gestun paylater dan kartu kredit terpercaya di Jakarta.",
                        url: "https://www.paylaterku.net/page/jakarta",
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: "Jakarta",
                            addressRegion: "DKI Jakarta",
                            addressCountry: "ID",
                        },
                    }),
                }}
            />
            <CityLandingPage
                cityName="Jakarta"
                heroHeadline={
                    <>
                        Layanan Gestun{" "}
                        <span
                            className="block bg-clip-text text-transparent"
                            style={{ backgroundImage: "linear-gradient(90deg, #a78bfa, #38bdf8, #34d399)" }}
                        >
                            Cepat & Resmi
                        </span>{" "}
                        Area Jakarta
                    </>
                }
                heroDescription="Bagi Anda warga Ibukota Jakarta dan Jabodetabek yang sibuk, percayakan pencairan limit pada kami. Menggunakan sistem otomatis beroperasi 24/7 tanpa ribet."
            />
        </>
    );
}
