import {
  UserAction,
  UserActionType,
  LoadSuccessUserAction,
  LoadFailUserAction,
  SaveSuccessUserAction,
  SaveFailUserAction
} from "../actions";
import { LoadStatus, IUserState, SaveStatus } from "../models";

const DEFAULT_STATE: IUserState = {
  loadStatus: LoadStatus.None,
  saveStatus: SaveStatus.None,
  users: {}
};

const reducer = (state: IUserState = DEFAULT_STATE, action: UserAction): IUserState => {
  switch (action.type) {
    case UserActionType.LOADING_USERS:
      return { ...DEFAULT_STATE, loadStatus: LoadStatus.Loading };
    case UserActionType.LOADING_USERS_SUCCESS:
      return {
        ...state,
        loadStatus: LoadStatus.Loaded,
        loadError: "",
        saveStatus: SaveStatus.None,
        saveError: "",
        users: (action as LoadSuccessUserAction).users
      };
    case UserActionType.LOADING_USERS_FAILED:
      return {
        ...state,
        loadStatus: LoadStatus.Error,
        loadError: (action as LoadFailUserAction).error,
        saveStatus: SaveStatus.None,
        saveError: "",
        users: {}
      };
    case UserActionType.SAVING_USERS:
      return {
        ...state,
        saveStatus: SaveStatus.Saving,
        saveError: ""
      };
    case UserActionType.SAVING_USERS_SUCCESS:
      const savedUser = (action as SaveSuccessUserAction).user;
      return {
        ...state,
        saveStatus: SaveStatus.Saved,
        saveError: "",
        users: { ...state.users, ...{ [savedUser.id]: savedUser } }
      };
    case UserActionType.SAVING_USERS_FAILED:
      return {
        ...state,
        saveStatus: SaveStatus.Error,
        saveError: (action as SaveFailUserAction).error
      };
    case UserActionType.ACK_USER_SAVE:
      return {
        ...state,
        saveStatus: SaveStatus.None,
        saveError: ""
      };
  }
  return state;
};
export default reducer;
