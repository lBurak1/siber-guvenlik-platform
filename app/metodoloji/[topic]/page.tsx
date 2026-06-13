import { getMetodolojiTopic } from "@/lib/content-loader";
import ToolPageLayout from "@/components/content/ToolPageLayout";
import { notFound } from "next/navigation";

interface Props { params: { topic: string } }

export default async function MetodolojiTopicPage({ params }: Props) {
  const topic = await getMetodolojiTopic(params.topic);
  if (!topic) notFound();
  const asTool = {
    ...topic,
    team: "metodoloji" as const,
    category: "Metodoloji",
    phase: "Methodology",
    color: "#d946ef",
    slug: topic.slug,
    subtitle: topic.subtitle,
  };
  return <ToolPageLayout tool={asTool as any} />;
}

export async function generateMetadata({ params }: Props) {
  const topic = await getMetodolojiTopic(params.topic);
  return { title: topic ? `${topic.title} — Metodoloji` : "Konu Bulunamadı" };
}
