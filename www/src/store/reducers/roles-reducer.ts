import {
  RoleAction,
  RoleActionType,
  LoadSuccessRoleAction,
  LoadFailRoleAction,
  SaveSuccessRoleAction,
  SaveFailRoleAction
} from "../actions";
import { LoadStatus, IRoleState, SaveStatus } from "../models";

const DEFAULT_STATE: IRoleState = {
  loadStatus: LoadStatus.None,
  saveStatus: SaveStatus.None,
  roles: {}
};

const reducer = (state: IRoleState = DEFAULT_STATE, action: RoleAction): IRoleState => {
  switch (action.type) {
    case RoleActionType.LOADING_ROLES:
      return { ...DEFAULT_STATE, loadStatus: LoadStatus.Loading };
    case RoleActionType.LOADING_ROLES_SUCCESS:
      return {
        ...state,
        loadStatus: LoadStatus.Loaded,
        loadError: "",
        saveStatus: SaveStatus.None,
        saveError: "",
        roles: (action as LoadSuccessRoleAction).roles
      };
    case RoleActionType.LOADING_ROLES_FAILED:
      return {
        ...state,
        loadStatus: LoadStatus.Error,
        loadError: (action as LoadFailRoleAction).error,
        saveStatus: SaveStatus.None,
        saveError: "",
        roles: {}
      };
    case RoleActionType.SAVING_ROLE:
      return {
        ...state,
        saveStatus: SaveStatus.Saving,
        saveError: ""
      };
    case RoleActionType.SAVING_ROLE_SUCCESS:
      const savedRole = (action as SaveSuccessRoleAction).role;
      return {
        ...state,
        saveStatus: SaveStatus.Saved,
        saveError: "",
        roles: { ...state.roles, ...{ [savedRole.id]: savedRole } }
      };
    case RoleActionType.SAVING_ROLE_FAILED:
      return {
        ...state,
        saveStatus: SaveStatus.Error,
        saveError: (action as SaveFailRoleAction).error
      };
    case RoleActionType.ACK_ROLE_SAVE:
      return {
        ...state,
        saveStatus: SaveStatus.None,
        saveError: ""
      };
  }
  return state;
};
export default reducer;
