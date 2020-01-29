import { ADD_MESSAGE } from "../actions/message";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE: {
    }

    default:
      return state;
  }
}
