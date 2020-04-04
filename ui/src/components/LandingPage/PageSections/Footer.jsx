import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  Page: {
    display: "flex",
    flexDirection: "column",
    minHeight: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  Button: {
    width: "15em",
    height: "3em",
    color: "#fff",
    backgroundColor: "#2643e9",
    marginTop: "2em"
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.Page}>
      <Button
        variant="contained"
        component={Link}
        to={"/signup"}
        className={classes.Button}
      >
        Join Us
      </Button>
    </div>
  );
};

export default Footer;
