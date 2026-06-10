import EcosystemSidebar from "@/components/layout/EcosystemSidebar";

export default function EcosystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <EcosystemSidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
