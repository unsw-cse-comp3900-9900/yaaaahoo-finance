import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { AuthUserContext, withAuthorization } from "../Session";
import { config } from "../../config";
import axios from "axios";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Plot from "react-plotly.js";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Analysis from "../Analysis/Analysis";

function createData(portfolios, companyData) {
  const symbol = companyData.symbol;
  const holdings = []
  for (let i = 0; i < portfolios.length; i++) {

    let totalGain = "N/A";
    let totalPerc = "N/A";
    let daysGain = "N/A";
    if(portfolios[i].holdings == null) continue;
    const portfolio_holdings = Object.values(portfolios[i].holdings);

    for (let j = 0; j < portfolio_holdings.length; j++) {

      if(portfolio_holdings[j].symbol == symbol) {

        totalGain = ((companyData.latestPrice - portfolio_holdings[j].costPerUnit) * portfolio_holdings[j].numberOfUnits)
            .toLocaleString(navigator.language, { minimumFractionDigits : 2});
        totalPerc = (companyData.latestPrice / portfolio_holdings[j].costPerUnit).toLocaleString(navigator.language, { minimumFractionDigits : 2});
        daysGain = (companyData.change * portfolio_holdings[j].numberOfUnits).toLocaleString(navigator.language, {minimumFractionDigits: 2});

        holdings.push({ portfolio: portfolios[i].name, daysGain: daysGain, daysPerc: companyData.changePercent, totalGain: totalGain, totalPerc: totalPerc })

      }

    }
  }
  return holdings;
}

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

  useEffect(() => {
    if (!userData) return;
    if (userData.portfolios)
      setPortfolios(Object.values(userData.portfolios));
    else setPortfolios([])
  }, [userData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [companyData, setCompanyData] = useState({
    symbol: "SNAP",
    companyName: "Snap, Inc.",
    primaryExchange: "New York Stock Exchange",
    calculationPrice: "close",
    open: 13.52,
    openTime: 1586439000766,
    openSource: "official",
    close: 13.61,
    closeTime: 1586462520788,
    closeSource: "official",
    high: 13.87,
    highTime: 1586462389969,
    highSource: "15 minute delayed price",
    low: 13.21,
    lowTime: 1586442712352,
    lowSource: "15 minute delayed price",
    latestPrice: 13.61,
    latestSource: "Close",
    latestTime: "April 9, 2020",
    latestUpdate: 1586462520788,
    latestVolume: 30727832,
    iexRealtimePrice: null,
    iexRealtimeSize: null,
    iexLastUpdated: null,
    delayedPrice: 13.61,
    delayedPriceTime: 1586462992230,
    oddLotDelayedPrice: 13.62,
    oddLotDelayedPriceTime: 1586462398766,
    extendedPrice: 13.73,
    extendedChange: 0.12,
    extendedChangePercent: 0.00882,
    extendedPriceTime: 1586476784333,
    previousClose: 13.22,
    previousVolume: 29895918,
    change: 0.39,
    changePercent: 0.0295,
    volume: 30727832,
    iexMarketPercent: null,
    iexVolume: null,
    avgTotalVolume: 32436874,
    iexBidPrice: null,
    iexBidSize: null,
    iexAskPrice: null,
    iexAskSize: null,
    iexOpen: null,
    iexOpenTime: null,
    iexClose: 13.645,
    iexCloseTime: 1586462391206,
    marketCap: 19328804042,
    peRatio: -18.08,
    week52High: 19.76,
    week52Low: 7.89,
    ytdChange: -0.1516,
    lastTradeTime: 1586462399280,
    isUSMarketOpen: false,
  });
  const [historicalData, setHistoricalData] = useState([
    { date: "2020-03-02", open: 14.35, close: 14.39, high: 14.53, low: 13.75 },
    { date: "2020-03-03", open: 14.5, close: 13.55, high: 14.74, low: 13.35 },
    { date: "2020-03-04", open: 13.82, close: 13.63, high: 13.85, low: 13.21 },
    { date: "2020-03-05", open: 13.68, close: 13.85, high: 14.21, low: 13.53 },
    { date: "2020-03-06", open: 13.46, close: 13, high: 13.55, low: 12.67 },
    { date: "2020-03-09", open: 11.25, close: 11.45, high: 12.13, low: 11 },
    { date: "2020-03-10", open: 11.91, close: 11.99, high: 11.99, low: 10.99 },
    { date: "2020-03-11", open: 11.57, close: 10.81, high: 11.67, low: 10.57 },
    { date: "2020-03-12", open: 10.07, close: 10.42, high: 11.13, low: 9.71 },
    { date: "2020-03-13", open: 11.09, close: 11.35, high: 11.35, low: 10.78 },
    { date: "2020-03-16", open: 9.61, close: 9.06, high: 10.2, low: 9.03 },
    { date: "2020-03-17", open: 9.19, close: 8.91, high: 9.37, low: 8.21 },
    { date: "2020-03-18", open: 8.03, close: 8.37, high: 9.08, low: 7.89 },
    { date: "2020-03-19", open: 8.3, close: 9.47, high: 9.68, low: 8.1 },
    { date: "2020-03-20", open: 9.98, close: 10.09, high: 10.4, low: 9.65 },
    { date: "2020-03-23", open: 10.12, close: 10.65, high: 10.95, low: 10.05 },
    { date: "2020-03-24", open: 11.32, close: 11, high: 11.58, low: 10.68 },
    { date: "2020-03-25", open: 11.15, close: 11.23, high: 11.65, low: 10.47 },
    { date: "2020-03-26", open: 11.31, close: 11.95, high: 12.07, low: 11.26 },
    { date: "2020-03-27", open: 11.59, close: 12.18, high: 12.41, low: 11.32 },
    { date: "2020-03-30", open: 12.05, close: 11.85, high: 12.27, low: 11.59 },
    { date: "2020-03-31", open: 11.65, close: 11.89, high: 12.6, low: 11.63 },
    { date: "2020-04-01", open: 11.32, close: 11.21, high: 11.69, low: 10.98 },
    { date: "2020-04-02", open: 11.18, close: 11.27, high: 11.82, low: 11.02 },
    { date: "2020-04-03", open: 11.3, close: 11.06, high: 11.45, low: 10.85 },
    { date: "2020-04-06", open: 11.47, close: 12.16, high: 12.25, low: 11.32 },
    { date: "2020-04-07", open: 12.6, close: 12.1, high: 12.73, low: 12.01 },
    { date: "2020-04-08", open: 12.57, close: 13.22, high: 13.45, low: 12.5 },
    { date: "2020-04-09", open: 13.52, close: 13.61, high: 13.87, low: 13.21 },
  ]);
  const getInfo = async (company) => {
    const url = `https://cloud.iexapis.com/v1/stock/${company}/quote?token=${config.iexCloudApiToken}`;
    return await axios.get(url).then(({ data }) => {
      console.log(data);
      setCompanyData(data);
    });
  };

  const getHistoricalData = async (company, range) => {
    const url = `https://cloud.iexapis.com/v1/stock/${company}/chart/${range}?token=${config.iexCloudApiToken}`;
    return await axios.get(url).then(({ data }) => {
      console.log(data);
      setHistoricalData(data);
    });
  };

  useEffect(() => {
    // const company = history.location.pathname.replace("/company/", "");
    // getInfo(company);
    // getHistoricalData(company, "1m");
  }, []);
  const difference = companyData.latestPrice - companyData.open;
  const differencePercentage = difference / companyData.open;

  useEffect(() => {
    firebase.getUserData().then((res) => {
      setUserData(res);
    });
  }, []);

  const rows = createData(portfolios, companyData);

  const trace1 = {
    fill: "tozeroy",
    fillcolor: "#cbd2f682",
    line: {
      color: "#2643e9",
    },
    type: "scatter",
    mode: "lines+markers",
    x: historicalData.map((data) => data.date),
    y: historicalData.map((data) => data.close),
    hovertemplate:
      "<i>Close</i>: %{y:.2f}" + "<br><i>Date</i>: %{x}<br><extra></extra>",
    showlegend: false,
  };

  const styleColor =
    difference < 0 ? "#fb6340" : difference > 0 ? "#2dce89" : "inherit";
    const company = history.location.pathname.replace("/company/", "");

  return (
    <AuthUserContext.Consumer>
      {(authUser) => {
        return (
          <div className={classes.Page}>
            <div className={classes.Container}>
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
                <Typography className={classes.Heading3}>
                  {companyData.latestPrice}
                </Typography>
                <Typography
                  style={{ color: styleColor }}
                  className={classes.Heading4}
                >
                  {difference.toFixed(2)} ({differencePercentage.toFixed(2)}%)
                </Typography>
                <Typography className={classes.Heading5}>
                  Previous Close: {companyData.previousClose}
                </Typography>
                <Typography className={classes.Heading5}>
                  Open: {companyData.open}
                </Typography>
                <Plot
                  data={[trace1]}
                  displayModeBar={false}
                  layout={{
                    title: "Historical Data (1 month)",
                    plot_bgcolor: "#fafafa",
                    paper_bgcolor: "#fafafa",
                    hovermode: "closest",
                    autosize: true,
                    margin: {
                      l: 20,
                      r: 20,
                      b: 50,
                      t: 50,
                      p: 20,
                    },
                  }}
                  config={{ responsive: true, displayModeBar: false }}
                  useResizeHandler={true}
                  style={{ width: "100%", height: "100%" }}
                />
              </TabPanel>

              <TabPanel value={value} index={1}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Portfolio</TableCell>
                        <TableCell align="right">Days Gain</TableCell>
                        <TableCell align="right">Days Gain (%)</TableCell>
                        <TableCell align="right">Total Gain</TableCell>
                        <TableCell align="right">Total Gain (%)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.portfolio}>
                          <TableCell component="th" scope="row">
                            {row.portfolio}
                          </TableCell>
                          <TableCell align="right">{row.daysGain}</TableCell>
                          <TableCell align="right">{row.daysPerc}</TableCell>
                          <TableCell align="right">{row.totalGain}</TableCell>
                          <TableCell align="right">{row.totalPerc}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>

              <TabPanel value={value} index={2}>

                <Analysis company={company} classes={classes} />
                {/* <Plot
                  data={[trace1]}
                  displayModeBar={false}
                  layout={{
                    title: "30 Day Prediction",
                    plot_bgcolor: "#fafafa",
                    paper_bgcolor: "#fafafa",
                    hovermode: "closest",
                    autosize: true,
                    margin: {
                      l: 20,
                      r: 20,
                      b: 50,
                      t: 50,
                      p: 20,
                    },
                  }}
                  config={{ responsive: true, displayModeBar: false }}
                  useResizeHandler={true}
                  style={{ width: "100%", height: "100%" }}
                /> */}
              </TabPanel>
            </div>
          </div>
        );
      }}
    </AuthUserContext.Consumer>
  );
};
const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Company);
