import React, { useEffect, useState } from "react";
import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";
const withAuthentication = Component => {
  const WithAuthentication = ({ ...props }) => {
    const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
      props.firebase.auth.onAuthStateChanged(user => {
        setAuthUser(user);
      });
    }, []);
    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };
  return withFirebase(WithAuthentication);
};
export default withAuthentication;
