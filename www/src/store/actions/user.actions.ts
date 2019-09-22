import { Dispatch } from "react";
import { UserActionKeys } from "./action.keys";
import UserDataApi from "../../api/user.api";
import { IAppState, IUser } from "../models";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

export enum UserActionType {
  LOADING_USERS = "LOADING_USERS",
  LOADING_USERS_SUCCESS = "LOADING_USERS_SUCCESS",
  LOADING_USERS_FAILED = "LOADING_USERS_FAILED",
  SAVING_USERS = "SAVING_USERS",
  SAVING_USERS_SUCCESS = "SAVING_USERS_SUCCESS",
  SAVING_USERS_FAILED = "SAVING_USERS_FAILED",
  ACK_USER_SAVE = "ACK_USER_SAVE"
}

export interface LoadingUserAction {
  readonly type: UserActionType;
}
export interface LoadSuccessUserAction {
  readonly type: UserActionType;
  readonly users: Record<string, any>;
}
export interface LoadFailUserAction {
  readonly type: UserActionType;
  readonly error: string;
}
export interface SavingUserAction {
  readonly type: UserActionType;
}
export interface SaveSuccessUserAction {
  readonly type: UserActionType;
  readonly user: any;
}
export interface SaveFailUserAction {
  readonly type: UserActionType;
  readonly error: string;
}
export interface AckSaveUserAction {
  readonly type: UserActionType;
}

export type UserAction =
  | LoadFailUserAction
  | LoadSuccessUserAction
  | LoadFailUserAction
  | SavingUserAction
  | SaveSuccessUserAction
  | SaveFailUserAction
  | AckSaveUserAction;

export function loadUsers(): ThunkAction<Promise<void>, IAppState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>, getState: any) => {
    try {
      dispatch({ type: UserActionType.LOADING_USERS });
      const response = await UserDataApi.fetchUsers();
      const users = response.reduce((acc: Record<string, any>, usr: IUser) => {
        acc[usr.id] = usr;
        return acc;
      }, {});
      dispatch({ type: UserActionType.LOADING_USERS_SUCCESS, users });
    } catch (error) {
      dispatch({
        type: UserActionType.LOADING_USERS_FAILED,
        error: error.message
      });
    }
  };
}
export function ackSave(): AckSaveUserAction {
  return { type: UserActionType.ACK_USER_SAVE };
}
export function saveUser(user: IUser, isNew?: boolean): ThunkAction<Promise<void>, IAppState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>, getState: any) => {
    try {
      dispatch({ type: UserActionType.SAVING_USERS });
      const updatedUser = await UserDataApi.upsertUser(user, isNew);
      dispatch({ type: UserActionType.SAVING_USERS_SUCCESS, user: updatedUser });
    } catch (error) {
      console.error(error);
      dispatch({ type: UserActionType.SAVING_USERS_FAILED, error: error.message });
    }
  };
}
