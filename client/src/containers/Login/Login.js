import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import getQueries from "../../helpers/getQueries";
import { fetchUserComplete } from "../../redux/actions/user";

import "./Login.scss";

import imageLogin from "../../assets/images/login.svg";

const Login = props => {
  const queries = getQueries(window.location.search);

  if (queries.access_token) {
    const expires = new Date();
    document.cookie = `access_token=${
      queries.access_token
    }; expires=${expires.setDate(expires.getDate() + 730)}; path=/`;

    // TODO : store user to state
    props.dispatch(fetchUserComplete());

    return <Redirect to="/" />;
  }

  return (
    <div className="Login">
      <img src={imageLogin} alt="Login" />
      <h1>Welcome to Online Chat</h1>
      <a href="https://github.com/login/oauth/authorize?client_id=3ab9455d01b047c53a43">
        Login with Github
      </a>
    </div>
  );
};

export default connect()(Login);
