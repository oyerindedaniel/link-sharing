import Header from "@/components/layout/header";
import { PropsWithChildren } from "react";
import styles from "./layout.module.scss";
import { getAuthUser } from "@/utils/auth";
import { getLinksByUserId } from "../_data";
import { User } from "@/types/users";

interface Props extends PropsWithChildren {}

export default async function LinksLayout({ children }: Props) {
  const user = (await getAuthUser()) as User;

  return (
    <div className={styles["links-layout"]}>
      <div className={styles["links-layout__content"]}>
        <Header user={user} />
        {children}
      </div>
    </div>
  );
}
