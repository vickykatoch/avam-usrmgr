import React from "react";
import { IUser } from "../store/models";

const style = {
  width: 500,
  background: "white"
};
// interface LocalProps {
//   user: boolean | IUser;
//   onCancel: () => void;
//   onSave: (user: IUser) => void;
// }

const EditNewUser = () => {
  return (
    <div className="card" style={style}>
      <div className="card-header">New User</div>
      <div className="card-body"></div>
      <div className="card-footer text-right">
        <div className="btn-group">
          <button type="button" className="btn btn-outline-primary btn-sm">
            Save
          </button>
          <button type="button" className="btn btn-outline-danger btn-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditNewUser;
