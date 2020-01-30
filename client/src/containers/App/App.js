import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { PrivateRoute, PublicRoute } from "../../helpers/routeMiddleware";
import { fetchUserComplete } from "../../redux/actions/user";

import Login from "../Login/Login";
import Header from "../../components/header/header";
import Chat from "../Chat/Chat";

import "../../assets/icons/flaticon.css";
import "./App.scss";

const App = props => {
  // Page reload auto connect the user
  const access_token = window.getCookie("access_token");
  if (access_token && !props.user) {
    props.dispatch(fetchUserComplete());
    return <></>;
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <PublicRoute path="/login">
            <Login />
          </PublicRoute>
          <PrivateRoute path="/">
            <Header />
            <Chat />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
};

export default connect(state => ({
  user: state.app.user
}))(App);
