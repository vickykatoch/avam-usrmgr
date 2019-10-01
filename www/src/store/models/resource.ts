import { LoadStatus, SaveStatus } from "./load-status";

export interface IResource {
  id: string;
  name: string;
  restricted?: boolean;
  active?: boolean;
  createdOn?: number;
  lastUpdatedOn?: number;
}

export interface IResourcesState {
  loadStatus: LoadStatus;
  saveStatus: SaveStatus;
  loadError?: string;
  saveError?: string;
  resources: Record<string, IResource>;
}
