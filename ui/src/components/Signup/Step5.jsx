import React, { Fragment } from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

const Step5 = ({ classes }) => {
  console.log(classes);
  const [state, setState] = React.useState({
    house: true,
    investmentProperties: false,
    shares: false,
    termDepositOrCash: false,
    crypto: false,
    none: false
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const {
    house,
    investmentProperties,
    shares,
    termDepositOrCash,
    crypto,
    none
  } = state;
  return (
    <Fragment>
      <FormControl component="fieldset">
        <FormLabel
          style={{ marginBottom: "1em" }}
          className={classes.FormLabel}
          classes={{ focused: classes.focused }}
        >
          Assign responsibility
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={house}
                onChange={handleChange}
                name="house"
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="I own my own house"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={investmentProperties}
                onChange={handleChange}
                name="investmentProperties"
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="I own one or more investment properties"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={shares}
                onChange={handleChange}
                name="shares"
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="I own shares (including managed funds or apps like Raiz/CommSec Pocket)"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={termDepositOrCash}
                onChange={handleChange}
                name="termDepositOrCash"
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="I have a term deposit and/or cash in the bank"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={crypto}
                onChange={handleChange}
                name="crypto"
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="Cryptocurrencies (e.g. bitcoin)"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={none}
                onChange={handleChange}
                name="none"
                classes={{
                  checked: classes.checked,
                  colorSecondary: classes.radio
                }}
              />
            }
            label="I don’t currently have any investments"
          />
        </FormGroup>
      </FormControl>
    </Fragment>
  );
};

export default Step5;
