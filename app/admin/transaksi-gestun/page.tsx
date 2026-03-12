"use client";

import React, { useEffect, useState } from 'react';
import { 
    Search, 
    MoreVertical, 
    Eye, 
    CheckCircle2, 
    Clock, 
    AlertCircle, 
    CreditCard, 
    ArrowUpRight,
    Filter,
    Download,
    User,
    Banknote,
    Activity,
    Trash2,
    CheckCircle,
    Loader2,
    Calendar,
    ChevronDown,
    MapPin
} from 'lucide-react';
import { getTransactions, updateTransactionStatus, deleteTransaction } from '@/app/actions/admin';
import Modal from '../components/Modal';

type TransactionData = {
    id: string;
    kode_invoice: string;
    dana_diterima: number;
    biaya_admin: number;
    status: string;
    tipe: string;
    bank: string;
    rekening: string;
    nama_penerima: string;
    create_at: Date;
    user: {
        nama_lengkap: string;
        username: string;
    };
    platform: {
        name: string;
    };
};

export default function TransactionManagementPage() {
    const [transactions, setTransactions] = useState<TransactionData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTx, setSelectedTx] = useState<TransactionData | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Alert State
    const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const fetchData = async () => {
        setLoading(true);
        const data = await getTransactions();
        setTransactions(data as any);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const handleOpenViewModal = (tx: TransactionData) => {
        setSelectedTx(tx);
        setIsModalOpen(true);
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        setIsSubmitting(true);
        const result = await updateTransactionStatus(id, newStatus);
        setIsSubmitting(false);
        if (result.success) {
            setAlert({ type: 'success', message: `Status berhasil diubah ke ${newStatus}` });
            fetchData();
            // If modal is open for this tx, update its local state or close
            if (selectedTx && selectedTx.id === id) {
                setSelectedTx({...selectedTx, status: newStatus});
            }
        } else {
            setAlert({ type: 'error', message: result.error || 'Gagal mengubah status' });
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Apakah Anda yakin ingin menghapus data transaksi ini secara permanen?")) {
            const result = await deleteTransaction(id);
            if (result.success) {
                setAlert({ type: 'success', message: 'Transaksi berhasil dihapus' });
                setIsModalOpen(false);
                fetchData();
            } else {
                setAlert({ type: 'error', message: result.error || 'Gagal menghapus' });
            }
        }
    };

    const filteredTransactions = transactions.filter(tx => {
        const matchesSearch = 
            tx.kode_invoice.toLowerCase().includes(searchTerm.toLowerCase()) || 
            tx.user.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tx.platform.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Selesai': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Proses': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Request': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Dikirim': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
            case 'Kriling': return 'bg-purple-100 text-purple-700 border-purple-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 relative">
            {/* Custom Alert Toast */}
            {alert && (
                <div className={`fixed top-20 right-8 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border animate-in slide-in-from-right duration-300 ${
                    alert.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-rose-50 border-rose-100 text-rose-800'
                }`}>
                    {alert.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <p className="font-bold text-sm">{alert.message}</p>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Manajemen Transaksi</h1>
                    <p className="text-slate-500 text-sm mt-1">Pantau dan kelola seluruh permintaan pencairan dana dari pengguna.</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm">
                    <Download className="w-4 h-4" />
                    Ekspor Excel
                </button>
            </div>

            {/* Table Control */}
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden mb-12">
                <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input 
                            type="text" 
                            placeholder="Cari Invoice, Nama, atau Platform..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-transparent rounded-xl text-sm focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 outline-none transition-all shadow-inner"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-transparent">
                            <Filter className="w-4 h-4 text-slate-400" />
                            <select 
                                className="bg-transparent text-sm font-bold text-slate-600 outline-none cursor-pointer uppercase tracking-wider text-[11px]"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">Semua Status</option>
                                <option value="Request">🚨 Request</option>
                                <option value="Proses">⚙️ Proses</option>
                                <option value="Kriling">🏦 Kriling</option>
                                <option value="Dikirim">🚚 Dikirim</option>
                                <option value="Selesai">✅ Selesai</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 text-slate-600 font-black border-b border-slate-200 uppercase text-[10px] tracking-[0.2em]">
                            <tr>
                                <th className="px-6 py-4">Invoice & Platform</th>
                                <th className="px-6 py-4">Pelanggan</th>
                                <th className="px-6 py-4">Nominal</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 font-bold uppercase">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="px-6 py-10 h-24 bg-slate-50/20"></td>
                                    </tr>
                                ))
                            ) : filteredTransactions.length > 0 ? (
                                filteredTransactions.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-black text-slate-900 text-sm">#{tx.kode_invoice}</div>
                                                <div className="flex items-center gap-1.5 mt-1">
                                                    <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 uppercase tracking-tighter">
                                                        {tx.platform.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                                                    <User className="w-4 h-4 text-slate-400" />
                                                </div>
                                                <div>
                                                    <div className="font-black text-slate-900 text-xs tracking-tight">{tx.user.nama_lengkap}</div>
                                                    <div className="text-[10px] text-slate-400 italic">@{tx.user.username}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-black text-indigo-700 text-sm tracking-tight">{formatCurrency(tx.dana_diterima)}</div>
                                                <div className="text-[10px] text-slate-400">Total</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black border uppercase tracking-widest ${getStatusStyle(tx.status)}`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    onClick={() => handleOpenViewModal(tx)}
                                                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                                    title="Lihat Detail"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(tx.id)}
                                                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                                    title="Hapus"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-24 text-center">
                                        <div className="flex flex-col items-center gap-3 text-slate-200">
                                            <CreditCard className="w-16 h-16" />
                                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Belum Ada Transaksi</h3>
                                            <p className="text-slate-500 text-xs font-medium normal-case">Permintaan transaksi dari pengguna akan muncul di sini secara otomatis.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* DETAIL & MANAGE MODAL */}
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title={`Detail Transaksi #${selectedTx?.kode_invoice}`}
            >
                {selectedTx && (
                    <div className="space-y-8">
                        {/* Section: Status & Actions */}
                        <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-inner">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Update Status</span>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-widest ${getStatusStyle(selectedTx.status)} shadow-sm`}>
                                    {selectedTx.status}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                {['Request', 'Proses', 'Dikirim', 'Selesai'].map((status) => (
                                    <button 
                                        key={status}
                                        disabled={isSubmitting || selectedTx.status === status}
                                        onClick={() => handleStatusChange(selectedTx.id, status)}
                                        className={`px-3 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all border-2 ${
                                            selectedTx.status === status 
                                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' 
                                            : 'bg-white border-slate-100 text-slate-400 hover:border-indigo-200 hover:text-indigo-600'
                                        } disabled:opacity-50`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Section: Info Grid */}
                        <div className="grid grid-cols-2 gap-8 px-2">
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Pelanggan</p>
                                    <h4 className="font-black text-slate-900 leading-tight uppercase tracking-tight">{selectedTx.user.nama_lengkap}</h4>
                                    <p className="text-[10px] text-slate-400 italic">@{selectedTx.user.username}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Platform</p>
                                    <p className="font-black text-indigo-600 uppercase tracking-tight">{selectedTx.platform.name}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">{selectedTx.tipe}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Waktu Record</p>
                                    <div className="flex items-center gap-1.5 text-slate-600 font-bold text-xs uppercase tracking-tight">
                                        <Calendar className="w-3.5 h-3.5 text-slate-300" />
                                        {new Date(selectedTx.create_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Data Penerima</p>
                                    <h4 className="font-black text-slate-900 uppercase tracking-tight leading-tight">{selectedTx.nama_penerima}</h4>
                                    <div className="mt-1 flex items-center gap-1.5 text-slate-500 font-bold text-[11px] uppercase whitespace-normal">
                                        <Banknote className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                                        {selectedTx.bank} - {selectedTx.rekening}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Dana Cair</p>
                                    <h4 className="text-2xl font-black text-emerald-600 tracking-tighter">{formatCurrency(selectedTx.dana_diterima)}</h4>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Sudah Potong Fee {formatCurrency(selectedTx.biaya_admin)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                            <p className="text-[10px] text-slate-400 font-bold uppercase italic tracking-widest">*ID: {selectedTx.id}</p>
                            <button 
                                onClick={() => handleDelete(selectedTx.id)}
                                className="flex items-center gap-1.5 text-rose-500 hover:text-rose-700 font-black text-[10px] uppercase tracking-widest transition-colors py-2 px-4 hover:bg-rose-50 rounded-xl"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                Hapus Log Transaksi
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
