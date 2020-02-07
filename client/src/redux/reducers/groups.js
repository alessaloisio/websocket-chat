import {
  CREATE_GROUP_BEGIN,
  CREATE_GROUP_FAILURE,
  CREATE_GROUP_SUCCESS
} from "../actions/groups";

const initialState = {
  data: null,
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_GROUP_BEGIN: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }

    case CREATE_GROUP_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    }

    case CREATE_GROUP_FAILURE: {
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
