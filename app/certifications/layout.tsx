import CertSidebar from "@/components/layout/CertSidebar";

export default function CertLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <CertSidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
