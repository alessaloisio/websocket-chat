import "obj-tweaks";

import {
  FETCH_LIST_BEGIN,
  FETCH_LIST_FAILURE,
  FETCH_LIST_SUCCESS,
  ADD_ELEMENT_LIST,
  SWITCH_ELEMENT_LIST,
  UPDATE_ELEMENT_LIST
} from "../actions/sidebar";

const initialState = {
  data: null,
  loading: false,
  error: null
};

export default function (state = initialState, action) {
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

    case ADD_ELEMENT_LIST: {
      const { name, data } = action.payload;

      return state
        .new()
        .add(name, {
          [data._id]: data
        });
    }

    case SWITCH_ELEMENT_LIST: {
      const { room, dest } = action.payload;

      return state
        .new()
        .swap({ _id: room }, dest);
    }

    case UPDATE_ELEMENT_LIST: {
      const { room, data } = action.payload;

      return state
        .new()
        .update({ _id: `${room}` }, data);
    }

    default:
      return state;
  }
}
