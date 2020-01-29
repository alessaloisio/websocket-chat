import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

// https://github.com/jhen0409/react-native-debugger/issues/280#issuecomment-432298556
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk];

export default createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(...middlewares))
);
