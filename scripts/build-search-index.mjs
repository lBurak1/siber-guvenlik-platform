// Tüm içerik JSON'larını tarayıp aranabilir düz bir indeks üretir.
// Çıktı: public/search-index.json
// Çalıştırma: node scripts/build-search-index.mjs
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CONTENT = join(ROOT, "content");

// Klasör → kategori meta bilgisi
const CATEGORIES = {
  "red-team":             { label: "Red Team",     color: "red",     kind: "modules" },
  "blue-team":            { label: "Blue Team",    color: "blue",    kind: "modules" },
  "purple-team":          { label: "Purple Team",  color: "purple",  kind: "modules" },
  "network-fundamentals": { label: "Ağ Temelleri", color: "emerald", kind: "modules" },
  "linux-fundamentals":   { label: "Linux",        color: "orange",  kind: "modules" },
  "windows-fundamentals": { label: "Windows",      color: "sky",     kind: "modules" },
  "owasp-top10":          { label: "OWASP",        color: "amber",   kind: "modules" },
  "cheatsheet":           { label: "Cheat Sheet",  color: "yellow",  kind: "cheatsheet" },
};

const entries = [];
const seenUrls = new Set();

function push(entry) {
  // Aynı url + komut kombinasyonunu tekrar ekleme
  const key = entry.url + "|" + entry.cmd;
  if (seenUrls.has(key)) return;
  seenUrls.add(key);
  entry.q = [entry.cmd, entry.desc, entry.tool, entry.mod, entry.tags]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  entries.push(entry);
}

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    console.warn("Atlanıyor (parse hatası):", path, e.message);
    return null;
  }
}

for (const [dir, meta] of Object.entries(CATEGORIES)) {
  const dirPath = join(CONTENT, dir);
  if (!existsSync(dirPath)) continue;

  for (const file of readdirSync(dirPath)) {
    if (!file.endsWith(".json")) continue;
    const data = readJson(join(dirPath, file));
    if (!data) continue;

    if (meta.kind === "modules") {
      const toolTitle = data.title ?? data.slug ?? file;
      const slug = data.slug ?? file.replace(/\.json$/, "");
      const tags = Array.isArray(data.tags) ? data.tags.join(" ") : "";

      for (const module of data.modules ?? []) {
        const moduleTitle = module.title ?? "";
        const url = `/${dir}/${slug}/${module.id}`;

        // Modül başlığını da aranabilir yap (konu adıyla bulma)
        push({
          cmd: "",
          desc: module.description ?? "",
          tool: toolTitle,
          mod: moduleTitle,
          cat: meta.label,
          color: meta.color,
          tags,
          url,
        });

        for (const section of module.sections ?? []) {
          // Komut bölümleri
          for (const c of section.commands ?? []) {
            push({
              cmd: c.command ?? c.label ?? "",
              desc: c.description ?? "",
              tool: toolTitle,
              mod: moduleTitle,
              cat: meta.label,
              color: meta.color,
              tags,
              url,
            });
          }
          // Kurulum komutları
          if (section.installation) {
            const inst = section.installation;
            for (const list of [inst.linux, inst.windows, inst.macos]) {
              for (const cmd of list ?? []) {
                push({
                  cmd,
                  desc: `Kurulum — ${section.title ?? ""}`.trim(),
                  tool: toolTitle,
                  mod: moduleTitle,
                  cat: meta.label,
                  color: meta.color,
                  tags,
                  url,
                });
              }
            }
          }
        }
      }
    } else if (meta.kind === "cheatsheet") {
      // port-22-ssh.json → "ssh"
      const slug = file.replace(/\.json$/, "").split("-").pop();
      const toolTitle = `Port ${data.port} ${data.service}`;
      const url = `/cheatsheet/${slug}`;
      const tags = `${data.service} ${data.protocol} port ${data.port}`;

      for (const section of data.sections ?? []) {
        for (const c of section.commands ?? []) {
          push({
            cmd: c.command ?? "",
            desc: c.description ?? c.label ?? "",
            tool: toolTitle,
            mod: section.title ?? "",
            cat: meta.label,
            color: meta.color,
            tags,
            url,
          });
        }
      }
    }
  }
}

const outDir = join(ROOT, "public");
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "search-index.json");
writeFileSync(outPath, JSON.stringify(entries), "utf8");

console.log(`✓ Arama indeksi oluşturuldu: ${entries.length} kayıt → public/search-index.json`);
