/**
 * ACTION TYPES
 */
export const FETCH_USER_BEGIN = "FETCH_USER_BEGIN";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const USER_LOGOUT = "USER_LOGOUT";

/**
 * ACTION CREATOR
 */
export const fetchUserBegin = () => ({
  type: FETCH_USER_BEGIN
});

export const fetchUserSuccess = data => ({
  type: FETCH_USER_SUCCESS,
  payload: data
});

export const fetchUserFailure = error => ({
  type: FETCH_USER_FAILURE,
  payload: error
});

export const userLogout = () => ({
  type: USER_LOGOUT
});

/**
 * ACTION
 */
export function fetchUserComplete() {
  return dispatch => {
    const access_token = window.getCookie("access_token");
    if (!access_token) return dispatch(fetchUserFailure("Not connected"));

    dispatch(fetchUserBegin());

    return fetch(`/validate`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${access_token}`
      })
    })
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(json => {
        dispatch(fetchUserSuccess(json.data));
      })
      .catch(error => {
        dispatch(fetchUserFailure(error.message));
      });
  };
}

export function userLogoutComplete() {
  return dispatch => {
    window.deleteCookie("access_token");
    dispatch(userLogout());
  };
}
