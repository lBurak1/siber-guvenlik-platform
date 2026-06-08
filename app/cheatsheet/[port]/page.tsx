import { getCheatSheet } from "@/lib/content-loader";
import CheatSheetCard from "@/components/content/CheatSheetCard";
import { notFound } from "next/navigation";

interface Props { params: { port: string } }

export default async function CheatSheetPage({ params }: Props) {
  const sheet = await getCheatSheet(params.port);
  if (!sheet) notFound();
  return <CheatSheetCard sheet={sheet} />;
}

export async function generateMetadata({ params }: Props) {
  const sheet = await getCheatSheet(params.port);
  return {
    title: sheet ? `Port ${sheet.port} ${sheet.service} Cheat Sheet` : "Cheat Sheet",
  };
}
