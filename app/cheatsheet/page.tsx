import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { cheatsheetPorts } from "@/lib/navigation";
import { cn, riskConfig } from "@/lib/utils";

export default function CheatsheetIndexPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Zap className="w-7 h-7 text-yellow-400" />
        <h1 className="text-2xl font-bold text-terminal-white">Port Cheat Sheet</h1>
      </div>
      <p className="text-terminal-comment mb-8 ml-10">
        Port bazlı kopyalanabilir komut kütüphanesi. Bir porta tıkla, komutları kopyala, lab'de çalıştır.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cheatsheetPorts.map(({ port, service, slug, risk }) => {
          const rc = riskConfig[risk];
          return (
            <Link key={slug} href={`/cheatsheet/${slug}`} className="group">
              <div className="module-card border border-surface-3 hover:border-yellow-500/40 hover:shadow-[0_0_20px_rgba(234,179,8,0.08)] transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-14 h-14 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                    <span className="font-mono font-bold text-yellow-400 text-sm">:{port}</span>
                  </div>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full border font-mono", rc.class)}>
                    {rc.label}
                  </span>
                </div>
                <h3 className="font-bold text-terminal-white group-hover:text-yellow-300 transition-colors text-lg">
                  {service}
                </h3>
                <p className="text-xs text-terminal-comment mt-1">Port {port} / TCP</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-mono text-yellow-400/60 group-hover:text-yellow-400 transition-colors">
                  Komutları gör <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
