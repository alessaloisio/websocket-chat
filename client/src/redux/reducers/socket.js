import { SOCKET_CONNECT, SOCKET_DISCONNECT } from "../actions/socket";

const initialState = null;

export default function(socket = initialState, action) {
  switch (action.type) {
    case SOCKET_CONNECT: {
      return action.payload;
    }
    case SOCKET_DISCONNECT: {
      socket.disconnect();
      return null;
    }
    default:
      return socket;
  }
}
