import LinuxSidebar from "@/components/layout/LinuxSidebar";

export default function LinuxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <LinuxSidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
