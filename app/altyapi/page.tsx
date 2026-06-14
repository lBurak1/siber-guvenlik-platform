"use client";
import Link from "next/link";
import {
  Layers, Network, Terminal, Monitor, Boxes,
  Server, Database, ArrowRight, ChevronRight
} from "lucide-react";

const osItems = [
  {
    href: "/linux-fundamentals",
    icon: Terminal,
    label: "Linux",
    color: "orange",
    desc: "Terminal, dosya sistemi, izinler, bash scripting — Kali'nin temeli",
    topics: ["Terminal & Shell", "Dosya Sistemi", "İzinler", "Süreç Yönetimi", "Ağ Komutları", "Bash Scripting"],
  },
  {
    href: "/windows-fundamentals",
    icon: Monitor,
    label: "Windows",
    color: "sky",
    desc: "CMD, PowerShell, Active Directory — pentest için Windows temeli",
    topics: ["CMD Temelleri", "PowerShell", "Sistem Yönetimi", "Ağ Komutları", "Active Directory"],
  },
];

const infraCategories = [
  {
    href: "/network-fundamentals",
    icon: Network,
    label: "Network",
    color: "emerald",
    badge: "13 konu",
    desc: "OSI/TCP-IP modelinden CCNA seviyesine. Subnetting, protokoller, VLAN, routing, ACL.",
    highlights: ["OSI & TCP/IP", "IP Subnetting", "DNS / DHCP / ARP", "Cisco IOS", "VLAN & STP", "Routing (OSPF)"],
  },
  {
    href: "/devops-fundamentals",
    icon: Boxes,
    label: "DevOps",
    color: "teal",
    badge: "3 konu",
    desc: "Git versiyon kontrolü, Docker konteynerizasyon, Python ile güvenlik araçları.",
    highlights: ["Git & GitHub", "Docker", "Python ile Güvenlik"],
  },
  {
    href: "/servers-fundamentals",
    icon: Server,
    label: "Sunucular",
    color: "cyan",
    badge: "4 konu",
    desc: "Linux/Windows sunucu yönetimi, web sunucusu kurulumu ve güvenli yapılandırma.",
    highlights: ["Sunucu Nedir?", "Linux Sunucu", "Windows Server", "Web Sunucusu"],
  },
  {
    href: "/database-fundamentals",
    icon: Database,
    label: "Veritabanları",
    color: "lime",
    badge: "4 konu",
    desc: "SQL temelleri, MySQL yönetimi, MSSQL / PostgreSQL / NoSQL karşılaştırması.",
    highlights: ["Veritabanı Temelleri", "SQL Temelleri", "MySQL Yönetimi", "NoSQL & MSSQL"],
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string; icon: string; hover: string }> = {
  emerald: { bg: "bg-emerald-500/5", border: "border-emerald-500/20", text: "text-emerald-400", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", icon: "text-emerald-400", hover: "hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.08)]" },
  orange:  { bg: "bg-orange-500/5",  border: "border-orange-500/20",  text: "text-orange-400",  badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",  icon: "text-orange-400",  hover: "hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.08)]" },
  sky:     { bg: "bg-sky-500/5",     border: "border-sky-500/20",     text: "text-sky-400",     badge: "bg-sky-500/10 text-sky-400 border-sky-500/20",     icon: "text-sky-400",     hover: "hover:border-sky-500/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.08)]" },
  teal:    { bg: "bg-teal-500/5",    border: "border-teal-500/20",    text: "text-teal-400",    badge: "bg-teal-500/10 text-teal-400 border-teal-500/20",    icon: "text-teal-400",    hover: "hover:border-teal-500/50 hover:shadow-[0_0_20px_rgba(20,184,166,0.08)]" },
  cyan:    { bg: "bg-cyan-500/5",    border: "border-cyan-500/20",    text: "text-cyan-400",    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",    icon: "text-cyan-400",    hover: "hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.08)]" },
  lime:    { bg: "bg-lime-500/5",    border: "border-lime-500/20",    text: "text-lime-400",    badge: "bg-lime-500/10 text-lime-400 border-lime-500/20",    icon: "text-lime-400",    hover: "hover:border-lime-500/50 hover:shadow-[0_0_20px_rgba(132,204,22,0.08)]" },
};

