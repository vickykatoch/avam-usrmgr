import React from "react";
import { IUser } from "../store/models";

interface LocalProps {
  users: IUser[];
  onEdit: (user: IUser) => void;
}

const UserList = (props: LocalProps) => {
  const { users, onEdit } = props;
  return (
    <table className="table table-hover table-bordered table-sm table-striped">
      <thead className="thead-dark">
        <tr className="text-center">
          <th>SID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Active</th>
          <th>Last Update</th>
          <th>Last Updated By</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => {
          return (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td className="text-center">{user.active ? "true" : false}</td>
              <td className="text-right">{user.lastUpdate}</td>
              <td>{user.lastUpdatedBy}</td>
              <td>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => onEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserList;
