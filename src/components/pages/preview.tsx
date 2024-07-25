import Image from "next/image";

import type { Links } from "@/types/links";
import { UserRaw } from "@/types/users";

export default function Preview({
  userLinks,
  user,
}: {
  userLinks: Links;
  user: UserRaw;
}) {
  const { imgSrc, emailAddress } = user ?? {};

  return (
    <div className="preview">
      <div className="preview__content">
        {imgSrc ? (
          <Image
            src={imgSrc!}
            alt={`${emailAddress}`}
            className="profileImage"
          />
        ) : (
          <div className="placeholderImage" />
        )}
        <h1 className="preview__name">Ben Wright</h1>
        <p className="preview__email">ben@example.com</p>
        <div className="preview__links">
          <a href="#" className="preview__link preview__link--github">
            GitHub
          </a>
          <a href="#" className="preview__link preview__link--youtube">
            YouTube
          </a>
          <a href="#" className="preview__link preview__link--linkedin">
            LinkedIn
          </a>
        </div>
      </div>
      );
    </div>
  );
}
