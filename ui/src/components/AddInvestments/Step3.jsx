import React, {Fragment, useEffect, useState} from "react";
import { TextField, Typography} from "@material-ui/core";
import {config} from "../../config";
import axios from "axios";

const Step3 = ({ searchList, handleChange, form, error }) => {

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