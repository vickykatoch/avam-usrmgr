import React from "react";
import "./Header.css";

interface ILocalProps {
  toggleMenu: () => void;
}

const Header = (props: ILocalProps) => {
  return (
    <div className="d-flex no-shrink usr-header">
      <div className="no-shrink">Logo</div>
      <div className="d-flex flex-fill justify-content-end">
        <i className="fa fa-bars fa-2x" onClick={props.toggleMenu}></i>
      </div>
    </div>
  );
};

export default Header;
