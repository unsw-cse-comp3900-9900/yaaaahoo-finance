import React, { useEffect } from "react";
// import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid } from "@material-ui/core";
import { AuthUserContext, withAuthorization } from "../Session";
// import { config } from '../config';

const useStyles = makeStyles(theme => ({
  container: {
    height: "10em",
    justifyContent: "space-evenly"
  },
  button: {
    border: "1px solid rgba(255,255,255,0.20)",
    outline: "none",
    transition: "box-shadow 399ms ease-in-out",
    borderRadius: "12px",
    width: "15em",
    height: "3em",
    boxShadow: "5px 5px 8px #e3e3e3,-5px -5px 8px #ffffff",
    backgroundColor: "#fff",
    "&:hover": {
      boxShadow: "inset 5px 5px 8px #e3e3e3, inset -5px -5px 8px #ffffff",
      color: "#2643e9",
      backgroundColor: "#fff"
    }
  }
}));
const Home = ({ firebase }) => {
  const classes = useStyles();

  const onLogout = event => {
    firebase.doSignOut()
  }

  useEffect(() => {
    // NEWS API CALL
    // const url = `http://newsapi.org/v2/top-headlines?category=business&country=au&apiKey=${config.newsApiToken}`
    // console.log(config.newsApiToken)
    // axios.get(url)
    // .then(response => {
    //   console.log(response)
    // })
    // .catch(error => {
    //   console.log(error)
    // });
  });

  return (
    <AuthUserContext.Consumer>
      {authUser => {
        return (
          <Grid
            container
            direction="column"
            className={classes.container}
            alignContent="center"
          >
            <Grid item>
              <Typography>Hello {authUser.displayName || "World"}!</Typography>
            </Grid>
            <Grid item>
              <Button onClick={onLogout} className={classes.button}>Logout</Button>
            </Grid>
          </Grid>
        );
      }}
    </AuthUserContext.Consumer>
  );
};

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Home);
