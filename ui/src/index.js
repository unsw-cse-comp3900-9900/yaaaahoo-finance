import React from "react";
import { render } from "react-dom";
import App from "./App";
import Routes from "./components/Routes";
import { BrowserRouter } from "react-router-dom";
import Firebase, { FirebaseContext } from './components/Firebase';

render(
  <FirebaseContext.Provider value={new Firebase()}>
    <BrowserRouter>
      <App>
        <Routes />
      </App>
    </BrowserRouter>
  </FirebaseContext.Provider>
  ,document.getElementById("root")
);
