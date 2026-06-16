"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, Award, GraduationCap, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Map, Award, GraduationCap,
};

const categories = [
  {
    id: "guide",
    title: "Yol Haritası",
    icon: "Map",
    tools: [
      { slug: "roadmap", title: "Yol Haritası & Seçim Rehberi" },
    ],
  },
  {
    id: "by-level",
    title: "Seviyeye Göre",
    icon: "Award",
    tools: [
      { slug: "entry-level",      title: "Başlangıç (Security+, eJPT)" },
      { slug: "offensive",        title: "Ofansif (OSCP, CRTP)" },
      { slug: "defensive",        title: "Defansif (CySA+, BTL1)" },
      { slug: "management-cloud", title: "Yönetim & Cloud (CISSP)" },
    ],
  },
];

export default function CertSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  return (
    <aside className="w-64 shrink-0 hidden lg:flex lg:flex-col border-r border-surface-3 bg-surface-1 overflow-y-auto sticky top-14 h-[calc(100vh-3.5rem)]">
      {/* Header */}
      <div className="px-4 py-4 border-b border-surface-3">
        <Link href="/certifications" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <div className="text-xs font-mono text-indigo-400">CERT</div>
            <div className="text-sm font-semibold text-terminal-white">Sertifika Rehberi</div>
          </div>
        </Link>
      </div>

      {/* Categories */}
      <nav className="p-3 space-y-1">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] ?? Award;
          const isOpen = !collapsed[cat.id];
          const hasActive = cat.tools.some(t => pathname.includes(t.slug));

          return (
            <div key={cat.id}>
              <button
                onClick={() => setCollapsed(s => ({ ...s, [cat.id]: !s[cat.id] }))}
                className={cn(
                  "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-semibold transition-colors",
                  hasActive ? "text-indigo-300" : "text-terminal-comment hover:text-terminal-white"
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
                        href={`/certifications/${tool.slug}`}
                        className={cn(
                          "flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-all",
                          active
                            ? "bg-indigo-500/10 text-indigo-300 border-l-2 border-indigo-500 -ml-[2px]"
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
