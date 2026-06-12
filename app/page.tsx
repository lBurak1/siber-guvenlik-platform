"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Shield, Eye, GitMerge, Terminal, ArrowRight, Lock, Cpu, Network, Zap, BookOpen, Monitor, AlertTriangle, Boxes, GraduationCap, Globe, Router, CheckCircle2, MessageCircleQuestion, Crosshair } from "lucide-react";

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
    modules: "4 Konu · Temel",
    recommended: true,
  },
  {
    id: "advanced-network",
    href: "/network-fundamentals/routing-switching",
    icon: Router,
    label: "Gelişmiş Ağ",
    subtitle: "İleri Seviye Ağ",
    description: "Yönlendirme ve anahtarlama, VLAN, NAT, VPN, IDS/IPS, firewall ve ağ segmentasyonu — ağ temellerinin bir üst seviyesi.",
    tools: ["Routing", "Switching", "VLAN", "NAT", "VPN", "IDS/IPS", "Firewall"],
    color: "emerald",
    border: "border-emerald-500/20 hover:border-emerald-500/60",
    glow: "hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    cta: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20",
    modules: "2 Konu · İleri",
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
  {
    id: "arsenal",
    href: "/araclar",
    icon: Crosshair,
    label: "Araç Cephaneliği",
    subtitle: "Pentest Araçları",
    description: "Sızma testi ve CTF'lerde en sık kullanılan araçlar — Enumeration, Brute Force, Fuzzing, PrivEsc ve Active Directory. Her araç için pratik komut ve bölüm soruları.",
    tools: ["Nikto", "Hydra", "Hashcat", "ffuf", "Mimikatz", "BloodHound", "NetExec"],
    color: "red",
    border: "border-red-500/20 hover:border-red-500/60",
    glow: "hover:shadow-[0_0_40px_rgba(239,68,68,0.15)]",
    badge: "bg-red-500/10 text-red-400 border-red-500/20",
    cta: "bg-red-500/10 text-red-300 border-red-500/30 hover:bg-red-500/20",
    modules: "5 Kategori · 15 Araç",
  },
  {
    id: "interview",
    href: "/mulakat",
    icon: MessageCircleQuestion,
    label: "Mülakat Soruları",
    subtitle: "İşe Hazırlık",
    description: "Siber güvenlik mülakatlarında en sık sorulan sorular ve net cevapları. Genel kavramlardan ağ, Linux, web, blue/red team'e kadar kategorize edilmiş soru-cevap.",
    tools: ["TCP vs UDP", "CIA", "XSS", "SQLi", "IR süreci", "Privesc", "Zero Trust"],
    color: "indigo",
    border: "border-indigo-500/20 hover:border-indigo-500/60",
    glow: "hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]",
    badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    cta: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/20",
    modules: "6 Kategori · 35+ Soru",
  },
] as const;

const stats = [
  { label: "Araç & Konu", value: "57+", icon: Terminal },
  { label: "Modül",       value: "165+", icon: Cpu },
  { label: "Sertifika",   value: "15+", icon: GraduationCap },
  { label: "Etik",        value: "100%", icon: Lock },
];

// Renk aksan haritası (üst çizgi + metin rengi) — Tailwind statik sınıflar
const accentMap: Record<string, { bar: string; text: string }> = {
  emerald: { bar: "from-emerald-500/0 via-emerald-400 to-emerald-500/0", text: "text-emerald-300" },
  orange:  { bar: "from-orange-500/0 via-orange-400 to-orange-500/0",   text: "text-orange-300" },
  sky:     { bar: "from-sky-500/0 via-sky-400 to-sky-500/0",             text: "text-sky-300" },
  teal:    { bar: "from-teal-500/0 via-teal-400 to-teal-500/0",          text: "text-teal-300" },
  red:     { bar: "from-red-500/0 via-red-400 to-red-500/0",             text: "text-red-300" },
  blue:    { bar: "from-blue-500/0 via-blue-400 to-blue-500/0",          text: "text-blue-300" },
  purple:  { bar: "from-purple-500/0 via-purple-400 to-purple-500/0",   text: "text-purple-300" },
  indigo:  { bar: "from-indigo-500/0 via-indigo-400 to-indigo-500/0",   text: "text-indigo-300" },
  pink:    { bar: "from-pink-500/0 via-pink-400 to-pink-500/0",          text: "text-pink-300" },
  amber:   { bar: "from-amber-500/0 via-amber-400 to-amber-500/0",       text: "text-amber-300" },
  yellow:  { bar: "from-yellow-500/0 via-yellow-400 to-yellow-500/0",   text: "text-yellow-300" },
};

