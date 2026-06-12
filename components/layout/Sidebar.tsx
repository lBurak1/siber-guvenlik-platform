"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search, Network, Globe, Wifi, Smartphone,
  ActivitySquare, FileText, GitMerge, Terminal, KeyRound, Crosshair, Building2,
  Shield, Lock as LockIcon, Eye,
  ChevronDown, ChevronRight, CheckCircle2, Lock
} from "lucide-react";
import { useState } from "react";
import { cn, teamConfig } from "@/lib/utils";
import { navigation } from "@/lib/navigation";
import { useProgressStore } from "@/lib/progress-store";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search, Network, Globe, Wifi, Smartphone,
  ActivitySquare, FileText, GitMerge, Terminal, KeyRound, Crosshair, Building2,
  Shield, Lock: LockIcon, Eye,
};

interface SidebarProps {
  team: "red-team" | "blue-team" | "purple-team";
}

export default function Sidebar({ team }: SidebarProps) {
  const pathname = usePathname();
  const cfg = teamConfig[team];
  const teamNav = navigation[team];
  const { isComplete } = useProgressStore();

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    () => Object.fromEntries(teamNav.categories.map((c) => [c.id, true]))
  );

  const toggleCategory = (id: string) =>
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col border-r border-surface-3 bg-surface-1 min-h-[calc(100vh-3.5rem)] sticky top-14">
      {/* Team header */}
      <div className={cn("px-4 py-4 border-b border-surface-3 bg-gradient-to-b", cfg.gradient)}>
        <div className={cn("text-xs font-mono font-bold tracking-widest uppercase", cfg.textClass)}>
          {cfg.shortLabel} TEAM
        </div>
        <div className="text-xs text-terminal-comment mt-0.5">{cfg.description.split("—")[0]}</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {teamNav.categories.map((category) => {
          const Icon = iconMap[category.icon] ?? Search;
          const isOpen = openCategories[category.id] ?? true;

          return (
            <div key={category.id}>
              {/* Category header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between px-2 py-2 text-xs font-semibold text-terminal-comment hover:text-terminal-white uppercase tracking-wider transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5" />
                  {category.title}
                </div>
                {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>

              {/* Tools */}
              {isOpen && (
                <div className="ml-2 space-y-0.5 mb-2">
                  {category.tools.map((tool) => {
                    const href = `/${team}/${tool.slug}`;
                    const isActive = pathname.startsWith(href);
                    const completed = isComplete(`${team}/${tool.id}/basics`);

                    return (
                      <Link
                        key={tool.id}
                        href={href}
                        className={cn(
                          "sidebar-item group",
                          isActive && "sidebar-item-active",
                          isActive && cfg.textClass
                        )}
                      >
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full shrink-0 transition-colors",
                            isActive ? "bg-current" : "bg-surface-3 group-hover:bg-terminal-comment"
                          )}
                        />
                        <span className="flex-1 truncate">{tool.title}</span>
                        {completed && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer note */}
      <div className="p-4 border-t border-surface-3">
        <div className="bg-surface-2 rounded-lg p-3 text-xs text-terminal-comment font-mono space-y-1">
          <div className="flex items-center gap-2 text-terminal-green font-semibold">
            <Lock className="w-3 h-3" />
            Etik Kullanım
          </div>
          <p>Tüm teknikler yalnızca yetkili ortamlarda kullanılmalıdır.</p>
        </div>
      </div>
    </aside>
  );
}
