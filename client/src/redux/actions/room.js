import axios from "axios";

/**
 * ACTION TYPES
 */
export const SELECT_ROOM_BEGIN = "SELECT_ROOM_BEGIN";
export const SELECT_ROOM_SUCCESS = "SELECT_ROOM_SUCCESS";
export const SELECT_ROOM_FAILURE = "SELECT_ROOM_FAILURE";

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

/**
 * ACTION
 */
export function selectRoomComplete(id) {
  return async dispatch => {
    dispatch(selectRoomBegin());

    const str = id.split("-");
    console.log(str);
    const room = await axios.get(`/rooms/${str[0]}/${str[1]}`);
    // console.log(room);
  };
}
