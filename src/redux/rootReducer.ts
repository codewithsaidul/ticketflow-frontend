import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export { rootReducer };