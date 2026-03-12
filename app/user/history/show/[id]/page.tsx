"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ArrowUpRight, Copy, CheckCircle2, Clock, XCircle, FileText, Download, Building2 } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function HistoryDetailPage() {
    const params = useParams();

    // Mockup detail penarikan
    const detail = {
        id: "TRX-7829-382910",
        date: "11 Mar 2026, 14:30 WIB",
        amount: "Rp 500.000",
        fee: "Rp 2.500",
        total: "Rp 502.500",
        status: "success",
        statusText: "Berhasil",
        bankName: "Bank BCA",
        accountName: "Budi Santoso",
        accountNumber: "1234567890",
        referenceMessage: "Penarikan Dana Maret"
    };

    const StatusIcon = detail.status === 'success' ? CheckCircle2 : (detail.status === 'pending' ? Clock : XCircle);
    const statusBg = detail.status === 'success' ? "bg-green-50 text-green-600" : (detail.status === 'pending' ? "bg-orange-50 text-orange-600" : "bg-red-50 text-red-600");

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center font-sans">
            <div className="w-full lg:max-w-5xl mx-auto bg-gray-50 min-h-screen lg:shadow-2xl relative overflow-hidden flex flex-col">

                {/* Header Navbar */}
                <div className="bg-white px-6 md:px-10 py-4 shadow-sm flex items-center justify-between sticky top-0 z-50">
                    <Link href="/user/history" className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors z-10 relative">
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </Link>
                    <h1 className="text-lg font-bold text-gray-800 absolute left-0 w-full text-center pointer-events-none">Detail Transaksi</h1>
                    <button className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors z-10 relative">
                        <Download className="w-5 h-5 text-gray-700" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 md:px-10 py-6 pb-24">

                    {/* Status & Amount Head */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 mb-4">
                            <ArrowUpRight className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-800 mb-2">{detail.amount}</h2>
                        <div className={`px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-bold mt-1 ${statusBg}`}>
                            <StatusIcon className="w-4 h-4" />
                            {detail.statusText}
                        </div>
                        <p className="text-xs text-gray-400 mt-4">{detail.date}</p>
                    </div>

                    {/* Transaction Info Grid */}
                    <h3 className="text-sm font-bold text-gray-800 mb-3 ml-1">Rincian Penarikan</h3>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-5">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500 font-medium">Nominal Penarikan</span>
                            <span className="text-sm font-bold text-gray-800">{detail.amount}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500 font-medium">Biaya Admin</span>
                            <span className="text-sm font-bold text-gray-800">{detail.fee}</span>
                        </div>
                        <div className="w-full border-t border-dashed border-gray-200"></div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500 font-bold">Total Transaksi</span>
                            <span className="text-base font-black text-orange-500">{detail.total}</span>
                        </div>
                    </div>

                    <h3 className="text-sm font-bold text-gray-800 mb-3 mt-6 ml-1">Tujuan Transfer</h3>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-800 text-sm">{detail.bankName}</p>
                                <p className="text-xs text-gray-500">{detail.accountNumber}</p>
                                <p className="text-xs font-semibold text-gray-600 mt-0.5">{detail.accountName}</p>
                            </div>
                        </div>
                        <button className="p-2 hover:bg-gray-50 rounded-full transition text-gray-400 hover:text-orange-500" onClick={() => { }}>
                            <Copy className="w-5 h-5" />
                        </button>
                    </div>

                    <h3 className="text-sm font-bold text-gray-800 mb-3 mt-6 ml-1">ID Transaksi</h3>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition">
                        <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <span className="text-sm font-bold text-gray-700">{detail.id}</span>
                        </div>
                        <Copy className="w-4 h-4 text-orange-500" />
                    </div>

                </div>
            </div>
        </div>
    );
}
