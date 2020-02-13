import "@alessio95/object-update/src";

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

    case ADD_ELEMENT_LIST: {
      const { name, data } = action.payload;
      // console.log(state.add(`${name}.${data._id}`, data));
      if (
        !state.find({
          [`${name}.${data._id}`]: "$exist"
        }).length
      ) {
        return state.add(name, {
          [data._id]: data
        });
      }
    }

    case SWITCH_ELEMENT_LIST: {
      const { room, dest } = action.payload;
      const newState = { ...state.data };

      Object.keys(newState).some(key => {
        if (Object.keys(newState[key]).includes(room)) {
          newState[dest][room] = newState[key][room];
          delete newState[key][room];
          return true;
        }
      });

      return {
        ...state,
        data: newState
      };
    }

    case UPDATE_ELEMENT_LIST: {
      const { room, data } = action.payload;

      return state.update({ _id: `${room}` }, data);
    }

    default:
      return state;
  }
}
