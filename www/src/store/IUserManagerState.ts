import { IUser } from "./models/user";
// import { IRole } from "./models/role";
// import { IResource } from "./models/resource";

export interface IApplicationState {
  me?: IUser;
}

export const DEFAULT_APP_STATE: IApplicationState = {
  me: undefined
};

// users: IUser[];
// roles: IRole[];
// resources: IResource[];
