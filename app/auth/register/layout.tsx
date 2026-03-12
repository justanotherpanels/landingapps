import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Daftar Akun Paylaterku - Solusi Pencairan Limit Terpercaya",
    description: "Daftar sekarang di Paylaterku untuk menikmati kemudahan pencairan limit Paylater dan Kartu Kredit dengan proses cepat dan aman.",
    openGraph: {
        title: "Daftar Akun Paylaterku",
        description: "Solusi Pencairan Limit Paylater Terpercaya & Aman",
        images: ["/logo.png"],
    },
};

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
