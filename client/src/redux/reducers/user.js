import { GET_USER, RESET_USER } from "../actionTypes";

const initialState = {
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER: {
      return {
        ...state,
        user: action.payload
      };
    }

    case RESET_USER: {
      return {
        ...state,
        user: null
      };
    }

    default:
      return state;
  }
}
