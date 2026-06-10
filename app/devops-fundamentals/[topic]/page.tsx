import { getDevopsTopic } from "@/lib/content-loader";
import ToolPageLayout from "@/components/content/ToolPageLayout";
import { notFound } from "next/navigation";

interface Props { params: { topic: string } }

export default async function DevopsTopicPage({ params }: Props) {
  const topic = await getDevopsTopic(params.topic);
  if (!topic) notFound();

  const asTool = {
    ...topic,
    team: "devops-fundamentals" as const,
    category: "DevOps Temelleri",
    phase: "Foundation",
    color: "#14b8a6",
    slug: topic.slug,
    subtitle: topic.subtitle,
  };

  return <ToolPageLayout tool={asTool as any} />;
}

export async function generateMetadata({ params }: Props) {
  const topic = await getDevopsTopic(params.topic);
  return { title: topic ? `${topic.title} — DevOps Temelleri` : "Konu Bulunamadı" };
}
