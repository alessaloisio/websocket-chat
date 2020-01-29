export const FETCH_USER_BEGIN = "FETCH_USER_BEGIN";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

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

export function fetchUserComplete() {
  return dispatch => {
    const access_token = window.getCookie("access_token");
    if (!access_token) return dispatch(fetchUserFailure("Not connected"));

    dispatch(fetchUserBegin());

    return fetch(`/validate?access_token=${access_token}`)
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
