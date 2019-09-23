import React, { FC, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IAppState, IRoleState, LoadStatus } from "../../../../store/models";
import { ThunkDispatch } from "redux-thunk";
import { loadRoles } from "../../../../store/actions";
import { connect } from "react-redux";
import { mapToArray } from "../../../../store/selectors/user-selectors";
import RoleList from "./RoleList";

interface IViewProps extends RouteComponentProps {
  rolesState: IRoleState;
}
interface IViewActions {
  loadRoles: () => void;
}

const ManageRolesView: FC<IViewProps & IViewActions> = ({ rolesState, match, loadRoles }) => {
  useEffect(() => {
    rolesState.loadStatus === LoadStatus.None && loadRoles();
  }, [rolesState]);
  const loading = rolesState.loadStatus === LoadStatus.None || rolesState.loadStatus === LoadStatus.Loading;
  const roles = mapToArray(rolesState.roles);

  return (
    <div className="d-flex flex-column flex-fill pt-1">
      {loading && (
        <h5>
          <i className="fa fa-spinner fa-spin"></i> Loading roles. Please wait...
        </h5>
      )}
      <RoleList
        roles={roles}
        url={`${match.path}`}
        onDelete={(id: string) => {
          console.log("User deleted");
        }}
      />
    </div>
  );
};

//#region REDUX WIRING
const mapStateToProps = (state: IAppState, ownProps: RouteComponentProps): IViewProps => {
  return {
    rolesState: state.rolesState,
    ...ownProps
  };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, any, any>): IViewActions => {
  return {
    loadRoles: () => dispatch(loadRoles())
  };
};

const reduxConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default withRouter(reduxConnect(ManageRolesView));
//#endregion
