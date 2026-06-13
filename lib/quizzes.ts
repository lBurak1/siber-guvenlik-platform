// Quiz soru bankası — /quiz sayfasında kullanılır.
// answer: doğru şıkkın indeksi (0 tabanlı)

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

export interface Quiz {
  slug: string;
  title: string;
  icon: string;
  color: string; // tailwind renk adı
  questions: QuizQuestion[];
}

export const quizzes: Quiz[] = [
  {
    slug: "linux",
    title: "Linux Temelleri",
    icon: "🐧",
    color: "orange",
    questions: [
      { q: "Bir dosyaya sahip için oku+yaz+çalıştır, grup ve diğerlerine sadece oku izni veren chmod değeri nedir?", options: ["chmod 777", "chmod 744", "chmod 644", "chmod 755"], answer: 1, explain: "7=rwx (sahip), 4=r-- (grup), 4=r-- (diğer) → 744." },
      { q: "Gizli dosyalar dahil tüm dosyaları uzun listeyle gösteren komut?", options: ["ls -l", "ls -la", "ls -h", "ls -R"], answer: 1, explain: "-l uzun liste, -a gizli (nokta ile başlayan) dosyalar dahil." },
      { q: "Bir komutun çıktısını başka bir komuta aktarmak için ne kullanılır?", options: ["> (redirect)", "| (pipe)", "& (background)", "; (separator)"], answer: 1, explain: "Pipe (|) bir komutun stdout'unu diğerinin stdin'ine bağlar." },
      { q: "SUID bitli dosyaları bulmak için doğru komut?", options: ["find / -perm -4000", "find / -type f", "ls -l /bin", "grep suid /etc"], answer: 0, explain: "-perm -4000 SUID bitini arar; yetki yükseltmede kritiktir." },
      { q: "Çalışan bir komutu durdurmak (iptal) için klavye kısayolu?", options: ["Ctrl+Z", "Ctrl+D", "Ctrl+C", "Ctrl+L"], answer: 2, explain: "Ctrl+C çalışan süreci sonlandırır. Ctrl+Z arka plana alır (durdurur)." },
      { q: "İç içe klasör yapısını tek komutla oluşturan?", options: ["mkdir a/b/c", "mkdir -p a/b/c", "mkdir -r a/b/c", "touch a/b/c"], answer: 1, explain: "-p eksik ara dizinleri de oluşturur." },
      { q: "Bir dosyada büyük/küçük harf duyarsız, satır numaralı arama?", options: ["grep -v", "grep -rn", "grep -in", "grep -c"], answer: 2, explain: "-i case-insensitive, -n satır numarası gösterir." },
    ],
  },
  {
    slug: "network",
    title: "Network",
    icon: "🌐",
    color: "emerald",
    questions: [
      { q: "TCP üçlü el sıkışmasının doğru sırası nedir?", options: ["ACK → SYN → SYN/ACK", "SYN → SYN/ACK → ACK", "SYN → ACK → SYN", "SYN/ACK → SYN → ACK"], answer: 1, explain: "İstemci SYN, sunucu SYN/ACK, istemci ACK gönderir." },
      { q: "HTTPS varsayılan portu hangisidir?", options: ["80", "8080", "443", "22"], answer: 2, explain: "443 HTTPS, 80 HTTP, 22 SSH portudur." },
      { q: "/24 CIDR maskesi kaç kullanılabilir host içerir?", options: ["256", "254", "128", "512"], answer: 1, explain: "/24 = 256 adres; ağ ve broadcast düşülünce 254 kullanılabilir host." },
      { q: "IP adresini MAC adresine çözen protokol?", options: ["DNS", "DHCP", "ARP", "ICMP"], answer: 2, explain: "ARP, IP ↔ MAC eşlemesini yapar. Yerel ağda çalışır." },
      { q: "Hangi protokol IP adresini otomatik atar?", options: ["DNS", "DHCP", "NAT", "ARP"], answer: 1, explain: "DHCP cihazlara otomatik IP/gateway/DNS dağıtır." },
      { q: "Router ile switch arasındaki temel fark nedir?", options: ["İkisi aynıdır", "Switch ağlar arası, router ağ içi çalışır", "Router ağlar arası, switch ağ içi çalışır", "Switch sadece kablosuzdur"], answer: 2, explain: "Router farklı ağları bağlar (L3), switch aynı ağ içinde (L2) çalışır." },
      { q: "VLAN'ın temel güvenlik faydası nedir?", options: ["Hızı artırır", "Ağı segmentlere ayırıp izolasyon sağlar", "Şifreleme yapar", "IP sayısını artırır"], answer: 1, explain: "VLAN segmentasyonu yanal hareketi (lateral movement) zorlaştırır." },
    ],
  },
  {
    slug: "red-team",
    title: "Red Team / Pentest",
    icon: "🔴",
    color: "red",
    questions: [
      { q: "Nmap'te servis versiyonu tespiti için hangi bayrak kullanılır?", options: ["-sn", "-sV", "-sP", "-oN"], answer: 1, explain: "-sV açık portlardaki servis/versiyon bilgisini tespit eder." },
      { q: "`' OR '1'='1` ifadesi hangi saldırı türüne örnektir?", options: ["XSS", "CSRF", "SQL Injection", "SSRF"], answer: 2, explain: "Klasik kimlik doğrulama atlatan SQL Injection payload'ı." },
      { q: "OSCP sınavının en belirgin özelliği nedir?", options: ["Tamamen çoktan seçmeli", "24 saatlik pratik lab sınavı", "Sadece teori", "Online açık kitap"], answer: 1, explain: "OSCP pratik odaklıdır: makineleri ele geçirip rapor yazarsın." },
      { q: "`<script>alert(1)</script>` hangi zafiyeti test eder?", options: ["SQLi", "XSS", "LFI", "XXE"], answer: 1, explain: "Cross-Site Scripting (XSS) — tarayıcıda JS çalıştırma." },
      { q: "Saldırı zincirinde 'enumeration' aşaması ne yapar?", options: ["Veriyi şifreler", "Hedef hakkında bilgi toplar", "Logları siler", "Sistemi kapatır"], answer: 1, explain: "Enumeration = ayrıntılı bilgi toplama; pentest'in en kritik aşamasıdır." },
      { q: "Metasploit ne tür bir araçtır?", options: ["SIEM", "Exploit framework'ü", "Firewall", "Antivirüs"], answer: 1, explain: "Metasploit, exploit geliştirme ve çalıştırma framework'üdür." },
      { q: "Hangisi yetkisiz/yasadışıdır?", options: ["Kendi lab'ında DVWA test etmek", "Yazılı izinli pentest", "İzinsiz bir bankayı taramak", "HackTheBox makinesi çözmek"], answer: 2, explain: "İzinsiz gerçek sistemlere saldırı yasadışıdır. Daima yetki şarttır." },
    ],
  },
  {
    slug: "blue-team",
    title: "Blue Team / Savunma",
    icon: "🔵",
    color: "blue",
    questions: [
      { q: "Windows Event ID 4625 neyi ifade eder?", options: ["Başarılı giriş", "Başarısız giriş", "Yeni kullanıcı", "Servis kuruldu"], answer: 1, explain: "4625 başarısız oturum açma — brute force tespitinde kullanılır." },
      { q: "SIEM'in temel görevi nedir?", options: ["Dosya şifreleme", "Logları merkezi toplayıp korele etmek", "Ağı hızlandırmak", "Yedek almak"], answer: 1, explain: "SIEM logları toplar, korele eder ve alarm üretir." },
      { q: "EDR, klasik antivirüsten en önemli farkı nedir?", options: ["Daha ucuz", "Davranış tabanlı tespit ve müdahale", "Sadece imza tabanlı", "İnternet gerektirmez"], answer: 1, explain: "EDR davranış analizi yapar; fileless ve zero-day tehditleri yakalayabilir." },
      { q: "Phishing e-postasında gerçek göndericiyi anlamak için hangi başlık incelenir?", options: ["Subject", "Return-Path / Received", "Body", "Date"], answer: 1, explain: "Received zinciri ve Return-Path gerçek kaynağı gösterir; From sahte olabilir." },
      { q: "IOC neyin kısaltmasıdır?", options: ["Internet of Computers", "Indicator of Compromise", "Input Output Control", "Internal Office Channel"], answer: 1, explain: "IOC = Indicator of Compromise (ihlal göstergesi): hash, IP, domain vb." },
      { q: "Brute force saldırısına karşı en etkili önlemlerden biri?", options: ["Daha hızlı CPU", "Hesap kilitleme + MFA", "Logları kapatmak", "Portu değiştirmek"], answer: 1, explain: "Başarısız deneme limiti (kilitleme) ve MFA brute force'u büyük ölçüde engeller." },
      { q: "Sandbox ne işe yarar?", options: ["Şifre saklar", "Şüpheli dosyayı izole ortamda analiz eder", "Ağ tarar", "Yedek alır"], answer: 1, explain: "Sandbox zararlıyı yalıtılmış ortamda çalıştırıp davranışını gözlemler." },
    ],
  },
  {
    slug: "devops",
    title: "Git & Docker",
    icon: "🔀",
    color: "teal",
    questions: [
      { q: "Değişiklikleri staging alanına eklemek için hangi komut?", options: ["git commit", "git add", "git push", "git stash"], answer: 1, explain: "git add dosyaları stage'e ekler; ardından git commit ile kaydedilir." },
      { q: "Push edilmiş bir commit'i güvenli şekilde geri almanın yolu?", options: ["git reset --hard", "git revert", "git rm", "git checkout"], answer: 1, explain: "git revert geçmişi bozmadan ters bir commit oluşturur; paylaşılan dalda güvenlidir." },
      { q: "Docker'da image'dan çalışan canlı örneğe ne denir?", options: ["Image", "Container", "Volume", "Registry"], answer: 1, explain: "Container, image'ın çalışan canlı örneğidir." },
      { q: "Konteyner verisini kalıcı saklamak için ne kullanılır?", options: ["Network", "Volume", "Image", "Tag"], answer: 1, explain: "Volume veriyi konteyner silinse de korur." },
      { q: "Bir Docker image'ını zafiyet için tarayan popüler araç?", options: ["nmap", "trivy", "hydra", "john"], answer: 1, explain: "Trivy image'lardaki bilinen CVE'leri tarar." },
      { q: "Asla Git'e commit'lenmemesi gereken dosya hangisidir?", options: ["README.md", ".env (şifreler)", "index.html", "package.json"], answer: 1, explain: ".env genelde API key/şifre içerir; .gitignore'a eklenmelidir." },
      { q: "Yeni bir dal oluşturup ona geçen modern komut?", options: ["git branch x", "git switch -c x", "git merge x", "git tag x"], answer: 1, explain: "git switch -c yeni dal oluşturur ve ona geçer (eski: checkout -b)." },
    ],
  },
  {
    slug: "concepts",
    title: "Güvenlik Kavramları",
    icon: "💡",
    color: "indigo",
    questions: [
      { q: "CIA üçlüsü neyi ifade eder?", options: ["Control, Identity, Access", "Confidentiality, Integrity, Availability", "Cyber, Internet, Application", "Cloud, Identity, Audit"], answer: 1, explain: "Gizlilik, Bütünlük, Erişilebilirlik — güvenliğin temel üçlüsü." },
      { q: "'Zero Trust' yaklaşımının özü nedir?", options: ["İç ağa güven", "Asla güvenme, her zaman doğrula", "Herkese tam yetki", "Firewall yeterli"], answer: 1, explain: "Zero Trust hiçbir varlığa otomatik güvenmez; sürekli doğrulama ister." },
      { q: "Saldırgan TTP'lerini derleyen sektör standardı çerçeve?", options: ["OWASP", "MITRE ATT&CK", "ISO 9001", "PCI"], answer: 1, explain: "MITRE ATT&CK gerçek saldırı taktik/tekniklerini kataloglar." },
      { q: "En az yetki (least privilege) prensibi ne demektir?", options: ["Herkese admin ver", "Sadece gereken kadar yetki ver", "Yetkileri kaldır", "Şifreyi paylaş"], answer: 1, explain: "Her kullanıcı/uygulama yalnızca işini yapacak kadar yetkiye sahip olmalı." },
      { q: "Türkiye'nin kişisel veri koruma kanunu hangisidir?", options: ["GDPR", "HIPAA", "KVKK", "SOX"], answer: 2, explain: "KVKK (6698) Türkiye'nin veri koruma kanunudur; GDPR ise AB tüzüğü." },
      { q: "Bilgi güvenliği yönetim sistemi (ISMS) standardı?", options: ["ISO 27001", "ISO 9001", "PCI-DSS", "NIST 800-53"], answer: 0, explain: "ISO/IEC 27001 ISMS sertifikasyon standardıdır." },
      { q: "'Defense in Depth' ne anlama gelir?", options: ["Tek güçlü firewall", "Katmanlı, çok aşamalı savunma", "Sadece şifreleme", "Yedekleme"], answer: 1, explain: "Birden çok savunma katmanı; biri aşılsa diğeri korur." },
    ],
  },
];
