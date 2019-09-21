import React, { FC } from "react";
import { RouteComponentProps, Route } from "react-router-dom";

interface LogManagerViewState extends RouteComponentProps {
  
}


const LogManagerHomeView: FC<LogManagerViewState> = (
  state: LogManagerViewState
) => {  
  const hostUrl = state.match.path;
  return (<div>
    <h1>Log Manager Home View</h1>
    {/* <Route path={hostUrl} component={UserList} exact/> */}
  </div>);
};
export default LogManagerHomeView;
