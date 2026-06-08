import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";

const owasp = [
  {
    id: "A01",
    slug: "broken-access-control",
    title: "Broken Access Control",
    desc: "Yetki kontrolü atlatma, IDOR, path traversal, privilege escalation — en yaygın web zafiyeti",
    risk: "Kritik",
    techniques: ["IDOR", "Path Traversal", "JWT Manipulation", "Force Browsing"],
  },
  {
    id: "A02",
    slug: "cryptographic-failures",
    title: "Cryptographic Failures",
    desc: "Zayıf şifreleme, düz metin hassas veri, eski protokoller (MD5/SHA1), SSL stripping",
    risk: "Kritik",
    techniques: ["MD5 Crack", "SSL Strip", "Padding Oracle", "JWT None Alg"],
  },
  {
    id: "A03",
    slug: "injection",
    title: "Injection",
    desc: "SQL, NoSQL, Command, LDAP, XSS injection — kullanıcı verisi ile yorumlayıcıyı kandır",
    risk: "Kritik",
    techniques: ["SQLi", "XSS", "Command Injection", "SSTI", "XXE"],
  },
  {
    id: "A04",
    slug: "insecure-design",
    title: "Insecure Design",
    desc: "Tasarım aşamasındaki güvenlik eksiklikleri, iş mantığı hataları, threat modeling yokluğu",
    risk: "Yüksek",
    techniques: ["Business Logic Bypass", "Rate Limit Bypass", "Race Condition"],
  },
  {
    id: "A05",
    slug: "security-misconfiguration",
    title: "Security Misconfiguration",
    desc: "Varsayılan şifreler, açık directory listing, debug modu, gereksiz servisler, hata mesajları",
    risk: "Yüksek",
    techniques: ["Directory Listing", "Default Creds", "Debug Info Leak", "CORS Misconfiguration"],
  },
  {
    id: "A06",
    slug: "vulnerable-components",
    title: "Vulnerable & Outdated Components",
    desc: "Eski kütüphane versiyonları, Log4Shell, CVE istismarı, bağımlılık zinciri saldırıları",
    risk: "Yüksek",
    techniques: ["Log4Shell", "CVE Exploitation", "Supply Chain Attack", "Dependency Confusion"],
  },
  {
    id: "A07",
    slug: "auth-failures",
    title: "Identification & Authentication Failures",
    desc: "Brute force, credential stuffing, zayıf parola politikası, güvensiz oturum yönetimi",
    risk: "Yüksek",
    techniques: ["Brute Force", "Credential Stuffing", "Session Fixation", "Weak JWT"],
  },
  {
    id: "A08",
    slug: "integrity-failures",
    title: "Software & Data Integrity Failures",
    desc: "İmzasız update, güvensiz CI/CD, deserialization saldırıları, supply chain",
    risk: "Yüksek",
    techniques: ["Insecure Deserialization", "CI/CD Poisoning", "Unsigned Updates"],
  },
  {
    id: "A09",
    slug: "logging-failures",
    title: "Security Logging & Monitoring Failures",
    desc: "Yetersiz log kaydı, alarm yokluğu, saldırının fark edilmemesi, log injection",
    risk: "Orta",
    techniques: ["Log Injection", "Log Forging", "Evasion via Log Gaps"],
  },
  {
    id: "A10",
    slug: "ssrf",
    title: "Server-Side Request Forgery (SSRF)",
    desc: "Sunucuyu iç ağa istek attır, cloud metadata çal, iç servislere eriş",
    risk: "Yüksek",
    techniques: ["Cloud Metadata SSRF", "Internal Port Scan", "Protocol Smuggling", "Blind SSRF"],
  },
];

const riskColor: Record<string, string> = {
  "Kritik": "text-red-400 bg-red-500/10 border-red-500/20",
  "Yüksek": "text-orange-400 bg-orange-500/10 border-orange-500/20",
  "Orta":   "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
};

export default function OwaspPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <AlertTriangle className="w-7 h-7 text-amber-400" />
        <h1 className="text-2xl font-bold text-terminal-white">OWASP Top 10 — 2021</h1>
      </div>
      <p className="text-terminal-comment mb-2 ml-10">
        Web uygulama güvenliğinin en kritik 10 riski. Her zafiyet için saldırı vektörü, gerçek dünya örnekleri, exploit teknikleri ve savunma rehberi.
      </p>
      <div className="ml-10 mb-8 flex items-center gap-2">
        <span className="text-xs font-mono text-amber-400/70 bg-amber-500/5 border border-amber-500/15 px-2 py-0.5 rounded">
          🔒 Tüm içerik yalnızca CTF / izinli lab ortamları içindir
        </span>
      </div>

      <div className="space-y-3">
        {owasp.map((item, i) => (
          <Link key={item.slug} href={`/owasp-top10/${item.slug}`} className="group block">
            <div className="module-card border border-surface-3 hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.08)] transition-all">
              <div className="flex items-start gap-4">
                {/* Number badge */}
                <div className="shrink-0 w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <span className="text-xs font-mono font-bold text-amber-400">{item.id}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-terminal-white group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs font-mono px-2 py-0.5 rounded border ${riskColor[item.risk]}`}>
                        {item.risk}
                      </span>
                      <ArrowRight className="w-4 h-4 text-terminal-comment group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                  <p className="text-xs text-terminal-comment mt-1 leading-relaxed">{item.desc}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.techniques.map(t => (
                      <span key={t} className="text-xs font-mono text-amber-400/60 bg-amber-500/5 border border-amber-500/10 px-1.5 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
