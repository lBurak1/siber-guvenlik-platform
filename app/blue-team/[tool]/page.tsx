import { getToolContent } from "@/lib/content-loader";
import ToolPageLayout from "@/components/content/ToolPageLayout";
import { notFound } from "next/navigation";

interface Props { params: { tool: string } }

export default async function BlueToolPage({ params }: Props) {
  const tool = await getToolContent("blue-team", params.tool);
  if (!tool) notFound();
  return <ToolPageLayout tool={tool} />;
}
