"use client";
import { useState } from "react";
import { arsenal } from "@/lib/arsenal";
import { Crosshair, Copy, Check, ChevronDown, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const colorText: Record<string, string> = {
  emerald: "text-emerald-400", red: "text-red-400", amber: "text-amber-400",
  purple: "text-purple-400", sky: "text-sky-400",
};
const colorBar: Record<string, string> = {
  emerald: "from-emerald-500/0 via-emerald-400 to-emerald-500/0", red: "from-red-500/0 via-red-400 to-red-500/0",
  amber: "from-amber-500/0 via-amber-400 to-amber-500/0", purple: "from-purple-500/0 via-purple-400 to-purple-500/0",
  sky: "from-sky-500/0 via-sky-400 to-sky-500/0",
};
const colorHover: Record<string, string> = {
  emerald: "hover:border-emerald-500/40", red: "hover:border-red-500/40", amber: "hover:border-amber-500/40",
  purple: "hover:border-purple-500/40", sky: "hover:border-sky-500/40",
};

function CommandBlock({ cmd }: { cmd: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="mt-3 rounded-lg border border-surface-3 bg-terminal-bg overflow-hidden">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-surface-3 bg-surface-2/50">
        <span className="text-[10px] font-mono text-terminal-comment uppercase tracking-wider">pratik komut</span>
        <button onClick={copy} className={cn("flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded transition-all",
          copied ? "text-terminal-green bg-green-500/10" : "text-terminal-comment hover:text-terminal-white")}>
          {copied ? <><Check className="w-3 h-3" /> Kopyalandı</> : <><Copy className="w-3 h-3" /> Kopyala</>}
        </button>
      </div>
      <pre className="px-3 py-2.5 text-xs font-mono text-terminal-green whitespace-pre-wrap break-all leading-relaxed">
        <span className="text-terminal-comment select-none">$ </span>{cmd}
      </pre>
    </div>
  );
}

function Questions({ items, color }: { items: { q: string; a: string }[]; color: string }) {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  return (
    <div className="mt-6">
      <h3 className="text-xs font-mono text-terminal-comment uppercase tracking-widest mb-3">📝 Bölüm Soruları</h3>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="rounded-lg border border-surface-3 bg-surface-1 overflow-hidden">
            <button onClick={() => setOpen((s) => ({ ...s, [i]: !s[i] }))}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-surface-2/40 transition-colors">
              <span className="flex items-start gap-2.5">
                <span className={cn("font-mono text-xs mt-0.5 shrink-0", colorText[color])}>S{i + 1}</span>
                <span className="text-sm font-medium text-terminal-white">{it.q}</span>
              </span>
              <ChevronDown className={cn("w-4 h-4 text-terminal-comment shrink-0 transition-transform", open[i] && "rotate-180")} />
            </button>
            {open[i] && (
              <div className="px-4 pb-3.5 pl-11">
                <p className="text-sm text-terminal-white/75 leading-relaxed border-l-2 border-surface-3 pl-3">{it.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ArsenalPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Crosshair className="w-7 h-7 text-red-400" />
        <h1 className="text-2xl font-bold text-terminal-white">Araç Cephaneliği</h1>
      </div>
      <p className="text-terminal-comment mb-4 ml-10">
        Sızma testi ve CTF'lerde en sık kullanılan araçlar — kategori kategori, pratik komutlarıyla ve bölüm sorularıyla.
      </p>

      {/* Etik uyarı */}
      <div className="ml-10 mb-10 flex items-start gap-2 text-xs bg-red-500/5 border border-red-500/20 rounded-lg px-3 py-2 text-red-300/90 max-w-2xl">
        <Lock className="w-4 h-4 shrink-0 mt-0.5" />
        <span>Bu araçlar yalnızca <strong>yazılı izinli sızma testleri</strong> ve <strong>izole lab ortamları</strong> (CTF, HackTheBox, kişisel lab) içindir. Yetkisiz kullanım yasadışıdır.</span>
      </div>

      <div className="space-y-14">
        {arsenal.map((cat) => (
          <section key={cat.slug}>
            {/* Kategori başlığı */}
            <div className="flex items-center gap-3 mb-5">
              <div className={cn("h-9 w-1.5 rounded-full bg-gradient-to-b", colorBar[cat.color])} />
              <div className="flex items-center gap-2">
                <span className="text-2xl">{cat.icon}</span>
                <h2 className="text-xl font-bold text-terminal-white">{cat.title}</h2>
              </div>
            </div>

            {/* Araç kartları */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.tools.map((tool) => (
                <div key={tool.name}
                  className={cn("rounded-2xl border border-surface-3 bg-surface-1 p-5 flex flex-col transition-all", colorHover[cat.color])}>
                  <h3 className={cn("text-base font-bold mb-1", colorText[cat.color])}>{tool.name}</h3>
                  <p className="text-xs text-terminal-comment leading-relaxed">{tool.desc}</p>
                  <CommandBlock cmd={tool.cmd} />
                  {tool.tip && (
                    <p className="mt-2 text-[11px] text-terminal-comment/80 leading-relaxed">💡 {tool.tip}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Bölüm soruları */}
            <Questions items={cat.questions} color={cat.color} />
          </section>
        ))}
      </div>
    </div>
  );
}
