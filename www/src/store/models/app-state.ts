import { IUserState } from "./user";
import { ISideBarState } from "./side-bar-state";

export interface IAppState {
  me: IUserState;
  sideBarState: ISideBarState;
}
export const DEFAULT_APP_STATE: IAppState = {
  me: {
    isLoaded: false
  },
  sideBarState: {
    isOpen: true
  }
};
