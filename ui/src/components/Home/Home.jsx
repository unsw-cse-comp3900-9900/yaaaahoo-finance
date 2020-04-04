/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { AuthUserContext, withAuthorization } from "../Session";
import { useState } from "react";

const useStyles = makeStyles(theme => ({
  page: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "auto",
    marginTop: "64px",
    paddingLeft: "10em",
    paddingRight: "10em",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "2em",
      paddingRight: "2em"
    }
  },
  title: {
    fontSize: "3em",
    fontWeight: "500"
  }
}));
const Home = ({ firebase }) => {
  const classes = useStyles();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    firebase.getUserData().then(res => setUserData(res));
  }, []);

  return (
    <AuthUserContext.Consumer>
      {authUser => {
        return (
          <div className={classes.page}>
            {userData && (
              <Typography className={classes.title}>
                Hello {userData.username}!
              </Typography>
            )}
          </div>
        );
      }}
    </AuthUserContext.Consumer>
  );
};

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Home);
