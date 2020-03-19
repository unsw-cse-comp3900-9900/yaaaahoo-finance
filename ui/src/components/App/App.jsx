import React, { Fragment } from "react";
import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Background from "../../assets/background.svg";
import { withAuthentication } from "../Session";
import { BrowserRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "right bottom",
    backgroundSize: "auto 100%",
    backgroundColor: "#fff",

    height: "100vh",
    paddingLeft: "10em",
    paddingRight: "10em",
    overFlow: "hidden",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "2em",
      paddingRight: "2em"
    }
  }
}));

const App = ({ children }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <BrowserRouter>
        <CssBaseline />
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="flex-start"
          className={classes.root}
        >
          {children}
        </Grid>
        </BrowserRouter>

    </Fragment>
  );
};

export default withAuthentication(App);
