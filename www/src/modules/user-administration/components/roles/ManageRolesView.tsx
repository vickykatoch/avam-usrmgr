import React, { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { IAppState, IRole, IRoleState, LoadStatus, SaveStatus } from "../../../../store/models";
import { loadRoles, ackSave, saveRole } from "../../../../store/actions";
import { mapToArray } from "../../../../store/selectors/user-selectors";
import { Header, FormDialog } from "../common";
import GridServiceProvider from "../../../../services/GridColumnProvider";
import RoleListView from "./RoleListView";
import RoleForm from "./RoleForm";

//#region TYPES/CONTANTS
interface IViewProps extends RouteComponentProps {
  rolesState: IRoleState;
}
interface IViewActions {
  loadRoles: () => void;
  ackSave: () => void;
  saveRole: (role: IRole, isNew?: boolean) => void;
}
interface INERole {
  isNew?: boolean;
  role: IRole;
}
const BOOL_FIELDS = ["active", "supreme"];
//#endregion

//#region HELPER METHODS
const emptyRole = (): IRole => ({
  id: "",
  name: "",
  active: false,
  supreme: false
});
//#endregion

const ManageRolesView: FC<IViewProps & IViewActions> = props => {
  const { rolesState } = props;
  const [roles, setRoles] = useState(mapToArray(rolesState.roles));
  const [neRole, setNERole] = useState<INERole | undefined>(undefined);
  const [isSaving, setSavingState] = useState(false);
  const handleNewRoleClick = () => setNERole({ isNew: true, role: emptyRole() });
  const handleSearchChange = () => ({});
  const handleCancel = () => setNERole(undefined);
  const [columns] = useState(GridServiceProvider.getColumns("RolesGrid"));
  useEffect(() => {
    rolesState.loadStatus === LoadStatus.None && props.loadRoles();
    rolesState.loadStatus === LoadStatus.Loaded && setRoles(mapToArray(rolesState.roles));
    rolesState.saveStatus === SaveStatus.Saving && setSavingState(true);
    if (rolesState.saveStatus === SaveStatus.Saved) {
      setSavingState(false);
      setNERole(undefined);
      ackSave();
      setRoles(mapToArray(rolesState.roles));
    }
  }, [rolesState.saveStatus, rolesState.loadStatus]);
  const handleRoleNewEditAction = (role?: IRole) => setNERole({ isNew: !role, role: role || emptyRole() });
  const handleSave = () => {
    if (neRole) {
      //Validate
      // debugger;
      props.saveRole(neRole.role, neRole.isNew);
    }
  };
  const handleInputChange = (evt: any) => {
    if (neRole) {
      const { name, value, checked } = evt.target;
      const isNew = neRole.isNew;
      let resolvedValue = BOOL_FIELDS.includes(name) ? checked : value;
      setNERole({ isNew, role: { ...neRole.role, [name]: resolvedValue } });
    }
  };

  return (
    <div className="d-flex flex-fill flex-column v-scroll">
      <Header onNew={handleNewRoleClick} onSearchTextChange={handleSearchChange} title="Manage Roles"></Header>
      <div className="d-flex flex-fill">
        <RoleListView columns={columns} roles={roles} onEdit={handleRoleNewEditAction} />
      </div>
      {neRole && (
        <FormDialog open={true} title="New Role" onCancel={handleCancel} onSubmit={handleSave} isBusy={isSaving}>
          <RoleForm role={neRole.role} isNew={neRole.isNew || false} onChange={handleInputChange} />
        </FormDialog>
      )}
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
    loadRoles: () => dispatch(loadRoles()),
    ackSave: () => dispatch(ackSave()),
    saveRole: (role: IRole, isNew?: boolean) => dispatch(saveRole(role, isNew))
  };
};

const reduxConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withRouter(reduxConnect(ManageRolesView));
//#endregion
