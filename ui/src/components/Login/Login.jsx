import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import { CardContent, Typography, TextField, Button } from "@material-ui/core";
import Background from "../../assets/background.svg";

const useStyles = makeStyles((theme) => ({
  Card: {
    width: "300px",
    height: "70%",
    padding: "2em",
  },
  CardTitle: {
    fontSize: "1.5em",
    fontWeight: "500",
  },
  CardContent: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-evenly",
  },
  Page: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "auto",
    marginTop: "64px",
    paddingLeft: "10em",
    paddingRight: "10em",
    justifyContent: "center",
    alignItems: "center",
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
  Button: {
    width: "100%",
    height: "3em",
    color: "#fff",
    borderColor: "#2643e9",
    backgroundColor: "#2643e9",
  },
  ForgotPassword: {
    textDecoration: "underline",
    color: "#2643e9",
    cursor: "pointer",
    fontSize: "0.8em",
    textAlign: "right",
  },
  SignUp: {
    fontSize: "1.2em",
    color: "#2643e9",
    textAlign: "center",
  },
}));

const Login = ({ firebase, history }) => {
  const classes = useStyles();
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const onSubmit = (event) => {
    const { email, password } = form;
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((authUser) => {
        history.push("/home");
      })
      .catch(() => {
        setError((e) => ({
          ...e,
          email: true,
          password: true,
        }));
      });
  };

  const onChange = (event) => {
    event.persist();
    setForm((f) => ({
      ...f,
      [event.target.name]: event.target.value,
    }));
    setError((e) => ({
      ...e,
      [event.target.name]: event.target.value === "",
    }));
  };

  return (
    <div className={classes.Page}>
      <Card className={classes.Card}>
        <CardContent className={classes.CardContent}>
          <Typography className={classes.CardTitle}>Log In</Typography>
          {(error.email || error.password) && (
            <Typography style={{ fontSize: "1em", color: "red" }}>
              *Invalid Credentials
            </Typography>
          )}
          <TextField
            id="email"
            label="Email"
            name="email"
            onChange={onChange}
            error={error.email}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            name="password"
            onChange={onChange}
            error={error.password}
          />

          <Typography
            component={Link}
            to="/password-reset"
            className={classes.ForgotPassword}
          >
            Forgot Password?
          </Typography>

          <Button
            variant="contained"
            onClick={onSubmit}
            className={classes.Button}
          >
            Log In
          </Button>
          <Typography className={classes.SignUp}>
            Don't have an account? <br></br>
            <Link
              to="/signup"
              style={{ textDecoration: "underline", color: "#2643e9" }}
            >
              Sign up here
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
