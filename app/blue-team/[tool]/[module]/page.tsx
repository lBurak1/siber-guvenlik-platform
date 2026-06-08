import { getToolContent } from "@/lib/content-loader";
import ToolPageLayout from "@/components/content/ToolPageLayout";
import { notFound } from "next/navigation";

interface Props { params: { tool: string; module: string } }

export default async function BlueModulePage({ params }: Props) {
  const tool = await getToolContent("blue-team", params.tool);
  if (!tool) notFound();
  return <ToolPageLayout tool={tool} activeModuleId={params.module} />;
}
