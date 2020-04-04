import React, { Fragment } from "react";
import { TextField, Typography } from "@material-ui/core";

const Step3 = ({ validateAge, handleChange, form }) => {
  return (
    <Fragment>
      <Typography style={{ color: "#2643e9" }}>
        What is your desired retirement age?
      </Typography>
      <TextField
        onChange={handleChange}
        value={form.retirementAge}
        id="retired-age"
        label="Retirement Age"
        type="number"
        name="retirementAge"
        error={form.retirementAge === "" || !validateAge(form.retirementAge)}
        helperText={
          form.retirementAge === ""
            ? "Desired retirement age required"
            : !validateAge(form.retirementAge)
            ? "Invalid age"
            : ""
        }
      />
    </Fragment>
  );
};

export default Step3;
