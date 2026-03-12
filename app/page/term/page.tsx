import React from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertCircle, CheckCircle2, Scale, HelpCircle } from 'lucide-react';

export default function TermsConditions() {
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
                    <h1 className="text-3xl md:text-4xl font-black mb-4">Syarat & Ketentuan</h1>
                    <p className="text-slate-400 text-sm italic">Terakhir diperbarui: Maret 2026</p>
                </section>

                <div className="space-y-12 mb-16">
                    {/* Item 1 */}
                    <div className="relative pl-8 border-l-2 border-orange-500/30">
                        <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-orange-600 shadow-[0_0_15px_rgba(234,88,12,0.5)]"></div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Scale size={20} className="text-orange-500" /> 1. Ketentuan Umum
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Dengan menggunakan layanan Paylaterku, Anda setuju untuk terikat oleh syarat dan ketentuan ini. Layanan kami adalah perantara pencairan limit yang sah secara prosedural sesuai dengan aturan tiap platform.
                        </p>
                    </div>

                    {/* Item 2 */}
                    <div className="relative pl-8 border-l-2 border-indigo-500/30">
                        <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.5)]"></div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <CheckCircle2 size={20} className="text-indigo-500" /> 2. Kewajiban Pengguna
                        </h3>
                        <ul className="list-disc list-inside text-slate-400 text-sm space-y-2 leading-relaxed">
                            <li>Pengguna wajib memberikan data yang akurat dan milik sendiri.</li>
                            <li>Dilarang menggunakan data orang lain tanpa izin tertulis.</li>
                            <li>Pengguna memahami bahwa limit yang dicairkan adalah tanggung jawab pengguna untuk melunasi ke platform terkait.</li>
                        </ul>
                    </div>

                    {/* Item 3 */}
                    <div className="relative pl-8 border-l-2 border-emerald-500/30">
                        <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <AlertCircle size={20} className="text-emerald-500" /> 3. Biaya Layanan (Fee)
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Setiap transaksi dikenakan biaya administrasi (fee) yang bervariasi tergantung pada platform dan nominal pencairan. Biaya ini akan ditampilkan secara transparan sebelum Anda menyetujui transaksi.
                        </p>
                    </div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-3xl mb-16">
                    <div className="flex gap-4">
                        <div className="shrink-0 text-emerald-400">
                            <HelpCircle size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-emerald-400 mb-2 font-sans">Penting</h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Paylaterku tidak bertanggung jawab atas kegagalan pembayaran tagihan Anda di platform asal. Kami hanya melayani proses pencairan limit yang tersedia menjadi saldo tunai.
                            </p>
                        </div>
                    </div>
                </div>

                <footer className="border-t border-white/5 pt-10 text-center">
                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} Paylaterku
                    </p>
                </footer>
            </main>
        </div>
    );
}
