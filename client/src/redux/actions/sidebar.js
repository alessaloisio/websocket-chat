import axios from "axios";

/**
 * ACTION TYPES
 */
export const FETCH_LIST_BEGIN = "FETCH_LIST_BEGIN";
export const FETCH_LIST_SUCCESS = "FETCH_LIST_SUCCESS";
export const FETCH_LIST_FAILURE = "FETCH_LIST_FAILURE";

export const ADD_ELEMENT_LIST = "ADD_ELEMENT_LIST";
export const SWITCH_ELEMENT_LIST = "SWITCH_ELEMENT_LIST";

/**
 * ACTION CREATOR
 */
export const fetchListBegin = () => ({
  type: FETCH_LIST_BEGIN
});

export const fetchListSuccess = list => ({
  type: FETCH_LIST_SUCCESS,
  payload: list
});

export const fetchListFailure = error => ({
  type: FETCH_LIST_FAILURE,
  payload: error
});

export const addElementList = data => ({
  type: ADD_ELEMENT_LIST,
  payload: data
});

export const switchElementList = data => ({
  type: SWITCH_ELEMENT_LIST,
  payload: data
});

/**
 * ACTION
 */
export function fetchListComplete() {
  return async dispatch => {
    dispatch(fetchListBegin());

    axios
      .get("/rooms/")
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchListSuccess(response.data));
        } else {
          throw new Error("Error with the response");
        }
      })
      .catch(error => {
        dispatch(fetchListFailure(error));
      });
  };
}
