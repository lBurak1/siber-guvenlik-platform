import DevopsSidebar from "@/components/layout/DevopsSidebar";

export default function DevopsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <DevopsSidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
