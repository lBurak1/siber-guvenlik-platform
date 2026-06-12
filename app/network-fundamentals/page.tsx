import Link from "next/link";
import { Network, ArrowRight, Layers, Radio } from "lucide-react";

const topics = [
  {
    slug: "osi-tcpip",
    icon: "🧱",
    title: "OSI & TCP/IP Modelleri",
    desc: "Protokollerin katmanlardaki yeri, kapsülleme ve güvenlik açısından önemi",
    level: "Başlangıç",
  },
  {
    slug: "tcp-handshake",
    icon: "🤝",
    title: "TCP Üçlü El Sıkışması",
    desc: "SYN-SYN/ACK-ACK mekanizması ve Nmap taramalarıyla ilişkisi",
    level: "Başlangıç",
  },
  {
    slug: "ip-subnetting",
    icon: "📐",
    title: "IP Adresleme & Subnetting",
    desc: "CIDR notasyonu, ağ maskesi hesaplama ve port mantığı",
    level: "Başlangıç–Orta",
  },
  {
    slug: "protocols-deep",
    icon: "📡",
    title: "Kritik Protokoller",
    desc: "ARP, DNS, DHCP, HTTP/S, FTP, SMB — güvenlik açısından nasıl çalışırlar?",
    level: "Orta",
  },
  {
    slug: "cisco-ios",
    icon: "🖧",
    title: "Cisco IOS Temelleri",
    desc: "CLI mod yapısı, hostname/parola, arayüz yapılandırma, show komutları — CCNA",
    level: "Başlangıç–Orta",
  },
  {
    slug: "vlan-stp",
    icon: "🔗",
    title: "VLAN, Trunk & STP",
    desc: "VLAN/access/trunk (802.1Q), inter-VLAN routing, Spanning Tree, EtherChannel",
    level: "Orta–İleri",
  },
  {
    slug: "routing-protocols",
    icon: "🧭",
    title: "Routing: Statik & OSPF",
    desc: "Yönlendirme tablosu, statik/default route, tek alanlı OSPF yapılandırma",
    level: "Orta–İleri",
  },
  {
    slug: "network-services",
    icon: "⚙️",
    title: "Ağ Servisleri: DHCP, NAT, NTP",
    desc: "Cisco IOS'ta DHCP sunucu/relay, NAT/PAT, static NAT, NTP yapılandırma",
    level: "Orta",
  },
  {
    slug: "acl-security",
    icon: "🔒",
    title: "ACL & Port Güvenliği",
    desc: "Standart/genişletilmiş ACL, port security, DHCP snooping — CCNA güvenlik",
    level: "Orta–İleri",
  },
  {
    slug: "routing-switching",
    icon: "🔀",
    title: "Routing & Switching",
    desc: "Yönlendirme tabloları, statik/dinamik routing, switch, VLAN ve trunk mantığı",
    level: "Orta–İleri",
  },
  {
    slug: "network-security",
    icon: "🛡️",
    title: "Ağ Güvenlik Cihazları",
    desc: "Firewall, NAT, VPN, IDS/IPS, proxy, DMZ ve ağ segmentasyonu",
    level: "Orta–İleri",
  },
  {
    slug: "web-architecture",
    icon: "🌐",
    title: "Web Mimarisi & HTTP",
    desc: "Client-Server, HTTP metotları, header/status code, cookie/session, SSL/TLS handshake",
    level: "Başlangıç–Orta",
  },
  {
    slug: "virtualization",
    icon: "🖥️",
    title: "Sanallaştırma & Lab Kurulumu",
    desc: "VMware/VirtualBox, Kali kurulumu, ağ modları, snapshot ile izole güvenlik lab'ı",
    level: "Başlangıç",
  },
];

export default function NetworkFundamentalsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Network className="w-7 h-7 text-emerald-400" />
        <h1 className="text-2xl font-bold text-terminal-white">Network</h1>
      </div>
      <p className="text-terminal-comment mb-2 ml-10">
        Temelden CCNA seviyesine ağ mühendisliği. OSI'den Cisco IOS'a, subnetting'den OSPF ve ACL'e — hem sistem/network mühendisliği hem de pentest temeli.
      </p>
      <div className="ml-10 mb-8 text-xs font-mono text-terminal-comment bg-surface-1 border border-emerald-500/20 rounded-lg px-3 py-2 inline-block">
        <span className="text-emerald-400">önerilen sıra →</span> OSI/TCP-IP → Subnetting → Cisco IOS → VLAN/STP → Routing/OSPF → Servisler → ACL/Güvenlik
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {topics.map((t, i) => (
          <Link key={t.slug} href={`/network-fundamentals/${t.slug}`} className="group">
            <div className="module-card border border-surface-3 hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.08)] transition-all h-full">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.icon}</span>
                  <div>
                    <div className="text-xs font-mono text-terminal-comment mb-0.5">
                      <span className="text-emerald-400/60">#{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="font-semibold text-terminal-white group-hover:text-emerald-300 transition-colors text-sm">
                      {t.title}
                    </h3>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-terminal-comment group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </div>
              <p className="text-xs text-terminal-comment leading-relaxed">{t.desc}</p>
              <span className="mt-3 inline-block text-xs font-mono text-emerald-400/70 bg-emerald-500/5 border border-emerald-500/15 px-2 py-0.5 rounded">
                {t.level}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
