export const navigation = {
  "network-fundamentals": {
    label: "Ağ Temelleri",
    color: "emerald",
    description: "Siber güvenliğin temeli",
    categories: [
      {
        id: "models",
        title: "Ağ Modelleri",
        icon: "Layers",
        tools: [
          { id: "osi-tcpip", title: "OSI & TCP/IP Modelleri", slug: "osi-tcpip" },
          { id: "tcp-handshake", title: "TCP El Sıkışması", slug: "tcp-handshake" },
        ],
      },
      {
        id: "addressing",
        title: "Adresleme",
        icon: "Network",
        tools: [
          { id: "ip-subnetting", title: "IP & Subnetting (CIDR)", slug: "ip-subnetting" },
        ],
      },
      {
        id: "protocols",
        title: "Kritik Protokoller",
        icon: "Radio",
        tools: [
          { id: "protocols-deep", title: "ARP, DNS, DHCP, HTTP/S, SMB", slug: "protocols-deep" },
        ],
      },
    ],
  },
  "red-team": {
    label: "Red Team",
    color: "red",
    description: "Ofansif Güvenlik",
    categories: [
      {
        id: "osint",
        title: "Bilgi Toplama",
        icon: "Search",
        tools: [
          { id: "osint-basics", title: "OSINT Temelleri", slug: "osint-basics" },
          { id: "google-dorking", title: "Google Dorking", slug: "google-dorking" },
        ],
      },
      {
        id: "network",
        title: "Ağ Keşfi",
        icon: "Network",
        tools: [
          { id: "nmap", title: "Nmap", slug: "nmap" },
        ],
      },
      {
        id: "webapp",
        title: "Web Uygulama",
        icon: "Globe",
        tools: [
          { id: "gobuster", title: "Gobuster", slug: "gobuster" },
          { id: "ffuf", title: "ffuf", slug: "ffuf" },
          { id: "sqlmap", title: "SQLMap", slug: "sqlmap" },
          { id: "burpsuite", title: "Burp Suite", slug: "burpsuite" },
        ],
      },
      {
        id: "post-exploit",
        title: "Post-Exploitation",
        icon: "Terminal",
        tools: [
          { id: "linux-privesc", title: "Linux PrivEsc", slug: "linux-privesc" },
          { id: "windows-privesc", title: "Windows PrivEsc", slug: "windows-privesc" },
        ],
      },
      {
        id: "wifi",
        title: "Wi-Fi Pentest",
        icon: "Wifi",
        tools: [
          { id: "wifi-pentest", title: "Kablosuz Ağ Güvenliği", slug: "wifi-pentest" },
        ],
      },
      {
        id: "mobile",
        title: "Mobil Pentest",
        icon: "Smartphone",
        tools: [
          { id: "mobile-pentest", title: "Mobil Uygulama Güvenliği", slug: "mobile-pentest" },
        ],
      },
    ],
  },
  "blue-team": {
    label: "Blue Team",
    color: "blue",
    description: "Defansif Güvenlik",
    categories: [
      {
        id: "network-analysis",
        title: "Ağ Analizi",
        icon: "ActivitySquare",
        tools: [
          { id: "wireshark", title: "Wireshark", slug: "wireshark" },
        ],
      },
      {
        id: "log-siem",
        title: "Log & SIEM",
        icon: "FileText",
        tools: [
          { id: "log-analysis",      title: "Log Analizi",  slug: "log-analysis" },
          { id: "siem",              title: "SIEM",         slug: "siem" },
        ],
      },
      {
        id: "endpoint",
        title: "Endpoint & Tehdit",
        icon: "Shield",
        tools: [
          { id: "endpoint-security", title: "Endpoint Güvenliği (EDR/XDR)", slug: "endpoint-security" },
          { id: "sandbox",           title: "Sandbox & Zararlı Analiz",     slug: "sandbox" },
        ],
      },
      {
        id: "threat-intel",
        title: "Tehdit İstihbaratı",
        icon: "Search",
        tools: [
          { id: "cti", title: "CTI — Siber Tehdit İstihbaratı", slug: "cti" },
        ],
      },
      {
        id: "identity",
        title: "Kimlik & Erişim",
        icon: "Lock",
        tools: [
          { id: "pam",            title: "PAM — Yetkili Hesap Yönetimi", slug: "pam" },
          { id: "email-security", title: "E-posta Güvenliği",            slug: "email-security" },
        ],
      },
    ],
  },
  "purple-team": {
    label: "Purple Team",
    color: "purple",
    description: "Senkronizasyon",
    categories: [
      {
        id: "methodology",
        title: "Metodoloji",
        icon: "GitMerge",
        tools: [
          { id: "purple-methodology", title: "Purple Team Metodolojisi", slug: "purple-methodology" },
        ],
      },
    ],
  },
  "linux-fundamentals": {
    label: "Linux Eğitimi",
    color: "orange",
    description: "Temelden ileriye Linux",
    categories: [
      {
        id: "basics",
        title: "Terminal Temelleri",
        icon: "Terminal",
        tools: [
          { id: "terminal-basics",      title: "Terminal & Shell Temelleri", slug: "terminal-basics" },
          { id: "filesystem-navigation", title: "Dosya Sistemi Navigasyonu",  slug: "filesystem-navigation" },
        ],
      },
      {
        id: "file-ops",
        title: "Dosya İşlemleri",
        icon: "FolderOpen",
        tools: [
          { id: "file-operations", title: "Dosya & Dizin Yönetimi", slug: "file-operations" },
          { id: "text-processing", title: "Metin İşleme & Pipe",    slug: "text-processing" },
        ],
      },
      {
        id: "system",
        title: "Sistem Yönetimi",
        icon: "Cpu",
        tools: [
          { id: "permissions",        title: "İzinler & Kullanıcılar", slug: "permissions" },
          { id: "process-management", title: "Süreç Yönetimi",         slug: "process-management" },
        ],
      },
      {
        id: "network-linux",
        title: "Ağ Komutları",
        icon: "Network",
        tools: [
          { id: "networking-linux", title: "Ağ Komutları", slug: "networking-linux" },
        ],
      },
      {
        id: "packages",
        title: "Paket Yönetimi",
        icon: "Package",
        tools: [
          { id: "package-management", title: "APT, dpkg, pip", slug: "package-management" },
        ],
      },
      {
        id: "scripting",
        title: "Bash Scripting",
        icon: "Code",
        tools: [
          { id: "bash-scripting", title: "Bash Script Temelleri", slug: "bash-scripting" },
        ],
      },
    ],
  },
  "windows-fundamentals": {
    label: "Windows Eğitimi",
    color: "sky",
    description: "Temelden ileriye Windows",
    categories: [
      {
        id: "cmd",
        title: "CMD Temelleri",
        icon: "Terminal",
        tools: [
          { id: "cmd-basics", title: "Komut İstemi (CMD)", slug: "cmd-basics" },
        ],
      },
      {
        id: "powershell",
        title: "PowerShell",
        icon: "Code",
        tools: [
          { id: "powershell-basics", title: "PowerShell Temelleri", slug: "powershell-basics" },
        ],
      },
      {
        id: "file-ops-win",
        title: "Dosya İşlemleri",
        icon: "FolderOpen",
        tools: [
          { id: "file-operations-win", title: "Dosya & Dizin Yönetimi", slug: "file-operations-win" },
        ],
      },
      {
        id: "system-win",
        title: "Sistem Yönetimi",
        icon: "Cpu",
        tools: [
          { id: "system-management", title: "Sistem & Servis Yönetimi", slug: "system-management" },
        ],
      },
      {
        id: "network-win",
        title: "Ağ Komutları",
        icon: "Network",
        tools: [
          { id: "networking-win", title: "Ağ Komutları (CMD/PS)", slug: "networking-win" },
        ],
      },
      {
        id: "active-directory",
        title: "Active Directory",
        icon: "Users",
        tools: [
          { id: "active-directory", title: "Active Directory Yönetimi", slug: "active-directory" },
        ],
      },
    ],
  },
  "devops-fundamentals": {
    label: "DevOps Temelleri",
    color: "teal",
    description: "Git ve Docker — modern mühendislik komutları",
    categories: [
      {
        id: "version-control",
        title: "Versiyon Kontrol",
        icon: "GitBranch",
        tools: [
          { id: "git", title: "Git & GitHub", slug: "git" },
        ],
      },
      {
        id: "containers",
        title: "Konteynerizasyon",
        icon: "Box",
        tools: [
          { id: "docker", title: "Docker & Konteyner", slug: "docker" },
        ],
      },
    ],
  },
  "certifications": {
    label: "Sertifikalar",
    color: "indigo",
    description: "Siber güvenlik sertifika yol haritası",
    categories: [
      {
        id: "guide",
        title: "Yol Haritası",
        icon: "Map",
        tools: [
          { id: "roadmap", title: "Yol Haritası & Seçim Rehberi", slug: "roadmap" },
        ],
      },
      {
        id: "by-level",
        title: "Seviyeye Göre",
        icon: "Award",
        tools: [
          { id: "entry-level", title: "Başlangıç (Security+, eJPT)", slug: "entry-level" },
          { id: "offensive",   title: "Ofansif (OSCP, CRTP)",       slug: "offensive" },
          { id: "defensive",   title: "Defansif (CySA+, BTL1)",     slug: "defensive" },
          { id: "management-cloud", title: "Yönetim & Cloud (CISSP, AZ-500)", slug: "management-cloud" },
        ],
      },
    ],
  },
  "owasp-top10": {
    label: "OWASP Top 10",
    color: "amber",
    description: "Web uygulama güvenliğinin 10 kritik riski",
    categories: [
      {
        id: "critical",
        title: "En Kritik Riskler",
        icon: "AlertTriangle",
        tools: [
          { id: "broken-access-control",   title: "A01 — Broken Access Control",   slug: "broken-access-control" },
          { id: "cryptographic-failures",  title: "A02 — Cryptographic Failures",  slug: "cryptographic-failures" },
          { id: "injection",               title: "A03 — Injection",               slug: "injection" },
        ],
      },
      {
        id: "design",
        title: "Tasarım & Yapılandırma",
        icon: "Settings",
        tools: [
          { id: "insecure-design",          title: "A04 — Insecure Design",          slug: "insecure-design" },
          { id: "security-misconfiguration",title: "A05 — Security Misconfiguration",slug: "security-misconfiguration" },
          { id: "vulnerable-components",    title: "A06 — Vulnerable Components",    slug: "vulnerable-components" },
        ],
      },
      {
        id: "auth-integrity",
        title: "Auth & Bütünlük",
        icon: "Lock",
        tools: [
          { id: "auth-failures",     title: "A07 — Auth Failures",     slug: "auth-failures" },
          { id: "integrity-failures",title: "A08 — Integrity Failures", slug: "integrity-failures" },
        ],
      },
      {
        id: "monitoring-ssrf",
        title: "İzleme & SSRF",
        icon: "Radio",
        tools: [
          { id: "logging-failures", title: "A09 — Logging Failures", slug: "logging-failures" },
          { id: "ssrf",             title: "A10 — SSRF",             slug: "ssrf" },
        ],
      },
    ],
  },
} as const;

// Cheat Sheet port listesi (sidebar için)
export const cheatsheetPorts = [
  { port: 21,  service: "FTP",    slug: "ftp",    risk: "high" },
  { port: 22,  service: "SSH",    slug: "ssh",    risk: "medium" },
  { port: 23,  service: "Telnet", slug: "telnet", risk: "critical" },
  { port: 25,  service: "SMTP",   slug: "smtp",   risk: "medium" },
  { port: 80,  service: "HTTP",   slug: "http",   risk: "high" },
  { port: 443, service: "HTTPS",  slug: "https",  risk: "medium" },
  { port: 445, service: "SMB",    slug: "smb",    risk: "critical" },
  { port: 3306,service: "MySQL",  slug: "mysql",  risk: "high" },
  { port: 3389,service: "RDP",    slug: "rdp",    risk: "critical" },
] as const;
