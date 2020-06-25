import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import Home from "./Pages/Home";

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage}></Route>
        <Route path="/home" component={Home}></Route>
      </Switch>
    </Router>
  );
}

export default App;
