//#region IMPORTS
import React, { FC } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IUser, IAppState } from "../../../store/models";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
//#endregion

//#region VIEW PROPS
interface IViewProps extends RouteComponentProps {
  user?: IUser;
  notFound?: boolean;
  id?: string;
  isNew?: boolean;
}
interface IViewActions {
  loadUsers: () => void;
}
//#endregion

//#region HELPERS
const emptyUser = (): IUser => ({
  id: "",
  firstName: "",
  lastName: "",
  active: false
});
//#endregion

//#region RENDERER
const ManageUserView: FC<IViewProps & IViewActions> = ({ user }) => {
  return (
    <div className="d-flex">
      <h1>Manage User View</h1>
      <h3>{user && user.id}</h3>
    </div>
  );
};
//#endregion


//#region REDUX WIRING
const mapStateToProps = (state: IAppState, ownProps: RouteComponentProps): IViewProps => {
  // @ts-ignore
  const { id } = ownProps.match.params;

  if (id) {
    const user = state.usersState.users.find(usr => usr.id === id);
    if (user) {
      return {
        user,
        ...ownProps
      };
    } else {
      return {
        notFound: true,
        id,
        ...ownProps
      };
    }
  } else {
    return {
      user: emptyUser(),
      isNew: true,
      ...ownProps
    };
  }  
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, any, any>): IViewActions => {
  return {
    loadUsers: () => dispatch({})
  };
};

const reduxConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default withRouter(reduxConnect(ManageUserView));
//#endregion
