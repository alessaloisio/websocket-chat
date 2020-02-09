import axios from "axios";

import { fetchUserComplete } from "../redux/actions/user";
import { socketConnectComplete } from "../redux/actions/socket";

export default props => {
  const { dispatch, user } = props;

  // Page reload auto connect the user
  const access_token = window.getCookie("access_token");
  if (access_token && !user) {
    dispatch(fetchUserComplete());
    throw "connect user !";
  }

  // User connected
  if (user) {
    // Automatically add Authorization to Axios Request
    axios.interceptors.request.use(config => {
      config.headers.Authorization = access_token;
      return config;
    });

    // Create the connection to the socket.io
    dispatch(socketConnectComplete());
  }
};
