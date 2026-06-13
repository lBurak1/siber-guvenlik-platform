import ServersSidebar from "@/components/layout/ServersSidebar";

export default function ServersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <ServersSidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
