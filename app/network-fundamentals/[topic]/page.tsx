import { getNetworkTopic } from "@/lib/content-loader";
import ToolPageLayout from "@/components/content/ToolPageLayout";
import { notFound } from "next/navigation";

interface Props { params: { topic: string } }

export default async function NetworkTopicPage({ params }: Props) {
  const topic = await getNetworkTopic(params.topic);
  if (!topic) notFound();

  // NetworkTopic'i Tool formatına dönüştür (ToolPageLayout yeniden kullan)
  const asTool = {
    ...topic,
    team: "network-fundamentals" as const,
    category: "Network",
    phase: "Foundation",
    color: "#10b981",
    slug: topic.slug,
    subtitle: topic.subtitle,
  };

  return <ToolPageLayout tool={asTool as any} />;
}

export async function generateMetadata({ params }: Props) {
  const topic = await getNetworkTopic(params.topic);
  return { title: topic ? `${topic.title} — Network` : "Konu Bulunamadı" };
}
