import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import { CardContent, Typography, TextField, Button } from "@material-ui/core";
import Background from "../../assets/background.svg";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles(theme => ({
  Card: {
    width: "300px",
    height: "400px",
    padding: "2em"
  },
  CardTitle: {
    fontSize: "1.5em",
    fontWeight: "500"
  },
  CardContent: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-evenly"
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
      paddingRight: "2em"
    }
  },
  Button: {
    width: "100%",
    height: "3em",
    color: "#fff",
    borderColor: "#2643e9",
    backgroundColor: "#2643e9"
  },
  Back: {
    display: "flex",
    color: "#2643e9"
  }
}));

const ForgotPassword = ({ firebase, history }) => {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const onSubmit = event => {
    if (email === "") {
      setError(true);
    } else {
      firebase.doPasswordReset(email).then(() => setSuccess(true));
    }
  };

  const onChange = event => {
    event.persist();
    setEmail(event.target.value);
    setError(event.target.value === "");
  };

  return (
    <div className={classes.Page}>
      <Card className={classes.Card}>
        <CardContent className={classes.CardContent}>
          {!success && (
            <Fragment>
              <Typography className={classes.CardTitle}>
                Password Reset
              </Typography>

              <TextField
                id="email"
                label="Email"
                name="email"
                onChange={onChange}
                error={error}
                helperText={error ? "*Required" : ""}
              />

              <Button
                variant="contained"
                onClick={onSubmit}
                className={classes.Button}
              >
                Send Reset Link
              </Button>
            </Fragment>
          )}
          {success && (
            <Fragment>
              <Typography className={classes.CardTitle}>
                Reset Email Sent!
              </Typography>

              <Typography className={classes.Back} component={Link} to="/login">
                <ArrowBackIcon style={{ marginRight: "0.2em" }} /> Go back to
                login
              </Typography>
            </Fragment>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
