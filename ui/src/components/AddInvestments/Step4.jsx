import React, { Fragment } from "react";
import { TextField, Typography } from "@material-ui/core";

const Step4 = ({ validateNumberOfUnits, validateCostPerUnit, handleChange, form, error }) => {
  return (
    <Fragment>
      <Typography style={{ color: "#2643e9" }}>
        How many units do you own of this investment?
      </Typography>
      <TextField
        onChange={handleChange}
        value={form.numberOfUnits}
        id="numberOfUnits"
        label="Number of units"
        type="number"
        name="numberOfUnits"
        error={error.numberOfUnits}
        helperText={
          error.numberOfUnits && form.numberOfUnits === ""
            ? "Number of units owned required"
            : error.numberOfUnits && !validateNumberOfUnits(form.numberOfUnits)
            ? "Invalid number of units"
            : ""
        }
      />
      <Typography style={{ color: "#2643e9" }}>
        What was the unit price when you bought this investment?
      </Typography>
      <TextField
        onChange={handleChange}
        value={form.costPerUnit}
        id="costPerUnit"
        label="Unit price"
        type="number"
        name="costPerUnit"
        error={error.costPerUnit}
        helperText={
          error.costPerUnit && form.costPerUnit === ""
            ? "Number of units owned required"
            : error.costPerUnit && !validateCostPerUnit(form.costPerUnit)
            ? "Invalid number of units"
            : ""
        }
      />
      <Typography style={{ color: "#2643e9" }}>
        What date did you purchase this investment?
      </Typography>
      <TextField
        onChange={handleChange}
        value={form.tradeDate}
        id="tradeDate"
        //label="Trade Date"
        type="date"
        name="tradeDate"
        error={error.costPerUnit}
        helperText={
          error.tradeDate && form.tradeDate === ""
            ? "Investment purchase date required"
            : ""
        }
      />
    </Fragment>
  );
};

export default Step4;
