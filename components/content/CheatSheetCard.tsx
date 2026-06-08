"use client";
import { useState } from "react";
import { Copy, Check, AlertTriangle, Lightbulb, ChevronDown, ChevronUp, Shield } from "lucide-react";
import { cn, riskConfig } from "@/lib/utils";
import { PortCheatSheet, CheatSection, CheatCommand } from "@/lib/types";

/* ── Single Command Row ─────────────────────────────────────── */
function CommandRow({ cmd }: { cmd: CheatCommand }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cmd.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Token-level coloring
  const colorize = (raw: string) => {
    const tokens = raw.split(/(\s+)/);
    return tokens.map((tok, i) => {
      const trimmed = tok.trim();
      if (i === 0) return <span key={i} className="text-terminal-green font-semibold">{tok}</span>;
      if (trimmed.startsWith("-")) return <span key={i} className="text-terminal-cyan">{tok}</span>;
      if (trimmed.match(/^\d{1,5}$/)) return <span key={i} className="text-purple-400">{tok}</span>;
      if (trimmed.startsWith("http") || trimmed.includes("/")) return <span key={i} className="text-yellow-400">{tok}</span>;
      if (trimmed.includes("=")) {
        const [k, ...rest] = trimmed.split("=");
        return <span key={i}> <span className="text-terminal-cyan">{k}</span>=<span className="text-yellow-300">{rest.join("=")}</span></span>;
      }
      return <span key={i} className="text-terminal-white">{tok}</span>;
    });
  };

  return (
    <div className="group border border-surface-3 rounded-lg overflow-hidden hover:border-surface-2 transition-all">
      {/* Label */}
      <div className="flex items-center justify-between px-3 py-2 bg-surface-2 border-b border-surface-3">
        <span className="text-xs font-semibold text-terminal-white">{cmd.label}</span>
        <button
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-1 text-xs px-2 py-0.5 rounded transition-all font-mono",
            copied
              ? "bg-green-500/10 text-terminal-green"
              : "bg-surface-3 text-terminal-comment hover:text-terminal-white"
          )}
        >
          {copied ? <><Check className="w-3 h-3" /> Kopyalandı</> : <><Copy className="w-3 h-3" /> Kopyala</>}
        </button>
      </div>

      {/* Command */}
      <div className="px-4 py-3 bg-terminal-bg font-mono text-sm">
        <div className="flex items-start gap-2">
          <span className="text-terminal-green select-none shrink-0">$</span>
          <pre className="flex-1 whitespace-pre-wrap break-all leading-relaxed">
            {colorize(cmd.command)}
          </pre>
        </div>
        {cmd.output && (
          <pre className="mt-2 pt-2 border-t border-surface-3 text-xs text-terminal-comment leading-relaxed whitespace-pre-wrap">
            {cmd.output}
          </pre>
        )}
      </div>

      {/* Description + meta */}
      <div className="px-3 py-2 bg-surface-1 space-y-1">
        <p className="text-xs text-terminal-comment leading-relaxed">{cmd.description}</p>
        {cmd.tip && (
          <div className="flex items-start gap-1.5 text-xs text-blue-400">
            <Lightbulb className="w-3 h-3 shrink-0 mt-0.5" />
            {cmd.tip}
          </div>
        )}
        {cmd.warning && (
          <div className="flex items-start gap-1.5 text-xs text-yellow-400">
            <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
            {cmd.warning}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Section Block ──────────────────────────────────────────── */
function SectionBlock({ section }: { section: CheatSection }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between mb-3 group"
      >
        <h3 className="text-sm font-bold text-terminal-white group-hover:text-yellow-400 transition-colors flex items-center gap-2">
          <span className="text-yellow-400 font-mono text-xs">#</span>
          {section.title}
          <span className="text-xs font-normal text-terminal-comment">({section.commands.length} komut)</span>
        </h3>
        {open ? <ChevronUp className="w-4 h-4 text-terminal-comment" /> : <ChevronDown className="w-4 h-4 text-terminal-comment" />}
      </button>
      {open && (
        <div className="grid gap-3">
          {section.commands.map((cmd, i) => (
            <CommandRow key={i} cmd={cmd} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Full CheatSheet Page ───────────────────────────────────── */
export default function CheatSheetCard({ sheet }: { sheet: PortCheatSheet }) {
  const rc = riskConfig[sheet.risk];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-start gap-4 mb-8 bg-surface-1 border border-surface-3 rounded-xl p-5">
        <div className="shrink-0">
          <div className="w-16 h-16 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
            <span className="font-mono font-bold text-yellow-400 text-lg">:{sheet.port}</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className={cn("text-xs px-2 py-0.5 rounded-full border font-mono", rc.class)}>
              {rc.label}
            </span>
            <span className="text-xs font-mono text-terminal-comment bg-surface-2 border border-surface-3 px-2 py-0.5 rounded">
              {sheet.protocol}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-terminal-white">
            Port {sheet.port} — {sheet.service}
          </h1>
          <p className="text-sm text-terminal-comment mt-2 leading-relaxed">{sheet.description}</p>
        </div>
      </div>

      {/* Sections */}
      {sheet.sections.map((sec) => (
        <SectionBlock key={sec.id} section={sec} />
      ))}

      {/* Defense Note */}
      <div className="mt-8 border border-blue-500/20 rounded-xl bg-blue-500/5 p-5">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-semibold text-blue-400">Savunma Notu</span>
        </div>
        <p className="text-sm text-terminal-comment leading-relaxed">{sheet.defenseNote}</p>
      </div>
    </div>
  );
}
