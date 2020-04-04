import React, { Fragment } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";

const Step4 = ({ handleChange, value, classes }) => {
  return (
    <Fragment>
      <FormControl component="fieldset">
        <FormLabel
          style={{ marginBottom: "1em" }}
          className={classes.FormLabel}
          classes={{ focused: classes.focused }}
        >
          What is your annual income?
        </FormLabel>
        <RadioGroup
          aria-label="annualIncome"
          name="annualIncome"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Less than $20,000"
            control={
              <Radio
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="Less than $20,000"
          />
          <FormControlLabel
            value="$20,000-$40,000"
            control={
              <Radio
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="$20,000-$40,000"
          />
          <FormControlLabel
            value="$40,000-$90,000"
            control={
              <Radio
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="$40,000-$90,000"
          />
          <FormControlLabel
            value="$90,000-$180,000"
            control={
              <Radio
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="$90,000-$180,000"
          />
          <FormControlLabel
            value="$180,000+"
            control={
              <Radio
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="$180,000+"
          />
        </RadioGroup>
      </FormControl>
    </Fragment>
  );
};

export default Step4;
