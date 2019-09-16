import { Dispatch } from "react";
import { AppActionKeys } from "./action.keys";
import UserDataApi from "../../api/user.api";
import { IUser } from "../models";

export interface ILoadUsersSuccess {
  readonly type: AppActionKeys.LoadUsersSuccess;
  readonly users: IUser[];
}
export interface ILoadUsersFail {
  readonly type: AppActionKeys.LoadUsersFail;
  readonly error: Error;
}
export type UserActionTypes = ILoadUsersSuccess | ILoadUsersFail;

export function loadUsers() {
  debugger;
  return async (dispatch: Dispatch<UserActionTypes>, getState: any) => {
    const users = await UserDataApi.fetchUsers();
    dispatch({ type: AppActionKeys.LoadUsersSuccess, users });
  };
}
