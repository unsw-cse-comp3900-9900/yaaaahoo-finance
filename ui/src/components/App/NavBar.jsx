import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo192.png";

const useStyles = makeStyles(theme => ({
  logo: {
    height: "3em",
    marginRight: "0.4em"
  },
  bar: {
    backgroundColor: "#fff",
    color: "#2643e9",
    boxShadow: "0px 1px 10px 0px rgba(0,0,0,0.12)",
    height: "64px",
    justifyContent: "center"
  },
  title: {
    fontSize: "1.2em"
  },
  logoWrapper: {
    display: "flex",
    marginRight: "auto",
    alignItems: "center",
    textDecoration: "none",
    color: "#2643e9"
  }
}));

const NavBar = ({ authUser }) => {
  const classes = useStyles();
  return (
    <AppBar className={classes.bar}>
      <Toolbar>
        <Link to={"/"} className={classes.logoWrapper}>
          <img className={classes.logo} src={Logo} />
          <Typography className={classes.title}>Finance</Typography>
        </Link>
        <Button component={Link} to={"/login"} style={{ color: "#2643e9" }}>
          {authUser ? "Log Out" : "Log In"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
