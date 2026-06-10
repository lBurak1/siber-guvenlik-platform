import Link from "next/link";
import { Shield, Eye, GitMerge, Terminal, ArrowRight, Lock, Cpu, Network, Zap, BookOpen, Monitor, AlertTriangle, Boxes, GraduationCap, Globe } from "lucide-react";

const sections = [
  {
    id: "network-fundamentals",
    href: "/network-fundamentals",
    icon: Network,
    label: "Ağ Temelleri",
    subtitle: "Önce Temeli Kur",
    description: "OSI & TCP/IP modelleri, TCP el sıkışması, IP adresleme/CIDR ve ARP, DNS, DHCP, HTTP/S, SMB protokollerinin güvenlik perspektifinden incelenmesi.",
    tools: ["OSI Model", "TCP Handshake", "CIDR/Subnetting", "ARP", "DNS", "SMB"],
    color: "emerald",
    border: "border-emerald-500/20 hover:border-emerald-500/60",
    glow: "hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    cta: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20",
    modules: "4 Konu · 8 Modül",
    recommended: true,
  },
  {
    id: "linux-fundamentals",
    href: "/linux-fundamentals",
    icon: Terminal,
    label: "Linux Eğitimi",
    subtitle: "Temelden İleriye Linux",
    description: "Terminal, dosya sistemi, izinler, süreç yönetimi, ağ komutları, bash scripting — Linux'u eksiksiz öğren.",
    tools: ["ls -la", "chmod", "grep", "find", "ssh", "bash script", "cron"],
    color: "orange",
    border: "border-orange-500/20 hover:border-orange-500/60",
    glow: "hover:shadow-[0_0_40px_rgba(249,115,22,0.15)]",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    cta: "bg-orange-500/10 text-orange-300 border-orange-500/30 hover:bg-orange-500/20",
    modules: "9 Konu · 35+ Komut",
  },
  {
    id: "windows-fundamentals",
    href: "/windows-fundamentals",
    icon: Monitor,
    label: "Windows Eğitimi",
    subtitle: "Temelden İleriye Windows",
    description: "CMD, PowerShell, dosya yönetimi, servis kontrolü, kullanıcı yönetimi, ağ tanılama — Windows komut satırı.",
    tools: ["cmd.exe", "PowerShell", "sc", "net user", "netstat", "ipconfig", "wmic"],
    color: "sky",
    border: "border-sky-500/20 hover:border-sky-500/60",
    glow: "hover:shadow-[0_0_40px_rgba(14,165,233,0.15)]",
    badge: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    cta: "bg-sky-500/10 text-sky-300 border-sky-500/30 hover:bg-sky-500/20",
    modules: "5 Konu · 25+ Komut",
  },
  {
    id: "devops-fundamentals",
    href: "/devops-fundamentals",
    icon: Boxes,
    label: "DevOps Temelleri",
    subtitle: "Git & Docker",
    description: "Her mühendisin günlük araçları: Git ile versiyon kontrolü, Docker ile konteynerizasyon. Komut alışkanlığı kazandıran, CV'de aranan temel yetkinlikler.",
    tools: ["git commit", "git rebase", "branch", "docker run", "Dockerfile", "compose", "trivy"],
    color: "teal",
    border: "border-teal-500/20 hover:border-teal-500/60",
    glow: "hover:shadow-[0_0_40px_rgba(20,184,166,0.15)]",
    badge: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    cta: "bg-teal-500/10 text-teal-300 border-teal-500/30 hover:bg-teal-500/20",
    modules: "2 Konu · 50+ Komut",
  },
  {
    id: "red-team",
    href: "/red-team",
    icon: Shield,
    label: "Red Team",
    subtitle: "Ofansif Güvenlik",
    description: "OSINT, ağ tarama, web uygulama güvenliği, post-exploitation, Wi-Fi pentest ve mobil uygulama sızma testlerinde tam yetkinlik.",
    tools: ["Nmap", "SQLMap", "Burp Suite", "LinPEAS", "WinPEAS", "Frida"],
    color: "red",
    border: "border-red-500/20 hover:border-red-500/60",
    glow: "hover:shadow-[0_0_40px_rgba(239,68,68,0.15)]",
    badge: "bg-red-500/10 text-red-400 border-red-500/20",
    cta: "bg-red-500/10 text-red-300 border-red-500/30 hover:bg-red-500/20",
    modules: "11 Araç · 30 Modül",
  },
  {
    id: "blue-team",
    href: "/blue-team",
    icon: Eye,
    label: "Blue Team",
    subtitle: "Defansif Güvenlik",
    description: "Ağ trafiği analizi, PCAP inceleme, log forensics ve anomali tespiti ile saldırıları fark et ve müdahale et.",
    tools: ["Wireshark", "Apache Logs", "Nginx Logs", "tcpdump"],
    color: "blue",
    border: "border-blue-500/20 hover:border-blue-500/60",
    glow: "hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    cta: "bg-blue-500/10 text-blue-300 border-blue-500/30 hover:bg-blue-500/20",
    modules: "2 Araç · 6 Modül",
  },
  {
    id: "purple-team",
    href: "/purple-team",
    icon: GitMerge,
    label: "Purple Team",
    subtitle: "Senkronizasyon",
    description: "MITRE ATT&CK çerçevesiyle saldırı simülasyonu yap, Sigma kuralları yaz ve detection engineering uygula.",
    tools: ["MITRE ATT&CK", "Atomic Red Team", "Sigma", "ELK"],
    color: "purple",
    border: "border-purple-500/20 hover:border-purple-500/60",
    glow: "hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    cta: "bg-purple-500/10 text-purple-300 border-purple-500/30 hover:bg-purple-500/20",
    modules: "1 Metodoloji · 3 Modül",
  },
  {
    id: "certifications",
    href: "/certifications",
    icon: GraduationCap,
    label: "Sertifikalar",
    subtitle: "Kariyer Yol Haritası",
    description: "Security+, OSCP, CISSP, CySA+, AZ-500 ve daha fazlası. Her sertifika için kime uygun, sınav formatı, maliyet, neler bilinmeli ve kariyer değeri — işe alımda fark yaratan rehber.",
    tools: ["Security+", "OSCP", "CRTP", "CySA+", "BTL1", "CISSP", "AZ-500"],
    color: "indigo",
    border: "border-indigo-500/20 hover:border-indigo-500/60",
    glow: "hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]",
    badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    cta: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/20",
    modules: "5 Kategori · 15+ Sertifika",
  },
  {
    id: "ecosystem",
    href: "/ecosystem",
    icon: Globe,
    label: "Sektör & Ekosistem",
    subtitle: "Ürünler, Şirketler, Kişiler",
    description: "Bir siber güvenlikçinin tanıması gereken ürünler (SIEM, EDR, firewall), uluslararası ve ulusal şirketler, önemli kişiler ve temel kavramlar/standartlar — teknik bilginin ötesinde sektör farkındalığı.",
    tools: ["CrowdStrike", "Palo Alto", "Picus", "SOCRadar", "Schneier", "Zero Trust", "NIST"],
    color: "pink",
    border: "border-pink-500/20 hover:border-pink-500/60",
    glow: "hover:shadow-[0_0_40px_rgba(236,72,153,0.15)]",
    badge: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    cta: "bg-pink-500/10 text-pink-300 border-pink-500/30 hover:bg-pink-500/20",
    modules: "5 Konu · Ulusal + Küresel",
  },
  {
    id: "cheatsheet",
    href: "/cheatsheet",
    icon: Zap,
    label: "Cheat Sheet",
    subtitle: "Port Bazlı Komut Kütüphanesi",
    description: "SSH, FTP, HTTP, SMB, RDP, MySQL ve daha fazlası için kopyalanabilir komutlar, brute force parametreleri ve exploit referansları.",
    tools: ["Port 22 SSH", "Port 21 FTP", "Port 445 SMB", "Port 3389 RDP", "Port 80 HTTP", "Port 3306 MySQL"],
    color: "yellow",
    border: "border-yellow-500/20 hover:border-yellow-500/60",
    glow: "hover:shadow-[0_0_40px_rgba(234,179,8,0.15)]",
    badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    cta: "bg-yellow-500/10 text-yellow-300 border-yellow-500/30 hover:bg-yellow-500/20",
    modules: "9 Port · 36 Komut Seti",
  },
  {
    id: "owasp-top10",
    href: "/owasp-top10",
    icon: AlertTriangle,
    label: "OWASP Top 10",
    subtitle: "Web Uygulama Güvenliği",
    description: "Broken Access Control'den SSRF'e — dünyanın en çok kullanılan web güvenliği standardı. Her zafiyet için saldırı vektörü, gerçek dünya örneği ve savunma rehberi.",
    tools: ["SQLi", "XSS", "IDOR", "SSRF", "XXE", "SSTI", "JWT Bypass", "Log4Shell"],
    color: "amber",
    border: "border-amber-500/20 hover:border-amber-500/60",
    glow: "hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    cta: "bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20",
    modules: "10 Zafiyet · 40+ Modül",
  },
] as const;

