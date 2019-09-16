import React from "react";
import "./Header.css";

interface ILocalProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

const Header = (props: ILocalProps) => {
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

export default Header;
