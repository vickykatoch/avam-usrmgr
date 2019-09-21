import React, { FC, useState } from "react";
import "./DesktopLayout.css";
import Header from "../common/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ActionSideBar from "../common/components/ActionSideBar";
import UserAdminHomeView from "../new/user-administration/UserAdminHomeView";
import LogManagerHomeView from "../new/log-manager/LogManagerHomeView";

const DesktopLayoutView: FC = () => {
  const [menuBarVisible, setMenuBarVisibleState] = useState(false);
  const toggleMenuBar = (open?: boolean) =>
    setMenuBarVisibleState(!menuBarVisible);

  return (
    <div className="d-flex flex-fill flex-column desk-layout">
      <Header toggleMenu={toggleMenuBar} isMenuOpen={menuBarVisible} />
      <Router>
        <div className="d-flex flex-fill body">
          {menuBarVisible && <div className="overlay"></div>}
          <div className="d-flex flex-fill">
            <Switch>
              <Route path="/users" component={UserAdminHomeView} />
              <Route path="/logmanager" component={LogManagerHomeView} />
            </Switch>
          </div>
          {menuBarVisible && (
            <div className="menu-bar">
              <ActionSideBar onMenuClick={toggleMenuBar} />
            </div>
          )}
        </div>
      </Router>
    </div>
  );
};

export default DesktopLayoutView;
