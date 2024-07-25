import { getLinksByUserId } from "@/app/_data";
import Preview from "@/components/pages/preview";
import { getAuthUser } from "@/utils/auth";

interface PreviewPageProps {
  params: { userId: string };
}

export default async function PreviewPage({
  params: { userId },
}: PreviewPageProps) {
  const user = await getAuthUser();

  const userLinks = await getLinksByUserId({ userId: parseInt(userId) });

  return <Preview userLinks={userLinks} user={user} />;
}
