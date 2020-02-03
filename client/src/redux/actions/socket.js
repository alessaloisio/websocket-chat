import io from "socket.io-client";

/**
 * ACTION TYPES
 */
export const SOCKET_CONNECT = "SOCKET_CONNECT";
export const SOCKET_DISCONNECT = "SOCKET_DISCONNECT";

/**
 * ACTION CREATOR
 */
export const socketConnect = socket => ({
  type: SOCKET_CONNECT,
  payload: socket
});

export const socketDisconnect = () => ({
  type: SOCKET_DISCONNECT
});

/**
 * ACTION
 */
export function socketConnectComplete() {
  return dispatch => {
    const socket = io("http://127.0.0.1:3000", {
      query: { token: window.getCookie("access_token") }
    });

    socket.on("connect", () => {
      if (socket.connected) {
        dispatch(socketConnect(socket));
      }
    });

    socket.open();
  };
}
