import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { config } from "../../../config";

const useStyles = makeStyles(theme => ({
  table: {},
  Page: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "2em",
    minHeight: "90%",
    width: "100%"
  },
  Title: {
    fontSize: "2em",
    fontWeight: 500,
    color: "#2643e9"
  },
  Subtitle: {
    fontSize: "1.3em",
    marginBottom: "1em"
  },
  Table: {
    marginBottom: "1em"
  },
  ContentContainer: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center"
  }
}));

const TopStocks = () => {
  const classes = useStyles();

  const [stock1, setStock1] = useState("loading...");
  const [stock2, setStock2] = useState("loading...");
  const [stock3, setStock3] = useState("loading...");
  const [stock5, setStock5] = useState("loading...");

  useEffect(() => {
    var urlOne = `https://api.worldtradingdata.com/api/v1/stock?symbol=CBA.AX&api_token=${config.worldTradingApiToken}`;
    var urlTwo = `https://cloud.iexapis.com/stable/stock/aapl/quote/latestPrice?token=${config.iexCloudApiToken}`;
    var urlThree = `https://cloud.iexapis.com/stable/stock/msft/quote/latestPrice?token=${config.iexCloudApiToken}`;
    var urlFive = `https://api.worldtradingdata.com/api/v1/stock?symbol=WOW.AX&api_token=${config.worldTradingApiToken}`;

    const requestOne = axios.get(urlOne);
    const requestTwo = axios.get(urlTwo);
    const requestThree = axios.get(urlThree);
    const requestFive = axios.get(urlFive);

    axios.all([requestOne, requestTwo, requestThree, requestFive]).then(
      axios.spread((response1, response2, response3, response5) => {
        setStock1(response1.data.data[0]["price"]);
        setStock2(response2.data);
        setStock3(response3.data);
        setStock5(response5.data.data[0]["price"]);
      })
    );
  }, []);

  function createData(companyName, symbol, price) {
    return { companyName, symbol, price };
  }

  const rows = [
    createData("Commonwealth Bank of Australia", "CBA", stock1),
    createData("Apple Inc.*", "AAPL", stock2),
    createData("Microsoft Corporation*", "MSFT", stock3),
    createData("Woolworths Group Ltd", "WOW", stock5)
  ];

  return (
    <div className={classes.Page}>
      <Typography className={classes.Title} gutterBottom>
        Powered by IEX Cloud and World Trading Data
      </Typography>
      <Typography className={classes.Subtitle} gutterBottom>
        We provide real time information for the ASX and NASDAQ exchange markets
      </Typography>
      <div className={classes.ContentContainer}>
        <TableContainer>
          <Table className={classes.Table}>
            <TableHead>
              <TableRow>
                <TableCell>Investment</TableCell>
                <TableCell align="right">Symbol</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.companyName}
                  </TableCell>
                  <TableCell align="right">{row.symbol}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default TopStocks;
