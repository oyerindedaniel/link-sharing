import { Icons } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
import styles from "./layout.module.scss";

interface Props extends PropsWithChildren {}

export default function AuthLayout({ children }: Props) {
  return (
    <div className={styles["auth-layout"]}>
      <div className={styles["auth-layout__content"]}>
        <Link href="/login">
          <Image
            src={Icons.SvgLogo}
            alt="devlinks"
            priority
            quality={100}
            unoptimized
          />
        </Link>

        <div>{children}</div>
      </div>
    </div>
  );
}
