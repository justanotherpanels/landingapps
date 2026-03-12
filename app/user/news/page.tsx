"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Gift, Zap, Ticket, Flame } from 'lucide-react';

export default function NewsPage() {
    const newsItems = [
        {
            id: 1,
            title: "Cashback Spesial 50% untuk Top Up PLN",
            description: "Dapatkan cashback langsung hingga Rp 50.000 setiap transaksi Token PLN.",
            date: "11 Mar 2026",
            icon: <Zap className="w-5 h-5 text-orange-500" />,
            bgColor: "bg-orange-100",
            category: "Promo",
            imageUrl: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=600&h=300&fit=crop"
        },
        {
            id: 2,
            title: "Gratis Voucher Game Menantimu!",
            description: "Main makin seru! Klaim voucher game favoritmu dengan transaksi minimum Rp 100k.",
            date: "10 Mar 2026",
            icon: <Gift className="w-5 h-5 text-purple-500" />,
            bgColor: "bg-purple-100",
            category: "Voucher",
            imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=300&fit=crop"
        },
        {
            id: 3,
            title: "Diskon 20% Pembayaran Tiket Bioskop",
            description: "Nikmati akhir pekan dengan nonton film terbaru. Gunakan kode: NONTONTERUS.",
            date: "09 Mar 2026",
            icon: <Ticket className="w-5 h-5 text-blue-500" />,
            bgColor: "bg-blue-100",
            category: "Hiburan",
            imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=300&fit=crop"
        },
        {
            id: 4,
            title: "Flash Sale: Pulsa Murah Seharian",
            description: "Jangan sampai kehabisan, promo flash sale pulsa semua operator harga miring.",
            date: "08 Mar 2026",
            icon: <Flame className="w-5 h-5 text-red-500" />,
            bgColor: "bg-red-100",
            category: "Flash Sale",
            imageUrl: "https://images.unsplash.com/photo-1601598851547-4302969d0614?w=600&h=300&fit=crop"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center font-sans">
            <div className="w-full lg:max-w-5xl mx-auto bg-gray-50 min-h-screen lg:shadow-2xl relative overflow-hidden flex flex-col">

                {/* Header Navbar */}
                <div className="bg-white px-6 md:px-10 py-4 shadow-sm flex items-center justify-between sticky top-0 z-50">
                    <Link href="/user" className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors z-10 relative">
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-800 absolute left-0 w-full text-center pointer-events-none">News</h1>
                    <div className="w-10"></div> {/* Spacer to keep flex balance */}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 md:px-10 py-6 pb-24">

                    {/* Tabs / Filter Filter (Mockup UX only) */}
                    <div className="flex gap-2 overflow-x-auto pb-4 hide-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <style>{`.hide-scroll::-webkit-scrollbar { display: none; }`}</style>
                        <button className="px-5 py-2 bg-orange-500 text-white rounded-full text-sm font-semibold whitespace-nowrap shadow-sm">Semua</button>
                        <button className="px-5 py-2 bg-white text-gray-600 border border-gray-200 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-50 transition">Promo</button>
                        <button className="px-5 py-2 bg-white text-gray-600 border border-gray-200 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-50 transition">Voucher</button>
                        <button className="px-5 py-2 bg-white text-gray-600 border border-gray-200 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-50 transition">Berita</button>
                    </div>

                    <div className="mt-4 flex flex-col gap-6">
                        {newsItems.map((item) => (
                            <Link key={item.id} href={`/user/news/show`} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group block">
                                <div className="h-40 md:h-52 w-full overflow-hidden relative">
                                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.bgColor}`}>
                                            {item.icon}
                                        </div>
                                        <span className="text-xs font-bold text-gray-800">{item.category}</span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <p className="text-xs font-medium text-gray-400 mb-2">{item.date}</p>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
}
