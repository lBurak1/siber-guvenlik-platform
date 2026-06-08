"use client";
import Link from "next/link";
import { CheckCircle2, Clock, ChevronRight, BookOpen } from "lucide-react";
import { cn, difficultyConfig } from "@/lib/utils";
import { Module } from "@/lib/types";
import { useProgressStore } from "@/lib/progress-store";

interface ModuleCardProps {
  module: Module;
  href: string;
  progressKey: string;
  teamColor: string;
  index: number;
}

export default function ModuleCard({ module, href, progressKey, teamColor, index }: ModuleCardProps) {
  const { isComplete } = useProgressStore();
  const completed = isComplete(progressKey);
  const diffCfg = difficultyConfig[module.difficulty];

  const colorMap: Record<string, { border: string; bg: string; text: string; hover: string }> = {
    red: { border: "border-red-500/40", bg: "bg-red-500/10", text: "text-red-400", hover: "hover:border-red-500/60 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)]" },
    blue: { border: "border-blue-500/40", bg: "bg-blue-500/10", text: "text-blue-400", hover: "hover:border-blue-500/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]" },
    purple: { border: "border-purple-500/40", bg: "bg-purple-500/10", text: "text-purple-400", hover: "hover:border-purple-500/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]" },
  };
  const c = colorMap[teamColor] ?? colorMap.red;

  return (
    <Link href={href} className="block">
      <div className={cn(
        "module-card group relative overflow-hidden transition-all duration-300",
        completed ? "border-green-500/30 bg-green-500/5" : `border-surface-3 ${c.hover}`
      )}>
        {/* Index number */}
        <div className={cn(
          "absolute top-4 right-4 text-4xl font-bold font-mono select-none opacity-10",
          completed ? "text-green-500" : c.text
        )}>
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="flex items-start gap-4">
          {/* Status icon */}
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border",
            completed ? "bg-green-500/10 border-green-500/30" : `${c.bg} ${c.border}`
          )}>
            {completed
              ? <CheckCircle2 className="w-5 h-5 text-green-400" />
              : <BookOpen className={cn("w-5 h-5", c.text)} />
            }
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={cn("text-xs px-2 py-0.5 rounded-full border font-mono", diffCfg.class)}>
                {diffCfg.label}
              </span>
              <div className="flex items-center gap-1 text-xs text-terminal-comment">
                <Clock className="w-3 h-3" />
                {module.duration}
              </div>
              {completed && (
                <span className="text-xs text-green-400 font-mono">✓ Tamamlandı</span>
              )}
            </div>

            <h3 className="font-semibold text-terminal-white group-hover:text-white transition-colors text-base">
              {module.title}
            </h3>
            <p className="text-sm text-terminal-comment mt-1 leading-relaxed line-clamp-2">
              {module.description}
            </p>

            <div className="mt-3 flex items-center gap-2 text-xs font-mono text-terminal-comment">
              <span>{module.sections.length} bölüm</span>
              <ChevronRight className={cn("w-3.5 h-3.5 group-hover:translate-x-1 transition-transform", c.text)} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
