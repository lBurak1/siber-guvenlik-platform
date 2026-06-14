"use client";
import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from "react";
import { FS, scenarios, type Scenario } from "@/lib/terminal-data";
import { cn } from "@/lib/utils";
import { ChevronRight, Info, Zap } from "lucide-react";

type LT = "out" | "err" | "info" | "success";
interface Line { id: number; t: LT; v: string }

let _id = 0;
const L = (t: LT, v: string): Line => ({ id: _id++, t, v });

const COLORS: Record<LT, string> = {
  out:     "text-terminal-white",
  err:     "text-red-400",
  info:    "text-cyan-400",
  success: "text-terminal-green",
};

const WELCOME: Line[] = [
  L("info",    "╔══════════════════════════════════════╗"),
  L("info",    "║  SEC::ACADEMY Lab Terminal v1.0      ║"),
  L("info",    "╚══════════════════════════════════════╝"),
  L("out",     "Yardım için 'help' yaz. Yukarı/aşağı ok: komut geçmişi."),
  L("out",     "Senaryo seçerek nmap simülasyonunu değiştirebilirsin."),
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

function promptLabel(cwd: string) {
  return cwd.replace("/home/kali", "~");
}

function runCmd(
  raw: string,
  cwd: string,
  setCwd: (d: string) => void,
  clear: () => void,
  history: string[],
  scenario: Scenario | null
): Line[] {
  const parts = raw.trim().split(/\s+/);
  const cmd = parts[0];
  const args = parts.slice(1);
  const flags = args.filter((a) => a.startsWith("-")).join("");

  switch (cmd) {
    /* ── navigation ── */
    case "pwd":
      return [L("out", cwd)];

    case "ls": {
      const pathArg = args.find((a) => !a.startsWith("-"));
      const target = pathArg ? resolve(cwd, pathArg) : cwd;
      const entry = FS[target];
      if (!entry || entry.type !== "dir")
        return [L("err", `ls: cannot access '${pathArg ?? target}': No such file or directory`)];
      const showHidden = flags.includes("a");
      const longFmt = flags.includes("l");
      const items = entry.children.filter((c) => showHidden || !c.startsWith("."));
      if (!longFmt) {
        return [L("out", items.map((n) => {
          const fp = target === "/" ? `/${n}` : `${target}/${n}`;
          return FS[fp]?.type === "dir" ? `\x1b[34m${n}/\x1b[0m` : n;
        }).join("  "))];
      }
      const lines: Line[] = [L("out", `total ${items.length * 4}`)];
      items.forEach((n) => {
        const fp = target === "/" ? `/${n}` : `${target}/${n}`;
        const isDir = FS[fp]?.type === "dir";
        lines.push(L("out", `${isDir ? "drwxr-xr-x" : "-rw-r--r--"}  1 kali kali ${isDir ? " 4096" : " 1024"} Jun  1 10:23 ${n}${isDir ? "/" : ""}`));
      });
      return lines;
    }

    case "ll":
      return runCmd("ls -la", cwd, setCwd, clear, history, scenario);

    case "cd": {
      const target = resolve(cwd, args[0]);
      const entry = FS[target];
      if (!entry || entry.type !== "dir")
        return [L("err", `bash: cd: ${args[0] ?? "~"}: No such file or directory`)];
      setCwd(target);
      return [];
    }

    /* ── file ops ── */
    case "cat": {
      if (!args[0]) return [L("err", "cat: missing operand")];
      const fp = resolve(cwd, args[0]);
      const entry = FS[fp];
      if (!entry) return [L("err", `cat: ${args[0]}: No such file or directory`)];
      if (entry.type === "dir") return [L("err", `cat: ${args[0]}: Is a directory`)];
      if (entry.protected) return [L("err", `cat: ${args[0]}: Permission denied`)];
      return entry.content.split("\n").map((l) => L("out", l));
    }

    case "mkdir":
      if (!args[0]) return [L("err", "mkdir: missing operand")];
      return [L("success", `mkdir: created directory '${args[0]}'`)];

    case "touch":
      return args[0] ? [L("success", `touch: '${args[0]}' created`)] : [L("err", "touch: missing operand")];

    case "rm":
      return [L("success", `rm: removed '${args.join(" ")}' (simülasyon)`)];

    case "echo":
      return [L("out", args.join(" "))];

    case "grep": {
      if (args.length < 2) return [L("err", "grep: kullanım: grep <pattern> <file>")];
      const [pat, file] = args;
      const fp = resolve(cwd, file);
      const entry = FS[fp];
      if (!entry || entry.type !== "file") return [L("err", `grep: ${file}: No such file or directory`)];
      const hits = entry.content.split("\n").filter((l) => l.includes(pat));
      return hits.length ? hits.map((l) => L("out", l)) : [];
    }

    case "chmod":
      return [L("success", `chmod ${args.join(" ")}: izinler güncellendi (simülasyon)`)];

    /* ── system info ── */
    case "whoami":  return [L("out", "kali")];
    case "hostname": return [L("out", "kali")];
    case "date":    return [L("out", new Date().toLocaleString("tr-TR"))];

    case "id":
      return [L("out", "uid=1000(kali) gid=1000(kali) groups=1000(kali),27(sudo),44(video),119(wireshark)")];

    case "uname":
      if (args.includes("-a"))
        return [L("out", "Linux kali 6.1.0-kali9-amd64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux")];
      if (args.includes("-r")) return [L("out", "6.1.0-kali9-amd64")];
      return [L("out", "Linux")];

    case "ifconfig":
      return [
        L("out", "eth0: flags=4163<UP,BROADCAST,RUNNING>  mtu 1500"),
        L("out", "      inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255"),
        L("out", ""),
        L("out", "lo: flags=73<UP,LOOPBACK>  mtu 65536"),
        L("out", "    inet 127.0.0.1  netmask 255.0.0.0"),
        L("out", ""),
        L("out", "tun0: flags=4305<UP,POINTOPOINT,RUNNING>  mtu 1500"),
        L("out", "      inet 10.10.14.5  netmask 255.255.254.0"),
        L("info", "↑ tun0 = HTB/VPN bağlantısı. 10.10.14.x senin VPN IP'n."),
      ];

    case "ip": {
      if (["a", "addr", "address"].includes(args[0]))
        return [
          L("out", "1: lo: <LOOPBACK,UP> mtu 65536"),
          L("out", "   inet 127.0.0.1/8 scope host lo"),
          L("out", "2: eth0: <BROADCAST,MULTICAST,UP> mtu 1500"),
          L("out", "   inet 192.168.1.100/24 brd 192.168.1.255 scope global eth0"),
          L("out", "3: tun0: <POINTOPOINT,UP> mtu 1500"),
          L("out", "   inet 10.10.14.5/23 scope global tun0"),
          L("info", "↑ tun0 = HTB/VPN bağlantısı. 10.10.14.x senin VPN IP'n."),
        ];
      return [L("err", `ip: unknown object '${args[0] ?? ""}'`)];
    }

    case "ps":
      return [
        L("out", "USER         PID %CPU %MEM COMMAND"),
        L("out", "root           1  0.0  0.1 /sbin/init"),
        L("out", "kali        1234  0.0  0.5 -zsh"),
        L("out", "kali        5678  2.1  1.2 nmap -sV 10.10.10.5"),
        L("out", "kali        9012  0.0  0.1 ps aux"),
        L("info", "↑ PID = Process ID. kill <PID> ile sonlandırabilirsin."),
      ];

    case "netstat":
      return [
        L("out", "Proto  Local Address         State       PID/Program"),
        L("out", "tcp    0.0.0.0:22            LISTEN      123/sshd"),
        L("out", "tcp    127.0.0.1:3306        LISTEN      456/mysqld"),
        L("out", "tcp6   :::80                 LISTEN      789/apache2"),
        L("info", "↑ Açık portlar = saldırı yüzeyi. MySQL localhost'a kısıtlı."),
      ];

    case "history":
      return history.map((c, i) =>
        L("out", `  ${String(history.length - i).padStart(3)}  ${c}`)
      );

    /* ── network tools ── */
    case "ping": {
      const host = args[0];
      if (!host) return [L("err", "ping: missing host")];
      const sc = scenarios.find((s) => s.target === host) ?? scenario;
      if (sc?.requiresPn) {
        return [
          L("out", `PING ${host}: 56 bytes of data.`),
          L("out", "--- ping statistics ---"),
          L("out", "5 packets transmitted, 0 received, 100% packet loss"),
          L("err", "Hedef ICMP'ye cevap vermiyor."),
          L("info", `💡 Windows ICMP'yi engeller. Dene: nmap -Pn ${host}`),
        ];
      }
      return [
        L("out", `PING ${host}: 56 bytes of data.`),
        L("out", `64 bytes from ${host}: icmp_seq=1 ttl=64 time=0.42 ms`),
        L("out", `64 bytes from ${host}: icmp_seq=2 ttl=64 time=0.38 ms`),
        L("out", "--- ping statistics ---"),
        L("out", "2 packets transmitted, 2 received, 0% packet loss"),
      ];
    }

    case "nmap": {
      const target = args.find((a) => !a.startsWith("-"));
      if (!target) return [L("err", "nmap: hedef IP belirtilmedi. Örnek: nmap -sV 10.10.10.5")];
      const sc = scenarios.find((s) => s.target === target) ?? scenario;
      const hasPn = flags.includes("Pn");
      const hasSV = flags.includes("sV") || flags.includes("A");
      const hasSC = flags.includes("sC") || flags.includes("A");
      const hasAll = raw.includes("-p-");
      const date = new Date().toISOString().slice(0, 10);

      if (sc?.requiresPn && !hasPn) {
        return [
          L("out", `Starting Nmap 7.94 at ${date}`),
          L("out", `Note: Host seems down. If it is really up, but blocking our ping probes, try -Pn`),
          L("out", `Nmap done: 1 IP address (0 hosts up) scanned in 3.05 seconds`),
          L("err", "⚠️  Host down görünüyor — ama aslında yukarıda!"),
          L("info", `💡 Windows ICMP'yi engeller. Dene: nmap -Pn ${target}`),
        ];
      }

      const usedSc = sc ?? scenarios[0];
      const lines: Line[] = [
        L("out", `Starting Nmap 7.94 at ${date}`),
        L("out", `Nmap scan report for ${target}`),
        L("out", `Host is up (0.042s latency).`),
        L("out", ""),
        L("out", `PORT      STATE SERVICE${hasSV ? "         VERSION" : ""}`),
      ];

      const portsToShow = hasAll ? usedSc.ports : usedSc.ports.slice(0, Math.min(usedSc.ports.length, 5));
      portsToShow.forEach((port) => {
        const svc = usedSc.services[port] ?? "unknown";
        const portStr = `${port}/tcp`.padEnd(10);
        lines.push(L("out", `${portStr}open  ${hasSV ? svc : svc.split(/\s+/)[0]}`));
      });

      if (!hasAll && usedSc.ports.length > 5)
        lines.push(L("out", `... ve ${usedSc.ports.length - 5} port daha. Hepsini görmek için: -p-`));

      lines.push(L("out", ""));
      lines.push(
        L("out", `Nmap done: 1 IP address (1 host up) scanned in ${(Math.random() * 5 + 2).toFixed(2)} seconds`)
      );

      if (!hasSV) lines.push(L("info", `💡 Versiyon için: nmap -sV ${target}`));
      if (!hasSC && hasSV) lines.push(L("info", `💡 Script için: nmap -sC -sV ${target}`));
      if (!hasAll) lines.push(L("info", `💡 Tam tarama: nmap -p- ${target}`));

      return lines;
    }

    case "sudo":
      return [
        L("out", "[sudo] password for kali: "),
        L("err", "kali is not in the sudoers file. Bu olay rapor edilecek."),
        L("info", "💡 sudo -l ile hangi komutları çalıştırabileceğini gör."),
      ];

    case "man":
      return [
        L("info", `Man page: ${args[0] ?? "?"} — simüle edilmiyor.`),
        L("info", "Bakınız: https://tldr.sh veya komuta --help ekle."),
      ];

    case "clear":
      clear();
      return [];

    case "help":
      return [
        L("info",    "══════════════════════════════════════════"),
        L("info",    "   SEC::ACADEMY Lab Terminal — Komutlar   "),
        L("info",    "══════════════════════════════════════════"),
        L("out",  ""),
        L("success", "Navigasyon:"),
        L("out",  "  pwd             Geçerli dizin"),
        L("out",  "  ls [-la]        Dosya listele"),
        L("out",  "  cd <dir>        Dizin değiştir"),
        L("out",  ""),
        L("success", "Dosya İşlemleri:"),
        L("out",  "  cat <file>      Dosya içeriği"),
        L("out",  "  mkdir <name>    Klasör oluştur"),
        L("out",  "  echo <text>     Metin yaz"),
        L("out",  "  grep <pat> <f>  Metin ara"),
        L("out",  ""),
        L("success", "Sistem Bilgisi:"),
        L("out",  "  whoami / id     Kullanıcı bilgisi"),
        L("out",  "  uname -a        Kernel bilgisi"),
        L("out",  "  ifconfig / ip a Ağ arayüzleri"),
        L("out",  "  ps aux          Süreç listesi"),
        L("out",  "  netstat -tulpn  Açık portlar"),
        L("out",  ""),
        L("success", "Ağ Araçları:"),
        L("out",  "  ping <host>     Bağlantı testi"),
        L("out",  "  nmap [opts] <ip> Port tarama"),
        L("out",  ""),
        L("info",    "↑↓ Ok tuşları: komut geçmişi | clear: ekranı sil"),
      ];

    case "":
      return [];

    default:
      return [
        L("err",  `bash: ${cmd}: command not found`),
        L("info", "💡 'help' yazarak mevcut komutları görebilirsin."),
      ];
  }
}

interface Props {
  initialScenario?: Scenario | null;
}

export default function FreeTerminal({ initialScenario = null }: Props) {
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("/home/kali");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [scenario, setScenario] = useState<Scenario | null>(initialScenario);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const clearLines = () => setLines([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;
    setCmdHistory((prev) => [raw, ...prev]);
    setHistIdx(-1);
    const promptLine = L("out", `\x1b[32mkali@sec-academy\x1b[0m:\x1b[34m${promptLabel(cwd)}\x1b[0m$ ${raw}`);
    const output = runCmd(raw, cwd, setCwd, clearLines, cmdHistory, scenario);
    setLines((prev) => [...prev, promptLine, ...output]);
    setInput("");
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
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
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      clearLines();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Terminal */}
      <div
        className="flex-1 rounded-xl border border-surface-3 bg-[#0a0a0a] overflow-hidden cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-surface-3 bg-surface-1/80">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs font-mono text-terminal-comment">
            kali@sec-academy: {promptLabel(cwd)}
            {scenario && (
              <span className="ml-2 text-yellow-400">
                [{scenario.icon} {scenario.name}]
              </span>
            )}
          </span>
        </div>

        {/* Output */}
        <div className="h-[420px] overflow-y-auto p-4 font-mono text-xs leading-relaxed">
          {lines.map((line) => (
            <div key={line.id} className={cn("whitespace-pre-wrap break-all", COLORS[line.t])}>
              {line.v.startsWith("\x1b") ? (
                <span dangerouslySetInnerHTML={{
                  __html: line.v
                    .replace(/\x1b\[32m/g, '<span class="text-terminal-green">')
                    .replace(/\x1b\[34m/g, '<span class="text-blue-400">')
                    .replace(/\x1b\[31m/g, '<span class="text-red-400">')
                    .replace(/\x1b\[0m/g, "</span>"),
                }} />
              ) : line.v}
            </div>
          ))}

          {/* Input row */}
          <form onSubmit={handleSubmit} className="flex items-center gap-1 mt-1">
            <span className="text-terminal-green shrink-0">kali@sec-academy</span>
            <span className="text-terminal-comment shrink-0">:</span>
            <span className="text-blue-400 shrink-0">{promptLabel(cwd)}</span>
            <span className="text-terminal-white shrink-0">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              autoFocus
              autoComplete="off"
              spellCheck={false}
              className="flex-1 bg-transparent outline-none text-terminal-white caret-terminal-green ml-1"
            />
          </form>
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Sidebar: scenario selector + tips */}
      <div className="lg:w-56 flex flex-col gap-3">
        <div className="rounded-xl border border-surface-3 bg-surface-1/60 p-3">
          <p className="text-xs font-semibold text-terminal-comment mb-2 uppercase tracking-wide">Senaryo Seç</p>
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => {
                setScenario(null);
                setLines((p) => [...p, L("info", "Senaryo kaldırıldı — genel mod.")]);
              }}
              className={cn(
                "text-left text-xs px-2.5 py-1.5 rounded-lg border transition-all",
                !scenario
                  ? "border-surface-3 bg-surface-2 text-terminal-white"
                  : "border-transparent text-terminal-comment hover:border-surface-3"
              )}
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
                className={cn(
                  "text-left text-xs px-2.5 py-1.5 rounded-lg border transition-all",
                  scenario?.id === sc.id
                    ? "border-red-500/40 bg-red-500/10 text-terminal-white"
                    : "border-transparent text-terminal-comment hover:border-surface-3"
                )}
              >
                {sc.icon} {sc.name}
                {sc.requiresPn && <span className="ml-1 text-yellow-400 text-[10px]">-Pn</span>}
              </button>
            ))}
          </div>
        </div>

        {scenario && (
          <div className="rounded-xl border border-surface-3 bg-surface-1/60 p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Info className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="text-xs font-semibold text-cyan-400">İpuçları</span>
            </div>
            <p className="text-[11px] text-terminal-comment mb-2">{scenario.desc}</p>
            <div className="flex flex-col gap-1">
              {scenario.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-1">
                  <ChevronRight className="w-3 h-3 text-terminal-green shrink-0 mt-0.5" />
                  <code className="text-[10px] text-terminal-white font-mono leading-relaxed">{tip}</code>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-xl border border-surface-3 bg-surface-1/60 p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Zap className="w-3 h-3 text-yellow-400 shrink-0" />
            <span className="text-xs font-semibold text-yellow-400">Kısayollar</span>
          </div>
          <div className="flex flex-col gap-1 text-[10px] font-mono text-terminal-comment">
            <span>↑↓  Komut geçmişi</span>
            <span>Ctrl+L  Ekranı temizle</span>
            <span>help  Komut listesi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
