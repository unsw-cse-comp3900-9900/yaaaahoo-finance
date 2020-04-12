import React from "react";
import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withAuthentication, AuthUserContext } from "../Session";
import { BrowserRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
// import NavBar from "./NavBar";
import { create } from "jss";
import { StylesProvider, jssPreset } from "@material-ui/styles";
import jssExtend from "jss-plugin-extend";
import jssNested from "jss-plugin-nested";
import NavBar from "./NavBarv2";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    height: "100vh"
  }
}));

const jss = create({
  plugins: [jssExtend(), jssNested(), ...jssPreset().plugins]
});

const App = ({ children }) => {
  const classes = useStyles();

  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <BrowserRouter>
          <StylesProvider jss={jss}>
            <CssBaseline />
            <div className={classes.root}>
              {/* <PrimarySearchAppBar /> */}
              <NavBar authUser={authUser} />
              {children}
            </div>
          </StylesProvider>
        </BrowserRouter>
      )}
    </AuthUserContext.Consumer>
  );
};

export default compose(withFirebase, withAuthentication)(App);
