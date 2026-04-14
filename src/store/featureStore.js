import { create } from "zustand";
import { toast } from "sonner";
import api from "@/services/api";

/**
 * Feature Store (Zen Prism Edition)
 * Manages complex feature lifecycles, Kanban states, and engagement metrics.
 */
export const useFeatureStore = create((set, get) => ({
  // ─── State ───
  features: [],
  loading: false,
  error: null,
  
  // View State
  viewType: "kanban", // or 'list'
  isSheetOpen: false,
  editingFeature: null,

  // ─── UI Actions ───
  setViewType: (viewType) => set({ viewType }),
  
  openCreateSheet: () => set({ 
    isSheetOpen: true, 
    editingFeature: null 
  }),
  
  openEditSheet: (feature) => set({ 
    isSheetOpen: true, 
    editingFeature: feature 
  }),
  
  closeSheet: () => set({ 
    isSheetOpen: false, 
    editingFeature: null 
  }),

  // ─── Async Actions ───

  /** Fetch all features for a project */
  fetchFeatures: async (projectId) => {
    if (!projectId) return;
    set({ loading: true, error: null });
    try {
      const res = await api.get(`/projects/${projectId}/features`);
      set({ features: res.data || [], loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(err.message || "Failed to fetch features");
    }
  },

  /** Create new feature */
  createFeature: async (payload) => {
    set({ loading: true });
    try {
      const res = await api.post("/features", payload);
      const newFeature = res.data;
      set((s) => ({
        features: newFeature ? [newFeature, ...s.features] : s.features,
        loading: false,
      }));
      toast.success(res.message || "Feature initialized in registry");
      return true;
    } catch (err) {
      set({ loading: false });
      toast.error(err.message || "Failed to create feature");
      return false;
    }
  },

  /** Update feature details */
  updateFeature: async (featureId, payload) => {
    set({ loading: true });
    try {
      const res = await api.patch(`/features/${featureId}`, payload);
      const updated = res.data;
      set((s) => ({
        features: s.features.map((f) => (f._id === featureId ? updated : f)),
        loading: false,
      }));
      toast.success(res.message || "Registry updated successfully");
      return true;
    } catch (err) {
      set({ loading: false });
      toast.error(err.message || "Failed to update feature");
      return false;
    }
  },

  /** Update status (Kanban optimization) */
  updateFeatureStatus: async (featureId, status) => {
    // Optimistic update
    const previousFeatures = get().features;
    set((s) => ({
      features: s.features.map((f) => (f._id === featureId ? { ...f, status } : f)),
    }));

    try {
      const res = await api.patch(`/features/${featureId}/status`, { status });
      toast.success(`Feature moved to ${status}`);
    } catch (err) {
      set({ features: previousFeatures });
      toast.error(err.message || "Failed to update phase");
    }
  },

  /** Delete feature */
  deleteFeature: async (featureId) => {
    set({ loading: true });
    try {
      await api.delete(`/features/${featureId}`);
      set((s) => ({
        features: s.features.filter((f) => f._id !== featureId),
        loading: false,
      }));
      toast.success("Feature decommissioned");
      return true;
    } catch (err) {
      set({ loading: false });
      toast.error(err.message || "Failed to delete feature");
      return false;
    }
  },

  /** Collaboration: Add Comment */
  addComment: async (featureId, text) => {
    try {
      const res = await api.post(`/features/${featureId}/comments`, { text });
      const newComment = res.data;
      set((s) => ({
        features: s.features.map((f) => 
          f._id === featureId ? { ...f, comments: [...(f.comments || []), newComment] } : f
        ),
      }));
      return true;
    } catch (err) {
      toast.error(err.message || "Failed to post comment");
      return false;
    }
  },

  /** Sub-Tasks: Toggle Question/Checklist */
  toggleSubQuestion: async (featureId, questionId) => {
    try {
      const res = await api.patch(`/features/${featureId}/questions/${questionId}/toggle`);
      const updatedFeature = res.data;
      set((s) => ({
        features: s.features.map((f) => (f._id === featureId ? updatedFeature : f)),
      }));
    } catch (err) {
      toast.error(err.message || "Failed to update checklist");
    }
  },
}));
