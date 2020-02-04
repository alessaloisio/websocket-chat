import {
  SEND_MESSAGE_BEGIN,
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_SUCCESS
} from "../actions/message";

const initialState = {
  data: null,
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE_BEGIN: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }

    case SEND_MESSAGE_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    }

    case SEND_MESSAGE_FAILURE: {
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
