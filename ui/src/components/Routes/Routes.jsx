import React, { Component } from "react";
import { withRouter, Switch, Route } from "react-router";
import { compose } from 'recompose';
import Login from "../Login/Login";
import Hero from "../Hero/Hero";
import Signup from "../Signup/Signup";
import Home from "../Home/Home";
import { withFirebase } from '../Firebase';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={withRouter(Hero)} />
        <Route path="/login" exact component={compose(withRouter, withFirebase)(Login)} />
        <Route path="/signup" exact component={compose(withRouter, withFirebase)(Signup)} />
        <Route path="/home" exact component={compose(withRouter, withFirebase)(Home)} />
      </Switch>
    );
  }
}

export default withRouter(Routes);