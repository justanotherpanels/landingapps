// Server Component – no "use client" needed
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import Link from "next/link";
import ServiceTabs from "./components/ServiceTabs";

const STATS = [
  { value: "50K+", label: "Pengguna Aktif" },
  { value: "99%", label: "Sukses Proses" },
  { value: "Cepat", label: "Proses Pencairan" },
  { value: "24/7", label: "Customer Service" },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Proses Mudah",
    desc: "Cukup 3 langkah lewat sistem kami: daftar, verifikasi limit, dan dana masuk ke rekening atau e-wallet Anda.",
    gradient: "from-yellow-400 to-orange-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  {
    icon: ShieldCheck,
    title: "100% Aman",
    desc: "Data pribadi Anda terenkripsi dan terlindungi penuh oleh sistem kami.",
    gradient: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: TrendingUp,
    title: "Fee Termurah",
    desc: "Potongan transparan dan kompetitif, tanpa biaya tersembunyi sama sekali.",
    gradient: "from-blue-400 to-indigo-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: BadgeCheck,
    title: "Terpercaya",
    desc: "50.000+ pengguna aktif dengan ribuan testimoni bintang lima nyata.",
    gradient: "from-violet-400 to-purple-600",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Daftar & Pilih Layanan",
    desc: "Pilih platform paylater atau kartu kredit yang ingin dicairkan, lalu masukkan nominal yang diinginkan.",
    icon: MessageCircle,
    color: "from-violet-500 to-indigo-600",
  },
  {
    step: "02",
    title: "Proses Transaksi",
    desc: "Sistem kami akan memproses dan mengarahkan transaksi secara otomatis sesuai prosedur.",
    icon: CreditCard,
    color: "from-blue-500 to-cyan-500",
  },
  {
    step: "03",
    title: "Dana Cair!",
    desc: "Selesai! Dana langsung ditransfer ke rekening atau e-wallet Anda saat itu juga.",
    icon: Wallet,
    color: "from-emerald-500 to-teal-500",
  },
];

