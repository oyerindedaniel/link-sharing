import { Links } from "@/types/links";
import { LinkAction, LinkActionType } from "./actions";
import { type ContextState } from "./context";

const linkReducer = (state: ContextState, action: LinkAction): ContextState => {
  switch (action.type) {
    case LinkActionType.LinkAdd:
      return {
        ...state,
        links: [...state.links, ...action.payload.newLinks],
      };

    case LinkActionType.LinkUpdate:
      return {
        ...state,
        links: mergeLinks(state.links, action.payload.updatedLinks),
      };

    case LinkActionType.LinkRevertOnError:
      return {
        ...state,
        links: action.payload.previousLinks,
      };

    default:
      return state;
  }
};

function mergeLinks(existingLinks: Links, updatedLinks: Links): Links {
  const updatedLinkMap = new Map(updatedLinks.map((link) => [link.id, link]));
  return existingLinks.map((link) => updatedLinkMap.get(link.id) || link);
}

export default linkReducer;
