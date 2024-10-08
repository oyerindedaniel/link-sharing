import Header from "@/components/layout/header";
import PhoneDisplay from "@/components/links/phone-section";
import { User } from "@/types/users";
import { getAuthUser } from "@/utils/auth";
import { PropsWithChildren } from "react";
import { getLinksByUserId } from "../_data";
import styles from "./layout.module.scss";

interface Props extends PropsWithChildren {}

export default async function LinksLayout({ children }: Props) {
  const user = (await getAuthUser()) as User;

  const userLinks = await getLinksByUserId({ userId: user?.id });

  return (
    <div className={styles["links-layout"]}>
      <div className={styles["links-layout__content"]}>
        <Header user={user} />
        <div className={styles["links-layout__links-container"]}>
          <div>
            <PhoneDisplay
              profile={user}
              links={userLinks?.links ?? []}
              asEdit={!!userLinks?.links}
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
