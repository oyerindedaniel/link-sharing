import { getIconForPlatform } from "@/app/constants";
import { Icons } from "@/assets";
import type { Links } from "@/types/links";
import { UserRaw } from "@/types/users";
import Image from "next/image";

export default function Preview({
  userLinks,
  user,
}: {
  userLinks: Links;
  user: UserRaw;
}) {
  const { imgSrc, emailAddress, firstName } = user ?? {};

  return (
    <div className="preview">
      <div className="preview__content">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={emailAddress || "User image"}
            style={{ boxShadow: "0 0 0 .5rem #633CFF" }}
            className="profileImage"
          />
        ) : (
          <div
            style={{ boxShadow: "0 0 0 .5rem #633CFF" }}
            className="placeholderImage"
          />
        )}
        <div className="preview__profile__container">
          <div className="preview__profile">
            <h1 className="preview__profile__name">
              {firstName || "Ben Wright"}
            </h1>
            <p className="preview__profile__email">{user?.emailAddress}</p>
          </div>
          <div
            style={{ height: "100%", overflow: "visible", padding: 0 }}
            className="links-platform"
          >
            {userLinks.map((link, index) => {
              const IconComponent = getIconForPlatform(link.platform);

              return (
                <div
                  style={{
                    backgroundColor: link.brandColor,
                    color: "white",
                    width: "100%",
                  }}
                  key={link.id}
                  className="link"
                >
                  <span>
                    {IconComponent && <IconComponent className="icon" />}
                  </span>
                  <a href={link.link} target="_blank" rel="noopener noreferrer">
                    {link.platform}
                  </a>
                  <Icons.ArrowRight
                    className="icon"
                    style={{ marginLeft: "auto" }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
