// import { configureStore } from "@reduxjs/toolkit";
// import companyReducer from "./dashboard/company/store";
// import authReducer from "../components/HomePage/store";
// import storeReducer from "../../src/app/dashboard/stores/store";
// import staffReducer from "../../src/app/dashboard/staff/store";
// import auditReducer from "../../src/app/dashboard/audits/store";
// import responseReducer from "../../src/app/dashboard/responses/store";
// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     company: companyReducer,
//     store: storeReducer,
//     staff: staffReducer,
//     audit: auditReducer,
//     response: responseReducer,
//   },
// });

// export default store;



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
import authReducer from "../components/HomePage/store";
import companyReducer from "./dashboard/company/store";
import storeReducer from "./dashboard/stores/store";
import staffReducer from "./dashboard/staff/store";
import auditReducer from "./dashboard/audits/store";
import responseReducer from "./dashboard/responses/store";

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
