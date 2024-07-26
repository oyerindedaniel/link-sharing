import Profile from "@/components/pages/profile";
import { User } from "@/types/users";

import { getAuthUser } from "@/utils/auth";

export default async function LinksPage() {
  const user = (await getAuthUser()) as User;

  return <Profile user={user} />;
}
