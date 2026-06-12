import Link from "next/link";
import { Shield, ArrowRight } from "lucide-react";

const tools = [
  {
    category: "Bilgi Toplama",
    items: [
      { slug: "osint-basics",   title: "OSINT Temelleri",  desc: "Açık kaynak istihbarat toplama yöntemleri", level: "Başlangıç" },
      { slug: "google-dorking", title: "Google Dorking",   desc: "İleri seviye arama operatörleriyle hassas veri keşfi", level: "Orta" },
    ],
  },
  {
    category: "Ağ Keşfi",
    items: [
      { slug: "nmap", title: "Nmap", desc: "Ping sweep'ten NSE script motoruna tam ağ tarama", level: "Başlangıç–İleri" },
      { slug: "enum4linux", title: "enum4linux", desc: "SMB/Samba enumeration — kullanıcı, paylaşım, parola politikası", level: "Başlangıç–Orta" },
      { slug: "nessus", title: "Nessus", desc: "Kurumsal zafiyet tarayıcı — CVE eşleştirme, raporlama, doğrulama", level: "Başlangıç–Orta" },
    ],
  },
  {
    category: "Web Uygulama Güvenliği",
    items: [
      { slug: "gobuster",  title: "Gobuster",   desc: "Dizin, dosya ve DNS alt alan keşfi", level: "Başlangıç" },
      { slug: "ffuf",      title: "ffuf",       desc: "Hızlı web fuzzer — parametre, header ve yol testi", level: "Orta" },
      { slug: "sqlmap",    title: "SQLMap",     desc: "SQL enjeksiyon tespiti ve sömürüsü — WAF atlatmaya kadar", level: "Orta–İleri" },
      { slug: "burpsuite", title: "Burp Suite", desc: "Proxy, Repeater ve Intruder ile manuel web analizi", level: "Orta" },
      { slug: "nikto",     title: "Nikto",      desc: "Web sunucu zafiyet ve yanlış yapılandırma tarayıcısı", level: "Başlangıç" },
      { slug: "wpscan",    title: "WPScan",     desc: "WordPress eklenti, tema, kullanıcı zafiyet taraması", level: "Orta" },
      { slug: "web-exploitation", title: "Web Sömürü Teknikleri", desc: "LFI/RFI, dosya yükleme bypass, log poisoning, command injection", level: "Orta–İleri" },
    ],
  },
  {
    category: "Shell & Erişim",
    items: [
      { slug: "reverse-shells", title: "Reverse Shell & TTY", desc: "Bash/Python/PHP/PowerShell reverse shell ve tam etkileşimli TTY yükseltme", level: "Başlangıç–Orta" },
      { slug: "file-transfer",  title: "Dosya Transferi",     desc: "HTTP, certutil, SMB, scp ile hedefe/hedeften dosya aktarma", level: "Başlangıç–Orta" },
    ],
  },
  {
    category: "Parola Saldırıları",
    items: [
      { slug: "hydra",   title: "Hydra",            desc: "Online brute force — SSH, FTP, HTTP, SMB form saldırıları", level: "Orta" },
      { slug: "john",    title: "John the Ripper",  desc: "Offline hash kırma, /etc/shadow ve özel format desteği", level: "Orta" },
      { slug: "hashcat", title: "Hashcat",          desc: "GPU hızlandırmalı hash kırma — NTLM, Kerberoast, WPA", level: "Orta–İleri" },
    ],
  },
  {
    category: "Sömürü (Exploitation)",
    items: [
      { slug: "metasploit", title: "Metasploit Framework", desc: "Exploit, msfvenom payload üretimi ve meterpreter post-exploitation", level: "Orta–İleri" },
    ],
  },
  {
    category: "Active Directory & İç Ağ",
    items: [
      { slug: "bloodhound", title: "BloodHound",        desc: "AD saldırı yollarını grafiksel haritalama — DA'ya en kısa yol", level: "İleri" },
      { slug: "responder",  title: "Responder",         desc: "LLMNR/NBT-NS zehirleme ile NetNTLMv2 hash yakalama", level: "İleri" },
      { slug: "netexec",    title: "NetExec (CME)",      desc: "İç ağ numaralandırma, Pass-the-Hash ve yanal hareket", level: "İleri" },
      { slug: "impacket",   title: "Impacket & Kerberos", desc: "secretsdump, psexec, Kerberoasting, AS-REP Roasting", level: "İleri" },
    ],
  },
  {
    category: "Post-Exploitation & PrivEsc",
    items: [
      { slug: "linux-privesc",   title: "Linux Privilege Escalation",   desc: "Bash revshell, TTY upgrade, LinPEAS, SUID, Sudo & Cron istismarı", level: "Orta–İleri" },
      { slug: "windows-privesc", title: "Windows Privilege Escalation", desc: "PowerShell, Nishang, Metasploit payload, WinPEAS, token impersonation", level: "Orta–İleri" },
      { slug: "pivoting",        title: "Pivoting & Tunneling",         desc: "SSH tünelleme, proxychains, chisel, ligolo ile iç ağa sıçrama", level: "İleri" },
    ],
  },
  {
    category: "CTF Teknikleri",
    items: [
      { slug: "stego-forensics", title: "Steganografi & Adli Bilişim", desc: "binwalk, steghide, exiftool, zsteg, PCAP analizi — CTF forensics", level: "Başlangıç–Orta" },
      { slug: "crypto-ctf", title: "Kriptografi & Encoding", desc: "Base64/hex, XOR, klasik şifreler, hash kırma, RSA saldırıları, CyberChef", level: "Başlangıç–İleri" },
      { slug: "binary-exploitation", title: "Binary Exploitation & Reversing", desc: "Ghidra, gdb, pwntools, buffer overflow, ret2win — pwn kategorisi", level: "Orta–İleri" },
    ],
  },
  {
    category: "Cloud Pentest",
    items: [
      { slug: "cloud-pentest", title: "Cloud Pentest (AWS/Azure)", desc: "S3 bucket, IAM enumeration, metadata SSRF, ScoutSuite, Pacu", level: "Orta–İleri" },
    ],
  },
  {
    category: "Kablosuz Ağ (Wi-Fi) Pentest",
    items: [
      { slug: "wifi-pentest", title: "Wi-Fi Güvenlik Testi", desc: "Monitor mod, handshake yakalama, Evil Twin ve Enterprise atlatma", level: "Orta–İleri" },
    ],
  },
  {
    category: "Mobil Uygulama Pentest",
    items: [
      { slug: "mobile-pentest", title: "Mobil Uygulama Güvenliği", desc: "APK analizi, Burp traffic araya girme, SSL Pinning bypass ve Frida", level: "Orta–İleri" },
    ],
  },
];

