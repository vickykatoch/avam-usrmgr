//#region IMPORTS
import React, { FC } from "react";
import { IRole } from "../../../../store/models";
import TextInput from "../../../../common/components/TextInput";
//#endregion

interface IViewProps {
  role: IRole;
  onChange: (evt: any) => void;
}

const RoleForm: FC<IViewProps> = ({ role, onChange }) => {
  return (
    <>
      <TextInput id="id" label="ID" onChange={onChange} name="id" value={role.id} />
      <TextInput id="name" label="Name" onChange={onChange} name="name" value={role.name} />
      <TextInput id="acl" label="Access Control List" onChange={onChange} name="lastName" value={role.acl.toString()} />
    </>
  );
};

export default RoleForm;
