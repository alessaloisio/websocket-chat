import {
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  USER_LOGOUT
} from "../actions/user";

const initialState = {
  user: null,
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_BEGIN: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }

    case FETCH_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    }

    case FETCH_USER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null
      };
    }

    case USER_LOGOUT: {
      return {
        ...state,
        user: null
      };
    }

    default:
      return state;
  }
}
