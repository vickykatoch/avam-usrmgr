import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";

interface LogManagerViewState {
  routerState: RouteComponentProps;
}

const LogManagerHomeView: FC<LogManagerViewState> = (
  state: LogManagerViewState
) => {
  return <h1>Log Manager Home View</h1>;
};
export default LogManagerHomeView;
