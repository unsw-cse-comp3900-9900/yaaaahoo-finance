import React, { Fragment } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

const Step2 = ({ handleChange, value, classes }) => {
  return (
    <Fragment>
      <FormControl component="fieldset">
        <FormLabel
          style={{ marginBottom: "1em" }}
          className={classes.FormLabel}
          classes={{ focused: classes.focused }}
        >
          How much risk are you willing to take in order to maximise gains?
        </FormLabel>
        <RadioGroup
          aria-label="risk"
          name="risk"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="High"
            control={
              <Radio
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio,
                }}
              />
            }
            label="High"
          />
          <FormControlLabel
            value="Balanced"
            control={
              <Radio
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio,
                }}
              />
            }
            label="Balanced"
          />
          <FormControlLabel
            value="Low"
            control={
              <Radio
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio,
                }}
              />
            }
            label="Low"
          />
        </RadioGroup>
      </FormControl>
    </Fragment>
  );
};

export default Step2;
