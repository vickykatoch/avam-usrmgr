import React, { FC, useState } from "react";
import { IUserState, IUser, IAppState } from "../../store/models";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { loadUsers, saveUser } from "../../store/actions";
import { connect } from "react-redux";
import { Tab, Tabs, Typography, Box } from "@material-ui/core";
import ManageUsersView from "./components/user/ManageUsersView";
import TabPanel from "../../common/components/TabPanel";

//#region View Types
interface IViewProps extends RouteComponentProps {
  usersState: IUserState;
}
interface IViewActions {
  loadUsers: () => void;
  saveUser: (user: IUser, isNew: boolean) => void;
}

//#endregion

const UserAdminView: FC<IViewProps & IViewActions> = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => setTabIndex(newValue);
  return (
    <div className="d-flex flex-fill flex-column">
      <Tabs className="no-shrink" value={tabIndex} onChange={handleChange} style={{ height: 25 }}>
        <Tab label="Users" />
        <Tab label="Roles" />
        <Tab label="Resources" />
      </Tabs>
      {tabIndex === 0 && <ManageUsersView />}
      {tabIndex === 1 && (<h1>Roles</h1>)}
      {tabIndex === 2 && (<h1>Resources</h1>)}
      
      {/* <TabPanel selectedIndex={tabIndex} index={0}>
        <ManageUsersView />
      </TabPanel>
      <TabPanel selectedIndex={tabIndex} index={1}>
        Roles
      </TabPanel>
      <TabPanel selectedIndex={tabIndex} index={2}>
        Resource
      </TabPanel> */}
    </div>
  );
};

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
    saveUser: (user: IUser, isNew: boolean) => dispatch(saveUser(user, isNew))
  };
};
const reduxConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default withRouter(reduxConnect(UserAdminView));
//#endregion
