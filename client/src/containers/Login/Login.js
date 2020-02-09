import React from "react";
import { Redirect } from "react-router-dom";

import { useDispatch } from "react-redux";
import { fetchUserComplete } from "../../redux/actions/user";

import getQueries from "../../helpers/getQueries";

import imageLogin from "../../assets/images/login.svg";
import "./Login.scss";

const Login = () => {
  const dispatch = useDispatch();

  const queries = getQueries(window.location.search);
  if (queries.access_token) {
    const expires = new Date();
    document.cookie = `access_token=${
      queries.access_token
    }; expires=${expires.setDate(expires.getDate() + 730)}; path=/`;

    // store user to state
    dispatch(fetchUserComplete());

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

export default Login;
