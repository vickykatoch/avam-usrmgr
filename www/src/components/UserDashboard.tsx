import React, { useEffect, useState } from "react";
import { loadUsers, saveUser } from "../store/actions";
import { IAppState, IUsersState, LoadStatus, IUser } from "../store/models";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import UserList from "./UserList";
import EditNewUser from "./EditNewUser";
import { ICombinedRouterAppState } from "../store/system-reducer";
import { RouterState } from "connected-react-router";


interface LocalState {
  usersState: IUsersState;
  router: RouterState;
  load: () => void;
  save: (user: IUser, isNew: boolean) => void;
}

//#region Render Fragments
const Header: React.StatelessComponent<any> = ({ onNew }) => (
  <div className="d-flex no-shrink mb-1">
    <h4 className="flex-fill">Users Management</h4>
    <button className="btn btn-sm btn-outline-primary no-shrink" onClick={onNew}>
      <i className="fa fa-plus mr-2" aria-hidden="true"></i>
      New
    </button>
  </div>
);
const Status: React.StatelessComponent<any> = ({ usersState }) => {
  if (usersState.loadStatus === LoadStatus.Loading) {
    return (
      <span className="no-shrink p-2">
        <i className="fa fa-spinner fa-spin"></i>
        <span>Loading, Please wait...</span>
      </span>
    );
  } else if (usersState.loadStatus === LoadStatus.Error) {
    return <span className="alert alert-danger">{usersState.errorDescription}</span>;
  }
  return null;
};
//#endregion

const UserDashBoard = (props: LocalState) => {
  useEffect(() => {
    if (props.usersState.loadStatus === LoadStatus.None) {
      props.load();
    }
  }, [props]);
  const { usersState } = props;

  const [newUser, setNewUser] = useState(false);
  const [editUser, setEditUser] = useState();

  const onUserEdit = (user: IUser) => setEditUser(user);
  const onCancel = () => {
    setNewUser(false);
    setEditUser(null);
  };
  const onSaveUser = (user: IUser) => {
    console.log("Save user called", user);
    props.save(user, newUser);
    setNewUser(false);
    setEditUser(null);
  };

  let editOrNewUserFrom = null;
  if (newUser || editUser) {
    editOrNewUserFrom = (
      <div className="overlay p-4">
        <EditNewUser onSave={onSaveUser} onCancel={onCancel} user={newUser || editUser} />
      </div>
    );
  }

  return (
    <div className="d-flex flex-fill flex-column">
      <Header {...{ onNew: () => setNewUser(true) }} />
      <Status {...props} />
      <UserList users={usersState.users} onEdit={onUserEdit} />
      {editOrNewUserFrom}
    </div>
  );
};

//#region REDUX WIRING
const mapStateToProps = (state: ICombinedRouterAppState) => {
  return {
    usersState: state.appState.usersState,
    router: state.router
  };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
  const actions = {
    load: () => {
      dispatch(loadUsers());
    },
    save: (user: IUser, isNew: boolean) => {
      dispatch(saveUser(user, isNew));
    }
  };
  return actions;
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDashBoard);
//#endregion
