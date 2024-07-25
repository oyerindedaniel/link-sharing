import { create } from "zustand";

interface Link {
  platform: string;
  link: string;
}

interface PlatformLinkState {
  links: Link[];
  setLinks: (links: Link[]) => void;
}

export const usePlatformLinkStore = create<PlatformLinkState>((set) => ({
  links: [],
  setLinks: (links) => set({ links }),
}));
