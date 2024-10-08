import { getLinksByUserId } from "@/app/_data";
import { Platform } from "./platform";

export interface ILinksInputs {
  links: Array<{
    id?: number;
    platform: Platform;
    link: string;
    brandColor: string;
  }>;
  userId: number;
}

export type Link = ILinksInputs["links"][number];

export type Links = Array<Link>;

export type UserLinks = Awaited<ReturnType<typeof getLinksByUserId>>;
