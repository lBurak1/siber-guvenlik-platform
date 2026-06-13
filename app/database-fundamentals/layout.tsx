import DatabaseSidebar from "@/components/layout/DatabaseSidebar";

export default function DatabaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <DatabaseSidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
