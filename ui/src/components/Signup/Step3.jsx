import React, { Fragment } from "react";
import { TextField, Typography } from "@material-ui/core";

const Step3 = ({ handleChange, error }) => {
  return (
    <Fragment>
      <Typography style={{color: "#2643e9"}}>What is your desired retirement age?</Typography>
      <TextField
        onChange={handleChange}
        id="retired-age"
        label="Retirement Age"
        type="number"
        name="retirementAge"
        error={error}
      />
    </Fragment>
  );
};

export default Step3;