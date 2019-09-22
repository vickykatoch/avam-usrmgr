//#region IMPORTS
import React, { FC, useState, useEffect } from "react";
import { withRouter, RouteComponentProps, NavLink } from "react-router-dom";
import { IUser, IAppState, IUsersState, LoadStatus } from "../../../../store/models";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import TextInput from "../../../../common/components/TextInput";
import UserForm from "./UserForm";
import { saveUser, loadUsers } from "../../../../store/actions";
//#endregion

//#region VIEW PROPS
interface IViewProps extends RouteComponentProps {
  user: IUser;
  usersState: IUsersState;
  notFound?: boolean;
  isNew?: boolean;
}
interface IViewActions {
  loadUsers: () => void;
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
//#endregion

//#region RENDERER
const ManageUserView: FC<IViewProps & IViewActions> = ({ user, usersState, isNew, notFound, loadUsers, saveUser, match }) => {
  const [usr, setUser] = useState({ ...user }); 
  useEffect(() => {
    usersState.loadStatus === LoadStatus.None && loadUsers();
  }, []);
  const handleChange = (evt: any) => {
    const { target } = evt;
    setUser({ ...usr, [target.name]: target.value });
  };
  const handleSave = () => saveUser(usr, isNew);
  return (
    <div className="d-flex justify-content-center p-1">
      <div className="d-flex flex-column" style={VIEW_WRAP}>
        <h3 className="d-flex no-shrink mt-1">{isNew ? "New User" : "Edit User"}</h3>
        <div className="d-flex flex-fill flex-column mt-1">
          <UserForm user={usr} onChange={handleChange}></UserForm>
        </div>
        <div className="d-flex no-shrink mt-4">
          <div className="flex-fill"></div>
          <div className="btn-group d-flex justify-content-end mt-1">
            <button className="btn btn-sm btn-outline-primary" onClick={handleSave}>
              Save
            </button>
            <NavLink className="btn btn-sm btn-outline-danger" to="/users">Cancel</NavLink>
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
        usersState: state.usersState,
        isNew: true,
        ...ownProps
      };
    } else {
      const user = state.usersState.loadStatus === LoadStatus.Loaded ? state.usersState.users.find(usr => usr.id === id) : newUser;
      if (user) {
        resolvedProps = {
          user,
          usersState: state.usersState,
          ...ownProps
        };
      } else {
        resolvedProps = {
          user: newUser,
          usersState: state.usersState,
          notFound: true,
          ...ownProps
        };
      }
    }
  } else {
    resolvedProps = {
      user: emptyUser(),
      notFound: true,
      usersState: state.usersState,
      ...ownProps
    };
  }
  return resolvedProps;
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, any, any>): IViewActions => {
  return {
    loadUsers: () => dispatch(loadUsers()),
    saveUser: (user: IUser, isNew?: boolean) => dispatch(saveUser(user, isNew))
  };
};

const reduxConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default withRouter(reduxConnect(ManageUserView));
//#endregion
