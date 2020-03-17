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

const Signup = ({ firebase, history }) => {
  const classes = useStyles();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const onSubmit = event => {
    const { username, email, password, confirmPassword } = form;
    const isInvalid =
      password !== confirmPassword ||
      password === "" ||
      email === "" ||
      username === "";
    if (isInvalid) {
      console.log("Error");
    } else {
      firebase
        .doCreateUserWithEmailAndPassword(username, email, password)
        .then(authUser => {
          setForm({
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
          });
          history.push("/home");
        })
        .catch(error => {
          console.log("Error");
        });
    }
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
          <Typography>Signup</Typography>
          <TextField
            className={classes.contentItem}
            onChange={onChange}
            id="username"
            label="Username"
            name="username"
          />
          <TextField
            className={classes.contentItem}
            onChange={onChange}
            name="email"
            id="email"
            label="Email"
          />
          <TextField
            className={classes.contentItem}
            onChange={onChange}
            name="password"
            id="password"
            label="Password"
            type="password"
          />
          <TextField
            className={classes.contentItem}
            onChange={onChange}
            name="confirmPassword"
            id="confirmPassword"
            label="Confirm Password"
            type="password"
          />
          <Grid item className={classes.contentItem}>
            <Button onClick={onSubmit} className={classes.button}>
              Sign Up
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Signup;
