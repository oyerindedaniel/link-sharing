import Button from "@/components/ui/button";
import React, { PropsWithChildren } from "react";
import styles from "./layout.module.scss";

const Layout: React.FC = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles["preview-layout"]}>
      <header className={styles["preview-layout__header"]}>
        <Button
          variant="outline"
          size="large"
          className={`${styles["preview-layout__button--back"]}`}
        >
          Back to Editor
        </Button>
        <Button
          variant="primary"
          size="large"
          className={`${styles["preview-layout__button--share"]}`}
        >
          Share Link
        </Button>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
