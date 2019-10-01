import React, { FC } from "react";
import TextField from "@material-ui/core/TextField";
import { IResource } from "../../../../store/models";
import { FormControlLabel, Checkbox } from "@material-ui/core";

interface IViewProps {
  isNew: boolean;
  resource: IResource;
  onChange: (evt: any) => void;
}

const ResourceForm: FC<IViewProps> = ({ isNew, resource, onChange }) => {
  return (
    <form style={{ width: 400 }}>
      <TextField id="id" name="id" fullWidth label="SID" value={resource.id} onChange={onChange} margin="dense" disabled={!isNew} />
      <TextField id="name" name="name" fullWidth label="Name" value={resource.name} onChange={onChange} margin="dense" />
      <FormControlLabel control={<Checkbox name="active" checked={resource.active} onChange={onChange} />} label="Is Active" />
    </form>
  );
};

export default ResourceForm;
