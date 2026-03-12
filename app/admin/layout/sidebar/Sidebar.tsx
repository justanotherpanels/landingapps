"use client";

import React, { useEffect, useState } from 'react';
import {
    LayoutDashboard,
    Users,
    LogOut,
    Activity,
    CreditCard,
    X,
    BookOpen,
    Smartphone,
    DollarSign,
    Layers
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAction, getUserAction } from '@/app/actions/auth';

type SidebarProps = {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
};

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Pelanggan', icon: Users, href: '/admin/user' },
    { name: 'Transaksi Gestun', icon: CreditCard, href: '/admin/transaksi-gestun' },
    { name: 'Platform', icon: Smartphone, href: '/admin/platform' },
    { name: 'Biaya Admin', icon: DollarSign, href: '/admin/admin-fee' },
    { name: 'Panduan', icon: BookOpen, href: '/admin/panduan' },
];

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    const pathname = usePathname();
    const [user, setUser] = useState<{ nama_lengkap: string; email: string | null } | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUserAction();
            if (data) setUser(data as any);
        };
        fetchUser();
    }, []);

    return (
        <>
            {/* Overlay untuk mobile sidebar */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* --- SIDEBAR --- */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <Activity className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                            AdminPro
                        </span>
                    </Link>
                    <button className="lg:hidden text-slate-400 hover:text-slate-600" onClick={() => setIsOpen(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-4 overflow-y-auto h-[calc(100vh-4rem)] flex flex-col justify-between">
                    <nav className="space-y-1">
                        <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-4">Menu Utama</p>
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                            ? 'bg-indigo-50 text-indigo-700'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Profil Singkat di Bawah Sidebar */}
                    <div className="mt-8 pt-4 border-t border-slate-200">
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold border border-indigo-200 overflow-hidden shrink-0">
                                <img
                                    src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.nama_lengkap || 'Admin'}&backgroundColor=e0e7ff`}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-900 truncate">{user?.nama_lengkap || 'Admin User'}</p>
                                <p className="text-xs text-slate-500 truncate">{user?.email || 'admin@paylaterku.com'}</p>
                            </div>
                            <button 
                                onClick={() => logoutAction()}
                                className="p-1.5 hover:bg-rose-50 rounded-lg transition-colors group/logout"
                                title="Log Out"
                            >
                                <LogOut className="w-4 h-4 text-slate-400 group-hover/logout:text-rose-500 transition-colors" />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

