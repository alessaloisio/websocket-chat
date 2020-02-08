import {
  FETCH_LIST_BEGIN,
  FETCH_LIST_FAILURE,
  FETCH_LIST_SUCCESS,
  ADD_ELEMENT_LIST,
  SWITCH_ELEMENT_LIST
} from "../actions/sidebar";

const initialState = {
  data: null,
  loading: false,
  error: null
};

const findAndRemove = (obj, id) => {
  let element;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object") {
        obj[key] = obj[key].filter(room => {
          if (room._id === id) element = room;
          return room._id !== id;
        });
      }
    }
  }
  return [obj, element];
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
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.name]: [
            ...state.data[action.payload.name],
            action.payload.data
          ]
        }
      };
    }

    case SWITCH_ELEMENT_LIST: {
      const [data, element] = findAndRemove(
        { ...state.data },
        action.payload.room
      );

      return {
        ...state,
        data: {
          ...data,
          [action.payload.dest]: [...state.data[action.payload.dest], element]
        }
      };
    }

    default:
      return state;
  }
}
