import React, { Fragment } from "react";
import { TextField, Typography } from "@material-ui/core";

const Step1 = ({ validateEmail, handleChange, form }) => {

  return (
    <Fragment>
      <Typography style={{ color: "#2643e9" }}>Basic Details</Typography>
      <TextField
        onChange={handleChange}
        id="username"
        label="Username"
        name="username"
        value={form.username}
        error={form.username === ""}
        helperText={form.username === "" ? "Username is required" : ""}
        style={{ marginBottom: "2em" }}
      />
      <TextField
        onChange={handleChange}
        name="email"
        value={form.email}
        id="email"
        label="Email"
        helperText={form.email === "" ? "Email is required" : !validateEmail(form.email) ? "Invalid email" : ""}
        error={!validateEmail(form.email)}
        style={{ marginBottom: "2em" }}
      />
      <TextField
        onChange={handleChange}
        value={form.password}
        name="password"
        id="password"
        label="Password"
        type="password"
        helperText={form.password === "" ? "Password is required" : ""}
        error={form.password === ""}
        style={{ marginBottom: "2em" }}
      />
      <TextField
        onChange={handleChange}
        value={form.confirmPassword}
        name="confirmPassword"
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        helperText={
          form.confirmPassword !== form.password
            ? "Passwords do not match."
            : ""
        }
        error={form.confirmPassword !== form.password}
        style={{ marginBottom: "2em" }}
      />
    </Fragment>
  );
};

export default Step1;
