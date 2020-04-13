import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AuthUserContext, withAuthorization } from "../Session";
import TopNews from "./TopNews";

const useStyles = makeStyles((theme) => ({
  Page: {
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
  Container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "2em",
    width: "100%",
    minHeight: "90%",
    [theme.breakpoints.down("sm")]: {
      minHeight: "inherit",
    },
  },
}));
const News = () => {
  const classes = useStyles();

  return (
    <AuthUserContext.Consumer>
      {(authUser) => {
        return (
          <div className={classes.Page}>
            <div className={classes.Container}>
              <TopNews title="Top News" titleColor="black" />
            </div>
          </div>
        );
      }}
    </AuthUserContext.Consumer>
  );
};
const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(News);
