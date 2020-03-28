import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Hero from "./Hero";
import AboutUs from "./AboutUs";

const useStyles = makeStyles(theme => ({
  page: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "auto",
    marginTop: "64px"
  }
}));

const LandingPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Hero />
    </div>
  );
};
export default LandingPage;
