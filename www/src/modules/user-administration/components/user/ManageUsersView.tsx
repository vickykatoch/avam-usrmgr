//#region IMPORTS
import React, { FC, useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IAppState, IUserState, LoadStatus, IUser, SaveStatus } from "../../../../store/models";
import { loadUsers, ackSave, saveUser } from "../../../../store/actions";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { mapToArray } from "../../../../store/selectors/user-selectors";
import GridServiceProvider from "../../../../services/GridColumnProvider";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import UserForm from "./UserForm";
import MuiDialogTitle, { DialogTitleProps } from "@material-ui/core/DialogTitle";
import { Typography } from "@material-ui/core";
import { GridOptions } from "ag-grid-community";
import GridCellButtonRenderer from "../../../../common/components/grid/GridCellButtonRenderer";
import UserListView from "./UserListView";
import LinearProgress from "@material-ui/core/LinearProgress";
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
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
      }
    },
    searchIcon: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: 200
      }
    },
    neDialog: {
      width: 400
    }
  })
);
const gridOptions: GridOptions = {
  frameworkComponents: {
    gridCellButtonRenderer: GridCellButtonRenderer
  }
};
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

  const classes = useStyles();

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
      <div className="no-shrink p-1 d-flex align-items-center">
        <div className="flex-fill">Users List</div>
        <div className="no-shrink d-flex justify-content-end">
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <Fab color="primary" aria-label="add" size="small" onClick={() => handleUser()}>
            <AddIcon />
          </Fab>
        </div>
      </div>
      <UserListView columns={columns} users={users} onEdit={handleUser}></UserListView>
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
