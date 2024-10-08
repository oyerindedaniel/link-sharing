import type { Metadata, Viewport } from "next";
import "../styles/globals.scss";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { FontInstrumantSans } from "./fonts";
import { LinksProvider } from "@/store/context";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s - ${siteConfig.title}`,
    default: siteConfig.title,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  creator: siteConfig.creator,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.title,
    images: [
      {
        url: "https://nextjs.org/og.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://nextjs.org/og-alt.png",
        width: 1800,
        height: 1600,
        alt: "",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "./icon.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "white",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(FontInstrumantSans.variable)}>
        <main>{children}</main>
      </body>
    </html>
  );
}
