"use client"

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { store, persistor } from "../redux/store";
import ErrorBoundary from "@/components/ErrorBoundary";
import { GlobalLoader } from "@/components/ui-core/GlobalLoader";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

import { IframeAuthProvider } from "@/components/IframeAuthProvider";
import { useUiStore } from "@/store/uiStore";

export function Providers({ children }) {
  const theme = useUiStore((state) => state.theme);
  
  // Resolve 'system' to actual 'light' or 'dark' for components that don't support it natively
  const [resolvedTheme, setResolvedTheme] = useEffectState(() => {
    if (typeof window === "undefined") return "light";
    if (theme !== "system") return theme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <ErrorBoundary>
          <ThemeInitializer onThemeResolve={setResolvedTheme}>
            <AuthInitializer>
              <IframeAuthProvider>
                {children}
              </IframeAuthProvider>
            </AuthInitializer>
          </ThemeInitializer>
          <GlobalLoader />
          {/* Global Toast Provider */}
          <Toaster 
            position="top-right" 
            richColors 
            closeButton 
            theme={resolvedTheme} 
          />
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
}

// Custom hook to handle client-side theme state without hydration mismatch
function useEffectState(initializer) {
  const [state, setState] = React.useState(initializer);
  return [state, setState];
}

import React from "react";

function AuthInitializer({ children }) {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    // Attempt to recover session on mount
    initialize();
  }, [initialize]);

  return <>{children}</>;
}

function ThemeInitializer({ children, onThemeResolve }) {
  const theme = useUiStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    
    const applyTheme = (actualTheme) => {
      root.classList.remove("light", "dark");
      root.classList.add(actualTheme);
      root.setAttribute("data-theme", actualTheme);
      onThemeResolve(actualTheme);
    };

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme(mediaQuery.matches ? "dark" : "light");
      
      handleChange(); // Initial apply
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      applyTheme(theme);
    }
  }, [theme, onThemeResolve]);

  return <>{children}</>;
}
