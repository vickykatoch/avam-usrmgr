import { IRole } from "./role";
import { IUserOverride } from "./user-overrides";
import { LoadStatus } from "./load-status";

export interface IUser {
  sid: string;
  firstName: string;
  lastName: string;
  me?: boolean;
  roles: IRole[];
  active?: boolean;
  lastUpdate?: number;
  lastUpdatedBy?: string;
  aclOverrides: IUserOverride[];
}

export interface IMeState {
  status: LoadStatus;
  user?: IUser;
  errorDescription?: string;
}
export interface IUsersState {
  loadStatus: LoadStatus;
  users: IUser[];
  errorDescription?: string;
}
