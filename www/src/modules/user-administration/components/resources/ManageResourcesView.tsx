import React, { FC, useState } from "react";
import { IResourcesState, IResource, IAppState } from "../../../../store/models";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { loadResources, ackSave, saveResource } from "../../../../store/actions";
import { mapToArray } from "../../../../store/selectors/user-selectors";

//#region TYPES/CONTANTS
interface IViewProps extends RouteComponentProps {
  resourcesState: IResourcesState;
}
interface IViewActions {
  loadResources: () => void;
  ackSave: () => void;
  saveResource: (role: IResource, isNew?: boolean) => void;
}
//   interface INERole {
//     isNew?: boolean;
//     role: IRole;
//   }
const BOOL_FIELDS = ["active"];
//#endregion

const ManageResourcesView: FC<IViewProps & IViewActions> = props => {
  const { resourcesState } = props;
  const [resources, setResources] = useState(mapToArray(resourcesState.resources));

  return <h1>Resources View : {resources.length}</h1>;
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
    ackSave: () => dispatch(ackSave()),
    saveResource: (resource: IResource, isNew?: boolean) => dispatch(saveResource(resource, isNew))
  };
};

const reduxConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withRouter(reduxConnect(ManageResourcesView));
//#endregion
