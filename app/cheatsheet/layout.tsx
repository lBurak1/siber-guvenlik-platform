"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap } from "lucide-react";
import { cheatsheetPorts } from "@/lib/navigation";
import { cn, riskConfig } from "@/lib/utils";

export default function CheatsheetLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 hidden lg:flex flex-col border-r border-surface-3 bg-surface-1 sticky top-14 min-h-[calc(100vh-3.5rem)]">
        <div className="px-4 py-4 border-b border-surface-3 bg-gradient-to-b from-yellow-900/20 to-transparent">
          <div className="text-xs font-mono font-bold tracking-widest uppercase text-yellow-400 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" /> CHEAT SHEET
          </div>
          <div className="text-xs text-terminal-comment mt-0.5">Port bazlı komut kütüphanesi</div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          <p className="text-xs font-semibold text-terminal-comment uppercase tracking-wider px-2 py-2">Portlar</p>
          {cheatsheetPorts.map(({ port, service, slug, risk }) => {
            const isActive = pathname === `/cheatsheet/${slug}` || pathname.startsWith(`/cheatsheet/${slug}`);
            const rc = riskConfig[risk];
            return (
              <Link
                key={slug}
                href={`/cheatsheet/${slug}`}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-xs transition-all",
                  isActive
                    ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                    : "text-terminal-comment hover:text-terminal-white hover:bg-surface-2"
                )}
              >
                <span className={cn("text-[10px] font-mono px-1.5 py-0.5 rounded border shrink-0", rc.class)}>
                  {port}
                </span>
                <span>{service}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-surface-3">
          <div className="text-xs text-terminal-comment font-mono bg-surface-2 rounded-lg p-2.5 space-y-1">
            <div className="text-yellow-400 font-semibold">Risk Seviyeleri</div>
            {Object.entries(riskConfig).map(([k, v]) => (
              <div key={k} className={cn("px-2 py-0.5 rounded border text-[10px]", v.class)}>{v.label}</div>
            ))}
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
