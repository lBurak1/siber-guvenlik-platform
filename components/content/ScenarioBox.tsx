"use client";
import { useState } from "react";
import { Flag, Target, ChevronDown, ChevronUp, Eye, EyeOff, Shield, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { LabScenario } from "@/lib/types";
import { difficultyConfig } from "@/lib/utils";

interface ScenarioBoxProps {
  scenario: LabScenario;
  teamColor?: string;
}

export default function ScenarioBox({ scenario, teamColor = "red" }: ScenarioBoxProps) {
  const [hintsOpen, setHintsOpen] = useState(false);
  const [flagVisible, setFlagVisible] = useState(false);

  const diffCfg = difficultyConfig[scenario.difficulty];
  const colorMap: Record<string, string> = {
    red: "border-red-500/40 bg-red-500/5",
    blue: "border-blue-500/40 bg-blue-500/5",
    purple: "border-purple-500/40 bg-purple-500/5",
  };

  return (
    <div className={cn("rounded-xl border-l-4 border border-surface-3 overflow-hidden my-6", colorMap[teamColor])}>
      {/* Header */}
      <div className="px-5 py-4 border-b border-surface-3 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-surface-2 shrink-0 mt-0.5">
            <Target className="w-5 h-5 text-terminal-green" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-mono text-terminal-comment uppercase tracking-wider">
                CTF Laboratuvar Senaryosu
              </span>
              <span className={cn("text-xs px-2 py-0.5 rounded-full border font-mono", diffCfg.class)}>
                {diffCfg.label}
              </span>
            </div>
            <h3 className="font-semibold text-terminal-white text-lg">{scenario.title}</h3>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Objective */}
        <div>
          <div className="text-xs font-mono text-terminal-comment uppercase tracking-wider mb-2 flex items-center gap-2">
            <Flag className="w-3.5 h-3.5" /> Hedef
          </div>
          <p className="text-terminal-white text-sm leading-relaxed">{scenario.objective}</p>
        </div>

        {/* Environment */}
        <div className="bg-surface-2 rounded-lg p-3 font-mono text-xs">
          <span className="text-terminal-comment">$ env: </span>
          <span className="text-terminal-cyan">{scenario.environment}</span>
        </div>

        {/* Steps */}
        {scenario.steps.length > 0 && (
          <div>
            <div className="text-xs font-mono text-terminal-comment uppercase tracking-wider mb-3">
              Adımlar
            </div>
            <ol className="space-y-2">
              {scenario.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-terminal-white">
                  <span className="w-6 h-6 rounded-full bg-surface-2 border border-surface-3 flex items-center justify-center text-xs font-mono text-terminal-comment shrink-0">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Hints (collapsible) */}
        {scenario.hints.length > 0 && (
          <div>
            <button
              onClick={() => setHintsOpen(!hintsOpen)}
              className="w-full flex items-center justify-between text-xs font-mono text-yellow-400 hover:text-yellow-300 transition-colors py-2 border-t border-surface-3"
            >
              <span className="flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5" />
                İpuçları ({scenario.hints.length})
              </span>
              {hintsOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {hintsOpen && (
              <ul className="mt-2 space-y-1.5">
                {scenario.hints.map((hint, i) => (
                  <li key={i} className="text-xs text-yellow-300/80 bg-yellow-500/5 border border-yellow-500/20 rounded-md px-3 py-2 font-mono">
                    💡 {hint}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Expected output */}
        {scenario.expectedOutput && (
          <div className="font-mono text-xs bg-terminal-bg border border-terminal-border rounded-lg p-3">
            <div className="text-terminal-comment mb-2">Beklenen Çıktı:</div>
            <pre className="text-terminal-green whitespace-pre-wrap">{scenario.expectedOutput}</pre>
          </div>
        )}

        {/* Flag */}
        {scenario.flag && (
          <div className="border-t border-surface-3 pt-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-terminal-comment">Flag:</span>
              <button
                onClick={() => setFlagVisible(!flagVisible)}
                className="flex items-center gap-2 text-xs text-terminal-comment hover:text-terminal-white transition-colors"
              >
                {flagVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {flagVisible ? "Gizle" : "Göster"}
              </button>
            </div>
            {flagVisible && (
              <div className="mt-2 flag-box">
                {scenario.flag}
              </div>
            )}
          </div>
        )}

        {/* Defense note */}
        {scenario.defenseNote && (
          <div className="border-t border-surface-3 pt-4 flex items-start gap-3">
            <Shield className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-1">Savunma Notu</div>
              <p className="text-xs text-terminal-comment leading-relaxed">{scenario.defenseNote}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
