import { Dispatch } from "react";
import { UserActionKeys } from "./action.keys";
import UserDataApi from "../../api/user.api";
import { IAppState, IUser } from "../models";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

export enum UserActionTypes {
  LOADING_USERS = 'LOADING_USERS',
  LOADING_USERS_SUCCESS = 'LOADING_USERS_SUCCESS',
  LOADING_USERS_FAILED = 'LOADING_USERS_FAILED',
  SAVING_USERS = 'SAVING_USERS',
  SAVING_USERS_SUCCESS = 'SAVING_USERS_SUCCESS',
  SAVING_USERS_FAILED = 'SAVING_USERS_FAILED'
}




export function loadUsers(): ThunkAction<
  Promise<void>,
  IAppState,
  null,
  AnyAction
> {
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
export function saveUser(
  user: IUser,
  isNew?: boolean
): ThunkAction<Promise<void>, IAppState, null, AnyAction> {  
  return async (dispatch: Dispatch<AnyAction>, getState: any) => {
    try {
      const updatedUser = await UserDataApi.upsertUser(user, isNew);
      dispatch({
        type: UserActionKeys.UpsertUserSuccess,
        payload: updatedUser
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: UserActionKeys.UpsertUserFail, payload: error });
    }
  };
}
