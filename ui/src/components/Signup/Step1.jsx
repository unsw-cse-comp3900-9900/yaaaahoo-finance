import React, { Fragment } from "react";
import { TextField } from "@material-ui/core";

const Step1 = ({onChange, error}) => {
    return(
        <Fragment>
        <TextField
          onChange={onChange}
          id="username"
          label="Username"
          name="username"
          error={error}
        />
        <TextField
          onChange={onChange}
          name="email"
          id="email"
          label="Email"
          error={error}
        />
        <TextField
          onChange={onChange}
          name="password"
          id="password"
          label="Password"
          type="password"
          error={error}
        />
        <TextField
          onChange={onChange}
          name="confirmPassword"
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          error={error}
        />
      </Fragment>
    );
};

export default Step1;