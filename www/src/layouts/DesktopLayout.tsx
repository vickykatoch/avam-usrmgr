import React from "react";
import Header from "../common/Header";
import "./DesktopLayout.css";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { SideBarActionTypes, toggleSideBar } from "../store/actions";
// import UserDashBoard from "../components/UserDashboard";
import { ICombinedRouterAppState } from "../store/system-reducer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { ConnectedRouter as Router } from "connected-react-router";
// import { history } from "../store/configure-store";
import UserAdminHomeView from "../new/user-administration/UserAdminHomeView";
import LogManagerHomeView from "../new/log-manager/LogManagerHomeView";
import ActionSideBar from "../common/components/ActionSideBar";

interface ILocalProps {
  isOpen: boolean;
  toggle: () => void;
}

const DesktopLayout = (props: ILocalProps) => {
  const { isOpen, toggle } = props;
  return (
    <div className="d-flex flex-fill flex-column desk-layout">
      <Header toggleMenu={toggle} isMenuOpen={isOpen} />
      <Router>
        <div className="d-flex flex-fill body">
          {isOpen && <div className="overlay"></div>}
          <div className="d-flex flex-fill">
            <Switch>
              <Route path="/" component={UserAdminHomeView} exact />
              <Route path="/logmanager" component={LogManagerHomeView} />
            </Switch>
          </div>
          {/* {isOpen && (
            <div className="menu-bar">
              <ActionSideBar />
            </div>
          )} */}
        </div>
      </Router>
    </div>
  );
};

const mapStateToProps = (state: ICombinedRouterAppState) => {
  return {
    isOpen: state.appState.sideBarState.isOpen
  };
};

const mapDispatchToProps = (dispatch: Dispatch<SideBarActionTypes>) => {
  const actions = {
    toggle: () => {
      dispatch(toggleSideBar());
    }
  };
  return actions;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DesktopLayout);
