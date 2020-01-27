import React from "react";

import { Redirect } from "react-router-dom";

import getQueries from "../../helpers/getQueries";

import "./Login.scss";

const Login = props => {
  const queries = getQueries(window.location.search);

  if (queries.access_token) {
    localStorage.setItem("access_token", queries.access_token);
    return <Redirect to="/" />;
  }

  return (
    <div className="Login">
      <h1>Login</h1>
      <a href="https://github.com/login/oauth/authorize?client_id=3ab9455d01b047c53a43">
        Login with Github
      </a>
    </div>
  );
};

export default Login;
