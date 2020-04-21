import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
      paddingRight: "2em",
    },
  },
  title: {
    fontSize: "3em",
    marginTop: "1em",
    marginBottom: "0.2em",
    fontWeight: "500",
  },
}));

const CompanyNotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <div className={classes.title}>Company not found.</div>
    </div>
  );
};
export default CompanyNotFound;