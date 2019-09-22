import React, { FC } from "react";
import { IResource } from "../../../../store/models";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface LocalProps  extends RouteComponentProps {
    resources: IResource[];
}

const ResourcesFragment: FC<LocalProps> = ({resources, match})=> {
    return (
        <div>      
          <h1>Resources</h1>
          <h3>{match.path}</h3>
        </div>
      );
};
export default withRouter(ResourcesFragment);
