"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useProgressStore } from "@/lib/progress-store";
import {
  LayoutDashboard, Flame, CheckCircle2, Star, Award, TrendingUp, ArrowRight, BookOpen,
  Shield, Eye, GitMerge, AlertTriangle, Zap, GitBranch
} from "lucide-react";

interface StatEntry { label: string; color: string; topics: number; modules: number; }
type Stats = Record<string, StatEntry>;

const colorBar: Record<string, string> = {
  red: "bg-red-500", blue: "bg-blue-500", purple: "bg-purple-500", emerald: "bg-emerald-500",
  orange: "bg-orange-500", sky: "bg-sky-500", amber: "bg-amber-500", teal: "bg-teal-500",
  indigo: "bg-indigo-500", pink: "bg-pink-500", yellow: "bg-yellow-500",
};
const colorText: Record<string, string> = {
  red: "text-red-400", blue: "text-blue-400", purple: "text-purple-400", emerald: "text-emerald-400",
  orange: "text-orange-400", sky: "text-sky-400", amber: "text-amber-400", teal: "text-teal-400",
  indigo: "text-indigo-400", pink: "text-pink-400", yellow: "text-yellow-400",
};

export default function PanelPage() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const store = useProgressStore();

  useEffect(() => {
    setMounted(true);
    store.recordVisit();
    fetch("/learn-stats.json").then((r) => r.json()).then(setStats).catch(() => setStats({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) {
    return <div className="p-10 text-center text-terminal-comment">Panel yükleniyor…</div>;
  }

  const completedCount = store.completedCount();
  const streak = store.getStreak();
  const favorites = store.favorites;

  // Genel ilerleme
  const totalModules = stats ? Object.values(stats).reduce((a, s) => a + s.modules, 0) : 0;
  const overall = totalModules ? Math.round((completedCount / totalModules) * 100) : 0;

  // Bölüm bazlı tamamlanan modül sayısı
  const doneByTeam = (team: string) =>
    Object.keys(store.completed).filter((k) => k.startsWith(team + "/") && store.completed[k]).length;

  // Rozetler
  const badges = [
    { id: "first", label: "İlk Adım", desc: "İlk modülünü tamamla", icon: "🌱", earned: completedCount >= 1 },
    { id: "ten", label: "Isınıyor", desc: "10 modül tamamla", icon: "🔥", earned: completedCount >= 10 },
    { id: "twentyfive", label: "Azimli", desc: "25 modül tamamla", icon: "⚡", earned: completedCount >= 25 },
    { id: "fifty", label: "Uzman Yolu", desc: "50 modül tamamla", icon: "🏆", earned: completedCount >= 50 },
    { id: "streak3", label: "İstikrar", desc: "3 gün üst üste", icon: "📅", earned: streak >= 3 },
    { id: "streak7", label: "Disiplin", desc: "7 gün üst üste", icon: "💎", earned: streak >= 7 },
    { id: "fav", label: "Koleksiyoncu", desc: "İlk favorini ekle", icon: "⭐", earned: favorites.length >= 1 },
  ];
  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <LayoutDashboard className="w-7 h-7 text-terminal-green" />
        <h1 className="text-2xl font-bold text-terminal-white">İlerleme Panelin</h1>
      </div>

      {/* Üst kartlar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl border border-surface-3 bg-surface-1 p-5">
          <div className="flex items-center gap-2 text-xs text-terminal-comment mb-2"><TrendingUp className="w-4 h-4" /> Genel İlerleme</div>
          <div className="text-3xl font-bold font-mono text-terminal-white">%{overall}</div>
          <div className="mt-2 h-2 rounded-full bg-surface-3 overflow-hidden">
            <div className="h-full bg-terminal-green transition-all" style={{ width: `${overall}%` }} />
          </div>
        </div>
        <div className="rounded-xl border border-surface-3 bg-surface-1 p-5">
          <div className="flex items-center gap-2 text-xs text-terminal-comment mb-2"><CheckCircle2 className="w-4 h-4" /> Tamamlanan</div>
          <div className="text-3xl font-bold font-mono text-terminal-white">{completedCount}<span className="text-base text-terminal-comment">/{totalModules || "…"}</span></div>
          <div className="text-xs text-terminal-comment mt-1">modül</div>
        </div>
        <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5">
          <div className="flex items-center gap-2 text-xs text-orange-400/80 mb-2"><Flame className="w-4 h-4" /> Seri (Streak)</div>
          <div className="text-3xl font-bold font-mono text-orange-300">{streak} <span className="text-base">gün</span></div>
          <div className="text-xs text-terminal-comment mt-1">{streak > 0 ? "Devam et! 🔥" : "Bugün başla"}</div>
        </div>
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
          <div className="flex items-center gap-2 text-xs text-amber-400/80 mb-2"><Award className="w-4 h-4" /> Rozetler</div>
          <div className="text-3xl font-bold font-mono text-amber-300">{earnedCount}<span className="text-base text-terminal-comment">/{badges.length}</span></div>
          <div className="text-xs text-terminal-comment mt-1">kazanıldı</div>
        </div>
      </div>

      {/* Siber Güvenlik Hızlı Erişim */}
      <h2 className="text-sm font-mono text-terminal-comment uppercase tracking-wider mb-4">Siber Güvenlik</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
        {[
          { href: "/metodoloji",  icon: GitBranch,     label: "Metodoloji",   color: "fuchsia", bar: "bg-fuchsia-500",  text: "text-fuchsia-400",  border: "border-fuchsia-500/30",  bg: "bg-fuchsia-500/5" },
          { href: "/red-team",    icon: Shield,        label: "Red Team",     color: "red",     bar: "bg-red-500",      text: "text-red-400",      border: "border-red-500/30",      bg: "bg-red-500/5" },
          { href: "/blue-team",   icon: Eye,           label: "Blue Team",    color: "blue",    bar: "bg-blue-500",     text: "text-blue-400",     border: "border-blue-500/30",     bg: "bg-blue-500/5" },
          { href: "/purple-team", icon: GitMerge,      label: "Purple Team",  color: "purple",  bar: "bg-purple-500",   text: "text-purple-400",   border: "border-purple-500/30",   bg: "bg-purple-500/5" },
          { href: "/owasp-top10", icon: AlertTriangle, label: "OWASP Top 10", color: "amber",   bar: "bg-amber-500",    text: "text-amber-400",    border: "border-amber-500/30",    bg: "bg-amber-500/5" },
          { href: "/cheatsheet",  icon: Zap,           label: "Cheat Sheet",  color: "yellow",  bar: "bg-yellow-500",   text: "text-yellow-400",   border: "border-yellow-500/30",   bg: "bg-yellow-500/5" },
        ].map(({ href, icon: Icon, label, text, border, bg }) => {
          const done = doneByTeam(href.slice(1));
          return (
            <Link key={href} href={href} className="group">
              <div className={`rounded-xl border ${border} ${bg} p-3 text-center hover:opacity-90 transition-all`}>
                <Icon className={`w-5 h-5 mx-auto mb-1.5 ${text}`} />
                <p className={`text-xs font-semibold ${text}`}>{label}</p>
                {done > 0 && (
                  <p className="text-[10px] text-terminal-comment mt-0.5">{done} modül</p>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bölüm ilerlemeleri */}
      <h2 className="text-sm font-mono text-terminal-comment uppercase tracking-wider mb-4">Tüm Bölümler</h2>
      <div className="space-y-3 mb-10">
        {stats && Object.entries(stats).sort((a, b) => b[1].modules - a[1].modules).map(([dir, s]) => {
          const done = doneByTeam(dir);
          const pct = s.modules ? Math.round((done / s.modules) * 100) : 0;
          return (
            <Link key={dir} href={`/${dir}`} className="block group">
              <div className="rounded-lg border border-surface-3 bg-surface-1 p-4 hover:border-surface-2 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-semibold ${colorText[s.color] ?? "text-terminal-white"} group-hover:underline`}>{s.label}</span>
                  <span className="text-xs font-mono text-terminal-comment">{done}/{s.modules} modül · %{pct}</span>
                </div>
                <div className="h-2 rounded-full bg-surface-3 overflow-hidden">
                  <div className={`h-full ${colorBar[s.color] ?? "bg-terminal-green"} transition-all`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            </Link>
          );
        })}
        {!stats && <div className="text-sm text-terminal-comment">İstatistikler yükleniyor…</div>}
      </div>

      {/* Rozetler */}
      <h2 className="text-sm font-mono text-terminal-comment uppercase tracking-wider mb-4">Rozetler</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-10">
        {badges.map((b) => (
          <div key={b.id} title={b.desc} className={`rounded-xl border p-3 text-center transition-all ${b.earned ? "border-amber-500/30 bg-amber-500/5" : "border-surface-3 bg-surface-1 opacity-50 grayscale"}`}>
            <div className="text-3xl mb-1">{b.icon}</div>
            <div className="text-xs font-semibold text-terminal-white">{b.label}</div>
            <div className="text-[10px] text-terminal-comment mt-0.5">{b.desc}</div>
          </div>
        ))}
      </div>

      {/* Favoriler */}
      <h2 className="text-sm font-mono text-terminal-comment uppercase tracking-wider mb-4 flex items-center gap-2">
        <Star className="w-4 h-4 text-amber-400" /> Favorilerin ({favorites.length})
      </h2>
      {favorites.length === 0 ? (
        <div className="rounded-lg border border-dashed border-surface-3 p-6 text-center text-sm text-terminal-comment">
          Henüz favori yok. Bir modülde <Star className="w-3.5 h-3.5 inline text-amber-400" /> simgesine tıklayarak favorilerine ekle.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {favorites.map((f) => (
            <Link key={f.url} href={f.url} className="group flex items-center justify-between rounded-lg border border-surface-3 bg-surface-1 p-3 hover:border-amber-500/40 transition-all">
              <div className="min-w-0">
                <div className="text-sm text-terminal-white truncate group-hover:text-amber-300">{f.title}</div>
                <div className="text-[11px] text-terminal-comment">{f.cat}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-terminal-comment group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-2 border border-surface-3 text-sm text-terminal-comment hover:text-terminal-white transition-all">
          <BookOpen className="w-4 h-4" /> Öğrenmeye devam et
        </Link>
        <Link href="/quiz" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-terminal-green/10 border border-terminal-green/30 text-sm text-terminal-green hover:bg-terminal-green/20 transition-all">
          <CheckCircle2 className="w-4 h-4" /> Kendini test et
        </Link>
      </div>
    </div>
  );
}
