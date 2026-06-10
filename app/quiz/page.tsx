"use client";
import { useState } from "react";
import Link from "next/link";
import { quizzes, type Quiz } from "@/lib/quizzes";
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, ArrowLeft, Trophy, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";

const colorText: Record<string, string> = {
  orange: "text-orange-400", emerald: "text-emerald-400", red: "text-red-400",
  blue: "text-blue-400", teal: "text-teal-400", indigo: "text-indigo-400",
};
const colorBorder: Record<string, string> = {
  orange: "hover:border-orange-500/40", emerald: "hover:border-emerald-500/40", red: "hover:border-red-500/40",
  blue: "hover:border-blue-500/40", teal: "hover:border-teal-500/40", indigo: "hover:border-indigo-500/40",
};

export default function QuizPage() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const start = (q: Quiz) => { setQuiz(q); setStep(0); setSelected(null); setAnswered(false); setScore(0); setDone(false); };
  const reset = () => { setQuiz(null); setDone(false); };

  // Kategori seçimi
  if (!quiz) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <ListChecks className="w-7 h-7 text-terminal-green" />
          <h1 className="text-2xl font-bold text-terminal-white">Kendini Test Et</h1>
        </div>
        <p className="text-terminal-comment mb-8 ml-10">
          Bir kategori seç, kısa quiz ile bilgini ölç. Her soruda anında geri bildirim ve açıklama alırsın.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map((q) => (
            <button key={q.slug} onClick={() => start(q)}
              className={cn("text-left rounded-2xl border border-surface-3 bg-surface-1 p-5 transition-all hover:-translate-y-1", colorBorder[q.color])}>
              <div className="text-3xl mb-2">{q.icon}</div>
              <h3 className={cn("font-bold text-terminal-white mb-1")}>{q.title}</h3>
              <p className="text-xs text-terminal-comment">{q.questions.length} soru</p>
              <div className={cn("mt-3 flex items-center gap-1 text-sm font-semibold", colorText[q.color])}>
                Başla <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Sonuç
  if (done) {
    const pct = Math.round((score / quiz.questions.length) * 100);
    const msg = pct >= 80 ? "Mükemmel! 🎉" : pct >= 50 ? "İyi gidiyorsun 👍" : "Tekrar çalışmakta fayda var 📚";
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <Trophy className={cn("w-16 h-16 mx-auto mb-4", pct >= 50 ? "text-amber-400" : "text-terminal-comment")} />
        <h1 className="text-2xl font-bold text-terminal-white mb-2">{quiz.title} — Sonuç</h1>
        <div className="text-5xl font-bold font-mono text-terminal-white my-4">
          {score}<span className="text-2xl text-terminal-comment">/{quiz.questions.length}</span>
        </div>
        <div className="text-lg text-terminal-green font-semibold mb-1">%{pct}</div>
        <p className="text-terminal-comment mb-8">{msg}</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={() => start(quiz)} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-terminal-green/10 text-terminal-green border border-terminal-green/30 hover:bg-terminal-green/20 text-sm font-medium transition-all">
            <RotateCcw className="w-4 h-4" /> Tekrar Çöz
          </button>
          <button onClick={reset} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface-2 text-terminal-comment border border-surface-3 hover:text-terminal-white text-sm transition-all">
            <ArrowLeft className="w-4 h-4" /> Kategoriler
          </button>
        </div>
      </div>
    );
  }

  // Soru
  const question = quiz.questions[step];
  const submit = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === question.answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (step < quiz.questions.length - 1) {
      setStep(step + 1); setSelected(null); setAnswered(false);
    } else {
      setDone(true);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <button onClick={reset} className="text-xs text-terminal-comment hover:text-terminal-white flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> {quiz.icon} {quiz.title}
        </button>
        <span className="text-xs font-mono text-terminal-comment">Soru {step + 1}/{quiz.questions.length} · Puan: {score}</span>
      </div>
      <div className="flex items-center gap-1.5 mb-6">
        {quiz.questions.map((_, i) => (
          <div key={i} className={cn("h-1.5 flex-1 rounded-full", i < step ? "bg-terminal-green" : i === step ? "bg-terminal-green/50" : "bg-surface-3")} />
        ))}
      </div>

      <div className="bg-surface-1 border border-surface-3 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-terminal-white mb-5">{question.q}</h2>
        <div className="space-y-2.5">
          {question.options.map((opt, i) => {
            const isCorrect = i === question.answer;
            const isSelected = i === selected;
            let style = "bg-surface-2 border-surface-3 hover:border-terminal-green/40 text-terminal-white/90";
            if (answered) {
              if (isCorrect) style = "bg-green-500/10 border-green-500/40 text-green-300";
              else if (isSelected) style = "bg-red-500/10 border-red-500/40 text-red-300";
              else style = "bg-surface-2 border-surface-3 text-terminal-comment opacity-60";
            }
            return (
              <button key={i} onClick={() => submit(i)} disabled={answered}
                className={cn("w-full text-left px-4 py-3 rounded-lg border text-sm transition-all flex items-center justify-between", style)}>
                {opt}
                {answered && isCorrect && <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />}
                {answered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mt-4 p-3 rounded-lg bg-surface-2 border border-surface-3 text-sm text-terminal-white/80">
            <span className="font-semibold text-terminal-green">Açıklama: </span>{question.explain}
          </div>
        )}
      </div>

      {answered && (
        <button onClick={next} className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-terminal-green/10 text-terminal-green border border-terminal-green/30 hover:bg-terminal-green/20 font-semibold transition-all">
          {step < quiz.questions.length - 1 ? "Sonraki Soru" : "Sonucu Gör"} <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
