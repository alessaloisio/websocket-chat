import { GET_USER, ADD_MESSAGE } from "./actionTypes";

export const fetchUserComplete = data => {
  return {
    type: GET_USER,
    payload: data
  };
};
