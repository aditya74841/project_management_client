"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

// Import all your slices
import authReducer from "../redux/slices/authSlice";
import companyReducer from "../redux/slices/companySlice";
import userReducer from "../redux/slices/userClientSlice";
import projectReducer from "../redux/slices/projectSlice"
// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  company: companyReducer,
  userClient:userReducer,
  project: projectReducer,  




});

// Persist config (only auth by default, you can extend later)
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // persist only auth slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor for <PersistGate>
export const persistor = persistStore(store);
