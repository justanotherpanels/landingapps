"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    Eye,
    EyeOff,
    User,
    Lock,
    ArrowRight,
    ShieldCheck,
    ChevronLeft,
} from "lucide-react";
import { loginAction } from "@/app/actions/auth";

export default function LoginPage() {
    const searchParams = useSearchParams();
    const registeredSuccess = searchParams.get("registered") === "success";

    const [showPassword, setShowPassword] = useState(false);
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        const result = await loginAction(identifier, password);
        
        if (result?.error) {
            setErrorMessage(result.error);
            setIsLoading(false);
        } else if (result?.success) {
            window.location.href = "/user";
        }
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
                <div className="w-full max-w-md">

                    {/* Logo */}
                    <div className="mb-8 flex flex-col items-center text-center sm:mb-10">
                        <Link href="/" className="mb-4 block">
                            <img src="/logo.png" alt="Paylaterku Logo" className="h-16 w-auto object-contain" />
                        </Link>
                        <h1 className="text-2xl font-black text-white sm:text-3xl">
                            Masuk ke Paylaterku
                        </h1>
                        <p className="mt-2 text-sm text-slate-400">
                            Belum punya akun?{" "}
                            <Link
                                href="/auth/register"
                                className="font-semibold text-orange-400 hover:text-orange-300 transition-colors"
                            >
                                Daftar gratis
                            </Link>
                        </p>
                    </div>

                    {/* Card Form */}
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
                            {registeredSuccess && (
                                <div className="mb-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-xs text-emerald-500 text-center">
                                    Pendaftaran berhasil! Silakan masuk ke akun Anda.
                                </div>
                            )}
                            {errorMessage && (
                                <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-xs text-red-500 text-center animate-pulse">
                                    {errorMessage}
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                {/* Identifier Field */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest pl-1">
                                        Username / Nomor HP / Email
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                                            <User size={18} className="text-slate-500" />
                                        </div>
                                        <input
                                            type="text"
                                            value={identifier}
                                            onChange={(e) => setIdentifier(e.target.value)}
                                            placeholder="Masukkan akun Anda"
                                            className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-orange-500/60 focus:bg-white/10 focus:ring-2 focus:ring-orange-500/20"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest pl-1">
                                            Password
                                        </label>
                                        <Link
                                            href="/auth/forget"
                                            className="text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
                                        >
                                            Lupa password?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                                            <Lock size={18} className="text-slate-500" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Masukkan password"
                                            className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-12 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-orange-500/60 focus:bg-white/10 focus:ring-2 focus:ring-orange-500/20"
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

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="relative mt-2 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl py-4 text-sm font-bold text-white shadow-xl transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
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
                                            Memverifikasi...
                                        </>
                                    ) : (
                                        <>
                                            Masuk Sekarang
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
                        <span>Data Anda dienkripsi dan aman bersama kami</span>
                    </div>

                </div>
            </div>
        </div>
    );
}
