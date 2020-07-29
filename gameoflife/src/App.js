import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./Components/Game";
// import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/game">
          <Game />
        </Route>
        <Route path="/">{/* <Home /> */}</Route>
      </Switch>
    </Router>
  );
}

export default App;
