"use client";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, CornerDownLeft, ArrowUp, ArrowDown, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchEntry {
  cmd: string;
  desc: string;
  tool: string;
  mod: string;
  cat: string;
  color: string;
  url: string;
  q: string;
}

const badgeColor: Record<string, string> = {
  red:     "bg-red-500/10 text-red-400 border-red-500/20",
  blue:    "bg-blue-500/10 text-blue-400 border-blue-500/20",
  purple:  "bg-purple-500/10 text-purple-400 border-purple-500/20",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  orange:  "bg-orange-500/10 text-orange-400 border-orange-500/20",
  sky:     "bg-sky-500/10 text-sky-400 border-sky-500/20",
  amber:   "bg-amber-500/10 text-amber-400 border-amber-500/20",
  yellow:  "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

const MAX_RESULTS = 50;

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

export default function CommandPalette({ open, setOpen }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchEntry[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Global Ctrl/Cmd+K kısayolu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  // Açılınca indeksi yükle ve inputa odaklan
  useEffect(() => {
    if (!open) return;
    setActive(0);
    setTimeout(() => inputRef.current?.focus(), 30);
    if (index || loading) return;
    setLoading(true);
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((data: SearchEntry[]) => setIndex(data))
      .catch(() => setIndex([]))
      .finally(() => setLoading(false));
  }, [open, index, loading]);

  // Body scroll kilidi
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const results = useMemo(() => {
    if (!index) return [];
    const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return [];
    const scored: { e: SearchEntry; score: number }[] = [];
    for (const e of index) {
      if (!tokens.every((t) => e.q.includes(t))) continue;
      // Basit skorlama: komutta tam eşleşme > açıklamada eşleşme
      let score = 0;
      const cmdLower = e.cmd.toLowerCase();
      for (const t of tokens) {
        if (cmdLower.startsWith(t)) score += 10;
        else if (cmdLower.includes(t)) score += 5;
        if (e.tool.toLowerCase().includes(t)) score += 2;
      }
      scored.push({ e, score });
    }
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, MAX_RESULTS).map((s) => s.e);
  }, [index, query]);

  // Aktif satırı görünür tut
  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = useCallback((url: string) => {
    setOpen(false);
    setQuery("");
    router.push(url);
  }, [router, setOpen]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = results[active];
      if (r) go(r.url);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4"
      onClick={() => setOpen(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-2xl bg-surface-1 border border-surface-3 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 border-b border-surface-3">
          {loading
            ? <Loader2 className="w-4 h-4 text-terminal-comment animate-spin shrink-0" />
            : <Search className="w-4 h-4 text-terminal-comment shrink-0" />}
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Komut veya konu ara… (örn: echo, nmap -sV, chmod)"
            className="flex-1 bg-transparent py-4 text-sm text-terminal-white placeholder:text-terminal-comment outline-none"
          />
          <button
            onClick={() => setOpen(false)}
            className="text-terminal-comment hover:text-terminal-white p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[55vh] overflow-y-auto">
          {query.trim() === "" && (
            <div className="px-4 py-10 text-center text-sm text-terminal-comment">
              Tüm modüllerdeki komutlarda ara.<br />
              <span className="text-xs">İpucu: <kbd className="font-mono text-terminal-cyan">echo</kbd>, <kbd className="font-mono text-terminal-cyan">grep -r</kbd>, <kbd className="font-mono text-terminal-cyan">sqlmap --dbs</kbd></span>
            </div>
          )}

          {query.trim() !== "" && results.length === 0 && !loading && (
            <div className="px-4 py-10 text-center text-sm text-terminal-comment">
              <span className="text-terminal-white">"{query}"</span> için sonuç bulunamadı.
            </div>
          )}

          {results.map((r, i) => (
            <button
              key={i}
              data-idx={i}
              onClick={() => go(r.url)}
              onMouseEnter={() => setActive(i)}
              className={cn(
                "w-full text-left px-4 py-3 border-b border-surface-3/50 last:border-0 transition-colors block",
                active === i ? "bg-surface-2" : "hover:bg-surface-2/50"
              )}
            >
              <div className="flex items-start gap-3">
                <span className={cn(
                  "text-[10px] font-mono px-1.5 py-0.5 rounded border shrink-0 mt-0.5",
                  badgeColor[r.color] ?? "bg-surface-2 text-terminal-comment border-surface-3"
                )}>
                  {r.cat}
                </span>
                <div className="flex-1 min-w-0">
                  {r.cmd ? (
                    <code className="block font-mono text-sm text-terminal-green truncate">
                      {highlight(r.cmd.split("\n")[0], query)}
                    </code>
                  ) : (
                    <div className="text-sm text-terminal-white font-medium truncate">
                      {highlight(r.mod, query)}
                    </div>
                  )}
                  {r.desc && (
                    <div className="text-xs text-terminal-comment mt-0.5 line-clamp-1">
                      {r.desc}
                    </div>
                  )}
                  <div className="text-[11px] text-terminal-comment/70 mt-1 font-mono truncate">
                    {r.tool}{r.mod && r.cmd ? ` › ${r.mod}` : ""}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-surface-3 bg-surface text-[11px] text-terminal-comment font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><ArrowUp className="w-3 h-3" /><ArrowDown className="w-3 h-3" /> gezin</span>
            <span className="flex items-center gap-1"><CornerDownLeft className="w-3 h-3" /> aç</span>
            <span><kbd>esc</kbd> kapat</span>
          </div>
          {index && <span>{results.length > 0 ? `${results.length} sonuç` : `${index.length} komut`}</span>}
        </div>
      </div>
    </div>
  );
}

// Eşleşen kelimeleri vurgula
function highlight(text: string, query: string) {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return text;
  const tokenSet = new Set(tokens);
  const pattern = new RegExp(`(${tokens.map(escapeRegex).join("|")})`, "gi");
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    part && tokenSet.has(part.toLowerCase())
      ? <mark key={i} className="bg-terminal-green/25 text-terminal-green rounded px-0.5">{part}</mark>
      : <span key={i}>{part}</span>
  );
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
