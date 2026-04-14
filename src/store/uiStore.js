import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Global UI Store
 * Manages the state of sheets, modals, and global UI elements.
 * Features theme persistence and decoupled trigger logic.
 */
export const useUiStore = create(
  persist(
    (set) => ({
      // ─── Theme Management ───
      theme: "system",
      toggleTheme: () => set((state) => {
        const cycle = { light: "dark", dark: "system", system: "light" };
        return { theme: cycle[state.theme] };
      }),
      setTheme: (theme) => set({ theme }),

      // ─── Auth Sheets ───
      loginSheetOpen: false,
      registerSheetOpen: false,
      forgotPasswordSheetOpen: false,
      
      // ─── Actions ───
      openLogin: () => set({ 
        loginSheetOpen: true, 
        registerSheetOpen: false, 
        forgotPasswordSheetOpen: false 
      }),
      
      openRegister: () => set({ 
        registerSheetOpen: true, 
        loginSheetOpen: false, 
        forgotPasswordSheetOpen: false 
      }),
      
      openForgotPassword: () => set({ 
        forgotPasswordSheetOpen: true, 
        loginSheetOpen: false, 
        registerSheetOpen: false 
      }),
      
      closeAllAuthSheets: () => set({ 
        loginSheetOpen: false, 
        registerSheetOpen: false, 
        forgotPasswordSheetOpen: false 
      }),

      // Toggle helpers
      setLoginSheetOpen: (open) => set({ loginSheetOpen: open }),
      setRegisterSheetOpen: (open) => set({ registerSheetOpen: open }),
      setForgotPasswordSheetOpen: (open) => set({ forgotPasswordSheetOpen: open }),

      // ─── Mobile UI ───
      mobileMenuOpen: false,
      toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
      closeMobileMenu: () => set({ mobileMenuOpen: false }),
    }),
    {
      name: "ui-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
