import { AppActionKeys } from "./action.keys";

export class OpenSideBarAction {
  readonly type = AppActionKeys.OpenSideBar;
}
export class CloseSideBarAction {
  readonly type = AppActionKeys.CloseSideBar;
}
export class ToggleSideBarAction {
  readonly type = AppActionKeys.ToggleSideBar;
}
export type SideBarActionTypes =
  | OpenSideBarAction
  | CloseSideBarAction
  | ToggleSideBarAction;
