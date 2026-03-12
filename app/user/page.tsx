"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getUserAction } from '@/app/actions/auth';
import {
    Bell,
    Wallet,
    History,
    Zap,
    Droplet,
    Wifi,
    CreditCard,
    Home,
    QrCode,
    PieChart,
    User,
    ChevronRight,
    ArrowUpRight,
    ArrowDownLeft,
    Smartphone,
    Gamepad2,
    MessageCircle
} from 'lucide-react';

// Data Mockup extracted to avoid recreation on every render
const promoBanners = [
    { id: 1, img: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=600&h=250&fit=crop', title: 'Promo Diskon 1' },
    { id: 2, img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=250&fit=crop', title: 'Promo Belanja 2' },
    { id: 3, img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=250&fit=crop', title: 'Promo Cashback 3' },
];

const transactions = [
    { id: 1, title: 'Transfer ke Budi', date: 'Hari ini, 14:30', amount: '-Rp 150.000', type: 'out', icon: <ArrowUpRight className="w-5 h-5 text-red-600" aria-hidden="true" />, bgColor: 'bg-red-100' },
    { id: 2, title: 'Top Up Saldo', date: 'Kemarin, 09:15', amount: '+Rp 500.000', type: 'in', icon: <ArrowDownLeft className="w-5 h-5 text-green-600" aria-hidden="true" />, bgColor: 'bg-green-100' },
    { id: 3, title: 'Pembayaran Listrik', date: '10 Mar 2026, 08:00', amount: '-Rp 250.000', type: 'out', icon: <Zap className="w-5 h-5 text-orange-600" aria-hidden="true" />, bgColor: 'bg-orange-100' },
    { id: 4, title: 'Terima dari Siska', date: '08 Mar 2026, 16:45', amount: '+Rp 300.000', type: 'in', icon: <ArrowDownLeft className="w-5 h-5 text-green-600" aria-hidden="true" />, bgColor: 'bg-green-100' },
];

const services = [
    { id: 1, name: 'Listrik', icon: <Zap className="w-6 h-6 text-orange-600" aria-hidden="true" /> },
    { id: 2, name: 'Air PDAM', icon: <Droplet className="w-6 h-6 text-blue-600" aria-hidden="true" /> },
    { id: 3, name: 'Internet', icon: <Wifi className="w-6 h-6 text-indigo-600" aria-hidden="true" /> },
    { id: 4, name: 'Pulsa', icon: <Smartphone className="w-6 h-6 text-emerald-600" aria-hidden="true" /> },
    { id: 5, name: 'BPJS', icon: <CreditCard className="w-6 h-6 text-teal-600" aria-hidden="true" /> },
    { id: 6, name: 'Voucher Game', icon: <Gamepad2 className="w-6 h-6 text-purple-600" aria-hidden="true" /> },
    { id: 7, name: 'E-Money', icon: <Wallet className="w-6 h-6 text-amber-600" aria-hidden="true" /> },
    { id: 8, name: 'Lainnya', icon: <ChevronRight className="w-6 h-6 text-gray-500" aria-hidden="true" /> },
];

export default function App() {
    const [activeTab, setActiveTab] = useState('home');
    const [user, setUser] = useState<{ nama_lengkap: string } | null>(null);

    useEffect(() => {
        async function fetchUser() {
            const userData = await getUserAction();
            if (userData) {
                setUser(userData);
            }
        }
        fetchUser();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center font-sans tracking-tight">
            {/* Container utama */}
            <div className="w-full lg:max-w-5xl mx-auto bg-gray-50 min-h-screen lg:shadow-2xl relative overflow-hidden flex flex-col">

                {/* Konten Utama */}
                <main className="flex-1 overflow-y-auto pb-24" aria-label="Halaman Utama Dasbor">

                    {/* Header Section */}
                    <div className="bg-white rounded-b-[2rem] px-6 md:px-10 pt-12 pb-16 shadow-sm">
                        <header className="flex justify-between items-center" aria-label="Profil Pengguna">
                            <Link href="/user/account" className="flex items-center gap-4 group hover:opacity-80 transition-opacity">
                                <div className="w-12 h-12 rounded-full bg-orange-100 border-2 border-orange-200 flex items-center justify-center text-orange-600 font-bold text-lg overflow-hidden shrink-0 group-hover:border-orange-400 transition-colors">
                                    <img
                                        src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.nama_lengkap || 'User'}&backgroundColor=ffedd5`}
                                        alt={`Avatar ${user?.nama_lengkap || 'User'}`}
                                        className="w-full h-full object-cover"
                                        width="48"
                                        height="48"
                                        decoding="async"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-600 font-medium mb-0.5">Selamat datang kembali,</span>
                                    <h1 className="font-bold text-gray-900 text-lg leading-tight">
                                        {user?.nama_lengkap || 'Loading...'}
                                    </h1>
                                </div>
                            </Link>
                            <Link
                                href="/user/news"
                                className="p-2.5 bg-gray-50 hover:bg-orange-50 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors rounded-full relative block"
                                aria-label="Lihat Notifikasi (1 notifikasi baru)"
                            >
                                <Bell className="w-6 h-6 text-gray-700" aria-hidden="true" />
                                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-600 border-2 border-white rounded-full" aria-hidden="true"></span>
                            </Link>
                        </header>
                    </div>

                    {/* Image Banners Slider */}
                    <section aria-label="Promo Banners" className="relative z-10 -mt-8">
                        <div
                            className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 md:px-10 pb-4 hide-scroll"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            <style>{`.hide-scroll::-webkit-scrollbar { display: none; }`}</style>
                            {promoBanners.map((banner) => (
                                <article key={banner.id} className="snap-center shrink-0 w-[90%] md:w-[45%] lg:w-[32%] relative overflow-hidden rounded-2xl shadow-lg h-40 md:h-48 group">
                                    <img
                                        src={banner.img}
                                        alt={banner.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        width="600"
                                        height="250"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" aria-hidden="true"></div>
                                </article>
                            ))}
                        </div>
                    </section>

                    {/* Services Grid */}
                    <section aria-labelledby="layanan-heading" className="px-6 md:px-10 mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 id="layanan-heading" className="font-bold text-gray-900 text-lg">Layanan</h2>
                            <button
                                type="button"
                                className="text-sm font-semibold text-orange-600 hover:text-orange-700 focus:outline-none focus:underline"
                            >
                                Lihat Semua
                            </button>
                        </div>
                        <ul className="grid grid-cols-4 md:grid-cols-8 gap-y-6 gap-x-4">
                            {services.map((service) => (
                                <li key={service.id}>
                                    <button
                                        type="button"
                                        className="w-full flex flex-col items-center gap-2 group focus:outline-none"
                                        aria-label={`Buka layanan ${service.name}`}
                                    >
                                        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center group-hover:scale-105 group-hover:shadow-md transition-all duration-300 group-hover:border-orange-300 group-focus:ring-2 group-focus:ring-orange-500">
                                            {service.icon}
                                        </div>
                                        <span className="text-xs font-medium text-gray-700 text-center">{service.name}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Promo/Banner Section */}
                    <section aria-label="Promo Spesial Hari Ini" className="px-6 md:px-10 mt-8">
                        <button
                            type="button"
                            className="w-full bg-gradient-to-r from-orange-100 to-orange-50 rounded-2xl p-4 md:p-5 flex items-center justify-between border border-orange-200 shadow-sm hover:shadow-md focus:ring-2 focus:ring-orange-500 focus:outline-none transition text-left"
                        >
                            <div>
                                <p className="text-xs md:text-sm font-bold text-orange-700 mb-1">PROMO HARI INI</p>
                                <p className="text-sm md:text-base font-semibold text-gray-900">Cashback s.d 50% untuk PLN!</p>
                            </div>
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shrink-0" aria-hidden="true">
                                <Zap className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                        </button>
                    </section>

                    {/* Recent Transactions */}
                    <section aria-labelledby="transaksi-heading" className="px-6 md:px-10 mt-8 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 id="transaksi-heading" className="font-bold text-gray-900 text-lg">Transaksi Terakhir</h2>
                        </div>
                        <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-gray-200">
                            <ul className="flex flex-col gap-4">
                                {transactions.map((tx, index) => (
                                    <li key={tx.id} className={`flex items-center justify-between ${index !== transactions.length - 1 ? 'border-b border-gray-100 pb-4' : ''}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${tx.bgColor}`} aria-hidden="true">
                                                {tx.icon}
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="font-semibold text-gray-900 md:text-lg">{tx.title}</p>
                                                <span className="text-[11px] md:text-sm text-gray-500 mt-0.5">{tx.date}</span>
                                            </div>
                                        </div>
                                        <p className={`font-bold text-sm md:text-lg shrink-0 ${tx.type === 'in' ? 'text-green-700' : 'text-gray-900'}`}>
                                            <span aria-hidden="true">{tx.amount}</span>
                                            <span className="sr-only">
                                                {tx.type === 'in' ? `Pemasukan sebesar ${tx.amount}` : `Pengeluaran sebesar ${tx.amount}`}
                                            </span>
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                </main>

                {/* Bottom Navigation */}
                <nav
                    aria-label="Navigasi Utama Bawah"
                    className="fixed bottom-0 w-full lg:max-w-5xl bg-white border-t border-gray-100 px-6 md:px-10 py-3 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50"
                >
                    <ul className="flex justify-around items-center relative px-2 md:px-10 m-0 p-0 list-none">
                        <li>
                            <NavBtn icon={<Home />} label="Home" id="home" activeTab={activeTab} setActiveTab={setActiveTab} />
                        </li>
                        <li>
                            <NavBtn icon={<History />} label="History" id="history" activeTab={activeTab} href="/user/history" />
                        </li>
                        <li>
                            <NavBtn icon={<MessageCircle />} label="Live Chat" id="chat" activeTab={activeTab} setActiveTab={setActiveTab} />
                        </li>
                        <li>
                            <NavBtn icon={<User />} label="Account" id="profile" activeTab={activeTab} href="/user/account" />
                        </li>
                    </ul>
                </nav>

            </div>
        </div>
    );
}

// Sub-komponen untuk Navigasi Bawah yang teroptimasi
type NavBtnProps = {
    icon: React.ReactElement;
    label: string;
    id: string;
    activeTab: string;
    setActiveTab?: (id: string) => void;
    href?: string;
};

function NavBtn({ icon, label, id, activeTab, setActiveTab, href }: NavBtnProps) {
    const active = activeTab === id;

    const content = (
        <>
            <div className={`p-2 rounded-xl transition-colors duration-300 ${active ? 'text-orange-600' : 'text-gray-500 group-hover:text-orange-500'}`} aria-hidden="true">
                {React.cloneElement(icon, { className: `w-6 h-6 ${active ? 'stroke-[2.5px]' : 'stroke-2'}` } as any)}
            </div>
            <span className={`text-[10px] font-semibold transition-colors duration-300 ${active ? 'text-orange-600' : 'text-gray-600'}`}>
                {label}
            </span>
        </>
    );

    if (href) {
        return (
            <Link
                href={href}
                className="flex flex-col items-center gap-1 w-16 group focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-xl"
                aria-current={active ? "page" : undefined}
                aria-label={`Buka halaman ${label}`}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            type="button"
            onClick={() => setActiveTab && setActiveTab(id)}
            className="flex flex-col items-center gap-1 w-16 group focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-xl"
            aria-current={active ? "page" : undefined}
            aria-label={`Buka tab ${label}`}
        >
            {content}
        </button>
    );
}