import { IUser } from "../models/user";
import { UserActionTypes, AppActionKeys } from "../actions";

export const reducer = (
  state: IUser[] = [],
  action: UserActionTypes
): IUser[] => {
  switch (action.type) {
    case AppActionKeys.LoadUsersSuccess:
      return action.users;
  }
  return state;
};

export default reducer;
