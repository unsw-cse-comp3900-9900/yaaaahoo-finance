import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {
  CardContent,
  Typography,
  Grid,
  TextField,
  Button
} from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    minWidth: 300,
    padding: "2em"
  },
  content: {
    display: "flex",
    flexDirection: "column"
  },
  contentItem: {
    marginTop: "1em",
    marginBottom: "1em",
    textAlign: "center"
  },
  button: {
    border: "1px solid rgba(255,255,255,0.20)",
    outline: "none",
    transition: "box-shadow 399ms ease-in-out",
    borderRadius: "12px",
    width: "100%",
    height: "3em",
    boxShadow: "5px 5px 8px #e3e3e3,-5px -5px 8px #ffffff",
    backgroundColor: "#fff",
    "&:hover": {
      boxShadow: "inset 5px 5px 8px #e3e3e3, inset -5px -5px 8px #ffffff",
      color: "#2643e9",
      backgroundColor: "#fff"
    }
  }
});

const Login = ({ firebase, history }) => {
  const classes = useStyles();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const onSubmit = event => {
    const { email, password } = form;
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        history.push("/home");
      })
      .catch(error => {
        console.log("Error");
      });
  };

  const onChange = event => {
    event.persist();
    setForm(f => ({
      ...f,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <Grid container justify="center">
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography>Login</Typography>
          <TextField
            className={classes.contentItem}
            id="email"
            label="Email"
            name="email"
            onChange={onChange}
          />
          <TextField
            className={classes.contentItem}
            id="password"
            label="Password"
            type="password"
            name="password"
            onChange={onChange}
          />
          <Grid item className={classes.contentItem}>
            <Button onClick={onSubmit} className={classes.button}>
              Login
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Login;
