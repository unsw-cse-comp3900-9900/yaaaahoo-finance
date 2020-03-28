import React from "react";
import PropTypes from "prop-types";
import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withAuthentication, AuthUserContext } from "../Session";
import { BrowserRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import NavBar from "./NavBar";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    height: "100vh"
  }
}));

const App = ({ children }) => {
  const classes = useStyles();

  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <BrowserRouter>
          <CssBaseline />
          <div className={classes.root}>
            <NavBar authUser={authUser} />
            {children}
          </div>
        </BrowserRouter>
      )}
    </AuthUserContext.Consumer>
  );
};

export default compose(withFirebase, withAuthentication)(App);
