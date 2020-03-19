import React from "react";
import PropTypes from "prop-types";
import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography
} from "@material-ui/core";
import Background from "../../assets/background.svg";
import { withAuthentication, AuthUserContext } from "../Session";
import { BrowserRouter } from "react-router-dom";
import Logo from "../../assets/logo192.png";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    height: "100vh"
  },
  logo: {
    height: "3em",
    marginRight: "0.5em"
  },
  bar: {
    backgroundColor: "#fff",
    color: "#2643e9",
    boxShadow: "0px 1px 10px 0px rgba(0,0,0,0.12)"
  },
  button: {
    border: "1px solid rgba(255,255,255,0.20)",
    outline: "none",
    transition: "box-shadow 399ms ease-in-out",
    borderRadius: "12px",
    color: "#2643e9",
    width: "8em",
    boxShadow: "5px 5px 8px #e3e3e3,-5px -5px 8px #ffffff",
    backgroundColor: "#fff",
    "&:hover": {
      boxShadow: "inset 5px 5px 8px #e3e3e3, inset -5px -5px 8px #ffffff",
      backgroundColor: "#fff"
    }
  },
  content: {
    flexGrow: 1,
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "right bottom",
    backgroundSize: "auto 100%",
    backgroundColor: "#fff",
    paddingLeft: "10em",
    paddingRight: "10em",
    overFlow: "hidden",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "2em",
      paddingRight: "2em"
    }
  },
  title: {
    flexGrow: 1
  }
}));

const App = ({ children }) => {
  const classes = useStyles();

  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <BrowserRouter>
          <CssBaseline />
          <Grid container className={classes.root}>
            <HideOnScroll>
              <AppBar className={classes.bar}>
                <Toolbar>
                  <img className={classes.logo} src={Logo} />
                  <Typography className={classes.title}>Finance</Typography>
                  <Button className={classes.button}>
                    {authUser ? "Log Out" : "Log In"}
                  </Button>
                </Toolbar>
              </AppBar>
            </HideOnScroll>
            <Toolbar />

            <Grid
              container
              direction="column"
              justify="space-around"
              alignItems="flex-start"
              className={classes.content}
            >
              {children}
            </Grid>
          </Grid>
        </BrowserRouter>
      )}
    </AuthUserContext.Consumer>
  );
};

export default compose(withFirebase, withAuthentication)(App);
