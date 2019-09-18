import React from "react";
import { IUser } from "../store/models";

const style = {
  width: 500,
  background: "white"
};
export interface EditNewUserProps {
  user: boolean | IUser;
  onCancel: () => void;
  onSave: (user: IUser) => void;
}
const emptyUser: IUser = {
  id: "",
  firstName: "",
  lastName: "",
  active: false,
  lastUpdatedBy: "d424242",
  roles: [],
  aclOverrides: []
};

const userForm = (user: IUser) => (
  <div className="d-flex flex-fill flex-column">
    <div className="d-flex flex-column mb-1">
      <span>SID</span>
      <input type="text" value={user.id} />
    </div>
    <div className="d-flex flex-column mb-1">
      <span>First Name</span>
      <input type="text" value={user.firstName} />
    </div>
    <div className="d-flex flex-column mb-1">
      <span>Last Name</span>
      <input type="text" value={user.lastName} />
    </div>
    <div className="d-flex mb-1">
      <input type="checkbox" id="isActive" checked={user.active} />
      <label htmlFor="isActive">Is Active</label>
    </div>
    <div className="d-flex flex-column mb-1">
      <span>Roles</span>
      <input type="text" />
    </div>
    <div className="d-flex flex-column mb-1">
      <span>Resources</span>
      <input type="text" />
    </div>
  </div>
);

const EditNewUser = (options: EditNewUserProps) => {
  const { user, onCancel, onSave } = options;
  const isNewUser = user === true;
  const userInfo: IUser = user === true ? emptyUser : ({ ...user } as IUser);
  return (
    <div className="card" style={style}>
      <div className="card-header">
        <strong>{isNewUser ? "New User" : "Edit User"}</strong>
      </div>
      <div className="card-body">{userForm(userInfo)}</div>
      <div className="card-footer text-right">
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => onSave(userInfo)}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditNewUser;
