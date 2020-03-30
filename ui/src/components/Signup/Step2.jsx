import React, { Fragment } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
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
          Select your age range
        </FormLabel>
        <RadioGroup
          aria-label="age"
          name="age"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="<30"
            control={
              <Radio
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="Under 30"
          />
          <FormControlLabel
            value="30-50"
            control={
              <Radio
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="30-50"
          />
          <FormControlLabel
            value="50-70"
            control={
              <Radio
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="50-70"
          />
          <FormControlLabel
            value=">70"
            classes={{ checked: classes.checked }}
            control={
              <Radio
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="Over 70"
          />
        </RadioGroup>
      </FormControl>
    </Fragment>
  );
};

export default Step2;
