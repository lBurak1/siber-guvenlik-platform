"use client";
import { useState, useRef, useCallback, useEffect, type FormEvent, type KeyboardEvent } from "react";
import { FS, scenarios, type Scenario } from "@/lib/terminal-data";
import { cn } from "@/lib/utils";
import { ChevronRight, Info, Zap } from "lucide-react";

type LT = "out" | "err" | "info" | "success" | "prompt";

interface Line {
  id: number;
  t: LT;
  v: string;
  promptCwd?: string; // for "prompt" type
}

const MAX_LINES = 300;

const COLORS: Record<LT, string> = {
  prompt:  "",
  out:     "text-terminal-white",
  err:     "text-red-400",
  info:    "text-cyan-400",
  success: "text-terminal-green",
};

let _id = 0;
const L = (t: LT, v: string, promptCwd?: string): Line => ({ id: _id++, t, v, promptCwd });

const WELCOME: Line[] = [
  L("info",    "╔══════════════════════════════════════╗"),
  L("info",    "║  SEC::ACADEMY Lab Terminal v1.0      ║"),
  L("info",    "╚══════════════════════════════════════╝"),
  L("out",     "Yardım için 'help' yaz. ↑↓ ok: komut geçmişi. Ctrl+L: temizle."),
  L("out",     ""),
];

function resolve(cwd: string, p?: string): string {
  if (!p || p === "~") return "/home/kali";
  if (p.startsWith("~/")) return "/home/kali/" + p.slice(2);
  if (p.startsWith("/")) return p;
  if (p === "..") {
    const pts = cwd.split("/").filter(Boolean);
    pts.pop();
    return "/" + pts.join("/") || "/";
  }
  if (p === ".") return cwd;
  return (cwd === "/" ? "" : cwd) + "/" + p;
}

function shortCwd(cwd: string) {
  return cwd.replace("/home/kali", "~");
}

