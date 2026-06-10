export type TeamType = "red-team" | "blue-team" | "purple-team" | "network-fundamentals" | "linux-fundamentals" | "windows-fundamentals" | "owasp-top10" | "devops-fundamentals" | "certifications" | "ecosystem";
export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface CommandFlag {
  flag: string;
  description: string;
  example?: string;
}

export interface CommandExample {
  command: string;
  description: string;
  output?: string;
  flags?: CommandFlag[];
  warning?: string;
  tip?: string;
}

export interface LabScenario {
  title: string;
  objective: string;
  environment: string;
  difficulty: Difficulty;
  steps: string[];
  hints: string[];
  expectedOutput?: string;
  flag?: string;
  defenseNote?: string;
}

export interface ContentSection {
  id: string;
  type: "theory" | "commands" | "advanced" | "lab" | "installation" | "defense";
  title: string;
  content?: string;
  commands?: CommandExample[];
  scenario?: LabScenario;
  installation?: {
    linux?: string[];
    windows?: string[];
    macos?: string[];
    note?: string;
  };
}

export interface Module {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  duration: string;
  sections: ContentSection[];
}

export interface Tool {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  team: TeamType;
  category: string;
  phase: string;
  icon: string;
  color: string;
  modules: Module[];
  tags: string[];
}

export interface NavItem {
  id: string;
  title: string;
  slug: string;
  icon?: string;
  children?: NavItem[];
}

// ─── Cheat Sheet Types ──────────────────────────────────────────────
export interface CheatCommand {
  label: string;          // kısa etiket (örn: "SYN Scan")
  command: string;        // kopyalanabilir komut
  description: string;    // ne yapar
  tip?: string;
  warning?: string;
  output?: string;
}

export interface CheatSection {
  id: string;
  title: string;          // (örn: "Nmap Enumeration")
  commands: CheatCommand[];
}

export interface PortCheatSheet {
  port: number;
  service: string;        // "SSH"
  protocol: string;       // "TCP"
  description: string;
  risk: "low" | "medium" | "high" | "critical";
  sections: CheatSection[];
  defenseNote: string;
}

// ─── Network Fundamentals Types ─────────────────────────────────────
export interface NetworkTopic {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  order: number;
  modules: Module[];
  tags: string[];
}
