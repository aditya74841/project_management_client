import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import api from "@/services/api";

/**
 * Project Store (Zen Prism Edition)
 * Manages project data, UI filters, and form states.
 * Uses normalized API responses (automatic data extraction).
 */
export const useProjectStore = create(
  persist(
    (set, get) => ({
      // ─── Server Data ───
      projects: [],
      loading: false,
      creating: false,
      updating: false,
      deleting: false,

      // ─── UI State ───
      viewType: "grid",
      searchQuery: "",
      statusFilter: "all",

      // Sheet / Modal state
      sheetOpen: false,
      editingProject: null,
      selectedProject: null,
      deleteTarget: null,

      // Form State
      formData: {
        name: "",
        description: "",
        deadline: "",
        status: "active",
        tags: "",
        techStack: "",
      },
      formErrors: {},
      formTouched: {},

      // ─── UI Actions ───
      setViewType: (viewType) => set({ viewType }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setStatusFilter: (statusFilter) => set({ statusFilter }),

      setFormData: (data) =>
        set((s) => ({
          formData: typeof data === "function" ? data(s.formData) : { ...s.formData, ...data },
        })),
      
      setFormErrors: (errors) =>
        set((s) => ({
          formErrors: typeof errors === "function" ? errors(s.formErrors) : errors,
        })),
        
      setFormTouched: (touched) =>
        set((s) => ({
          formTouched: typeof touched === "function" ? touched(s.formTouched) : touched,
        })),

      resetFormState: () =>
        set({
          formData: {
            name: "",
            description: "",
            deadline: "",
            status: "active",
            tags: "",
            techStack: "",
          },
          formErrors: {},
          formTouched: {},
        }),

      openCreateSheet: () => {
        get().resetFormState();
        set({
          editingProject: null,
          sheetOpen: true,
        });
      },

      openEditSheet: (project) =>
        set({
          editingProject: project,
          sheetOpen: true,
          formData: {
            name: project.name || "",
            description: project.description || "",
            deadline: project.deadline ? project.deadline.split("T")[0] : "",
            status: project.status || "active",
            tags: (project.tags || []).join(", "),
            techStack: (project.techStack || []).map(cat => {
              if (typeof cat === "string") return cat;
              return (cat.tech || []).map(t => t.name).join(", ");
            }).filter(Boolean).join(", "),
          },
          formErrors: {},
          formTouched: {},
        }),

      closeSheet: () => set({ sheetOpen: false }),

      clearSheetContext: () => set({ editingProject: null,  formErrors: {}, formTouched: {} }),
      
      setSelectedProject: (project) => set({ selectedProject: project }),

      setDeleteTarget: (project) => set({ deleteTarget: project }),
      clearDeleteTarget: () => set({ deleteTarget: null }),

      // ─── Async Actions (Simplified with Senior API Layer) ───

      fetchProjects: async () => {
        set({ loading: true });
        try {
          const res = await api.get("/projects");
          // Res is already normalized by api.js
          set({ projects: res.data?.projects || [], loading: false });
        } catch (err) {
          toast.error(err.message || "Failed to fetch projects");
          set({ loading: false });
        }
      },

      createProject: async (payload) => {
        set({ creating: true });
        try {
          const res = await api.post("/projects", payload);
          const newProject = res.data?.project;
          set((s) => ({
            projects: newProject ? [newProject, ...s.projects] : s.projects,
            creating: false,
          }));
          toast.success(res.message || "Project created successfully");
          return true;
        } catch (err) {
          toast.error(err.message || "Failed to create project");
          set({ creating: false });
          return false;
        }
      },

      updateProject: async (projectId, payload) => {
        set({ updating: true });
        try {
          const res = await api.patch(`/projects/${projectId}`, payload);
          const updated = res.data?.project;
          set((s) => ({
            projects: updated
              ? s.projects.map((p) => (p._id === updated._id ? updated : p))
              : s.projects,
            updating: false,
          }));
          toast.success(res.message || "Project updated successfully");
          return true;
        } catch (err) {
          toast.error(err.message || "Failed to update project");
          set({ updating: false });
          return false;
        }
      },

      deleteProject: async (projectId) => {
        set({ deleting: true });
        try {
          const res = await api.delete(`/projects/${projectId}`);
          set((s) => ({
            projects: s.projects.filter((p) => p._id !== projectId),
            deleteTarget: null,
            deleting: false,
          }));
          toast.success(res.message || "Project deleted successfully");
          return true;
        } catch (err) {
          toast.error(err.message || "Failed to delete project");
          set({ deleting: false });
          return false;
        }
      },

      changeProjectStatus: async (projectId, status) => {
        set((s) => ({
          projects: s.projects.map((p) =>
            p._id === projectId ? { ...p, status } : p
          ),
          selectedProject: s.selectedProject?._id === projectId 
            ? { ...s.selectedProject, status } 
            : s.selectedProject,
        }));
        try {
          const res = await api.patch(`/projects/${projectId}/change-status`, { status });
          const updatedStatus = res.data?.status || status;
          set((s) => ({
            projects: s.projects.map((p) =>
              p._id === projectId ? { ...p, status: updatedStatus } : p
            ),
            selectedProject: s.selectedProject?._id === projectId 
              ? { ...s.selectedProject, status: updatedStatus } 
              : s.selectedProject,
          }));
          toast.success(res.message || "Status updated");
        } catch (err) {
          toast.error(err.message || "Failed to change status");
          get().fetchProjects(); // re-sync
        }
      },

      fetchProjectById: async (projectId) => {
        set({ loading: true });
        try {
          const res = await api.get(`/projects/${projectId}`);
          set({ selectedProject: res.data?.project || null, loading: false });
        } catch (err) {
          toast.error(err.message || "Failed to fetch project details");
          set({ loading: false });
        }
      },

      // ─── Tags ───
      addTag: async (projectId, tag) => {
        try {
          const res = await api.post(`/projects/${projectId}/tags`, { tag });
          const updatedProject = { ...get().selectedProject, tags: res.data.tags };
          set((s) => ({
            selectedProject: s.selectedProject?._id === projectId ? updatedProject : s.selectedProject,
            projects: s.projects.map(p => p._id === projectId ? { ...p, tags: res.data.tags } : p)
          }));
          toast.success("Tag added");
        } catch (err) {
          toast.error(err.message || "Failed to add tag");
        }
      },

      removeTag: async (projectId, tag) => {
        try {
          const res = await api.delete(`/projects/${projectId}/tags`, { data: { tag } });
          const updatedProject = { ...get().selectedProject, tags: res.data.tags };
          set((s) => ({
            selectedProject: s.selectedProject?._id === projectId ? updatedProject : s.selectedProject,
            projects: s.projects.map(p => p._id === projectId ? { ...p, tags: res.data.tags } : p)
          }));
          toast.success("Tag removed");
        } catch (err) {
          toast.error(err.message || "Failed to remove tag");
        }
      },

      // ─── Tech Stack Categories ───
      addTechCategory: async (projectId, categoryName) => {
        try {
          const res = await api.post(`/projects/${projectId}/tech-stack-category`, { categoryName });
          const updatedProject = { ...get().selectedProject, techStack: res.data.techStack };
          set((s) => ({
            selectedProject: s.selectedProject?._id === projectId ? updatedProject : s.selectedProject,
            projects: s.projects.map(p => p._id === projectId ? { ...p, techStack: res.data.techStack } : p)
          }));
          toast.success("Category created");
        } catch (err) {
          toast.error(err.message || "Failed to add category");
        }
      },

      updateTechCategory: async (projectId, categoryName, newCategoryName) => {
        try {
          const res = await api.patch(`/projects/${projectId}/tech-stack-category`, { categoryName, newCategoryName });
          const updatedProject = { ...get().selectedProject, techStack: res.data.techStack };
          set((s) => ({
            selectedProject: s.selectedProject?._id === projectId ? updatedProject : s.selectedProject,
            projects: s.projects.map(p => p._id === projectId ? { ...p, techStack: res.data.techStack } : p)
          }));
          toast.success("Category renamed");
        } catch (err) {
          toast.error(err.message || "Failed to rename category");
        }
      },

      removeTechCategory: async (projectId, categoryName) => {
        try {
          const res = await api.delete(`/projects/${projectId}/tech-stack-category`, { data: { categoryName } });
          const updatedProject = { ...get().selectedProject, techStack: res.data.techStack };
          set((s) => ({
            selectedProject: s.selectedProject?._id === projectId ? updatedProject : s.selectedProject,
            projects: s.projects.map(p => p._id === projectId ? { ...p, techStack: res.data.techStack } : p)
          }));
          toast.success("Category removed");
        } catch (err) {
          toast.error(err.message || "Failed to remove category");
        }
      },

      // ─── Tech Items ───
      addTechItem: async (projectId, categoryName, techName, description) => {
        try {
          const res = await api.post(`/projects/${projectId}/tech-item`, { categoryName, techName, description });
          const updatedProject = { ...get().selectedProject, techStack: res.data.techStack };
          set((s) => ({
            selectedProject: s.selectedProject?._id === projectId ? updatedProject : s.selectedProject,
            projects: s.projects.map(p => p._id === projectId ? { ...p, techStack: res.data.techStack } : p)
          }));
          toast.success(`${techName} added`);
        } catch (err) {
          toast.error(err.message || "Failed to add technology");
        }
      },

      updateTechItem: async (projectId, categoryName, techName, newTechName, newDescription) => {
        try {
          const res = await api.patch(`/projects/${projectId}/tech-item`, { categoryName, techName, newTechName, newDescription });
          const updatedProject = { ...get().selectedProject, techStack: res.data.techStack };
          set((s) => ({
            selectedProject: s.selectedProject?._id === projectId ? updatedProject : s.selectedProject,
            projects: s.projects.map(p => p._id === projectId ? { ...p, techStack: res.data.techStack } : p)
          }));
          toast.success(`${newTechName || techName} updated`);
        } catch (err) {
          toast.error(err.message || "Failed to update technology");
        }
      },

      removeTechItem: async (projectId, categoryName, techName) => {
        try {
          const res = await api.delete(`/projects/${projectId}/tech-item`, { data: { categoryName, techName } });
          const updatedProject = { ...get().selectedProject, techStack: res.data.techStack };
          set((s) => ({
            selectedProject: s.selectedProject?._id === projectId ? updatedProject : s.selectedProject,
            projects: s.projects.map(p => p._id === projectId ? { ...p, techStack: res.data.techStack } : p)
          }));
          toast.success(`${techName} removed`);
        } catch (err) {
          toast.error(err.message || "Failed to remove technology");
        }
      },

      // ─── Links ───
      addLink: async (projectId, name, url) => {
        try {
          const res = await api.post(`/projects/${projectId}/links`, { name, url });
          const newLinks = res.data?.projectLinks?.links;
          set((s) => ({
            selectedProject: s.selectedProject?._id === projectId
              ? { ...s.selectedProject, links: newLinks }
              : s.selectedProject,
            projects: s.projects.map(p =>
              p._id === projectId ? { ...p, links: newLinks } : p
            ),
          }));
          toast.success("Link added");
          return true;
        } catch (err) {
          toast.error(err.message || "Failed to add link");
          return false;
        }
      },

      updateLink: async (projectId, linkId, name, url) => {
        try {
          const res = await api.patch(`/projects/${projectId}/links/${linkId}`, { name, url });
          const newLinks = res.data?.project?.links;
          set((s) => ({
            selectedProject: s.selectedProject?._id === projectId
              ? { ...s.selectedProject, links: newLinks }
              : s.selectedProject,
            projects: s.projects.map(p =>
              p._id === projectId ? { ...p, links: newLinks } : p
            ),
          }));
          toast.success("Link updated");
          return true;
        } catch (err) {
          toast.error(err.message || "Failed to update link");
          return false;
        }
      },

      removeLink: async (projectId, linkId) => {
        try {
          const res = await api.delete(`/projects/${projectId}/links/${linkId}`);
          const newLinks = res.data?.project?.links;
          set((s) => ({
            selectedProject: s.selectedProject?._id === projectId
              ? { ...s.selectedProject, links: newLinks }
              : s.selectedProject,
            projects: s.projects.map(p =>
              p._id === projectId ? { ...p, links: newLinks } : p
            ),
          }));
          toast.success("Link removed");
          return true;
        } catch (err) {
          toast.error(err.message || "Failed to remove link");
          return false;
        }
      },
    }),
    {
      name: "project-ui-storage",
      partialize: (state) => ({
        viewType: state.viewType,
        statusFilter: state.statusFilter,
      }),
    }
  )
);
