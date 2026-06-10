// Mülakat soruları — /mulakat sayfasında kullanılır (soru → açılır cevap)

export interface QA { q: string; a: string; }
export interface InterviewCategory {
  slug: string;
  title: string;
  icon: string;
  color: string;
  items: QA[];
}

export const interview: InterviewCategory[] = [
  {
    slug: "genel",
    title: "Genel & Kavramsal",
    icon: "💡",
    color: "indigo",
    items: [
      { q: "CIA üçlüsü nedir?", a: "Confidentiality (Gizlilik), Integrity (Bütünlük), Availability (Erişilebilirlik). Bilgi güvenliğinin üç temel hedefidir: veriye sadece yetkililer erişir, veri izinsiz değişmez, sistem ihtiyaç anında çalışır." },
      { q: "Zero Trust nedir?", a: "'Asla güvenme, her zaman doğrula' prensibine dayanan güvenlik modeli. İç ağ dahil hiçbir varlığa otomatik güven verilmez; her erişim sürekli doğrulanır ve en az yetki uygulanır." },
      { q: "Vulnerability, Threat ve Risk arasındaki fark nedir?", a: "Vulnerability (zafiyet) = sistemdeki zayıflık. Threat (tehdit) = bu zafiyeti istismar edebilecek olay/aktör. Risk = tehdidin zafiyeti istismar etme olasılığı ve etkisi. Risk = Tehdit × Zafiyet × Etki." },
      { q: "Symmetric ve Asymmetric şifreleme farkı?", a: "Simetrik: tek anahtar (AES) — hızlı, anahtar paylaşımı sorun. Asimetrik: açık/özel anahtar çifti (RSA) — yavaş ama güvenli anahtar değişimi sağlar. HTTPS ikisini birlikte kullanır." },
      { q: "Hashing ile encryption farkı nedir?", a: "Encryption çift yönlüdür (anahtarla geri çözülür). Hashing tek yönlüdür (geri çözülemez), bütünlük ve parola saklama için kullanılır. Parolalar bcrypt gibi salt'lı hash ile saklanmalı." },
      { q: "Defense in Depth nedir?", a: "Katmanlı savunma. Tek bir kontrole güvenmek yerine birden çok güvenlik katmanı kullanılır (firewall + EDR + segmentasyon + MFA...). Bir katman aşılsa bile diğeri korur." },
    ],
  },
  {
    slug: "network",
    title: "Ağ",
    icon: "🌐",
    color: "emerald",
    items: [
      { q: "TCP ve UDP farkı nedir?", a: "TCP bağlantı temelli, güvenilir (sıra/teyit/yeniden iletim) — web, e-posta. UDP bağlantısız, hızlı ama garantisiz — DNS, VoIP, video. TCP üçlü el sıkışması yapar, UDP yapmaz." },
      { q: "TCP üçlü el sıkışması nasıl çalışır?", a: "İstemci SYN gönderir → sunucu SYN/ACK ile yanıtlar → istemci ACK gönderir. Böylece güvenilir bağlantı kurulur. SYN flood saldırısı bu mekanizmayı kötüye kullanır." },
      { q: "ARP nedir ve nasıl istismar edilir?", a: "ARP, IP adresini MAC adresine çözer (yerel ağda). ARP spoofing/poisoning ile saldırgan sahte ARP yanıtları göndererek trafiği kendi üzerine yönlendirir (MITM). Savunma: Dynamic ARP Inspection." },
      { q: "DNS nasıl çalışır?", a: "Alan adını IP'ye çözer. İstemci → resolver → root → TLD → authoritative sunucu hiyerarşisiyle sorgulanır. DNS spoofing, tunneling ve cache poisoning yaygın saldırı vektörleridir." },
      { q: "Firewall ve IDS/IPS farkı?", a: "Firewall trafiği kurallara göre izin verir/engeller. IDS saldırıyı tespit edip alarm verir (pasif). IPS tespit edip engeller (aktif, trafik içinde)." },
      { q: "NAT nedir, güvenliğe katkısı?", a: "Özel IP'leri tek genel IP'ye çevirir. İç ağ cihazları dışarıdan doğrudan görünmez (gizlenme yan etkisi sağlar) ama tek başına güvenlik kontrolü değildir." },
    ],
  },
  {
    slug: "linux",
    title: "Linux & Sistem",
    icon: "🐧",
    color: "orange",
    items: [
      { q: "Linux dosya izinleri nasıl çalışır?", a: "Her dosyada sahip/grup/diğer için oku(4)-yaz(2)-çalıştır(1) izinleri vardır. chmod 755 = sahip rwx, grup ve diğer r-x. SUID/SGID/sticky bit özel izinlerdir." },
      { q: "SUID biti nedir, neden risklidir?", a: "SUID'li çalıştırılabilir, dosya sahibinin yetkisiyle çalışır. /usr/bin/passwd buna örnektir. Yanlış yapılandırılmış SUID binary'ler yetki yükseltmeye (root) yol açabilir." },
      { q: "Bir sürecin yüksek CPU kullandığını nasıl bulursun?", a: "top/htop ile canlı izleme, ps aux --sort=-%cpu ile sıralama. Süreç PID'si ile kill/renice uygulanabilir. journalctl/dmesg ile log incelenir." },
      { q: "SSH'ı nasıl sertleştirirsin?", a: "Root girişini kapat (PermitRootLogin no), parola yerine anahtar (PasswordAuthentication no), port/kullanıcı kısıtlama, fail2ban, MFA ve idle timeout." },
      { q: "Bir Linux sunucusunda şüpheli aktiviteyi nasıl araştırırsın?", a: "/var/log/auth.log (giriş), last/lastlog, çalışan süreçler (ps), ağ bağlantıları (ss -tulnp), cron/zamanlanmış görevler, yeni SUID dosyalar ve değiştirilmiş binary'ler." },
    ],
  },
  {
    slug: "web",
    title: "Web / OWASP",
    icon: "🕸️",
    color: "amber",
    items: [
      { q: "SQL Injection nedir, nasıl önlenir?", a: "Kullanıcı girdisinin SQL sorgusuna komut olarak işlenmesi. Önlem: parametreli sorgular (prepared statements), ORM, girdi doğrulama ve en az yetkili DB kullanıcısı." },
      { q: "XSS türleri nelerdir?", a: "Reflected (URL'de, tek seferlik), Stored (DB'de kalıcı, en tehlikeli), DOM-based (istemci JS). Önlem: çıktı kodlama (output encoding), CSP, HttpOnly cookie." },
      { q: "CSRF nedir?", a: "Kurbanın oturumu kullanılarak isteği dışından zararlı işlem yaptırma. Önlem: CSRF token, SameSite cookie, kritik işlemlerde yeniden kimlik doğrulama." },
      { q: "IDOR nedir?", a: "Insecure Direct Object Reference: ?id=123 → ?id=124 ile başkasının verisine erişim. Sunucu tarafında ownership/yetki kontrolü yapılmamasından kaynaklanır." },
      { q: "SSRF nedir, neden tehlikeli?", a: "Server-Side Request Forgery: sunucuyu saldırganın istediği adrese istek atmaya zorlama. Cloud metadata (169.254.169.254) üzerinden kimlik bilgisi çalmaya kadar gidebilir." },
      { q: "SPF, DKIM, DMARC ne işe yarar?", a: "E-posta spoofing'i önler. SPF: izinli gönderen sunucular. DKIM: imza ile bütünlük. DMARC: SPF/DKIM başarısız olunca uygulanacak politika (reject/quarantine) + raporlama." },
    ],
  },
  {
    slug: "blue",
    title: "Blue Team / SOC",
    icon: "🔵",
    color: "blue",
    items: [
      { q: "SOC'ta olay müdahale (IR) süreci nasıldır?", a: "Genelde: Hazırlık → Tespit & Analiz → Kontrol altına alma (containment) → Yok etme (eradication) → Kurtarma → Çıkarılan dersler. NIST 800-61 referans alınır." },
      { q: "False positive ile nasıl başa çıkarsın?", a: "Kuralları tune et, whitelist/threshold ayarla, bağlam (context) ekle, tekrarlayan alarmları suppress et. Amaç gürültüyü azaltıp gerçek tehditlere odaklanmak." },
      { q: "EDR ne tür tehditleri yakalar?", a: "Fileless malware, LotL (living-off-the-land), credential dumping (Mimikatz), lateral movement, persistence ve C2 iletişimi gibi davranış tabanlı tehditler." },
      { q: "Bir phishing e-postasını nasıl analiz edersin?", a: "Başlıkları incele (Received zinciri, Return-Path, Authentication-Results), gönderen IP'yi threat intel'de sorgula, URL'leri sandbox'ta aç, ekleri VirusTotal'da kontrol et." },
      { q: "IOC ve IOA farkı nedir?", a: "IOC (Indicator of Compromise): geçmiş ihlal kanıtı (hash, IP, domain). IOA (Indicator of Attack): aktif saldırı davranışı. IOA proaktif, IOC reaktif tespite yarar." },
    ],
  },
  {
    slug: "red",
    title: "Red Team / Pentest",
    icon: "🔴",
    color: "red",
    items: [
      { q: "Bir pentest metodolojisini anlat.", a: "Bilgi toplama (recon) → Tarama & enumeration → Zafiyet analizi → Exploitation → Post-exploitation (privesc, lateral) → Raporlama. Yetki/kapsam (scope) her zaman önce netleşir." },
      { q: "Vulnerability assessment ile penetration test farkı?", a: "VA zafiyetleri tarar ve listeler (genelde otomatik). Pentest bu zafiyetleri gerçekten istismar ederek etkisini kanıtlar ve iş riskini gösterir." },
      { q: "Privilege escalation türleri nelerdir?", a: "Dikey (normal kullanıcı → admin/root) ve yatay (aynı seviyede başka kullanıcı). Linux'ta SUID/sudo/cron/kernel exploit; Windows'ta token, servis, registry, UAC bypass yöntemleri." },
      { q: "Lateral movement nedir?", a: "İlk erişimden sonra ağ içinde başka sistemlere yayılma. Pass-the-Hash, RDP, SMB, WMI, PsExec gibi tekniklerle yapılır. Segmentasyon ve izleme ile zorlaştırılır." },
      { q: "Etik kurallar pentest'te neden önemli?", a: "Tüm testler yazılı yetki ve belirlenmiş kapsam (scope) içinde yapılmalı. Kapsam dışına çıkmak yasadışıdır. Bulgular gizli tutulur, sistemlere zarar verilmez, raporla düzeltme önerilir." },
    ],
  },
];
