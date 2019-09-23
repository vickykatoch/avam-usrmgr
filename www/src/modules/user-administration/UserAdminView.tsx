import React, { Component } from "react";
import { IAppState, IUserState, IUser } from "../../store/models";
import { RouteComponentProps, withRouter, Switch, Route } from "react-router";
import { ThunkDispatch } from "redux-thunk";
import { loadUsers, saveUser } from "../../store/actions";
import { connect } from "react-redux";
import MenuBarFragment from "./components/MenuBarFragment";
import ResourcesFragment from "./components/resources/ResourcesFragment";
import ManageUserView from "./components/user/ManageUserView";
import ManageUsersView from "./components/user/ManageUsersView";
import ManageRolesView from "./components/roles/ManageRolesView";
import ManageRoleView from "./components/roles/ManageRoleView";

//#region View Types
interface IViewProps extends RouteComponentProps {
  usersState: IUserState;
}
interface IViewActions {
  loadUsers: () => void;
  saveUser: (user: IUser, isNew: boolean) => void;
}

//#endregion

class UserAdminView extends Component<IViewProps & IViewActions> {
  render() {
    const baseUrl = this.props.match.path;
    const props = {
      users: [],
      roles: [],
      resources: []
    };
    return (
      <div className="d-flex flex-fill flex-column">
        <div className="d-flex no-shrink">
          <MenuBarFragment></MenuBarFragment>
        </div>
        <Switch>
          <Route path={`${baseUrl}`} component={ManageUsersView} exact />
          <Route path={`${baseUrl}/roles/:id`} component={ManageRoleView} />
          <Route path={`${baseUrl}/roles`} component={ManageRolesView} />
          <Route path={`${baseUrl}/resources`} render={() => <ResourcesFragment resources={props.resources} />} />
          <Route path={`${baseUrl}/:id`} component={ManageUserView} />
        </Switch>
      </div>
    );
  }
}

//#region REDUX WIRING
const mapStateToProps = (state: IAppState, ownProps: RouteComponentProps): IViewProps => {
  return {
    usersState: state.userState,
    ...ownProps
  };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, any, any>): IViewActions => {
  return {
    loadUsers: () => dispatch(loadUsers()),
    saveUser: (user: IUser, isNew: boolean) => dispatch(saveUser(user, isNew))
  };
};
const reduxConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default withRouter(reduxConnect(UserAdminView));
//#endregion
