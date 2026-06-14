export type FileEntry =
  | { type: "dir"; children: string[] }
  | { type: "file"; content: string; protected?: boolean };

export const FS: Record<string, FileEntry> = {
  "/": { type: "dir", children: ["home", "etc", "var", "tmp"] },
  "/home": { type: "dir", children: ["kali"] },
  "/home/kali": { type: "dir", children: ["Desktop", "tools", ".bashrc", ".zshrc"] },
  "/home/kali/Desktop": { type: "dir", children: ["notes.txt", "targets.txt", "todo.txt"] },
  "/home/kali/Desktop/notes.txt": {
    type: "file",
    content:
      "# Pentest Notları\nTarget: 10.10.10.5\nPorts: 80, 443, 22\n\nnmap -sV -sC 10.10.10.5\ngobuster dir -u http://10.10.10.5 -w /home/kali/tools/wordlists/common.txt",
  },
  "/home/kali/Desktop/targets.txt": {
    type: "file",
    content:
      "10.10.10.5    Linux Web Server  (Apache)\n10.10.10.100  Windows AD       (-Pn gerekli!)\n10.129.1.15   CTF Easy         (FTP anonymous açık)",
  },
  "/home/kali/Desktop/todo.txt": {
    type: "file",
    content: "TODO:\n[x] Subnet tarama\n[ ] 10.10.10.5 web enumeration\n[ ] Privilege escalation\n[ ] Rapor yaz",
  },
  "/home/kali/tools": { type: "dir", children: ["wordlists", "scripts"] },
  "/home/kali/tools/wordlists": { type: "dir", children: ["rockyou.txt", "common.txt"] },
  "/home/kali/tools/wordlists/rockyou.txt": { type: "file", content: "(binary — 133MB, ~14 milyon şifre)" },
  "/home/kali/tools/wordlists/common.txt": { type: "file", content: "(binary — 2.2MB, 87648 satır)" },
  "/home/kali/tools/scripts": { type: "dir", children: ["recon.sh", "enum.py"] },
  "/home/kali/tools/scripts/recon.sh": {
    type: "file",
    content:
      "#!/bin/bash\nTARGET=$1\nnmap -sV -sC -oN nmap_$TARGET $TARGET\ngobuster dir -u http://$TARGET -w /home/kali/tools/wordlists/common.txt",
  },
  "/home/kali/tools/scripts/enum.py": {
    type: "file",
    content: "#!/usr/bin/env python3\nimport subprocess, sys\ntarget = sys.argv[1]\nprint(f'[*] Enumerating {target}')",
  },
  "/home/kali/.bashrc": {
    type: "file",
    content: "# ~/.bashrc\nexport PATH=$PATH:/home/kali/tools\nalias ll='ls -la'\nalias nmap='nmap --reason'",
  },
  "/home/kali/.zshrc": { type: "file", content: "# ~/.zshrc — Kali default config\nplugins=(git zsh-autosuggestions)" },
  "/etc": { type: "dir", children: ["passwd", "hosts", "hostname", "shadow", "crontab"] },
  "/etc/passwd": {
    type: "file",
    content:
      "root:x:0:0:root:/root:/bin/bash\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin\nkali:x:1000:1000:Kali,,,:/home/kali:/usr/bin/zsh",
  },
  "/etc/hosts": {
    type: "file",
    content: "127.0.0.1\tlocalhost\n127.0.1.1\tkali\n10.10.10.5\ttarget.htb\n10.10.10.100\tdc01.lab.local",
  },
  "/etc/hostname": { type: "file", content: "kali" },
  "/etc/shadow": { type: "file", content: "", protected: true },
  "/etc/crontab": {
    type: "file",
    content: "SHELL=/bin/sh\nPATH=/usr/local/sbin:/usr/sbin:/sbin\n*/5 * * * *  root  /opt/backup.sh",
  },
  "/var": { type: "dir", children: ["www", "log"] },
  "/var/www": { type: "dir", children: ["html"] },
  "/var/www/html": { type: "dir", children: ["index.html", "config.php.bak"] },
  "/var/www/html/index.html": {
    type: "file",
    content:
      "<html>\n<head><title>Apache2 Default</title></head>\n<body><h1>It works!</h1></body>\n</html>",
  },
  "/var/www/html/config.php.bak": {
    type: "file",
    content: "<?php\n$host='localhost';\n$db='webapp';\n$user='webapp_user';\n$pass='S3cr3tP@ss!';\n?>",
  },
  "/tmp": { type: "dir", children: ["linpeas.sh"] },
  "/tmp/linpeas.sh": {
    type: "file",
    content: "#!/bin/bash\n# LinPEAS - Linux Privilege Escalation Script\necho '[*] Starting LinPEAS...'",
  },
};

