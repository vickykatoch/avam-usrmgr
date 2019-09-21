import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import UserList from "./components/UserList";
import { Route } from "react-router-dom";
import { IUser } from "../../store/models";

interface IUserAdminState {
  routerState: RouteComponentProps;
}

const UserAdminHomeView: FC<IUserAdminState> = (viewState: IUserAdminState) => {
  const props = {
    users: []
  };
  return (
    <div className="d-flex flex-fill flex-column">
      <h1>User Admin Home</h1>
      {/* <Route
        path="/" render={(props) => {
          <UserList ...{props}></UserList>;
        }}/> */}
    </div>
  );
};
export default UserAdminHomeView;
