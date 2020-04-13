import React, { Component } from "react";
import { withRouter, Switch, Route } from "react-router";
import { compose } from "recompose";
import Login from "../Login/Login";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import Signup from "../Signup/Signup";
import Home from "../Home/Home";
import { withFirebase } from "../Firebase";
import LandingPage from "../LandingPage/LandingPage";
import SentimentDemo from "../Company/SentimentDemo";
import Analysis from "../Analysis/Analysis"

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={withRouter(LandingPage)} />
        <Route
          path="/login"
          exact
          component={compose(withRouter, withFirebase)(Login)}
        />
        <Route
          path="/signup"
          exact
          component={compose(withRouter, withFirebase)(Signup)}
        />
        <Route
          path="/home"
          exact
          component={compose(withRouter)(Home)}
        />
        <Route
          path="/password-reset"
          exact
          component={compose(withRouter, withFirebase)(ForgotPassword)}
        />
        <Route
          path="/sentiment/:company"
          exact
          component={compose(withRouter, withFirebase)(SentimentDemo)}
        />
        <Route
          path="/analysis"
          exact
          component={compose(withRouter, withFirebase)(Analysis)}
        />
      </Switch>
    );
  }
}

export default withRouter(Routes);
