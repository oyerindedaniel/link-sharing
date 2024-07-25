import { Platform } from "./platform";

export interface ILinksInputs {
  links: Array<{ platform: Platform; link: string; brandColor: string }>;
  userId: number;
}

export type Links = Array<{
  id: number;
  platform: Platform;
  link: string;
  brandColor: string;
  userId: number;
}>;
