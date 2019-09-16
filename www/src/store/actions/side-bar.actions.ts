import { AppActionKeys } from "./action.keys";

export interface OpenSideBarAction {
  readonly type: AppActionKeys.OpenSideBar;
}
export interface CloseSideBarAction {
  readonly type: AppActionKeys.CloseSideBar;
}
export interface ToggleSideBarAction {
  readonly type: AppActionKeys.ToggleSideBar;
}

export type SideBarActionTypes =
  | OpenSideBarAction
  | CloseSideBarAction
  | ToggleSideBarAction;

export const toggleSideBar = (): ToggleSideBarAction => ({
  type: AppActionKeys.ToggleSideBar
});
