import { getLinuxTopic } from "@/lib/content-loader";
import ToolPageLayout from "@/components/content/ToolPageLayout";
import { notFound } from "next/navigation";

interface Props { params: { topic: string } }

export default async function LinuxTopicPage({ params }: Props) {
  const topic = await getLinuxTopic(params.topic);
  if (!topic) notFound();

  const asTool = {
    ...topic,
    team: "linux-fundamentals" as const,
    category: "Linux Eğitimi",
    phase: "Foundation",
    color: "#f97316",
    slug: topic.slug,
    subtitle: topic.subtitle,
  };

  return <ToolPageLayout tool={asTool as any} />;
}

export async function generateMetadata({ params }: Props) {
  const topic = await getLinuxTopic(params.topic);
  return { title: topic ? `${topic.title} — Linux Eğitimi` : "Konu Bulunamadı" };
}
