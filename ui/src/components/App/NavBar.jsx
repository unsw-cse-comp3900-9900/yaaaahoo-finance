import React, { Fragment, useState, useEffect, useRef } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { config } from "../../config";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  TextField,
  MenuItem,
  Menu,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import MoreIcon from "@material-ui/icons/MoreVert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo192.png";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import useDebounce from "../../util/useDebounce";

const useStyles = makeStyles((theme) => ({
  bar: {
    backgroundColor: "#fff",
    color: "#2643e9",
    boxShadow: "0px 1px 10px 0px rgba(0,0,0,0.12)",
    justifyContent: "center",
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
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
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#2643e9",
    marginRight: "2em",
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
    },
  },
  desktopItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: "2em",
    marginLeft: "2em",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.5,
    },
  },
  heading: {
    fontSize: "1.2em",
    fontWeight: 400,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: "auto",
    marginLeft: "auto",
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
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const NavBar = ({ authUser, firebase, history }) => {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [menuOpen, setMenuOpen] = useState(false);
  const cancelToken = useRef(null);

  const searchCompanies = async (search) => {
    cancelToken.current = axios.CancelToken.source();
    const url = `https://api.worldtradingdata.com/api/v1/stock_search?stock_exchange=NYSE&search_term=${search}&limit=5&page=1&api_token=${config.worldTradingApiToken}`;
    return await axios
      .get(url, { cancelToken: cancelToken.current.token })
      .then(({ data }) => data)
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.log(error);
        }
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
      // Set isSearching state
      setIsSearching(true);
      // Fire off our API call
      searchCompanies(debouncedSearchTerm).then((results) => {
        // Set back to false since request finished
        setIsSearching(false);
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

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const onLogout = () => {
    handleMobileMenuClose();
    firebase.doSignOut();
  };

  const goToNews = () => {
    handleMobileMenuClose();
    history.push("/news");
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={goToNews} style={{ color: "#2643e9" }}>
        <IconButton color="inherit">
          <LibraryBooksIcon />
        </IconButton>
        <p>Top News</p>
      </MenuItem>
      <MenuItem onClick={onLogout} style={{ color: "#2643e9" }}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <PowerSettingsNewIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  const openMenu = (e) => {
    setMenuOpen(true);
  };

  const handleChange = (event, value, reason) => {
    setSearchTerm(value);
  };

  const keyPress = (event) => {
    const results = searchResults.map((s) => `${s.symbol} - ${s.name}`);
    if (event.keyCode === 13) {
      if (!results.includes(event.target.value)) {
        history.push("/nocompany");
        console.log("Search word not found");
        return;
      }
      const symbolAndName = event.target.value.split(" - ");
      setSearchTerm("");
      setMenuOpen(false);
      history.push(`/company/${symbolAndName[0]}`);
    }
  };

  return (
    <Fragment>
      <AppBar className={classes.bar}>
        <Toolbar>
          <Link to={authUser ? "/home" : "/"} className={classes.logoWrapper}>
            <img alt="" className={classes.logo} src={Logo} />
            <Typography className={classes.title}>Finance</Typography>
          </Link>
          {!authUser && (
            <Button
              component={Link}
              to="/login"
              style={{ color: "#2643e9", marginLeft: "auto" }}
            >
              Log in
            </Button>
          )}
          {authUser && (
            <Fragment>
              <div className={classes.search}>
                <Autocomplete
                  freeSolo
                  disableClearable
                  disablePortal
                  onKeyDown={keyPress}
                  value={searchTerm}
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
                      placeholder="Search NYSE: The New York Stock Exchange"
                      margin="normal"
                      onMouseDown={openMenu}
                      open={menuOpen}
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
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <div onClick={goToNews} className={classes.desktopItem}>
                  <LibraryBooksIcon style={{ marginRight: "0.3em" }} />
                  <Typography className={classes.heading} variant="h6" noWrap>
                    Top News
                  </Typography>
                </div>
                <div
                  className={classes.desktopItem}
                  onClick={onLogout}
                  style={{ marginRight: 0 }}
                >
                  <PowerSettingsNewIcon style={{ marginRight: "0.3em" }} />
                  <Typography className={classes.heading} variant="h6" noWrap>
                    Log out
                  </Typography>
                </div>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Fragment>
  );
};

export default compose(withRouter, withFirebase)(NavBar);
