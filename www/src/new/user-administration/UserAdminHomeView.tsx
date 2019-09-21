import React, { FC } from "react";
import { RouteComponentProps, Switch } from "react-router-dom";
import UserListFragment from "./components/UserListFragment";
import { Route } from "react-router-dom";
import { IUser } from "../../store/models";
import RolesFragment from "./components/RolesFragment";
import ResourcesFragment from "./components/ResourcesFragment";
import MenuBarFragment from "./components/MenuBarFragment";

interface IUserAdminState extends RouteComponentProps {}

const UserAdminHomeView: FC<IUserAdminState> = (viewState: IUserAdminState) => {
  const props = {
    users: [],
    roles: [],
    resources: []
  };
  const baseUrl = viewState.match.path;

  return (
    <div className="d-flex flex-fill flex-column">      
      <div className="d-flex no-shrink">
        <MenuBarFragment></MenuBarFragment>
      </div>
      <Switch>
      <Route
          path={`${baseUrl}`}
          render={() => {
            return <UserListFragment users={props.users} />;
          }}
          exact
        />
        <Route
          path={`${baseUrl}/roles`}
          render={() => {
            return <RolesFragment roles={props.roles} />;
          }}
        />
        <Route
          path={`${baseUrl}/resources`}
          render={() => {
            return <ResourcesFragment resources={props.resources} />;
          }}
        />
         
      </Switch>
    </div>
  );
};
export default UserAdminHomeView;
