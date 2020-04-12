import React, { Fragment } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";

const Step1 = ({ handleChange, value, classes }) => {
  return (
    <Fragment>
      <FormControl component="fieldset">
        <FormLabel
          style={{ marginBottom: "1em" }}
          className={classes.FormLabel}
          classes={{ focused: classes.focused }}
        >
          Select the index your investment is listed on
        </FormLabel>
        <RadioGroup
          aria-label="index"
          name="index"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="ASX"
            control={
              <Radio
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="ASX"
          />
          <FormControlLabel
            value="NASDAQ"
            control={
              <Radio
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="NASDAQ"
          />
        </RadioGroup>
      </FormControl>
    </Fragment>
  );
};

export default Step1;
