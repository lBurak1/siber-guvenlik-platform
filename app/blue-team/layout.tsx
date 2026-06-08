import Sidebar from "@/components/layout/Sidebar";

export default function BlueTeamLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar team="blue-team" />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
