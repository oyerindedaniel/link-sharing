import { getLinksByUserId } from "@/app/_data";
import Links from "@/components/pages/links";
import { getAuthUser } from "@/utils/auth";

export default async function LinksPage() {
  const user = await getAuthUser();

  const userLinks = await getLinksByUserId();

  return (
    <Links userLinks={userLinks} user={user} asEdit={!!userLinks.length} />
  );
}
