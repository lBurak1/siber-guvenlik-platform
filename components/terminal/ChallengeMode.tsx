"use client";
import { useState, useRef, type FormEvent, type KeyboardEvent } from "react";
import { challengeSets, type ChallengeSet, type Challenge } from "@/lib/terminal-data";
import { cn } from "@/lib/utils";
import { CheckCircle, Circle, ChevronRight, Lightbulb, Trophy, RotateCcw } from "lucide-react";

const COLOR: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  orange: {
    border: "border-orange-500/30",
    bg: "bg-orange-500/5",
    text: "text-orange-400",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  },
  red: {
    border: "border-red-500/30",
    bg: "bg-red-500/5",
    text: "text-red-400",
    badge: "bg-red-500/10 text-red-400 border-red-500/20",
  },
};

interface ChallengeTerminalProps {
  challenge: Challenge;
  onSuccess: (cmd: string) => void;
}

function ChallengeTerminal({ challenge, onSuccess }: ChallengeTerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [lines, setLines] = useState<{ t: "out" | "err" | "ok"; v: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;
    setHistory((p) => [raw, ...p]);
    setHistIdx(-1);

    const promptLine = { t: "out" as const, v: `kali@lab:~$ ${raw}` };

    if (challenge.check(raw)) {
      setLines((p) => [...p, promptLine, { t: "ok", v: `✓ ${challenge.successMsg}` }]);
      setTimeout(() => onSuccess(raw), 600);
    } else {
      setLines((p) => [
        ...p,
        promptLine,
        { t: "err", v: `✗ Yanlış komut. İpucu: ${challenge.hint}` },
      ]);
    }
    setInput("");
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const ni = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(ni);
      setInput(history[ni] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const ni = Math.max(histIdx - 1, -1);
      setHistIdx(ni);
      setInput(ni === -1 ? "" : history[ni]);
    }
  };

  return (
    <div
      className="rounded-lg border border-surface-3 bg-[#0a0a0a] overflow-hidden cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-surface-3 bg-surface-1/60">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="ml-2 text-[10px] font-mono text-terminal-comment">challenge-terminal</span>
      </div>

      <div className="p-3 font-mono text-xs min-h-[100px] max-h-[180px] overflow-y-auto">
        {lines.map((l, i) => (
          <div
            key={i}
            className={cn(
              "leading-relaxed",
              l.t === "ok" ? "text-terminal-green" : l.t === "err" ? "text-red-400" : "text-terminal-comment"
            )}
          >
            {l.v}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="flex items-center gap-1">
          <span className="text-terminal-green shrink-0">kali@lab</span>
          <span className="text-terminal-comment">:~$</span>
          <input
            ref={inputRef}
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent outline-none text-terminal-white caret-terminal-green ml-1"
            placeholder="komutu buraya yaz…"
          />
        </form>
      </div>
    </div>
  );
}

export default function ChallengeMode() {
  const [activeSet, setActiveSet] = useState(challengeSets[0].id);
  const [completed, setCompleted] = useState<Record<string, Set<string>>>(() =>
    Object.fromEntries(challengeSets.map((s) => [s.id, new Set<string>()]))
  );
  const [showTip, setShowTip] = useState<string | null>(null);

  const set = challengeSets.find((s) => s.id === activeSet)!;
  const done = completed[activeSet];
  const total = set.challenges.length;
  const doneCount = done.size;
  const progress = Math.round((doneCount / total) * 100);

  const firstIncomplete = set.challenges.find((c) => !done.has(c.id));

  const markDone = (setId: string, challengeId: string) => {
    setCompleted((prev) => ({
      ...prev,
      [setId]: new Set(Array.from(prev[setId]).concat(challengeId)),
    }));
    setShowTip(challengeId);
  };

  const resetSet = () => {
    setCompleted((prev) => ({ ...prev, [activeSet]: new Set() }));
    setShowTip(null);
  };

  const c = COLOR[set.color] ?? COLOR.orange;

  return (
    <div>
      {/* Set selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {challengeSets.map((s) => {
          const sc = COLOR[s.color] ?? COLOR.orange;
          const sd = completed[s.id];
          const isActive = s.id === activeSet;
          return (
            <button
              key={s.id}
              onClick={() => { setActiveSet(s.id); setShowTip(null); }}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all",
                isActive
                  ? `${sc.border} ${sc.bg} ${sc.text}`
                  : "border-surface-3 text-terminal-comment hover:border-surface-3 hover:text-terminal-white"
              )}
            >
              <span>{s.icon}</span>
              <span>{s.name}</span>
              <span className={cn("text-xs font-mono px-1.5 py-0.5 rounded border", isActive ? sc.badge : "bg-surface-2 text-terminal-comment border-surface-3")}>
                {sd.size}/{s.challenges.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-terminal-comment">{set.icon} {set.name} — {set.desc}</span>
          <div className="flex items-center gap-2">
            <span className={cn("text-xs font-mono font-bold", c.text)}>{doneCount}/{total}</span>
            {doneCount > 0 && (
              <button onClick={resetSet} className="text-terminal-comment hover:text-terminal-white transition-colors" title="Sıfırla">
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
        <div className="h-1.5 rounded-full bg-surface-3 overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-500", set.color === "red" ? "bg-red-500" : "bg-orange-500")}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* All completed */}
      {doneCount === total && (
        <div className={cn("rounded-xl border p-6 text-center mb-6", c.border, c.bg)}>
          <Trophy className={cn("w-8 h-8 mx-auto mb-2", c.text)} />
          <p className={cn("font-bold text-lg", c.text)}>Tüm Görevler Tamamlandı! 🎉</p>
          <p className="text-sm text-terminal-comment mt-1">{set.name} setini bitirdin.</p>
          <button
            onClick={resetSet}
            className={cn("mt-3 text-xs px-3 py-1.5 rounded-lg border transition-all", c.border, c.bg, c.text, "hover:opacity-80")}
          >
            Tekrar Dene
          </button>
        </div>
      )}

      {/* Challenge list */}
      <div className="flex gap-6">
        {/* Left: challenge list */}
        <div className="w-52 shrink-0 hidden lg:block">
          <div className="flex flex-col gap-1">
            {set.challenges.map((ch) => {
              const isDone = done.has(ch.id);
              const isActive = firstIncomplete?.id === ch.id;
              return (
                <div
                  key={ch.id}
                  className={cn(
                    "flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all",
                    isDone
                      ? "text-terminal-green"
                      : isActive
                      ? cn("font-semibold", c.text)
                      : "text-terminal-comment"
                  )}
                >
                  {isDone ? (
                    <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <Circle className={cn("w-3.5 h-3.5 shrink-0", isActive ? c.text : "text-surface-3")} />
                  )}
                  <span>{ch.order}. {ch.task}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: active challenge */}
        <div className="flex-1">
          {firstIncomplete ? (
            <div>
              <div className={cn("rounded-xl border p-4 mb-4", c.border, c.bg)}>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className={cn("text-xs font-mono", c.text)}>GÖREV {firstIncomplete.order}/{total}</span>
                    <h3 className="text-base font-bold text-terminal-white mt-0.5">{firstIncomplete.task}</h3>
                  </div>
                  <button
                    onClick={() => setShowTip(showTip === firstIncomplete.id ? null : firstIncomplete.id)}
                    className="flex items-center gap-1 text-xs text-yellow-400 hover:text-yellow-300 shrink-0"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    İpucu
                  </button>
                </div>

                {showTip === firstIncomplete.id && (
                  <div className="flex items-start gap-2 bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-2.5 mb-3">
                    <Lightbulb className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-yellow-300 font-semibold mb-0.5">İpucu</p>
                      <p className="text-xs text-terminal-comment">{firstIncomplete.hint}</p>
                    </div>
                  </div>
                )}

                <ChallengeTerminal
                  key={firstIncomplete.id}
                  challenge={firstIncomplete}
                  onSuccess={(cmd) => markDone(activeSet, firstIncomplete.id)}
                />
              </div>

              {/* Tip from last completed */}
              {showTip && showTip !== firstIncomplete.id && (() => {
                const prev = set.challenges.find((c) => c.id === showTip);
                return prev ? (
                  <div className="flex items-start gap-2 bg-terminal-green/5 border border-terminal-green/20 rounded-xl p-3">
                    <CheckCircle className="w-4 h-4 text-terminal-green shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-terminal-green mb-0.5">Bilgi Notu</p>
                      <p className="text-xs text-terminal-comment">{prev.tip}</p>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          ) : null}

          {/* Mobile challenge list */}
          <div className="lg:hidden mt-4 grid grid-cols-2 gap-2">
            {set.challenges.map((ch) => {
              const isDone = done.has(ch.id);
              return (
                <div
                  key={ch.id}
                  className={cn(
                    "flex items-center gap-1.5 text-xs px-2 py-1.5 rounded-lg border",
                    isDone ? "border-terminal-green/20 text-terminal-green" : "border-surface-3 text-terminal-comment"
                  )}
                >
                  {isDone ? <CheckCircle className="w-3 h-3 shrink-0" /> : <Circle className="w-3 h-3 shrink-0" />}
                  <span className="truncate">{ch.task}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
