import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const Step5 = ({ classes, handleChange, value }) => {
  const theme = createMuiTheme({
    overrides: {
      MuiFormControlLabel: {
        label: {
          fontSize: "1em"
        }
      }
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <FormControl component="fieldset">
        <FormLabel
          style={{ marginBottom: "1em" }}
          className={classes.FormLabel}
          classes={{ focused: classes.focused }}
        >
          What other types of investments do you have?
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={value.house}
                onChange={handleChange}
                name="house"
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="I own my own house"
            className={classes.FormControlGroup}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={value.investmentProperties}
                onChange={handleChange}
                name="investmentProperties"
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="I own one or more investment properties"
            className={classes.FormControlGroup}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={value.shares}
                onChange={handleChange}
                name="shares"
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="I own shares (including managed funds or apps like Raiz/CommSec Pocket)"
            className={classes.FormControlGroup}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={value.termDepositOrCash}
                onChange={handleChange}
                name="termDepositOrCash"
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="I have a term deposit and/or cash in the bank"
            className={classes.FormControlGroup}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={value.crypto}
                onChange={handleChange}
                name="crypto"
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="Cryptocurrencies (e.g. bitcoin)"
            className={classes.FormControlGroup}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={value.none}
                onChange={handleChange}
                name="none"
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label={"I don’t currently have any investments"}
            className={classes.FormControlGroup}
          />
        </FormGroup>
      </FormControl>
    </ThemeProvider>
  );
};

export default Step5;
