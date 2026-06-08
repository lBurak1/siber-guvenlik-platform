import Link from "next/link";
import { MonitorCog, ArrowRight } from "lucide-react";

const topics = [
  { slug: "cmd-basics",          icon: "⌨️",  title: "Komut İstemi (CMD) Temelleri", desc: "dir, cd, mkdir, copy, move, del, ipconfig, netstat — CMD'yi sıfırdan öğren", level: "Başlangıç" },
  { slug: "powershell-basics",   icon: "💙",  title: "PowerShell Temelleri",         desc: "Get-ChildItem, New-Item, Select-String, pipe, değişkenler, scripting", level: "Başlangıç–Orta" },
  { slug: "file-operations-win", icon: "📁",  title: "Dosya & Dizin Yönetimi",       desc: "mkdir nested, xcopy, robocopy, attrib, icacls, mklink — tam dosya kontrolü", level: "Orta" },
  { slug: "system-management",   icon: "⚙️",  title: "Sistem & Servis Yönetimi",     desc: "tasklist, sc, net user, wmic, Get-Service, regedit komutları", level: "Orta" },
  { slug: "networking-win",      icon: "🌐",  title: "Ağ Komutları (CMD/PS)",        desc: "ipconfig, netstat, ping, tracert, nslookup, Test-NetConnection, netsh", level: "Orta" },
];

export default function WindowsFundamentalsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <MonitorCog className="w-7 h-7 text-sky-400" />
        <h1 className="text-2xl font-bold text-terminal-white">Windows Eğitimi</h1>
      </div>
      <p className="text-terminal-comment mb-2 ml-10">
        CMD'den PowerShell'e, sistem yönetiminden ağ komutlarına — Windows'u komut satırıyla yönet.
      </p>
      <div className="ml-10 mb-8 text-xs font-mono text-terminal-comment bg-surface-1 border border-sky-500/20 rounded-lg px-3 py-2 inline-block">
        <span className="text-sky-400">önerilen sıra →</span> CMD → PowerShell → Dosya İşlemleri → Sistem Yönetimi → Ağ Komutları
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {topics.map((t, i) => (
          <Link key={t.slug} href={`/windows-fundamentals/${t.slug}`} className="group">
            <div className="module-card border border-surface-3 hover:border-sky-500/40 hover:shadow-[0_0_20px_rgba(14,165,233,0.08)] transition-all h-full">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.icon}</span>
                  <div>
                    <div className="text-xs font-mono text-terminal-comment mb-0.5">
                      <span className="text-sky-400/60">#{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="font-semibold text-terminal-white group-hover:text-sky-300 transition-colors text-sm">
                      {t.title}
                    </h3>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-terminal-comment group-hover:text-sky-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </div>
              <p className="text-xs text-terminal-comment leading-relaxed">{t.desc}</p>
              <span className="mt-3 inline-block text-xs font-mono text-sky-400/70 bg-sky-500/5 border border-sky-500/15 px-2 py-0.5 rounded">
                {t.level}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
