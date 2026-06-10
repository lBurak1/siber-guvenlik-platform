"use client";
import { useState } from "react";
import Link from "next/link";
import { GraduationCap, RotateCcw, ArrowRight, Clock, Target, Wallet, TrendingUp } from "lucide-react";

type Path = "offensive" | "defensive" | "management" | "cloud" | "beginner";

interface Question {
  id: string;
  q: string;
  icon: React.ElementType;
  options: { label: string; value: string }[];
}

const questions: Question[] = [
  {
    id: "interest",
    q: "Hangi alan seni daha çok heyecanlandırıyor?",
    icon: Target,
    options: [
      { label: "Sistemlere sızmak, zafiyet bulmak (saldırı)", value: "offensive" },
      { label: "Saldırıları tespit edip durdurmak (savunma)", value: "defensive" },
      { label: "Politika, risk, ekip yönetimi (yönetim)", value: "management" },
      { label: "Bulut altyapısı güvenliği (cloud)", value: "cloud" },
    ],
  },
  {
    id: "experience",
    q: "Deneyim seviyen nedir?",
    icon: TrendingUp,
    options: [
      { label: "Yeni başlıyorum", value: "beginner" },
      { label: "1-2 yıl tecrübem var", value: "mid" },
      { label: "3+ yıl tecrübeliyim", value: "senior" },
    ],
  },
  {
    id: "style",
    q: "Nasıl öğrenmeyi seversin?",
    icon: GraduationCap,
    options: [
      { label: "Elini kirleterek, pratik lab yaparak", value: "hands-on" },
      { label: "Kavramları ve teoriyi okuyarak", value: "theory" },
    ],
  },
  {
    id: "budget",
    q: "Bütçen ne durumda?",
    icon: Wallet,
    options: [
      { label: "Kısıtlı — uygun fiyatlı tercih ederim", value: "low" },
      { label: "Orta seviye", value: "mid" },
      { label: "Yüksek / işverenim ödeyecek", value: "high" },
    ],
  },
];

interface Recommendation {
  title: string;
  path: Path;
  primary: { name: string; prep: string; why: string; slug: string };
  roadmap: string[];
  note: string;
}

function recommend(a: Record<string, string>): Recommendation {
  const interest = (a.interest ?? "beginner") as Path;
  const exp = a.experience ?? "beginner";
  const budget = a.budget ?? "mid";

  // Yeni başlayan + emin değilse temelden başlat
  if (exp === "beginner" && (interest === "management")) {
    return {
      title: "Önce Temel, Sonra Yönetim",
      path: "beginner",
      primary: { name: "CompTIA Security+", prep: "1-2 ay", why: "Yönetim yoluna gitsen bile önce teknik temel şart. Security+ sektörün giriş standardı.", slug: "entry-level" },
      roadmap: ["Network+ (opsiyonel, 1 ay)", "Security+ (1-2 ay)", "Deneyim kazan (1-3 yıl)", "CISSP (yönetim hedefi)"],
      note: "CISSP 5 yıl deneyim ister — şimdilik Security+ ile başla, deneyim biriktir.",
    };
  }

  if (interest === "offensive") {
    return {
      title: "Ofansif Yol — Red Team / Pentest",
      path: "offensive",
      primary: exp === "senior"
        ? { name: "OSCP", prep: "4-8 ay", why: "Tecrüben var — sektörün altın standardı OSCP ile becerini kanıtla.", slug: "offensive" }
        : { name: "eJPT", prep: "1-2 ay", why: "Pratik pentest'e ideal giriş. OSCP'den önce mükemmel basamak.", slug: "entry-level" },
      roadmap: ["Security+ (temel, 1-2 ay)", "eJPT (1-2 ay)", "OSCP (4-8 ay)", budget === "low" ? "CRTP (AD, uygun fiyat)" : "OSEP / OSWE (uzmanlık)"],
      note: budget === "low" ? "Bütçe kısıtlıysa: eJPT + CRTP harika fiyat/değer sunar. OSCP'ye sonra geç." : "OSCP'ye yatırım yap — kariyer getirisi yüksek.",
    };
  }

  if (interest === "defensive") {
    return {
      title: "Defansif Yol — Blue Team / SOC",
      path: "defensive",
      primary: a.style === "hands-on"
        ? { name: "BTL1", prep: "2-3 ay", why: "Tamamen pratik blue team sertifikası — gerçek olay senaryolarında iş yaparsın.", slug: "defensive" }
        : { name: "CompTIA CySA+", prep: "2-3 ay", why: "SOC analisti rolüne yönelik analiz odaklı sertifika.", slug: "defensive" },
      roadmap: ["Security+ (temel, 1-2 ay)", "CySA+ veya BTL1 (2-3 ay)", budget === "high" ? "GCIH (SANS, ileri)" : "Pratik: TryHackMe SOC yolu"],
      note: budget === "high" ? "İşveren ödüyorsa GIAC (GCIH/GCIA) prestijlidir." : "GIAC pahalı — önce CySA+/BTL1, GIAC'ı işe girince hedefle.",
    };
  }

  if (interest === "cloud") {
    return {
      title: "Cloud Güvenliği Yolu",
      path: "cloud",
      primary: { name: "AZ-500 veya AWS Security", prep: "1-4 ay", why: "Hangi bulutu kullanıyorsan onunla başla (Azure → AZ-500, AWS → Security Specialty).", slug: "management-cloud" },
      roadmap: ["Security+ (temel)", "AZ-500 (Azure) / AWS Security Specialty", "CCSP (ileri, vendor-bağımsız)"],
      note: "Cloud güvenliği en hızlı büyüyen alan — yüksek talep, yüksek maaş.",
    };
  }

  if (interest === "management") {
    return {
      title: "Yönetim & Mimari Yol",
      path: "management",
      primary: { name: "CISSP", prep: "3-6 ay", why: "Yönetim/mimari kariyerinin altın standardı. 5 yıl deneyim gerektirir.", slug: "management-cloud" },
      roadmap: ["Security+ (temel)", "Deneyim (5 yıl)", "CISSP", "CISM (yönetim odaklı)"],
      note: "CISSP deneyim ister; yoksa 'Associate' olursun. Teknik deneyim biriktirirken hazırlan.",
    };
  }

  // Varsayılan: yeni başlayan
  return {
    title: "Sağlam Bir Başlangıç",
    path: "beginner",
    primary: { name: "CompTIA Security+", prep: "1-2 ay", why: "Hangi yöne gidersen git, Security+ doğru başlangıç.", slug: "entry-level" },
    roadmap: ["Network+ (1 ay)", "Security+ (1-2 ay)", "İlgi alanına göre uzmanlaş"],
    note: "Önce temeli kur, sonra Red/Blue/Cloud yönünü seç.",
  };
}

