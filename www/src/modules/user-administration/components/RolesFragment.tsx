import React, { FC } from "react";
import { IRole } from "../../../store/models";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface LocalProps  extends RouteComponentProps {
    roles: IRole[];
}

const RolesFragment: FC<LocalProps> = ({roles, match})=> {    
    return (
        <div>      
          <h1>Roles</h1>
          <h3>{match.path}</h3>
        </div>
      );
};
export default withRouter(RolesFragment);
