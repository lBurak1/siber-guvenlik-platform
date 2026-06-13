import { getServersTopic } from "@/lib/content-loader";
import ToolPageLayout from "@/components/content/ToolPageLayout";
import { notFound } from "next/navigation";

interface Props { params: { topic: string; module: string } }

export default async function ServersModulePage({ params }: Props) {
  const topic = await getServersTopic(params.topic);
  if (!topic) notFound();
  const asTool = {
    ...topic,
    team: "servers-fundamentals" as const,
    category: "Sunucular",
    phase: "Foundation",
    color: "#06b6d4",
    slug: topic.slug,
    subtitle: topic.subtitle,
  };
  return <ToolPageLayout tool={asTool as any} activeModuleId={params.module} />;
}

export async function generateMetadata({ params }: Props) {
  const topic = await getServersTopic(params.topic);
  return { title: topic ? `${topic.title} — Sunucular` : "Konu Bulunamadı" };
}
