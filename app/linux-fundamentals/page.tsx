import Link from "next/link";
import { Terminal, ArrowRight } from "lucide-react";

const topics = [
  { slug: "terminal-basics",       icon: "🖥️",  title: "Terminal & Shell Temelleri",   desc: "Bash nedir, komut yapısı, man sayfaları, history, Tab tamamlama", level: "Başlangıç" },
  { slug: "filesystem-navigation", icon: "📁",  title: "Dosya Sistemi Navigasyonu",    desc: "ls, ls -l, ls -la, pwd, cd, tree — Linux dosya hiyerarşisi", level: "Başlangıç" },
  { slug: "file-operations",       icon: "✏️",  title: "Dosya & Dizin Yönetimi",       desc: "mkdir -p, touch, nano, cat, cp, mv, rm — temelden ileriye tam kapsam", level: "Başlangıç" },
  { slug: "text-processing",       icon: "🔍",  title: "Metin İşleme & Pipe",          desc: "grep, find, awk, sed, sort, pipe (|), redirect (>, >>, 2>)", level: "Başlangıç–Orta" },
  { slug: "permissions",           icon: "🔐",  title: "İzinler & Kullanıcılar",       desc: "chmod, chown, sudo, useradd — rwxrwxrwx ve octal izin sistemi", level: "Orta" },
  { slug: "process-management",    icon: "⚙️",  title: "Süreç Yönetimi",               desc: "ps, top, kill, systemctl, jobs, bg/fg — süreç kontrolü", level: "Orta" },
  { slug: "networking-linux",      icon: "🌐",  title: "Ağ Komutları",                 desc: "ip, ss, curl, wget, ssh, scp, nc — ağ yönetimi ve bağlantı", level: "Orta" },
  { slug: "package-management",    icon: "📦",  title: "Paket Yönetimi",               desc: "apt, dpkg, snap, pip — paket kurma, güncelleme, kaldırma", level: "Orta" },
  { slug: "bash-scripting",        icon: "📜",  title: "Bash Scripting Temelleri",     desc: "Değişkenler, if/else, for/while döngüleri, fonksiyonlar, cron", level: "Orta–İleri" },
];

export default function LinuxFundamentalsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Terminal className="w-7 h-7 text-orange-400" />
        <h1 className="text-2xl font-bold text-terminal-white">Linux Eğitimi</h1>
      </div>
      <p className="text-terminal-comment mb-2 ml-10">
        Temelden ileriye Linux. Her komut, her konsept — adım adım, örneklerle, senaryolarla.
      </p>
      <div className="ml-10 mb-8 text-xs font-mono text-terminal-comment bg-surface-1 border border-orange-500/20 rounded-lg px-3 py-2 inline-block">
        <span className="text-orange-400">önerilen sıra →</span> Terminal → Dosya Sistemi → Dosya İşlemleri → Metin → İzinler → Süreçler → Ağ → Paket → Script
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {topics.map((t, i) => (
          <Link key={t.slug} href={`/linux-fundamentals/${t.slug}`} className="group">
            <div className="module-card border border-surface-3 hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.08)] transition-all h-full">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.icon}</span>
                  <div>
                    <div className="text-xs font-mono text-terminal-comment mb-0.5">
                      <span className="text-orange-400/60">#{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="font-semibold text-terminal-white group-hover:text-orange-300 transition-colors text-sm">
                      {t.title}
                    </h3>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-terminal-comment group-hover:text-orange-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </div>
              <p className="text-xs text-terminal-comment leading-relaxed">{t.desc}</p>
              <span className="mt-3 inline-block text-xs font-mono text-orange-400/70 bg-orange-500/5 border border-orange-500/15 px-2 py-0.5 rounded">
                {t.level}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