// Ana sayfa kategorileri (kartları gruplar)
const groups = [
  { id: "foundation", title: "Temeller", short: "Temeller", icon: Cpu, subtitle: "İşletim sistemi ve araç hakimiyeti", accent: "orange",
    ids: ["linux-fundamentals", "windows-fundamentals", "devops-fundamentals"] },
  { id: "network", title: "Ağ / Network", short: "Ağ", icon: Network, subtitle: "Temelden ileri seviyeye ağ bilgisi", accent: "emerald",
    ids: ["network-fundamentals", "advanced-network"] },
  { id: "security", title: "Siber Güvenlik", short: "Siber Güvenlik", icon: Shield, subtitle: "Saldırı, savunma, araçlar ve web uygulama güvenliği", accent: "red",
    ids: ["red-team", "arsenal", "blue-team", "purple-team", "owasp-top10"] },
  { id: "career", title: "Kariyer & Referans", short: "Kariyer", icon: GraduationCap, subtitle: "Sertifika yolu, sektör, mülakat ve hızlı başvuru", accent: "indigo",
    ids: ["certifications", "ecosystem", "interview", "cheatsheet"] },
];

// Günün Komutu havuzu (her gün biri gösterilir)
const dailyCommands = [
  { cmd: "nmap -sV -sC -oN scan.txt 10.10.10.1", desc: "Servis versiyonu + varsayılan scriptlerle kapsamlı tarama ve dosyaya kaydet", href: "/red-team/nmap" },
  { cmd: "find / -perm -4000 2>/dev/null", desc: "SUID bitli dosyaları bul — Linux yetki yükseltme için kritik", href: "/red-team/linux-privesc" },
  { cmd: "git log --oneline --graph --all", desc: "Tüm branch'leri görsel ağaç olarak özetle", href: "/devops-fundamentals/git" },
  { cmd: "docker ps -a", desc: "Çalışan ve durmuş tüm konteynerleri listele", href: "/devops-fundamentals/docker" },
  { cmd: "chmod 600 ~/.ssh/id_rsa", desc: "SSH özel anahtarını yalnızca sahibinin okuyabilmesi için kısıtla", href: "/linux-fundamentals/permissions" },
  { cmd: "grep -rni 'password' /var/www 2>/dev/null", desc: "Dizinde büyük/küçük harf duyarsız, satır numaralı şifre araması", href: "/linux-fundamentals/text-processing" },
  { cmd: "ss -tulnp", desc: "Dinlenen TCP/UDP portlarını ve süreçleri göster", href: "/linux-fundamentals/networking-linux" },
  { cmd: "Get-ADUser -Filter * | Select Name,Enabled", desc: "Tüm domain kullanıcılarını listele (PowerShell AD)", href: "/windows-fundamentals/active-directory" },
  { cmd: "sudo tcpdump -i eth0 -w capture.pcap", desc: "Ağ trafiğini yakala ve Wireshark için kaydet", href: "/blue-team/wireshark" },
  { cmd: "hashcat -m 0 -a 0 hash.txt rockyou.txt", desc: "MD5 hash'leri sözlük saldırısıyla kır", href: "/owasp-top10/cryptographic-failures" },
  { cmd: "curl -I https://hedef.com", desc: "HTTP başlıklarını çek — sunucu/versiyon bilgisi ve güvenlik header kontrolü", href: "/owasp-top10/security-misconfiguration" },
  { cmd: "ip route", desc: "Yönlendirme tablosunu ve default gateway'i göster", href: "/network-fundamentals/routing-switching" },
];

