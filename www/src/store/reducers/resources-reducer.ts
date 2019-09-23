import {
  ResourceAction,
  ResourceActionType,
  LoadSuccessResourceAction,
  LoadFailResourceAction,
  SaveSuccessResourceAction,
  SaveFailResourceAction
} from "../actions";
import { LoadStatus, IResourcesState, SaveStatus } from "../models";

const DEFAULT_STATE: IResourcesState = {
  loadStatus: LoadStatus.None,
  saveStatus: SaveStatus.None,
  resources: {}
};

const reducer = (state: IResourcesState = DEFAULT_STATE, action: ResourceAction): IResourcesState => {
  switch (action.type) {
    case ResourceActionType.LOADING_RESOURCES:
      return { ...DEFAULT_STATE, loadStatus: LoadStatus.Loading };
    case ResourceActionType.LOADING_RESOURCES_SUCCESS:
      return {
        ...state,
        loadStatus: LoadStatus.Loaded,
        loadError: "",
        saveStatus: SaveStatus.None,
        saveError: "",
        resources: (action as LoadSuccessResourceAction).resources
      };
    case ResourceActionType.LOADING_RESOURCES_FAILED:
      return {
        ...state,
        loadStatus: LoadStatus.Error,
        loadError: (action as LoadFailResourceAction).error,
        saveStatus: SaveStatus.None,
        saveError: "",
        resources: {}
      };
    case ResourceActionType.SAVING_RESOURCE:
      return {
        ...state,
        saveStatus: SaveStatus.Saving,
        saveError: ""
      };
    case ResourceActionType.SAVING_RESOURCE_SUCCESS:
      const savedResource = (action as SaveSuccessResourceAction).resource;
      return {
        ...state,
        saveStatus: SaveStatus.Saved,
        saveError: "",
        resources: { ...state.resources, ...{ [savedResource.id]: savedResource } }
      };
    case ResourceActionType.SAVING_RESOURCE_FAILED:
      return {
        ...state,
        saveStatus: SaveStatus.Error,
        saveError: (action as SaveFailResourceAction).error
      };
    case ResourceActionType.ACK_RESOURCE_SAVE:
      return {
        ...state,
        saveStatus: SaveStatus.None,
        saveError: ""
      };
  }
  return state;
};
export default reducer;
