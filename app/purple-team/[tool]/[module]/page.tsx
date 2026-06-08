import { getToolContent } from "@/lib/content-loader";
import ToolPageLayout from "@/components/content/ToolPageLayout";
import { notFound } from "next/navigation";

interface Props { params: { tool: string; module: string } }

export default async function PurpleModulePage({ params }: Props) {
  const tool = await getToolContent("purple-team", params.tool);
  if (!tool) notFound();
  return <ToolPageLayout tool={tool} activeModuleId={params.module} />;
}
