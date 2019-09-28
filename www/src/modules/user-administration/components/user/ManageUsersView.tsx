//#region IMPORTS
import React, { FC, useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IAppState, IUserState, LoadStatus, IUser, SaveStatus } from "../../../../store/models";
import { loadUsers, ackSave, saveUser } from "../../../../store/actions";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { mapToArray } from "../../../../store/selectors/user-selectors";
import GridServiceProvider from "../../../../services/GridColumnProvider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import UserForm from "./UserForm";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { Typography } from "@material-ui/core";
import UserListView from "./UserListView";
import LinearProgress from "@material-ui/core/LinearProgress";
import Header from "../common/Header";

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
const DialogTitle = (props: any) => {
  const { children } = props;
  return (
    <MuiDialogTitle disableTypography className="d-flex">
      <Typography variant="h6" className="flex-fill">
        {children}
      </Typography>
    </MuiDialogTitle>
  );
};
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

  useEffect(() => {
    usersState.loadStatus === LoadStatus.None && loadUsers();
    switch (usersState.saveStatus) {
      case SaveStatus.Saving:
        setSavingState(true);
        break;
      case SaveStatus.Saved:
        setSavingState(false);
        setNewEditUser(undefined);
        ackSave();
        break;
      default:
        break;
    }
  }, [usersState.loadStatus, usersState.saveStatus]);

  const users = mapToArray(usersState.users);
  const columns = GridServiceProvider.getColumns("UsersGrid");
  const handleUser = (user?: IUser) => setNewEditUser({ isNew: !user, user: user || emptyUser() });
  const handleDialogClose = () => setNewEditUser(undefined);
  const handleSave = () => {
    if (neUser) {
      saveUser(neUser.user, neUser.isNew);
    }
  };
  const handleNewEditUserChange = (evt: any) => {
    if (neUser) {
      const { name, value, checked } = evt.target;
      const isNew = neUser.isNew;
      let resolvedValue = BOOL_FIELDS.includes(name) ? checked : value;
      setNewEditUser({ isNew, user: { ...neUser.user, [name]: resolvedValue } });
    }
  };
  return (
    <>
      <Header></Header>
      <div className="d-flex flex-fill v-scroll">
        <UserListView columns={columns} users={users} onEdit={handleUser}></UserListView>
      </div>
      {neUser && (
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={true}
          onClose={handleDialogClose}
          style={{ pointerEvents: isSaving ? "none" : "auto" }}>
          <DialogTitle>
            <span className="flex-fill"> {neUser.isNew ? "New User" : "Modify User"}</span>
            <LinearProgress color="secondary" hidden={!isSaving} />
          </DialogTitle>
          <DialogContent dividers>
            <UserForm user={neUser.user} onChange={handleNewEditUserChange} isNew={neUser.isNew} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
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
