import { IMeState, IUserState } from "./user";
import { ISideBarState } from "./side-bar-state";
import { IRoleState } from "./role";

export interface IAppState {
  meState: IMeState;
  sideBarState: ISideBarState;
  userState: IUserState;
  rolesState: IRoleState;
}
