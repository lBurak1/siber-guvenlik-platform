"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield, Terminal, Eye, GitMerge,
  Network, BookOpen, Menu, X, Zap, Monitor, Cpu, AlertTriangle, Search, Boxes, GraduationCap, Globe, LayoutDashboard, Server, Database, GitBranch, Layers
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn, teamConfig } from "@/lib/utils";
import CommandPalette from "@/components/search/CommandPalette";
import { useProgressStore } from "@/lib/progress-store";

const navLinks = [
  { href: "/altyapi",               icon: Layers,     label: "Altyapı",      color: "emerald" },
  { href: "/metodoloji",            icon: GitBranch,  label: "Metodoloji",   color: "fuchsia" },
  { href: "/red-team",              icon: Shield,     label: "Red Team",     color: "red" },
  { href: "/blue-team",             icon: Eye,        label: "Blue Team",    color: "blue" },
  { href: "/purple-team",           icon: GitMerge,   label: "Purple Team",  color: "purple" },
  { href: "/owasp-top10",           icon: AlertTriangle, label: "OWASP Top 10", color: "amber" },
  { href: "/certifications",        icon: GraduationCap, label: "Sertifikalar", color: "indigo" },
  { href: "/ecosystem",             icon: Globe,      label: "Sektör",       color: "pink" },
  { href: "/cheatsheet",            icon: Zap,        label: "Cheat Sheet",  color: "yellow" },
] as const;

const colorMap: Record<string, { active: string; hover: string }> = {
  emerald: { active: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30", hover: "hover:text-emerald-300 hover:bg-emerald-500/5" },
  orange:  { active: "bg-orange-500/10 text-orange-400 border border-orange-500/30",   hover: "hover:text-orange-300 hover:bg-orange-500/5" },
  sky:     { active: "bg-sky-500/10 text-sky-400 border border-sky-500/30",             hover: "hover:text-sky-300 hover:bg-sky-500/5" },
  red:     { active: "bg-red-500/10 text-red-400 border border-red-500/30",             hover: "hover:text-red-300 hover:bg-red-500/5" },
  blue:    { active: "bg-blue-500/10 text-blue-400 border border-blue-500/30",          hover: "hover:text-blue-300 hover:bg-blue-500/5" },
  purple:  { active: "bg-purple-500/10 text-purple-400 border border-purple-500/30",   hover: "hover:text-purple-300 hover:bg-purple-500/5" },
  yellow:  { active: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30",   hover: "hover:text-yellow-300 hover:bg-yellow-500/5" },
  amber:   { active: "bg-amber-500/10 text-amber-400 border border-amber-500/30",      hover: "hover:text-amber-300 hover:bg-amber-500/5" },
  teal:    { active: "bg-teal-500/10 text-teal-400 border border-teal-500/30",          hover: "hover:text-teal-300 hover:bg-teal-500/5" },
  indigo:  { active: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30",   hover: "hover:text-indigo-300 hover:bg-indigo-500/5" },
  pink:    { active: "bg-pink-500/10 text-pink-400 border border-pink-500/30",          hover: "hover:text-pink-300 hover:bg-pink-500/5" },
  cyan:    { active: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30",          hover: "hover:text-cyan-300 hover:bg-cyan-500/5" },
  lime:    { active: "bg-lime-500/10 text-lime-400 border border-lime-500/30",          hover: "hover:text-lime-300 hover:bg-lime-500/5" },
  fuchsia: { active: "bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/30", hover: "hover:text-fuchsia-300 hover:bg-fuchsia-500/5" },
};

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const recordVisit = useProgressStore((s) => s.recordVisit);

  useEffect(() => { recordVisit(); }, [recordVisit]);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-3 bg-surface/90 backdrop-blur-xl">
      <CommandPalette open={searchOpen} setOpen={setSearchOpen} />
      <nav className="mx-auto max-w-[1700px] px-4 h-14 flex items-center gap-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group mr-2">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-green-500/20 rounded-lg blur-md group-hover:bg-green-500/30 transition-all" />
            <Terminal className="w-5 h-5 text-terminal-green relative z-10" />
          </div>
          <span className="font-mono font-bold text-sm hidden sm:block">
            <span className="text-terminal-green">SEC</span>
            <span className="text-terminal-comment">::</span>
            <span className="text-terminal-white">ACADEMY</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1 flex-1">
          {navLinks.map(({ href, icon: Icon, label, color }) => {
            const isActive = pathname.startsWith(href);
            const c = colorMap[color];
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150",
                  isActive ? c.active : `text-terminal-comment ${c.hover}`
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            );
          })}
        </div>

        {/* Panel link */}
        <Link
          href="/panel"
          className={cn(
            "ml-auto lg:ml-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all shrink-0",
            pathname.startsWith("/panel")
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
              : "text-terminal-comment border border-surface-3 hover:text-emerald-300 hover:border-emerald-500/30 bg-surface-1/50"
          )}
          title="İlerleme Panelin"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Panel</span>
        </Link>

        {/* Search button */}
        <button
          onClick={() => setSearchOpen(true)}
          className="lg:ml-2 flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-terminal-comment border border-surface-3 hover:border-terminal-green/40 hover:text-terminal-white bg-surface-1/50 transition-all shrink-0"
          title="Ara (Ctrl+K)"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Komut ara…</span>
          <kbd className="hidden lg:inline font-mono text-[10px] bg-surface-2 border border-surface-3 rounded px-1 py-0.5 text-terminal-comment">
            Ctrl K
          </kbd>
        </button>

        {/* Ethics badge */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-terminal-comment font-mono ml-3 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse" />
          White Hat Only
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden ml-1 p-2 text-terminal-comment hover:text-terminal-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-surface-3 bg-surface-1 p-3 grid grid-cols-2 gap-2">
          {navLinks.map(({ href, icon: Icon, label, color }) => {
            const isActive = pathname.startsWith(href);
            const c = colorMap[color];
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium",
                  isActive ? c.active : `text-terminal-comment ${c.hover}`
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