function runCmd(
  raw: string,
  cwd: string,
  setCwd: (d: string) => void,
  clearFn: () => void,
  history: string[],
  scenario: Scenario | null
): Line[] {
  const parts = raw.trim().split(/\s+/);
  const cmd  = parts[0];
  const args  = parts.slice(1);
  const flags = args.filter((a) => a.startsWith("-")).join("");

  switch (cmd) {
    case "pwd": return [L("out", cwd)];

    case "ls":
    case "ll": {
      const allArgs = cmd === "ll" ? ["-la"] : args;
      const pathArg = allArgs.find((a) => !a.startsWith("-"));
      const fl      = allArgs.filter((a) => a.startsWith("-")).join("");
      const target  = pathArg ? resolve(cwd, pathArg) : cwd;
      const entry   = FS[target];
      if (!entry || entry.type !== "dir")
        return [L("err", `ls: '${pathArg ?? target}': No such file or directory`)];
      const items = entry.children.filter((c) => fl.includes("a") || !c.startsWith("."));
      if (!fl.includes("l")) {
        return [L("out", items.map((n) => {
          const fp = target === "/" ? `/${n}` : `${target}/${n}`;
          return FS[fp]?.type === "dir" ? n + "/" : n;
        }).join("   "))];
      }
      const rows: Line[] = [L("out", `total ${items.length * 4}`)];
      items.forEach((n) => {
        const fp    = target === "/" ? `/${n}` : `${target}/${n}`;
        const isDir = FS[fp]?.type === "dir";
        rows.push(L("out", `${isDir ? "drwxr-xr-x" : "-rw-r--r--"}  1 kali kali ${isDir ? " 4096" : " 1024"} Jun  1 10:23 ${n}${isDir ? "/" : ""}`));
      });
      return rows;
    }

    case "cd": {
      const target = resolve(cwd, args[0]);
      const entry  = FS[target];
      if (!entry || entry.type !== "dir")
        return [L("err", `bash: cd: ${args[0] ?? "~"}: No such file or directory`)];
      setCwd(target);
      return [];
    }

    case "cat": {
      if (!args[0]) return [L("err", "cat: missing operand")];
      const fp    = resolve(cwd, args[0]);
      const entry = FS[fp];
      if (!entry)            return [L("err", `cat: ${args[0]}: No such file or directory`)];
      if (entry.type === "dir")   return [L("err", `cat: ${args[0]}: Is a directory`)];
      if (entry.protected)        return [L("err", `cat: ${args[0]}: Permission denied`)];
      return entry.content.split("\n").map((l) => L("out", l));
    }

    case "mkdir":
      return args[0] ? [L("success", `mkdir: created directory '${args[0]}'`)] : [L("err", "mkdir: missing operand")];

    case "touch":
      return args[0] ? [L("success", `'${args[0]}' oluşturuldu`)] : [L("err", "touch: missing operand")];

    case "rm":
      return [L("success", `rm: '${args.join(" ")}' silindi (simülasyon)`)];

    case "echo":
      return [L("out", args.join(" "))];

    case "grep": {
      if (args.length < 2) return [L("err", "grep: kullanım: grep <pattern> <file>")];
      const [pat, file] = args;
      const fp = resolve(cwd, file);
      const e  = FS[fp];
      if (!e || e.type !== "file") return [L("err", `grep: ${file}: No such file or directory`)];
      const hits = e.content.split("\n").filter((l) => l.includes(pat));
      return hits.length ? hits.map((l) => L("out", l)) : [];
    }

    case "chmod":
      return [L("success", `chmod ${args.join(" ")}: güncellendi (simülasyon)`)];

    case "whoami":  return [L("out", "kali")];
    case "hostname": return [L("out", "kali")];
    case "date":    return [L("out", new Date().toLocaleString("tr-TR"))];

    case "id":
      return [L("out", "uid=1000(kali) gid=1000(kali) groups=1000(kali),27(sudo),119(wireshark)")];

    case "uname":
      if (args.includes("-a"))
        return [L("out", "Linux kali 6.1.0-kali9-amd64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux")];
      if (args.includes("-r")) return [L("out", "6.1.0-kali9-amd64")];
      return [L("out", "Linux")];

    case "ifconfig":
      return [
        L("out", "eth0:  inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255"),
        L("out", "lo:    inet 127.0.0.1       netmask 255.0.0.0"),
        L("out", "tun0:  inet 10.10.14.5      netmask 255.255.254.0"),
        L("info", "↑ tun0 = HTB/VPN bağlantısı. 10.10.14.x senin VPN IP'n."),
      ];

    case "ip":
      if (["a", "addr", "address"].includes(args[0]))
        return [
          L("out", "1: lo:   inet 127.0.0.1/8"),
          L("out", "2: eth0: inet 192.168.1.100/24"),
          L("out", "3: tun0: inet 10.10.14.5/23"),
          L("info", "↑ tun0 = HTB/VPN bağlantısı. 10.10.14.x senin VPN IP'n."),
        ];
      return [L("err", `ip: unknown object '${args[0] ?? ""}'`)];

    case "ps":
      return [
        L("out", "USER      PID %CPU %MEM COMMAND"),
        L("out", "root        1  0.0  0.1 /sbin/init"),
        L("out", "kali     1234  0.0  0.5 -zsh"),
        L("out", "kali     5678  2.1  1.2 nmap -sV 10.10.10.5"),
        L("info", "↑ kill <PID> ile sonlandırabilirsin."),
      ];

    case "netstat":
      return [
        L("out", "Proto  Local Address       State   PID/Program"),
        L("out", "tcp    0.0.0.0:22          LISTEN  123/sshd"),
        L("out", "tcp    127.0.0.1:3306      LISTEN  456/mysqld"),
        L("out", "tcp6   :::80               LISTEN  789/apache2"),
        L("info", "↑ MySQL localhost'a kısıtlı — dışarıdan erişilemiyor."),
      ];

    case "history":
      return history.map((c, i) => L("out", `  ${String(history.length - i).padStart(3)}  ${c}`));

    case "ping": {
      const host = args[0];
      if (!host) return [L("err", "ping: missing host")];
      const sc = scenarios.find((s) => s.target === host) ?? scenario;
      if (sc?.requiresPn)
        return [
          L("out", `PING ${host}: 5 packets transmitted, 0 received, 100% packet loss`),
          L("err",  "Hedef ICMP'ye cevap vermiyor."),
          L("info", `💡 Windows ICMP'yi engeller. Dene: nmap -Pn ${host}`),
        ];
      return [
        L("out", `PING ${host}: 64 bytes icmp_seq=1 ttl=64 time=0.42ms`),
        L("out", `PING ${host}: 64 bytes icmp_seq=2 ttl=64 time=0.38ms`),
        L("out", "2 packets transmitted, 2 received, 0% packet loss"),
      ];
    }

    case "nmap": {
      const target = args.find((a) => !a.startsWith("-"));
      if (!target) return [L("err", "nmap: hedef IP belirtilmedi. Örnek: nmap -sV 10.10.10.5")];
      const sc    = scenarios.find((s) => s.target === target) ?? scenario;
      const hasPn = raw.includes("-Pn") || raw.includes("-pn");
      const hasSV = flags.includes("sV") || flags.includes("A");
      const hasAll = raw.includes("-p-");
      const date  = new Date().toISOString().slice(0, 10);

      if (sc?.requiresPn && !hasPn)
        return [
          L("out",  `Starting Nmap 7.94 at ${date}`),
          L("out",  "Note: Host seems down. If it is really up, try -Pn"),
          L("out",  "Nmap done: 1 IP address (0 hosts up) scanned in 3.05s"),
          L("err",  "⚠️  Host down görünüyor — ama aslında yukarıda!"),
          L("info", `💡 Windows ICMP'yi engeller. Dene: nmap -Pn ${target}`),
        ];

      const usedSc = sc ?? scenarios[0];
      const rows: Line[] = [
        L("out", `Starting Nmap 7.94 at ${date}`),
        L("out", `Nmap scan report for ${target} — Host is up (0.042s latency)`),
        L("out", `PORT      STATE SERVICE${hasSV ? "         VERSION" : ""}`),
      ];
      usedSc.ports.forEach((port) => {
        const svc  = usedSc.services[port] ?? "unknown";
        const col1 = `${port}/tcp`.padEnd(10);
        rows.push(L("out", `${col1}open  ${hasSV ? svc : svc.split(/\s+/)[0]}`));
      });
      rows.push(L("out", `Nmap done: 1 IP address scanned in ${(Math.random() * 4 + 1).toFixed(2)}s`));
      if (!hasSV)  rows.push(L("info", `💡 Versiyon için: nmap -sV ${target}`));
      if (!hasAll) rows.push(L("info", `💡 Tam tarama:    nmap -p- ${target}`));
      return rows;
    }

    case "sudo":
      return [
        L("err",  "kali is not in the sudoers file."),
        L("info", "💡 sudo -l ile izinleri kontrol et. GTFOBins'e bak."),
      ];

    case "man":
      return [L("info", `Man page simüle edilmiyor → https://tldr.sh`)];

    case "clear":
      clearFn();
      return [];

    case "help":
      return [
        L("info",    "══════════════════════════════════"),
        L("info",    "  SEC::ACADEMY Lab — Komut Listesi"),
        L("info",    "══════════════════════════════════"),
        L("success", "Navigasyon:"),
        L("out",     "  pwd / ls [-la] / cd <dir>"),
        L("success", "Dosya:"),
        L("out",     "  cat <f> / mkdir <n> / echo / grep <p> <f>"),
        L("success", "Sistem:"),
        L("out",     "  whoami / id / uname -a / ifconfig / ip a"),
        L("out",     "  ps aux / netstat / date / hostname"),
        L("success", "Ağ:"),
        L("out",     "  ping <ip> / nmap [opts] <ip>"),
        L("info",    "↑↓ komut geçmişi | Ctrl+L temizle"),
      ];

    case "":
      return [];

    default:
      return [
        L("err",  `bash: ${cmd}: command not found`),
        L("info", "💡 'help' yazarak komutları görebilirsin."),
      ];
  }
}

