import React, { FC } from "react";
import { IUser } from "../../../store/models";

interface LocalProps {
  users: IUser[];
}

const UserList: FC<LocalProps> = ({ users }) => {
  return <h1>User List</h1>;
};

export default UserList;