const stats = [
  { label: "Araç & Konu", value: "57+", icon: Terminal },
  { label: "Modül",       value: "165+", icon: Cpu },
  { label: "Sertifika",   value: "15+", icon: GraduationCap },
  { label: "Etik",        value: "100%", icon: Lock },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 text-center border-b border-surface-3">
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: "linear-gradient(#c9d1d9 1px, transparent 1px), linear-gradient(90deg, #c9d1d9 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-terminal-green/30 bg-terminal-green/5 text-terminal-green text-xs font-mono mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse" />
            White Hat · Etik · Lab Ortamı
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-terminal-white leading-tight mb-4">
            <span className="font-mono text-terminal-green">{">"}_</span>{" "}
            Siber Güvenlik{" "}
            <span className="bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Eğitim
            </span>{" "}
            Platformu
          </h1>
          <p className="text-lg text-terminal-comment max-w-2xl mx-auto leading-relaxed mb-8">
            Ağ temellerinden post-exploitation'a, protocol analizinden port cheat sheet'lerine —
            Red, Blue ve Purple Team disiplinlerinde Türkçe, kapsamlı, senaryo odaklı eğitim.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/network-fundamentals" className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 font-medium transition-all text-sm">
              <Network className="w-4 h-4" /> Ağ Temelleri
            </Link>
            <Link href="/red-team" className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-500/10 text-red-300 border border-red-500/30 hover:bg-red-500/20 font-medium transition-all text-sm">
              <Shield className="w-4 h-4" /> Red Team
            </Link>
            <Link href="/cheatsheet" className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-yellow-500/10 text-yellow-300 border border-yellow-500/30 hover:bg-yellow-500/20 font-medium transition-all text-sm">
              <Zap className="w-4 h-4" /> Cheat Sheet
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-surface-3">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-surface-3">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center justify-center gap-2 py-8 px-4">
              <Icon className="w-5 h-5 text-terminal-comment" />
              <div className="text-3xl font-bold font-mono text-terminal-white">{value}</div>
              <div className="text-xs text-terminal-comment text-center">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section cards */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-xs font-mono text-terminal-comment uppercase tracking-widest text-center mb-10">
          Öğrenme Yolu
        </h2>
        <div className="grid lg:grid-cols-3 gap-5">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.id} href={s.href} className="group block">
                <div className={`rounded-xl border bg-surface-1 p-6 transition-all duration-300 h-full flex flex-col relative overflow-hidden ${s.border} ${s.glow}`}>
                  {'recommended' in s && s.recommended && (
                    <div className="absolute top-3 right-3 text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      Önce Başla
                    </div>
                  )}
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`p-2.5 rounded-xl border ${s.badge}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-terminal-comment">{s.subtitle}</div>
                      <h2 className="text-lg font-bold text-terminal-white">{s.label}</h2>
                    </div>
                  </div>
                  <p className="text-sm text-terminal-white/70 leading-relaxed flex-1 mb-4">
                    {s.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {s.tools.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded font-mono bg-surface-2 border border-surface-3 text-terminal-comment">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${s.badge}`}>{s.modules}</span>
                    <div className={`flex items-center gap-1.5 text-sm font-medium ${s.badge.includes("emerald") ? "text-emerald-300" : s.badge.includes("orange") ? "text-orange-300" : s.badge.includes("sky") ? "text-sky-300" : s.badge.includes("red") ? "text-red-300" : s.badge.includes("blue") ? "text-blue-300" : s.badge.includes("purple") ? "text-purple-300" : "text-yellow-300"}`}>
                      Başla <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Ethics notice */}
      <section className="border-t border-surface-3 px-4 py-8">
        <div className="max-w-3xl mx-auto flex items-start gap-4 bg-surface-1 rounded-xl border border-surface-3 p-5">
          <Lock className="w-5 h-5 text-terminal-green shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-terminal-white text-sm mb-1">Etik Kullanım Bildirimi</div>
            <p className="text-xs text-terminal-comment leading-relaxed">
              Bu platformdaki tüm araçlar, payload'lar ve teknikler yalnızca
              <strong className="text-terminal-white"> yalıtılmış laboratuvar ortamlarında</strong> (CTF, HackTheBox, TryHackMe, kişisel lab)
              ve yazılı yetki alınmış sızma testlerinde kullanılmalıdır. Yetkisiz erişim girişimi yasadışıdır.
              İçerikler "nasıl tespit edilir ve nasıl savunulur?" perspektifiyle hazırlanmıştır.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
