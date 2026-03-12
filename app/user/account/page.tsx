"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    User,
    Shield,
    CreditCard,
    HelpCircle,
    LogOut,
    ChevronRight,
    Bell,
    Settings,
    Wallet,
    Home,
    History,
    MessageCircle,
    CheckCircle2,
    Lock,
    Scale,
    Smartphone,
    Info,
    ArrowRight
} from 'lucide-react';

export default function AccountPage() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center font-sans tracking-tight">
            {/* Container Utama */}
            <div className="w-full lg:max-w-5xl mx-auto bg-gray-50 min-h-screen lg:shadow-2xl relative overflow-hidden flex flex-col">
                
                {/* Konten Utama */}
                <main className="flex-1 overflow-y-auto pb-32">
                    
                    {/* Profile Header */}
                    <div className="bg-white rounded-b-[3rem] px-6 md:px-10 pt-12 pb-10 shadow-sm relative overflow-hidden">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-50 rounded-full -mr-20 -mt-20 opacity-50"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-100 rounded-full -ml-10 -mb-10 opacity-30"></div>
                        
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="relative">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-orange-100 border-4 border-white shadow-xl flex items-center justify-center text-orange-600 font-bold text-2xl overflow-hidden shrink-0">
                                    <img
                                        src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=ffedd5"
                                        alt="Avatar Budi Santoso"
                                        className="w-full h-full object-cover"
                                        width="128"
                                        height="128"
                                        decoding="async"
                                    />
                                </div>
                                <button className="absolute bottom-1 right-1 bg-orange-600 p-2 rounded-full border-2 border-white text-white shadow-lg hover:bg-orange-700 transition-colors">
                                    <Settings className="w-4 h-4" />
                                </button>
                            </div>
                            
                            <div className="mt-4 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <h1 className="font-bold text-gray-900 text-xl md:text-2xl leading-tight">Budi Santoso</h1>
                                    <CheckCircle2 className="w-5 h-5 text-blue-500 fill-blue-50" />
                                </div>
                                <p className="text-gray-500 text-sm font-medium mt-1 uppercase tracking-wider">Premium Member</p>
                                <div className="mt-2 text-xs text-gray-400 font-medium">+62 812 *** 7890 • budi.s@example.com</div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats/Limit Card */}
                    <section className="px-6 md:px-10 -mt-6 relative z-20">
                        <div className="bg-gradient-to-br from-orange-600 to-orange-500 rounded-3xl p-6 shadow-xl text-white">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="text-orange-100 text-xs font-medium uppercase tracking-widest mb-1">Limit Tersedia</p>
                                    <h2 className="text-2xl md:text-3xl font-bold">Rp 15.000.000</h2>
                                </div>
                                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                                    <Wallet className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="bg-black/10 rounded-2xl p-4 flex items-center justify-between border border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-orange-400/30 flex items-center justify-center">
                                        <History className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold">Tagihan Bulan Ini</p>
                                        <p className="text-sm font-bold">Rp 450.000</p>
                                    </div>
                                </div>
                                <button className="text-xs bg-white text-orange-600 font-bold px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors">
                                    Bayar Sekarang
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Menu Group: Akun */}
                    <section className="px-6 md:px-10 mt-10">
                        <h3 className="text-gray-900 font-bold text-lg mb-4">Pengaturan Akun</h3>
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <MenuItem icon={<User />} label="Informasi Pribadi" value="Ubah data diri" />
                            <MenuItem icon={<Shield />} label="Keamanan" value="PIN & Password" />
                            <MenuItem icon={<CheckCircle2 />} label="Verifikasi KYC" status="Terverifikasi" />
                            <MenuItem icon={<CreditCard />} label="Metode Pembayaran" last />
                        </div>
                    </section>

                    {/* Menu Group: Umum */}
                    <section className="px-6 md:px-10 mt-8">
                        <h3 className="text-gray-900 font-bold text-lg mb-4">Umum</h3>
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <MenuItem icon={<HelpCircle />} label="Pusat Bantuan" />
                            <MenuItem icon={<Info />} label="Tentang PayLaterKu" href="/page/about-us" />
                            <MenuItem icon={<Scale />} label="Syarat & Ketentuan" href="/page/term" />
                            <MenuItem icon={<Lock />} label="Kebijakan Privasi" href="/page/privacy" last />
                        </div>
                    </section>

                    {/* Logout Button */}
                    <section className="px-6 md:px-10 mt-10 mb-10">
                        <button className="w-full flex items-center justify-center gap-3 py-4 bg-white border-2 border-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-50 transition-colors group">
                            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Keluar Akun
                        </button>
                        <p className="text-center text-gray-400 text-xs mt-6 font-medium">Versi 2.4.0 (2026)</p>
                    </section>

                </main>

                {/* Bottom Navigation */}
                <nav
                    aria-label="Navigasi Utama Bawah"
                    className="fixed bottom-0 w-full lg:max-w-5xl bg-white border-t border-gray-100 px-6 md:px-10 py-3 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50"
                >
                    <ul className="flex justify-around items-center relative px-2 md:px-10 m-0 p-0 list-none">
                        <li>
                            <NavBtn icon={<Home />} label="Home" id="home" activeTab={activeTab} href="/user" />
                        </li>
                        <li>
                            <NavBtn icon={<History />} label="History" id="history" activeTab={activeTab} href="/user/history" />
                        </li>
                        <li>
                            <NavBtn icon={<MessageCircle />} label="Live Chat" id="chat" activeTab={activeTab} />
                        </li>
                        <li>
                            <NavBtn icon={<User />} label="Account" id="profile" activeTab={activeTab} setActiveTab={setActiveTab} />
                        </li>
                    </ul>
                </nav>

            </div>
        </div>
    );
}

// Sub-komponen Menu Item
type MenuItemProps = {
    icon: React.ReactElement;
    label: string;
    value?: string;
    status?: string;
    last?: boolean;
    href?: string;
};

function MenuItem({ icon, label, value, status, last, href }: MenuItemProps) {
    const content = (
        <>
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                    {React.cloneElement(icon, { className: "w-5 h-5" } as any)}
                </div>
                <div className="text-left">
                    <p className="font-bold text-gray-900 text-sm md:text-base">{label}</p>
                    {value && <p className="text-[11px] md:text-xs text-gray-400 font-medium mt-0.5">{value}</p>}
                </div>
            </div>
            <div className="flex items-center gap-2">
                {status && (
                    <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-full uppercase tracking-tight">
                        {status}
                    </span>
                )}
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
            </div>
        </>
    );

    if (href) {
        return (
            <Link href={href} className={`w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors group focus:outline-none ${!last ? 'border-b border-gray-50' : ''}`}>
                {content}
            </Link>
        );
    }

    return (
        <button className={`w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors group focus:outline-none ${!last ? 'border-b border-gray-50' : ''}`}>
            {content}
        </button>
    );
}

// Sub-komponen untuk Navigasi Bawah
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
