"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Eye,
    EyeOff,
    User,
    AtSign,
    Phone,
    Mail,
    Lock,
    ArrowRight,
    ShieldCheck,
    ChevronLeft,
} from "lucide-react";
import { registerAction } from "@/app/actions/auth";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        nama_lengkap: "",
        username: "",
        no_hp: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        const result = await registerAction(formData);
        
        if (result?.error) {
            setErrorMessage(result.error);
            setIsLoading(false);
        } else if (result?.success) {
            // Success
            window.location.href = "/auth/login?registered=success";
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div
            className="min-h-screen w-full font-sans flex flex-col"
            style={{
                background: "linear-gradient(160deg, #0f0c29 0%, #1a1040 40%, #0f1a2e 100%)",
            }}
        >
            {/* Ambient Glow */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div
                    className="absolute -top-32 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full opacity-20 blur-[100px]"
                    style={{ background: "radial-gradient(circle, #f97316, transparent)" }}
                />
            </div>

            {/* Back Button */}
            <div className="relative z-10 p-5 sm:p-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-white"
                >
                    <ChevronLeft size={18} />
                    Kembali
                </Link>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-10 sm:px-8">
                <div className="w-full max-w-lg">
                    {/* Header */}
                    <div className="mb-8 flex flex-col items-center text-center sm:mb-10">
                        <Link href="/" className="mb-4 block">
                            <img src="/logo.png" alt="Paylaterku Logo" className="h-16 w-auto object-contain" />
                        </Link>
                        <h1 className="text-2xl font-black text-white sm:text-3xl">
                            Daftar Akun Baru
                        </h1>
                        <p className="mt-2 text-sm text-slate-400">
                            Sudah punya akun?{" "}
                            <Link
                                href="/auth/login"
                                className="font-semibold text-orange-400 hover:text-orange-300 transition-colors"
                            >
                                Masuk sekarang
                            </Link>
                        </p>
                    </div>

                    {/* Form Card */}
                    <div
                        className="relative overflow-hidden rounded-3xl p-0.5 shadow-2xl"
                        style={{
                            background: "linear-gradient(135deg, rgba(249,115,22,0.4), rgba(79,70,229,0.2))",
                        }}
                    >
                        <div
                            className="rounded-[22px] p-6 sm:p-8"
                            style={{ background: "linear-gradient(135deg, #1a1730, #111827)" }}
                        >
                            {errorMessage && (
                                <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-xs text-red-500 text-center animate-pulse">
                                    {errorMessage}
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Nama Lengkap */}
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest pl-1">
                                        Nama Lengkap
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500">
                                            <User size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            name="nama_lengkap"
                                            value={formData.nama_lengkap}
                                            onChange={handleChange}
                                            placeholder="Masukkan nama lengkap"
                                            className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm text-white focus:border-orange-500/60 focus:bg-white/10 outline-none transition-all placeholder:text-slate-600"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Username */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest pl-1">
                                            Username
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500">
                                                <AtSign size={18} />
                                            </div>
                                            <input
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                placeholder="Username"
                                                className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm text-white focus:border-orange-500/60 focus:bg-white/10 outline-none transition-all placeholder:text-slate-600"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Nomor HP */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest pl-1">
                                            Nomor HP
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500">
                                                <Phone size={18} />
                                            </div>
                                            <input
                                                type="tel"
                                                name="no_hp"
                                                value={formData.no_hp}
                                                onChange={handleChange}
                                                placeholder="08xxxxxxxxxx"
                                                className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm text-white focus:border-orange-500/60 focus:bg-white/10 outline-none transition-all placeholder:text-slate-600"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Email (Optional) */}
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest pl-1">
                                        Email <span className="text-slate-600">(Opsional)</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="email@contoh.com"
                                            className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm text-white focus:border-orange-500/60 focus:bg-white/10 outline-none transition-all placeholder:text-slate-600"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest pl-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Buat password kuat"
                                            className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-12 text-sm text-white focus:border-orange-500/60 focus:bg-white/10 outline-none transition-all placeholder:text-slate-600"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="relative mt-4 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl py-4 text-sm font-bold text-white shadow-xl transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                    style={{
                                        background: isLoading
                                            ? "linear-gradient(135deg, #ea580c, #c2410c)"
                                            : "linear-gradient(135deg, #f97316, #ea580c)",
                                        boxShadow: "0 8px 32px rgba(234,88,12,0.35)",
                                    }}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Mendaftarkan...
                                        </>
                                    ) : (
                                        <>
                                            Daftar Sekarang
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Security Note */}
                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-600">
                        <ShieldCheck size={14} className="text-emerald-500/70" />
                        <span>Data Anda aman dan terenkripsi secara otomatis</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
