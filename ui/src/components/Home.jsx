import React from "react";
import { Typography } from "@material-ui/core";
import { AuthUserContext, withAuthorization } from "./Session";

const Home = ({ firebase }) => {
  const currentUser = firebase.getCurrentUser();
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <Typography>
          Hello {currentUser ? currentUser.displayName : "World"}!
        </Typography>
      )}
    </AuthUserContext.Consumer>
  );
};

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Home);
