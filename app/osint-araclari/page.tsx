"use client";
import { ExternalLink, Search, User, Globe, Wifi, Shield, Database, Image, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tool {
  name: string;
  url: string;
  desc: string;
  tags?: string[];
  free?: boolean;
}

interface Category {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  desc: string;
  tools: Tool[];
}

const categories: Category[] = [
  {
    id: "kimlik",
    label: "Kişi & Kimlik",
    icon: User,
    color: "purple",
    desc: "E-posta, kullanıcı adı, telefon ve kişi araştırması",
    tools: [
      { name: "HaveIBeenPwned", url: "https://haveibeenpwned.com", desc: "E-posta adresinizin hangi veri sızıntılarında yer aldığını kontrol eder.", tags: ["Breach", "Email"], free: true },
      { name: "Dehashed", url: "https://dehashed.com", desc: "Sızdırılmış veri tabanlarında e-posta, kullanıcı adı, IP ve parola araması.", tags: ["Breach", "Password"] },
      { name: "Sherlock", url: "https://github.com/sherlock-project/sherlock", desc: "Kullanıcı adını 300+ sosyal medya platformunda tarar. (CLI tool)", tags: ["Username", "Social"], free: true },
      { name: "WhatsMyName", url: "https://whatsmyname.app", desc: "Kullanıcı adının hangi platformlarda kayıtlı olduğunu bulur.", tags: ["Username"], free: true },
      { name: "Hunter.io", url: "https://hunter.io", desc: "Alan adına ait kurumsal e-posta adreslerini ve formatlarını tespit eder.", tags: ["Email", "Corporate"] },
      { name: "Pipl", url: "https://pipl.com", desc: "Kişi araştırma motoru — isim, e-posta, telefon ile derinlemesine profil.", tags: ["Person", "Identity"] },
    ],
  },
  {
    id: "alan-adi",
    label: "Alan Adı & Altyapı",
    icon: Globe,
    color: "emerald",
    desc: "WHOIS, DNS, subdomain, ASN ve web altyapısı keşfi",
    tools: [
      { name: "WHOIS (who.is)", url: "https://who.is", desc: "Alan adı kayıt bilgileri, kayıt tarihi, NS ve registrar detayları.", tags: ["WHOIS", "Domain"], free: true },
      { name: "Shodan", url: "https://shodan.io", desc: "İnternete açık cihaz ve servis arama motoru. IP, port, banner, CVE.", tags: ["IoT", "Recon"] },
      { name: "Censys", url: "https://search.censys.io", desc: "İnternet geneli host ve sertifika taraması. Shodan alternatifi.", tags: ["Recon", "TLS"], free: true },
      { name: "DNSDumpster", url: "https://dnsdumpster.com", desc: "DNS keşfi ve görsel subdomain haritası çıkarır.", tags: ["DNS", "Subdomain"], free: true },
      { name: "crt.sh", url: "https://crt.sh", desc: "Certificate Transparency Log — subdomain tespiti için altın kaynak.", tags: ["SSL", "Subdomain"], free: true },
      { name: "SecurityTrails", url: "https://securitytrails.com", desc: "Tarihsel DNS kayıtları, subdomain listesi, WHOIS geçmişi.", tags: ["DNS", "History"] },
      { name: "VirusTotal", url: "https://virustotal.com", desc: "URL, IP, domain ve dosya analizi — 70+ AV engine.", tags: ["Malware", "IOC"], free: true },
      { name: "URLScan.io", url: "https://urlscan.io", desc: "URL'yi sandbox'ta açar — DOM, ağ istekleri, ekran görüntüsü.", tags: ["URL", "Sandbox"], free: true },
      { name: "BGP.he.net", url: "https://bgp.he.net", desc: "ASN, BGP prefix ve IP blokları keşfi.", tags: ["ASN", "BGP"], free: true },
    ],
  },
  {
    id: "gorsel",
    label: "Görsel & Fotoğraf OSINT",
    icon: Image,
    color: "pink",
    desc: "Tersine görsel arama, exif verisi ve fotoğraf kaynağı tespiti",
    tools: [
      { name: "Google Görseller", url: "https://images.google.com", desc: "Tersine görsel arama. Fotoğrafın nereden geldiğini, kimin olduğunu bul.", tags: ["Reverse Image"], free: true },
      { name: "Yandex Görseller", url: "https://yandex.com/images", desc: "Yüz tanıma destekli tersine görsel arama — Google'dan güçlü.", tags: ["Reverse Image", "Face"], free: true },
      { name: "TinEye", url: "https://tineye.com", desc: "Fotoğrafın ilk göründüğü yer ve tüm kopyalarını bulur.", tags: ["Reverse Image", "Copyright"], free: true },
      { name: "PimEyes", url: "https://pimeyes.com", desc: "Yüz tanıma ile internetteki tüm fotoğrafları tarar.", tags: ["Face", "Recognition"] },
      { name: "Jimpl / Exif Tool", url: "https://jimpl.com", desc: "Fotoğrafa gömülü EXIF verisi — GPS koordinatları, kamera modeli, tarih.", tags: ["EXIF", "Metadata"], free: true },
      { name: "Jeffrey's Exif Viewer", url: "https://exif.regex.info/exif.cgi", desc: "Detaylı EXIF görüntüleyici. GPS verisini harita üzerinde gösterir.", tags: ["EXIF", "GPS"], free: true },
    ],
  },
  {
    id: "konum",
    label: "Konum & Coğrafi OSINT",
    icon: MapPin,
    color: "orange",
    desc: "Fotoğraftan yer tespiti, Wi-Fi konum ve harita araçları",
    tools: [
      { name: "GeoGuessr", url: "https://www.geoguessr.com", desc: "Street View'dan yer tahmin oyunu — sokak levhaları, bitki örtüsü, mimari okumayı öğretir.", tags: ["Geolocation", "Training"], free: true },
      { name: "Pic2Map", url: "https://www.pic2map.com", desc: "Fotoğraftaki GPS koordinatlarını harita üzerinde gösterir.", tags: ["EXIF", "GPS", "Map"], free: true },
      { name: "Wigle.net", url: "https://wigle.net", desc: "Wi-Fi ağı ve Bluetooth SSID konum veritabanı. MAC/SSID → koordinat.", tags: ["WiFi", "SSID", "Location"], free: true },
      { name: "Google Earth", url: "https://earth.google.com", desc: "Uydu görüntüsü ile lokasyon doğrulama ve zaman serisi karşılaştırma.", tags: ["Satellite", "Map"], free: true },
      { name: "Overpass Turbo", url: "https://overpass-turbo.eu", desc: "OpenStreetMap sorgu aracı — belirli işaret/yapı türlerini dünya genelinde bul.", tags: ["OSM", "Query"], free: true },
      { name: "SunCalc", url: "https://suncalc.org", desc: "Gölge açısından fotoğrafın çekildiği saat ve tarih aralığını hesaplar.", tags: ["Shadow", "Time"], free: true },
    ],
  },
  {
    id: "sosyal",
    label: "Sosyal Medya",
    icon: Search,
    color: "sky",
    desc: "Hesap arama, gönderi analizi ve profil keşfi",
    tools: [
      { name: "Social-Searcher", url: "https://www.social-searcher.com", desc: "Tüm sosyal platformlarda anahtar kelime araması.", tags: ["Social", "Monitor"], free: true },
      { name: "Twint (GitHub)", url: "https://github.com/twintproject/twint", desc: "Twitter/X API olmadan gelişmiş tweet toplama aracı (CLI).", tags: ["Twitter", "CLI"], free: true },
      { name: "IntelTechniques", url: "https://inteltechniques.com/tools", desc: "OSINT araştırmacısı Michael Bazzell'in kapsamlı araç seti.", tags: ["All-in-one", "Professional"], free: true },
      { name: "Maltego CE", url: "https://www.maltego.com", desc: "İlişki grafiği ile OSINT — domain, e-posta, sosyal medya bağlantıları.", tags: ["Graph", "Pivot"], free: true },
    ],
  },
  {
    id: "tehdit",
    label: "Tehdit İstihbaratı",
    icon: Shield,
    color: "red",
    desc: "IOC analizi, saldırı altyapısı ve kötü amaçlı yazılım araştırması",
    tools: [
      { name: "AbuseIPDB", url: "https://www.abuseipdb.com", desc: "IP'nin kötü amaçlı aktivite geçmişi — DDoS, spam, brute force raporları.", tags: ["IP", "Abuse"], free: true },
      { name: "AlienVault OTX", url: "https://otx.alienvault.com", desc: "Açık tehdit istihbarat platformu — IP, domain, hash IOC paylaşımı.", tags: ["Threat Intel", "IOC"], free: true },
      { name: "MalwareBazaar", url: "https://bazaar.abuse.ch", desc: "Kötü amaçlı yazılım örneği veritabanı — hash arama ve download.", tags: ["Malware", "Hash"], free: true },
      { name: "Hybrid Analysis", url: "https://www.hybrid-analysis.com", desc: "Dosya ve URL sandbox analizi — detaylı davranış raporu.", tags: ["Sandbox", "Analysis"], free: true },
      { name: "Shodan CVE", url: "https://cvedb.shodan.io", desc: "CVE'ye göre kaç cihazın etkilendiğini ve nerede olduğunu gösterir.", tags: ["CVE", "Exposure"], free: true },
      { name: "GreyNoise", url: "https://www.greynoise.io", desc: "IP'nin internet tarayıcısı mı yoksa gerçek saldırgan mı olduğunu ayırt eder.", tags: ["Noise", "Classification"], free: true },
    ],
  },
  {
    id: "veri-sizintisi",
    label: "Veri Sızıntısı & Dark Web",
    icon: Database,
    color: "amber",
    desc: "Sızdırılmış veri tabanları, şifreler ve kimlik bilgileri araştırması",
    tools: [
      { name: "HaveIBeenPwned", url: "https://haveibeenpwned.com", desc: "En güvenilir breach bildirim servisi. Şifre hash'i de kontrol edebilirsiniz.", tags: ["Breach", "Email"], free: true },
      { name: "LeakCheck", url: "https://leakcheck.io", desc: "E-posta ve kullanıcı adına göre sızıntı araması — API mevcut.", tags: ["Breach", "API"] },
      { name: "IntelligenceX", url: "https://intelx.io", desc: "Dark web, Tor ve Pastebin'de veri araması yapabilen istihbarat motoru.", tags: ["DarkWeb", "Paste"] },
      { name: "Pastebin Search", url: "https://psbdmp.ws", desc: "Pastebin'e gönderilen tüm içeriklerde arama yapar.", tags: ["Paste", "Dump"], free: true },
    ],
  },
  {
    id: "wifi",
    label: "Wi-Fi & Ağ",
    icon: Wifi,
    color: "teal",
    desc: "Kablosuz ağ tespiti, SSID konumu ve ağ altyapısı",
    tools: [
      { name: "Wigle.net", url: "https://wigle.net", desc: "Dünya geneli Wi-Fi ağ haritası. SSID veya BSSID (MAC) ile konum bul.", tags: ["WiFi", "Map"], free: true },
      { name: "RouterScan", url: "https://github.com/gowthami157/routerscan", desc: "Router tarama ve zafiyet analiz aracı. (Sadece izinli sistemlerde)", tags: ["Router", "Pentest"], free: true },
      { name: "Kismet", url: "https://www.kismetwireless.net", desc: "Kablosuz ağ ve Bluetooth tespiti, pasif keşif çerçevesi.", tags: ["WiFi", "Passive"], free: true },
      { name: "NetworksDB", url: "https://networksdb.io", desc: "IP bloğu ve ASN araması, coğrafi ve ISP bilgileri.", tags: ["ASN", "IP"], free: true },
    ],
  },
];

const COLOR: Record<string, { border: string; bg: string; text: string; icon: string; badge: string }> = {
  purple:  { border: "border-purple-500/20", bg: "bg-purple-500/5",  text: "text-purple-400",  icon: "text-purple-400",  badge: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  emerald: { border: "border-emerald-500/20", bg: "bg-emerald-500/5", text: "text-emerald-400", icon: "text-emerald-400", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  pink:    { border: "border-pink-500/20",   bg: "bg-pink-500/5",    text: "text-pink-400",    icon: "text-pink-400",    badge: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
  orange:  { border: "border-orange-500/20", bg: "bg-orange-500/5",  text: "text-orange-400",  icon: "text-orange-400",  badge: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  sky:     { border: "border-sky-500/20",    bg: "bg-sky-500/5",     text: "text-sky-400",     icon: "text-sky-400",     badge: "bg-sky-500/10 text-sky-400 border-sky-500/20" },
  red:     { border: "border-red-500/20",    bg: "bg-red-500/5",     text: "text-red-400",     icon: "text-red-400",     badge: "bg-red-500/10 text-red-400 border-red-500/20" },
  amber:   { border: "border-amber-500/20",  bg: "bg-amber-500/5",   text: "text-amber-400",   icon: "text-amber-400",   badge: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  teal:    { border: "border-teal-500/20",   bg: "bg-teal-500/5",    text: "text-teal-400",    icon: "text-teal-400",    badge: "bg-teal-500/10 text-teal-400 border-teal-500/20" },
};

export default function OsintAraclariPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Search className="w-7 h-7 text-purple-400" />
        <h1 className="text-2xl font-bold text-terminal-white">OSINT Araç Rehberi</h1>
      </div>
      <p className="text-terminal-comment mb-2 ml-10">
        Pasif keşiften tehdit istihbaratına — kategorilere göre düzenlenmiş harici araçlar.
      </p>
      <p className="text-xs text-terminal-comment/60 mb-8 ml-10">
        Tüm araçlar yalnızca <span className="text-purple-400">yetkili pentest, bug bounty veya kendi sistemleriniz</span> için kullanılmalıdır.
      </p>

      <div className="space-y-8">
        {categories.map((cat) => {
          const c = COLOR[cat.color] ?? COLOR.purple;
          const Icon = cat.icon;
          return (
            <div key={cat.id}>
              {/* Bölüm başlığı */}
              <div className="flex items-center gap-3 mb-4">
                <div className={cn("w-8 h-8 rounded-lg border flex items-center justify-center", c.border, c.bg)}>
                  <Icon className={cn("w-4 h-4", c.icon)} />
                </div>
                <div>
                  <h2 className={cn("text-sm font-bold", c.text)}>{cat.label}</h2>
                  <p className="text-xs text-terminal-comment">{cat.desc}</p>
                </div>
                <span className={cn("ml-auto text-xs font-mono px-2 py-0.5 rounded border", c.badge)}>
                  {cat.tools.length} araç
                </span>
              </div>

              {/* Araç kartları */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {cat.tools.map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group rounded-xl border p-4 transition-all duration-150 flex flex-col gap-2",
                      c.border, "bg-surface-1",
                      `hover:${c.bg} hover:shadow-sm`
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className={cn("text-sm font-semibold", c.text)}>{tool.name}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {tool.free && (
                          <span className="text-[10px] font-mono text-terminal-green bg-terminal-green/10 border border-terminal-green/20 px-1.5 py-0.5 rounded">
                            Ücretsiz
                          </span>
                        )}
                        <ExternalLink className="w-3.5 h-3.5 text-terminal-comment group-hover:text-terminal-white transition-colors" />
                      </div>
                    </div>
                    <p className="text-xs text-terminal-comment leading-relaxed flex-1">{tool.desc}</p>
                    {tool.tags && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {tool.tags.map((tag) => (
                          <span key={tag} className={cn("text-[10px] font-mono px-1.5 py-0.5 rounded border", c.badge)}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 rounded-xl border border-surface-3 bg-surface-1/50 p-4">
        <p className="text-xs text-terminal-comment leading-relaxed">
          <span className="text-terminal-white font-semibold">Etik Hatırlatma:</span>{" "}
          Bu araçlar pasif keşif ve savunma amaçlıdır. İzin almadan başkalarının sistemlerini veya kişisel verilerini araştırmak
          <span className="text-red-400"> yasadışıdır</span>. Bug bounty, CTF veya yetkili pentest kapsamı dışında kullanmayın.
        </p>
      </div>
    </div>
  );
}
