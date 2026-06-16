"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertTriangle, Settings, Lock, Radio, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  AlertTriangle, Settings, Lock, Radio,
};

const categories = [
  {
    id: "critical",
    title: "En Kritik Riskler",
    icon: "AlertTriangle",
    tools: [
      { slug: "broken-access-control",  title: "A01 — Broken Access Control" },
      { slug: "cryptographic-failures", title: "A02 — Cryptographic Failures" },
      { slug: "injection",              title: "A03 — Injection" },
    ],
  },
  {
    id: "design",
    title: "Tasarım & Yapılandırma",
    icon: "Settings",
    tools: [
      { slug: "insecure-design",           title: "A04 — Insecure Design" },
      { slug: "security-misconfiguration", title: "A05 — Security Misconfiguration" },
      { slug: "vulnerable-components",     title: "A06 — Vulnerable Components" },
    ],
  },
  {
    id: "auth-integrity",
    title: "Auth & Bütünlük",
    icon: "Lock",
    tools: [
      { slug: "auth-failures",     title: "A07 — Auth Failures" },
      { slug: "integrity-failures",title: "A08 — Integrity Failures" },
    ],
  },
  {
    id: "monitoring-ssrf",
    title: "İzleme & SSRF",
    icon: "Radio",
    tools: [
      { slug: "logging-failures", title: "A09 — Logging Failures" },
      { slug: "ssrf",             title: "A10 — SSRF" },
    ],
  },
];

export default function OwaspSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  return (
    <aside className="w-64 shrink-0 hidden lg:flex lg:flex-col border-r border-surface-3 bg-surface-1 overflow-y-auto sticky top-14 h-[calc(100vh-3.5rem)]">
      {/* Header */}
      <div className="px-4 py-4 border-b border-surface-3">
        <Link href="/owasp-top10" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="text-xs font-mono text-amber-400">OWASP</div>
            <div className="text-sm font-semibold text-terminal-white">Top 10 — 2021</div>
          </div>
        </Link>
      </div>

      {/* Categories */}
      <nav className="p-3 space-y-1">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] ?? AlertTriangle;
          const isOpen = !collapsed[cat.id];
          const hasActive = cat.tools.some(t => pathname.includes(t.slug));

          return (
            <div key={cat.id}>
              <button
                onClick={() => setCollapsed(s => ({ ...s, [cat.id]: !s[cat.id] }))}
                className={cn(
                  "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-semibold transition-colors",
                  hasActive ? "text-amber-300" : "text-terminal-comment hover:text-terminal-white"
                )}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="flex-1 text-left">{cat.title}</span>
                {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>

              {isOpen && (
                <div className="ml-5 mt-0.5 space-y-0.5 border-l border-surface-3 pl-2">
                  {cat.tools.map(tool => {
                    const active = pathname.includes(tool.slug);
                    return (
                      <Link
                        key={tool.slug}
                        href={`/owasp-top10/${tool.slug}`}
                        className={cn(
                          "flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-all",
                          active
                            ? "bg-amber-500/10 text-amber-300 border-l-2 border-amber-500 -ml-[2px]"
                            : "text-terminal-comment hover:text-terminal-white hover:bg-surface-2"
                        )}
                      >
                        {tool.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
