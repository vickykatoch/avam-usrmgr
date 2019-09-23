//#region IMPORTS
import React, { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { IRole, IRoleState, LoadStatus, SaveStatus, IAppState } from "../../../../store/models";
import { RouteComponentProps, Redirect, NavLink, withRouter } from "react-router-dom";
import { loadRoles, saveRole, ackRoleSave } from "../../../../store/actions";
import { ThunkDispatch } from "redux-thunk";
import RoleForm from "./RoleForm";
//#endregion

//#region VIEW PROPS
interface IViewProps extends RouteComponentProps {
  role: IRole;
  rolesState: IRoleState;
  notFound?: boolean;
  isNew?: boolean;
}
interface IViewActions {
  loadUsers: () => void;
  ackSave: () => void;
  saveRole: (user: IRole, isNew?: boolean) => void;
}
const VIEW_WRAP = {
  width: "400px"
};
//#endregion

//#region HELPERS
const emptyRole = (): IRole => ({
  id: "",
  name: "",
  supreme: false,
  acl: 0,
  active: false
});
const notFoundRenderer = (id: string) => {
  return <h3>Role {id} is not found</h3>;
};
//#endregion

//#region RENDERER
const ManageRoleView: FC<IViewProps & IViewActions> = ({ role, rolesState, isNew, notFound, loadUsers, saveRole, ackSave, match }) => {
  const [localRole, setUser] = useState(role);
  useEffect(() => {
    rolesState.loadStatus === LoadStatus.None && loadUsers();
    if (rolesState.loadStatus === LoadStatus.Loaded && rolesState.saveStatus === SaveStatus.None && !isNew) {
      setUser(role);
    }
  }, [rolesState]);

  if (rolesState.saveStatus === SaveStatus.Saved) {
    ackSave();
    return <Redirect to="/roles" />;
  }
  if (notFound) {
    return notFoundRenderer(localRole.id);
  }
  const isSaving = rolesState.saveStatus === SaveStatus.Saving;
  const handleChange = (evt: any) => {
    const { target } = evt;
    setUser({ ...localRole, [target.name]: target.value });
  };
  const handleSave = () => saveRole(localRole, isNew);

  return (
    <div className="d-flex justify-content-center p-1" style={{ pointerEvents: isSaving ? "none" : "auto" }}>
      <div className="d-flex flex-column" style={VIEW_WRAP}>
        <div className="d-flex no-shrink mt-1">
          <h3 className="flex-fill">{isNew ? "New Role" : "Edit Role"}</h3>
          {isSaving && (
            <div className="d-flex justify-content-end no-shrink ml-3 alert-primary">
              <span>
                <i className="fa fa-spin fa-spinner"></i> Saving. Please wait...
              </span>
            </div>
          )}
        </div>
        {rolesState.saveStatus === SaveStatus.Error && <div className="alert-danger">{rolesState.saveError}</div>}
        <div className="d-flex flex-fill flex-column mt-1">
          <RoleForm role={localRole} onChange={handleChange}></RoleForm>
        </div>
        <div className="d-flex no-shrink mt-4">
          <div className="flex-fill"></div>
          <div className="btn-group d-flex justify-content-end mt-1">
            <button className="btn btn-sm btn-outline-primary" onClick={handleSave}>
              Save
            </button>
            <NavLink className="btn btn-sm btn-outline-danger" to="/users/roles">
              Cancel
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
//#endregion

//#region REDUX WIRING
const mapStateToProps = (state: IAppState, ownProps: RouteComponentProps): IViewProps => {
  // @ts-ignore
  const { id } = ownProps.match.params;
  let resolvedProps: IViewProps;
  const newRole = emptyRole();
  if (id) {
    if (+id === 0) {
      resolvedProps = {
        role: newRole,
        rolesState: state.rolesState,
        isNew: true,
        ...ownProps
      };
    } else {
      const role = state.rolesState.loadStatus === LoadStatus.Loaded ? state.rolesState.roles[id] : newRole;
      if (role) {
        resolvedProps = {
          role: { ...role },
          rolesState: state.rolesState,
          ...ownProps
        };
      } else {
        resolvedProps = {
          role: newRole,
          rolesState: state.rolesState,
          notFound: true,
          ...ownProps
        };
      }
    }
  } else {
    resolvedProps = {
      role: newRole,
      notFound: true,
      rolesState: state.rolesState,
      ...ownProps
    };
  }
  return resolvedProps;
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, any, any>): IViewActions => {
  return {
    loadUsers: () => dispatch(loadRoles()),
    ackSave: () => dispatch(ackRoleSave()),
    saveRole: (user: IRole, isNew?: boolean) => dispatch(saveRole(user, isNew))
  };
};

const reduxConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default withRouter(reduxConnect(ManageRoleView));
//#endregion
