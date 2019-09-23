//#region IMPORTS
import React, { FC } from "react";
import { IRole } from "../../../../store/models";
import { NavLink } from "react-router-dom";
import { formatDate, DateFormats } from "../../../../common/utils/date-utils";
//#endregion

//#region VIEW TYPES
interface IViewProps {
  roles: IRole[];
  url: string;
  onDelete: (id: string) => void;
}
//#endregion

//#region HELPERS
const renderRoles = (roles: IRole[], baseUrl: string, onDelete: (id: string) => void) =>
  roles.map(role => {
    return (
      <tr key={role.id}>
        <td>{role.id}</td>
        <td>{role.name}</td>
        <td className="text-center">{role.active ? "true" : false}</td>
        <td className="text-right">{role.lastUpdate && formatDate(role.lastUpdate, DateFormats.DateTimeMillis)}</td>
        <td>{role.lastUpdatedBy}</td>
        <td>
          <div className="btn-group">
            <NavLink to={`${baseUrl}/${role.id}`} className="btn btn-outline-primary btn-sm">
              Edit
            </NavLink>
            <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => onDelete(role.id)}>
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  });
//#endregion

//#region RENDERER
const RoleList: FC<IViewProps> = ({ roles, url, onDelete }) => {
  return (
    <table className="table table-hover table-bordered table-sm table-striped">
      <thead className="thead-dark">
        <tr className="text-center">
          <th>ID</th>
          <th>Name</th>
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
      <tbody>{renderRoles(roles, url, onDelete)}</tbody>
    </table>
  );
};
//#endregion

export default RoleList;
