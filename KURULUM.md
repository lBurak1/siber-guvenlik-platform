# SecAcademy — Kurulum Rehberi

## Gereksinimler
- Node.js 18+ (nodejs.org)
- npm veya yarn

## 1. Bağımlılıkları Yükle

```bash
cd "C:\Users\burak\Desktop\eğitimsitesi"
npm install
```

## 2. Geliştirme Sunucusunu Başlat

```bash
npm run dev
```

Tarayıcıda: http://localhost:3000

## 3. Production Build

```bash
npm run build
npm start
```

## Proje Yapısı

```
app/                    → Next.js App Router sayfaları
  page.tsx              → Ana sayfa (team seçici)
  red-team/             → Red Team modülleri
  blue-team/            → Blue Team modülleri
  purple-team/          → Purple Team modülleri

components/
  layout/               → Navbar, Sidebar
  content/              → TerminalBlock, ScenarioBox, ModuleCard, ToolPageLayout

content/
  red-team/             → Araç JSON dosyaları (nmap, sqlmap, gobuster vb.)
  blue-team/            → wireshark, log-analysis
  purple-team/          → purple-methodology

lib/
  types.ts              → TypeScript tip tanımları
  navigation.ts         → Sidebar navigasyon yapısı
  content-loader.ts     → JSON içerik yükleyici
  progress-store.ts     → Zustand ile ilerleme takibi
  utils.ts              → Yardımcı fonksiyonlar
```

## Yeni İçerik Ekleme

1. `content/red-team/yeni-arac.json` dosyası oluştur
2. `lib/content-loader.ts`'e import ekle
3. `lib/navigation.ts`'e tool kaydı ekle
4. Otomatik route: `/red-team/yeni-arac`
