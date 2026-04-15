import { create } from "zustand";
import { toast } from "sonner";
import api from "@/services/api";

/**
 * Feature Store (Zen Prism Edition)
 * Manages complex feature lifecycles, Kanban states, and engagement metrics.
 * Now fully synchronized with all backend technical registries.
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

  // ─── Async Actions: Core CRUD ───

  /** Fetch all features for a project */
  fetchFeatures: async (projectId) => {
    if (!projectId) return;
    set({ loading: true, error: null });
    try {
      const res = await api.get(`/projects/${projectId}/features`);
      set({ features: res.data.features || [], loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(err.message || "Failed to fetch features");
    }
  },

  /** Fetch single feature by ID */
  fetchFeatureById: async (featureId) => {
    if (!featureId) return null;
    set({ loading: true, error: null });
    try {
      const res = await api.get(`/features/${featureId}`);
      const feature = res.data.feature;
      if (feature) {
        set((s) => ({
          features: s.features.some(f => f._id === featureId)
            ? s.features.map(f => f._id === featureId ? feature : f)
            : [...s.features, feature],
          loading: false
        }));
      }

      return feature;
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(err.message || "Failed to fetch feature details");
      return null;
    }
  },

  /** Create new feature */
  createFeature: async (payload) => {
    set({ loading: true });
    try {
      const res = await api.post("/features", payload);
      const newFeature = res.data.feature;
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

  /** Update feature details (General) */
  updateFeature: async (featureId, payload) => {
    set({ loading: true });
    try {
      const res = await api.patch(`/features/${featureId}`, payload);
      const updated = res.data.feature;
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

  // ─── Async Actions: Specific technical updates ───

  updatePriority: async (featureId, priority) => {
    try {
      const res = await api.patch(`/features/${featureId}/change-priority`, { priority });
      const updated = res.data.feature;
      set((s) => ({
        features: s.features.map(f => f._id === featureId ? updated : f)
      }));
      toast.success(`Priority elevated to ${priority}`);
    } catch (err) {
      toast.error(err.message || "Priority shift failed");
    }
  },

  updateStatus: async (featureId, status) => {
    const previousFeatures = get().features;
    set((s) => ({
      features: s.features.map(f => f._id === featureId ? { ...f, status } : f)
    }));
    try {
      const res = await api.patch(`/features/${featureId}/change-status`, { status });
      const updated = res.data.feature;
      set((s) => ({
        features: s.features.map(f => f._id === featureId ? updated : f)
      }));
      toast.success(`Phase shifted to ${status}`);
    } catch (err) {
      set({ features: previousFeatures });
      toast.error(err.message || "Execution phase shift failed");
    }
  },

  updateDeadline: async (featureId, deadline) => {
    try {
      const res = await api.patch(`/features/${featureId}/change-deadline`, { deadline });
      const updated = res.data.feature;
      set((s) => ({
        features: s.features.map(f => f._id === featureId ? updated : f)
      }));
      toast.success("Registry timeline synchronized");
    } catch (err) {
      toast.error(err.message || "Timeline synchronization failed");
    }
  },

  // ─── Async Actions: User Assignment ───

  assignUsers: async (featureId, userIds) => {
    try {
      const res = await api.post(`/features/${featureId}/assign-users`, { userIds });
      const { assignedTo } = res.data;
      set((s) => ({
        features: s.features.map(f => f._id === featureId ? { ...f, assignedTo } : f)
      }));
      toast.success("Engineers deployed to node");
    } catch (err) {
      toast.error(err.message || "Deployment failed");
    }
  },

  removeUser: async (featureId, userId) => {
    try {
      const res = await api.post(`/features/${featureId}/remove-user`, { userId });
      const { assignedTo } = res.data;
      set((s) => ({
        features: s.features.map(f => f._id === featureId ? { ...f, assignedTo } : f)
      }));
      toast.success("Engineer extracted from node");
    } catch (err) {
      toast.error(err.message || "Extraction failed");
    }
  },

  // ─── Async Actions: Questions (Sub-tasks) ───

  addQuestion: async (featureId, payload) => {
    try {
      const res = await api.post(`/features/${featureId}/questions`, payload);
      const { questions } = res.data;
      set((s) => ({
        features: s.features.map(f => f._id === featureId ? { ...f, questions } : f)
      }));
      return true;
    } catch (err) {
      toast.error(err.message || "Registry entry failed");
      return false;
    }
  },

  updateQuestion: async (featureId, questionId, payload) => {
    try {
      const res = await api.patch(`/features/${featureId}/questions/${questionId}`, payload);
      const { questions } = res.data;
      set((s) => ({
        features: s.features.map(f => f._id === featureId ? { ...f, questions } : f)
      }));
    } catch (err) {
      toast.error(err.message || "Registry update failed");
    }
  },

  deleteQuestion: async (featureId, questionId) => {
    try {
      const res = await api.delete(`/features/${featureId}/questions/${questionId}`);
      const { questions } = res.data;
      set((s) => ({
        features: s.features.map(f => f._id === featureId ? { ...f, questions } : f)
      }));
    } catch (err) {
      toast.error(err.message || "Node extraction failed");
    }
  },

  toggleQuestion: async (featureId, questionId) => {
    try {
      const res = await api.patch(`/features/${featureId}/questions/${questionId}/toggle-completion`);
      const { questions } = res.data;
      set((s) => ({
        features: s.features.map(f => f._id === featureId ? { ...f, questions } : f)
      }));
    } catch (err) {
      toast.error(err.message || "Telemetry toggle failed");
    }
  },

  // ─── Async Actions: Tags ───

  addTag: async (featureId, tag) => {
    try {
      const res = await api.post(`/features/${featureId}/add-tags`, { tag });
      const { tags } = res.data;
      set((s) => ({
        features: s.features.map(f => f._id === featureId ? { ...f, tags } : f)
      }));
    } catch (err) {
      toast.error(err.message || "Classification failed");
    }
  },

  removeTag: async (featureId, tag) => {
    try {
      const res = await api.post(`/features/${featureId}/remove-tags`, { tag });
      const { tags } = res.data;
      set((s) => ({
        features: s.features.map(f => f._id === featureId ? { ...f, tags } : f)
      }));
    } catch (err) {
      toast.error(err.message || "Declassification failed");
    }
  },

  // ─── Async Actions: Workflow ───

  addWorkflow: async (featureId, payload) => {
    try {
      const res = await api.post(`/features/${featureId}/workflow`, payload);
      const { workflow } = res.data;
      set((s) => ({
        features: s.features.map(f => f._id === featureId ? { ...f, workflow } : f)
      }));
    } catch (err) {
      toast.error(err.message || "Workflow injection failed");
    }
  },

  updateWorkflow: async (featureId, workflowId, payload) => {
    try {
      const res = await api.patch(`/features/${featureId}/workflow/${workflowId}`, payload);
      const { workflow } = res.data;
      set((s) => ({
        features: s.features.map(f => f._id === featureId ? { ...f, workflow } : f)
      }));
    } catch (err) {
      toast.error(err.message || "Workflow sequence update failed");
    }
  },

  deleteWorkflow: async (featureId, workflowId) => {
    try {
      const res = await api.delete(`/features/${featureId}/workflow/${workflowId}`);
      const { workflow } = res.data;
      set((s) => ({
        features: s.features.map(f => f._id === featureId ? { ...f, workflow } : f)
      }));
    } catch (err) {
      toast.error(err.message || "Workflow node extraction failed");
    }
  },

  // ─── Async Actions: Benefits ───

  addBenefit: async (featureId, payload) => {
    try {
      const res = await api.post(`/features/${featureId}/benefits`, payload);
      const { benefits } = res.data;
      set((s) => ({
        features: s.features.map(f => f._id === featureId ? { ...f, benefits } : f)
      }));
    } catch (err) {
      toast.error(err.message || "Value injection failed");
    }
  },

  updateBenefit: async (featureId, benefitId, payload) => {
    try {
      const res = await api.patch(`/features/${featureId}/benefits/${benefitId}`, payload);
      const { benefits } = res.data;
      set((s) => ({
        features: s.features.map(f => f._id === featureId ? { ...f, benefits } : f)
      }));
    } catch (err) {
      toast.error(err.message || "Value calibration failed");
    }
  },

  deleteBenefit: async (featureId, benefitId) => {
    try {
      const res = await api.delete(`/features/${featureId}/benefits/${benefitId}`);
      const { benefits } = res.data;
      set((s) => ({
        features: s.features.map(f => f._id === featureId ? { ...f, benefits } : f)
      }));
    } catch (err) {
      toast.error(err.message || "Value extraction failed");
    }
  },

  // ─── Async Actions: Collaboration ───

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
      toast.error(err.message || "Forum entry failed");
      return false;
    }
  },

  // Legacy/Helper
  toggleSubQuestion: (featureId, questionId) => get().toggleQuestion(featureId, questionId),
}));
