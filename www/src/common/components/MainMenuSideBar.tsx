import React, { FC } from "react";
import { MenuList, MenuItem } from "@material-ui/core";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";

//#region View Types
interface IViewProps extends RouteComponentProps {}

//#endregion

const MainMenuSideBar: FC<IViewProps> = ({ location: { pathname } }) => (
  <MenuList>
    <MenuItem component={Link} to="/users">Users</MenuItem>
    <MenuItem component={Link} to="/logmanager">Logs</MenuItem>
  </MenuList>
);
export default withRouter(MainMenuSideBar);
