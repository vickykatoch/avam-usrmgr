import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton, MenuItem, CssBaseline } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import "typeface-roboto";
import MainMenuSideBar from "../common/components/MainMenuSideBar";
import { Switch, Route } from "react-router-dom";
import LogManagerHomeView from "../modules/log-manager/LogManagerHomeView";
import UserAdminView from "../modules/user-administration/UserAdminView";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(1)
    },
    title: {
      flexGrow: 1
    }
  })
);

const barStyle = {
  borderRightWidth: "1px",
  borderLeftWidth: 0,
  borderBottomWidth: 0,
  borderTopWidth: 0,
  borderStyle: "solid"
};

const MuiDesktopLayout = () => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <div className="d-flex flex-column flex-fill">
        <AppBar position="relative">
          <Toolbar variant="dense">
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Mehrum
            </Typography>
            <div className="flex-fill"></div>
            <MenuItem className="justify-content-end">
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit">
                <AccountCircle />
              </IconButton>
            </MenuItem>
          </Toolbar>
        </AppBar>
        <div className="d-flex flex-fill no-scroll">
          <div className="d-flex flex-column flex-shrink-0" style={barStyle}>
            <MainMenuSideBar></MainMenuSideBar>
          </div>
          <div className="d-flex flex-fill v-scroll p-2">
            <Switch>
              <Route path="/users" component={UserAdminView} />
              <Route path="/logmanager" component={LogManagerHomeView} />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};

export default MuiDesktopLayout;
