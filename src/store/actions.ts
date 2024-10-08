import { ILinksInputs } from "@/types/links";
import { Links } from "@/types/links";

export enum LinkActionType {
  LinkAdd = "LinkAdd",
  LinkUpdate = "LinkUpdate",
  LinkRemove = "LinkRemove",
  LinkRevertOnError = "LinkRevertOnError",
}

export type LinkAction =
  | { type: LinkActionType.LinkAdd; payload: { newLinks: Links } }
  | { type: LinkActionType.LinkUpdate; payload: { updatedLinks: Links } }
  | {
      type: LinkActionType.LinkRevertOnError;
      payload: { previousLinks: Links };
    }
  | {
      type: LinkActionType.LinkRemove;
      payload: { id: number };
    };
