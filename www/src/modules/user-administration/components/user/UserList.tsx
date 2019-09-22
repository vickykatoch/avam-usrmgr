import React, { FC } from "react";
import { IUser } from "../../../../store/models";
import { formatDate, DateFormats } from "../../../../common/utils/date-utils";
import { NavLink } from "react-router-dom";

//#region VIEW PROPS
interface IViewProps {
  users: IUser[];
  url: string;
  onDelete: (id: string) => void;
}
//#endregion

//#region HELPERS
const renderUsers = (users: IUser[], baseUrl: string, onDelete: (id: string) => void) =>
  users.map(user => {
    return (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td className="text-center">{user.active ? "true" : false}</td>
        <td className="text-right">{user.lastUpdate && formatDate(user.lastUpdate, DateFormats.DateTimeMillis)}</td>
        <td>{user.lastUpdatedBy}</td>
        <td>
          <div className="btn-group">
            <NavLink to={`${baseUrl}/${user.id}`} className="btn btn-outline-primary btn-sm">Edit</NavLink>
            <button type="button" className="btn btn-outline-danger btn-sm" onClick={()=>onDelete(user.id)}>
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  });
//#endregion

//#region RENDERER
const UserList: FC<IViewProps> = ({ users, url, onDelete}) => {
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
          <th>
            <NavLink className="btn btn-sm btn-outline-primary" to={`${url}/0`}>
              <i className="fa fa-plus"></i>
              <span className="ml-2">New</span>
            </NavLink>
          </th>
        </tr>
      </thead>
      <tbody>{renderUsers(users, url, onDelete)}</tbody>
    </table>
  );
};
//#endregion

export default UserList;
