import { Icons } from "@/assets";
import Image from "next/image";
import styles from "./empty-links.module.scss";

export default async function EmptyLinks() {
  return (
    <div className={styles["empty-links"]}>
      <div className={styles["empty-links__content"]}>
        <Image src={Icons.GetStarted} alt="" className="empty-links__image" />
        <h2>Let’s get you started</h2>
        <p>
          Use the “Add new link” button to get started. Once you have more than
          one link, you can reorder and edit them. We’re here to help you share
          your profiles with everyone!
        </p>
      </div>
    </div>
  );
}
