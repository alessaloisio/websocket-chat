import { combineReducers } from "redux";

import user from "./user";
import socket from "./socket";
import room from "./room";

export default combineReducers({ user, socket, room });
