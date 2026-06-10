import { getCertTopic } from "@/lib/content-loader";
import ToolPageLayout from "@/components/content/ToolPageLayout";
import { notFound } from "next/navigation";

interface Props { params: { topic: string } }

export default async function CertTopicPage({ params }: Props) {
  const topic = await getCertTopic(params.topic);
  if (!topic) notFound();

  const asTool = {
    ...topic,
    team: "certifications" as const,
    category: "Sertifikalar",
    phase: "Career",
    color: "#6366f1",
    slug: topic.slug,
    subtitle: topic.subtitle,
  };

  return <ToolPageLayout tool={asTool as any} />;
}

export async function generateMetadata({ params }: Props) {
  const topic = await getCertTopic(params.topic);
  return { title: topic ? `${topic.title} — Sertifikalar` : "Konu Bulunamadı" };
}
