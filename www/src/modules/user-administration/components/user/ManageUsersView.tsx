//#region IMPORTS
import React, { FC, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IAppState, IUserState, LoadStatus } from "../../../../store/models";
import { loadUsers } from "../../../../store/actions";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import UserList from "./UserList";
import { mapUsersToArray } from "../../../../store/selectors/user-selectors";
//#endregion

//#region VIEW TYPES
interface IViewProps extends RouteComponentProps {
  usersState: IUserState;
  isLoading?: boolean;
}
interface IViewActions {
  loadUsers: () => void;
}
//#endregion

//#region HELPERS

//#endregion

//#region RENDERER
const ManageUsersView: FC<IViewProps & IViewActions> = ({ usersState, loadUsers, match }) => {
  const loading = usersState.loadStatus === LoadStatus.None || usersState.loadStatus === LoadStatus.Loading;
  useEffect(() => {
    usersState.loadStatus === LoadStatus.None && loadUsers();
    console.log("use effects called");
  }, []);
  const users = mapUsersToArray(usersState.users);
  return (
    <div className="d-flex flex-column flex-fill pt-1">
      {loading && (
        <h5>
          <i className="fa fa-spinner fa-spin"></i> Loading users. Please wait...
        </h5>
      )}
      <UserList
        users={users}
        url={`${match.path}`}
        onDelete={(id: string) => {
          console.log("User deleted");
        }}
      />
      {/* {!usersState.users.length && !loading && <div>No user exist</div>} */}
    </div>
  );
};
//#endregion

//#region REDUX WIRING
const mapStateToProps = (state: IAppState, ownProps: RouteComponentProps): IViewProps => {
  return {
    usersState: state.userState,
    ...ownProps
  };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, any, any>): IViewActions => {
  return {
    loadUsers: () => dispatch(loadUsers())
  };
};

const reduxConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default withRouter(reduxConnect(ManageUsersView));
//#endregion
