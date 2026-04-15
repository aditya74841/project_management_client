import { create } from "zustand";
import { toast } from "sonner";
import api from "@/services/api";

/**
 * Project Diary Store (Zen Prism Edition)
 * Manages all planning, narrative, and lifecycle aspects of a project.
 * Supports optimistic state management for sub-document CRUD.
 */
export const useDiaryStore = create((set, get) => ({
  // ─── Core State ───
  diaries: [],
  selectedDiary: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    pages: 1
  },

  loading: false,
  isUpdating: false, // For sub-transactions
  error: null,

  // UI States
  isSheetOpen: false,
  editingDiary: null,

  // ─── UI Actions ───
  openCreateSheet: () => set({ isSheetOpen: true, editingDiary: null }),
  openEditSheet: (diary) => set({ isSheetOpen: true, editingDiary: diary }),
  closeSheet: () => set({ isSheetOpen: false, editingDiary: null }),
  setSelectedDiary: (diary) => set({ selectedDiary: diary }),

  // ─── Async Actions: Core CRUD ───

  /** Fetch all diaries (Global Registry / Audit) */
  fetchDiaries: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const queryParams = typeof params === "string" ? { projectId: params } : params;
      const res = await api.get("/project-diaries/getProjectDiary", { params: queryParams });
      set({
        diaries: res.data?.projectDiaries || [],
        pagination: res.data?.pagination || get().pagination,
        loading: false
      });
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(err.message || "Failed to fetch diaries");
    }
  },

  /** Fetch or Initialize Diary by Project ID (Main Entry Point) */
  fetchDiaryByProjectId: async (projectId) => {
    if (!projectId) return;
    set({ loading: true, error: null });
    try {
      const res = await api.get(`/project-diaries/projectDiary/${projectId}`);
      set({ selectedDiary: res.data?.projectDiary || null, loading: false });
      return res.data?.projectDiary;
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(err.message || "Failed to fetch project diary");
    }
  },

  /** Fetch single diary by its own ID */
  fetchDiaryById: async (diaryId) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get(`/project-diaries/${diaryId}`);
      set({ selectedDiary: res.data?.projectDiary || null, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(err.message || "Failed to load diary entry");
    }
  },

  /** Create new diary entry manually */
  createDiary: async (projectId, payload) => {
    set({ loading: true, error: null });
    try {
      console.log("The project Id is", projectId)
      console.log("The payload is", payload)
      const res = await api.post(`/project-diaries/${projectId}`, payload);
      const newEntry = res.data?.projectDiary;
      set((s) => ({
        diaries: newEntry ? [newEntry, ...s.diaries] : s.diaries,
        loading: false,
      }));
      toast.success("Diary entry created");
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(err.message || "Failed to create diary");
      return false;
    }
  },

  /** Update diary metadata (title, description) */
  updateDiary: async (diaryId, payload) => {
    set({ isUpdating: true });
    try {
      const res = await api.patch(`/project-diaries/${diaryId}`, payload);
      const updated = res.data?.projectDiary;
      set((s) => ({
        selectedDiary: s.selectedDiary?._id === diaryId ? updated : s.selectedDiary,
        diaries: s.diaries.map(d => d._id === diaryId ? updated : d),
        isUpdating: false
      }));
      toast.success("Entry details updated");
      return true;
    } catch (err) {
      set({ isUpdating: false });
      toast.error(err.message || "Update failed");
      return false;
    }
  },

  /** Permanent deletion */
  deleteDiary: async (diaryId) => {
    set({ isUpdating: true });
    try {
      await api.delete(`/project-diaries/${diaryId}`);
      set((s) => ({
        diaries: s.diaries.filter(d => d._id !== diaryId),
        selectedDiary: s.selectedDiary?._id === diaryId ? null : s.selectedDiary,
        isUpdating: false
      }));
      toast.success("Diary entry removed");
      return true;
    } catch (err) {
      set({ isUpdating: false });
      toast.error(err.message || "Failed to delete entry");
      return false;
    }
  },

  // ─── Async Actions: Workflow ───

  updateStatus: async (diaryId, status) => {
    try {
      const res = await api.patch(`/project-diaries/${diaryId}/status`, { status });
      const updated = res.data?.projectDiary;
      set((s) => ({
        selectedDiary: s.selectedDiary?._id === diaryId ? updated : s.selectedDiary,
        diaries: s.diaries.map(d => d._id === diaryId ? updated : d),
      }));
      toast.success(`Moved to ${status}`);
    } catch (err) {
      toast.error(err.message || "Status sync failed");
    }
  },

  updatePriority: async (diaryId, priority) => {
    try {
      const res = await api.patch(`/project-diaries/${diaryId}/priority`, { priority });
      const updated = res.data?.projectDiary;
      set((s) => ({
        selectedDiary: s.selectedDiary?._id === diaryId ? updated : s.selectedDiary,
        diaries: s.diaries.map(d => d._id === diaryId ? updated : d),
      }));
      toast.success(`${priority} priority set`);
    } catch (err) {
      toast.error(err.message || "Priority sync failed");
    }
  },

  // ─── Async Actions: Narrative Sub-items (Questions) ───

  addQuestion: async (diaryId, name, answer = "") => {
    try {
      const res = await api.post(`/project-diaries/${diaryId}/questions`, { name, answer });
      set({ selectedDiary: res.data?.projectDiary });
      toast.success("Question logged");
    } catch (err) {
      toast.error(err.message || "Failed to add question");
    }
  },

  updateQuestion: async (diaryId, questionId, payload) => {
    try {
      const res = await api.patch(`/project-diaries/${diaryId}/questions/${questionId}`, payload);
      set({ selectedDiary: res.data?.projectDiary });
      toast.success("Question updated");
    } catch (err) {
      toast.error(err.message || "Update failed");
    }
  },

  removeQuestion: async (diaryId, questionId) => {
    try {
      const res = await api.delete(`/project-diaries/${diaryId}/questions/${questionId}`);
      set({ selectedDiary: res.data?.projectDiary });
      toast.success("Question removed");
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  },

  // ─── Async Actions: Narratives (Ideas, User Flows, Updates) ───

  addNarrative: async (diaryId, type, content) => {
    const endpointMap = {
      idea: "ideas",
      flow: "user-flows",
      update: "project-updates"
    };
    const bodyKeyMap = {
      idea: "idea",
      flow: "flow",
      update: "update"
    };

    try {
      const res = await api.post(`/project-diaries/${diaryId}/${endpointMap[type]}`, { [bodyKeyMap[type]]: content });
      set({ selectedDiary: res.data?.projectDiary });
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} added`);
    } catch (err) {
      toast.error(err.message || `Failed to add ${type}`);
    }
  },

  updateNarrative: async (diaryId, type, itemId, content) => {
    const endpointMap = {
      idea: "ideas",
      flow: "user-flows",
      update: "project-updates"
    };
    const bodyKeyMap = {
      idea: "idea",
      flow: "flow",
      update: "update"
    };

    try {
      const res = await api.patch(`/project-diaries/${diaryId}/${endpointMap[type]}/${itemId}`, { [bodyKeyMap[type]]: content });
      set({ selectedDiary: res.data?.projectDiary });
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} updated`);
    } catch (err) {
      toast.error(err.message || `Failed to update ${type}`);
    }
  },

  removeNarrative: async (diaryId, type, itemId) => {
    const endpointMap = {
      idea: "ideas",
      flow: "user-flows",
      update: "project-updates"
    };
    try {
      const res = await api.delete(`/project-diaries/${diaryId}/${endpointMap[type]}/${itemId}`);
      set({ selectedDiary: res.data?.projectDiary });
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} removed`);
    } catch (err) {
      toast.error(err.message || `Failed to remove ${type}`);
    }
  },

  // ─── Async Actions: Feature Planning ───

  addDiaryFeature: async (diaryId, payload) => {
    try {
      const res = await api.post(`/project-diaries/${diaryId}/features`, payload);
      set({ selectedDiary: res.data?.projectDiary });
      toast.success("Proposed feature added");
    } catch (err) {
      toast.error(err.message || "Failed to add feature");
    }
  },

  updateDiaryFeature: async (diaryId, featureId, payload, aspect = "details") => {
    // aspect can be: details, priority, status
    try {
      const res = await api.patch(`/project-diaries/${diaryId}/features/${featureId}/${aspect}`, payload);
      set({ selectedDiary: res.data?.projectDiary });
      toast.success("Feature sync complete");
    } catch (err) {
      toast.error(err.message || "Feature sync failed");
    }
  },

  promoteDiaryFeature: async (diaryId, featureId) => {
    try {
      const res = await api.post(`/project-diaries/${diaryId}/features/${featureId}/promote`);
      set({ selectedDiary: res.data?.projectDiary });
      toast.success("Feature established in Registry!");
    } catch (err) {
      toast.error(err.message || "Failed to promote feature");
    }
  },

  toggleDiaryFeature: async (diaryId, featureId) => {
    try {
      const res = await api.patch(`/project-diaries/${diaryId}/features/${featureId}/toggle`);
      set({ selectedDiary: res.data?.projectDiary });
    } catch (err) {
      toast.error(err.message || "Toggle failed");
    }
  },

  removeDiaryFeature: async (diaryId, featureId) => {
    try {
      const res = await api.delete(`/project-diaries/${diaryId}/features/${featureId}`);
      set({ selectedDiary: res.data?.projectDiary });
      toast.success("Proposed feature removed");
    } catch (err) {
      toast.error(err.message || "Remove failed");
    }
  },

  // ─── Async Actions: Metadata Registry (Tags, Links, Tech) ───

  syncMetadata: async (diaryId, type, action, payload) => {
    // type: tags, links, tech-stack
    // action: post (add), delete (remove), patch (update link)
    try {
      let res;
      if (action === "post") {
        res = await api.post(`/project-diaries/${diaryId}/${type}`, payload);
      } else if (action === "delete") {
        const id = payload.id || payload.tag || payload.tech;
        res = await api.delete(`/project-diaries/${diaryId}/${type}/${id}`);
      } else if (action === "patch") {
        res = await api.patch(`/project-diaries/${diaryId}/${type}/${payload.id}`, payload);
      }
      set({ selectedDiary: res.data?.projectDiary });
      toast.success("Registry updated");
    } catch (err) {
      toast.error(err.message || "Registry sync failed");
    }
  },

  clearError: () => set({ error: null }),
}));
