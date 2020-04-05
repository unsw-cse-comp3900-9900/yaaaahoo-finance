import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

const withAuthorization = condition => Component => {
  const WithAuthorization = ({ ...props }) => {
    useEffect(() => {
        props.firebase.auth.onAuthStateChanged(authUser => {
          if (!condition(authUser)) {
            props.history.push("/login");
          }
        });
    }, []);
    return (
      <AuthUserContext.Consumer>
        {authUser => (condition(authUser) ? <Component {...props} /> : null)}
      </AuthUserContext.Consumer>
    );
  };
  return compose(withRouter, withFirebase)(WithAuthorization);
};
export default withAuthorization;
