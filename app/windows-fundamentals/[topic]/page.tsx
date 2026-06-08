import { getWindowsTopic } from "@/lib/content-loader";
import ToolPageLayout from "@/components/content/ToolPageLayout";
import { notFound } from "next/navigation";

interface Props { params: { topic: string } }

export default async function WindowsTopicPage({ params }: Props) {
  const topic = await getWindowsTopic(params.topic);
  if (!topic) notFound();

  const asTool = {
    ...topic,
    team: "windows-fundamentals" as const,
    category: "Windows Eğitimi",
    phase: "Foundation",
    color: "#0ea5e9",
    slug: topic.slug,
    subtitle: topic.subtitle,
  };

  return <ToolPageLayout tool={asTool as any} />;
}

export async function generateMetadata({ params }: Props) {
  const topic = await getWindowsTopic(params.topic);
  return { title: topic ? `${topic.title} — Windows Eğitimi` : "Konu Bulunamadı" };
}
