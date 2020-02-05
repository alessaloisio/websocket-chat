import axios from "axios";

/**
 * ACTION TYPES
 */
export const FETCH_LIST_BEGIN = "FETCH_LIST_BEGIN";
export const FETCH_LIST_SUCCESS = "FETCH_LIST_SUCCESS";
export const FETCH_LIST_FAILURE = "FETCH_LIST_FAILURE";

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

/**
 * ACTION
 */
export function fetchListComplete() {
  return async dispatch => {
    dispatch(fetchListBegin());

    axios.get("/rooms/").then(data => {
      console.log(data);
    });
  };
}
