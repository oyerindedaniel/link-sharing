import { getBaseUrl } from "@/lib/utils";

const links = { x: "https://x.com/fybnow" } as const;

export const siteConfig = {
  title: "devlinks",
  description: "Customize your links",
  url: getBaseUrl(),
  keywords: ["devlinks", "link sharing"],
  creator: "Oyerinde Daniel",
  authors: [
    {
      name: "Oyerinde Daniel",
      url: links.x,
    },
  ],
  ogImage: ``,
  links,
};
