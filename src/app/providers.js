"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import { store, persistor } from "../redux/store";
import { AuthErrorHandler } from "@/components/AuthErrorBoundary";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <AuthErrorHandler>
        {children}
        </AuthErrorHandler>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { fontSize: "14px" },
            success: { style: { background: "#dcfce7", color: "#166534" } },
            error: { style: { background: "#fee2e2", color: "#991b1b" } },
          }}
        />
      </PersistGate>
    </Provider>
  );
}
