import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import tokenReducer from "./variables/tokenSlice";

/** The store is used to save the state */
const reducers = combineReducers({
  token: tokenReducer,
});

/** The persist config is used to configure the persist */
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["token"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export default store;