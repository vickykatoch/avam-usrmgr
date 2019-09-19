import { Dispatch } from "react";
import { UserActionKeys } from "./action.keys";
import UserDataApi from "../../api/user.api";
import { IAppState, IUser } from "../models";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

export function loadUsers(): ThunkAction<Promise<void>, IAppState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>, getState: any) => {
    try {
      dispatch({ type: UserActionKeys.LoadingUsers });
      const users = await UserDataApi.fetchUsers();
      dispatch({ type: UserActionKeys.LoadUsersSuccess, payload: users });
    } catch (error) {
      dispatch({ type: UserActionKeys.LoadUsersFail, payload: error });
    }
  };
}
export function saveUser(user: IUser, isNew: boolean): ThunkAction<Promise<void>, IAppState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>, getState: any) => {
    try {            
      const response = await UserDataApi.upsertUser(user, isNew);
      dispatch({ type: UserActionKeys.UpdateUserSuccess, payload: response });
    } catch (error) {
      // debugger;
      console.error(error);
      dispatch({ type: UserActionKeys.UpdateUserFail, payload: error });
    }
  };
}
