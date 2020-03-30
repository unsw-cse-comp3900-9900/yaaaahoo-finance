import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Background from "../../assets/background.svg";
import { CardContent, Typography, TextField, Button } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const useStyles = makeStyles(theme => ({
  Card: {
    width: "300px",
    height: "80%",
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
    display: "flex",
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
    display: "flex",
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
  disabled: {}
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
          <Typography>Step {step} of 6</Typography>
          {step === 1 && (
            <Fragment>
              <TextField
                onChange={onChange}
                id="username"
                label="Username"
                name="username"
                error={error}
              />
              <TextField
                onChange={onChange}
                name="email"
                id="email"
                label="Email"
                error={error}
              />
              <TextField
                onChange={onChange}
                name="password"
                id="password"
                label="Password"
                type="password"
                error={error}
              />
              <TextField
                onChange={onChange}
                name="confirmPassword"
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                error={error}
              />
            </Fragment>
          )}
          {step === 2 && (
            <Fragment>
              <FormControl component="fieldset">
                <FormLabel
                  style={{ marginBottom: "1em" }}
                  className={classes.FormLabel}
                  classes={{ focused: classes.focused }}
                >
                  Select your age range
                </FormLabel>
                <RadioGroup
                  aria-label="age"
                  name="age"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="<30"
                    control={
                      <Radio
                        classes={{
                          checked: classes.checked,
                          colorSecondary: classes.radio
                        }}
                      />
                    }
                    label="Under 30"
                  />
                  <FormControlLabel
                    value="30-50"
                    control={
                      <Radio
                        classes={{
                          checked: classes.checked,
                          colorSecondary: classes.radio
                        }}
                      />
                    }
                    label="30-50"
                  />
                  <FormControlLabel
                    value="50-70"
                    control={
                      <Radio
                        classes={{
                          checked: classes.checked,
                          colorSecondary: classes.radio
                        }}
                      />
                    }
                    label="50-70"
                  />
                  <FormControlLabel
                    value=">70"
                    classes={{ checked: classes.checked }}
                    control={
                      <Radio
                        classes={{
                          checked: classes.checked,
                          colorSecondary: classes.radio
                        }}
                      />
                    }
                    label="Over 70"
                  />
                </RadioGroup>
              </FormControl>
            </Fragment>
          )}
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
