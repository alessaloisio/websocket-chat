import axios from "axios";

/**
 * ACTION TYPES
 */
export const CREATE_GROUP_BEGIN = "CREATE_GROUP_BEGIN";
export const CREATE_GROUP_SUCCESS = "CREATE_GROUP_SUCCESS";
export const CREATE_GROUP_FAILURE = "CREATE_GROUP_FAILURE";

/**
 * ACTION CREATOR
 */
export const createGroupBegin = () => ({
  type: CREATE_GROUP_BEGIN
});

export const createGroupSuccess = data => ({
  type: CREATE_GROUP_SUCCESS,
  payload: data
});

export const createGroupFailure = error => ({
  type: CREATE_GROUP_FAILURE,
  payload: error
});

/**
 * ACTION
 */
export function createGroupComplete(data) {
  return dispatch => {
    dispatch(createGroupBegin());

    axios
      .post(`/rooms/groups/`, data)
      .then(res => {
        if (res.status !== 200) throw new Error(res.statusText);
        dispatch(createGroupSuccess(res.data));
      })
      .catch(error => {
        dispatch(createGroupFailure(error.message));
      });
  };
}
