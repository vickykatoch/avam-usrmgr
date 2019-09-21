import { UserActionKeys } from "../actions";
import { LoadStatus, IUsersState } from "../models";
import { AnyAction } from "redux";

const DEFAULT_STATE: IUsersState = {
  loadStatus: LoadStatus.None,
  users: []
};

export const reducer = (
  state: IUsersState = DEFAULT_STATE,
  action: AnyAction
): IUsersState => {
  switch (action.type) {
    case UserActionKeys.LoadingUsers:
      return { loadStatus: LoadStatus.Loading, users: [] };
    case UserActionKeys.LoadUsersSuccess:
      return { loadStatus: LoadStatus.Loaded, users: [...action.payload] };
    case UserActionKeys.LoadUsersFail:
      return {
        loadStatus: LoadStatus.Error,
        users: [],
        errorDescription: action.payload.message
      };
    case UserActionKeys.UpsertUserSuccess:
      const users = state.users.filter(x => x.id !== action.payload.id);
      return {
        loadStatus: LoadStatus.Loaded,
        users: [...users, action.payload]
      };
  }
  return state;
};

export default reducer;
