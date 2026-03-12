"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Zap, Calendar, Share2, Copy } from 'lucide-react';

export default function NewsShowPage() {
    // Data statik detail (Mockup) untuk demo
    const promoDetail = {
        title: "Cashback Spesial 50% untuk Top Up PLN",
        date: "Berlaku hingga 31 Mar 2026",
        imageUrl: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1000&h=600&fit=crop",
        code: "PLNHEMAT50",
        description: "Nikmati kemudahan dalam membayar tagihan dan isi ulang token listrik PLN Anda. Khusus di bulan ini, dapatkan langsung cashback sebesar 50% (maksimal Rp 50.000) untuk minimal transaksi Rp 100.000 dengan menggunakan kode promo di bawah.",
        terms: [
            "Promo berlaku untuk semua pengguna yang sudah melakukan verifikasi akun.",
            "Cashback akan diberikan dalam bentuk Poin/Saldo paling lambat 1x24 jam setelah transaksi berhasil.",
            "Promo hanya dapat digunakan 1x per pengguna selama periode program berlangsung.",
            "Tidak dapat digabungkan dengan promo lainnya.",
            "Syarat dan ketentuan dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya."
        ]
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center font-sans">
            <div className="w-full lg:max-w-5xl mx-auto bg-white min-h-screen lg:shadow-2xl relative overflow-hidden flex flex-col">

                {/* Header Navbar Transparent Over Image */}
                <div className="absolute top-0 w-full z-50 flex justify-between items-center px-6 md:px-10 py-6">
                    <Link href="/user/news" className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center transition-colors hover:bg-black/50">
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </Link>
                    <button className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center transition-colors hover:bg-black/50">
                        <Share2 className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Hero Image */}
                <div className="w-full h-72 md:h-96 relative">
                    <img src={promoDetail.imageUrl} alt="Promo Banner" className="w-full h-full object-cover" />
                    {/* Gradient Overlay for smooth transition */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                </div>

                {/* Content Details */}
                <div className="flex-1 overflow-y-auto px-6 md:px-10 pt-4 pb-32 -mt-10 relative z-10 bg-white rounded-t-3xl">

                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-orange-100 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                            <Zap className="w-4 h-4 text-orange-500" />
                            <span className="text-xs font-bold text-orange-600">Promo Khusus</span>
                        </div>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 leading-tight mb-4">{promoDetail.title}</h1>

                    <div className="flex items-center gap-2 text-gray-500 mb-8">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">{promoDetail.date}</span>
                    </div>

                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-8 flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-500"></div>
                        <p className="text-xs text-gray-500 font-medium mb-1">Gunakan Kode Promo</p>
                        <div className="flex items-center gap-4 mt-2">
                            <span className="text-2xl font-black tracking-widest text-gray-800 border-2 border-dashed border-gray-300 px-6 py-2 rounded-xl bg-white">{promoDetail.code}</span>
                        </div>
                        <button className="mt-4 flex items-center gap-2 text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors bg-orange-50 px-4 py-2 rounded-full">
                            <Copy className="w-4 h-4" />
                            Salin Kode
                        </button>
                    </div>

                    <div className="mb-8">
                        <h3 className="font-bold text-gray-800 text-lg mb-3">Deskripsi Promo</h3>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">{promoDetail.description}</p>
                    </div>

                    <div className="mb-8">
                        <h3 className="font-bold text-gray-800 text-lg mb-4">Syarat & Ketentuan</h3>
                        <ul className="space-y-3">
                            {promoDetail.terms.map((term, index) => (
                                <li key={index} className="flex gap-3 text-sm md:text-base text-gray-600 leading-relaxed">
                                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">{index + 1}</span>
                                    <span>{term}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Fixed Bottom Action Button */}
                <div className="fixed bottom-0 w-full lg:max-w-5xl bg-white border-t border-gray-100 px-6 md:px-10 py-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50">
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-orange-500/30 transition-all active:scale-[0.98]">
                        Gunakan Sekarang
                    </button>
                </div>

            </div>
        </div>
    );
}
