import NetworkSidebar from "@/components/layout/NetworkSidebar";

export default function NetworkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <NetworkSidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
