import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Divider, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import AboutUs from "./AboutUs"
// import TopNews from "./TopNews";

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%'
  },
  gridItem: {
    marginBottom: "2em",
    width: "100%",
  },
  lastGridItem: {
    width: "100%"
  },
  button: {
    border: "1px solid rgba(255,255,255,0.20)",
    outline: "none",
    transition: "box-shadow 399ms ease-in-out",
    borderRadius: "12px",
    width: "15em",
    height: "3em",
    boxShadow: "5px 5px 8px #e3e3e3,-5px -5px 8px #ffffff",
    backgroundColor: "#fff",
    color: "#2643e9",
    "&:hover": {
      boxShadow: "inset 5px 5px 8px #e3e3e3, inset -5px -5px 8px #ffffff",
      backgroundColor: "#fff"
    }
  },
  title: {
    color: "#2643e9",
    fontWeighst: 400
  },
  subtitle: {
    maxWidth: "65%",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "none"
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "50%"
    }
  },
  divider: {
    border: "0.5px solid #2643e9"
  }
}));

const Hero = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid container justify="center" className={classes.container}>
        <Grid item className={classes.gridItem}>
          <Typography variant="h1" className={classes.title}>
            AAAA
          </Typography>
        </Grid>
        <Grid item className={classes.gridItem}>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Our application aims to provide mid-level investors a simple,
            user-friendly system to manage their investment portfolios without
            having to sacrifice control. Built with AI technology, our system
            empowers users to make better investing decisions.
          </Typography>
        </Grid>
        <Grid item className={classes.gridItem}>
          <Button component={Link} to={"/signup"} className={classes.button}>
            Sign Up
          </Button>
        </Grid>
        <Grid item className={classes.gridItem}>
          <Button component={Link} to={"/login"} className={classes.button}>
            Log In
          </Button>
        </Grid>
      </Grid>

      <Grid item className={classes.lastGridItem}>
        <Divider className={classes.divider} />
      </Grid>
      {/* <AboutUs/> */}
    {/* <TopNews/> */}
    </Fragment>
  );
};

export default Hero;
