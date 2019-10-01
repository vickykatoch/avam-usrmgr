//#region IMPORTS
import { IResource, IAppState } from "../models";
import { ThunkAction } from "redux-thunk";
import { AnyAction, Dispatch } from "redux";
import UserDataApi from "../../api/user.api";
//#endregion

//#region ACTION TYPES
export enum ResourceActionType {
  LOADING_RESOURCES = "LOADING_RESOURCES",
  LOADING_RESOURCES_SUCCESS = "LOADING_RESOURCES_SUCCESS",
  LOADING_RESOURCES_FAILED = "LOADING_RESOURCES_FAILED",
  SAVING_RESOURCE = "SAVING_RESOURCE",
  SAVING_RESOURCE_SUCCESS = "SAVING_RESOURCE_SUCCESS",
  SAVING_RESOURCE_FAILED = "SAVING_RESOURCE_FAILED",
  ACK_RESOURCE_SAVE = "ACK_RESOURCE_SAVE"
}

export interface LoadingResourceAction {
  readonly type: ResourceActionType;
}
export interface LoadSuccessResourceAction {
  readonly type: ResourceActionType;
  readonly resources: Record<string, any>;
}
export interface LoadFailResourceAction {
  readonly type: ResourceActionType;
  readonly error: string;
}
export interface SavingResourceAction {
  readonly type: ResourceActionType;
}
export interface SaveSuccessResourceAction {
  readonly type: ResourceActionType;
  readonly resource: IResource;
}
export interface SaveFailResourceAction {
  readonly type: ResourceActionType;
  readonly error: string;
}
export interface AckSaveResourceAction {
  readonly type: ResourceActionType;
}

export type ResourceAction =
  | LoadFailResourceAction
  | LoadSuccessResourceAction
  | LoadFailResourceAction
  | SavingResourceAction
  | SaveSuccessResourceAction
  | SaveFailResourceAction
  | AckSaveResourceAction;
//#endregion

//#region ACTION HANDLERS
export function loadResources(): ThunkAction<Promise<void>, IAppState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>, getState: any) => {
    try {
      dispatch({ type: ResourceActionType.LOADING_RESOURCES });
      const response = await UserDataApi.fetchResources();
      const resources = response.reduce((acc: Record<string, any>, resource: IResource) => {
        acc[resource.id] = resource;
        return acc;
      }, {});
      dispatch({ type: ResourceActionType.LOADING_RESOURCES_SUCCESS, resources });
    } catch (error) {
      dispatch({
        type: ResourceActionType.LOADING_RESOURCES_FAILED,
        error: error.message
      });
    }
  };
}
export function ackResourceSave(): AckSaveResourceAction {
  return { type: ResourceActionType.ACK_RESOURCE_SAVE };
}

export function saveResource(resource: IResource, isNew?: boolean): ThunkAction<Promise<void>, IAppState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>, getState: any) => {
    try {
      dispatch({ type: ResourceActionType.SAVING_RESOURCE });
      const updatedResource = await UserDataApi.upsertResource(resource, isNew);
      dispatch({ type: ResourceActionType.SAVING_RESOURCE_SUCCESS, resource: updatedResource });
    } catch (error) {
      console.error(error);
      dispatch({ type: ResourceActionType.SAVING_RESOURCE_FAILED, error: error.message });
    }
  };
}
//#endregion
