import Link from "next/link";
import { Database, ArrowRight } from "lucide-react";

const topics = [
  { slug: "veritabani-nedir", icon: "🗄️", title: "Veritabanı Nedir?",          desc: "RDBMS vs NoSQL, tablo/satır/sütun, primary/foreign key, ACID kavramları", level: "Başlangıç" },
  { slug: "sql-temelleri",    icon: "📊", title: "SQL Temelleri",               desc: "SELECT, INSERT, UPDATE, DELETE, WHERE, JOIN + SQL Injection bağlantısı", level: "Başlangıç–Orta" },
  { slug: "mysql-yonetim",    icon: "🐬", title: "MySQL Yönetimi",              desc: "Kullanıcı/GRANT, veritabanı işlemleri, yedek + nasıl sızılır", level: "Orta" },
  { slug: "db-cesitleri",     icon: "🧩", title: "MSSQL, PostgreSQL & NoSQL",   desc: "Diğer DB komutları, MongoDB/Redis ve her birinin saldırı yüzeyi", level: "Orta" },
];

export default function DatabaseFundamentalsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Database className="w-7 h-7 text-lime-400" />
        <h1 className="text-2xl font-bold text-terminal-white">Veritabanları</h1>
      </div>
      <p className="text-terminal-comment mb-8 ml-10">
        Veritabanı nedir, SQL komutları, yönetim ve nasıl sızılır — temelden detaya. SQL Injection'ı anlamak için önce SQL'i öğren.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {topics.map((t, i) => (
          <Link key={t.slug} href={`/database-fundamentals/${t.slug}`} className="group">
            <div className="module-card border border-surface-3 hover:border-lime-500/40 hover:shadow-[0_0_20px_rgba(132,204,22,0.08)] transition-all h-full">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.icon}</span>
                  <div>
                    <div className="text-xs font-mono text-terminal-comment mb-0.5"><span className="text-lime-400/60">#{String(i + 1).padStart(2, "0")}</span></div>
                    <h3 className="font-semibold text-terminal-white group-hover:text-lime-300 transition-colors text-sm">{t.title}</h3>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-terminal-comment group-hover:text-lime-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </div>
              <p className="text-xs text-terminal-comment leading-relaxed">{t.desc}</p>
              <span className="mt-3 inline-block text-xs font-mono text-lime-400/70 bg-lime-500/5 border border-lime-500/15 px-2 py-0.5 rounded">{t.level}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
