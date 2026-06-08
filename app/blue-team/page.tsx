import Link from "next/link";
import { Eye, ArrowRight } from "lucide-react";

const tools = [
  {
    category: "Ağ Trafiği Analizi",
    items: [
      { slug: "wireshark", title: "Wireshark", desc: "Paket yakalama, PCAP analizi, anomali tespiti ve zararlı yazılım trafik analizi", level: "Başlangıç–İleri" },
    ],
  },
  {
    category: "Log & SIEM",
    items: [
      { slug: "log-analysis",  title: "Log Analizi",  desc: "Apache/Nginx/System loglarından saldırı izlerini tespit et ve forensic analiz yap", level: "Orta" },
      { slug: "siem",          title: "SIEM",         desc: "Merkezi log toplama, korelasyon kuralları, olay tespiti ve müdahale — Splunk, ELK, Wazuh", level: "Orta–İleri" },
    ],
  },
  {
    category: "Endpoint & Zararlı Yazılım",
    items: [
      { slug: "endpoint-security", title: "Endpoint Güvenliği (EDR/XDR)", desc: "Uç nokta tespiti ve müdahale, davranış analizi, EDR/XDR platformları", level: "Orta" },
      { slug: "sandbox",           title: "Sandbox & Zararlı Analiz",     desc: "Şüpheli dosyaları izole ortamda çalıştır, davranış raporla — Any.run, Cuckoo", level: "Orta" },
    ],
  },
  {
    category: "Tehdit İstihbaratı",
    items: [
      { slug: "cti", title: "CTI — Siber Tehdit İstihbaratı", desc: "Tehdit aktörleri, IOC/IOA, MISP, VirusTotal, OSINT kaynakları ve TTP analizi", level: "Orta–İleri" },
    ],
  },
  {
    category: "Kimlik & Erişim Güvenliği",
    items: [
      { slug: "pam",            title: "PAM — Yetkili Hesap Yönetimi", desc: "Privileged Access Management, en az yetki prensibi, CyberArk, HashiCorp Vault", level: "Orta–İleri" },
      { slug: "email-security", title: "E-posta Güvenliği",            desc: "SPF, DKIM, DMARC yapılandırması, phishing analizi, e-posta başlık inceleme", level: "Başlangıç–Orta" },
    ],
  },
];

export default function BlueTeamPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Eye className="w-7 h-7 text-blue-400" />
        <h1 className="text-2xl font-bold text-terminal-white">Blue Team</h1>
      </div>
      <p className="text-terminal-comment mb-8 ml-10">
        Tehditleri tespit et, analiz et, müdahale et. Ağ trafiğinden endpoint'e, SIEM'den tehdit istihbaratına tam savunma.
      </p>

      <div className="space-y-8">
        {tools.map((cat) => (
          <div key={cat.category}>
            <h2 className="text-xs font-mono font-semibold text-terminal-comment uppercase tracking-widest mb-3 border-b border-surface-3 pb-2">
              {cat.category}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {cat.items.map((tool) => (
                <Link key={tool.slug} href={`/blue-team/${tool.slug}`} className="group">
                  <div className="module-card border border-surface-3 hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.08)] transition-all">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-terminal-white group-hover:text-blue-300 transition-colors">
                        {tool.title}
                      </h3>
                      <ArrowRight className="w-4 h-4 text-terminal-comment group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0" />
                    </div>
                    <p className="text-xs text-terminal-comment mt-1 leading-relaxed">{tool.desc}</p>
                    <span className="mt-3 inline-block text-xs font-mono text-blue-400/70 bg-blue-500/5 border border-blue-500/15 px-2 py-0.5 rounded">
                      {tool.level}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
