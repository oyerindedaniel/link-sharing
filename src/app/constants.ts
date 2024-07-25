import { IconProps, Icons } from "@/assets";
import { type Platform } from "@/types/platform";

const PLATFORM_OPTIONS = [
  {
    value: "github",
    label: "GitHub",
    icon: Icons.Github,
    color: "#181717",
    placeholder: "https://github.com/username",
  },
  {
    value: "frontendMentor",
    label: "Frontend Mentor",
    icon: Icons.FrontendMentor,
    color: "#3d3d3d",
    placeholder: "https://www.frontendmentor.io/profile/username",
  },
  {
    value: "twitter",
    label: "Twitter",
    icon: Icons.Twitter,
    color: "#1DA1F2",
    placeholder: "https://twitter.com/username",
  },
  {
    value: "linkedin",
    label: "LinkedIn",
    icon: Icons.Linkendin,
    color: "#0077B5",
    placeholder: "https://www.linkedin.com/in/username",
  },
  {
    value: "youtube",
    label: "YouTube",
    icon: Icons.Youtube,
    color: "#FF0000",
    placeholder: "https://www.youtube.com/channel/UCXXXXXXX",
  },
  {
    value: "facebook",
    label: "Facebook",
    icon: Icons.Facebook,
    color: "#1877F2",
    placeholder: "https://www.facebook.com/username",
  },
  {
    value: "twitch",
    label: "Twitch",
    icon: Icons.Twitch,
    color: "#9146FF",
    placeholder: "https://www.twitch.tv/username",
  },
  {
    value: "devto",
    label: "Dev.to",
    icon: Icons.Devto,
    color: "#0A0A0A",
    placeholder: "https://dev.to/username",
  },
  {
    value: "codewars",
    label: "Codewars",
    icon: Icons.CodeWars,
    color: "#AD2C27",
    placeholder: "https://www.codewars.com/users/username",
  },
  {
    value: "codepen",
    label: "Codepen",
    icon: Icons.Codepen,
    color: "#000000",
    placeholder: "https://codepen.io/username",
  },
  {
    value: "freeCodeCamp",
    label: "freeCodeCamp",
    icon: Icons.FreeCodeCamp,
    color: "#006400",
    placeholder: "https://www.freecodecamp.org/username",
  },
  {
    value: "gitlab",
    label: "GitLab",
    icon: Icons.Gitlab,
    color: "#FC6D26",
    placeholder: "https://gitlab.com/username",
  },
  {
    value: "hashnode",
    label: "Hashnode",
    icon: Icons.Hashnode,
    color: "#2962FF",
    placeholder: "https://hashnode.com/@username",
  },
  {
    value: "stackoverflow",
    label: "Stack Overflow",
    icon: Icons.StackOverflow,
    color: "#F48024",
    placeholder: "https://stackoverflow.com/users/username",
  },
] satisfies Array<{
  value: Platform;
  label: string;
  icon: (props: IconProps) => JSX.Element;
  color: string;
  placeholder: string;
}>;

export default PLATFORM_OPTIONS;
