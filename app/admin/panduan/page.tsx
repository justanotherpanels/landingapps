"use client";

import React, { useEffect, useState } from 'react';
import { 
    Plus, 
    Trash2, 
    Search, 
    MoreHorizontal, 
    BookOpen, 
    Globe, 
    Clock, 
    CheckCircle, 
    AlertCircle,
    FileText,
    ExternalLink,
    Pencil,
    Loader2
} from 'lucide-react';
import { getPanduans, deletePanduan, addPanduan, updatePanduan, getPlatforms } from '@/app/actions/admin';
import Link from 'next/link';
import Modal from '../components/Modal';

type PanduanData = {
    id: string;
    id_platform: string;
    name: string;
    slug: string;
    status: string;
    content: string; // JSON String
    create_at: Date;
    update_at: Date;
    platform: {
        id: string;
        name: string;
    };
};

export default function PanduanManagementPage() {
    const [panduans, setPanduans] = useState<PanduanData[]>([]);
    const [platforms, setPlatforms] = useState<{id: string, name: string}[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [selectedPanduan, setSelectedPanduan] = useState<PanduanData | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        id_platform: "",
        name: "",
        slug: "",
        status: "Active",
        content: ""
    });

    // Alert State
    const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const fetchData = async () => {
        setLoading(true);
        const [panduanData, platformData] = await Promise.all([
            getPanduans(),
            getPlatforms()
        ]);
        setPanduans(panduanData as any);
        setPlatforms(platformData.map(p => ({ id: p.id, name: p.name })));
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

    // Handle slug auto-generation
    useEffect(() => {
        if (modalMode === 'add' && formData.name) {
            const slug = formData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            setFormData(prev => ({ ...prev, slug }));
        }
    }, [formData.name, modalMode]);

    const handleOpenAddModal = () => {
        setModalMode('add');
        setSelectedPanduan(null);
        setFormData({ id_platform: "", name: "", slug: "", status: "Active", content: "" });
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (panduan: PanduanData) => {
        setModalMode('edit');
        setSelectedPanduan(panduan);
        setFormData({
            id_platform: panduan.id_platform,
            name: panduan.name,
            slug: panduan.slug,
            status: panduan.status,
            content: panduan.content
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Apakah Anda yakin ingin menghapus panduan ini?")) {
            const result = await deletePanduan(id);
            if (result.success) {
                setAlert({ type: 'success', message: 'Panduan berhasil dihapus' });
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
            result = await addPanduan({
                id_platform: formData.id_platform,
                name: formData.name,
                slug: formData.slug,
                content: formData.content || "[]"
            });
        } else {
            result = await updatePanduan(selectedPanduan!.id, formData);
        }

        setIsSubmitting(false);
        if (result.success) {
            setAlert({ type: 'success', message: `Panduan berhasil ${modalMode === 'add' ? 'ditambahkan' : 'diperbarui'}` });
            setIsModalOpen(false);
            fetchData();
        } else {
            setAlert({ type: 'error', message: result.error || 'Terjadi kesalahan' });
        }
    };

    const filteredPanduans = panduans.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'Maintenance': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'Not-Active': return 'bg-rose-50 text-rose-700 border-rose-100';
            default: return 'bg-gray-50 text-gray-700 border-gray-100';
        }
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
                    <h1 className="text-2xl font-bold text-slate-900">Panduan & Tutorial</h1>
                    <p className="text-slate-500 text-sm mt-1">Kelola konten tutorial langkah-langkah pencairan untuk setiap platform.</p>
                </div>
                <button 
                    onClick={handleOpenAddModal}
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-100 active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Buat Panduan Baru
                </button>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden mb-12">
                <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input 
                            type="text" 
                            placeholder="Cari judul, platform, atau slug..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-transparent rounded-xl text-sm focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 outline-none transition-all shadow-inner"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 text-slate-600 font-black border-b border-slate-200 uppercase text-[10px] tracking-[0.2em]">
                            <tr>
                                <th className="px-6 py-4">Judul Panduan</th>
                                <th className="px-6 py-4">Platform</th>
                                <th className="px-6 py-4">URL Slug</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 font-bold uppercase">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="px-6 py-8 h-20 bg-slate-50/30"></td>
                                    </tr>
                                ))
                            ) : filteredPanduans.length > 0 ? (
                                filteredPanduans.map((panduan) => (
                                    <tr key={panduan.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0 border border-indigo-100">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
                                                    {panduan.name}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center gap-2 text-slate-600 text-xs">
                                                <Globe className="w-3.5 h-3.5 text-slate-400" />
                                                {panduan.platform.name}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <code className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-md font-mono lowercase font-medium">
                                                /{panduan.slug}
                                            </code>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black border uppercase tracking-widest ${getStatusStyle(panduan.status)}`}>
                                                {panduan.status === 'Active' ? <CheckCircle className="w-3 h-3 mr-1.5" /> : <AlertCircle className="w-3 h-3 mr-1.5" />}
                                                {panduan.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link 
                                                    href={`/panduan/${panduan.slug}`}
                                                    target="_blank"
                                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                                <button 
                                                    onClick={() => handleOpenEditModal(panduan)}
                                                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(panduan.id)}
                                                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
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
                                        <div className="flex flex-col items-center gap-3">
                                            <BookOpen className="w-16 h-16 text-slate-100" />
                                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Belum Ada Panduan</h3>
                                            <p className="text-slate-500 max-w-xs mx-auto text-xs font-medium normal-case">Silakan buat panduan pertama Anda untuk membantu pengguna melakukan transaksi.</p>
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
                title={modalMode === 'add' ? 'Buat Panduan Baru' : 'Edit Panduan'}
            >
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Nama Panduan</label>
                        <input 
                            type="text"
                            placeholder="Contoh: Cara Cairkan Shopee PayLater"
                            required
                            className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-300 focus:bg-white outline-none transition-all font-bold placeholder:text-slate-300"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Platform</label>
                            <select 
                                required
                                className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-300 focus:bg-white outline-none transition-all font-bold"
                                value={formData.id_platform}
                                onChange={(e) => setFormData({...formData, id_platform: e.target.value})}
                            >
                                <option value="">Pilih Platform</option>
                                {platforms.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Status</label>
                            <select 
                                required
                                className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-300 focus:bg-white outline-none transition-all font-bold"
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                            >
                                <option value="Active">🟢 Aktif</option>
                                <option value="Maintenance">🟠 Maintenance</option>
                                <option value="Not-Active">🔴 Non-Aktif</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">URL Slug</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">/</span>
                            <input 
                                type="text"
                                required
                                className="w-full pl-8 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-300 focus:bg-white outline-none transition-all font-bold"
                                value={formData.slug}
                                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Konten (JSON Format Langkah)</label>
                        <textarea 
                            placeholder='[{"step": 1, "desc": "Buka Aplikasi..."}, ...]'
                            className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-300 focus:bg-white outline-none transition-all font-mono text-xs h-32"
                            value={formData.content}
                            onChange={(e) => setFormData({...formData, content: e.target.value})}
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all mt-4"
                    >
                        {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : (modalMode === 'add' ? 'Simpan Panduan' : 'Update Panduan')}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