const pathColor: Record<Path, string> = {
  offensive: "text-red-400 border-red-500/30 bg-red-500/5",
  defensive: "text-blue-400 border-blue-500/30 bg-blue-500/5",
  management: "text-purple-400 border-purple-500/30 bg-purple-500/5",
  cloud: "text-teal-400 border-teal-500/30 bg-teal-500/5",
  beginner: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5",
};

export default function CareerTestPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const choose = (qid: string, value: string) => {
    const next = { ...answers, [qid]: value };
    setAnswers(next);
    if (step < questions.length - 1) setStep(step + 1);
    else setDone(true);
  };

  const reset = () => { setStep(0); setAnswers({}); setDone(false); };

  if (done) {
    const rec = recommend(answers);
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap className="w-7 h-7 text-indigo-400" />
          <h1 className="text-2xl font-bold text-terminal-white">Sonuç</h1>
        </div>

        <div className={`rounded-xl border p-6 mb-5 ${pathColor[rec.path]}`}>
          <div className="text-xs font-mono uppercase tracking-widest mb-1 opacity-70">Önerilen Yol</div>
          <h2 className="text-xl font-bold text-terminal-white mb-4">{rec.title}</h2>

          <div className="bg-surface-1 border border-surface-3 rounded-lg p-4">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <span className="text-lg font-bold text-terminal-white">🎯 {rec.primary.name}</span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 rounded">
                <Clock className="w-3.5 h-3.5" /> {rec.primary.prep}
              </span>
            </div>
            <p className="text-sm text-terminal-comment leading-relaxed">{rec.primary.why}</p>
          </div>
        </div>

        <div className="bg-surface-1 border border-surface-3 rounded-xl p-5 mb-5">
          <h3 className="text-sm font-semibold text-terminal-white mb-3">📋 Önerilen Sıralama</h3>
          <div className="space-y-2">
            {rec.roadmap.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono flex items-center justify-center shrink-0">{i + 1}</span>
                <span className="text-terminal-white/80">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4 mb-6 text-sm text-amber-200/90">
          💡 {rec.note}
        </div>

        <div className="flex gap-3 flex-wrap">
          <Link href={`/certifications/${rec.primary.slug}`} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/20 font-medium transition-all text-sm">
            Detayları İncele <ArrowRight className="w-4 h-4" />
          </Link>
          <button onClick={reset} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface-2 text-terminal-comment border border-surface-3 hover:text-terminal-white transition-all text-sm">
            <RotateCcw className="w-4 h-4" /> Testi Tekrar Çöz
          </button>
        </div>
      </div>
    );
  }

  const q = questions[step];
  const Icon = q.icon;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <GraduationCap className="w-7 h-7 text-indigo-400" />
        <h1 className="text-2xl font-bold text-terminal-white">Kariyer Testi</h1>
      </div>
      <p className="text-terminal-comment mb-6 ml-10 text-sm">
        4 soruda sana en uygun sertifika yolunu ve tahmini hazırlık süresini öğren.
      </p>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {questions.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? "bg-indigo-500" : "bg-surface-3"}`} />
        ))}
      </div>

      <div className="bg-surface-1 border border-surface-3 rounded-xl p-6">
        <div className="flex items-center gap-2 text-xs font-mono text-terminal-comment mb-1">
          <Icon className="w-4 h-4 text-indigo-400" /> Soru {step + 1} / {questions.length}
        </div>
        <h2 className="text-lg font-semibold text-terminal-white mb-5">{q.q}</h2>

        <div className="space-y-2.5">
          {q.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => choose(q.id, opt.value)}
              className="w-full text-left px-4 py-3 rounded-lg bg-surface-2 border border-surface-3 hover:border-indigo-500/40 hover:bg-indigo-500/5 text-sm text-terminal-white/90 hover:text-indigo-200 transition-all flex items-center justify-between group"
            >
              {opt.label}
              <ArrowRight className="w-4 h-4 text-terminal-comment group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {step > 0 && (
        <button onClick={() => setStep(step - 1)} className="mt-4 text-xs text-terminal-comment hover:text-terminal-white transition-colors">
          ← Önceki soru
        </button>
      )}
    </div>
  );
}
