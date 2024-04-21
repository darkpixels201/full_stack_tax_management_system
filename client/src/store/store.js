import React from "react";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./combineReducers";
import { persistStore, persistReducer } from "redux-persist";
import Storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

// Set up the initial state
const initialState = {};

// Configure Redux persist
const persistConfig = {
  key: "root",
  storage: Storage,
  stateReconciler: autoMergeLevel2,
  blacklist: [],
};

// Create the Redux store with middleware
const middleware = compose(applyMiddleware(thunk));
const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(pReducer, initialState, middleware);
const persistor = persistStore(store);

export { store, persistor }