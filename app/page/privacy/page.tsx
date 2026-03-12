import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, EyeOff, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
    const sections = [
        {
            icon: <Lock size={20} />,
            title: "Pengumpulan Informasi",
            desc: "Kami mengumpulkan informasi yang Anda berikan saat mendaftar, termasuk nama, nomor telepon, dan data akun e-wallet untuk keperluan proses verifikasi dan pencairan dana."
        },
        {
            icon: <Shield size={20} />,
            title: "Penggunaan Data",
            desc: "Data Anda hanya digunakan untuk memproses transaksi pencairan limit Anda. Kami tidak akan pernah menjual atau membagikan data pribadi Anda kepada pihak ketiga untuk tujuan pemasaran."
        },
        {
            icon: <EyeOff size={20} />,
            title: "Keamanan Data",
            desc: "Kami menerapkan standar keamanan siber yang ketat. Semua koneksi data dienkripsi menggunakan protokol SSL untuk melindungi informasi Anda dari akses yang tidak sah."
        },
        {
            icon: <FileText size={20} />,
            title: "Pembaruan Kebijakan",
            desc: "Kami berhak memperbarui kebijakan privasi ini sewaktu-waktu. Perubahan akan diinformasikan melalui halaman ini atau notifikasi langsung ke akun Anda."
        }
    ];

    return (
        <div 
            className="min-h-screen font-sans tracking-tight text-white pb-10"
            style={{
                backgroundColor: "#0f0c29",
                backgroundImage: "linear-gradient(135deg, #0f0c29 0%, #1a1040 35%, #212044 60%, #0f1a2e 100%)",
                backgroundAttachment: "fixed",
            }}
        >
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-md">
                <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
                    <Link href="/" className="flex items-center gap-2.5">
                        <img src="/logo.png" alt="Paylaterku Logo" className="h-10 w-auto object-contain" />
                    </Link>
                    <Link href="/" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-2">
                        <ArrowLeft size={16} /> Kembali
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-3xl px-6 pt-12">
                <section className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-black mb-4">Kebijakan Privasi</h1>
                    <p className="text-slate-400 text-sm italic">Terakhir diperbarui: Maret 2026</p>
                </section>

                <div className="space-y-8 mb-16">
                    {sections.map((section, index) => (
                        <div key={index} className="flex gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="shrink-0 w-12 h-12 bg-orange-600/20 text-orange-500 rounded-2xl flex items-center justify-center">
                                {section.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-2">{section.title}</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">{section.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <section className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900/40 to-black/20 border border-white/5 mb-16">
                    <h2 className="text-xl font-bold mb-4">Hubungi Kami</h2>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini, silakan hubungi tim dukungan kami melalui layanan Live Chat di dashboard Anda atau melalui email resmi kami.
                    </p>
                </section>

                <footer className="border-t border-white/5 pt-10 text-center">
                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} Paylaterku
                    </p>
                </footer>
            </main>
        </div>
    );
}
