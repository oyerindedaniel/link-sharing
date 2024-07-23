import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    const url = new URL(process.env.NEXT_PUBLIC_APP_URL);
    return url.origin;
  }

  // default getMetabase options

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  const port = process.env.PORT || 3000;
  return `http://localhost:${port}`;
}

export function absoluteUrl(path: string) {
  return `${getBaseUrl()}${path}`;
}
