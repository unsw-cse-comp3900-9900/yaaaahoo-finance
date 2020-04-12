import React, {Fragment, useEffect, useState} from "react";
import { TextField, Typography} from "@material-ui/core";
import {config} from "../../config";
import axios from "axios";

const Step3 = ({ searchList, setSearchList, handleChange, form, error }) => {

    useEffect(() => {
    var url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${form.symbol}&apikey=${config.alphaVantageApiToken}`;
    axios.get(url)
        .then (res => {
          console.log(res.data.bestMatches[0]);
          //TO DO: Change to an actual list??
          setSearchList(res.data.bestMatches[0]);
        })
        .catch(err => {
          console.log(err);
        })

  }, []);

  return (
    <Fragment>
      <Typography style={{ color: "#2643e9" }}>Confirm company name:</Typography>
        <Typography style={{colour: "a5a5a5" }}>
          {searchList["2. name"]}
        </Typography>
    </Fragment>
  );
};

export default Step3;