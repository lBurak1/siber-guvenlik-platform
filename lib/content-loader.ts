import { Tool, NetworkTopic, PortCheatSheet } from "./types";

// ─── Red Team Tools ──────────────────────────────────────────────────
const redTeamMap: Record<string, () => Promise<any>> = {
  "nmap":           () => import("@/content/red-team/nmap.json"),
  "gobuster":       () => import("@/content/red-team/gobuster.json"),
  "ffuf":           () => import("@/content/red-team/ffuf.json"),
  "sqlmap":         () => import("@/content/red-team/sqlmap.json"),
  "burpsuite":      () => import("@/content/red-team/burpsuite.json"),
  "osint-basics":   () => import("@/content/red-team/osint-basics.json"),
  "google-dorking": () => import("@/content/red-team/google-dorking.json"),
  "wifi-pentest":   () => import("@/content/red-team/wifi-pentest.json"),
  "mobile-pentest": () => import("@/content/red-team/mobile-pentest.json"),
  "linux-privesc":  () => import("@/content/red-team/linux-privesc.json"),
  "windows-privesc":() => import("@/content/red-team/windows-privesc.json"),
};

// ─── Blue Team Tools ─────────────────────────────────────────────────
const blueTeamMap: Record<string, () => Promise<any>> = {
  "wireshark":         () => import("@/content/blue-team/wireshark.json"),
  "log-analysis":      () => import("@/content/blue-team/log-analysis.json"),
  "siem":              () => import("@/content/blue-team/siem.json"),
  "endpoint-security": () => import("@/content/blue-team/endpoint-security.json"),
  "sandbox":           () => import("@/content/blue-team/sandbox.json"),
  "cti":               () => import("@/content/blue-team/cti.json"),
  "pam":               () => import("@/content/blue-team/pam.json"),
  "email-security":    () => import("@/content/blue-team/email-security.json"),
};

// ─── Purple Team Tools ───────────────────────────────────────────────
const purpleTeamMap: Record<string, () => Promise<any>> = {
  "purple-methodology": () => import("@/content/purple-team/purple-methodology.json"),
};

// ─── Network Fundamentals ────────────────────────────────────────────
const networkMap: Record<string, () => Promise<any>> = {
  "osi-tcpip":      () => import("@/content/network-fundamentals/osi-tcpip.json"),
  "tcp-handshake":  () => import("@/content/network-fundamentals/tcp-handshake.json"),
  "ip-subnetting":  () => import("@/content/network-fundamentals/ip-subnetting.json"),
  "protocols-deep": () => import("@/content/network-fundamentals/protocols-deep.json"),
};

// ─── Linux Fundamentals ───────────────────────────────────────────────
const linuxMap: Record<string, () => Promise<any>> = {
  "terminal-basics":       () => import("@/content/linux-fundamentals/terminal-basics.json"),
  "filesystem-navigation": () => import("@/content/linux-fundamentals/filesystem-navigation.json"),
  "file-operations":       () => import("@/content/linux-fundamentals/file-operations.json"),
  "text-processing":       () => import("@/content/linux-fundamentals/text-processing.json"),
  "permissions":           () => import("@/content/linux-fundamentals/permissions.json"),
  "process-management":    () => import("@/content/linux-fundamentals/process-management.json"),
  "networking-linux":      () => import("@/content/linux-fundamentals/networking-linux.json"),
  "package-management":    () => import("@/content/linux-fundamentals/package-management.json"),
  "bash-scripting":        () => import("@/content/linux-fundamentals/bash-scripting.json"),
};

// ─── Windows Fundamentals ─────────────────────────────────────────────
const windowsMap: Record<string, () => Promise<any>> = {
  "cmd-basics":          () => import("@/content/windows-fundamentals/cmd-basics.json"),
  "powershell-basics":   () => import("@/content/windows-fundamentals/powershell-basics.json"),
  "file-operations-win": () => import("@/content/windows-fundamentals/file-operations-win.json"),
  "system-management":   () => import("@/content/windows-fundamentals/system-management.json"),
  "networking-win":      () => import("@/content/windows-fundamentals/networking-win.json"),
};

