import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "../../components/header/header";
import Chat from "../Chat/Chat";

import "../../assets/icons/flaticon.css";
import "./App.scss";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>

        <Switch>
          <Route path="/">
            <Header />
            <Chat />
          </Route>
          <Route path="/login"></Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
