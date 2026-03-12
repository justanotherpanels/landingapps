"use client";

import React, { useEffect, useState } from 'react';
import { 
    Plus, 
    Trash2, 
    Smartphone, 
    ExternalLink, 
    MoreVertical, 
    Search,
    AlertCircle,
    Layout,
    Pencil,
    CheckCircle,
    Loader2
} from 'lucide-react';
import { getPlatforms, deletePlatform, addPlatform, updatePlatform } from '@/app/actions/admin';
import Modal from '../components/Modal';

type PlatformData = {
    id: string;
    name: string;
    image_url: string | null;
    _count: {
        panduans: number;
        transaksis: number;
    };
};

export default function PlatformManagementPage() {
    const [platforms, setPlatforms] = useState<PlatformData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [selectedPlatform, setSelectedPlatform] = useState<PlatformData | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        name: "",
        image_url: ""
    });

    // Alert State
    const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const fetchData = async () => {
        setLoading(true);
        const data = await getPlatforms();
        setPlatforms(data as any);
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

    const handleOpenAddModal = () => {
        setModalMode('add');
        setSelectedPlatform(null);
        setFormData({ name: "", image_url: "" });
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (platform: PlatformData) => {
        setModalMode('edit');
        setSelectedPlatform(platform);
        setFormData({
            name: platform.name,
            image_url: platform.image_url || ""
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Apakah Anda yakin ingin menghapus platform ini? Semua panduan terkait juga akan terhapus.")) {
            const result = await deletePlatform(id);
            if (result.success) {
                setAlert({ type: 'success', message: 'Platform berhasil dihapus' });
                fetchData();
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
            result = await addPlatform(formData.name, formData.image_url);
        } else {
            result = await updatePlatform(selectedPlatform!.id, formData.name, formData.image_url);
        }

        setIsSubmitting(false);
        if (result.success) {
            setAlert({ type: 'success', message: `Platform berhasil ${modalMode === 'add' ? 'ditambahkan' : 'diperbarui'}` });
            setIsModalOpen(false);
            fetchData();
        } else {
            setAlert({ type: 'error', message: result.error || 'Terjadi kesalahan' });
        }
    };

    const filteredPlatforms = platforms.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    <h1 className="text-2xl font-bold text-slate-900">Manajemen Platform</h1>
                    <p className="text-slate-500 text-sm mt-1">Kelola platform pembayaran (e-commerce/fintech) yang didukung.</p>
                </div>
                <button 
                    onClick={handleOpenAddModal}
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-100 active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Tambah Platform
                </button>
            </div>

            {/* Search & Stats */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                        type="text" 
                        placeholder="Cari nama platform..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="px-4 py-2 bg-slate-100 rounded-lg text-slate-600 text-sm font-bold border border-slate-200 uppercase tracking-widest text-[11px]">
                    Total: {platforms.length} Platform
                </div>
            </div>

            {/* Grid View */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-3xl h-56 animate-pulse border border-slate-100 shadow-sm"></div>
                    ))}
                </div>
            ) : filteredPlatforms.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPlatforms.map((platform) => (
                        <div key={platform.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all group relative overflow-hidden flex flex-col">
                            {/* Card Content */}
                            <div className="p-6 flex-1">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner group-hover:scale-110 transition-transform overflow-hidden border border-slate-100">
                                        {platform.image_url ? (
                                            <img src={platform.image_url} alt={platform.name} className="w-full h-full object-contain p-2" />
                                        ) : (
                                            <Smartphone className="w-7 h-7" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => handleOpenEditModal(platform)}
                                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(platform.id)}
                                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-lg font-black text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{platform.name}</h3>
                                <div className="flex items-center gap-3 mt-4">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] uppercase text-slate-400 font-black tracking-[0.2em]">Panduan</span>
                                        <span className="text-xs font-black text-slate-700">{platform._count.panduans} Tutorial</span>
                                    </div>
                                    <div className="w-px h-6 bg-slate-100"></div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] uppercase text-slate-400 font-black tracking-[0.2em]">Transaksi</span>
                                        <span className="text-xs font-black text-slate-700">{platform._count.transaksis} Kali</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Card Footer */}
                            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Platform ID: {platform.id.slice(0, 8)}</span>
                                <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-[3rem] p-24 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                        <Layout className="w-12 h-12 text-slate-200" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">Platform Tidak Ditemukan</h3>
                    <p className="text-slate-500 max-w-sm mb-10 font-medium">Anda belum menambahkan platform pembayaran atau pencarian tidak sesuai.</p>
                    <button 
                        onClick={handleOpenAddModal}
                        className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
                    >
                        Tambah Platform Pertama
                    </button>
                </div>
            )}

            {/* MODAL FORM */}
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title={modalMode === 'add' ? 'Tambah Platform' : 'Edit Platform'}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Nama Platform</label>
                        <input 
                            type="text"
                            placeholder="Contoh: Shopee PayLater, Dana, dll"
                            required
                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-300 focus:bg-white outline-none transition-all font-bold placeholder:text-slate-300"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">URL Ikon (Opsional)</label>
                        <input 
                            type="url"
                            placeholder="https://example.com/icon.png"
                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-300 focus:bg-white outline-none transition-all font-bold placeholder:text-slate-300"
                            value={formData.image_url}
                            onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                        />
                        <p className="text-[10px] text-slate-400 font-medium italic ml-1">*Gunankan URL gambar publik (PNG/SVG) untuk hasil terbaik.</p>
                    </div>
                    
                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all mt-6"
                    >
                        {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : (modalMode === 'add' ? 'Simpan Platform' : 'Update Platform')}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