export default function RedTeamPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Shield className="w-7 h-7 text-red-400" />
        <h1 className="text-2xl font-bold text-terminal-white">Red Team</h1>
      </div>
      <p className="text-terminal-comment mb-8 ml-10">
        Ofansif güvenlik araçlarını ve tekniklerini temelden ileri seviyeye öğren.
      </p>

      <div className="space-y-8">
        {tools.map((cat) => (
          <div key={cat.category}>
            <h2 className="text-xs font-mono font-semibold text-terminal-comment uppercase tracking-widest mb-3 border-b border-surface-3 pb-2">
              {cat.category}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {cat.items.map((tool) => (
                <Link key={tool.slug} href={`/red-team/${tool.slug}`} className="group">
                  <div className="module-card border border-surface-3 hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(239,68,68,0.08)] transition-all">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-terminal-white group-hover:text-red-300 transition-colors">
                        {tool.title}
                      </h3>
                      <ArrowRight className="w-4 h-4 text-terminal-comment group-hover:text-red-400 group-hover:translate-x-1 transition-all shrink-0" />
                    </div>
                    <p className="text-xs text-terminal-comment mt-1 leading-relaxed">{tool.desc}</p>
                    <span className="mt-3 inline-block text-xs font-mono text-red-400/70 bg-red-500/5 border border-red-500/15 px-2 py-0.5 rounded">
                      {tool.level}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
