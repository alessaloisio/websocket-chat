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
    dispatch(socketConnect(io()));
  };
}
