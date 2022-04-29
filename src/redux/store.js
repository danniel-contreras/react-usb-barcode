import { compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/auth.reducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const preloadedState = window.__PRELOADED_STATE__;
export const store = configureStore(
  {
    reducer: {
      auth:authReducer,
    },
    preloadedState,
  },
  applyMiddleware(thunk)
);
