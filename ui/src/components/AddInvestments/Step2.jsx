import React, { Fragment } from "react";
import { TextField, Typography} from "@material-ui/core";

const Step2 = ({ validateSymbol, handleChange, form, error }) => {
  return (
    <Fragment>
      <Typography style={{ color: "#2643e9" }}>Search for a symbol or company name</Typography>
      <TextField
        onChange={handleChange}
        onBlur={handleChange}
        name="symbol"
        value={form.symbol}
        id="symbol"
        label="E.g. AAPL or Apple"
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
    </Fragment>
  );
};

export default Step2;
