import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Grid, Typography} from "@material-ui/core";
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {config} from "../../../config";
import SchoolIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles(theme => ({
  Page: {
    display: "flex",
    flexDirection: "column",
    minHeight: "90%",
    paddingTop: "2em",
    width: "100%"
  },
  Title: {
    fontSize: "2em",
    fontWeight: 500,
    color: "#2643e9"
  },
  Card: {
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cbd2f6",
    color: "#2643e9"
  },
  CardTitle: {
    fontSize: "1.5em",
    fontWeight: "400"
  },
  CardBody: {
    fontSize: "1em"
  },
  CardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
    width: "100%",
    justifyContent: "space-evenly"
  },
  CardItem: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  }
}));

const TopStocks = () => {
  const classes = useStyles();

  const [stock1, setStock1] = useState('loading...');
  const [stock2, setStock2] = useState('loading...');
  const [stock3, setStock3] = useState('loading...');
  const [stock4, setStock4] = useState('loading...');
  const [stock5, setStock5] = useState('loading...');

  useEffect(() => {
    // AlphaVantage API CALL
    var urlOne = `https://api.worldtradingdata.com/api/v1/stock?symbol=CBA.AX&api_token=${config.worldTradingApiToken}`;
    var urlTwo = `https://cloud.iexapis.com/stable/stock/aapl/quote/latestPrice?token=${config.iexCloudApiToken}`;
    var urlThree = `https://cloud.iexapis.com/stable/stock/msft/quote/latestPrice?token=${config.iexCloudApiToken}`;
    var urlFour = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=AUD&apikey=${config.alphaVantageApiToken}`;
    var urlFive = `https://api.worldtradingdata.com/api/v1/stock?symbol=WOW.AX&api_token=${config.worldTradingApiToken}`;

    const requestOne = axios.get(urlOne);
    const requestTwo = axios.get(urlTwo);
    const requestThree = axios.get(urlThree);
    const requestFour = axios.get(urlFour);
    const requestFive = axios.get(urlFive);

    axios.all([requestOne, requestTwo, requestThree, requestFour, requestFive])
        .then(axios.spread((response1, response2, response3, response4, response5) => {
              setStock1(response1.data.data[0]['price']);
              setStock2(response2.data);
              setStock3(response3.data);
              setStock4(response4.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
          console.log(response4);
              setStock5(response5.data.data[0]['price']);
            }))

  }, []);

  function createData(companyName, symbol, price) {
    return { companyName, symbol, price };
  }

  const rows = [
    createData('Commonwealth Bank of Australia', 'CBA', stock1),
    createData('Apple Inc.*', 'AAPL', stock2),
    createData('Microsoft Corporation*', 'MSFT', stock3),
    createData('Bitcoin (price of 1 bitcoin in AUD)', 'BTC', stock4),
    createData('Woolworths Group Ltd', 'WOW', stock5),
  ];

  return (
    <div className={classes.Page}>
      <Typography className={classes.Title} gutterBottom>
        Top Stocks
      </Typography>
      <Typography className={classes.subtitle} gutterBottom>
        The latest prices of our customers' favourite investments
      </Typography>
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Investment</TableCell>
                  <TableCell align="right">Symbol</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">{row.companyName}</TableCell>
                  <TableCell align="right">{row.symbol}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                </TableRow>))}
              </TableBody>
            </Table>
          </TableContainer>
        <a href="https://iexcloud.io">* Data provided by IEX Cloud</a>
    </div>
  );
};

export default TopStocks;
