import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import Hero from "./Hero";
import AboutUs from "./AboutUs";

const useStyles = makeStyles(theme => ({
  page: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "auto",
    marginTop: "64px",
    paddingLeft: "10em",
    paddingRight: "10em",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "2em",
      paddingRight: "2em"
    }
  },
  divider: {
    border: "0.5px solid #2643e9"
  }
}));

const LandingPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Hero />
      <Divider className={classes.divider} />
      <Hero />
    </div>
  );
};
export default LandingPage;
