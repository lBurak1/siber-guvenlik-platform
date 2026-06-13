import Link from "next/link";
import { GitBranch, ArrowRight, Crosshair } from "lucide-react";

export const metadata = { title: "Metodoloji" };

const topics = [
  { slug: "saldiri-zinciri",    icon: "🧠", title: "Pentest Metodolojisi & Saldırı Zinciri", desc: "Bir testin baştan sona akışı, PTES/Kill Chain/MITRE ATT&CK, 7 fazın karar haritası ve 'foothold aldım, şimdi ne?' triyajı + raporlama.", level: "Temel → İleri" },
  { slug: "kapsam-yetki",       icon: "📜", title: "Kapsam, Yetki & Yasal Çerçeve",          desc: "Pre-engagement: yetkilendirme, Rules of Engagement, scope belirleme ve etik sınırlar. İşe alımda en çok sorulan, junior'ın en çok atladığı konu.", level: "Temel → Orta" },
  { slug: "ad-saldiri-zinciri", icon: "🏰", title: "AD Saldırı Zinciri — SMB'den Domain Admin'e", desc: "LLMNR zehirleme → NetNTLMv2 hash yakalama → Kerberoasting → BloodHound yol analizi → DCSync → Pass-the-Hash → Golden Ticket. Gerçek komutlar + 'neden çalışır' açıklaması.", level: "Orta → İleri" },
];

// Saldırı zincirinin fazları — omurgayı görselleştir
const killChain = [
  { n: "01", label: "Keşif", sub: "Recon / OSINT", href: "/red-team/osint-basics" },
  { n: "02", label: "Enumerasyon", sub: "Nmap / Servis", href: "/red-team/nmap" },
  { n: "03", label: "Sömürü", sub: "Initial Access", href: "/red-team/metasploit" },
  { n: "04", label: "Yetki Yükseltme", sub: "PrivEsc", href: "/red-team/linux-privesc" },
  { n: "05", label: "Yanal Hareket", sub: "Lateral / Pivot", href: "/red-team/pivoting" },
  { n: "06", label: "Kalıcılık", sub: "Persistence / C2", href: "/red-team/impacket" },
  { n: "07", label: "Raporlama", sub: "Report + Temizlik", href: "/metodoloji/saldiri-zinciri/bulgu-cvss-rapor" },
];

export default function MetodolojiPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <GitBranch className="w-7 h-7 text-fuchsia-400" />
        <h1 className="text-2xl font-bold text-terminal-white">Metodoloji</h1>
      </div>
      <p className="text-terminal-comment mb-6 ml-10">
        Araçları biliyorsun — peki onları <span className="text-fuchsia-300">ne zaman, hangi sırayla, neden</span> kullanacaksın? Bu bölüm tek tek araçları birbirine bağlayan omurgadır: bir junior'ı senior'dan ayıran <span className="text-fuchsia-300">düşünme biçimi</span>. Tümü yetkili test ve izole lab içindir.
      </p>

      <div className="ml-10 mb-8">
        <div className="text-xs font-mono text-terminal-comment mb-2 flex items-center gap-2">
          <Crosshair className="w-3.5 h-3.5 text-fuchsia-400" /> SALDIRI ZİNCİRİ — her faz ilgili araca bağlı
        </div>
        <div className="flex flex-wrap items-stretch gap-1.5">
          {killChain.map((p, i) => (
            <div key={p.n} className="flex items-center gap-1.5">
              <Link href={p.href} className="group block rounded-lg border border-fuchsia-500/15 bg-fuchsia-500/[0.03] px-2.5 py-2 hover:border-fuchsia-500/40 hover:bg-fuchsia-500/10 transition-all min-w-[92px]">
                <div className="text-[10px] font-mono text-fuchsia-400/60">{p.n}</div>
                <div className="text-xs font-semibold text-terminal-white group-hover:text-fuchsia-300 transition-colors">{p.label}</div>
                <div className="text-[10px] text-terminal-comment">{p.sub}</div>
              </Link>
              {i < killChain.length - 1 && <ArrowRight className="w-3 h-3 text-fuchsia-500/30 shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {topics.map((t, i) => (
          <Link key={t.slug} href={`/metodoloji/${t.slug}`} className="group">
            <div className="module-card border border-surface-3 hover:border-fuchsia-500/40 hover:shadow-[0_0_20px_rgba(217,70,239,0.08)] transition-all h-full">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.icon}</span>
                  <div>
                    <div className="text-xs font-mono text-terminal-comment mb-0.5"><span className="text-fuchsia-400/60">#{String(i + 1).padStart(2, "0")}</span></div>
                    <h3 className="font-semibold text-terminal-white group-hover:text-fuchsia-300 transition-colors text-sm">{t.title}</h3>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-terminal-comment group-hover:text-fuchsia-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </div>
              <p className="text-xs text-terminal-comment leading-relaxed">{t.desc}</p>
              <span className="mt-3 inline-block text-xs font-mono text-fuchsia-400/70 bg-fuchsia-500/5 border border-fuchsia-500/15 px-2 py-0.5 rounded">{t.level}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
