import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";

interface LogManagerViewState extends RouteComponentProps {}

const LogManagerHomeView: FC<LogManagerViewState> = (state: LogManagerViewState) => {
  // const hostUrl = state.match.path;
  return (
    <div>
      <h1>Log Manager Home View</h1>
    </div>
  );
};
export default LogManagerHomeView;
