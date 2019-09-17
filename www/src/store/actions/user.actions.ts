import { Dispatch } from "react";
import { UserActionKeys } from "./action.keys";
import UserDataApi from "../../api/user.api";
import { IAppState } from "../models";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";



export function loadUsers() : ThunkAction<Promise<void>, IAppState, null, AnyAction> {  
  return async (dispatch: Dispatch<AnyAction>, getState: any)  => {
    try {
      dispatch({type: UserActionKeys.LoadingUsers});
      const users = await UserDataApi.fetchUsers();
      dispatch({ type: UserActionKeys.LoadUsersSuccess, payload: users });    
    } catch(error) {
      dispatch({ type: UserActionKeys.LoadUsersFail, payload: error });    
    }
  };
}
