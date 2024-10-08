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

    case LinkActionType.LinkRemove:
      return {
        ...state,
        links: state.links.filter((link) => link.id !== action.payload.id),
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

  const mergedLinks = existingLinks
    .filter((link) => updatedLinkMap.has(link.id))
    .map((link) => {
      const updatedLink = updatedLinkMap.get(link.id);
      return updatedLink ? updatedLink : link;
    });

  updatedLinks.forEach((link) => {
    if (!existingLinks.some((existingLink) => existingLink.id === link.id)) {
      mergedLinks.push(link);
    }
  });

  return mergedLinks;
}

export default linkReducer;
