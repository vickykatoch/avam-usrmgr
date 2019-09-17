import { IMeState } from "../models/user";
import { MeActionTypes, AppActionKeys } from "../actions";
import { LoadStatus } from "../models";

const DEFAULT_STATE: IMeState = {
  status: LoadStatus.None
};


export const reducer = (
  state: IMeState = DEFAULT_STATE,
  action: MeActionTypes
): IMeState => {
  switch (action.type) {
    case AppActionKeys.LoadMe:
      return { status: LoadStatus.Loaded, user: action.payload };
  }
  return state as IMeState;
};

export default reducer;
