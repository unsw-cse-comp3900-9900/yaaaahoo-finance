import React, { Fragment } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

const Step3 = ({ handleChange, value, classes }) => {
  return (
    <Fragment>
      <FormControl component="fieldset">
        <FormLabel
          style={{ marginBottom: "1em" }}
          className={classes.FormLabel}
          classes={{ focused: classes.focused }}
        >
          How close are you to retirement age?
        </FormLabel>
        <RadioGroup
          aria-label="age"
          name="age"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Young"
            control={
              <Radio
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio,
                }}
              />
            }
            label="Young"
          />
          <FormControlLabel
            value="Middle-aged"
            control={
              <Radio
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio,
                }}
              />
            }
            label="Middle-aged"
          />
          <FormControlLabel
            value="Retiree"
            control={
              <Radio
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio,
                }}
              />
            }
            label="Retiree"
          />
        </RadioGroup>
      </FormControl>
    </Fragment>
  );
};

export default Step3;
