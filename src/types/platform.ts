export const platformValues = [
  "github",
  "frontendMentor",
  "twitter",
  "linkedin",
  "youtube",
  "facebook",
  "twitch",
  "devto",
  "codewars",
  "codepen",
  "freeCodeCamp",
  "gitlab",
  "hashnode",
  "stackoverflow",
] as const;

export type Platform = (typeof platformValues)[number];
