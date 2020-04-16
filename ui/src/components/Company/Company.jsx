import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, CircularProgress } from "@material-ui/core";
import { AuthUserContext, withAuthorization } from "../Session";
import { config } from "../../config";
import axios from "axios";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Analysis from "./Analysis";
import Holdings from "./Holdings";
import Summary from "./Summary";
import testData from "./sampleHistoricalData.json";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ paddingRight: 0, paddingLeft: 0, paddingTop: "50px" }}>
          {children}
        </Box>
      )}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  Page: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "auto",
    marginTop: "64px",
    paddingLeft: "10em",
    paddingRight: "10em",
    paddingTop: "5em",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "2em",
      paddingRight: "2em",
      paddingTop: "2em",
    },
  },
  Container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "2em",
    width: "100%",
    minHeight: "90%",
    [theme.breakpoints.down("sm")]: {
      minHeight: "inherit",
    },
  },
  Heading1: {
    fontSize: "3em",
    fontWeight: 600,
    marginBottom: "10px",
  },
  Heading2: {
    fontSize: "2em",
    fontWeight: 500,
    marginBottom: "15px",
  },
  Heading3: {
    fontSize: "2.5em",
    fontWeight: 500,
    marginBottom: "20px",
  },
  Heading4: {
    fontSize: "1.5em",
    marginBottom: "30px",
    fontWeight: 500,
  },
  Heading5: {
    fontSize: "1em",
    fontWeight: 400,
    marginBottom: "30px",
  },
}));
const Company = ({ history, firebase }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [userData, setUserData] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [companyData, setCompanyData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [predictionInput, setPredictionInput] = useState([]);

  useEffect(() => {
    if (!userData) return;
    if (userData.portfolios) setPortfolios(Object.values(userData.portfolios));
    else setPortfolios([]);
  }, [userData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getInfo = async (company) => {
    const url = `https://cloud.iexapis.com/v1/stock/${company}/quote?token=${config.iexCloudApiToken}`;
    return await axios.get(url).then(({ data }) => {
      setCompanyData(data);
    });
  };

  const getHistoricalData = async (company, range) => {
    const url = `https://cloud.iexapis.com/v1/stock/${company}/chart/${range}?token=${config.iexCloudApiToken}`;
    return await axios
      .get(url)
      .then(({ data }) => {
        setHistoricalData(data);
      })
      .catch((error) => {
        setHistoricalData(testData);
      });
  };

  useEffect(() => {
    const closingPrices = [];
    if (!historicalData) return;
    let count = 1;
    for (let i = historicalData.length-1; i >= 0; i--) {
      if (count > 300) break;
      count++;
      closingPrices.push(historicalData[i].close);
    }
    setPredictionInput(closingPrices);
  }, [historicalData])

  useEffect(() => {
    const company = history.location.pathname.replace("/company/", "");
    getInfo(company);
    getHistoricalData(company, "5y");
  }, []);

  useEffect(() => {
    firebase.getUserData().then((res) => {
      setUserData(res);
    });
  }, []);

  const company = history.location.pathname.replace("/company/", "");

  return (
    <AuthUserContext.Consumer>
      {(authUser) => {
        return (
          <div className={classes.Page}>
            <div className={classes.Container}>
              {companyData ? (
                <Fragment>
                  <Typography className={classes.Heading1}>
                    {companyData.symbol}
                  </Typography>
                  <Typography className={classes.Heading2}>
                    {companyData.companyName}
                  </Typography>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="simple tabs example"
                    indicatorColor="primary"
                  >
                    <Tab label="Summary" {...a11yProps(0)} />
                    <Tab label="My Holdings" {...a11yProps(1)} />
                    <Tab label="Analysis" {...a11yProps(2)} />
                  </Tabs>
                  <TabPanel value={value} index={0}>
                    <Summary
                      classes={classes}
                      historicalData={historicalData}
                      companyData={companyData}
                    />
                  </TabPanel>

                  <TabPanel value={value} index={1}>
                    <Holdings
                      portfolios={portfolios}
                      companyData={companyData}
                    />
                  </TabPanel>

                  <TabPanel value={value} index={2}>
                    <Analysis
                      company={company}
                      classes={classes}
                      companyData={companyData}
                      historicalData={predictionInput}
                    />
                  </TabPanel>
                </Fragment>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <CircularProgress style={{ color: "#cbd2f6" }} />
                </div>
              )}
            </div>
          </div>
        );
      }}
    </AuthUserContext.Consumer>
  );
};
const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Company);
