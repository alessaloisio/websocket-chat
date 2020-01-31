import { combineReducers } from "redux";

import user from "./user";
import socket from "./socket";
import chat from "./chat";

export default combineReducers({ app: user, socket, chat });
