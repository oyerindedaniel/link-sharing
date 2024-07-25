"use client";

import { Icons } from "@/assets";
import Image from "next/image";
import styles from "./index.module.scss";

interface ProfileProps {
  profile:
    | { firstName: string; lastName: string; imageUrl: string }
    | undefined;
}

interface LinksProps {
  links: Array<{ platform: string; link: string }>;
}

interface PhoneDisplayProps {
  profile:
    | { firstName: string; lastName: string; imageUrl: string }
    | undefined;
  links: Array<{ platform: string; link: string }>;
}

function Profile({ profile }: ProfileProps) {
  const { firstName, lastName, imageUrl } = profile ?? {};

  return (
    <div className={styles.profile}>
      {profile ? (
        <>
          <Image
            src={imageUrl!}
            alt={`${firstName} ${lastName}`}
            className={styles.profileImage}
          />
          <div className={styles.names}>
            <span className={styles.firstName}>{firstName}</span>
            <span className={styles.lastName}>{lastName}</span>
          </div>
        </>
      ) : (
        <>
          <div className={styles.placeholderImage} />
          <div className={styles.placeholderNames}>
            <span className={styles.placeholderFirstName} />
            <span className={styles.placeholderLastName} />
          </div>
        </>
      )}
    </div>
  );
}

function LinksSection({ links }: LinksProps) {
  return (
    <div className={styles.linksSection}>
      {links.length > 0 ? (
        <div className={styles.links}>
          {links.map((link, index) => (
            <div key={index} className={styles.link}>
              <span>{link.platform}</span>
              <a href={link.link}>{link.link}</a>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <div className={styles.placeholderLink} />
          <div className={styles.placeholderLink} />
          <div className={styles.placeholderLink} />
          <div className={styles.placeholderLink} />
        </div>
      )}
    </div>
  );
}

export default function PhoneDisplay({ profile, links }: PhoneDisplayProps) {
  return (
    <div className={styles.phoneDisplay}>
      <Icons.SvgPhone />
      <div className={styles.content}>
        <Profile profile={profile} />
        <LinksSection links={links} />
      </div>
    </div>
  );
}
