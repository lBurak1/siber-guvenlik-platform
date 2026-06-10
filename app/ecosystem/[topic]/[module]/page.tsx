import { getEcosystemTopic } from "@/lib/content-loader";
import ToolPageLayout from "@/components/content/ToolPageLayout";
import { notFound } from "next/navigation";

interface Props { params: { topic: string; module: string } }

export default async function EcosystemModulePage({ params }: Props) {
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

  return <ToolPageLayout tool={asTool as any} activeModuleId={params.module} />;
}

export async function generateMetadata({ params }: Props) {
  const topic = await getEcosystemTopic(params.topic);
  return { title: topic ? `${topic.title} — Sektör & Ekosistem` : "Konu Bulunamadı" };
}
