"use client";

import React, { useEffect, useState } from 'react';
import { 
    Search, 
    MoreVertical, 
    Trash2, 
    UserCheck, 
    UserX, 
    Mail, 
    Phone, 
    Calendar,
    Filter,
    CheckCircle,
    XCircle,
    Clock,
    User,
    Eye,
    AlertCircle,
    Loader2
} from 'lucide-react';
import { getUsers, updateUserStatus, deleteUser } from '@/app/actions/admin';
import Modal from '../components/Modal';

type UserData = {
    id: string;
    nama_lengkap: string;
    username: string;
    no_hp: string;
    email: string | null;
    status: string;
    create_at: Date;
};

export default function UserManagementPage() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Modal & Select State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Alert State
    const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const fetchData = async () => {
        setLoading(true);
        const data = await getUsers();
        setUsers(data as any);
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

    const handleOpenViewModal = (user: UserData) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        setIsSubmitting(true);
        const result = await updateUserStatus(id, newStatus);
        setIsSubmitting(false);
        if (result.success) {
            setAlert({ type: 'success', message: `Status pengguna berhasil diubah ke ${newStatus}` });
            fetchData();
            if (selectedUser && selectedUser.id === id) {
                setSelectedUser({...selectedUser, status: newStatus});
            }
        } else {
            setAlert({ type: 'error', message: result.error || 'Gagal mengubah status' });
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Apakah Anda yakin ingin menghapus pengguna ini? Semua data transaksi terkait juga akan terhapus secara permanen.")) {
            const result = await deleteUser(id);
            if (result.success) {
                setAlert({ type: 'success', message: 'Pengguna berhasil dihapus' });
                setIsModalOpen(false);
                fetchData();
            } else {
                setAlert({ type: 'error', message: result.error || 'Gagal menghapus' });
            }
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = 
            user.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) || 
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.no_hp.includes(searchTerm) ||
            (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesStatus = statusFilter === "all" || user.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-100';
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
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manajemen Pelanggan</h1>
                <p className="text-slate-500 text-sm mt-1">Lihat dan kelola seluruh basis pengguna aktif Anda secara real-time.</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <User className="w-16 h-16" />
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1.5">Total User</p>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-slate-900">{users.length}</span>
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                            <User className="w-5 h-5" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1.5">Akun Aktif</p>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-slate-900">{users.filter(u => u.status === 'Active').length}</span>
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                            <UserCheck className="w-5 h-5" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1.5">Pending</p>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-slate-900">{users.filter(u => u.status === 'Pending').length}</span>
                        <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                            <Clock className="w-5 h-5" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1.5">Terblokir</p>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-slate-900">{users.filter(u => u.status === 'Not-Active').length}</span>
                        <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center">
                            <UserX className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Area */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden mb-12">
                <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input 
                            type="text" 
                            placeholder="Cari nama, hp, atau username..."
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border-transparent rounded-2xl text-sm focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 outline-none transition-all shadow-inner"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 rounded-2xl border border-transparent">
                            <Filter className="w-4 h-4 text-slate-400" />
                            <select 
                                className="bg-transparent text-[11px] font-black text-slate-600 uppercase tracking-widest outline-none cursor-pointer"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">Semua Status</option>
                                <option value="Active">🟢 Aktif</option>
                                <option value="Pending">🟠 Menunggu</option>
                                <option value="Not-Active">🔴 Terblokir</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 text-slate-600 font-black border-b border-slate-200 uppercase text-[10px] tracking-[0.2em]">
                            <tr>
                                <th className="px-6 py-5">Profil Pengguna</th>
                                <th className="px-6 py-5">Informasi Kontak</th>
                                <th className="px-6 py-5">Waktu Register</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-bold uppercase">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="px-6 py-10 bg-slate-50/20"></td>
                                    </tr>
                                ))
                            ) : filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
                                                    <img 
                                                        src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.nama_lengkap}&backgroundColor=f1f5f9`}
                                                        alt="User"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="font-black text-slate-900 text-sm tracking-tight group-hover:text-indigo-600 transition-colors">{user.nama_lengkap}</div>
                                                    <div className="text-[10px] text-slate-400 font-bold tracking-widest italic lowercase">@{user.username}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1.5 lowercase font-medium text-slate-600">
                                                <div className="flex items-center text-xs">
                                                    <Phone className="w-3 h-3 mr-2 text-slate-300" />
                                                    {user.no_hp}
                                                </div>
                                                {user.email && (
                                                    <div className="flex items-center text-xs">
                                                        <Mail className="w-3 h-3 mr-2 text-slate-300" />
                                                        {user.email}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center text-slate-500 text-[11px] font-bold">
                                                <Calendar className="w-3.5 h-3.5 mr-2 text-slate-300" />
                                                {new Date(user.create_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black border uppercase tracking-widest ${getStatusStyle(user.status)} shadow-sm`}>
                                                {user.status === 'Active' ? <CheckCircle className="w-3 h-3 mr-1.5" /> : user.status === 'Pending' ? <Clock className="w-3 h-3 mr-1.5" /> : <XCircle className="w-3 h-3 mr-1.5" />}
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    onClick={() => handleOpenViewModal(user)}
                                                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                                    title="Detail Profil"
                                                >
                                                    <Eye className="w-4.5 h-4.5" />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(user.id)}
                                                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                                    title="Hapus User"
                                                >
                                                    <Trash2 className="w-4.5 h-4.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-32 text-center text-slate-300">
                                        <div className="flex flex-col items-center gap-4">
                                            <User className="w-20 h-20 opacity-20" />
                                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Pelanggan tidak ditemukan</h3>
                                            <p className="text-slate-500 text-xs font-medium lowercase">Coba ubah kata kunci pencarian atau filter status Anda.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* USER DETAIL MODAL */}
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title="Profil Lengkap Pelanggan"
            >
                {selectedUser && (
                    <div className="space-y-8">
                        {/* Profile Header */}
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-3xl bg-slate-50 border-2 border-slate-100 overflow-hidden shadow-sm shrink-0">
                                <img 
                                    src={`https://api.dicebear.com/7.x/notionists/svg?seed=${selectedUser.nama_lengkap}`}
                                    alt="User"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{selectedUser.nama_lengkap}</h4>
                                <p className="text-indigo-600 font-bold lowercase tracking-wider mt-0.5">@{selectedUser.username}</p>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black border uppercase tracking-widest mt-3 ${getStatusStyle(selectedUser.status)} shadow-sm`}>
                                    {selectedUser.status}
                                </span>
                            </div>
                        </div>

                        {/* Quick Action Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100 shadow-inner">
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1.5">No Handphone</p>
                                <p className="font-black text-slate-700">{selectedUser.no_hp}</p>
                            </div>
                            <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100 shadow-inner">
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1.5">Alamat Email</p>
                                <p className="font-black text-slate-700 lowercase truncate">{selectedUser.email || '-'}</p>
                            </div>
                        </div>

                        {/* Status Management */}
                        <div className="space-y-4">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Manajemen Akun</p>
                            <div className="grid grid-cols-3 gap-3">
                                {['Active', 'Pending', 'Not-Active'].map((status) => (
                                    <button 
                                        key={status}
                                        disabled={isSubmitting || selectedUser.status === status}
                                        onClick={() => handleStatusChange(selectedUser.id, status)}
                                        className={`px-4 py-4 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all border-2 flex flex-col items-center gap-2 ${
                                            selectedUser.status === status 
                                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100' 
                                            : 'bg-white border-slate-100 text-slate-400 hover:border-indigo-200 hover:text-indigo-600'
                                        }`}
                                    >
                                        {status === 'Active' ? <UserCheck className="w-5 h-5" /> : status === 'Pending' ? <Clock className="w-5 h-5" /> : <UserX className="w-5 h-5" />}
                                        {status === 'Active' ? 'Aktifkan' : status === 'Pending' ? 'Tunda' : 'Blokir'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">ID: {selectedUser.id.slice(0, 16)}...</p>
                            <button 
                                onClick={() => handleDelete(selectedUser.id)}
                                className="flex items-center gap-2 text-rose-500 hover:text-rose-700 font-black text-[10px] uppercase tracking-widest transition-colors py-2 px-4 hover:bg-rose-50 rounded-2xl"
                            >
                                <Trash2 className="w-4 h-4" />
                                Hapus Akun Selamanya
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
