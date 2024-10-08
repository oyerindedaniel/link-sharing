"use client";

import {
  createLink,
  deleteLinkById,
  updateLinks as updateLinksAction,
} from "@/app/_actions";
import { noop } from "@/lib/utils";
import { ILinksInputs, Links, UserLinks } from "@/types/links";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useOptimistic,
} from "react";
import { LinkAction, LinkActionType } from "./actions";
import linkReducer from "./reducer";

export type DefinedUserLinks = NonNullable<UserLinks>;

type Context = {
  state: ContextState;
  dispatch: React.Dispatch<LinkAction>;
  addLinks: (data: ILinksInputs) => Promise<void>;
  updateLinks: (data: ILinksInputs) => Promise<void>;
  removeLink: (id: number) => void;
};

export type ContextState = { links: Links };

const initialLinkState: ContextState = {
  links: [],
};

const defaultContext: Context = {
  state: initialLinkState,
  dispatch: () => {},
  addLinks: noop,
  updateLinks: noop,
  removeLink: () => {},
};

const LinksContext = createContext<Context>(defaultContext);

export const LinksProvider: React.FC<
  PropsWithChildren<{ userLinks: Links }>
> = ({ children, userLinks }) => {
  // const [state, dispatch] = useReducer(linkReducer, undefined, () => ({
  //   links: userLinks,
  // }));

  const [optimisticState, dispatchOptimistic] = useOptimistic(
    { links: userLinks },
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
      // dispatch({ type: LinkActionType.LinkAdd, payload: { newLinks } });
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

  const removeLink = async (id: number) => {
    const previousState = optimisticState.links;

    dispatchOptimistic({
      type: LinkActionType.LinkRemove,
      payload: { id },
    });

    try {
      await deleteLinkById(id);
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
      value={{
        state: optimisticState,
        addLinks,
        updateLinks,
        removeLink,
        dispatch: () => {},
      }}
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
