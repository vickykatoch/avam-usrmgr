import { IUser } from "../models";
import { AppActionKeys } from "./action.keys";

export class MeLoadAction {
  readonly type = AppActionKeys.LoadMe;
  constructor(public readonly payload: IUser) {}
}

export type MeActionTypes = MeLoadAction;
