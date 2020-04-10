import React, { Fragment } from "react";
import { TextField, Typography} from "@material-ui/core";

const Step2 = ({ validateSymbol, handleChange, form, error }) => {
  return (
    <Fragment>
      <Typography style={{ color: "#2643e9" }}>Search for an investment</Typography>
      <TextField
        onChange={handleChange}
        onBlur={handleChange}
        name="symbol"
        value={form.symbol}
        id="symbol"
        label="Symbol"
        helperText={
          error.symbol && form.symbol === ""
            ? "Symbol is required"
            : error.symbol && !validateSymbol(form.symbol)
            ? "Invalid symbol"
            : ""
        }
        error={error.symbol}
        style={{ marginBottom: "2em" }}
      />
      <TextField
        onChange={handleChange}
        onBlur={handleChange}
        id="companyName"
        label="Company Name"
        name="companyName"
        value={form.companyName}
        error={error.companyName}
        helperText={error.companyName ? "Company Name is required" : ""}
        style={{ marginBottom: "2em" }}
      />
    </Fragment>
  );
};

export default Step2;
