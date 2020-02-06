import { TOGGLE_MODAL } from "../actions/modal";

const initialState = {
  showModal: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MODAL: {
      return {
        ...state,
        showModal: !state.showModal
      };
    }

    default:
      return state;
  }
}
