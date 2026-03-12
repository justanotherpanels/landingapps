"use client";

import React from 'react';
import {
    ShoppingBag,
    Users,
    TrendingUp,
    TrendingDown,
    MoreVertical,
    DollarSign,
    Activity
} from 'lucide-react';

// --- DATA MOCKUP ---
const statsData = [
    { title: 'Total Pendapatan', value: 'Rp 124.500.000', trend: '+12.5%', isPositive: true, icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Pengguna Aktif', value: '8.234', trend: '+5.2%', isPositive: true, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { title: 'Pesanan Baru', value: '342', trend: '-1.1%', isPositive: false, icon: ShoppingBag, color: 'text-amber-600', bg: 'bg-amber-100' },
    { title: 'Tingkat Konversi', value: '3.4%', trend: '+0.8%', isPositive: true, icon: Activity, color: 'text-purple-600', bg: 'bg-purple-100' }
];

const recentOrders = [
    { id: '#ORD-001', customer: 'Budi Santoso', date: '12 Mar 2026', amount: 'Rp 1.250.000', status: 'Selesai' },
    { id: '#ORD-002', customer: 'Siti Aminah', date: '12 Mar 2026', amount: 'Rp 450.000', status: 'Diproses' },
    { id: '#ORD-003', customer: 'Ahmad Dahlan', date: '11 Mar 2026', amount: 'Rp 2.100.000', status: 'Selesai' },
    { id: '#ORD-004', customer: 'Dewi Lestari', date: '11 Mar 2026', amount: 'Rp 150.000', status: 'Dibatalkan' },
    { id: '#ORD-005', customer: 'Rudi Hermawan', date: '10 Mar 2026', amount: 'Rp 890.000', status: 'Selesai' },
];

const chartData = [
    { month: 'Jan', value: 40 }, { month: 'Feb', value: 30 }, { month: 'Mar', value: 55 },
    { month: 'Apr', value: 45 }, { month: 'Mei', value: 70 }, { month: 'Jun', value: 65 },
    { month: 'Jul', value: 85 }, { month: 'Ags', value: 60 }, { month: 'Sep', value: 90 },
];

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        'Selesai': 'bg-emerald-100 text-emerald-700',
        'Diproses': 'bg-amber-100 text-amber-700',
        'Dibatalkan': 'bg-rose-100 text-rose-700'
    };

    return (
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
            {status}
        </span>
    );
};

export default function AdminDashboard() {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Ringkasan Dashboard</h1>
                <p className="text-slate-500 text-sm mt-1">Pantau performa dan analitik bisnis Anda hari ini.</p>
            </div>

            {/* KARTU STATISTIK */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                {statsData.map((stat, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${stat.isPositive ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'}`}>
                                {stat.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {stat.trend}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-slate-500 text-sm font-medium">{stat.title}</h3>
                            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* BAGIAN GRAFIK & PRODUK */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Statistik Pendapatan</h2>
                            <p className="text-sm text-slate-500">Pertumbuhan pendapatan per bulan</p>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="h-64 flex items-end justify-between gap-2 pt-4">
                        {chartData.map((data, index) => (
                            <div key={index} className="flex flex-col items-center flex-1 group">
                                <div className="w-full relative flex justify-center h-full items-end">
                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 bg-slate-800 text-white text-xs py-1 px-2 rounded transition-opacity whitespace-nowrap z-10">
                                        {data.value}k
                                    </div>
                                    <div
                                        className="w-full max-w-[3rem] bg-indigo-100 group-hover:bg-indigo-200 rounded-t-sm transition-colors relative"
                                        style={{ height: `${data.value}%` }}
                                    >
                                        <div
                                            className="absolute bottom-0 w-full bg-indigo-600 rounded-t-sm transition-all"
                                            style={{ height: `${data.value * 0.7}%` }}
                                        />
                                    </div>
                                </div>
                                <span className="text-xs text-slate-400 mt-2 font-medium">{data.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-900">Top Penjualan</h2>
                        <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">Lihat Semua</button>
                    </div>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                                    <ShoppingBag className="w-5 h-5 text-slate-400" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-slate-900">Produk Premium #{item}</h4>
                                    <p className="text-xs text-slate-500">{item * 124} terjual</p>
                                </div>
                                <div className="text-sm font-bold text-slate-900">
                                    Rp {(item * 250).toLocaleString('id-ID')}k
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* TABEL DATA */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
                <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Pesanan Terbaru</h2>
                        <p className="text-sm text-slate-500">Daftar transaksi yang baru saja masuk.</p>
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                        Ekspor Laporan
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">ID Pesanan</th>
                                <th className="px-6 py-4">Pelanggan</th>
                                <th className="px-6 py-4">Tanggal</th>
                                <th className="px-6 py-4">Total Harga</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-slate-700">
                            {recentOrders.map((order, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">{order.id}</td>
                                    <td className="px-6 py-4">{order.customer}</td>
                                    <td className="px-6 py-4 text-slate-500">{order.date}</td>
                                    <td className="px-6 py-4 font-medium">{order.amount}</td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={order.status} />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                                            <MoreVertical className="w-5 h-5 inline-block" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}