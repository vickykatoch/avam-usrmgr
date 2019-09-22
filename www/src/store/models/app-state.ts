import { IMeState, IUserState } from "./user";
import { ISideBarState } from "./side-bar-state";

export interface IAppState {
  meState: IMeState;
  sideBarState: ISideBarState;
  userState: IUserState;
}
