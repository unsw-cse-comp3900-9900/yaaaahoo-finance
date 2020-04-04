import React, { Fragment } from "react";
import { TextField, Typography } from "@material-ui/core";

const Step1 = ({ validateEmail, handleChange, form, error }) => {
  return (
    <Fragment>
      <Typography style={{ color: "#2643e9" }}>Basic Details</Typography>
      <TextField
        onChange={handleChange}
        onBlur={handleChange}
        id="username"
        label="Username"
        name="username"
        value={form.username}
        error={error.username}
        helperText={error.username ? "Username is required" : ""}
        style={{ marginBottom: "2em" }}
      />
      <TextField
        onChange={handleChange}
        onBlur={handleChange}
        name="email"
        value={form.email}
        id="email"
        label="Email"
        helperText={
          error.email && form.email === ""
            ? "Email is required"
            : error.email && !validateEmail(form.email)
            ? "Invalid email"
            : ""
        }
        error={error.email}
        style={{ marginBottom: "2em" }}
      />
      <TextField
        onChange={handleChange}
        onBlur={handleChange}
        value={form.password}
        name="password"
        id="password"
        label="Password"
        type="password"
        helperText={error.password ? "Password is required" : ""}
        error={error.password}
        style={{ marginBottom: "2em" }}
      />
      <TextField
        onChange={handleChange}
        onBlur={handleChange}
        value={form.confirmPassword}
        name="confirmPassword"
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        helperText={error.confirmPassword ? "Passwords do not match." : ""}
        error={error.confirmPassword}
        style={{ marginBottom: "2em" }}
      />
    </Fragment>
  );
};

export default Step1;
