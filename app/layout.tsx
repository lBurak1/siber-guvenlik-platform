import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: {
    default: "SecAcademy — Siber Güvenlik Eğitim Platformu",
    template: "%s | SecAcademy",
  },
  description:
    "White Hat güvenlik uzmanları için kapsamlı, modüler siber güvenlik eğitim platformu. Red Team, Blue Team ve Purple Team disiplinlerinde Türkçe içerik.",
  keywords: ["siber güvenlik", "pentest", "red team", "blue team", "CTF", "kali linux", "ethical hacking"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-surface text-terminal-white">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
