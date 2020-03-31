import React, { Fragment } from "react";
import { TextField, Typography } from "@material-ui/core";

const Step3 = ({ onChange, error }) => {
  return (
    <Fragment>
      <Typography style={{color: "#2643e9"}}>What is your desired retirement age?</Typography>
      <TextField
        onChange={onChange}
        id="retired-age"
        label="Age"
        type="number"
        name="age"
        error={error}
      />
    </Fragment>
  );
};

export default Step3;