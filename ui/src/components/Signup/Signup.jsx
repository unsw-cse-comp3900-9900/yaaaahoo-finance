/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Background from "../../assets/background.svg";
import {
  CardContent,
  Typography,
  LinearProgress,
  Button
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
const useStyles = makeStyles(theme => ({
  Card: {
    width: "300px",
    height: "90%",
    padding: "2em"
  },
  CardTitle: {
    fontSize: "1.5em",
    fontWeight: "500",
    marginBottom: "0.5em"
  },
  CardContent: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
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
    width: "6em",
    height: "3em",
    color: "#fff",
    borderColor: "#2643e9",
    backgroundColor: "#2643e9"
  },
  ButtonGroup: {
    display: "flex",
    flexDirection: "row"
  },
  NextButton: {
    display: "flex",
    cursor: "pointer",

    marginLeft: "auto",
    alignItems: "center",
    color: "#2643e9",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  PrevButton: {
    display: "flex",
    cursor: "pointer",

    marginRight: "auto",
    alignItems: "center",
    color: "#2643e9",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  DisabledPrevButton: {
    extend: "PrevButton",
    cursor: "default",
    color: "#a5a5a5"
  },
  DisabledNextButton: {
    extend: "NextButton",
    cursor: "default",
    color: "#a5a5a5"
  },
  FormLabel: {
    color: "#2643e9",
    "&$focused": {
      color: "#2643e9"
    }
  },
  FormControlGroup: {
    marginBottom: "1em"
  },
  radio: {
    "&$checked": {
      color: "#2643e9"
    },
    "&$disabled": {
      color: theme.palette.action.disabled
    }
  },
  checked: {},
  disabled: {},
  focused: {}
}));

const Signup = ({ firebase, history }) => {
  const classes = useStyles();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "Under 30",
    retirementAge: "",
    annualIncome: "Less than $20,000",
    house: false,
    investmentProperties: false,
    shares: false,
    termDepositOrCash: false,
    crypto: false,
    none: false,
    portfolioType: "High Growth"
  });

  const [error, setError] = useState({
    username: true,
    email: true,
    password: true,
    confirmPassword: true,
    retirementAge: true
  });

  const disableNext = () => {
    const { username, email, password, confirmPassword, retirementAge } = error;
    if (step === 1 && (username || email || password || confirmPassword ))
      return true;
    if (step === 3 && retirementAge) 
      return true;
    return false;
  }

  const validateEmail = email => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };

  const validateAge = age => {
    const isNormalInteger = /^\+?(0|[1-9]\d*)$/;
    const isValidAge = /^[1-9]?[0-9]{1}$|^100$/;
    const parsedAge = parseInt(age, 10);
    return isNormalInteger.test(age) && isValidAge.test(parsedAge);
  };

  const nextStep = () => {
    if (disableNext()) return;
    if (step < 6) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const onChange = event => {
    event.persist();
    setForm(f => ({
      ...f,
      [event.target.name]: event.target.value
    }));
    
    if (event.target.name === "email") {
      setError(e => ({
        ...e,
        [event.target.name]: event.target.value === "" || !validateEmail(event.target.value)
      }))
    } else if (event.target.name === "retirementAge") {
      setError(e => ({
        ...e,
        [event.target.name]: event.target.value === "" || !validateAge(event.target.value)
      }))
    } else if (event.target.name === "confirmPassword") {
      setError(e => ({
        ...e,
        [event.target.name]: event.target.value !== form.password
      }))
    } else {
      setError(e => ({
        ...e,
        [event.target.name]: event.target.value === ""
      }))
    }
  };

  const handleCheck = event => {
    event.persist();
    setForm(f => ({
      ...f,
      [event.target.name]: event.target.checked
    }));
  };

  const onSubmit = event => {
    const { email, password } = form;

    firebase
      .doCreateUserWithEmailAndPassword(email, password, {
        username: form.username,
        email: form.email,
        age: form.age,
        retirementAge: form.retirementAge,
        annualIncome: form.annualIncome,
        house: form.house,
        investmentProperties: form.investmentProperties,
        shares: form.shares,
        termDepositOrCash: form.termDepositOrCash,
        crypto: form.crypto,
        none: form.none,
        portfolioType: form.portfolioType
      })
      .then(authUser => {
        history.push("/home");
      })
      .catch(error => {
        console.log(error);
      });

    event.preventDefault();
  };

  return (
    <div className={classes.Page}>
      <Card className={classes.Card}>
        <CardContent className={classes.CardContent}>
          <Typography className={classes.CardTitle}>Signup</Typography>
          <LinearProgress variant="determinate" value={(step / 6) * 100} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "column",
              marginTop: "2em",
              marginBottom: "auto"
            }}
          >
            {step === 1 && (
              <Step1
                validateEmail={validateEmail}
                handleChange={onChange}
                form={form}
              />
            )}
            {step === 2 && (
              <Step2
                classes={classes}
                value={form.age}
                handleChange={onChange}
              />
            )}
            {step === 3 && (
              <Step3 validateAge={validateAge} handleChange={onChange} form={form} />
            )}
            {step === 4 && (
              <Step4
                classes={classes}
                value={form.annualIncome}
                handleChange={onChange}
              />
            )}
            {step === 5 && (
              <Step5
                classes={classes}
                handleChange={handleCheck}
                value={form}
              />
            )}
            {step === 6 && (
              <Step6
                classes={classes}
                value={form.portfolioType}
                handleChange={onChange}
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

            {step === 6 ? (
              <Button
                className={classes.Button}
                variant="contained"
                onClick={onSubmit}
              >
                Submit
              </Button>
            ) : (
              <Typography
                className={
                  disableNext() ? classes.DisabledNextButton : classes.NextButton
                }
                onClick={nextStep}
              >
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
