"use client";
import { useState } from "react";
import { interview } from "@/lib/interview";
import { MessageCircleQuestion, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const colorText: Record<string, string> = {
  indigo: "text-indigo-400", emerald: "text-emerald-400", orange: "text-orange-400",
  amber: "text-amber-400", blue: "text-blue-400", red: "text-red-400",
};
const colorActive: Record<string, string> = {
  indigo: "bg-indigo-500/15 text-indigo-300 border-indigo-500/40", emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
  orange: "bg-orange-500/15 text-orange-300 border-orange-500/40", amber: "bg-amber-500/15 text-amber-300 border-amber-500/40",
  blue: "bg-blue-500/15 text-blue-300 border-blue-500/40", red: "bg-red-500/15 text-red-300 border-red-500/40",
};

export default function MulakatPage() {
  const [activeCat, setActiveCat] = useState(interview[0].slug);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const cat = interview.find((c) => c.slug === activeCat) ?? interview[0];

  const toggle = (i: number) => setOpen((s) => ({ ...s, [`${activeCat}-${i}`]: !s[`${activeCat}-${i}`] }));

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <MessageCircleQuestion className="w-7 h-7 text-indigo-400" />
        <h1 className="text-2xl font-bold text-terminal-white">Mülakat Soruları</h1>
      </div>
      <p className="text-terminal-comment mb-6 ml-10">
        Siber güvenlik mülakatlarında sık sorulan sorular ve net cevapları. Soruya tıkla, cevabı aç.
      </p>

      {/* Kategori sekmeleri */}
      <div className="flex flex-wrap gap-2 mb-6">
        {interview.map((c) => {
          const isActive = c.slug === activeCat;
          return (
            <button key={c.slug} onClick={() => setActiveCat(c.slug)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-lg border text-sm font-medium transition-all",
                isActive ? colorActive[c.color] : "bg-surface-1 text-terminal-comment border-surface-3 hover:text-terminal-white"
              )}>
              <span>{c.icon}</span> {c.title}
              <span className="text-[10px] font-mono opacity-60">{c.items.length}</span>
            </button>
          );
        })}
      </div>

      {/* Sorular (accordion) */}
      <div className="space-y-2.5">
        {cat.items.map((item, i) => {
          const isOpen = open[`${activeCat}-${i}`];
          return (
            <div key={i} className="rounded-xl border border-surface-3 bg-surface-1 overflow-hidden">
              <button onClick={() => toggle(i)} className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-surface-2/50 transition-colors">
                <span className="flex items-start gap-3">
                  <span className={cn("font-mono text-xs mt-0.5 shrink-0", colorText[cat.color])}>S{i + 1}</span>
                  <span className="text-sm font-medium text-terminal-white">{item.q}</span>
                </span>
                <ChevronDown className={cn("w-4 h-4 text-terminal-comment shrink-0 transition-transform", isOpen && "rotate-180")} />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pl-11">
                  <p className="text-sm text-terminal-white/75 leading-relaxed border-l-2 border-surface-3 pl-3">{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
