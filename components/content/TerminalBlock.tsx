"use client";
import { useState } from "react";
import { Copy, Check, Terminal, AlertTriangle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface TerminalBlockProps {
  command: string;
  description?: string;
  output?: string;
  warning?: string;
  tip?: string;
  language?: string;
  title?: string;
}

export default function TerminalBlock({
  command,
  description,
  output,
  warning,
  tip,
  language = "bash",
  title,
}: TerminalBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax coloring for bash
  const colorizeCommand = (cmd: string) => {
    // Split into parts and apply colors
    const parts = cmd.split(/\s+/);
    return parts.map((part, i) => {
      if (i === 0) return <span key={i} className="text-terminal-green font-semibold">{part} </span>;
      if (part.startsWith("-")) return <span key={i} className="text-terminal-cyan">{part} </span>;
      if (part.startsWith("http")) return <span key={i} className="text-yellow-400">{part} </span>;
      if (part.match(/^\d+(\.\d+)*$/)) return <span key={i} className="text-purple-400">{part} </span>;
      if (part.includes("=")) {
        const [k, v] = part.split("=");
        return <span key={i}><span className="text-terminal-cyan">{k}</span>=<span className="text-yellow-400">{v}</span> </span>;
      }
      return <span key={i} className="text-terminal-white">{part} </span>;
    });
  };

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-terminal-border font-mono text-sm">
      {/* Terminal header */}
      <div className="terminal-header">
        <span className="terminal-dot bg-red-500" />
        <span className="terminal-dot bg-yellow-500" />
        <span className="terminal-dot bg-green-500" />
        <span className="flex-1 text-center text-xs text-terminal-comment">
          {title ?? (language === "bash" ? "terminal" : language)}
        </span>
        <button
          onClick={handleCopy}
          className="text-terminal-comment hover:text-terminal-white transition-colors p-1 rounded"
          title="Komutu kopyala"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-terminal-green" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Command */}
      <div className="terminal-body bg-terminal-bg">
        <div className="flex items-start gap-2">
          <span className="text-terminal-green select-none shrink-0">$</span>
          <pre className="flex-1 flex-wrap whitespace-pre-wrap break-all leading-relaxed">
            {colorizeCommand(command)}
          </pre>
        </div>

        {/* Output */}
        {output && (
          <pre className="mt-3 text-terminal-comment text-xs leading-relaxed whitespace-pre-wrap border-t border-surface-3 pt-3">
            {output}
          </pre>
        )}
      </div>

      {/* Description */}
      {description && (
        <div className="px-4 py-2.5 bg-surface-1 border-t border-surface-3 text-xs text-terminal-comment">
          {description}
        </div>
      )}

      {/* Warning */}
      {warning && (
        <div className="px-4 py-2.5 bg-yellow-500/5 border-t border-yellow-500/20 text-xs text-yellow-400 flex items-start gap-2">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          {warning}
        </div>
      )}

      {/* Tip */}
      {tip && (
        <div className={cn(
          "px-4 py-3 border-t text-xs flex items-start gap-2",
          tip.startsWith("Sonraki adım")
            ? "bg-emerald-500/8 border-emerald-500/25 text-emerald-300"
            : "bg-blue-500/5 border-blue-500/20 text-blue-400"
        )}>
          {tip.startsWith("Sonraki adım")
            ? <span className="shrink-0 mt-0.5">→</span>
            : <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          }
          <span>{tip}</span>
        </div>
      )}
    </div>
  );
}

// Multi-line code block (for configs, scripts)
export function CodeBlock({ code, language = "bash", title }: { code: string; language?: string; title?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-terminal-border">
      <div className="terminal-header justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-terminal-comment" />
          <span className="text-xs text-terminal-comment">{title ?? language}</span>
        </div>
        <button
          onClick={handleCopy}
          className={cn(
            "text-xs flex items-center gap-1.5 px-2 py-1 rounded transition-all",
            copied
              ? "text-terminal-green bg-green-500/10"
              : "text-terminal-comment hover:text-terminal-white hover:bg-surface-3"
          )}
        >
          {copied ? <><Check className="w-3 h-3" /> Kopyalandı</> : <><Copy className="w-3 h-3" /> Kopyala</>}
        </button>
      </div>
      <pre className="terminal-body bg-terminal-bg overflow-x-auto text-terminal-white text-xs leading-relaxed whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}
