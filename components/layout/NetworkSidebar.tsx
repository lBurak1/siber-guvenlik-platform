"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, Network, Radio, ChevronDown, ChevronRight, Lock, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/lib/progress-store";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers, Network, Radio,
};

const netNav = [
  {
    id: "models",
    title: "Ağ Modelleri",
    icon: "Layers",
    tools: [
      { id: "osi-tcpip",     title: "OSI & TCP/IP",      slug: "osi-tcpip" },
      { id: "tcp-handshake", title: "TCP El Sıkışması",  slug: "tcp-handshake" },
    ],
  },
  {
    id: "addressing",
    title: "Adresleme",
    icon: "Network",
    tools: [
      { id: "ip-subnetting", title: "IP & Subnetting (CIDR)", slug: "ip-subnetting" },
    ],
  },
  {
    id: "protocols",
    title: "Kritik Protokoller",
    icon: "Radio",
    tools: [
      { id: "protocols-deep", title: "ARP · DNS · DHCP · HTTP · SMB", slug: "protocols-deep" },
    ],
  },
];

export default function NetworkSidebar() {
  const pathname = usePathname();
  const { isComplete } = useProgressStore();
  const [open, setOpen] = useState<Record<string, boolean>>(
    () => Object.fromEntries(netNav.map((c) => [c.id, true]))
  );

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col border-r border-surface-3 bg-surface-1 min-h-[calc(100vh-3.5rem)] sticky top-14">
      {/* Header */}
      <div className="px-4 py-4 border-b border-surface-3 bg-gradient-to-b from-emerald-900/20 to-transparent">
        <div className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-400">
          NETWORK FUNDAMENTALS
        </div>
        <div className="text-xs text-terminal-comment mt-0.5">Ağ temellerini öğren</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {netNav.map((cat) => {
          const Icon = iconMap[cat.icon] ?? Network;
          const isOpen = open[cat.id] ?? true;
          return (
            <div key={cat.id}>
              <button
                onClick={() => setOpen((p) => ({ ...p, [cat.id]: !p[cat.id] }))}
                className="w-full flex items-center justify-between px-2 py-2 text-xs font-semibold text-terminal-comment hover:text-terminal-white uppercase tracking-wider transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5" />
                  {cat.title}
                </div>
                {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
              {isOpen && (
                <div className="ml-2 space-y-0.5 mb-2">
                  {cat.tools.map((tool) => {
                    const href = `/network-fundamentals/${tool.slug}`;
                    const isActive = pathname.startsWith(href);
                    const done = isComplete(`network-fundamentals/${tool.id}`);
                    return (
                      <Link
                        key={tool.id}
                        href={href}
                        className={cn(
                          "sidebar-item group",
                          isActive && "sidebar-item-active text-emerald-400"
                        )}
                      >
                        <span className={cn(
                          "w-1.5 h-1.5 rounded-full shrink-0",
                          isActive ? "bg-emerald-400" : "bg-surface-3 group-hover:bg-terminal-comment"
                        )} />
                        <span className="flex-1 truncate text-xs">{tool.title}</span>
                        {done && <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-surface-3">
        <div className="bg-surface-2 rounded-lg p-3 text-xs text-terminal-comment font-mono space-y-1">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <Lock className="w-3 h-3" /> Neden Ağ Temelleri?
          </div>
          <p>Protokolleri anlamadan pentest yapamazsın.</p>
        </div>
      </div>
    </aside>
  );
}
