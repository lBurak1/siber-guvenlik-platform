"use client";
import { useState } from "react";
import { Terminal, Target, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";
import FreeTerminal from "@/components/terminal/FreeTerminal";
import ChallengeMode from "@/components/terminal/ChallengeMode";

type Tab = "terminal" | "gorevler";

export default function LabPage() {
  const [tab, setTab] = useState<Tab>("terminal");

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <FlaskConical className="w-7 h-7 text-terminal-green" />
        <h1 className="text-2xl font-bold text-terminal-white">Komut Lab</h1>
        <span className="text-xs font-mono px-2 py-0.5 rounded border border-terminal-green/30 bg-terminal-green/5 text-terminal-green">
          Beta
        </span>
      </div>
      <p className="text-terminal-comment mb-6 ml-10">
        Gerçek terminal deneyimi — komut pratiği yap, görevleri tamamla, senaryo bazlı nmap simülasyonunu test et.
      </p>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl bg-surface-1 border border-surface-3 w-fit">
        <button
          onClick={() => setTab("terminal")}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all",
            tab === "terminal"
              ? "bg-terminal-green/10 text-terminal-green border border-terminal-green/30"
              : "text-terminal-comment hover:text-terminal-white"
          )}
        >
          <Terminal className="w-4 h-4" />
          Serbest Terminal
        </button>
        <button
          onClick={() => setTab("gorevler")}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all",
            tab === "gorevler"
              ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
              : "text-terminal-comment hover:text-terminal-white"
          )}
        >
          <Target className="w-4 h-4" />
          Görevler
        </button>
      </div>

      {/* Content */}
      {tab === "terminal" && <FreeTerminal />}
      {tab === "gorevler" && <ChallengeMode />}
    </div>
  );
}
