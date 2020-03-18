import React from "react";
import { render } from "react-dom";
import App from "./App";
import Routes from "./components/Routes";
import Firebase, { FirebaseContext } from "./components/Firebase";

render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App>
      <Routes />
    </App>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
