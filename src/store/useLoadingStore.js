import { create } from "zustand";

/**
 * Global Loading Store
 * Tracks the number of active network requests to manage a global pulse/loading bar.
 */
export const useLoadingStore = create((set) => ({
  requestCount: 0,
  isLoading: false,

  startRequest: () => 
    set((state) => ({ 
      requestCount: state.requestCount + 1,
      isLoading: true 
    })),

  stopRequest: () =>
    set((state) => {
      const newCount = Math.max(0, state.requestCount - 1);
      return { 
        requestCount: newCount,
        isLoading: newCount > 0 
      };
    }),
    
  resetLoading: () => set({ requestCount: 0, isLoading: false })
}));
