//#region IMPORTS
import React, { Component, memo } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IUserState, IUser, IAppState } from "../../../../store/models";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { loadUsers, ackSave, saveUser } from "../../../../store/actions";
import GridServiceProvider from "../../../../services/GridColumnProvider";
import { GridCellButtonRenderer } from "../../../../common";
import { AgGridReact } from "ag-grid-react";
import { mapToArray } from "../../../../store/selectors/user-selectors";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import UserForm from "./UserForm";
import MuiDialogTitle, { DialogTitleProps } from "@material-ui/core/DialogTitle";
import { Typography } from "@material-ui/core";
import { GridApi, GridReadyEvent, ColumnApi, GridOptions } from "ag-grid-community";
//#endregion

//#region VIEW TYPES
interface IViewProps extends RouteComponentProps {
  usersState: IUserState;
  isLoading?: boolean;
  classes: any;
}
interface IViewActions {
  loadUsers: () => void;
  ackSave: () => void;
  saveUser: (user: IUser, isNew?: boolean) => void;
}
const BOOL_FIELDS = ["active"];
//#endregion

//#region HELPERS
const styles = (theme: Theme) =>
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
  });

const DialogTitle = (props: any) => {
  const { children, isSaving } = props;
  return (
    <MuiDialogTitle disableTypography className="d-flex">
      <Typography variant="h6" className="flex-fill">
        {children}
      </Typography>
      {isSaving && (
        <div className="no-shrink">
          <span>Saving. Please wait...</span>
        </div>
      )}
    </MuiDialogTitle>
  );
};
//#endregion

class ManageUserView extends Component<IViewProps & IViewActions> {
  public state: any;
  private gridApi?: GridApi;
  private colApi?: ColumnApi;
  private gridOptions: GridOptions;

  constructor(props: IViewProps & IViewActions) {
    super(props);
    this.gridOptions = {
      columnDefs: GridServiceProvider.getColumns("UsersGrid"),
      frameworkComponents: {
        gridCellButtonRenderer: GridCellButtonRenderer
      },
      context: { componentParent: this }
    };
  }
  handleNewUser = () => {};
  onGridReady = (event: GridReadyEvent) => {
    this.gridApi = event.api;
    this.colApi = event.columnApi;
  };

  componentDidMount() {}
  componentWillUnmount() {}

  render() {
    const { usersState, classes } = this.props;
    const { columnDefs, frameworkComponents, context } = this.gridOptions;
    const users = mapToArray(usersState.users);

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

            <Fab color="primary" aria-label="add" size="small" onClick={this.handleNewUser}>
              <AddIcon />
            </Fab>
          </div>
        </div>
        <div className="flex-fill ag-theme-balham">
          <AgGridReact columnDefs={columnDefs} frameworkComponents={frameworkComponents} context={context} rowData={users}></AgGridReact>
        </div>
      </>
    );
  }
}

//#region REDUX WIRING
const mapStateToProps = (state: IAppState, ownProps: any): IViewProps => {
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
const useStyles = withStyles(styles);
export default useStyles(withRouter(reduxConnect(ManageUserView)));
//#endregion
