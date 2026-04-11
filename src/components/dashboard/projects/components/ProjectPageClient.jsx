"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LayoutGrid,
  List,
  Search,
  Plus,
  FolderOpen,
  TimerReset,
  CheckCircle2,
  Layers3,
  SlidersHorizontal,
  Filter,
} from "lucide-react";

import ProjectGrid from "./ProjectGrid";
import ProjectSheet from "./ProjectSheet";
import EmptyState from "./EmptyState";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showMessage } from "@/app/utils/showMessage";

import {
  getProjects,
  deleteProject,
  changeProjectStatus,
  selectProjects,
  selectProjectLoading,
  selectProjectCreating,
  selectProjectUpdating,
  selectProjectDeleting,
  selectProjectError,
  selectProjectMessage,
  clearMessages,
} from "@/redux/slices/projectSlice";

import { useProjectForm } from "../hooks/useProjectForm";

/* ─── stat card ─── */
const StatCard = ({ icon: Icon, label, value, panel, iconWrap }) => (
  <div className={`rounded-2xl border p-5 shadow-sm ${panel}`}>
    <div className="flex items-start justify-between gap-3">
      <div className={`rounded-xl p-3 ${iconWrap}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-right">
        <p className="text-3xl font-semibold text-slate-900">{value}</p>
      </div>
    </div>
    <div className="mt-4 space-y-1">
      <p className="text-sm font-semibold text-slate-900">{label}</p>
    </div>
  </div>
);

/* ─── status dropdown options ─── */
const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "archived", label: "Archived" },
];

const ProjectPageClient = () => {
  const dispatch = useDispatch();

  /* ─── Redux state ─── */
  const projects     = useSelector(selectProjects);
  const loading      = useSelector(selectProjectLoading);
  const creating     = useSelector(selectProjectCreating);
  const updating     = useSelector(selectProjectUpdating);
  const deleting     = useSelector(selectProjectDeleting);
  const error        = useSelector(selectProjectError);
  const message      = useSelector(selectProjectMessage);

  /* ─── local UI state ─── */
  const [viewType, setViewType]         = useState("grid");
  const [searchQuery, setSearchQuery]   = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sheetOpen, setSheetOpen]       = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  /* ─── form hook ─── */
  const {
    formData,
    setFormData,
    errors: formErrors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit: formSubmit,
    resetForm,
  } = useProjectForm();

  /* ─── fetch projects on mount ─── */
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  /* ─── toast on message/error changes ─── */
  useEffect(() => {
    if (message) {
      showMessage(message, "success");
      dispatch(clearMessages());
    }
  }, [message, dispatch]);

  useEffect(() => {
    if (error) {
      showMessage(error, "error");
      dispatch(clearMessages());
    }
  }, [error, dispatch]);

  /* ─── computed stats from real data ─── */
  const stats = useMemo(() => [
    {
      label: "All Projects",
      value: projects.length,
      icon: FolderOpen,
      panel: "border-slate-200 bg-white",
      iconWrap: "bg-cyan-50 text-cyan-700",
    },
    {
      label: "Draft",
      value: projects.filter((p) => p.status === "draft").length,
      icon: TimerReset,
      panel: "border-amber-200 bg-amber-50",
      iconWrap: "bg-white text-amber-700",
    },
    {
      label: "Completed",
      value: projects.filter((p) => p.status === "completed").length,
      icon: CheckCircle2,
      panel: "border-emerald-200 bg-emerald-50",
      iconWrap: "bg-white text-emerald-700",
    },
    {
      label: "Active",
      value: projects.filter((p) => p.status === "active").length,
      icon: Layers3,
      panel: "border-cyan-200 bg-cyan-50",
      iconWrap: "bg-white text-cyan-700",
    },
  ], [projects]);

  /* ─── filtered projects ─── */
  const filteredProjects = useMemo(() => {
    let result = projects;

    // status filter
    if (statusFilter !== "all") {
      result = result.filter((p) => p.status === statusFilter);
    }

    // search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    return result;
  }, [projects, statusFilter, searchQuery]);

  /* ─── handlers ─── */
  const handleOpenCreate = useCallback(() => {
    setEditingProject(null);
    resetForm();
    setSheetOpen(true);
  }, [resetForm]);

  const handleOpenEdit = useCallback((project) => {
    setEditingProject(project);
    setFormData({
      name: project.name || "",
      description: project.description || "",
      deadline: project.deadline ? project.deadline.split("T")[0] : "",
      status: project.status || "active",
      tags: (project.tags || []).join(", "),
      techStack: (project.techStack || []).join(", "),
    });
    // Use setTimeout to avoid Radix UI FocusScope collision between closing DropdownMenu and opening Sheet
    setTimeout(() => {
      setSheetOpen(true);
    }, 150);
  }, [setFormData]);

  const handleSheetSubmit = useCallback(async (data) => {
    const projectId = editingProject?._id || null;
    const success = await formSubmit(data, projectId, {
      quickCreate: !editingProject,
    });

    if (success) {
      setSheetOpen(false);
      setEditingProject(null);
      resetForm();
      // Refresh projects list
      dispatch(getProjects());
    }
  }, [editingProject, formSubmit, resetForm, dispatch]);

  const handleSheetCancel = useCallback(() => {
    setSheetOpen(false);
    setEditingProject(null);
    resetForm();
  }, [resetForm]);

  const handleChangeStatus = useCallback((projectId, status) => {
    dispatch(changeProjectStatus({ projectId, status }));
  }, [dispatch]);

  const handleDeleteClick = useCallback((projectId) => {
    const project = projects.find((p) => p._id === projectId);
    // Use setTimeout to avoid Radix UI FocusScope collision
    setTimeout(() => {
      setDeleteTarget(project || { _id: projectId, name: "this project" });
    }, 150);
  }, [projects]);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTarget) return;
    try {
      await dispatch(deleteProject(deleteTarget._id)).unwrap();
      setDeleteTarget(null);
    } catch {
      // error handled by Redux → toast
    }
  }, [deleteTarget, dispatch]);

  /* ─── loading skeleton ─── */
  if (loading && !projects.length) {
    return (
      <div className="space-y-8 px-6 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-72 rounded-xl bg-slate-200" />
          <div className="h-6 w-96 rounded-lg bg-slate-100" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 rounded-2xl bg-slate-100" />
            ))}
          </div>
          <div className="h-14 rounded-2xl bg-slate-100" />
          <div className="grid gap-8 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-72 rounded-2xl bg-slate-100" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-6 py-8">
      {/* ─── Header ─── */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
            Project Workspace
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Project Overview
          </h1>
          <p className="max-w-2xl text-sm text-slate-600">
            Focus on project data first. Keep the workspace simple while you build out features and diary entries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1">
            <button
              onClick={() => setViewType("grid")}
              className={`rounded-lg p-2 transition-all ${
                viewType === "grid"
                  ? "bg-white text-cyan-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setViewType("list")}
              className={`rounded-lg p-2 transition-all ${
                viewType === "list"
                  ? "bg-white text-cyan-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <List size={20} />
            </button>
          </div>
          <Button
            onClick={handleOpenCreate}
            className="h-11 rounded-lg bg-cyan-600 px-6 text-white hover:bg-cyan-700"
          >
            <Plus className="mr-2 h-5 w-5" />
            New Project
          </Button>
        </div>
      </div>
      </div>

      {/* ─── Stats ─── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* ─── Search + Filter ─── */}
      <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
        <div className="group relative">
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400 transition-colors group-focus-within:text-indigo-500">
            <Search size={18} />
          </div>
          <Input
            type="text"
            placeholder="Search projects by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 rounded-xl border-slate-200 bg-white pl-12 text-sm shadow-sm focus-visible:border-cyan-600 focus-visible:ring-cyan-100"
          />
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 shadow-sm">
          <SlidersHorizontal className="h-4 w-4 text-slate-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-12 w-full cursor-pointer bg-transparent text-sm text-slate-700 outline-none"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ─── Count indicator ─── */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Filter className="h-4 w-4" />
        Showing {filteredProjects.length} project{filteredProjects.length === 1 ? "" : "s"}
        {statusFilter !== "all" && ` • ${statusFilter}`}
        {searchQuery && ` • matching "${searchQuery}"`}
      </div>

      {/* ─── Project Grid / Empty ─── */}
      <div className="pb-10">
        {filteredProjects.length === 0 && !loading ? (
          <EmptyState onAddProject={handleOpenCreate} />
        ) : (
          <ProjectGrid
            projects={filteredProjects}
            viewType={viewType}
            onEdit={handleOpenEdit}
            onDelete={handleDeleteClick}
            onChangeStatus={handleChangeStatus}
          />
        )}
      </div>

      {/* ─── Create / Edit Sheet ─── */}
      <ProjectSheet
        open={sheetOpen}
        onOpenChange={(open) => {
          if (!open) handleSheetCancel();
        }}
        formData={formData}
        errors={formErrors}
        touched={touched}
        isValid={isValid}
        isSubmitting={creating || updating}
        isEditing={!!editingProject}
        onChange={handleChange}
        onBlur={handleBlur}
        onSubmit={handleSheetSubmit}
        onCancel={handleSheetCancel}
      />

      {/* ─── Delete Confirmation ─── */}
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        projectName={deleteTarget?.name || ""}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleting}
      />
    </div>
  );
};

export default ProjectPageClient;
