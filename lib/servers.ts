// Sunucular vitrini — /sunucular sayfasında kullanılır.
// Her sunucu: ne olduğu + saldırı yüzeyi + Red Team detay modülüne link.

export interface ServerItem {
  name: string;
  desc: string;       // ne işe yarar
  attack: string;     // nasıl saldırılır (özet)
  port: string;
  href: string;       // Red Team detaylı eğitim
}
export interface ServerCategory {
  slug: string;
  title: string;
  icon: string;
  color: string;
  items: ServerItem[];
}

export const servers: ServerCategory[] = [
  {
    slug: "os-servers",
    title: "İşletim Sistemi Sunucuları",
    icon: "🖥️",
    color: "emerald",
    items: [
      {
        name: "Linux Server (Ubuntu)",
        desc: "Web, veritabanı, dosya ve uygulama hizmetlerini barındıran en yaygın sunucu işletim sistemi.",
        attack: "Servis keşfi → zayıf SSH/FTP, açık NFS/Samba, servis CVE'leri → foothold → SUID/sudo/cron ile root.",
        port: "22, 80, 445, 2049",
        href: "/red-team/linux-server",
      },
      {
        name: "Windows Server",
        desc: "Kurumsal ağların belkemiği: Domain Controller, IIS, dosya sunucusu ve AD hizmetleri.",
        attack: "SMB/LDAP enumeration → RDP/WinRM erişimi → credential dumping → Kerberoasting → Domain Admin.",
        port: "445, 3389, 5985, 88",
        href: "/red-team/windows-server",
      },
    ],
  },
  {
    slug: "web-servers",
    title: "Web Sunucuları",
    icon: "🌐",
    color: "amber",
    items: [
      {
        name: "Apache HTTP Server",
        desc: "Linux'ta en yaygın açık kaynak web sunucusu. .htaccess ve modüler yapı.",
        attack: "Sürüm CVE'leri (2.4.49 path traversal), açık .git/.env, directory listing, PUT ile web shell.",
        port: "80, 443",
        href: "/red-team/web-servers",
      },
      {
        name: "Nginx",
        desc: "Yüksek performanslı web sunucusu ve reverse proxy.",
        attack: "Alias misconfiguration path traversal, sürüm zafiyetleri, yanlış proxy yapılandırması.",
        port: "80, 443",
        href: "/red-team/web-servers",
      },
      {
        name: "Microsoft IIS",
        desc: "Windows'un yerleşik web sunucusu, .aspx ve Windows entegrasyonu.",
        attack: "WebDAV PUT, .aspx web shell, short name (8.3) ifşası, application pool privesc.",
        port: "80, 443",
        href: "/red-team/web-servers",
      },
    ],
  },
  {
    slug: "db-servers",
    title: "Veritabanı Sunucuları",
    icon: "🗄️",
    color: "sky",
    items: [
      {
        name: "MySQL / MariaDB",
        desc: "Web uygulamalarının en yaygın açık kaynak veritabanı.",
        attack: "Zayıf/boş root parolası, brute force, INTO OUTFILE ile web shell, UDF ile RCE, hash çıkarma.",
        port: "3306",
        href: "/red-team/database-servers",
      },
      {
        name: "Microsoft SQL Server",
        desc: "Windows kurumsal veritabanı, AD ile entegre.",
        attack: "sa zayıf parolası, xp_cmdshell ile SYSTEM komut çalıştırma, link'li sunucu istismarı.",
        port: "1433",
        href: "/red-team/database-servers",
      },
      {
        name: "PostgreSQL",
        desc: "Güçlü, açık kaynak ilişkisel veritabanı.",
        attack: "Zayıf kimlik bilgisi, COPY ... FROM PROGRAM ile komut çalıştırma, veri çıkarma.",
        port: "5432",
        href: "/red-team/database-servers",
      },
    ],
  },
  {
    slug: "service-servers",
    title: "Servis & Paylaşım Sunucuları",
    icon: "📡",
    color: "purple",
    items: [
      {
        name: "SMB / Samba (Dosya Sunucusu)",
        desc: "Windows/Linux dosya ve yazıcı paylaşımı protokolü.",
        attack: "Null session enumeration, EternalBlue (MS17-010), zayıf paylaşım izinleri, NTLM relay.",
        port: "139, 445",
        href: "/red-team/windows-server",
      },
      {
        name: "FTP Sunucusu",
        desc: "Dosya transfer protokolü; sıkça yanlış yapılandırılır.",
        attack: "Anonim erişim, brute force, eski sürüm CVE'leri (vsftpd backdoor), düz metin kimlik.",
        port: "21",
        href: "/red-team/linux-server",
      },
      {
        name: "SSH Sunucusu",
        desc: "Şifreli uzak yönetim — Linux sunucuların ana erişim kapısı.",
        attack: "Zayıf parola brute force, sızdırılmış özel anahtar, yanlış yapılandırma.",
        port: "22",
        href: "/red-team/linux-server",
      },
    ],
  },
];
