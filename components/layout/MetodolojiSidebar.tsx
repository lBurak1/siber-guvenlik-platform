"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitBranch, ScrollText, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = { GitBranch, ScrollText };

const categories = [
  {
    id: "omurga",
    title: "Saldırı Zinciri",
    icon: "GitBranch",
    tools: [
      { slug: "saldiri-zinciri", title: "Pentest Metodolojisi & Saldırı Zinciri" },
    ],
  },
  {
    id: "pre-engagement",
    title: "Pre-Engagement",
    icon: "ScrollText",
    tools: [
      { slug: "kapsam-yetki", title: "Kapsam, Yetki & Yasal Çerçeve" },
    ],
  },
  {
    id: "ad-zinciri",
    title: "AD Saldırı Zinciri",
    icon: "GitBranch",
    tools: [
      { slug: "ad-saldiri-zinciri", title: "SMB'den Domain Admin'e — Tam AD Zinciri" },
    ],
  },
];

export default function MetodolojiSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  return (
    <aside className="w-64 shrink-0 border-r border-surface-3 bg-surface-1 overflow-y-auto sticky top-14 h-[calc(100vh-3.5rem)]">
      <div className="px-4 py-4 border-b border-surface-3">
        <Link href="/metodoloji" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20">
            <GitBranch className="w-4 h-4 text-fuchsia-400" />
          </div>
          <div>
            <div className="text-xs font-mono text-fuchsia-400">METODOLOJI</div>
            <div className="text-sm font-semibold text-terminal-white">Pentest Düşünme Biçimi</div>
          </div>
        </Link>
      </div>
      <nav className="p-3 space-y-1">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] ?? GitBranch;
          const isOpen = !collapsed[cat.id];
          const hasActive = cat.tools.some(t => pathname.includes(t.slug));
          return (
            <div key={cat.id}>
              <button
                onClick={() => setCollapsed(s => ({ ...s, [cat.id]: !s[cat.id] }))}
                className={cn("w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-semibold transition-colors",
                  hasActive ? "text-fuchsia-300" : "text-terminal-comment hover:text-terminal-white")}
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
                      <Link key={tool.slug} href={`/metodoloji/${tool.slug}`}
                        className={cn("flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-all",
                          active ? "bg-fuchsia-500/10 text-fuchsia-300 border-l-2 border-fuchsia-500 -ml-[2px]"
                                 : "text-terminal-comment hover:text-terminal-white hover:bg-surface-2")}
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