// ─── OWASP Top 10 ────────────────────────────────────────────────────
const owaspMap: Record<string, () => Promise<any>> = {
  "broken-access-control":    () => import("@/content/owasp-top10/broken-access-control.json"),
  "cryptographic-failures":   () => import("@/content/owasp-top10/cryptographic-failures.json"),
  "injection":                () => import("@/content/owasp-top10/injection.json"),
  "insecure-design":          () => import("@/content/owasp-top10/insecure-design.json"),
  "security-misconfiguration":() => import("@/content/owasp-top10/security-misconfiguration.json"),
  "vulnerable-components":    () => import("@/content/owasp-top10/vulnerable-components.json"),
  "auth-failures":            () => import("@/content/owasp-top10/auth-failures.json"),
  "integrity-failures":       () => import("@/content/owasp-top10/integrity-failures.json"),
  "logging-failures":         () => import("@/content/owasp-top10/logging-failures.json"),
  "ssrf":                     () => import("@/content/owasp-top10/ssrf.json"),
};

// ─── Cheat Sheet ─────────────────────────────────────────────────────
const cheatsheetMap: Record<string, () => Promise<any>> = {
  "ssh":    () => import("@/content/cheatsheet/port-22-ssh.json"),
  "ftp":    () => import("@/content/cheatsheet/port-21-ftp.json"),
  "http":   () => import("@/content/cheatsheet/port-80-http.json"),
  "https":  () => import("@/content/cheatsheet/port-80-http.json"),
  "smb":    () => import("@/content/cheatsheet/port-445-smb.json"),
  "rdp":    () => import("@/content/cheatsheet/port-3389-rdp.json"),
  "mysql":  () => import("@/content/cheatsheet/port-3306-mysql.json"),
  "telnet": () => import("@/content/cheatsheet/port-23-telnet.json"),
  "smtp":   () => import("@/content/cheatsheet/port-25-smtp.json"),
};

// ─── Loaders ─────────────────────────────────────────────────────────
async function load<T>(map: Record<string, () => Promise<any>>, key: string): Promise<T | null> {
  const loader = map[key];
  if (!loader) return null;
  try {
    const mod = await loader();
    return (mod.default ?? mod) as T;
  } catch {
    return null;
  }
}

export async function getToolContent(team: string, slug: string): Promise<Tool | null> {
  const map: Record<string, Record<string, () => Promise<any>>> = {
    "red-team": redTeamMap,
    "blue-team": blueTeamMap,
    "purple-team": purpleTeamMap,
  };
  return load<Tool>(map[team] ?? {}, slug);
}

export async function getNetworkTopic(slug: string): Promise<NetworkTopic | null> {
  return load<NetworkTopic>(networkMap, slug);
}

export async function getLinuxTopic(slug: string): Promise<NetworkTopic | null> {
  return load<NetworkTopic>(linuxMap, slug);
}

export async function getWindowsTopic(slug: string): Promise<NetworkTopic | null> {
  return load<NetworkTopic>(windowsMap, slug);
}

export async function getOwaspTopic(slug: string): Promise<NetworkTopic | null> {
  return load<NetworkTopic>(owaspMap, slug);
}

export async function getCheatSheet(slug: string): Promise<PortCheatSheet | null> {
  return load<PortCheatSheet>(cheatsheetMap, slug);
}

export async function getAllCheatSheets(): Promise<PortCheatSheet[]> {
  const results = await Promise.all(
    Object.keys(cheatsheetMap).map((k) => load<PortCheatSheet>(cheatsheetMap, k))
  );
  // deduplicate by port
  const seen = new Set<number>();
  return results.filter((r): r is PortCheatSheet => {
    if (!r || seen.has(r.port)) return false;
    seen.add(r.port);
    return true;
  }).sort((a, b) => a.port - b.port);
}