export interface Scenario {
  id: string;
  name: string;
  target: string;
  os: "linux" | "windows";
  icon: string;
  color: string;
  desc: string;
  ports: number[];
  services: Record<number, string>;
  requiresPn?: boolean;
  tips: string[];
}

export const scenarios: Scenario[] = [
  {
    id: "linux-web",
    name: "Linux Web Server",
    target: "10.10.10.5",
    os: "linux",
    icon: "🐧",
    color: "orange",
    desc: "Apache 2.4 web sunucusu, SSH açık. ICMP aktif — standart nmap çalışır.",
    ports: [22, 80, 443],
    services: {
      22: "ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.5",
      80: "http    Apache httpd 2.4.41 ((Ubuntu))",
      443: "https   Apache httpd 2.4.41",
    },
    tips: [
      "nmap -sV -sC 10.10.10.5",
      "gobuster dir -u http://10.10.10.5 -w wordlist",
      "Apache 2.4.41 → searchsploit apache 2.4",
    ],
  },
  {
    id: "windows-ad",
    name: "Windows AD Sunucusu",
    target: "10.10.10.100",
    os: "windows",
    icon: "🪟",
    color: "sky",
    desc: "Windows Server 2019, Active Directory. ICMP kapalı — nmap -Pn ZORUNLU!",
    ports: [53, 88, 135, 139, 389, 445, 3389],
    services: {
      53: "domain   Simple DNS Plus",
      88: "kerberos Microsoft Windows Kerberos",
      135: "msrpc    Microsoft Windows RPC",
      139: "netbios  Microsoft Windows netbios",
      389: "ldap     Microsoft AD LDAP",
      445: "smb      Windows Server 2019 microsoft-ds",
      3389: "ms-wbt   Microsoft Terminal Services",
    },
    requiresPn: true,
    tips: [
      "nmap -Pn 10.10.10.100  ← ICMP kapalı, -Pn şart!",
      "smbclient -L //10.10.10.100 -N",
      "445 + 88 (Kerberos) = Domain Controller",
    ],
  },
  {
    id: "ctf-easy",
    name: "CTF Easy (HTB tarzı)",
    target: "10.129.1.15",
    os: "linux",
    icon: "🚩",
    color: "red",
    desc: "FTP anonim login açık, nginx web sunucusu. Başlangıç seviye.",
    ports: [21, 22, 80],
    services: {
      21: "ftp    vsftpd 3.0.3",
      22: "ssh    OpenSSH 7.9p1 Debian",
      80: "http   nginx 1.14.0",
    },
    tips: [
      "ftp 10.129.1.15  →  anonymous / (boş şifre)",
      "gobuster dir -u http://10.129.1.15 -w common.txt",
      "hydra -l admin -P rockyou.txt ssh://10.129.1.15",
    ],
  },
];

export interface Challenge {
  id: string;
  order: number;
  task: string;
  hint: string;
  check: (cmd: string) => boolean;
  successMsg: string;
  tip: string;
}

export interface ChallengeSet {
  id: string;
  name: string;
  icon: string;
  color: string;
  desc: string;
  challenges: Challenge[];
}

