import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import Hero from "./PageSections/Hero";
import AboutUs from "./PageSections/AboutUs";
import Background from "../../assets/background.svg";
import Footer from "./PageSections/Footer";
import PoweredBy from "./PageSections/PoweredBy";

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "auto",
    marginTop: "64px",
    paddingLeft: "10em",
    paddingRight: "10em",
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "right bottom",
    backgroundSize: "auto 100%",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "2em",
      paddingRight: "2em",
    },
  },
  divider: {
    border: "0.5px solid #2643e9",
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Hero />
      <Divider className={classes.divider} />
      <AboutUs />
      <Divider className={classes.divider} />
      <PoweredBy />
      <Divider className={classes.divider} />
      <Footer />
    </div>
  );
};
export default LandingPage;
