import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "../Login/Login";
import Header from "../../components/header/header";
import Chat from "../Chat/Chat";

import "../../assets/icons/flaticon.css";
import "./App.scss";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Header />
            <Chat />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
