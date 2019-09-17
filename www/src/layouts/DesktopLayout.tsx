import React from "react";
import Header from "../common/Header";
import "./DesktopLayout.css";
import { connect } from "react-redux";
import { IAppState } from "../store/models";
import { Dispatch } from "redux";
import { SideBarActionTypes, toggleSideBar } from "../store/actions";
import UserDashBoard from "../components/UserDashboard";

interface ILocalProps {
  isOpen: boolean;
  toggle: () => void;
}

const DesktopLayout = (props: ILocalProps) => {
  const { isOpen, toggle } = props;
  return (
    <div className="d-flex flex-fill flex-column desk-layout">
      <Header toggleMenu={toggle} isMenuOpen={isOpen} />

      <div className="d-flex flex-fill body">
        {isOpen ? <div className="overlay"></div> : null}
        <div className="d-flex flex-fill">
          <UserDashBoard></UserDashBoard>
        </div>
        {isOpen ? <div className="menu-bar"></div> : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    isOpen: state.sideBarState.isOpen
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
