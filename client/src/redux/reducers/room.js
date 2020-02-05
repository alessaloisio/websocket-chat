import {
  SELECT_ROOM_BEGIN,
  SELECT_ROOM_FAILURE,
  SELECT_ROOM_SUCCESS,
  ADD_MESSAGE,
  ADD_FAVOURITE,
  DELETE_FAVOURITE
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

    case ADD_MESSAGE: {
      return {
        ...state,
        data: {
          ...state.data,
          messages: [...state.data.messages, action.payload]
        }
      };
    }

    case ADD_FAVOURITE: {
      return {
        ...state,
        data: {
          ...state.data,
          favourite: true
        }
      };
    }

    case DELETE_FAVOURITE: {
      return {
        ...state,
        data: {
          ...state.data,
          favourite: false
        }
      };
    }

    default:
      return state;
  }
}
