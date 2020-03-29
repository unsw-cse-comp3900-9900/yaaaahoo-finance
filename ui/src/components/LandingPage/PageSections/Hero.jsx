import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  page: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    minHeight: "90%",
    overflowY: "auto",
  },
  title: {
    fontSize: "3em",
    marginBottom: "0.2em",
    fontWeight: '500'
  },
  subtitle: {
    fontSize: "1.3em",
    fontWeight: 300,
    maxWidth: "65%",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "none"
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "50%"
    }
  },
  button: {
    width: "15em",
    height: "3em",
    color: "#2643e9",
    borderColor: "#2643e9",
    marginTop: "2em"
  }
}));

const Hero = () => {
  const classes = useStyles();
  return (
    <Grid container justify="center" className={classes.page}>
      <Grid item>
        <Typography className={classes.title}>
          Your Portfolio, <span style={{ color: "#2643e9" }}>Your Way</span>
        </Typography>
      </Grid>
      <Grid item className={classes.subtitle}>
        <span style={{ fontStyle: "italic" }}>AAAA Finance</span> is a web
        application aimed to provide mid-level investors a simple, user-friendly
        system to manage their investment portfolios without having to sacrifice
        control. With our machine learning technology users can invest smarter
        and simpler.
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color="primary"
          component={Link}
          to={"/signup"}
          className={classes.button}
        >
          Sign Up
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color="primary"
          component={Link}
          to={"/login"}
          className={classes.button}
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default Hero;