export default function AltyapiPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Başlık */}
      <div className="flex items-center gap-3 mb-2">
        <Layers className="w-7 h-7 text-emerald-400" />
        <h1 className="text-2xl font-bold text-terminal-white">Altyapı</h1>
      </div>
      <p className="text-terminal-comment mb-8 ml-10">
        Ağdan işletim sistemlerine, sunuculardan veritabanlarına — siber güvenliğin alt yapı omurgası.
      </p>

      {/* İşletim Sistemleri */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 bg-emerald-500/60 rounded-full" />
          <h2 className="text-sm font-semibold text-terminal-white tracking-wide uppercase">İşletim Sistemleri</h2>
          <div className="flex-1 h-px bg-surface-3 ml-2" />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {osItems.map(({ href, icon: Icon, label, color, desc, topics }) => {
            const c = colorMap[color];
            return (
              <Link key={href} href={href} className="group">
                <div className={`h-full rounded-xl border ${c.border} ${c.bg} ${c.hover} p-5 transition-all duration-200 flex flex-col gap-3`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg border ${c.border} ${c.bg} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${c.icon}`} />
                      </div>
                      <div>
                        <span className={`text-base font-bold ${c.text}`}>{label}</span>
                        <p className="text-xs text-terminal-comment mt-0.5">{desc}</p>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 ${c.text} group-hover:translate-x-1 transition-transform shrink-0`} />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {topics.map((t) => (
                      <span key={t} className={`text-xs font-mono px-2 py-0.5 rounded border ${c.badge}`}>{t}</span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Diğer Altyapı Kategorileri */}
      <div className="mb-4 flex items-center gap-2">
        <div className="w-1 h-5 bg-emerald-500/60 rounded-full" />
        <h2 className="text-sm font-semibold text-terminal-white tracking-wide uppercase">Ağ & Servisler</h2>
        <div className="flex-1 h-px bg-surface-3 ml-2" />
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {infraCategories.map(({ href, icon: Icon, label, color, badge, desc, highlights }) => {
          const c = colorMap[color];
          return (
            <Link key={href} href={href} className="group">
              <div className={`h-full rounded-xl border ${c.border} ${c.bg} ${c.hover} p-5 transition-all duration-200 flex flex-col gap-3`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg border ${c.border} ${c.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${c.icon}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-base font-bold ${c.text}`}>{label}</span>
                        <span className={`text-xs font-mono px-1.5 py-0.5 rounded border ${c.badge}`}>{badge}</span>
                      </div>
                      <p className="text-xs text-terminal-comment mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 ${c.text} group-hover:translate-x-1 transition-transform shrink-0`} />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {highlights.map((h) => (
                    <span key={h} className={`text-xs font-mono px-2 py-0.5 rounded border ${c.badge}`}>{h}</span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Hızlı erişim footer */}
      <div className="mt-8 rounded-xl border border-surface-3 bg-surface-1/50 p-4">
        <p className="text-xs text-terminal-comment mb-3 font-semibold">⚡ Tüm konulara hızlı erişim</p>
        <div className="flex flex-wrap gap-2">
          {[
            { href: "/network-fundamentals", label: "Network", color: "text-emerald-400" },
            { href: "/linux-fundamentals",   label: "Linux",   color: "text-orange-400" },
            { href: "/windows-fundamentals", label: "Windows", color: "text-sky-400" },
            { href: "/devops-fundamentals",  label: "DevOps",  color: "text-teal-400" },
            { href: "/servers-fundamentals", label: "Sunucular", color: "text-cyan-400" },
            { href: "/database-fundamentals",label: "Veritabanları", color: "text-lime-400" },
          ].map(({ href, label, color }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1 text-xs font-mono ${color} hover:opacity-80 transition-opacity`}
            >
              <ChevronRight className="w-3 h-3" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
