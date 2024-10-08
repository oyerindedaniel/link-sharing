"use client";

import { createLink, updateLinks as updateLinksAction } from "@/app/_actions";
import { noop } from "@/lib/utils";
import { ILinksInputs, Links, UserLinks } from "@/types/links";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useOptimistic,
} from "react";
import { LinkActionType } from "./actions";
import linkReducer from "./reducer";

export type DefinedUserLinks = NonNullable<UserLinks>;

type Context = {
  state: ContextState;
  addLinks: (data: ILinksInputs) => Promise<void>;
  updateLinks: (data: ILinksInputs) => Promise<void>;
  // removeLink: (index: number) => Promise<void>;
};

export type ContextState = { links: Links };

const initialLinkState: ContextState = {
  links: [],
};

const defaultContext: Context = {
  state: initialLinkState,
  addLinks: noop,
  updateLinks: noop,
  // removeLink: noop,
};

const LinksContext = createContext<Context>(defaultContext);

export const LinksProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [optimisticState, dispatchOptimistic] = useOptimistic(
    { links: [] },
    linkReducer
  );

  const addLinks = async (data: ILinksInputs) => {
    const newLinks = data.links;

    const previousState = optimisticState.links;

    dispatchOptimistic({
      type: LinkActionType.LinkAdd,
      payload: { newLinks },
    });

    try {
      await createLink(data);
    } catch (error) {
      dispatchOptimistic({
        type: LinkActionType.LinkRevertOnError,
        payload: { previousLinks: previousState },
      });
      throw error;
    }
  };

  const updateLinks = async (data: ILinksInputs) => {
    const updatedLinks = data.links;

    const previousState = optimisticState.links;
    dispatchOptimistic({
      type: LinkActionType.LinkUpdate,
      payload: { updatedLinks },
    });
    try {
      await updateLinksAction(data);
    } catch (error) {
      dispatchOptimistic({
        type: LinkActionType.LinkRevertOnError,
        payload: { previousLinks: previousState },
      });
      throw error;
    }
  };

  return (
    <LinksContext.Provider
      value={{ state: optimisticState, addLinks, updateLinks }}
    >
      {children}
    </LinksContext.Provider>
  );
};

export const useLinksContext = () => {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error("useLinksContext must be used within a LinksProvider");
  }
  return context;
};
