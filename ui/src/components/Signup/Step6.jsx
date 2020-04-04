import React, { Fragment } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";

const Step6 = ({ handleChange, value, classes }) => {
  return (
    <Fragment>
      <FormControl component="fieldset">
        <FormLabel
          style={{ marginBottom: "1em" }}
          className={classes.FormLabel}
          classes={{ focused: classes.focused }}
        >
          What type of investment portfolio do you want to have?
        </FormLabel>
        <RadioGroup
          aria-label="portfolioType"
          name="portfolioType"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="High Growth"
            control={
              <Radio
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="High Growth"
          />
          <FormControlLabel
            value="Balanced"
            control={
              <Radio
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="Balanced"
          />
          <FormControlLabel
            value="Conservative"
            control={
              <Radio
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="Conservative"
          />
        </RadioGroup>
      </FormControl>
    </Fragment>
  );
};

export default Step6;
