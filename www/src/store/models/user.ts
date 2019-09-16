import { IRole } from "./role";
import { IUserOverride } from "./user-overrides";

export interface IUser {
  sid: string;
  firstName: string;
  lastName: string;
  me?: boolean;
  roles: IRole[];
  active?: boolean;
  aclOverrides: IUserOverride[];
}

export interface IUserState {
  isLoaded: boolean;
  user?: IUser;
}
