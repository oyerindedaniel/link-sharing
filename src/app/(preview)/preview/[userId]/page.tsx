import { getLinksByUserId } from "@/app/_data";
import Preview from "@/components/pages/preview";

interface PreviewPageProps {
  params: { userId: string };
}

export default async function PreviewPage({
  params: { userId },
}: PreviewPageProps) {
  const userLinks = await getLinksByUserId({ userId: parseInt(userId) });

  return <Preview userLinks={userLinks} />;
}
