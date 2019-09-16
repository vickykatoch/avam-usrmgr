import { ISideBarState } from "../models";
import { SideBarActionTypes, AppActionKeys } from "../actions";

export const reducer = (
  state: ISideBarState = { isOpen: false },
  action: SideBarActionTypes
): ISideBarState => {
  switch (action.type) {
    case AppActionKeys.OpenSideBar:
      return { isOpen: true };
    case AppActionKeys.CloseSideBar:
      return { isOpen: false };
    case AppActionKeys.ToggleSideBar:
      return state.isOpen ? { isOpen: false } : { isOpen: true };
  }
  return state;
};

export default reducer;
