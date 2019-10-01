import React, { FC, useState, useEffect } from "react";
import { IResourcesState, IResource, IAppState, LoadStatus, SaveStatus } from "../../../../store/models";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { loadResources, ackResourceSave, saveResource } from "../../../../store/actions";
import { mapToArray } from "../../../../store/selectors/user-selectors";
import { Header, FormDialog } from "../common";
import GridServiceProvider from "../../../../services/GridColumnProvider";
import ResourceListView from "./ResourceListView";
import ResourceForm from "./ResourceForm";

//#region TYPES/CONTANTS
interface IViewProps extends RouteComponentProps {
  resourcesState: IResourcesState;
}
interface IViewActions {
  loadResources: () => void;
  ackSave: () => void;
  saveResource: (resource: IResource, isNew?: boolean) => void;
}
interface INEResource {
  isNew?: boolean;
  resource: IResource;
}
const BOOL_FIELDS = ["active"];
const emptyResource = (): IResource => ({
  id: "",
  name: "",
  active: false
});
//#endregion

const ManageResourcesView: FC<IViewProps & IViewActions> = props => {
  const { resourcesState } = props;
  const [resources, setResources] = useState(mapToArray(resourcesState.resources));
  const [columns] = useState(GridServiceProvider.getColumns("ResourcesGrid"));
  const [isSaving, setSavingState] = useState(false);
  const [neResource, setNEResource] = useState<INEResource | undefined>(undefined);
  const handleNEAction = (resource?: IResource) => setNEResource({ isNew: !resource, resource: resource || emptyResource() });
  const handleSearchTextChange = (evt: any) => {};
  const handleCancel = () => setNEResource(undefined);
  const handleSave = () => {
    if (neResource) {
      props.saveResource(neResource.resource, neResource.isNew);
    }
  };
  const handleInputChange = (evt: any) => {
    if (neResource) {
      const { name, value, checked } = evt.target;
      const isNew = neResource.isNew;
      let resolvedValue = BOOL_FIELDS.includes(name) ? checked : value;
      setNEResource({ isNew, resource: { ...neResource.resource, [name]: resolvedValue } });
    }
  };

  useEffect(() => {
    resourcesState.loadStatus === LoadStatus.None && props.loadResources();
    resourcesState.loadStatus === LoadStatus.Loaded && setResources(mapToArray(resourcesState.resources));
    resourcesState.saveStatus === SaveStatus.Saving && setSavingState(true);
    if (resourcesState.saveStatus === SaveStatus.Saved) {
      setSavingState(false);
      setNEResource(undefined);
      props.ackSave();
      setResources(mapToArray(resourcesState.resources));
    }
  }, [resourcesState.loadStatus, resourcesState.saveStatus]);

  return (
    <div className="d-flex flex-fill flex-column v-scroll">
      <Header onNew={() => handleNEAction()} onSearchTextChange={handleSearchTextChange} title="Manage Resources"></Header>
      <div className="d-flex flex-fill v-scroll">
        <ResourceListView columns={columns} resources={resources} onEdit={handleNEAction} />
      </div>
      {neResource && (
        <FormDialog
          open={true}
          title={neResource.isNew ? "New Resource" : "Edit"}
          onCancel={handleCancel}
          onSubmit={handleSave}
          isBusy={isSaving}>
          <ResourceForm resource={neResource.resource} isNew={neResource.isNew || false} onChange={handleInputChange} />
        </FormDialog>
      )}
    </div>
  );
};

//#region REDUX WIRING

const mapStateToProps = (state: IAppState, ownProps: RouteComponentProps): IViewProps => {
  return {
    resourcesState: state.resourcesState,
    ...ownProps
  };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, any, any>): IViewActions => {
  return {
    loadResources: () => dispatch(loadResources()),
    ackSave: () => dispatch(ackResourceSave()),
    saveResource: (resource: IResource, isNew?: boolean) => dispatch(saveResource(resource, isNew))
  };
};

const reduxConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withRouter(reduxConnect(ManageResourcesView));
//#endregion
