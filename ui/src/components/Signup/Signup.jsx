import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Background from "../../assets/background.svg";
import { CardContent, Typography } from "@material-ui/core";
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
    fontWeight: "500"
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
  ButtonGroup: {
    display: "flex",
    flexDirection: "row"
  },
  NextButton: {
    display: "flex",
    cursor: "pointer",
    marginTop: "1em",
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
    marginTop: "1em",
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
  const [value, setValue] = React.useState("<30");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState(false);
  const onSubmit = event => {
    const { username, email, password, confirmPassword } = form;
    const isInvalid =
      password !== confirmPassword ||
      password === "" ||
      email === "" ||
      username === "";
    if (isInvalid) {
      setError(true);
    } else {
      firebase
        .doCreateUserWithEmailAndPassword(username, email, password)
        .then(authUser => {
          history.push("/home");
        })
        .catch(error => {
          setError(true);
        });
    }
    event.preventDefault();
  };

  const nextStep = () => {
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
  };
  const handleChange = event => {
    setValue(event.target.value);
  };
  return (
    <div className={classes.Page}>
      <Card className={classes.Card}>
        <CardContent className={classes.CardContent}>
          <Typography className={classes.CardTitle}>Signup</Typography>
          <Typography style={{ fontSize: "0.9em" }}>
            Step {step} of 6
          </Typography>
<div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "column",
              marginTop: "2em",
              marginBottom: "auto",
              transition: "all 1s ease-in-out",
            }}
          >
            {step === 1 && <Step1 error={error} onChange={onChange} />}
            {step === 2 && (
              <Step2
                classes={classes}
                value={value}
                handleChange={handleChange}
              />
            )}
            {step === 3 && <Step3 />}
            {step === 4 && (
              <Step4
                classes={classes}
                value={value}
                handleChange={handleChange}
              />
            )}
            {step === 5 && <Step5 classes={classes} />}
            {step === 6 && (
              <Step6
                classes={classes}
                value={value}
                handleChange={handleChange}
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
            <Typography
              className={
                step === 6 ? classes.DisabledNextButton : classes.NextButton
              }
              onClick={nextStep}
            >
              <NavigateNextIcon style={{ fontSize: "2em" }} />
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
