import type { Metadata } from "next";
import "../styles/globals.scss";

import { cn } from "@/lib/utils";
import { FontInstrumantSans } from "./fonts";

export const metadata: Metadata = {
  title: "link sharing",
  description: "HNG11",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(FontInstrumantSans.variable)}>{children}</body>
    </html>
  );
}
