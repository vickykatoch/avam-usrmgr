//#region IMPORTS
import React, { FC, useState, useEffect } from "react";
import { withRouter, RouteComponentProps, NavLink, Redirect } from "react-router-dom";
import { IUser, IAppState, IUserState, LoadStatus, SaveStatus } from "../../../../store/models";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import UserForm from "./UserForm";
import { saveUser, loadUsers, ackSave } from "../../../../store/actions";
//#endregion

//#region VIEW PROPS
interface IViewProps extends RouteComponentProps {
  user: IUser;
  usersState: IUserState;
  notFound?: boolean;
  isNew?: boolean;
}
interface IViewActions {
  loadUsers: () => void;
  ackSave: () => void;
  saveUser: (user: IUser, isNew?: boolean) => void;
}
const VIEW_WRAP = {
  width: "400px"
};

//#endregion

//#region HELPERS
const emptyUser = (): IUser => ({
  id: "",
  firstName: "",
  lastName: "",
  active: false
});
const notFoundRenderer = (id: string) => {
  return <h3>User {id} is not found</h3>;
};
//#endregion

//#region RENDERER
const ManageUserView: FC<IViewProps & IViewActions> = ({ user, usersState, isNew, notFound, loadUsers, saveUser, ackSave, match }) => {
  const [usr, setUser] = useState(user);
  useEffect(() => {
    usersState.loadStatus === LoadStatus.None && loadUsers();
    if (usersState.loadStatus === LoadStatus.Loaded && usersState.saveStatus === SaveStatus.None && !isNew) {
      setUser(user);
    }
  }, [usersState]);

  if (usersState.saveStatus === SaveStatus.Saved) {
    ackSave();
    return <Redirect to="/users" />;
  }
  if (notFound) {
    return notFoundRenderer(user.id);
  }
  const isSaving = usersState.saveStatus === SaveStatus.Saving;
  const handleChange = (evt: any) => {
    const { target } = evt;
    setUser({ ...usr, [target.name]: target.value });
  };
  const handleSave = () => saveUser(usr, isNew);

  return (
    <div className="d-flex justify-content-center p-1" style={{ pointerEvents: isSaving ? "none" : "auto" }}>
      <div className="d-flex flex-column" style={VIEW_WRAP}>
        <div className="d-flex no-shrink mt-1">
          <h3 className="flex-fill">{isNew ? "New User" : "Edit User"}</h3>
          {isSaving && (
            <div className="d-flex justify-content-end no-shrink ml-3 alert-primary">
              <span>
                <i className="fa fa-spin fa-spinner"></i> Saving. Please wait...
              </span>
            </div>
          )}
        </div>
        {usersState.saveStatus === SaveStatus.Error && <div className="alert-danger">{usersState.saveError}</div>}
        <div className="d-flex flex-fill flex-column mt-1">
          <UserForm user={usr} onChange={handleChange}></UserForm>
        </div>
        <div className="d-flex no-shrink mt-4">
          <div className="flex-fill"></div>
          <div className="btn-group d-flex justify-content-end mt-1">
            <button className="btn btn-sm btn-outline-primary" onClick={handleSave}>
              Save
            </button>
            <NavLink className="btn btn-sm btn-outline-danger" to="/users">
              Cancel
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
//#endregion

//#region REDUX WIRING
const mapStateToProps = (state: IAppState, ownProps: RouteComponentProps): IViewProps => {
  // @ts-ignore
  const { id } = ownProps.match.params;
  let resolvedProps: IViewProps;
  const newUser = emptyUser();
  if (id) {
    if (+id === 0) {
      resolvedProps = {
        user: newUser,
        usersState: state.userState,
        isNew: true,
        ...ownProps
      };
    } else {
      const user = state.userState.loadStatus === LoadStatus.Loaded ? state.userState.users[id] : newUser;
      if (user) {
        resolvedProps = {
          user: { ...user },
          usersState: state.userState,
          ...ownProps
        };
      } else {
        resolvedProps = {
          user: newUser,
          usersState: state.userState,
          notFound: true,
          ...ownProps
        };
      }
    }
  } else {
    resolvedProps = {
      user: emptyUser(),
      notFound: true,
      usersState: state.userState,
      ...ownProps
    };
  }
  return resolvedProps;
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, any, any>): IViewActions => {
  return {
    loadUsers: () => dispatch(loadUsers()),
    ackSave: () => dispatch(ackSave()),
    saveUser: (user: IUser, isNew?: boolean) => dispatch(saveUser(user, isNew))
  };
};

const reduxConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default withRouter(reduxConnect(ManageUserView));
//#endregion
