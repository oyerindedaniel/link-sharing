import { Icons } from "@/assets";
import Image from "next/image";

import styles from "./your-link.module.scss";

export default function YourLink() {
  return (
    <div className={styles["your-link"]}>
      <div className={styles["your-link__content"]}></div>
    </div>
  );
}
