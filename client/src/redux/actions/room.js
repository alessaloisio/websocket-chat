import axios from "axios";

/**
 * ACTION TYPES
 */
export const SELECT_ROOM_BEGIN = "SELECT_ROOM_BEGIN";
export const SELECT_ROOM_SUCCESS = "SELECT_ROOM_SUCCESS";
export const SELECT_ROOM_FAILURE = "SELECT_ROOM_FAILURE";

export const ADD_MESSAGE = "ADD_MESSAGE";

/**
 * ACTION CREATOR
 */
export const selectRoomBegin = () => ({
  type: SELECT_ROOM_BEGIN
});

export const selectRoomSuccess = room => ({
  type: SELECT_ROOM_SUCCESS,
  payload: room
});

export const selectRoomFailure = error => ({
  type: SELECT_ROOM_FAILURE,
  payload: error
});

export const addMessage = message => ({
  type: ADD_MESSAGE,
  payload: message
});

/**
 * ACTION
 */
export function selectRoomComplete(id) {
  return async dispatch => {
    dispatch(selectRoomBegin());

    const str = id.split("-");

    axios
      .get(`/rooms/${str[0]}/${str[1]}`)
      .then(res => {
        if (res.status !== 200) throw new Error(res.statusText);
        dispatch(selectRoomSuccess(res.data.data));
      })
      .catch(error => {
        dispatch(selectRoomFailure(error.message));
      });
  };
}
