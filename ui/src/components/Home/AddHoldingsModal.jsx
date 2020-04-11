/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField, Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import { config } from "../../config";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useDebounce from "./useDebounce";
import InputAdornment from "@material-ui/core/InputAdornment";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: "1.5em",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:focus": {
      outline: "none",
    },
    outline: "none",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    "&:focus": {
      outline: "none",
    },
    outline: "none",
    display: "flex",
    flexDirection: "column",
    height: "80%",
    width: "350px",
    justifyContent: "space-evenly",
  },
  button: {
    width: "100px",
    height: "3em",
    color: "#2643e9",
    borderColor: "#2643e9",
    marginTop: "2em",
  },
  submitButton: {
    extend: "button",
    color: "#fff",
    backgroundColor: "#2643e9",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

const AddHoldingsModal = ({ isOpen, onClose, onSubmit, portfolioId }) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [form, setForm] = useState({
    symbol: "",
    companyName: "",
    numberOfUnits: "",
    costPerUnit: "",
    tradeDate: new Date(),
  });
  const [error, setError] = useState({
    symbol: false,
    companyName: false,
    numberOfUnits: false,
    costPerUnit: false,
    tradeDate: false,
  });

  const [searchResults, setSearchResults] = useState([
    {
      symbol: "AAPL.BA",
      name: "APPLE INC CEDEAR",
      currency: "ARS",
      price: null,
      stock_exchange_long: "Buenos Aires Stock Exchange",
    },
    {
      symbol: "AAPL.MI",
      name: "Apple Inc.",
      currency: "EUR",
      price: null,
      stock_exchange_long: "Milan Stock Exchange",
    },
    {
      symbol: "AAPL.MX",
      name: "Apple Inc.",
      currency: "MXN",
      price: null,
      stock_exchange_long: "Mexican Stock Exchange",
    },
    {
      symbol: "AAPL34.SA",
      name: "APPLE085/UnSBDR QI",
      currency: "BRL",
      price: null,
      stock_exchange_long: "Sao Paolo Stock Exchange",
    },
  ]);

  //   const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const searchCompanies = async (search) => {
    return;
    // const url = `https://api.worldtradingdata.com/api/v1/stock_search?search_term=${search}&limit=5&page=1&api_token=${config.worldTradingApiToken}`;
    // return await axios
    //   .get(url)
    //   .then(({ data }) => data)
    //   .catch((error) => {
    //     console.error(error);
    //     return {
    //         data: []
    //     };
    //   });
  };

  //   useEffect(() => {
  //     if (debouncedSearchTerm) {
  //       // Set isSearching state
  //       setIsSearching(true);
  //       // Fire off our API call
  //       searchCompanies(debouncedSearchTerm).then((results) => {
  //         // Set back to false since request finished
  //         setIsSearching(false);
  //         // Set results state
  //         // setSearchResults(results.data);
  //       });
  //     } else {
  //     //   setSearchResults([]);
  //     }
  //   }, [debouncedSearchTerm]);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleChange = (event, value, reason) => {
    event.persist();
    setSearchTerm(value);
    if (reason === "input")
      setForm((f) => ({
        ...f,
        symbol: "",
        companyName: "",
      }));
    setError((e) => ({
      ...e,
      symbol: true,
      companyName: true,
    }));
    if (reason === "reset") {
      const symbolAndName = value.split(" - ");
      setForm((f) => ({
        ...f,
        symbol: symbolAndName[0],
        companyName: symbolAndName[1],
      }));
      setError((e) => ({
        ...e,
        symbol: false,
        companyName: false,
      }));
    }
  };

  const handleDateChange = (date) => {
    setForm((f) => ({
      ...f,
      tradeDate: date,
    }));
    setError((e) => ({
      ...e,
      tradeDate: !date ? true : false,
    }));
  };

  const validateNumberOfUnits = (numberOfUnits) => {
    const isNormalInteger = /^\+?(0|[1-9]\d*)$/;
    const parsedNumberOfUnits = parseInt(numberOfUnits, 10);
    return isNormalInteger.test(parsedNumberOfUnits);
  };

  const validateCostPerUnit = (costPerUnit) => {
    const isValidCost = /^\+?([1-9]\d*)(\.\d{0,4})?$/;
    return isValidCost.test(costPerUnit);
  };

  const handleTextChange = (event) => {
    event.persist();
    setForm((f) => ({
      ...f,
      [event.target.name]: event.target.value,
    }));

    if (event.target.name === "numberOfUnits") {
      setError((e) => ({
        ...e,
        [event.target.name]:
          event.target.value === "" ||
          !validateNumberOfUnits(event.target.value),
      }));
    } else if (event.target.name === "costPerUnit") {
      setError((e) => ({
        ...e,
        [event.target.name]:
          event.target.value === "" || !validateCostPerUnit(event.target.value),
      }));
    }
  };

  const handleBlur = (event) => {
    event.persist();
    setError((e) => ({
      ...e,
      [event.target.name]: form[event.target.name] === "",
    }));
  };

  const formInvalid = (form.symbol === "" ||
  form.companyName === "" ||
  form.numberOfUnits === "" || !validateNumberOfUnits(form.numberOfUnits) ||
  form.costPerUnit === "" || !validateCostPerUnit(form.costPerUnit) ||
  !form.tradeDate);

  const handleSubmit = () => {
    if (!formInvalid)
        onSubmit(portfolioId, form);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div className={classes.paper}>
          <Typography className={classes.heading}>Add Holding</Typography>
          <Autocomplete
            freeSolo
            disableClearable
            options={searchResults}
            onInputChange={(event, value, reason) =>
              handleChange(event, value, reason)
            }
            getOptionLabel={(option) => `${option.symbol} - ${option.name}`}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search company or symbol"
                margin="normal"
                variant="outlined"
                name="symbol"
                onBlur={handleBlur}
                InputProps={{ ...params.InputProps, type: "search" }}
                error={error.symbol || error.companyName}
                helperText={
                  error.symbol || error.companyName ? "Invalid input" : ""
                }
              />
            )}
          />
          <TextField
            label="Unit quantity"
            type="number"
            name="numberOfUnits"
            onChange={handleTextChange}
            onBlur={handleBlur}
            error={error.numberOfUnits}
            helperText={error.numberOfUnits ? "Invalid input" : ""}
          />
          <TextField
            label="Cost per unit"
            onChange={handleTextChange}
            onBlur={handleBlur}
            error={error.costPerUnit}
            helperText={error.costPerUnit ? "Invalid input" : "Format: 0.00"}
            name="costPerUnit"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              label="Date of purchase"
              value={form.tradeDate}
              onChange={handleDateChange}
              name="tradeDate"
              helperText={
                error.tradeDate ? "Invalid date" : "Format: dd/MM/yyyy"
              }
              error={error.tradeDate}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <div className={classes.buttonGroup}>
            <Button
              variant="outlined"
              className={classes.button}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              className={classes.submitButton}
              onClick={handleSubmit}
              disabled={formInvalid}
            >
              Add
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default AddHoldingsModal;
