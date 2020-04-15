import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// Create styling function.
const useStyles = makeStyles(theme => ({
  PageContainer: {
    display: "flex",
    flexDirection: "column", // Child elements placed in column direction
    flexGrow: 1, // fill parent's width/height
    overflowY: "auto", // scroll y axis if contents overflow height
    marginTop: "64px", // to not be covered by the navigation bar
    paddingLeft: "10em", 
    paddingRight: "10em",
    // If screen is mobile size
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "2em",
      paddingRight: "2em"
    }
  },
  ContentContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "2em",
    width: "100%",
    minHeight: "90%",
    [theme.breakpoints.down("sm")]: {
      minHeight: "inherit"
    }
  }
}));

const Page404 = () => {
  // Use styling function above so you can call
  // it inside your react component
  
  const classes = useStyles();
  
  return (
    <div className={classes.PageContainer}>
      <div className={classes.ContentContainer}>
        <h1>404 - Page Not Found</h1>
      </div>
    </div>
  );
};

export default Page404;