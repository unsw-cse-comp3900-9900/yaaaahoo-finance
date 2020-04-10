/* eslint-disable no-useless-escape */
import React, {useEffect, useState} from "react";
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
import Step3 from "./Step3";
import Step2 from "./Step2";
import Step4 from "./Step4";
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

const AddInvestments = ({ firebase, history }) => {
  const classes = useStyles();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    index: "NASDAQ",
    symbol: "",
    companyName: "",
    numberOfUnits: "",
    costPerUnit: "",
    tradeDate: ""
  });

  const [error, setError] = useState({
    symbol: false,
    numberOfUnits: false,
    costPerUnit: false,
    tradeDate: false,
    companyName: false
  });

  const validateSymbol = symbol => {
    const regex = /^([a-zA-Z]{1,4}([\. ][a-zA-Z]{1,4})?)$|^([a-zA-Z]+)$/;
    return regex.test(String(symbol));
  };

  const validateNumberOfUnits = numberOfUnits => {
    const isNormalInteger = /^\+?(0|[1-9]\d*)$/;
    const parsedNumberOfUnits = parseInt(numberOfUnits, 10);
    return isNormalInteger.test(parsedNumberOfUnits);
  };

  const validateCostPerUnit = costPerUnit => {
    const isValidCost = /^\+?([1-9]\d*)(\.\d{0,4})?$/;
    return isValidCost.test(costPerUnit);
  };

  const disableNext = () => {
    const { symbol, numberOfUnits, costPerUnit } = form;
    if (
      step === 2 &&
      (symbol === "" ||
        !validateSymbol(symbol))
    )
      return true;
    if (step === 4 && ((numberOfUnits === "" || !validateNumberOfUnits(numberOfUnits)) ||
        costPerUnit === "" || !validateCostPerUnit(costPerUnit)))
      return true;
    return false;
  };

  const nextStep = () => {
    if (step === 2 && disableNext()) {
      setError(e => ({
        ...e,
        index: form.index === "",
        symbol: form.symbol === "" || !validateSymbol(form.symbol)
      }));
      return;
    } else if (step === 3) {
      form.symbol = searchList["1. symbol"];
      form.companyName = searchList["2. name"];
    } else if (step === 4 && disableNext()) {
      setError(e => ({
        ...e,
        numberOfUnits:
          form.numberOfUnits === "" || !validateNumberOfUnits(form.numberOfUnits),
        costPerUnit:
          form.costPerUnit === "" || !validateCostPerUnit(form.costPerUnit)
      }));
      return;
    }
    if (step < 4) setStep(step + 1);
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

    if (event.target.name === "symbol") {
      setError(e => ({
        ...e,
        [event.target.name]:
          event.target.value === "" || !validateSymbol(event.target.value)
      }));
    } else if (event.target.name === "numberOfUnits") {
      setError(e => ({
        ...e,
        [event.target.name]:
          event.target.value === "" || !validateNumberOfUnits(event.target.value)
      }));
    } else if (event.target.name === "costPerUnit") {
      setError(e => ({
        ...e,
        [event.target.name]:
          event.target.value === "" || !validateCostPerUnit(event.target.value)
      }));
    } else {
      setError(e => ({
        ...e,
        [event.target.name]: event.target.value === ""
      }));
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
    const { index, symbol, companyName, numberOfUnits, costPerUnit, tradeDate } = form;

    firebase
      .doAddInvestmentToPortfolio(index, symbol, companyName, numberOfUnits, costPerUnit, tradeDate, {
        index: form.index,
        symbol: form.symbol,
        companyName: form.companyName,
        numberOfUnits: form.numberOfUnits,
        costPerUnit: form.costPerUnit,
        tradeDate: form.tradeDate
      })
      .then(authUser => {
        history.push("/home");
      })
      .catch(error => {
        console.log(error);
        history.push("/home");
      });

    event.preventDefault();
  };

  const [searchList, setSearchList] = useState([]);

  return (
    <div className={classes.Page}>
      <Card className={classes.Card}>
        <CardContent className={classes.CardContent}>
          <Typography className={classes.CardTitle}>Add Investment</Typography>
          <LinearProgress variant="determinate" value={(step / 4) * 100} />
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
                classes={classes}
                value={form.index}
                handleChange={onChange}
              />
            )}
            {step === 2 && (
              <Step2
                validateSymbol={validateSymbol}
                handleChange={onChange}
                form={form}
                error={error}
              />
            )}
            {step === 3 && (
              <Step3
                handleChange={onChange}
                form={form}
                error={error}
                searchList={searchList}
                setSearchList={setSearchList}
              />
            )}
            {step === 4 && (
              <Step4
                validateNumberOfUnits={validateNumberOfUnits}
                handleChange={onChange}
                form={form}
                error={error}
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

            {step === 4 ? (
              <Button
                className={classes.Button}
                variant="contained"
                onClick={onSubmit}
              >
                Add
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

export default AddInvestments;
