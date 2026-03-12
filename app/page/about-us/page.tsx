import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, ShieldCheck, Heart, Users } from 'lucide-react';

export default function AboutUs() {
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
                <section className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-500">
                        Tentang Paylaterku
                    </h1>
                    <p className="text-slate-300 text-lg leading-relaxed">
                        Kami adalah platform jasa pencairan limit (gestun) terpercaya yang berkomitmen memberikan solusi keuangan cepat, aman, dan transparan bagi seluruh masyarakat Indonesia.
                    </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
                        <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-600/20">
                            <Heart size={24} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Misi Kami</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Membantu pengguna mengoptimalkan limit kredit mereka dengan proses yang paling efisien, biaya paling rendah, dan keamanan data yang terjamin.
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
                        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-600/20">
                            <Zap size={24} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Visi Kami</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Menjadi jasa gestun nomor satu di Indonesia yang dikenal karena kejujuran, kecepatan, dan sistem otomatisasi yang memudahkan pelanggan 24/7.
                        </p>
                    </div>
                </div>

                <section className="mb-16">
                    <h2 className="text-2xl font-black mb-8">Kenapa Memilih Kami?</h2>
                    <ul className="space-y-6">
                        <li className="flex gap-4">
                            <div className="shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                <ShieldCheck size={16} />
                            </div>
                            <div>
                                <h4 className="font-bold mb-1">Keamanan Prioritas Utama</h4>
                                <p className="text-slate-400 text-sm">Sistem kami menggunakan enkripsi tingkat tinggi untuk memastikan setiap transaksi dan data pribadi Anda tetap privat.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="shrink-0 w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                                <Users size={16} />
                            </div>
                            <div>
                                <h4 className="font-bold mb-1">50.000+ Pelanggan Puas</h4>
                                <p className="text-slate-400 text-sm">Kepercayaan adalah modal kami. Ribuan testimoni positif membuktikan kualitas layanan yang kami berikan.</p>
                            </div>
                        </li>
                    </ul>
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
