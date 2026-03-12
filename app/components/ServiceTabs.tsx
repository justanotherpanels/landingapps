"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PAYLATER = [
    { name: "Shopee Paylater", color: "from-orange-500 to-red-500", icon: "🛍️" },
    { name: "GoPaylater", color: "from-sky-400 to-blue-600", icon: "🛵" },
    { name: "Kredivo", color: "from-violet-500 to-purple-600", icon: "💜" },
    { name: "Akulaku", color: "from-yellow-400 to-amber-500", icon: "🌟" },
    { name: "Indodana", color: "from-teal-400 to-emerald-600", icon: "💎" },
    { name: "SPinjam", color: "from-pink-500 to-rose-500", icon: "🦋" },
];

const KARTU = [
    { name: "Kartu Kredit Visa", color: "from-blue-500 to-indigo-600", icon: "💳" },
    { name: "Kartu Kredit Mastercard", color: "from-red-500 to-orange-600", icon: "🔴" },
];

export default function ServiceTabs() {
    const [activeTab, setActiveTab] = useState<"paylater" | "kartu">("paylater");
    const list = activeTab === "paylater" ? PAYLATER : KARTU;

    return (
        <section id="layanan" className="mb-10 sm:mb-14">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-black text-white sm:text-2xl">Semua Layanan Tersedia</h2>
                    <p className="mt-1 text-xs text-slate-300 sm:text-sm">Pilih platform pencairanmu</p>
                </div>
                {/* Tab Switcher */}
                <div
                    role="tablist"
                    aria-label="Jenis layanan gestun"
                    className="flex rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur-sm"
                >
                    <button
                        role="tab"
                        aria-selected={activeTab === "paylater"}
                        onClick={() => setActiveTab("paylater")}
                        className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${activeTab === "paylater"
                                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                                : "text-slate-300 hover:text-white"
                            }`}
                    >
                        Paylater
                    </button>
                    <button
                        role="tab"
                        aria-selected={activeTab === "kartu"}
                        onClick={() => setActiveTab("kartu")}
                        className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${activeTab === "kartu"
                                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                                : "text-slate-300 hover:text-white"
                            }`}
                    >
                        Kartu Kredit
                    </button>
                </div>
            </div>

            <div
                role="tabpanel"
                className="grid grid-cols-2 gap-3 sm:grid-cols-3"
            >
                {list.map((service, i) => (
                    <Link
                        key={i}
                        href="/auth/login"
                        aria-label={`Gestun ${service.name}`}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:border-violet-500/40 hover:bg-white/10 hover:shadow-lg hover:shadow-violet-500/10 active:scale-95 sm:p-5"
                    >
                        <div
                            className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} text-xl shadow-lg sm:h-12 sm:w-12`}
                            aria-hidden="true"
                        >
                            {service.icon}
                        </div>
                        <p className="text-xs font-bold text-white sm:text-sm">{service.name}</p>
                        <p className="mt-1 text-[10px] text-slate-300 sm:text-xs">Fee kompetitif</p>
                        <ArrowRight
                            size={14}
                            aria-hidden="true"
                            className="absolute bottom-4 right-4 text-slate-500 transition-all group-hover:text-violet-400 group-hover:translate-x-0.5"
                        />
                    </Link>
                ))}
            </div>
        </section>
    );
}
