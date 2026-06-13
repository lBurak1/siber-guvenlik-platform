import Link from "next/link";
import { Server, ArrowRight, Crosshair } from "lucide-react";

const topics = [
  { slug: "sunucu-nedir",   icon: "🖥️", title: "Sunucu Nedir?",            desc: "Client-server mimarisi, sunucu türleri (web/db/dosya/DC) ve barındırma modelleri", level: "Başlangıç" },
  { slug: "linux-sunucu",   icon: "🐧", title: "Linux Sunucu (Ubuntu)",   desc: "systemctl, kullanıcı yönetimi, SSH, web/db kurulumu + nasıl sızılır", level: "Başlangıç–Orta" },
  { slug: "windows-sunucu", icon: "🪟", title: "Windows Server",           desc: "Roller, Active Directory, PowerShell yönetimi, RDP/WinRM + nasıl sızılır", level: "Orta" },
  { slug: "web-sunucu",     icon: "🌐", title: "Web Sunucusu",             desc: "Apache/Nginx/IIS kurulum, virtual host, SSL, sertleştirme + nasıl sızılır", level: "Başlangıç–Orta" },
];

export default function ServersFundamentalsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Server className="w-7 h-7 text-cyan-400" />
        <h1 className="text-2xl font-bold text-terminal-white">Sunucular</h1>
      </div>
      <p className="text-terminal-comment mb-4 ml-10">
        Sunucu nedir, nasıl yönetilir ve nasıl sızılır — temelden detaya. Her konuda yönetim komutları ve saldırgan bakışı bir arada.
      </p>
      <Link href="/sunucular" className="ml-10 mb-8 inline-flex items-center gap-2 text-xs font-mono text-red-300 bg-red-500/5 border border-red-500/20 rounded-lg px-3 py-2 hover:border-red-500/40 transition-all">
        <Crosshair className="w-3.5 h-3.5" /> Saldırı vitrini: Sunucu türleri ve saldırı yüzeyleri <ArrowRight className="w-3.5 h-3.5" />
      </Link>

      <div className="grid sm:grid-cols-2 gap-4">
        {topics.map((t, i) => (
          <Link key={t.slug} href={`/servers-fundamentals/${t.slug}`} className="group">
            <div className="module-card border border-surface-3 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.08)] transition-all h-full">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.icon}</span>
                  <div>
                    <div className="text-xs font-mono text-terminal-comment mb-0.5"><span className="text-cyan-400/60">#{String(i + 1).padStart(2, "0")}</span></div>
                    <h3 className="font-semibold text-terminal-white group-hover:text-cyan-300 transition-colors text-sm">{t.title}</h3>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-terminal-comment group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </div>
              <p className="text-xs text-terminal-comment leading-relaxed">{t.desc}</p>
              <span className="mt-3 inline-block text-xs font-mono text-cyan-400/70 bg-cyan-500/5 border border-cyan-500/15 px-2 py-0.5 rounded">{t.level}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
