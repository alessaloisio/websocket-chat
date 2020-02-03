import {
  SELECT_ROOM_BEGIN,
  SELECT_ROOM_FAILURE,
  SELECT_ROOM_SUCCESS
} from "../actions/room";

const initialState = {
  data: null,
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_ROOM_BEGIN: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }

    case SELECT_ROOM_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    }

    case SELECT_ROOM_FAILURE: {
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
