"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, FolderOpen, Cpu, Network, Package, Code, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Terminal, FolderOpen, Cpu, Network, Package, Code,
};

const categories = [
  {
    id: "basics",
    title: "Terminal Temelleri",
    icon: "Terminal",
    tools: [
      { slug: "terminal-basics",       title: "Terminal & Shell" },
      { slug: "filesystem-navigation", title: "Dosya Sistemi Navigasyonu" },
    ],
  },
  {
    id: "file-ops",
    title: "Dosya İşlemleri",
    icon: "FolderOpen",
    tools: [
      { slug: "file-operations", title: "Dosya & Dizin Yönetimi" },
      { slug: "text-processing", title: "Metin İşleme & Pipe" },
    ],
  },
  {
    id: "system",
    title: "Sistem Yönetimi",
    icon: "Cpu",
    tools: [
      { slug: "permissions",        title: "İzinler & Kullanıcılar" },
      { slug: "process-management", title: "Süreç Yönetimi" },
    ],
  },
  {
    id: "network-linux",
    title: "Ağ Komutları",
    icon: "Network",
    tools: [
      { slug: "networking-linux", title: "Ağ Komutları" },
    ],
  },
  {
    id: "packages",
    title: "Paket Yönetimi",
    icon: "Package",
    tools: [
      { slug: "package-management", title: "APT, dpkg, pip" },
    ],
  },
  {
    id: "scripting",
    title: "Bash Scripting",
    icon: "Code",
    tools: [
      { slug: "bash-scripting", title: "Bash Script Temelleri" },
    ],
  },
];

export default function LinuxSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  return (
    <aside className="w-64 shrink-0 hidden lg:flex lg:flex-col border-r border-surface-3 bg-surface-1 overflow-y-auto sticky top-14 h-[calc(100vh-3.5rem)]">
      {/* Header */}
      <div className="px-4 py-4 border-b border-surface-3">
        <Link href="/linux-fundamentals" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <Terminal className="w-4 h-4 text-orange-400" />
          </div>
          <div>
            <div className="text-xs font-mono text-orange-400">LINUX</div>
            <div className="text-sm font-semibold text-terminal-white">Eğitim Modülü</div>
          </div>
        </Link>
      </div>

      {/* Categories */}
      <nav className="p-3 space-y-1">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] ?? Terminal;
          const isOpen = !collapsed[cat.id];
          const hasActive = cat.tools.some(t => pathname.includes(t.slug));

          return (
            <div key={cat.id}>
              <button
                onClick={() => setCollapsed(s => ({ ...s, [cat.id]: !s[cat.id] }))}
                className={cn(
                  "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-semibold transition-colors",
                  hasActive ? "text-orange-300" : "text-terminal-comment hover:text-terminal-white"
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
                        href={`/linux-fundamentals/${tool.slug}`}
                        className={cn(
                          "flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-all",
                          active
                            ? "bg-orange-500/10 text-orange-300 border-l-2 border-orange-500 -ml-[2px]"
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
