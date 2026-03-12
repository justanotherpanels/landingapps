"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ArrowUpRight, Clock, CheckCircle2, XCircle } from 'lucide-react';

export default function WithdrawalHistoryPage() {
    const histories = [
        { id: 1, title: 'Penarikan ke BCA', account: '**** 1234', date: '11 Mar 2026, 14:30', amount: 'Rp 500.000', status: 'success', statusText: 'Berhasil' },
        { id: 2, title: 'Penarikan ke Mandiri', account: '**** 5678', date: '09 Mar 2026, 09:15', amount: 'Rp 1.000.000', status: 'pending', statusText: 'Diproses' },
        { id: 3, title: 'Penarikan ke BNI', account: '**** 9012', date: '05 Mar 2026, 16:45', amount: 'Rp 250.000', status: 'failed', statusText: 'Gagal' },
        { id: 4, title: 'Penarikan ke BRI', account: '**** 3456', date: '01 Mar 2026, 10:00', amount: 'Rp 150.000', status: 'success', statusText: 'Berhasil' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center font-sans">
            <div className="w-full lg:max-w-5xl mx-auto bg-gray-50 min-h-screen lg:shadow-2xl relative overflow-hidden flex flex-col">
                {/* Header Navbar */}
                <div className="bg-white px-6 md:px-10 py-4 shadow-sm flex items-center justify-between sticky top-0 z-50">
                    <Link href="/user" className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors z-10 relative">
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-800 absolute left-0 w-full text-center pointer-events-none">Riwayat Penarikan</h1>
                    <div className="w-10"></div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 md:px-10 py-6 pb-24">
                    <div className="flex flex-col gap-4">
                        {histories.map((item) => (
                            <Link key={item.id} href={`/user/history/show/${item.id}`} className="bg-white rounded-xl p-4 shadow-sm border border-gray-50 flex items-center justify-between group hover:shadow-md hover:border-orange-100 transition-all">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p className="font-bold text-gray-800 text-sm mb-0.5">{item.title}</p>
                                        <p className="text-[11px] text-gray-500">{item.date}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end justify-center">
                                    <p className="font-bold text-gray-800 text-sm mb-1">{item.amount}</p>
                                    <div className="flex items-center gap-1">
                                        {item.status === 'success' && <CheckCircle2 className="w-3 h-3 text-green-500" />}
                                        {item.status === 'pending' && <Clock className="w-3 h-3 text-orange-500" />}
                                        {item.status === 'failed' && <XCircle className="w-3 h-3 text-red-500" />}
                                        <span className={`text-[10px] font-bold ${item.status === 'success' ? 'text-green-600' :
                                                item.status === 'pending' ? 'text-orange-600' :
                                                    'text-red-600'
                                            }`}>{item.statusText}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
