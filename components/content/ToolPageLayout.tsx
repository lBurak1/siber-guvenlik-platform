"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft, BookOpen, Terminal, Zap, FlaskConical,
  Download, Shield, ChevronRight, CheckCircle2, Star
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn, teamConfig, difficultyConfig } from "@/lib/utils";
import { Tool, Module, ContentSection } from "@/lib/types";
import { useProgressStore } from "@/lib/progress-store";
import TerminalBlock, { CodeBlock } from "./TerminalBlock";
import ScenarioBox from "./ScenarioBox";
import ModuleCard from "./ModuleCard";

const sectionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  theory: BookOpen,
  installation: Download,
  commands: Terminal,
  advanced: Zap,
  lab: FlaskConical,
  defense: Shield,
};

const sectionLabels: Record<string, string> = {
  theory: "Giriş & Teori",
  installation: "Kurulum",
  commands: "Temel Komutlar",
  advanced: "İleri Seviye",
  lab: "CTF Senaryosu",
  defense: "Savunma",
};

interface ToolPageLayoutProps {
  tool: Tool;
  activeModuleId?: string;
}

export default function ToolPageLayout({ tool, activeModuleId }: ToolPageLayoutProps) {
  const pathname = usePathname();
  const { markComplete, isComplete, toggleFavorite, isFavorite } = useProgressStore();
  const cfg = teamConfig[tool.team];
  const teamColor = tool.team.replace("-team", "");

  // If no active module, show module list
  if (!activeModuleId) {
    return (
      <div className="flex-1 p-6 max-w-4xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-terminal-comment mb-6">
          <Link href={`/${tool.team}`} className="hover:text-terminal-white transition-colors">
            {cfg.label}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className={cfg.textClass}>{tool.title}</span>
        </div>

        {/* Tool header */}
        <div className={cn("rounded-xl border p-6 mb-8 bg-gradient-to-br", cfg.gradient, cfg.borderClass)}>
          <div className="flex items-start gap-4">
            <div className={cn("text-4xl p-3 rounded-xl border", cfg.bgClass, cfg.borderClass)}>
              {tool.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className={cn("text-xs font-mono px-2 py-0.5 rounded-full border", cfg.badgeClass)}>
                  {cfg.shortLabel} TEAM
                </span>
                <span className="text-xs text-terminal-comment font-mono">{tool.phase}</span>
              </div>
              <h1 className="text-2xl font-bold text-terminal-white">{tool.title}</h1>
              <p className="text-sm text-terminal-comment mt-2 leading-relaxed">{tool.subtitle}</p>
              <p className="text-sm text-terminal-white/70 mt-2 leading-relaxed">{tool.description}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {tool.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded font-mono bg-surface-2 text-terminal-comment border border-surface-3">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modules */}
        <h2 className="text-sm font-mono font-semibold text-terminal-comment uppercase tracking-wider mb-4">
          Eğitim Modülleri
        </h2>
        <div className="grid gap-3">
          {tool.modules.map((module, i) => (
            <ModuleCard
              key={module.id}
              module={module}
              href={`/${tool.team}/${tool.slug}/${module.id}`}
              progressKey={`${tool.team}/${tool.id}/${module.id}`}
              teamColor={teamColor}
              index={i}
            />
          ))}
        </div>
      </div>
    );
  }

  // Active module view
  const module = tool.modules.find((m) => m.id === activeModuleId);
  if (!module) return <div className="p-8 text-terminal-comment">Modül bulunamadı.</div>;

  const progressKey = `${tool.team}/${tool.id}/${module.id}`;
  const completed = isComplete(progressKey);
  const diffCfg = difficultyConfig[module.difficulty];

  return (
    <div className="flex-1 min-w-0">
      <div className="max-w-4xl mx-auto p-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-terminal-comment mb-6 flex-wrap">
          <Link href={`/${tool.team}`} className="hover:text-terminal-white transition-colors">{cfg.label}</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/${tool.team}/${tool.slug}`} className="hover:text-terminal-white transition-colors">{tool.title}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className={cfg.textClass}>{module.title}</span>
        </div>

        {/* Module header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={cn("text-xs px-2 py-0.5 rounded-full border font-mono", diffCfg.class)}>
              {diffCfg.label}
            </span>
            <span className="text-xs text-terminal-comment font-mono">{module.duration}</span>
          </div>
          <h1 className="text-2xl font-bold text-terminal-white">{module.title}</h1>
          <p className="text-terminal-comment mt-2 leading-relaxed">{module.description}</p>
        </div>

        {/* Section tabs */}
        <div className="flex gap-1 overflow-x-auto pb-2 mb-8 border-b border-surface-3">
          {module.sections.map((section) => {
            const Icon = sectionIcons[section.type] ?? BookOpen;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-t-md text-xs font-mono whitespace-nowrap transition-colors",
                  "text-terminal-comment hover:text-terminal-white hover:bg-surface-2"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {sectionLabels[section.type] ?? section.title}
              </a>
            );
          })}
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {module.sections.map((section) => (
            <SectionRenderer key={section.id} section={section} teamColor={teamColor} />
          ))}
        </div>

        {/* Complete button */}
        <div className="mt-12 border-t border-surface-3 pt-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex gap-3">
            {tool.modules.findIndex((m) => m.id === activeModuleId) > 0 && (
              <Link
                href={`/${tool.team}/${tool.slug}/${tool.modules[tool.modules.findIndex((m) => m.id === activeModuleId) - 1].id}`}
                className="text-sm text-terminal-comment hover:text-terminal-white flex items-center gap-2 border border-surface-3 rounded-lg px-4 py-2 hover:bg-surface-2 transition-all"
              >
                ← Önceki
              </Link>
            )}
            {tool.modules.findIndex((m) => m.id === activeModuleId) < tool.modules.length - 1 && (
              <Link
                href={`/${tool.team}/${tool.slug}/${tool.modules[tool.modules.findIndex((m) => m.id === activeModuleId) + 1].id}`}
                className={cn(
                  "text-sm flex items-center gap-2 rounded-lg px-4 py-2 transition-all border",
                  cfg.textClass, cfg.bgClass, cfg.borderClass, "hover:opacity-80"
                )}
              >
                Sonraki →
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite({ url: pathname, title: `${tool.title} · ${module.title}`, cat: cfg.label })}
              title="Favorilere ekle / çıkar"
              className={cn(
                "flex items-center gap-2 text-sm font-medium rounded-lg px-4 py-2.5 border transition-all",
                isFavorite(pathname)
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                  : "bg-surface-2 border-surface-3 text-terminal-comment hover:text-amber-300 hover:border-amber-500/30"
              )}
            >
              <Star className={cn("w-4 h-4", isFavorite(pathname) && "fill-amber-400")} />
              {isFavorite(pathname) ? "Favoride" : "Favori"}
            </button>
            <button
              onClick={() => completed ? undefined : markComplete(progressKey)}
              className={cn(
                "flex items-center gap-2 text-sm font-medium rounded-lg px-5 py-2.5 border transition-all",
                completed
                  ? "bg-green-500/10 border-green-500/30 text-green-400 cursor-default"
                  : "bg-surface-2 border-surface-3 text-terminal-comment hover:bg-surface-3 hover:text-terminal-white"
              )}
            >
              <CheckCircle2 className="w-4 h-4" />
              {completed ? "Tamamlandı ✓" : "Tamamlandı Olarak İşaretle"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionRenderer({ section, teamColor }: { section: ContentSection; teamColor: string }) {
  const Icon = sectionIcons[section.type] ?? BookOpen;
  const label = sectionLabels[section.type] ?? section.title;

  return (
    <section id={section.id} className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-surface-2 border border-surface-3">
          <Icon className="w-4 h-4 text-terminal-comment" />
        </div>
        <h2 className="text-lg font-semibold text-terminal-white">{section.title}</h2>
      </div>

      {/* Theory content — Markdown rendered */}
      {section.content && (
        <div className="markdown-content text-sm text-terminal-white/80 leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => <h1 className="text-xl font-bold text-terminal-white mt-6 mb-3">{children}</h1>,
              h2: ({ children }) => <h2 className="text-lg font-bold text-terminal-white mt-5 mb-2">{children}</h2>,
              h3: ({ children }) => <h3 className="text-base font-semibold text-terminal-white mt-4 mb-2">{children}</h3>,
              p: ({ children }) => <p className="mb-3 leading-relaxed">{children}</p>,
              strong: ({ children }) => <strong className="text-terminal-white font-semibold">{children}</strong>,
              em: ({ children }) => <em className="text-terminal-comment italic">{children}</em>,
              code: ({ children, className }) => {
                const isBlock = className?.includes("language-");
                return isBlock
                  ? <code className="block bg-surface-2 border border-surface-3 rounded-lg p-4 font-mono text-xs text-terminal-green overflow-x-auto whitespace-pre my-3">{children}</code>
                  : <code className="bg-surface-2 text-terminal-cyan font-mono text-xs px-1.5 py-0.5 rounded border border-surface-3">{children}</code>;
              },
              pre: ({ children }) => <div className="my-3">{children}</div>,
              ul: ({ children }) => <ul className="list-none space-y-1.5 mb-3 ml-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside space-y-1.5 mb-3 ml-2 text-terminal-white/80">{children}</ol>,
              li: ({ children }) => (
                <li className="flex items-start gap-2">
                  <span className="text-terminal-green mt-0.5 shrink-0">▸</span>
                  <span>{children}</span>
                </li>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-4 rounded-lg border border-surface-3">
                  <table className="w-full text-xs">{children}</table>
                </div>
              ),
              thead: ({ children }) => <thead className="bg-surface-2 border-b border-surface-3">{children}</thead>,
              th: ({ children }) => <th className="px-4 py-2.5 text-left font-mono font-semibold text-terminal-white whitespace-nowrap">{children}</th>,
              td: ({ children }) => <td className="px-4 py-2.5 text-terminal-comment border-b border-surface-3/50 last:border-0">{children}</td>,
              tr: ({ children }) => <tr className="hover:bg-surface-2/50 transition-colors">{children}</tr>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-terminal-green/50 pl-4 my-3 text-terminal-comment italic">{children}</blockquote>
              ),
              hr: () => <hr className="border-surface-3 my-4" />,
            }}
          >
            {section.content}
          </ReactMarkdown>
        </div>
      )}

      {/* Installation */}
      {section.installation && (
        <div className="space-y-4">
          {section.installation.note && (
            <p className="text-sm text-terminal-comment">{section.installation.note}</p>
          )}
          {section.installation.linux && (
            <div>
              <div className="text-xs font-mono text-terminal-comment mb-2">🐧 Linux / Kali:</div>
              {section.installation.linux.map((cmd, i) => (
                <TerminalBlock key={i} command={cmd} />
              ))}
            </div>
          )}
          {section.installation.windows && (
            <div>
              <div className="text-xs font-mono text-terminal-comment mb-2">🪟 Windows:</div>
              {section.installation.windows.map((cmd, i) => (
                <TerminalBlock key={i} command={cmd} />
              ))}
            </div>
          )}
          {section.installation.macos && (
            <div>
              <div className="text-xs font-mono text-terminal-comment mb-2">🍎 macOS:</div>
              {section.installation.macos.map((cmd, i) => (
                <TerminalBlock key={i} command={cmd} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Commands */}
      {section.commands && (
        <div className="space-y-6">
          {section.commands.map((cmd, i) => (
            <div key={i} className="space-y-1">
              <h3 className="text-sm font-semibold text-terminal-white">{i + 1}. {cmd.description}</h3>
              <TerminalBlock
                command={cmd.command}
                output={cmd.output}
                warning={cmd.warning}
                tip={cmd.tip}
              />
              {cmd.flags && cmd.flags.length > 0 && (
                <div className="mt-2 bg-surface-1 border border-surface-3 rounded-lg overflow-hidden">
                  <div className="px-4 py-2 border-b border-surface-3 text-xs font-mono text-terminal-comment">
                    Parametreler
                  </div>
                  <table className="w-full text-xs">
                    <tbody>
                      {cmd.flags.map((flag, fi) => (
                        <tr key={fi} className="border-b border-surface-3 last:border-0">
                          <td className="px-4 py-2.5 font-mono text-terminal-cyan whitespace-nowrap w-1/3">
                            {flag.flag}
                          </td>
                          <td className="px-4 py-2.5 text-terminal-comment">{flag.description}</td>
                          {flag.example && (
                            <td className="px-4 py-2.5 font-mono text-terminal-comment/60 text-right">
                              {flag.example}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Lab scenario */}
      {section.scenario && (
        <ScenarioBox scenario={section.scenario} teamColor={teamColor} />
      )}
    </section>
  );
}
