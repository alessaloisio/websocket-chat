import { combineReducers } from "redux";

import user from "./user";
import socket from "./socket";
import room from "./room";
import message from "./message.js";
import sidebar from "./sidebar";
import modal from "./modal";

export default combineReducers({ user, socket, sidebar, room, message, modal });
