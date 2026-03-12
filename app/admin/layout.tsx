"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from './layout/sidebar/Sidebar';
import { Menu, Search, Bell, ChevronDown } from 'lucide-react';
import { getUserAction } from '../actions/auth';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState<{ nama_lengkap: string } | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUserAction();
            if (data) setUser(data as any);
        };
        fetchUser();
    }, []);

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* HEADER */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-10">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden text-slate-500 hover:text-slate-700"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Kolom Pencarian */}
                        <div className="hidden sm:flex items-center relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3" />
                            <input
                                type="text"
                                placeholder="Cari data pelanggan atau invoice..."
                                className="pl-9 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 outline-none w-64 lg:w-96 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                        <button className="relative text-slate-500 hover:text-slate-700 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
                        </button>
                        <div className="hidden sm:block w-px h-6 bg-slate-200"></div>
                        <div className="flex items-center gap-3">
                            <div className="hidden md:block text-right">
                                <p className="text-xs font-bold text-slate-900 leading-tight">{user?.nama_lengkap || 'Admin'}</p>
                                <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Super Admin</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 overflow-hidden">
                                <img 
                                    src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.nama_lengkap || 'Admin'}&backgroundColor=e0e7ff`} 
                                    alt="Admin" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {/* CONTENT AREA */}
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
