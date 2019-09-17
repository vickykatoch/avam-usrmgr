import { IMeState, IUsersState } from "./user";
import { ISideBarState } from "./side-bar-state";

export interface IAppState {
  meState: IMeState;
  sideBarState: ISideBarState;
  usersState: IUsersState;
}
