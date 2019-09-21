import React, { FC } from "react";
import { NavLink } from "react-router-dom";

export interface ISideBarProps {
  onMenuClick: () => void;
}

const ActionSideBar: FC<ISideBarProps> = ({ onMenuClick }) => {
  return (
    <div className="d-flex flex-fill flex-column">
      <NavLink to="/users" className="no-shrink p-1" onClick={onMenuClick}>
        Home
      </NavLink>
      <NavLink to="/logmanager" className="no-shrink p-1" onClick={onMenuClick}>
        Logs Manager
      </NavLink>
    </div>
  );
};

export default ActionSideBar;
