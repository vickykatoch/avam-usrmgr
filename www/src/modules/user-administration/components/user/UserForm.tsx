import React, { FC } from "react";
import { IUser } from "../../../../store/models";
import TextField from "@material-ui/core/TextField";
import { FormControlLabel, Checkbox } from "@material-ui/core";

interface IViewProps {
  isNew: boolean;
  user: IUser;
  onChange: (evt: any) => void;
}

const UserForm: FC<IViewProps> = ({ user, onChange, isNew }) => {
  return (
    <form style={{ width: 400 }}>
      <TextField id="id" name="id" fullWidth label="SID" value={user.id} onChange={onChange} margin="dense" disabled={!isNew} />
      <TextField id="firstName" name="firstName" fullWidth label="First Name" value={user.firstName} onChange={onChange} margin="dense" />
      <TextField id="lastName" name="lastName" fullWidth label="Last Name" value={user.lastName} onChange={onChange} margin="dense" />
      <FormControlLabel control={<Checkbox name="active" checked={user.active} onChange={onChange} />} label="Is Active" />
    </form>
  );
};

export default UserForm;
