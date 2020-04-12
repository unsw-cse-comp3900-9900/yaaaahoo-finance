import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo192.png";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withRouter } from "react-router";

const useStyles = makeStyles((theme) => ({
  logo: {
    height: "3em",
    marginRight: "0.4em",
  },
  bar: {
    backgroundColor: "#fff",
    color: "#2643e9",
    boxShadow: "0px 1px 10px 0px rgba(0,0,0,0.12)",
    height: "64px",
    justifyContent: "center",
  },
  title: {
    fontSize: "1.2em",
    fontWeight: 500,
  },
  logoWrapper: {
    display: "flex",
    marginRight: "auto",
    alignItems: "center",
    textDecoration: "none",
    color: "#2643e9",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: "auto",
    marginRight: "1em",
    width: "35%",
    [theme.breakpoints.up("sm")]: {
      width: "25%",
    },
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

const NavBar = ({ authUser, firebase, history }) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [form, setForm] = useState({
    symbol: "",
    companyName: "",
  });
  const [error, setError] = useState({
    symbol: false,
    companyName: false,
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
  const handleBlur = (event) => {
    event.persist();
    setError((e) => ({
      ...e,
      [event.target.name]: form[event.target.name] === "",
    }));
  };
  const onLogout = (event) => {
    firebase.doSignOut();
  };
  const keyPress = event => {
    const results = searchResults.map(s => `${s.symbol} - ${s.name}`);
    if (event.keyCode === 13) {
      if (!results.includes(event.target.value)) {
        console.log("Search word not found");
        return;
      }
      history.push(`/company/${event.target.value}`);
    }
  }
  return (
    <AppBar className={classes.bar}>
      <Toolbar>
        <Link to={authUser ? "/home" : "/"} className={classes.logoWrapper}>
          <img alt="" className={classes.logo} src={Logo} />
          <Typography className={classes.title}>Finance</Typography>
        </Link>
        {authUser && (
          <Fragment>
            <div className={classes.search}>
              <Autocomplete
                freeSolo
                disableClearable
                onKeyDown={keyPress}
                options={searchResults}
                onInputChange={(event, value, reason) =>
                  handleChange(event, value, reason)
                }
                getOptionLabel={(option) => {
                  if (!option.symbol) return option;
                  return `${option.symbol} - ${option.name}`}
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search…"
                    margin="normal"
                    name="symbol"
                    classes={{
                      root: classes.inputRoot,
                    }}
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
            <Button onClick={onLogout} style={{ color: "#2643e9" }}>
              Log out
            </Button>
          </Fragment>
        )}
        {!authUser && (
          <Button component={Link} to="/login" style={{ color: "#2643e9" }}>
            Log in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default compose(withRouter, withFirebase)(NavBar);
