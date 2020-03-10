import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Background from "../assets/background.svg";
import { Typography, Divider, Button, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "right bottom",
    backgroundSize: "auto 100%",

    height: "100vh",
    width: "100vw",
    paddingLeft: "10em",
    paddingRight: "10em",
    overFlow: "hidden",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "2em",
      paddingRight: "2em"
    }
  },
  gridItem: {
    marginBottom: "2em",
    width: "100%"
  },
  lastGridItem: {
    width: "100%"
  },
  button: {
    width: "15em",
    height: "3em",
    borderColor: "#2643e9",
    color: "#2643e9",
    backgroundColor: "white"
  },
  title: {
    color: "#2643e9",
    fontWeight: 400
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
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems="flex-start"
      className={classes.root}
    >
      <Grid
        container
        item
        justify="center"
        direction="column"
        alignItems="flex-start"
      >
        <Grid item className={classes.gridItem}>
          <Typography variant="h2" className={classes.title}>
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
          <Button variant="outlined" color="primary" className={classes.button}>
            Sign Up
          </Button>
        </Grid>
        <Grid item className={classes.gridItem}>
          <Button variant="outlined" color="primary" className={classes.button}>
            Log In
          </Button>
        </Grid>
      </Grid>

      <Grid item className={classes.lastGridItem}>
        <Divider className={classes.divider} />
      </Grid>
    </Grid>
  );
};

export default Hero;
