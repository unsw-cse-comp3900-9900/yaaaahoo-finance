import React, {Fragment, useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Divider, Grid } from "@material-ui/core";
import { config } from '../../config';
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  gridItem: {
    marginBottom: "2em",
    width: "100%"
  },
  lastGridItem: {
    width: "100%"
  },
  title: {
    color: "#2643e9",
    fontWeighst: 400
  },
  subtitle: {
    maxWidth: "65%",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "none"
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "50%"
    }
  },
  divider: {
    border: "0.5px solid #2643e9"
  },
  table: {
    minWidth: 650,
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
    createData('Apple Inc.', 'AAPL', stock2),
    createData('Microsoft Corporation', 'MSFT', stock3),
    createData('Bitcoin (price is 1 bitcoin in AUD)', 'BTC', stock4),
    createData('Woolworths Group Ltd', 'WOW', stock5),
  ];

  return (
    <Fragment>
      <Grid container item justify="center">
        <Grid item className={classes.gridItem}>
          <Typography variant="h2" className={classes.title}>
            Top Stocks
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            The latest prices of our customers' favourite investments
          </Typography>
        </Grid>
          <TableContainer component={Paper}>
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
        <a href="https://iexcloud.io">Data provided by IEX Cloud</a>
        </Grid>
      <Grid item className={classes.lastGridItem}>
        <Divider className={classes.divider} />
      </Grid>
    </Fragment>
  );
};

export default TopStocks;
