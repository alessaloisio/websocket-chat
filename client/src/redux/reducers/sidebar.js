import {
  FETCH_LIST_BEGIN,
  FETCH_LIST_FAILURE,
  FETCH_LIST_SUCCESS
} from "../actions/sidebar";

const initialState = {
  data: null,
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_LIST_BEGIN: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }

    case FETCH_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    }

    case FETCH_LIST_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: null
      };
    }

    default:
      return state;
  }
}
