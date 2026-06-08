import { getToolContent } from "@/lib/content-loader";
import ToolPageLayout from "@/components/content/ToolPageLayout";
import { notFound } from "next/navigation";

interface Props {
  params: { tool: string; module: string };
}

export default async function ModulePage({ params }: Props) {
  const tool = await getToolContent("red-team", params.tool);
  if (!tool) notFound();
  return <ToolPageLayout tool={tool} activeModuleId={params.module} />;
}

export async function generateMetadata({ params }: Props) {
  const tool = await getToolContent("red-team", params.tool);
  const module = tool?.modules.find((m) => m.id === params.module);
  return {
    title: module ? `${module.title} — ${tool?.title}` : "Modül Bulunamadı",
  };
}
