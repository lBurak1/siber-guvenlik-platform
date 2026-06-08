import { getOwaspTopic } from "@/lib/content-loader";
import ToolPageLayout from "@/components/content/ToolPageLayout";
import { notFound } from "next/navigation";

interface Props { params: { topic: string; module: string } }

export default async function OwaspModulePage({ params }: Props) {
  const topic = await getOwaspTopic(params.topic);
  if (!topic) notFound();

  const asTool = {
    ...topic,
    team: "owasp-top10" as const,
    category: "OWASP Top 10",
    phase: "Web Security",
    color: "#f59e0b",
    slug: topic.slug,
    subtitle: topic.subtitle,
  };

  return <ToolPageLayout tool={asTool as any} activeModuleId={params.module} />;
}

export async function generateMetadata({ params }: Props) {
  const topic = await getOwaspTopic(params.topic);
  return { title: topic ? `${topic.title} — OWASP Top 10` : "Konu Bulunamadı" };
}
