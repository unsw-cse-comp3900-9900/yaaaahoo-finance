/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import { Typography, TextField, Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import { config } from "../../config";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useDebounce from "../../util/useDebounce.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import SearchIcon from "@material-ui/icons/Search";

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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const AddHoldingsModal = ({ isOpen, onClose, onSubmit, portfolioId }) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
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

  const [searchResults, setSearchResults] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const cancelToken = useRef(null);

  const searchCompanies = async (search) => {
    cancelToken.current = axios.CancelToken.source();
    const url = `https://api.worldtradingdata.com/api/v1/stock_search?stock_exchange=NYSE&search_term=${search}&limit=5&page=1&api_token=${config.worldTradingApiToken}`;
    return await axios
      .get(url, { cancelToken: cancelToken.current.token })
      .then(({ data }) => data)
      .catch((error) => {
        console.error(error);
        return {
          data: [],
        };
      });
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      if (cancelToken.current) {
        cancelToken.current.cancel("Component unmounted");
      }

      // Fire off our API call
      searchCompanies(debouncedSearchTerm).then((results) => {
        // Set results state
        setSearchResults(results.data);
      });
    } else {
      setSearchResults([]);
    }
    return () => {
      if (cancelToken.current) {
        cancelToken.current.cancel("Component unmounted");
      }
    };
  }, [debouncedSearchTerm]);

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

  const formInvalid =
    form.symbol === "" ||
    form.companyName === "" ||
    form.numberOfUnits === "" ||
    !validateNumberOfUnits(form.numberOfUnits) ||
    form.costPerUnit === "" ||
    !validateCostPerUnit(form.costPerUnit) ||
    !form.tradeDate;

  const handleSubmit = () => {
    if (!formInvalid) onSubmit(portfolioId, form);
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
          <div className={classes.search}>
            <Autocomplete
              freeSolo
              disableClearable
              options={searchResults}
              onInputChange={(event, value, reason) =>
                handleChange(event, value, reason)
              }
              getOptionLabel={(option) => {
                if (!option.symbol) return option;
                return `${option.symbol} - ${option.name}`;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search company or symbol"
                  placeholder="Search…"
                  margin="normal"
                  name="symbol"
                  classes={{
                    root: classes.inputRoot,
                  }}
                  error={error.symbol || error.companyName}
                  helperText={
                    error.symbol || error.companyName ? "Invalid input" : ""
                  }
                  InputProps={{
                    "aria-label": "search",
                    ...params.InputProps,
                    type: "search",
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    classes: { input: classes.inputInput },
                  }}
                />
              )}
            />
          </div>
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
