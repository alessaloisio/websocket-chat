import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const isLogin = user => {
  if (user) return true;
  return false;
};

const Private = ({ ...props }) => {
  return (
    <Route path={props.path}>
      {isLogin(props.user) ? props.children : <Redirect to="/login" />}
    </Route>
  );
};

const Public = ({ restricted = true, ...props }) => {
  return (
    <Route path={props.path}>
      {isLogin(props.user) && restricted ? <Redirect to="/" /> : props.children}
    </Route>
  );
};

/***
 * Connect routes to the Redux Store
 */
export const PrivateRoute = connect(state => ({
  user: state.user.data
}))(Private);

export const PublicRoute = connect(state => ({
  user: state.user.data
}))(Public);