export const challengeSets: ChallengeSet[] = [
  {
    id: "linux",
    name: "Linux Temelleri",
    icon: "[LIN]",
    color: "orange",
    desc: "pwd'den ip a'ya — temel Linux komutları",
    challenges: [
      {
        id: "l1", order: 1,
        task: "Geçerli dizini öğren",
        hint: "print working directory",
        check: (c) => c.trim() === "pwd",
        successMsg: "/home/kali — Ana dizindesin.",
        tip: "pwd = Print Working Directory. Nerede olduğunu her zaman bil.",
      },
      {
        id: "l2", order: 2,
        task: "Dosya ve klasörleri listele",
        hint: "list (tek harf komut)",
        check: (c) => /^ls(\s|$)/.test(c.trim()) || c.trim() === "ll",
        successMsg: "Desktop/ ve tools/ görünüyor!",
        tip: "ls = list. ll kısayolu da çalışır (ls -la).",
      },
      {
        id: "l3", order: 3,
        task: "Gizli dosyalar dahil detaylı listele",
        hint: "ls -la",
        check: (c) =>
          /^(ls\s+-la|ls\s+-al|ls\s+-l\s+-a|ls\s+-a\s+-l|ll)\s*$/.test(c.trim()),
        successMsg: ".bashrc ve .zshrc gizli dosyaları görüntülendi!",
        tip: "Nokta ile başlayanlar gizlidir. -a = all, -l = long format.",
      },
      {
        id: "l4", order: 4,
        task: "Desktop klasörüne geç",
        hint: "change directory",
        check: (c) =>
          /^cd\s+(Desktop|~\/Desktop|\/home\/kali\/Desktop)\s*$/.test(c.trim()),
        successMsg: "Desktop'tasın! notes.txt burada.",
        tip: "cd = change directory. Sadece cd veya cd ~ yazmak /home/kali'ye döner.",
      },
      {
        id: "l5", order: 5,
        task: "notes.txt dosyasını oku",
        hint: "concatenate",
        check: (c) => /^cat\s+.*notes\.txt/.test(c.trim()),
        successMsg: "Pentest notlarını okudun!",
        tip: "cat = dosyayı ekrana basar. Uzun dosyalar için: less notes.txt",
      },
      {
        id: "l6", order: 6,
        task: "recon adında bir klasör oluştur",
        hint: "make directory",
        check: (c) => /^mkdir\s+recon\s*$/.test(c.trim()),
        successMsg: "recon/ oluşturuldu! nmap çıktılarını buraya kaydet.",
        tip: "mkdir -p recon/nmap ile iç içe klasör yapabilirsin.",
      },
      {
        id: "l7", order: 7,
        task: "Kullanıcı adını öğren",
        hint: "who am i? (tek kelime komut)",
        check: (c) => c.trim() === "whoami",
        successMsg: "kali — Henüz root değiliz!",
        tip: "uid=0(root) görürsen privesc başarılı.",
      },
      {
        id: "l8", order: 8,
        task: "UID ve grup bilgilerini gör",
        hint: "identity",
        check: (c) => c.trim() === "id",
        successMsg: "uid=1000(kali). sudo grubundayız!",
        tip: "Hedef: uid=0(root). id komutu ile kontrol et.",
      },
      {
        id: "l9", order: 9,
        task: "Kernel bilgisini tam göster",
        hint: "unix name -all",
        check: (c) => /^uname\s+.*-a/.test(c.trim()),
        successMsg: "Linux kali 6.1.0 — Kernel versiyonu exploit araması için kritik!",
        tip: "searchsploit 'linux kernel 6.1' ile exploit arayabilirsin.",
      },
      {
        id: "l10", order: 10,
        task: "Ağ arayüzlerini ve IP'yi gör",
        hint: "ifconfig veya ip a",
        check: (c) =>
          c.trim() === "ifconfig" || /^ip\s+(a|addr|address)\s*$/.test(c.trim()),
        successMsg: "tun0 = HTB/VPN bağlantısı! 10.10.14.x senin VPN IP'n.",
        tip: "tun0 olmadan HTB makinelerine erişemezsin.",
      },
    ],
  },
  {
    id: "sqlmap",
    name: "SQLMap",
    icon: "[SQL]",
    color: "amber",
    desc: "SQL injection tespiti ve sömürüsü — --dbs'den --dump'a zincir",
    challenges: [
      {
        id: "sq1", order: 1,
        task: "Hedef URL'deki veritabanlarını listele",
        hint: 'sqlmap -u "http://..." --dbs',
        check: (c) => /^sqlmap\s+.*--dbs/.test(c.trim()),
        successMsg: "3 veritabanı bulundu: information_schema, webapp, users_db",
        tip: "--dbs = database list. Önce hangi DB'ler var öğren.",
      },
      {
        id: "sq2", order: 2,
        task: "webapp veritabanının tablolarını listele",
        hint: 'sqlmap -u "http://..." -D webapp --tables',
        check: (c) => /^sqlmap\s+.*-D\s+\w+\s+.*--tables/.test(c.trim()) || /^sqlmap\s+.*--tables\s+.*-D\s+\w+/.test(c.trim()),
        successMsg: "Tablolar: users, products, orders",
        tip: "-D <veritabani> --tables → hangi tablolar var gösterir.",
      },
      {
        id: "sq3", order: 3,
        task: "users tablosundaki tüm veriyi dök",
        hint: 'sqlmap -u "http://..." -D webapp -T users --dump',
        check: (c) => /^sqlmap\s+.*-T\s+\w+\s+.*--dump/.test(c.trim()) || /^sqlmap\s+.*--dump\s+.*-T\s+\w+/.test(c.trim()),
        successMsg: "admin:5f4dcc3b5aa... (MD5) — hashcat ile kır!",
        tip: "--dump tablo içeriğini çeker. Hash'leri hashcat/john ile kır.",
      },
      {
        id: "sq4", order: 4,
        task: "POST verisiyle login formuna saldır",
        hint: 'sqlmap -u "http://..." --data="user=a&pass=b" --dbs',
        check: (c) => /^sqlmap\s+.*--data/.test(c.trim()),
        successMsg: "POST parametresi 'user' enjeksiyona açık!",
        tip: "--data ile POST body'yi belirt. Burp'tan kopyalayabilirsin.",
      },
      {
        id: "sq5", order: 5,
        task: "WAF atlatmak için tamper script kullan",
        hint: 'sqlmap -u "http://..." --tamper=space2comment --dbs',
        check: (c) => /^sqlmap\s+.*--tamper/.test(c.trim()),
        successMsg: "space2comment: boşlukları /*...*/ ile değiştirdi — WAF atlatıldı!",
        tip: "Popüler tamper'lar: space2comment, between, randomcase, charunicodeescape",
      },
      {
        id: "sq6", order: 6,
        task: "Burp'tan kaydedilen istek dosyasıyla saldır (-r)",
        hint: "sqlmap -r istek.txt --batch",
        check: (c) => /^sqlmap\s+.*-r\s+\S+/.test(c.trim()),
        successMsg: "İstek dosyasından hedefe bağlandı. --batch otomatik cevaplar.",
        tip: "Burp → sağ tık → Save to file → sqlmap -r dosya.txt --batch",
      },
    ],
  },
  {
    id: "metasploit",
    name: "Metasploit",
    icon: "[MSF]",
    color: "red",
    desc: "msfconsole — search, use, set, run adım adım",
    challenges: [
      {
        id: "m1", order: 1,
        task: "Metasploit konsolunu başlat",
        hint: "msfconsole",
        check: (c) => c.trim() === "msfconsole",
        successMsg: "MSF6 konsol hazır. Yüzlerce exploit kullanılabilir!",
        tip: "msfconsole her saldırının başlangıcı. Açılması uzun sürebilir.",
      },
      {
        id: "m2", order: 2,
        task: "EternalBlue (MS17-010) exploitini ara",
        hint: "search eternalblue",
        check: (c) => /^search\s+.*(eternalblue|ms17.010|eternal)/i.test(c.trim()),
        successMsg: "exploit/windows/smb/ms17_010_eternalblue bulundu!",
        tip: "search modülü adı, CVE veya platform ile arama yapar.",
      },
      {
        id: "m3", order: 3,
        task: "EternalBlue modülünü seç",
        hint: "use exploit/windows/smb/ms17_010_eternalblue",
        check: (c) => /^use\s+.*ms17_010/i.test(c.trim()) || /^use\s+\d+/.test(c.trim()),
        successMsg: "msf6 exploit(ms17_010_eternalblue) > — Modül seçildi!",
        tip: "use <modül_adı> veya use <numara> (search sonucundaki #)",
      },
      {
        id: "m4", order: 4,
        task: "Hedef IP'yi ayarla (RHOSTS = 10.10.10.100)",
        hint: "set RHOSTS 10.10.10.100",
        check: (c) => /^set\s+RHOSTS\s+\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/i.test(c.trim()),
        successMsg: "RHOSTS => 10.10.10.100 ayarlandı.",
        tip: "show options ile hangi parametreler gerekli görebilirsin.",
      },
      {
        id: "m5", order: 5,
        task: "Meterpreter payload'ı seç",
        hint: "set PAYLOAD windows/x64/meterpreter/reverse_tcp",
        check: (c) => /^set\s+PAYLOAD\s+\S+meterpreter/i.test(c.trim()),
        successMsg: "PAYLOAD => windows/x64/meterpreter/reverse_tcp",
        tip: "show payloads ile uyumlu payload'ları listele.",
      },
      {
        id: "m6", order: 6,
        task: "Exploiti çalıştır",
        hint: "run  (veya exploit)",
        check: (c) => c.trim() === "run" || c.trim() === "exploit",
        successMsg: "Meterpreter oturumu acildi! sessions -i 1 ile baglan.",
        tip: "Meterpreter sonrasi: sysinfo, getuid, hashdump, shell",
      },
    ],
  },
  {
    id: "nmap",
    name: "Ağ Keşfi (Nmap)",
    icon: "[NMAP]",
    color: "red",
    desc: "Nmap port tarama, servis tespiti, Windows -Pn tekniği",
    challenges: [
      {
        id: "n1", order: 1,
        task: "10.10.10.5'i temel nmap ile tara",
        hint: "nmap <ip>",
        check: (c) => /^nmap\s+.*10\.10\.10\.5/.test(c.trim()),
        successMsg: "22, 80, 443 portları açık!",
        tip: "Temel tarama en yaygın 1000 portu tarar. Tam tarama için -p- gerekli.",
      },
      {
        id: "n2", order: 2,
        task: "Servis versiyonlarını tespit et (-sV)",
        hint: "nmap -sV <ip>",
        check: (c) => /^nmap\s+.*-[a-zA-Z]*V[a-zA-Z]*.*10\.10\.10\.5/.test(c),
        successMsg: "Apache 2.4.41 tespit edildi — şimdi exploit arayabiliriz!",
        tip: "-sV = service version. Versiyon olmadan exploit bulamazsın.",
      },
      {
        id: "n3", order: 3,
        task: "Default NSE scriptleri çalıştır (-sC veya -A)",
        hint: "-sC veya -A flag'i",
        check: (c) => /^nmap\s+.*(-sC|-A).*10\.10\.10\.5/.test(c),
        successMsg: "NSE scriptleri HTTP title ve SSH bilgisi getirdi!",
        tip: "-A = -sV + -sC + OS detection. Kapsamlı ama yavaş.",
      },
      {
        id: "n4", order: 4,
        task: "Tüm 65535 portu tara (-p-)",
        hint: "nmap -p- <ip>",
        check: (c) => /^nmap\s+.*-p-.*10\.10\.10\.5/.test(c),
        successMsg: "Gizli portlar da görüldü! -p- olmadan kaçırırdın.",
        tip: "Hızlandır: nmap -p- --min-rate 5000 <ip>",
      },
      {
        id: "n5", order: 5,
        task: "Windows hedef 10.10.10.100'ü ICMP atlayarak tara",
        hint: "Ping'i devre dışı bırak: -Pn",
        check: (c) => /^nmap\s+.*-[a-zA-Z]*Pn[a-zA-Z]*.*10\.10\.10\.100/.test(c),
        successMsg: "SMB (445), RDP (3389), Kerberos (88) açık — Bu bir DC!",
        tip: "-Pn = Ping No. Windows'ta -Pn olmadan nmap 'Host down' der.",
      },
      {
        id: "n6", order: 6,
        task: "CTF (10.129.1.15) -sV ve -p- beraber kullanarak tara",
        hint: "iki flag'i kombine et",
        check: (c) =>
          (/^nmap\s+.*-[a-zA-Z]*V[a-zA-Z]*.*-p-.*10\.129\.1\.15/.test(c) ||
           /^nmap\s+.*-p-.*-[a-zA-Z]*V[a-zA-Z]*.*10\.129\.1\.15/.test(c)),
        successMsg: "FTP (21) vsftpd 3.0.3 — Anonymous login var!",
        tip: "Sonraki adım: ftp 10.129.1.15 → anonymous / (boş şifre)",
      },
    ],
  },
];
