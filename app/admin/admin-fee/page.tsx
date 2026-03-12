"use client";

import React, { useEffect, useState } from 'react';
import { 
    Plus, 
    Trash2, 
    Search, 
    MoreHorizontal, 
    CheckCircle, 
    AlertCircle,
    DollarSign,
    Percent,
    Layers,
    Pencil,
    Loader2
} from 'lucide-react';
import { getAdminFees, deleteAdminFee, addAdminFee, updateAdminFee } from '@/app/actions/admin';
import Modal from '../components/Modal';

type AdminFee = {
    id: string;
    min_transaksi: number;
    max_transaksi: number;
    nilai_persentase: number;
    create_at: Date;
};

export default function AdminFeePage() {
    const [fees, setFees] = useState<AdminFee[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    
    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [selectedFee, setSelectedFee] = useState<AdminFee | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        min_transaksi: 0,
        max_transaksi: 0,
        nilai_persentase: 0
    });

    // Alert State
    const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const fetchFees = async () => {
        setLoading(true);
        const data = await getAdminFees();
        setFees(data as any);
        setLoading(false);
    };

    useEffect(() => {
        fetchFees();
    }, []);

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const handleOpenAddModal = () => {
        setModalMode('add');
        setSelectedFee(null);
        setFormData({ min_transaksi: 0, max_transaksi: 0, nilai_persentase: 0 });
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (fee: AdminFee) => {
        setModalMode('edit');
        setSelectedFee(fee);
        setFormData({
            min_transaksi: fee.min_transaksi,
            max_transaksi: fee.max_transaksi,
            nilai_persentase: fee.nilai_persentase
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Apakah Anda yakin ingin menghapus aturan biaya admin ini?")) {
            const result = await deleteAdminFee(id);
            if (result.success) {
                setAlert({ type: 'success', message: 'Aturan berhasil dihapus' });
                fetchFees();
            } else {
                setAlert({ type: 'error', message: result.error || 'Gagal menghapus' });
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        let result;
        if (modalMode === 'add') {
            result = await addAdminFee(formData);
        } else {
            result = await updateAdminFee(selectedFee!.id, formData);
        }

        setIsSubmitting(false);
        if (result.success) {
            setAlert({ type: 'success', message: `Aturan berhasil ${modalMode === 'add' ? 'ditambahkan' : 'diperbarui'}` });
            setIsModalOpen(false);
            fetchFees();
        } else {
            setAlert({ type: 'error', message: result.error || 'Terjadi kesalahan' });
        }
    };

    const filteredFees = fees.filter(fee => 
        fee.min_transaksi.toString().includes(searchTerm) || 
        fee.max_transaksi.toString().includes(searchTerm) ||
        fee.nilai_persentase.toString().includes(searchTerm)
    );

    const formatRupiah = (number: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
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

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Pengaturan Biaya Admin</h1>
                    <p className="text-slate-500 text-sm mt-1">Kelola persentase biaya administrasi berdasarkan rentang transaksi.</p>
                </div>
                <button 
                    onClick={handleOpenAddModal}
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-100 active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Tambah Aturan
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                            <Layers className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Aturan</p>
                            <p className="text-2xl font-black text-slate-900">{fees.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                            <Percent className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Fee Tertinggi</p>
                            <p className="text-2xl font-black text-slate-900">
                                {fees.length > 0 ? Math.max(...fees.map(f => f.nilai_persentase)) : 0}%
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Fee Terendah</p>
                            <p className="text-2xl font-black text-slate-900">
                                {fees.length > 0 ? Math.min(...fees.map(f => f.nilai_persentase)) : 0}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-12">
                <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input 
                            type="text" 
                            placeholder="Cari nominal atau persentase..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-transparent rounded-xl text-sm focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[11px] tracking-widest">
                            <tr>
                                <th className="px-6 py-4">No</th>
                                <th className="px-6 py-4">Min. Transaksi</th>
                                <th className="px-6 py-4">Max. Transaksi</th>
                                <th className="px-6 py-4">Fee (%)</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 uppercase font-medium">
                            {loading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="px-6 py-4 h-16 bg-slate-50/20"></td>
                                    </tr>
                                ))
                            ) : filteredFees.length > 0 ? (
                                filteredFees.map((fee, index) => (
                                    <tr key={fee.id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-6 py-4 text-slate-400">{index + 1}</td>
                                        <td className="px-6 py-4 font-black text-slate-900">{formatRupiah(fee.min_transaksi)}</td>
                                        <td className="px-6 py-4 font-black text-slate-900">{formatRupiah(fee.max_transaksi)}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-black text-xs border border-indigo-100">
                                                {fee.nilai_persentase}%
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    onClick={() => handleOpenEditModal(fee)}
                                                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                                    title="Edit Aturan"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(fee.id)}
                                                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                                    title="Hapus Aturan"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <AlertCircle className="w-10 h-10 text-slate-300" />
                                            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Belum ada aturan biaya admin.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL FORM */}
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title={modalMode === 'add' ? 'Tambah Aturan Biaya' : 'Edit Aturan Biaya'}
            >
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Min. Transaksi</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">Rp</span>
                            <input 
                                type="number"
                                required
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-300 focus:bg-white outline-none transition-all font-bold"
                                value={formData.min_transaksi}
                                onChange={(e) => setFormData({...formData, min_transaksi: Number(e.target.value)})}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Max. Transaksi</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">Rp</span>
                            <input 
                                type="number"
                                required
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-300 focus:bg-white outline-none transition-all font-bold"
                                value={formData.max_transaksi}
                                onChange={(e) => setFormData({...formData, max_transaksi: Number(e.target.value)})}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Nilai Persentase Fee</label>
                        <div className="relative">
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">%</span>
                            <input 
                                type="number"
                                step="0.1"
                                required
                                className="w-full pl-4 pr-12 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-300 focus:bg-white outline-none transition-all font-bold"
                                value={formData.nilai_persentase}
                                onChange={(e) => setFormData({...formData, nilai_persentase: Number(e.target.value)})}
                            />
                        </div>
                    </div>
                    
                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all mt-4"
                    >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (modalMode === 'add' ? 'Simpan Aturan' : 'Update Aturan')}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
