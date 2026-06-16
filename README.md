# Siber Güvenlik Eğitim Platformu

Projenin Amacı

Siber güvenlik serüvenimde kendi öğrenim sürecimi daha iyi planlamak ve öğrenmem gereken tüm materyalleri tek bir merkezde toplamak amacıyla bu platformu geliştirdim.

Teorik notları, ofansif/defansif metodolojileri ve pratik laboratuvar senaryolarını bu yapı altında birleştirerek; çalışmalarım sırasında her şeyin elimin altında bulunduğu, sürekli güncellenen kişisel bir yol haritası oluşturdum.

## İçerik

| Bölüm | Konu | Modül |
|-------|------|-------|
| Linux Eğitimi | Terminal, Dosya Sistemi, İzinler, Scripting | 9 konu |
| Windows Eğitimi | CMD, PowerShell, Servis, Ağ | 6 konu |
| Network | OSI, TCP/IP, Protokoller, CCNA | 13 konu |
| DevOps | Docker, CI/CD, Git | 3 konu |
| Veritabanları | SQL temelleri, güvenlik | 4 konu |
| Sunucular | Linux/Windows server yönetimi | 4 konu |
| Red Team | OSINT, Nmap, SQLMap, Burp Suite, Metasploit, PrivEsc, Pivoting | 43 araç |
| Blue Team | Wireshark, Log Analizi, SIEM | 8 araç |
| Purple Team | MITRE ATT&CK, Sigma | 1 metodoloji |
| Metodoloji | Saldırı zinciri, pre-engagement, AD saldırı zinciri | 3 konu |
| OWASP Top 10 | A01–A10 detaylı analiz | 10 konu |
| Sertifikalar | Security+, CEH, OSCP yol haritası | 5 konu |
| Cheat Sheet | Port bazlı komut kütüphanesi | 8 port |

## Kurulum & Çalıştırma

### Gereksinimler
- [Node.js LTS](https://nodejs.org/) (18.x veya üzeri)

### Adımlar
```bash
# Projeyi indir
git clone https://github.com/KULLANICI_ADI/siber-guvenlik-platform.git
cd siber-guvenlik-platform

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıda aç: **http://localhost:3000**

## Teknoloji Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (özel terminal teması)
- **Zustand** (ilerleme takibi)

## Etik Kullanım Bildirimi

Bu platformdaki tüm araçlar, payload'lar ve teknikler **yalnızca**:
- Yalıtılmış laboratuvar ortamlarında (CTF, HackTheBox, TryHackMe)
- Yazılı yetki alınmış sızma testlerinde

kullanılmalıdır. Yetkisiz erişim girişimi yasadışıdır.

---

*White Hat · Etik · Lab Ortamı*
