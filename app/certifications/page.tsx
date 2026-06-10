import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";

const topics = [
  { slug: "roadmap",          icon: "🗺️", title: "Yol Haritası & Seçim Rehberi", desc: "Sertifikalar neden önemli, kariyer yollarına göre hangisini seç, nasıl hazırlan", level: "Başlangıç", count: "3 modül" },
  { slug: "entry-level",      icon: "🎓", title: "Başlangıç Seviyesi",           desc: "Security+, Network+, eJPT, CEH — siber güvenliğe giriş sertifikaları", level: "Başlangıç", count: "3 sertifika" },
  { slug: "offensive",        icon: "🔴", title: "Ofansif (Red Team)",           desc: "OSCP, CRTP, OSEP, OSWE, eCPPT — sızma testi ve saldırı uzmanlığı", level: "Orta–İleri", count: "5+ sertifika" },
  { slug: "defensive",        icon: "🔵", title: "Defansif (Blue Team)",         desc: "CySA+, BTL1, GCIH, GSEC — savunma, SOC ve olay müdahale", level: "Orta–İleri", count: "5+ sertifika" },
  { slug: "management-cloud", icon: "🏛️", title: "Yönetim & Cloud",              desc: "CISSP, CISM, CISA, AZ-500, AWS Security, CCSP — liderlik ve bulut", level: "İleri", count: "7+ sertifika" },
];

export default function CertificationsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <GraduationCap className="w-7 h-7 text-indigo-400" />
        <h1 className="text-2xl font-bold text-terminal-white">Sertifikalar</h1>
      </div>
      <p className="text-terminal-comment mb-2 ml-10">
        Siber güvenlik sertifika rehberi. Her sertifika için: kime uygun, sınav formatı, maliyet, neler bilinmeli ve kariyer değeri.
      </p>
      <div className="ml-10 mb-8 text-xs font-mono text-terminal-comment bg-surface-1 border border-indigo-500/20 rounded-lg px-3 py-2 inline-block">
        <span className="text-indigo-400">öneri →</span> Önce Yol Haritası'nı oku, sonra hedef kariyerine göre seviyeyi seç
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {topics.map((t, i) => (
          <Link key={t.slug} href={`/certifications/${t.slug}`} className="group">
            <div className="module-card border border-surface-3 hover:border-indigo-500/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.08)] transition-all h-full">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.icon}</span>
                  <div>
                    <div className="text-xs font-mono text-terminal-comment mb-0.5">
                      <span className="text-indigo-400/60">#{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="font-semibold text-terminal-white group-hover:text-indigo-300 transition-colors text-sm">
                      {t.title}
                    </h3>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-terminal-comment group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </div>
              <p className="text-xs text-terminal-comment leading-relaxed">{t.desc}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="inline-block text-xs font-mono text-indigo-400/70 bg-indigo-500/5 border border-indigo-500/15 px-2 py-0.5 rounded">
                  {t.level}
                </span>
                <span className="inline-block text-xs font-mono text-terminal-comment bg-surface-2 border border-surface-3 px-2 py-0.5 rounded">
                  {t.count}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
