import Link from "next/link";
import { Map, ArrowRight, Flag } from "lucide-react";

export const metadata = { title: "Yol Haritası" };

interface Node { label: string; href: string; color: string; }
interface Stage { n: number; title: string; desc: string; accent: string; nodes: Node[]; }

const stages: Stage[] = [
  {
    n: 1, title: "Başlangıç — Temeller", accent: "orange",
    desc: "Sistem ve ağ hakimiyeti olmadan güvenlik olmaz. Buradan başla.",
    nodes: [
      { label: "Ağ Temelleri", href: "/network-fundamentals", color: "emerald" },
      { label: "Linux Eğitimi", href: "/linux-fundamentals", color: "orange" },
      { label: "Windows Eğitimi", href: "/windows-fundamentals", color: "sky" },
    ],
  },
  {
    n: 2, title: "Araç Hakimiyeti", accent: "teal",
    desc: "Her mühendisin günlük araçları ve ileri ağ bilgisi.",
    nodes: [
      { label: "Git & Docker (DevOps)", href: "/devops-fundamentals", color: "teal" },
      { label: "Gelişmiş Ağ", href: "/network-fundamentals/routing-switching", color: "emerald" },
    ],
  },
  {
    n: 3, title: "Uzmanlaşma — Saldırı & Savunma", accent: "red",
    desc: "İlgi alanına göre Red Team (saldırı) veya Blue Team (savunma) — ya da ikisi.",
    nodes: [
      { label: "Red Team", href: "/red-team", color: "red" },
      { label: "Blue Team", href: "/blue-team", color: "blue" },
      { label: "OWASP Top 10", href: "/owasp-top10", color: "amber" },
      { label: "Purple Team", href: "/purple-team", color: "purple" },
    ],
  },
  {
    n: 4, title: "Kariyer & Kanıt", accent: "indigo",
    desc: "Bilgini sertifika ile kanıtla, sektörü tanı, mülakata hazırlan.",
    nodes: [
      { label: "Sertifikalar", href: "/certifications", color: "indigo" },
      { label: "Sektör & Ekosistem", href: "/ecosystem", color: "pink" },
      { label: "Mülakat Soruları", href: "/mulakat", color: "indigo" },
    ],
  },
];

const dot: Record<string, string> = {
  orange: "bg-orange-500", teal: "bg-teal-500", red: "bg-red-500", indigo: "bg-indigo-500",
};
const chip: Record<string, string> = {
  emerald: "border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10",
  orange: "border-orange-500/30 text-orange-300 hover:bg-orange-500/10",
  sky: "border-sky-500/30 text-sky-300 hover:bg-sky-500/10",
  teal: "border-teal-500/30 text-teal-300 hover:bg-teal-500/10",
  red: "border-red-500/30 text-red-300 hover:bg-red-500/10",
  blue: "border-blue-500/30 text-blue-300 hover:bg-blue-500/10",
  amber: "border-amber-500/30 text-amber-300 hover:bg-amber-500/10",
  purple: "border-purple-500/30 text-purple-300 hover:bg-purple-500/10",
  indigo: "border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10",
  pink: "border-pink-500/30 text-pink-300 hover:bg-pink-500/10",
};

export default function RoadmapPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Map className="w-7 h-7 text-terminal-green" />
        <h1 className="text-2xl font-bold text-terminal-white">Öğrenme Yol Haritası</h1>
      </div>
      <p className="text-terminal-comment mb-10 ml-10">
        Sıfırdan uzmanlığa önerilen rota. Her aşamayı tamamladıkça bir sonrakine geç.
      </p>

      <div className="relative">
        {/* Dikey çizgi */}
        <div className="absolute left-[19px] top-2 bottom-10 w-0.5 bg-gradient-to-b from-orange-500/40 via-red-500/40 to-indigo-500/40" />

        <div className="space-y-8">
          {stages.map((stage) => (
            <div key={stage.n} className="relative flex gap-5">
              {/* Numara dairesi */}
              <div className={`relative z-10 w-10 h-10 shrink-0 rounded-full ${dot[stage.accent]} flex items-center justify-center font-bold text-white shadow-lg`}>
                {stage.n}
              </div>
              {/* İçerik */}
              <div className="flex-1 pb-2">
                <h2 className="text-lg font-bold text-terminal-white">{stage.title}</h2>
                <p className="text-sm text-terminal-comment mb-3">{stage.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {stage.nodes.map((node) => (
                    <Link key={node.href} href={node.href}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-surface-1 text-sm font-medium transition-all ${chip[node.color]}`}>
                      {node.label}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Bitiş */}
          <div className="relative flex gap-5 items-center">
            <div className="relative z-10 w-10 h-10 shrink-0 rounded-full bg-terminal-green flex items-center justify-center shadow-lg">
              <Flag className="w-5 h-5 text-black" />
            </div>
            <div className="text-terminal-green font-semibold">İşe hazırsın! 🎯 Pratik yap, CTF çöz, portföy oluştur.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
