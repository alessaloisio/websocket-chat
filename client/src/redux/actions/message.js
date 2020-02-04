import axios from "axios";

/**
 * ACTION TYPES
 */
export const SEND_MESSAGE_BEGIN = "SEND_MESSAGE_BEGIN";
export const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
export const SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE";

/**
 * ACTION CREATOR
 */
export const sendMessageBegin = () => ({
  type: SEND_MESSAGE_BEGIN
});

export const sendMessageSuccess = message => ({
  type: SEND_MESSAGE_SUCCESS,
  payload: message
});

export const sendMessageFailure = error => ({
  type: SEND_MESSAGE_FAILURE,
  payload: error
});

/**
 * ACTION
 */
export function sendMessageComplete(message) {
  return async dispatch => {
    dispatch(sendMessageBegin());

    console.log(message);

    console.log(await axios.post(`/messages`, message));
  };
}
