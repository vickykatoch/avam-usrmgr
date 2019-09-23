import { LoadStatus, SaveStatus } from "./load-status";

export interface IRole {
  id: string;
  name: string;
  supreme?: boolean;
  active?: boolean;
  lastUpdate?: number;
  lastUpdatedBy?: string;
  acl: number;
}

export interface IRoleState {
  loadStatus: LoadStatus;
  saveStatus: SaveStatus;
  loadError?: string;
  saveError?: string;
  roles: Record<string, IRole>;
}
