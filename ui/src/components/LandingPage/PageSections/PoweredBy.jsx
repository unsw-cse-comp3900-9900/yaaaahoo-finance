import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Logos from "../../../assets/logos.png";
const useStyles = makeStyles((theme) => ({
  Page: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "2em",
    paddingBottom: "2em",
    width: "100%",
  },
  Title: {
    fontSize: "2em",
    fontWeight: 500,
    color: "#2643e9",
    marginBottom: "1em",
  },
}));

const PoweredBy = () => {
  const classes = useStyles();
  return (
    <div className={classes.Page}>
      <Typography className={classes.Title}>Powered By</Typography>
      <img style={{ width: "100%", opacity: 0.8 }} src={Logos} />
    </div>
  );
};

export default PoweredBy;
