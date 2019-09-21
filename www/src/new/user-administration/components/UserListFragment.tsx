import React, { FC } from "react";
import { IUser } from "../../../store/models";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface LocalProps extends RouteComponentProps {
  users: IUser[];
}

const UserListFragment: FC<LocalProps> = ({ users, match }) => {
  return (
    <div>      
      <h1>User List</h1>
      <h3>{match.path}</h3>
    </div>
  );
};


export default withRouter(UserListFragment);
