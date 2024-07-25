import { create } from "zustand";

import { UserState } from "@/types/users";

interface UserActions {
  setUser: (emailAddress: string, id: string, jwtToken: string) => void;
  updateUser: (emailAddress?: string, id?: string, jwtToken?: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState & UserActions>((set) => ({
  emailAddress: "",
  id: "",
  isAuth: false,
  jwtToken: "",

  setUser: (emailAddress: string, id: string, jwtToken: string) => {
    set({ emailAddress, id, isAuth: true, jwtToken });
  },

  updateUser: (emailAddress?: string, id?: string, jwtToken?: string) => {
    set((state) => ({
      emailAddress: emailAddress ?? state.emailAddress,
      id: id ?? state.id,
      jwtToken: jwtToken ?? state.jwtToken,
      isAuth: true,
    }));
  },

  clearUser: () => {
    set({ emailAddress: "", id: "", isAuth: false, jwtToken: "" });
  },
}));
