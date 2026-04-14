import { create } from "zustand";
import { toast } from "sonner";
import api from "@/services/api";

/**
 * Diary Store (Zen Prism Edition)
 * Manages project diary entries, states, and lifecycle actions.
 * Centralizes entry management and keeps UI state synchronized.
 */
export const useDiaryStore = create((set, get) => ({
  // ─── State ───
  diaries: [],
  loading: false,
  error: null,
  message: null,

  // Selected state
  currentDiary: null,
  isSheetOpen: false,
  editingDiary: null,

  // ─── UI Actions ───
  openCreateSheet: () => set({ 
    isSheetOpen: true, 
    editingDiary: null 
  }),
  
  openEditSheet: (diary) => set({ 
    isSheetOpen: true, 
    editingDiary: diary 
  }),
  
  closeSheet: () => set({ 
    isSheetOpen: false, 
    editingDiary: null 
  }),

  // ─── Async Actions ───
  
  /** Fetch all diaries for a specific project */
  fetchDiaries: async (projectId) => {
    if (!projectId) return;
    set({ loading: true, error: null });
    try {
      const res = await api.get(`/projects/${projectId}/diaries`);
      // Standardized API layer normalizes the response
      set({ diaries: res.data || [], loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(err.message || "Failed to fetch diary entries");
    }
  },

  /** Create a new diary entry */
  createDiary: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/project-diaries", payload);
      const newEntry = res.data;
      set((s) => ({
        diaries: newEntry ? [newEntry, ...s.diaries] : s.diaries,
        loading: false,
      }));
      toast.success(res.message || "Entry added to your diary");
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(err.message || "Failed to create diary entry");
      return false;
    }
  },

  /** Update an existing entry */
  updateDiary: async (diaryId, payload) => {
    set({ loading: true, error: null });
    try {
      const res = await api.patch(`/project-diaries/${diaryId}`, payload);
      const updatedEntry = res.data;
      set((s) => ({
        diaries: s.diaries.map((d) => (d._id === diaryId ? updatedEntry : d)),
        loading: false,
      }));
      toast.success(res.message || "Entry updated successfully");
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(err.message || "Failed to update entry");
      return false;
    }
  },

  /** Delete an entry */
  deleteDiary: async (diaryId) => {
    set({ loading: true, error: null });
    try {
      const res = await api.delete(`/project-diaries/${diaryId}`);
      set((s) => ({
        diaries: s.diaries.filter((d) => d._id !== diaryId),
        loading: false,
      }));
      toast.success(res.message || "Entry removed from registry");
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(err.message || "Failed to delete entry");
      return false;
    }
  },

  /** Clear Feedback Messages */
  clearMessages: () => set({ message: null, error: null }),
}));
