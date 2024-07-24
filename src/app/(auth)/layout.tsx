import { Icons } from "@/assets";
import Image from "next/image";
import { PropsWithChildren } from "react";
import styles from "./layout.module.scss";

interface Props extends PropsWithChildren {}

export default function AuthLayout({ children }: Props) {
  return (
    <div className={styles["auth-layout"]}>
      <div className={styles["auth-layout__content"]}>
        <Image
          src={Icons.SvgLogo}
          alt="devlinks"
          // width={182.5}
          // height={40}
          priority
          quality={100}
          // className={styles["auth-layout__image"]}
        />
        <div>{children}</div>
      </div>
    </div>
  );
}