// Sekme aktif/pasif renkleri
const tabActive: Record<string, string> = {
  orange:  "bg-orange-500/15 text-orange-300 border-orange-500/50",
  emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/50",
  red:     "bg-red-500/15 text-red-300 border-red-500/50",
  indigo:  "bg-indigo-500/15 text-indigo-300 border-indigo-500/50",
};

// Akan şerit içerikleri (telifsiz — komut/araç/kavram isimleri)
const marqueeA = [
  "nmap -sV", "git commit", "docker run", "chmod +x", "Wireshark", "MITRE ATT&CK",
  "Zero Trust", "OSCP", "Burp Suite", "SIEM", "Kerberoasting", "SQL Injection",
  "ip addr", "grep -r", "Metasploit", "EDR / XDR",
];
const marqueeB = [
  "ss -tuln", "Hashcat", "BloodHound", "Splunk", "Defense in Depth", "NIST CSF",
  "ISO 27001", "KVKK", "Phishing", "Active Directory", "PAM", "CTI",
  "Cyber Kill Chain", "sudo -l", "tcpdump", "Zero Day",
];
const marqueeDot = [
  "bg-emerald-400", "bg-red-400", "bg-blue-400", "bg-amber-400",
  "bg-teal-400", "bg-purple-400", "bg-pink-400", "bg-sky-400",
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(groups[0].id);
  const [dayIdx, setDayIdx] = useState<number | null>(null);
  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
    setDayIdx(dayOfYear % dailyCommands.length);
  }, []);
  const daily = dayIdx === null ? null : dailyCommands[dayIdx];

  const activeGroup = groups.find((g) => g.id === activeTab) ?? groups[0];
  const gac = accentMap[activeGroup.accent] ?? accentMap.emerald;
  const activeSections = activeGroup.ids
    .map((id) => sections.find((s) => s.id === id))
    .filter((s): s is typeof sections[number] => Boolean(s));

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
            <Link href="/quiz" className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-terminal-green/10 text-terminal-green border border-terminal-green/30 hover:bg-terminal-green/20 font-medium transition-all text-sm">
              <CheckCircle2 className="w-4 h-4" /> Kendini Test Et
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

      {/* Akan şerit (marquee) */}
      <section className="border-b border-surface-3 py-5 overflow-hidden relative bg-surface-1/30">
        <style>{`
          @keyframes marqueeLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @keyframes marqueeRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
          .mq-track { display: flex; gap: 0.75rem; width: max-content; will-change: transform; }
          .mq-left  { animation: marqueeLeft 45s linear infinite; }
          .mq-right { animation: marqueeRight 50s linear infinite; }
          .mq-wrap:hover .mq-track { animation-play-state: paused; }
        `}</style>
        <div className="mq-wrap flex flex-col gap-3" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
          {[marqueeA, marqueeB].map((row, ri) => (
            <div key={ri} className={`mq-track ${ri === 0 ? "mq-left" : "mq-right"}`}>
              {[...row, ...row].map((item, i) => (
                <span key={i} className="flex items-center gap-2 shrink-0 text-xs font-mono text-terminal-comment bg-surface-2/60 border border-surface-3 rounded-full px-3 py-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${marqueeDot[i % marqueeDot.length]}`} />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Günün Komutu */}
      {daily && (
        <section className="max-w-7xl mx-auto px-4 pt-12">
          <Link href={daily.href} className="group block">
            <div className="rounded-2xl border border-terminal-green/20 bg-gradient-to-br from-terminal-green/[0.06] to-transparent p-5 hover:border-terminal-green/50 transition-all">
              <div className="flex items-center gap-2 text-xs font-mono text-terminal-green mb-3">
                <Terminal className="w-4 h-4" /> GÜNÜN KOMUTU
                <span className="ml-auto text-terminal-comment opacity-70">her gün yenilenir</span>
              </div>
              <div className="font-mono text-sm sm:text-base bg-terminal-bg border border-surface-3 rounded-lg px-4 py-3 text-terminal-green overflow-x-auto">
                <span className="text-terminal-comment select-none">$ </span>{daily.cmd}
              </div>
              <div className="flex items-center justify-between gap-3 mt-3">
                <p className="text-sm text-terminal-comment">{daily.desc}</p>
                <span className="flex items-center gap-1 text-xs font-semibold text-terminal-green shrink-0">
                  Öğren <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Section cards — kategorilere ayrılmış */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-xs font-mono text-terminal-comment uppercase tracking-widest mb-2">
            Öğrenme Yolu
          </h2>
          <p className="text-2xl font-bold text-terminal-white mb-4">Temelden İleri Seviyeye, Adım Adım</p>
          <Link href="/yol-haritasi" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-1 border border-surface-3 text-sm text-terminal-comment hover:text-terminal-white hover:border-terminal-green/30 transition-all">
            <Network className="w-4 h-4 text-terminal-green" /> Görsel Yol Haritasını Gör <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <style>{`
          @keyframes tabFadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
          .tab-card { opacity: 0; animation: tabFadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
          @keyframes tabPop { 0% { transform: scale(0.96); } 60% { transform: scale(1.04); } 100% { transform: scale(1); } }
          .tab-active-pop { animation: tabPop 0.35s ease; }
        `}</style>

        {/* Sekmeler (T / N / S / K) */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
          {groups.map((group) => {
            const TabIcon = group.icon;
            const isActive = group.id === activeTab;
            return (
              <button
                key={group.id}
                onClick={() => setActiveTab(group.id)}
                className={`flex items-center gap-3 px-6 sm:px-8 py-4 rounded-2xl border-2 text-base sm:text-lg font-bold transition-all duration-200 hover:scale-[1.04] ${
                  isActive
                    ? `${tabActive[group.accent]} tab-active-pop shadow-lg`
                    : "bg-surface-1 text-terminal-comment border-surface-3 hover:text-terminal-white hover:border-surface-2"
                }`}
              >
                <TabIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                {group.short}
                <span className={`text-xs font-mono rounded-full px-2 py-0.5 ${isActive ? "bg-black/20" : "bg-surface-2/60 opacity-70"}`}>
                  {group.ids.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Aktif grup başlığı */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`h-9 w-1.5 rounded-full bg-gradient-to-b ${gac.bar.replace("to-r", "to-b")}`} />
          <div>
            <h3 className="text-xl font-bold text-terminal-white">{activeGroup.title}</h3>
            <p className="text-xs text-terminal-comment mt-0.5">{activeGroup.subtitle}</p>
          </div>
        </div>

        {/* Aktif grup kartları */}
        <div key={activeTab} className="grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-5">
          {activeSections.map((s, i) => {
            const Icon = s.icon;
            const ac = accentMap[s.color] ?? accentMap.emerald;
            return (
              <Link key={s.id} href={s.href} className="group block tab-card" style={{ animationDelay: `${i * 80}ms` }}>
                <div className={`relative rounded-2xl border bg-surface-1 h-full flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 ${s.border} ${s.glow}`}>
                  <div className={`h-1 w-full bg-gradient-to-r ${ac.bar}`} />
                  <Icon className={`absolute -right-5 -top-3 w-28 h-28 ${ac.text} opacity-[0.04] group-hover:opacity-[0.08] transition-opacity pointer-events-none`} />

                  <div className="p-6 flex flex-col flex-1 relative">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[11px] font-mono ${ac.text} opacity-50`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {'recommended' in s && s.recommended && (
                        <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full animate-pulse">
                          ÖNCE BAŞLA
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-xl border ${s.badge} group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[11px] font-mono text-terminal-comment uppercase tracking-wide">{s.subtitle}</div>
                        <h3 className="text-lg font-bold text-terminal-white leading-tight">{s.label}</h3>
                      </div>
                    </div>

                    <p className="text-sm text-terminal-white/65 leading-relaxed flex-1 mb-4">
                      {s.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {s.tools.slice(0, 5).map((t) => (
                        <span key={t} className="text-[11px] px-2 py-0.5 rounded font-mono bg-surface-2 border border-surface-3 text-terminal-comment">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-surface-3/60">
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${s.badge}`}>{s.modules}</span>
                      <div className={`flex items-center gap-1.5 text-sm font-semibold ${ac.text}`}>
                        Başla <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
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
