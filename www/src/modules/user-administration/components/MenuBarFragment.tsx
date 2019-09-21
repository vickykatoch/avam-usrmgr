import React, { FC } from "react";
import { withRouter, RouteComponentProps, NavLink } from "react-router-dom";



const MenuBarFragment: FC<RouteComponentProps> = ({ match }) => {
  return (
    <div className="btn-group">
        <NavLink to={`${match.path}`} className="btn btn-sm" activeClassName="btn-primary" exact>Users</NavLink>
        <NavLink to={`${match.path}/roles`} className="btn btn-sm" activeClassName="btn-primary">Roles</NavLink>
        <NavLink to={`${match.path}/resources`} className="btn btn-sm" activeClassName="btn-primary">Resources</NavLink>
    </div>
  );
};


export default withRouter(MenuBarFragment);
