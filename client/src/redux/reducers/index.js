import { combineReducers } from "redux";

import user from "./user";
import socket from "./socket";
import room from "./room";
import message from "./message.js";

export default combineReducers({ user, socket, room, message });
