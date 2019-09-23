import { IMeState, IUserState } from "./user";
import { ISideBarState } from "./side-bar-state";
import { IRoleState } from "./role";
import { IResourcesState } from "./resource";

export interface IAppState {
  meState: IMeState;
  sideBarState: ISideBarState;
  userState: IUserState;
  rolesState: IRoleState;
  resourcesState: IResourcesState;
}
