//#region IMPORTS
import { IRole, IAppState, IUser } from "../models";
import { ThunkAction } from "redux-thunk";
import { AnyAction, Dispatch } from "redux";
import UserDataApi from "../../api/user.api";
//#endregion

//#region ACTION TYPES
export enum RoleActionType {
  LOADING_ROLES = "LOADING_ROLES",
  LOADING_ROLES_SUCCESS = "LOADING_ROLES_SUCCESS",
  LOADING_ROLES_FAILED = "LOADING_ROLES_FAILED",
  SAVING_ROLE = "SAVING_ROLE",
  SAVING_ROLE_SUCCESS = "SAVING_ROLE_SUCCESS",
  SAVING_ROLE_FAILED = "SAVING_ROLE_FAILED",
  ACK_ROLE_SAVE = "ACK_ROLE_SAVE"
}

export interface LoadingRoleAction {
  readonly type: RoleActionType;
}
export interface LoadSuccessRoleAction {
  readonly type: RoleActionType;
  readonly roles: Record<string, any>;
}
export interface LoadFailRoleAction {
  readonly type: RoleActionType;
  readonly error: string;
}
export interface SavingRoleAction {
  readonly type: RoleActionType;
}
export interface SaveSuccessRoleAction {
  readonly type: RoleActionType;
  readonly role: IRole;
}
export interface SaveFailRoleAction {
  readonly type: RoleActionType;
  readonly error: string;
}
export interface AckSaveRoleAction {
  readonly type: RoleActionType;
}

export type RoleAction =
  | LoadFailRoleAction
  | LoadSuccessRoleAction
  | LoadFailRoleAction
  | SavingRoleAction
  | SaveSuccessRoleAction
  | SaveFailRoleAction
  | AckSaveRoleAction;
//#endregion

//#region ACTION HANDLERS
export function loadRoles(): ThunkAction<Promise<void>, IAppState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>, getState: any) => {
    try {
      dispatch({ type: RoleActionType.LOADING_ROLES });
      const response = await UserDataApi.fetchRoles();
      const roles = response.reduce((acc: Record<string, any>, role: IRole) => {
        acc[role.id] = role;
        return acc;
      }, {});
      dispatch({ type: RoleActionType.LOADING_ROLES_SUCCESS, roles });
    } catch (error) {
      dispatch({
        type: RoleActionType.LOADING_ROLES_FAILED,
        error: error.message
      });
    }
  };
}
export function ackRoleSave(): AckSaveRoleAction {
  return { type: RoleActionType.ACK_ROLE_SAVE };
}

export function saveRole(role: IRole, isNew?: boolean): ThunkAction<Promise<void>, IAppState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>, getState: any) => {
    try {
      dispatch({ type: RoleActionType.SAVING_ROLE });
      // debugger;
      const updatedRole = await UserDataApi.upsertRole(role, isNew);
      dispatch({ type: RoleActionType.SAVING_ROLE_SUCCESS, role: updatedRole });
    } catch (error) {
      console.error(error);
      dispatch({ type: RoleActionType.SAVING_ROLE_FAILED, error: error.message });
    }
  };
}
//#endregion
