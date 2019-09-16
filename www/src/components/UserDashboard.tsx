import React, { useEffect } from "react";
import { loadUsers } from "../store/actions";
import { IAppState, IUser } from "../store/models";
import { connect } from "react-redux";

interface LocalState {
  users: IUser[];
}

const UserDashBoard = (props: LocalState) => {
  useEffect(() => {
    console.log("Load users called");
    loadUsers();
  }, []);

  return <h1>User Dashboard : {props.users.length}</h1>;
};
const mapStateToProps = (state: IAppState) => {
  return {
    users: state.users
  };
};

export default connect(mapStateToProps)(UserDashBoard);
