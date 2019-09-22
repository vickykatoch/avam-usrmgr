//#region IMPORTS
import React, { FC, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IAppState, IUsersState, LoadStatus } from "../../../../store/models";
import { loadUsers } from "../../../../store/actions";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import UserList from "./UserList";
//#endregion


//#region VIEW TYPES
interface IViewProps extends RouteComponentProps {
  usersState: IUsersState;
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
    console.log('use effects called');
  },[]);

  return (
    <div className="d-flex flex-column flex-fill pt-1">
      {loading && (
        <h5>
          <i className="fa fa-spinner fa-spin"></i> Loading users. Please wait...
        </h5>
      )}
      {usersState.users.length ? (
        <UserList
          users={usersState.users}
          url={`${match.path}`}
          onDelete={(id: string) => {
            console.log("User deleted");
          }}
        />
      ) : (
        !usersState.users.length && !loading && <div>No user exist</div>
      )}
    </div>
  );
};
//#endregion

//#region REDUX WIRING
const mapStateToProps = (state: IAppState, ownProps: RouteComponentProps): IViewProps => {
  return {
    usersState: state.usersState,
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
