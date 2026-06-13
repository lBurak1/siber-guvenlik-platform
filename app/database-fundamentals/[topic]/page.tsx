import { getDatabaseTopic } from "@/lib/content-loader";
import ToolPageLayout from "@/components/content/ToolPageLayout";
import { notFound } from "next/navigation";

interface Props { params: { topic: string } }

export default async function DatabaseTopicPage({ params }: Props) {
  const topic = await getDatabaseTopic(params.topic);
  if (!topic) notFound();
  const asTool = {
    ...topic,
    team: "database-fundamentals" as const,
    category: "Veritabanları",
    phase: "Foundation",
    color: "#84cc16",
    slug: topic.slug,
    subtitle: topic.subtitle,
  };
  return <ToolPageLayout tool={asTool as any} />;
}

export async function generateMetadata({ params }: Props) {
  const topic = await getDatabaseTopic(params.topic);
  return { title: topic ? `${topic.title} — Veritabanları` : "Konu Bulunamadı" };
}
