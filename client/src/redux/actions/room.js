import axios from "axios";
import { addElementList } from "./sidebar";

/**
 * ACTION TYPES
 */
export const SELECT_ROOM_BEGIN = "SELECT_ROOM_BEGIN";
export const SELECT_ROOM_SUCCESS = "SELECT_ROOM_SUCCESS";
export const SELECT_ROOM_FAILURE = "SELECT_ROOM_FAILURE";

export const ADD_MESSAGE = "ADD_MESSAGE";
export const ADD_FAVOURITE = "ADD_FAVOURITE";
export const DELETE_FAVOURITE = "DELETE_FAVOURITE";

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

export const addFavourite = room => ({
  type: ADD_FAVOURITE,
  payload: room
});

export const deleteFavourite = room => ({
  type: DELETE_FAVOURITE,
  payload: room
});

/**
 * ACTION
 */
export function searchSelectRoom(id) {
  return async dispatch => {
    dispatch(selectRoomBegin());

    axios
      .get(`/rooms/search/${id}`)
      .then(res => {
        if (res.status !== 200) throw new Error(res.statusText);
        const room = res.data.data;
        dispatch(
          addElementList({
            name: room.group ? "groups" : "peoples",
            data: room
          })
        );
        dispatch(selectRoomSuccess(room));
      })
      .catch(error => {
        dispatch(selectRoomFailure(error.message));
      });
  };
}

export function sidebarSelectRoom(id) {
  return async dispatch => {
    dispatch(selectRoomBegin());

    axios
      .get(`/rooms/${id}`)
      .then(res => {
        if (res.status !== 200) throw new Error(res.statusText);
        dispatch(selectRoomSuccess(res.data));
      })
      .catch(error => {
        dispatch(selectRoomFailure(error.message));
      });
  };
}
