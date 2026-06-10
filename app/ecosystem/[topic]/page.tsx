import { getEcosystemTopic } from "@/lib/content-loader";
import ToolPageLayout from "@/components/content/ToolPageLayout";
import { notFound } from "next/navigation";

interface Props { params: { topic: string } }

export default async function EcosystemTopicPage({ params }: Props) {
  const topic = await getEcosystemTopic(params.topic);
  if (!topic) notFound();

  const asTool = {
    ...topic,
    team: "ecosystem" as const,
    category: "Sektör & Ekosistem",
    phase: "Knowledge",
    color: "#ec4899",
    slug: topic.slug,
    subtitle: topic.subtitle,
  };

  return <ToolPageLayout tool={asTool as any} />;
}

export async function generateMetadata({ params }: Props) {
  const topic = await getEcosystemTopic(params.topic);
  return { title: topic ? `${topic.title} — Sektör & Ekosistem` : "Konu Bulunamadı" };
}
