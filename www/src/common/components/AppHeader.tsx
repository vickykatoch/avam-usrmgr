import React from "react";
import "./AppHeader.css";

interface IViewProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

const AppHeader = (props: IViewProps) => {
  const jsxElement: JSX.Element = props.isMenuOpen ? (
    <i className="fa fa-times fa-2x hover-item" onClick={props.toggleMenu}></i>
  ) : (
    <i className="fa fa-bars fa-2x hover-item" onClick={props.toggleMenu}></i>
  );
  return (
    <div className="d-flex no-shrink usr-header">
      <div className="no-shrink">Logo</div>
      <div className="d-flex flex-fill justify-content-end">
        {jsxElement}
        {/* <i className="fa fa-bars fa-2x" onClick={props.toggleMenu}></i> */}
      </div>
    </div>
  );
};

export default AppHeader;
