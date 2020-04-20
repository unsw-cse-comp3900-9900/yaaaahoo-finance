/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Background from "../../assets/background.svg";
import {
  CardContent,
  Typography,
  LinearProgress,
  Button,
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const useStyles = makeStyles((theme) => ({
  Card: {
    width: "300px",
    height: "90%",
    padding: "2em",
  },
  CardTitle: {
    fontSize: "1.5em",
    fontWeight: "500",
    marginBottom: "0.5em",
  },
  CardContent: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
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
    width: "6em",
    height: "3em",
    color: "#fff",
    borderColor: "#2643e9",
    backgroundColor: "#2643e9",
  },
  ButtonGroup: {
    display: "flex",
    flexDirection: "row",
  },
  NextButton: {
    display: "flex",
    cursor: "pointer",

    marginLeft: "auto",
    alignItems: "center",
    color: "#2643e9",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  PrevButton: {
    display: "flex",
    cursor: "pointer",

    marginRight: "auto",
    alignItems: "center",
    color: "#2643e9",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  DisabledPrevButton: {
    extend: "PrevButton",
    cursor: "default",
    color: "#a5a5a5",
  },
  DisabledNextButton: {
    extend: "NextButton",
    cursor: "default",
    color: "#a5a5a5",
  },
  FormLabel: {
    color: "#2643e9",
    "&$focused": {
      color: "#2643e9",
    },
  },
  FormControlGroup: {
    marginBottom: "1em",
  },
  radio: {
    "&$checked": {
      color: "#2643e9",
    },
    "&$disabled": {
      color: theme.palette.action.disabled,
    },
  },
  checked: {},
  disabled: {},
  focused: {},
}));

const Signup = ({ firebase, history }) => {
  const classes = useStyles();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    risk: "High",
    age: "Young",
  });

  const [error, setError] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validateEmail = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };

  const disableNext = () => {
    const { email, password, confirmPassword } = form;
    if (
      step === 1 &&
      (email === "" ||
        !validateEmail(email) ||
        password === "" ||
        password !== confirmPassword)
    )
      return true;
    return false;
  };

  const nextStep = () => {
    if (step === 1 && disableNext()) {
      setError((e) => ({
        ...e,
        email: form.email === "" || !validateEmail(form.email),
        password: form.password === "",
        confirmPassword: form.confirmPassword !== form.password,
      }));
      return;
    }
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const onChange = (event) => {
    event.persist();
    setForm((f) => ({
      ...f,
      [event.target.name]: event.target.value,
    }));

    if (event.target.name === "email") {
      setError((e) => ({
        ...e,
        [event.target.name]:
          event.target.value === "" || !validateEmail(event.target.value),
      }));
    } else if (event.target.name === "confirmPassword") {
      setError((e) => ({
        ...e,
        [event.target.name]: event.target.value !== form.password,
      }));
    } else {
      setError((e) => ({
        ...e,
        [event.target.name]: event.target.value === "",
      }));
    }
  };

  const onSubmit = (event) => {
    const { email, password } = form;
    firebase
      .doCreateUserWithEmailAndPassword(email, password, {
        email: form.email,
        age: form.age,
        risk: form.risk,
      })
      .then(() => {
        history.push("/home");
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
  };

  return (
    <div className={classes.Page}>
      <Card className={classes.Card}>
        <CardContent className={classes.CardContent}>
          <Typography className={classes.CardTitle}>Signup</Typography>
          <LinearProgress variant="determinate" value={(step / 3) * 100} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "column",
              marginTop: "2em",
              marginBottom: "auto",
            }}
          >
            {step === 1 && (
              <Step1
                validateEmail={validateEmail}
                handleChange={onChange}
                form={form}
                error={error}
              />
            )}
            {step === 2 && (
              <Step2
                classes={classes}
                handleChange={onChange}
                value={form.risk}
              />
            )}
            {step === 3 && (
              <Step3
                classes={classes}
                handleChange={onChange}
                value={form.age}
              />
            )}
          </div>

          <div className={classes.ButtonGroup}>
            <Typography
              className={
                step === 1 ? classes.DisabledPrevButton : classes.PrevButton
              }
              onClick={prevStep}
            >
              <NavigateBeforeIcon style={{ fontSize: "2em" }} />
            </Typography>

            {step === 3 ? (
              <Button
                className={classes.Button}
                variant="contained"
                onClick={onSubmit}
              >
                Submit
              </Button>
            ) : (
              <Typography className={classes.NextButton} onClick={nextStep}>
                <NavigateNextIcon style={{ fontSize: "2em" }} />
              </Typography>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
