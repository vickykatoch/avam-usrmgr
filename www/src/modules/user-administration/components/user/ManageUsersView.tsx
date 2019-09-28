//#region IMPORTS
import React, { FC, useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IAppState, IUserState, LoadStatus, IUser, SaveStatus } from "../../../../store/models";
import { loadUsers, ackSave, saveUser } from "../../../../store/actions";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { mapToArray } from "../../../../store/selectors/user-selectors";
import GridServiceProvider from "../../../../services/GridColumnProvider";
import UserForm from "./UserForm";
import UserListView from "./UserListView";
import { Header, FormDialog } from "../common";
//#endregion

//#region VIEW TYPES
interface IViewProps extends RouteComponentProps {
  usersState: IUserState;
  isLoading?: boolean;
}
interface IViewActions {
  loadUsers: () => void;
  ackSave: () => void;
  saveUser: (user: IUser, isNew?: boolean) => void;
}
interface INewOrEditUserState {
  isNew: boolean;
  user: IUser;
}
const BOOL_FIELDS = ["active"];
//#endregion

//#region HELPERS

const emptyUser = (): IUser => ({
  id: "",
  firstName: "",
  lastName: "",
  active: true
});
//#endregion

//#region RENDERER
const ManageUsersView: FC<IViewProps & IViewActions> = ({ usersState, loadUsers, saveUser, ackSave }) => {
  const [neUser, setNewEditUser] = useState<INewOrEditUserState>();
  const [isSaving, setSavingState] = useState(false);
  const [columns] = useState(GridServiceProvider.getColumns("UsersGrid"));
  const [users, setUsers] = useState(mapToArray(usersState.users));

  useEffect(() => {
    usersState.loadStatus === LoadStatus.None && loadUsers();
    usersState.loadStatus === LoadStatus.Loaded && setUsers(mapToArray(usersState.users));
    usersState.saveStatus === SaveStatus.Saving && setSavingState(true);
    if (usersState.saveStatus === SaveStatus.Saved) {
      setSavingState(false);
      setNewEditUser(undefined);
      ackSave();
      setUsers(mapToArray(usersState.users));
    }
  }, [usersState.loadStatus, usersState.saveStatus]);

  const handleUser = (user?: IUser) => setNewEditUser({ isNew: !user, user: user || emptyUser() });
  const handleCancel = () => setNewEditUser(undefined);
  const handleSave = () => {
    if (neUser) {
      //Validate
      saveUser(neUser.user, neUser.isNew);
    }
  };
  const handleSearchChange = (evt: any) => {
    const { value } = evt.target;
    console.log(value);
  };
  const handleUserStateChange = (evt: any) => {
    if (neUser) {
      const { name, value, checked } = evt.target;
      const isNew = neUser.isNew;
      let resolvedValue = BOOL_FIELDS.includes(name) ? checked : value;
      setNewEditUser({ isNew, user: { ...neUser.user, [name]: resolvedValue } });
    }
  };

  return (
    <div className="d-flex flex-fill flex-column v-scroll">
      <Header onNew={handleUser} onSearchTextChange={handleSearchChange} title="User List"></Header>
      <div className="d-flex flex-fill">
        <UserListView columns={columns} users={users} onEdit={handleUser}></UserListView>
      </div>
      {neUser && (
        <FormDialog open={true} title="New User" onCancel={handleCancel} onSubmit={handleSave} isBusy={isSaving}>
          <UserForm user={neUser.user} onChange={handleUserStateChange} isNew={neUser.isNew} />
        </FormDialog>
      )}
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
    loadUsers: () => dispatch(loadUsers()),
    ackSave: () => dispatch(ackSave()),
    saveUser: (user: IUser, isNew?: boolean) => dispatch(saveUser(user, isNew))
  };
};

const reduxConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withRouter(reduxConnect(ManageUsersView));
//#endregion
