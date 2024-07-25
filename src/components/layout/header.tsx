"use client";

import { Icons } from "@/assets";
import { User } from "@/types/users";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "../ui/button";
import styles from "./header.module.scss";

const LINKS = [
  { url: "/links", icon: Icons.Link, name: "Links" },
  { url: "/profile", icon: Icons.ProfileImage, name: "Profile Details" },
];

export default function Header({ user }: { user: User }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Link href="/login">
          <Image
            src={Icons.SvgLogo}
            alt="devlinks"
            // priority
            // quality={100}
            unoptimized
          />
        </Link>

        <nav>
          <ul>
            {LINKS.map((link) => {
              return (
                <Button
                  key={link.name}
                  className={`${styles["header__link"]} ${
                    pathname === link.url ? styles["header__link--active"] : ""
                  }`}
                  asChild
                  variant="unstyled"
                  size="large"
                >
                  <Link href={link.url}>
                    <link.icon
                      aria-hidden
                      className={styles["header__link__icon"]}
                    />
                    {link.name}
                  </Link>
                </Button>
              );
            })}
          </ul>
        </nav>

        <Button
          className={styles["header__button-preview"]}
          variant="outline"
          size="large"
          onClick={() => router.push(`/preview/${user.id}`)}
        >
          Preview
        </Button>
      </div>
    </header>
  );
}
