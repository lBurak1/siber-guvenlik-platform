import Link from "next/link";
import { GitMerge, ArrowRight } from "lucide-react";

export default function PurpleTeamPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <GitMerge className="w-7 h-7 text-purple-400" />
        <h1 className="text-2xl font-bold text-terminal-white">Purple Team</h1>
      </div>
      <p className="text-terminal-comment mb-8 ml-10">
        Red ve Blue ekiplerini senkronize et. Saldırıyı simüle et, savunmayı ölç.
      </p>

      <div>
        <h2 className="text-xs font-mono font-semibold text-terminal-comment uppercase tracking-widest mb-3 border-b border-surface-3 pb-2">
          Metodoloji
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link href="/purple-team/purple-methodology" className="group">
            <div className="module-card border border-surface-3 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.08)] transition-all">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-terminal-white group-hover:text-purple-300 transition-colors">
                  Purple Team Metodolojisi
                </h3>
                <ArrowRight className="w-4 h-4 text-terminal-comment group-hover:text-purple-400 group-hover:translate-x-1 transition-all shrink-0" />
              </div>
              <p className="text-xs text-terminal-comment mt-1 leading-relaxed">
                MITRE ATT&CK çerçevesiyle saldırı simülasyonu ve tespit mühendisliği
              </p>
              <span className="mt-3 inline-block text-xs font-mono text-purple-400/70 bg-purple-500/5 border border-purple-500/15 px-2 py-0.5 rounded">
                Orta–İleri
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
