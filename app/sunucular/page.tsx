import Link from "next/link";
import { servers } from "@/lib/servers";
import { Server, ArrowRight, Crosshair, Lock } from "lucide-react";

export const metadata = { title: "Sunucular" };

const colorText: Record<string, string> = {
  emerald: "text-emerald-400", amber: "text-amber-400", sky: "text-sky-400", purple: "text-purple-400",
};
const colorBar: Record<string, string> = {
  emerald: "from-emerald-500/0 via-emerald-400 to-emerald-500/0",
  amber: "from-amber-500/0 via-amber-400 to-amber-500/0",
  sky: "from-sky-500/0 via-sky-400 to-sky-500/0",
  purple: "from-purple-500/0 via-purple-400 to-purple-500/0",
};
const colorHover: Record<string, string> = {
  emerald: "hover:border-emerald-500/40", amber: "hover:border-amber-500/40",
  sky: "hover:border-sky-500/40", purple: "hover:border-purple-500/40",
};

export default function ServersPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Server className="w-7 h-7 text-emerald-400" />
        <h1 className="text-2xl font-bold text-terminal-white">Sunucular</h1>
      </div>
      <p className="text-terminal-comment mb-4 ml-10">
        Bir siber güvenlikçinin tanıması gereken sunucu türleri — ne işe yararlar, saldırı yüzeyleri nelerdir ve nasıl test edilir.
        Her kartın <span className="text-red-300 font-semibold">Saldırı / Detaylı Eğitim</span> linki Red Team modülüne götürür.
      </p>

      <div className="ml-10 mb-10 flex items-start gap-2 text-xs bg-red-500/5 border border-red-500/20 rounded-lg px-3 py-2 text-red-300/90 max-w-2xl">
        <Lock className="w-4 h-4 shrink-0 mt-0.5" />
        <span>Saldırı teknikleri yalnızca <strong>yetkili sızma testleri</strong> ve <strong>izole lab ortamları</strong> içindir.</span>
      </div>

      <div className="space-y-12">
        {servers.map((cat) => (
          <section key={cat.slug}>
            <div className="flex items-center gap-3 mb-5">
              <div className={`h-9 w-1.5 rounded-full bg-gradient-to-b ${colorBar[cat.color]}`} />
              <div className="flex items-center gap-2">
                <span className="text-2xl">{cat.icon}</span>
                <h2 className="text-xl font-bold text-terminal-white">{cat.title}</h2>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {cat.items.map((srv) => (
                <div key={srv.name}
                  className={`rounded-2xl border border-surface-3 bg-surface-1 p-5 flex flex-col transition-all ${colorHover[cat.color]}`}>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className={`text-base font-bold ${colorText[cat.color]}`}>{srv.name}</h3>
                    <span className="text-[10px] font-mono text-terminal-comment bg-surface-2 border border-surface-3 px-2 py-0.5 rounded shrink-0">:{srv.port}</span>
                  </div>
                  <p className="text-xs text-terminal-comment leading-relaxed mb-3">{srv.desc}</p>

                  <div className="rounded-lg border border-red-500/20 bg-red-500/[0.04] p-3 mb-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-red-400 mb-1">
                      <Crosshair className="w-3.5 h-3.5" /> SALDIRI YÜZEYİ
                    </div>
                    <p className="text-xs text-terminal-white/75 leading-relaxed">{srv.attack}</p>
                  </div>

                  <Link href={srv.href}
                    className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-red-300 hover:text-red-200 transition-all group">
                    Saldırı / Detaylı Eğitim
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
