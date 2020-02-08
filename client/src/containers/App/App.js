import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import authPreload from "../../libs/authPreload";
import { PrivateRoute, PublicRoute } from "../../libs/routeMiddleware";

import Login from "../Login/Login";
import Header from "../../components/header/header";
import Chat from "../Chat/Chat";

import AddGroups from "../../components/modals/addGroups";

import "../../assets/icons/flaticon.css";
import "./App.scss";

const App = props => {
  try {
    authPreload(props);
  } catch (_) {
    // User auto connect => don't show anything
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
      {/* MODAL ADD A GROUP: FIXED BTN */}
      {props.user && <AddGroups />}
    </Router>
  );
};

// Add state from store to App props
export default connect(state => ({
  user: state.user.data
}))(App);
