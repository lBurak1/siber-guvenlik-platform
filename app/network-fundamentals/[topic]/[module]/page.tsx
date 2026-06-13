import { getNetworkTopic } from "@/lib/content-loader";
import ToolPageLayout from "@/components/content/ToolPageLayout";
import { notFound } from "next/navigation";

interface Props { params: { topic: string; module: string } }

export default async function NetworkModulePage({ params }: Props) {
  const topic = await getNetworkTopic(params.topic);
  if (!topic) notFound();

  const asTool = {
    ...topic,
    team: "network-fundamentals" as const,
    category: "Network",
    phase: "Foundation",
    color: "#10b981",
    slug: topic.slug,
    subtitle: topic.subtitle,
  };

  return <ToolPageLayout tool={asTool as any} activeModuleId={params.module} />;
}

export async function generateMetadata({ params }: Props) {
  const topic = await getNetworkTopic(params.topic);
  return { title: topic ? `${topic.title} — Network` : "Bulunamadı" };
}
