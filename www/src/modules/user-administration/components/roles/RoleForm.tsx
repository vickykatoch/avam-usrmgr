import React, { FC } from "react";
import TextField from "@material-ui/core/TextField";
import { IRole } from "../../../../store/models";
import { FormControlLabel, Checkbox } from "@material-ui/core";

interface IViewProps {
  isNew: boolean;
  role: IRole;
  onChange: (evt: any) => void;
}

const RoleForm: FC<IViewProps> = ({ isNew, role, onChange }) => {
  return (
    <form style={{ width: 400 }}>
      <TextField id="id" name="id" fullWidth label="SID" value={role.id} onChange={onChange} margin="dense" disabled={!isNew} />
      <TextField id="name" name="name" fullWidth label="Name" value={role.name} onChange={onChange} margin="dense" />
      <FormControlLabel control={<Checkbox name="active" checked={role.active} onChange={onChange} />} label="Is Active" />
      <FormControlLabel control={<Checkbox name="supreme" checked={role.supreme} onChange={onChange} />} label="Is Super Admin" />
    </form>
  );
};

export default RoleForm;
