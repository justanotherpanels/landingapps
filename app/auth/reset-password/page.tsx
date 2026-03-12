"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Eye,
    EyeOff,
    Lock,
    ArrowRight,
    ShieldCheck,
    ChevronLeft,
} from "lucide-react";

export default function ResetPasswordPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate reset process
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div
                className="min-h-screen w-full font-sans flex flex-col items-center justify-center px-5"
                style={{
                    background: "linear-gradient(160deg, #0f0c29 0%, #1a1040 40%, #0f1a2e 100%)",
                }}
            >
                <div className="w-full max-w-md scale-up text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-full bg-emerald-500/20 p-5 ring-8 ring-emerald-500/10">
                            <ShieldCheck size={48} className="text-emerald-500" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-black text-white sm:text-3xl">Password Diperbarui!</h2>
                    <p className="mt-4 text-slate-400">
                        Password Anda telah berhasil diubah. Sekarang Anda dapat masuk kembali ke akun Anda.
                    </p>
                    <Link
                        href="/auth/login"
                        className="mt-10 flex items-center justify-center gap-2 rounded-2xl bg-orange-600 py-4 text-sm font-bold text-white shadow-xl shadow-orange-600/30 transition-all hover:bg-orange-500 active:scale-95"
                    >
                        Masuk Sekarang
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        );
    }

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
                    href="/auth/forget"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-white"
                >
                    <ChevronLeft size={18} />
                    Kembali
                </Link>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-10 sm:px-8">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="mb-8 flex flex-col items-center text-center sm:mb-10">
                        <Link href="/" className="mb-4 block">
                            <img src="/logo.png" alt="Paylaterku Logo" className="h-16 w-auto object-contain" />
                        </Link>
                        <h2 className="text-2xl font-black text-white sm:text-3xl">Buat Password Baru</h2>
                        <p className="mt-2 text-sm text-slate-400">
                            Demi keamanan, harap gunakan kombinasi password yang kuat dan unik.
                        </p>
                    </div>

                    {/* Card */}
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
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* New Password */}
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest pl-1">
                                        Password Baru
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password baru"
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

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest pl-1">
                                        Konfirmasi Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Ulangi password baru"
                                            className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-12 text-sm text-white focus:border-orange-500/60 focus:bg-white/10 outline-none transition-all placeholder:text-slate-600"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading || !password || password !== confirmPassword}
                                    className="relative mt-4 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl py-4 text-sm font-bold text-white shadow-xl transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                    style={{
                                        background: isLoading
                                            ? "linear-gradient(135deg, #ea580c, #c2410c)"
                                            : "linear-gradient(135deg, #f97316, #ea580c)",
                                        boxShadow: password && password === confirmPassword ? "0 8px 32px rgba(234,88,12,0.35)" : "none",
                                    }}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            Simpan Password Baru
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
