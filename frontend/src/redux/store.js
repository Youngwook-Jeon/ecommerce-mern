import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const counterReducer = (state = { value: 0 }, action) => {
  return state;
};

const store = createStore(counterReducer, composeWithDevTools());

export default store;
