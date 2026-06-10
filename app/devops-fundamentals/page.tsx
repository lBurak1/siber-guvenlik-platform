import Link from "next/link";
import { Boxes, ArrowRight } from "lucide-react";

const topics = [
  { slug: "git",    icon: "🔀", title: "Git & GitHub",        desc: "init, add, commit, branch, merge, rebase, push/pull — versiyon kontrolünü temelden ileriye öğren", level: "Başlangıç–İleri" },
  { slug: "docker", icon: "🐳", title: "Docker & Konteyner",  desc: "image, container, volume, network, Docker Compose ve konteyner güvenliği", level: "Başlangıç–İleri" },
];

export default function DevopsFundamentalsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Boxes className="w-7 h-7 text-teal-400" />
        <h1 className="text-2xl font-bold text-terminal-white">DevOps Temelleri</h1>
      </div>
      <p className="text-terminal-comment mb-2 ml-10">
        Her mühendisin günlük kullandığı araçlar. Git ile kodu versiyonla, Docker ile her yerde aynı çalışan ortamlar kur — komut alışkanlığı kazan.
      </p>
      <div className="ml-10 mb-8 text-xs font-mono text-terminal-comment bg-surface-1 border border-teal-500/20 rounded-lg px-3 py-2 inline-block">
        <span className="text-teal-400">önerilen sıra →</span> Git (versiyon kontrol) → Docker (konteyner)
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {topics.map((t, i) => (
          <Link key={t.slug} href={`/devops-fundamentals/${t.slug}`} className="group">
            <div className="module-card border border-surface-3 hover:border-teal-500/40 hover:shadow-[0_0_20px_rgba(20,184,166,0.08)] transition-all h-full">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.icon}</span>
                  <div>
                    <div className="text-xs font-mono text-terminal-comment mb-0.5">
                      <span className="text-teal-400/60">#{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="font-semibold text-terminal-white group-hover:text-teal-300 transition-colors text-sm">
                      {t.title}
                    </h3>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-terminal-comment group-hover:text-teal-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </div>
              <p className="text-xs text-terminal-comment leading-relaxed">{t.desc}</p>
              <span className="mt-3 inline-block text-xs font-mono text-teal-400/70 bg-teal-500/5 border border-teal-500/15 px-2 py-0.5 rounded">
                {t.level}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
