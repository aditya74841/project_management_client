"use client";

import React, { useEffect, useMemo, useCallback } from "react";
import {
  LayoutGrid,
  List,
  Search,
  Plus,
  FolderOpen,
  TimerReset,
  CheckCircle2,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react";

import ProjectGrid from "./ProjectGrid";
import ProjectSheet from "./ProjectSheet";
import EmptyState from "./EmptyState";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

import { cn } from "@/lib/utils";

import { useProjectStore } from "@/store/projectStore";
import { useProjectForm } from "../hooks/useProjectForm";
import { Button, Input, PageContainer, PageHeader } from "@/components/ui-core";

/* ─── Metric Item ─── */
const MetricItem = ({ icon: Icon, label, value, colorClass }) => (
  <div className="flex items-center gap-4 px-6 py-4 border-r border-border last:border-0 min-w-[180px]">
    <div className={cn("p-3 rounded-2xl shadow-sm", colorClass)}>
      <Icon className="h-5 w-5" />
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </span>
      <span className="text-xl font-black text-foreground tracking-tight">{value}</span>
    </div>
  </div>
);

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "archived", label: "Archived" },
];

const ProjectPageClient = () => {
  const {
    projects,
    loading,
    creating,
    updating,
    deleting,
    viewType, setViewType,
    searchQuery, setSearchQuery,
    statusFilter, setStatusFilter,
    sheetOpen, editingProject,
    closeSheet,
    deleteTarget, clearDeleteTarget,
    fetchProjects,
    deleteProject,
  } = useProjectStore();

  const {
    formData,
    errors: formErrors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit: formSubmit,
    resetForm,
    clearSheetContext,
    handleOpenCreate
  } = useProjectForm();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const stats = useMemo(() => [
    { label: "Total Assets", value: projects.length, icon: FolderOpen, colorClass: "bg-indigo-50 text-indigo-600" },
    { label: "Active Nodes", value: projects.filter((p) => p.status === "active").length, icon: TrendingUp, colorClass: "bg-emerald-50 text-emerald-600" },
    { label: "Drafted", value: projects.filter((p) => p.status === "draft").length, icon: TimerReset, colorClass: "bg-amber-50 text-amber-600" },
    { label: "Completed", value: projects.filter((p) => p.status === "completed").length, icon: CheckCircle2, colorClass: "bg-primary/5 text-primary" },
  ], [projects]);

  const filteredProjects = useMemo(() => {
    let result = projects;
    if (statusFilter !== "all") result = result.filter((p) => p.status === statusFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || (p.description?.toLowerCase().includes(q))
      );
    }
    return result;
  }, [projects, statusFilter, searchQuery]);

  const handleSheetSubmit = useCallback(async (data) => {
    const success = await formSubmit(data, editingProject?._id || null, {
      quickCreate: !editingProject,
    });
    
    if (success) {
      closeSheet();
    }
  }, [editingProject, formSubmit, closeSheet]);

  const handleSheetCancel = useCallback(() => {
    closeSheet();
  }, [closeSheet]);

  // Unified Cleanup Effect: Handles state reset after drawer closing animation completes
  useEffect(() => {
    if (!sheetOpen) {
      const timer = setTimeout(() => {
        resetForm();
        clearSheetContext();
      }, 400); // Wait for Radix UI transition (300ms-400ms)
      return () => clearTimeout(timer);
    }
  }, [sheetOpen, resetForm, clearSheetContext]);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTarget) return;
    await deleteProject(deleteTarget._id);
  }, [deleteTarget, deleteProject]);

  return (
    <PageContainer>
      <PageHeader
        title="Project Hub"
        subtitle="Manage your engineering registry, track lifecycle phases, and sync directly with embedded panels."
        icon={FolderOpen}
        actions={
          <>
            <div className="flex bg-muted rounded-xl p-1 border border-border">
              <button
                onClick={() => setViewType("grid")}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  viewType === "grid" ? "bg-card shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewType("list")}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  viewType === "list" ? "bg-card shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <List size={18} />
              </button>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={handleOpenCreate}
              className="gap-2 shadow-lg shadow-primary/20"
            >
              <Plus size={20} />
              Initialize Project
            </Button>
          </>
        }
      />

      {/* Metrics Bar */}
      <div className="flex items-center overflow-x-auto no-scrollbar bg-card border border-border rounded-3xl shadow-sm">
        {stats.map((m) => (
          <MetricItem key={m.label} {...m} />
        ))}
        <div className="ml-auto hidden xl:flex items-center gap-4 px-8 border-l border-border">
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Network Status</p>
            <p className="text-xs font-bold text-emerald-500 flex items-center justify-end gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Operational
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="grid md:grid-cols-[1fr,240px] gap-4">
        <Input
          placeholder="Filter registry by name, description or meta..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<Search className="w-4 h-4 text-muted-foreground" />}
          className="pl-11"
        />

        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
            <SlidersHorizontal size={16} />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full h-12 pl-11 pr-4 rounded-2xl border border-border bg-background text-sm font-bold text-foreground outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 appearance-none cursor-pointer transition-all"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="min-h-[400px]">
        {loading && !projects.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-3xl bg-muted/50 border border-border animate-pulse" />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <EmptyState onAddProject={handleOpenCreate} />
        ) : (
          <ProjectGrid projects={filteredProjects} viewType={viewType} />
        )}
      </div>

      <ProjectSheet
        open={sheetOpen}
        onOpenChange={(open) => { if (!open) handleSheetCancel(); }}
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

      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) clearDeleteTarget(); }}
        projectName={deleteTarget?.name || ""}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleting}
      />
    </PageContainer>
  );
};

export default ProjectPageClient;
