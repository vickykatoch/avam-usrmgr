import React, { FC} from 'react';
import { IUser } from '../../../../store/models';
import TextInput from '../../../../common/components/TextInput';

interface IViewProps {
    user: IUser;
    onChange: (evt: any)=> void;
}

const UserForm: FC<IViewProps> = ({user, onChange})=> {
    return (
        <>
            <TextInput id="id" label="SID" onChange={onChange} name="id" value={user.id}  />
            <TextInput id="firstName" label="First Name" onChange={onChange} name="firstName" value={user.firstName}  />
            <TextInput id="lastName" label="Last Name" onChange={onChange} name="lastName" value={user.lastName}  />
        </>
    );
};

export default UserForm;