import { IUserState } from "../models/user";
import { MeActionTypes, AppActionKeys } from "../actions";

export const reducer = (
  state: IUserState = { isLoaded: false },
  action: MeActionTypes
): IUserState => {
  switch (action.type) {
    case AppActionKeys.LoadMe:
      return { isLoaded: true, user: action.payload };
  }
  return state as IUserState;
};

export default reducer;
