import Link from "next/link";
import { Terminal, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="terminal-window mb-6 text-left">
          <div className="terminal-header">
            <span className="terminal-dot bg-red-500" />
            <span className="terminal-dot bg-yellow-500" />
            <span className="terminal-dot bg-green-500" />
            <span className="text-xs text-terminal-comment mx-auto">terminal</span>
          </div>
          <div className="terminal-body">
            <div><span className="text-terminal-green">$</span> <span className="text-terminal-white">navigate /lost-path</span></div>
            <div className="text-terminal-red mt-1">bash: /lost-path: No such file or directory</div>
            <div className="text-terminal-comment mt-2">[error] 404 — Sayfa bulunamadı</div>
            <div className="text-terminal-green mt-1 animate-pulse">_</div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-terminal-white mb-2">404 — Sayfa Bulunamadı</h1>
        <p className="text-terminal-comment mb-6">Aradığın modül veya sayfa mevcut değil.</p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-terminal-green/10 text-terminal-green border border-terminal-green/30 hover:bg-terminal-green/20 transition-all text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