export default function FreeTerminal({ initialScenario = null }: { initialScenario?: Scenario | null }) {
  const [lines,      setLines]      = useState<Line[]>(WELCOME);
  const [input,      setInput]      = useState("");
  const [cwd,        setCwdState]   = useState("/home/kali");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx,    setHistIdx]    = useState(-1);
  const [scenario,   setScenario]   = useState<Scenario | null>(initialScenario);

  const cwdRef      = useRef(cwd);
  const historyRef  = useRef<string[]>([]);
  const inputRef    = useRef<HTMLInputElement>(null);
  const bottomRef   = useRef<HTMLDivElement>(null);

  const setCwd = useCallback((d: string) => {
    cwdRef.current = d;
    setCwdState(d);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, [lines]);

  const clearLines = useCallback(() => setLines([]), []);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;

    historyRef.current = [raw, ...historyRef.current];
    setCmdHistory([raw, ...historyRef.current.slice(1)]);
    setHistIdx(-1);

    const promptLine = L("prompt", raw, cwdRef.current);
    const output     = runCmd(raw, cwdRef.current, setCwd, clearLines, historyRef.current, scenario);
    setLines((prev) => {
      const next = [...prev, promptLine, ...output];
      return next.length > MAX_LINES ? next.slice(next.length - MAX_LINES) : next;
    });
    setInput("");
  }, [input, scenario, setCwd, clearLines]);

  const handleKey = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const ni = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(ni);
      setInput(cmdHistory[ni] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const ni = Math.max(histIdx - 1, -1);
      setHistIdx(ni);
      setInput(ni === -1 ? "" : cmdHistory[ni]);
    } else if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      clearLines();
    }
  }, [histIdx, cmdHistory, clearLines]);

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Terminal window */}
      <div
        className="flex-1 rounded-xl border border-surface-3 bg-[#0a0a0a] overflow-hidden cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-surface-3 bg-surface-1/80 select-none">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs font-mono text-terminal-comment">
            kali@sec-academy:{shortCwd(cwd)}
            {scenario && <span className="ml-2 text-yellow-400">[{scenario.icon} {scenario.name}]</span>}
          </span>
        </div>

        {/* Output */}
        <div className="h-[420px] overflow-y-auto p-4 font-mono text-xs leading-relaxed">
          {lines.map((line) =>
            line.t === "prompt" ? (
              <div key={line.id} className="text-terminal-comment">
                <span className="text-terminal-green">kali@sec-academy</span>
                <span className="text-terminal-comment">:</span>
                <span className="text-blue-400">{shortCwd(line.promptCwd ?? "/home/kali")}</span>
                <span className="text-terminal-white">$ </span>
                <span className="text-terminal-white">{line.v}</span>
              </div>
            ) : (
              <div key={line.id} className={cn("whitespace-pre-wrap break-all", COLORS[line.t])}>
                {line.v}
              </div>
            )
          )}

          {/* Input row */}
          <form onSubmit={handleSubmit} className="flex items-center gap-0.5 mt-1">
            <span className="text-terminal-green select-none">kali@sec-academy</span>
            <span className="text-terminal-comment select-none">:</span>
            <span className="text-blue-400 select-none">{shortCwd(cwd)}</span>
            <span className="text-terminal-white select-none">$&nbsp;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              autoFocus
              autoComplete="off"
              spellCheck={false}
              className="flex-1 bg-transparent outline-none text-terminal-white caret-terminal-green"
            />
          </form>
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:w-52 flex flex-col gap-3">
        {/* Scenario selector */}
        <div className="rounded-xl border border-surface-3 bg-surface-1/60 p-3">
          <p className="text-[10px] font-semibold text-terminal-comment mb-2 uppercase tracking-wide">Senaryo</p>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => { setScenario(null); setLines((p) => [...p, L("info", "Senaryo kaldırıldı — genel mod.")]); }}
              className={cn("text-left text-xs px-2 py-1.5 rounded-lg border transition-colors",
                !scenario ? "border-surface-3 bg-surface-2 text-terminal-white" : "border-transparent text-terminal-comment hover:text-terminal-white")}
            >
              🖥️ Genel mod
            </button>
            {scenarios.map((sc) => (
              <button
                key={sc.id}
                onClick={() => {
                  setScenario(sc);
                  setLines((p) => [
                    ...p,
                    L("info", `Senaryo: ${sc.icon} ${sc.name} (${sc.target})`),
                    L("info", sc.requiresPn ? "⚠️  ICMP kapalı — nmap -Pn kullan!" : "✓  ICMP aktif — standart nmap çalışır."),
                  ]);
                }}
                className={cn("text-left text-xs px-2 py-1.5 rounded-lg border transition-colors",
                  scenario?.id === sc.id
                    ? "border-red-500/40 bg-red-500/10 text-terminal-white"
                    : "border-transparent text-terminal-comment hover:text-terminal-white")}
              >
                {sc.icon} {sc.name}
                {sc.requiresPn && <span className="ml-1 text-yellow-400 text-[10px]">-Pn</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Tips */}
        {scenario && (
          <div className="rounded-xl border border-surface-3 bg-surface-1/60 p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Info className="w-3 h-3 text-cyan-400" />
              <span className="text-[10px] font-semibold text-cyan-400">İpuçları</span>
            </div>
            <p className="text-[10px] text-terminal-comment mb-2 leading-relaxed">{scenario.desc}</p>
            {scenario.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-1 mb-1">
                <ChevronRight className="w-3 h-3 text-terminal-green shrink-0 mt-0.5" />
                <code className="text-[10px] text-terminal-white font-mono leading-relaxed break-all">{tip}</code>
              </div>
            ))}
          </div>
        )}

        {/* Shortcuts */}
        <div className="rounded-xl border border-surface-3 bg-surface-1/60 p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Zap className="w-3 h-3 text-yellow-400" />
            <span className="text-[10px] font-semibold text-yellow-400">Kısayollar</span>
          </div>
          <div className="flex flex-col gap-1 text-[10px] font-mono text-terminal-comment">
            <span>↑↓  Komut geçmişi</span>
            <span>Ctrl+L  Ekranı sil</span>
            <span>help  Komut listesi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
