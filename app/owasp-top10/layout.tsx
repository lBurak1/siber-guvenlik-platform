import OwaspSidebar from "@/components/layout/OwaspSidebar";

export default function OwaspLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <OwaspSidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
