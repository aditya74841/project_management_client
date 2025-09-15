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
import storeReducer from "../app/dashboard/stores/store";
import staffReducer from "../app/dashboard/staff/store";
import auditReducer from "../app/dashboard/audits/store";
import responseReducer from "../app/dashboard/responses/store";

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  company: companyReducer,
  store: storeReducer,
  staff: staffReducer,
  audit: auditReducer,
  response: responseReducer,
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
