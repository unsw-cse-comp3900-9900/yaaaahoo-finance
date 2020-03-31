import React, { Fragment } from "react";
import { TextField, Typography } from "@material-ui/core";

const Step1 = ({ onChange, error }) => {
  return (
    <Fragment>
      <Typography style={{color: "#2643e9"}}>
        Basic Details
      </Typography>
      <TextField
        onChange={onChange}
        id="username"
        label="Username"
        name="username"
        error={error}
        style={{ marginBottom: "2em" }}
      />
      <TextField
        onChange={onChange}
        name="email"
        id="email"
        label="Email"
        error={error}
        style={{ marginBottom: "2em" }}
      />
      <TextField
        onChange={onChange}
        name="password"
        id="password"
        label="Password"
        type="password"
        error={error}
        style={{ marginBottom: "2em" }}
      />
      <TextField
        onChange={onChange}
        name="confirmPassword"
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        error={error}
        style={{ marginBottom: "2em" }}
      />
    </Fragment>
  );
};

export default Step1;
