import { LoadStatus, SaveStatus } from "./load-status";

export interface IResource {
  id: number;
  name: string;
  restricted?: boolean;
  active?: boolean;
}

export interface IResourcesState {
  loadStatus: LoadStatus;
  saveStatus: SaveStatus;
  loadError?: string;
  saveError?: string;
  resources: Record<string, IResource>;
}
