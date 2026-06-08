import { getLinuxTopic } from "@/lib/content-loader";
import ToolPageLayout from "@/components/content/ToolPageLayout";
import { notFound } from "next/navigation";

interface Props { params: { topic: string; module: string } }

export default async function LinuxModulePage({ params }: Props) {
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

  return <ToolPageLayout tool={asTool as any} activeModuleId={params.module} />;
}

export async function generateMetadata({ params }: Props) {
  const topic = await getLinuxTopic(params.topic);
  return { title: topic ? `${topic.title} — Linux Eğitimi` : "Bulunamadı" };
}
