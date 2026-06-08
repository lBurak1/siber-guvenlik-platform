import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const teamConfig = {
  "red-team": {
    label: "Red Team",
    shortLabel: "RED",
    color: "#ef4444",
    bgClass: "bg-red-500/10",
    borderClass: "border-red-500/30",
    textClass: "text-red-400",
    glowClass: "shadow-[0_0_20px_rgba(239,68,68,0.3)]",
    badgeClass: "bg-red-500/20 text-red-300 border-red-500/30",
    gradient: "from-red-900/20 to-transparent",
    description: "Ofansif Güvenlik — Saldırı tekniklerini öğren, savunmayı güçlendir",
  },
  "blue-team": {
    label: "Blue Team",
    shortLabel: "BLUE",
    color: "#3b82f6",
    bgClass: "bg-blue-500/10",
    borderClass: "border-blue-500/30",
    textClass: "text-blue-400",
    glowClass: "shadow-[0_0_20px_rgba(59,130,246,0.3)]",
    badgeClass: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    gradient: "from-blue-900/20 to-transparent",
    description: "Defansif Güvenlik — Tehditleri tespit et, sistemleri koru",
  },
  "purple-team": {
    label: "Purple Team",
    shortLabel: "PURPLE",
    color: "#a855f7",
    bgClass: "bg-purple-500/10",
    borderClass: "border-purple-500/30",
    textClass: "text-purple-400",
    glowClass: "shadow-[0_0_20px_rgba(168,85,247,0.3)]",
    badgeClass: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    gradient: "from-purple-900/20 to-transparent",
    description: "Senkronizasyon — Red ve Blue'yu birleştir, güvenlik döngüsünü kapat",
  },
  "network-fundamentals": {
    label: "Ağ Temelleri",
    shortLabel: "NET",
    color: "#10b981",
    bgClass: "bg-emerald-500/10",
    borderClass: "border-emerald-500/30",
    textClass: "text-emerald-400",
    glowClass: "shadow-[0_0_20px_rgba(16,185,129,0.3)]",
    badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    gradient: "from-emerald-900/20 to-transparent",
    description: "Ağ Temelleri — OSI, TCP/IP, Protokoller ve Güvenlik",
  },
  "linux-fundamentals": {
    label: "Linux Eğitimi",
    shortLabel: "LINUX",
    color: "#f97316",
    bgClass: "bg-orange-500/10",
    borderClass: "border-orange-500/30",
    textClass: "text-orange-400",
    glowClass: "shadow-[0_0_20px_rgba(249,115,22,0.3)]",
    badgeClass: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    gradient: "from-orange-900/20 to-transparent",
    description: "Linux Temelden İleriye — Terminal, Dosya Sistemi, Sistem Yönetimi",
  },
  "windows-fundamentals": {
    label: "Windows Eğitimi",
    shortLabel: "WIN",
    color: "#0ea5e9",
    bgClass: "bg-sky-500/10",
    borderClass: "border-sky-500/30",
    textClass: "text-sky-400",
    glowClass: "shadow-[0_0_20px_rgba(14,165,233,0.3)]",
    badgeClass: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    gradient: "from-sky-900/20 to-transparent",
    description: "Windows Temelden İleriye — CMD, PowerShell, Sistem Yönetimi",
  },
} as const;

export const riskConfig = {
  low:      { label: "Düşük Risk",    class: "bg-green-500/10 text-green-400 border-green-500/20" },
  medium:   { label: "Orta Risk",     class: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  high:     { label: "Yüksek Risk",   class: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  critical: { label: "Kritik Risk",   class: "bg-red-500/10 text-red-400 border-red-500/20" },
} as const;

export const difficultyConfig = {
  beginner: { label: "Başlangıç", class: "badge-beginner", order: 0 },
  intermediate: { label: "Orta Seviye", class: "badge-intermediate", order: 1 },
  advanced: { label: "İleri Seviye", class: "badge-advanced", order: 2 },
} as const;