export default function Home() {
  return (
    <div
      className="w-full font-sans tracking-tight"
      style={{
        backgroundColor: "#0f0c29",
        backgroundImage: "linear-gradient(135deg, #0f0c29 0%, #1a1040 35%, #212044 60%, #0f1a2e 100%)",
        backgroundAttachment: "fixed",
      }}
    >

      {/* =========== HEADER =========== */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 md:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Paylaterku Logo" className="h-10 w-auto object-contain" />
          </Link>

          <Link
            href="/auth/login"
            className="flex items-center gap-2 rounded-full bg-orange-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-orange-600/30 transition-all hover:bg-orange-500 active:scale-95 sm:text-sm sm:px-5"
          >
            <Zap size={14} className="fill-white" aria-hidden="true" />
            <span>Cairkan Sekarang</span>
          </Link>
        </div>
      </header>

      {/* =========== MAIN CONTENT =========== */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8">

        {/* =========== HERO =========== */}
        <section aria-labelledby="hero-heading" className="py-10 sm:py-14 md:py-20">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            {/* Left: Copy */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-200">
                {/* CSS-only ping dot */}
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-80"></span>
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                </span>
                Terpercaya · Cepat · Murah
              </div>

              <h1 id="hero-heading" className="mb-5 text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl md:text-4xl lg:text-5xl">
                Cairkan Limit{" "}
                <span
                  className="block bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #a78bfa, #38bdf8, #34d399)" }}
                >
                  Paylater & CC
                </span>{" "}
                Mudah & Terpercaya
              </h1>

              <p className="mb-8 text-sm leading-relaxed text-slate-200 sm:text-base md:text-sm lg:text-base">
                Jasa gestun resmi paling terpercaya. Fee transparan tanpa biaya tersembunyi. Proses dilakukan by sistem, dana langsung masuk ke rekening atau e-wallet Anda!
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/auth/login"
                  className="group flex items-center justify-center gap-2.5 rounded-2xl bg-orange-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-orange-600/30 transition-all hover:bg-orange-500 active:scale-95"
                >
                  <Zap size={18} className="fill-white" aria-hidden="true" />
                  Cairkan Sekarang
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <a
                  href="#layanan"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
                >
                  Lihat Layanan
                </a>
              </div>
            </div>

            {/* Right: Floating Card Visual */}
            <div className="relative flex items-center justify-center" aria-hidden="true">
              <div
                className="relative w-full max-w-[320px] rounded-3xl p-0.5 shadow-2xl sm:max-w-sm md:max-w-xs lg:max-w-sm"
                style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.6), rgba(16,185,129,0.3))" }}
              >
                <div
                  className="rounded-[22px] p-6"
                  style={{ background: "linear-gradient(135deg, #1e1b4b, #0f172a)" }}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard size={20} className="text-violet-400" />
                      <span className="text-xs font-semibold text-slate-300">Saldo Tersedia</span>
                    </div>
                    <Sparkles size={16} className="text-emerald-400" />
                  </div>
                  <p className="mb-1 text-3xl font-black text-white sm:text-4xl">Rp 5.000.000</p>
                  <p className="mb-6 text-xs text-emerald-400">✓ Siap Dicairkan</p>
                  <div className="mb-4 h-px bg-white/10" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400">PLATFORM</p>
                      <p className="text-sm font-bold text-white">Shopee Paylater</p>
                    </div>
                    <div className="rounded-xl bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-400">
                      Fee 5%
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <div className="absolute -left-4 top-4 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md sm:-left-8">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-500/20">
                    <BadgeCheck size={14} className="text-violet-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">Status</p>
                    <p className="text-xs font-bold text-white">Terpercaya 🏆</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 bottom-8 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md sm:-right-8">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/20">
                    <ShieldCheck size={14} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">Privasi</p>
                    <p className="text-xs font-bold text-white">100% Aman 🔒</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========== STATS BAR =========== */}
        <section aria-label="Statistik layanan" className="mb-10 sm:mb-14">
          <dl className="grid grid-cols-2 gap-3 rounded-3xl border border-white/5 bg-white/5 p-4 sm:grid-cols-4 sm:p-6 sm:gap-0 sm:divide-x sm:divide-white/10">
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center sm:px-4">
                <dt className="sr-only">{stat.label}</dt>
                <dd
                  className="text-2xl font-black sm:text-3xl"
                  style={{ backgroundImage: "linear-gradient(90deg, #a78bfa, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  {stat.value}
                </dd>
                <span className="mt-1 text-xs text-slate-300" aria-hidden="true">{stat.label}</span>
              </div>
            ))}
          </dl>
        </section>

        {/* =========== LAYANAN (Client Component) =========== */}
        <ServiceTabs />

        {/* =========== KEUNGGULAN =========== */}
        <section aria-labelledby="keunggulan-heading" className="mb-10 sm:mb-14">
          <h2 id="keunggulan-heading" className="mb-2 text-xl font-black text-white sm:text-2xl">Kenapa Paylaterku?</h2>
          <p className="mb-6 text-xs text-slate-300 sm:text-sm">Ribuan pelanggan sudah mempercayai kami</p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-2xl border ${feature.border} ${feature.bg} p-5 sm:p-6`}
                >
                  <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg`} aria-hidden="true">
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-white sm:text-lg">{feature.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========== CARA KERJA =========== */}
        <section aria-labelledby="cara-kerja-heading" className="mb-10 sm:mb-14">
          <h2 id="cara-kerja-heading" className="mb-2 text-xl font-black text-white sm:text-2xl">Cara Kerja</h2>
          <p className="mb-8 text-xs text-slate-300 sm:text-sm">Mudah dalam 3 langkah</p>

          <ol className="grid grid-cols-1 gap-0 sm:grid-cols-3 sm:gap-4">
            {STEPS.map((item, i) => {
              const Icon = item.icon;
              return (
                <li key={i} className="relative flex gap-4 sm:flex-col sm:gap-3">
                  {i < 2 && (
                    <div className="absolute left-[22px] top-14 h-full w-[2px] bg-gradient-to-b from-violet-500/40 to-transparent sm:hidden" aria-hidden="true" />
                  )}
                  <div className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} shadow-lg sm:h-12 sm:w-12`} aria-hidden="true">
                    <Icon size={20} className="text-white" />
                    <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0f0c29] text-[10px] font-black text-white ring-2 ring-violet-500/50">
                      {i + 1}
                    </div>
                  </div>
                  <div className="pb-8 sm:pb-0">
                    <p className="mb-1 text-[10px] font-bold text-slate-400 sm:text-xs">LANGKAH {item.step}</p>
                    <h3 className="mb-2 text-sm font-bold text-white sm:text-base">{item.title}</h3>
                    <p className="text-xs leading-relaxed text-slate-300">{item.desc}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* =========== CTA BOTTOM =========== */}
        <section aria-labelledby="cta-heading" className="mb-8 sm:mb-12">
          <div
            className="relative overflow-hidden rounded-3xl p-6 sm:p-10"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(16,185,129,0.15))" }}
          >
            <div
              className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 blur-3xl sm:-right-20 sm:-top-20 sm:h-60 sm:w-60"
              style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full opacity-20 blur-2xl sm:-bottom-16 sm:-left-16 sm:h-48 sm:w-48"
              style={{ background: "radial-gradient(circle, #10b981, transparent)" }}
              aria-hidden="true"
            />
            <div className="relative">
              <p className="mb-2 text-xs font-semibold text-violet-200 sm:text-sm">Siap Mencairkan Dana?</p>
              <h2 id="cta-heading" className="mb-3 text-2xl font-black text-white sm:text-3xl md:text-4xl">
                Mulai sekarang,<br />gratis konsultasi!
              </h2>
              <p className="mb-6 text-xs text-slate-300 sm:text-sm">
                Sistem kami beroperasi 24/7. Tidak perlu antri, proses langsung berjalan otomatis!
              </p>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-3 rounded-2xl bg-orange-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-orange-600/30 transition-all hover:bg-orange-500 active:scale-95 sm:text-base"
              >
                <Zap size={20} className="fill-white" aria-hidden="true" />
                Mulai Sekarang
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-6 text-center">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Paylaterku
          </p>
        </footer>
      </main>

      {/* Sticky Bottom CTA – mobile only */}
      <div className="sticky bottom-0 z-50 border-t border-white/5 bg-black/50 p-3 backdrop-blur-xl md:hidden">
        <Link
          href="/auth/login"
          className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-orange-600 py-4 text-sm font-bold text-white shadow-xl shadow-orange-600/30 transition-all hover:bg-orange-500 active:scale-95"
        >
          <Zap size={18} className="fill-white" aria-hidden="true" />
          Cairkan Sekarang
        </Link>
      </div>
    </div>
  );
}
