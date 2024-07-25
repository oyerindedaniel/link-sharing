import Header from "@/components/layout/header";
import { PropsWithChildren } from "react";
import styles from "./layout.module.scss";

interface Props extends PropsWithChildren {}

export default function LinksLayout({ children }: Props) {
  return (
    <div className={styles["links-layout"]}>
      <div className={styles["links-layout__content"]}>
        <Header />
        {children}
      </div>
    </div>
  );
}
