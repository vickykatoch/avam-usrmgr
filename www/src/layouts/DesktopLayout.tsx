import React from "react";
import Header from "../common/Header";
import "./DesktopLayout.css";
import { connect } from "react-redux";
import { IAppState } from "../store/models";
import { Dispatch } from "redux";
import { SideBarActionTypes, ToggleSideBarAction } from "../store/actions";

interface ILocalProps {
  isOpen: boolean;
  toggle: () => void;
}

const DesktopLayout = (props: ILocalProps) => {
  const { isOpen, toggle } = props;
  debugger;
  return (
    <div className="d-flex flex-fill flex-column desk-layout">
      <Header toggleMenu={toggle} />
      <div className="d-flex flex-fill body">
        <div className="d-flex flex-fill">Contents</div>
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
      const toggleAction = new ToggleSideBarAction();
      dispatch(toggleAction);
    }
  };
  return actions;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DesktopLayout);
