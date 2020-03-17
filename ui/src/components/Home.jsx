import React from "react";
import { Typography, useRadioGroup } from "@material-ui/core";

const Home = ({ firebase }) => {
  const currentUser = firebase.getCurrentUser();
  return (
    <Typography>
      Hello {currentUser ? currentUser.displayName : "World"}!
    </Typography>
  );
};

export default Home;
