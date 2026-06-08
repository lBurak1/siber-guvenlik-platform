import WindowsSidebar from "@/components/layout/WindowsSidebar";

export default function WindowsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <WindowsSidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
