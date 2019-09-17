import React, { useEffect, useState } from "react";
import { loadUsers } from "../store/actions";
import { IAppState, IUsersState, LoadStatus, IUser } from "../store/models";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { JSXElement } from "@babel/types";
import UserList from "./UserList";
import EditNewUser from "./EditNewUser";

interface LocalState {
  usersState: IUsersState;
  load: () => void;
}
const getRenderElement = (usersState: IUsersState): JSXElement => {
  let element: any;
  if (usersState.loadStatus === LoadStatus.Loading) {
    element = (
      <span className="no-shrink p-2">
        <i className="fa fa-spinner fa-spin"></i>
      </span>
    );
  } else if (usersState.loadStatus === LoadStatus.Error) {
    element = (
      <span className="alert alert-danger">{usersState.errorDescription}</span>
    );
  } else {
    element = (
      <div className="d-flex flex-fill">
        <UserList users={usersState.users} />
      </div>
    );
  }
  return element;
};
const getNewEditUser = (user: IUser | boolean | null): JSXElement => {
  let element: any;
  if (user) {
    if (user === true) {
      element = (
        <div className="overlay p-4">
          <EditNewUser />
        </div>
      );
    } else {
      element = (
        <div className="overlay p-4">
          <EditNewUser />
        </div>
      );
    }
  }
  return element;
};

const UserDashBoard = (props: LocalState) => {
  useEffect(() => {
    if (props.usersState.loadStatus === LoadStatus.None) {
      props.load();
    }
  }, [props]);
  const [newUser, setNewUser] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const { usersState } = props;
  return (
    <div className="d-flex flex-fill flex-column">
      <div className="d-flex no-shrink mb-1">
        <h4 className="flex-fill">Users Management</h4>
        <button
          className="btn btn-sm btn-outline-primary no-shrink"
          onClick={() => setNewUser(true)}
        >
          <i className="fa fa-plus mr-2" aria-hidden="true"></i>
          New
        </button>
      </div>
      {getRenderElement(usersState)}
      {getNewEditUser(newUser || editUser)}
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    usersState: state.usersState
  };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
  const actions = {
    load: () => {
      dispatch(loadUsers());
    }
  };
  return actions;
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDashBoard);
