import Link from "next/link";
import { Network, ArrowRight } from "lucide-react";

const topics = [
  { slug: "products",           icon: "🧰", title: "Güvenlik Ürünleri & Kategorileri", desc: "SIEM, EDR/XDR, firewall, IAM/PAM, cloud — kategoriler ve lider ürünler", level: "Ürünler" },
  { slug: "companies-global",   icon: "🌍", title: "Uluslararası Şirketler",            desc: "CrowdStrike, Palo Alto, Microsoft, Fortinet, Mandiant ve daha fazlası", level: "Küresel" },
  { slug: "companies-national", icon: "🇹🇷", title: "Ulusal (Türkiye) Şirketler",        desc: "Picus, SOCRadar, Invicti, STM, USOM/BTK — yerli ekosistem", level: "Türkiye" },
  { slug: "people",             icon: "👤", title: "Önemli Kişiler",                    desc: "Schneier, Mitnick, Kaminsky, kriptografi öncüleri, araştırmacılar", level: "Kişiler" },
  { slug: "concepts",           icon: "💡", title: "Kavramlar & Standartlar",           desc: "Zero Trust, MITRE ATT&CK, NIST, ISO 27001, KVKK, Kill Chain", level: "Kavramlar" },
];

export default function EcosystemPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Network className="w-7 h-7 text-pink-400" />
        <h1 className="text-2xl font-bold text-terminal-white">Sektör & Ekosistem</h1>
      </div>
      <p className="text-terminal-comment mb-2 ml-10">
        Bir siber güvenlikçinin tanıması gereken ürünler, şirketler, kişiler ve kavramlar — ulusal ve uluslararası. Teknik bilginin ötesinde sektör farkındalığı.
      </p>
      <div className="ml-10 mb-8 text-xs font-mono text-terminal-comment bg-surface-1 border border-pink-500/20 rounded-lg px-3 py-2 inline-block">
        <span className="text-pink-400">neden →</span> Mülakatlarda ve sahada bu isimler sürekli geçer; tanımak fark yaratır
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {topics.map((t, i) => (
          <Link key={t.slug} href={`/ecosystem/${t.slug}`} className="group">
            <div className="module-card border border-surface-3 hover:border-pink-500/40 hover:shadow-[0_0_20px_rgba(236,72,153,0.08)] transition-all h-full">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.icon}</span>
                  <div>
                    <div className="text-xs font-mono text-terminal-comment mb-0.5">
                      <span className="text-pink-400/60">#{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="font-semibold text-terminal-white group-hover:text-pink-300 transition-colors text-sm">
                      {t.title}
                    </h3>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-terminal-comment group-hover:text-pink-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </div>
              <p className="text-xs text-terminal-comment leading-relaxed">{t.desc}</p>
              <span className="mt-3 inline-block text-xs font-mono text-pink-400/70 bg-pink-500/5 border border-pink-500/15 px-2 py-0.5 rounded">
                {t.level}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
