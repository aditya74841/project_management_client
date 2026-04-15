"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  FolderKanban,
  Plus,
  LayoutGrid,
  List,
  Search,
  Filter,
  BookText
} from "lucide-react";

import ProjectDiaryHeader from "./ProjectDiaryHeader";
import ProjectDiaryStats from "./ProjectDiaryStats";
import ProjectDiaryGrid from "./ProjectDiaryGrid";
import ProjectDiarySheet from "./ProjectDiarySheet";
import ProjectDiaryEmptyState from "./ProjectDiaryEmptyState";
import ProjectDiaryDeleteDialog from "./ProjectDiaryDeleteDialog";

import { useProjectDiaryForm } from "../hooks/useProjectDiaryForm";
import { useDiaryStore } from "@/store/diaryStore";
import { useProjectStore } from "@/store/projectStore";
import { Button, Input, PageContainer, PageHeader } from "@/components/ui-core";
import { cn } from "@/lib/utils";

/**
 * Project Diary Page Client (Zen Prism Edition)
 * A centralized engineering hub for documenting product thinking, 
 * feature exploration, and registry updates.
 */
const ProjectDiaryPageClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedProjectId = searchParams.get("projectId") || null;
  // ─── Global State ───
  const {
    diaries,
    loading,
    deleting,
    deleteDiary,
    isSheetOpen,
    openCreateSheet,
    openEditSheet,
    closeSheet,
    editingDiary,
    fetchDiaries
  } = useDiaryStore();
  const { projects, fetchProjects } = useProjectStore();

  // ─── Local UI State ───
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [diaryToDelete, setDiaryToDelete] = useState(null);

  // ─── Form Hook ───
  const {
    formData,
    setFormData,
    errors,
    touched,
    isValid,
    handleChange,
    handleSelectChange,
    handleBlur,
    handleSubmit,
    resetForm,
    populateForm,
  } = useProjectDiaryForm();

  const isProjectFixed = !!selectedProjectId;

  // ─── Bootstrap ───
  useEffect(() => {
    fetchDiaries(selectedProjectId);
    fetchProjects();
  }, [selectedProjectId, fetchDiaries, fetchProjects]);

  useEffect(() => {
    if (isSheetOpen && !editingDiary && selectedProjectId) {
      setFormData(prev => ({ ...prev, projectId: selectedProjectId }));
    }
  }, [isSheetOpen, editingDiary, selectedProjectId, setFormData]);

  const linkedProject = useMemo(() =>
    projects.find((p) => p._id === selectedProjectId) || null
    , [projects, selectedProjectId]);

  // ─── Filtering ───
  const filteredDiaries = useMemo(() => {
    return diaries.filter((d) => {
      if (statusFilter !== "all" && d.status !== statusFilter) return false;
      if (priorityFilter !== "all" && d.priority !== priorityFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return d.title.toLowerCase().includes(q) || d.description?.toLowerCase().includes(q);
      }
      return true;
    });
  }, [diaries, statusFilter, priorityFilter, searchQuery]);

  // ─── Handlers ───
  const handleAdd = () => {
    resetForm();
    openCreateSheet();
  };

  const handleEdit = (diary) => {
    populateForm(diary);
    openEditSheet(diary);
  };

  const handleDelete = (id) => {
    const diary = diaries.find(d => d._id === id);
    if (diary) {
      setDiaryToDelete(diary);
      setIsDeleteDialogOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (diaryToDelete) {
      const success = await deleteDiary(diaryToDelete._id);
      if (success) {
        setIsDeleteDialogOpen(false);
        setDiaryToDelete(null);
      }
    }
  };

  const onSubmit = async (data) => {
    const success = await handleSubmit(
      {
        ...data,
        projectId: selectedProjectId || data.projectId,
      },
      editingDiary?._id
    );
    if (success) {
      closeSheet();
      resetForm();
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Product Diary"
        subtitle="The thinking space for high-caliber engineering. Document user flows, status updates, and product strategy."
        icon={BookText}
        actions={
          <Button
            variant="primary"
            size="lg"
            onClick={handleAdd}
            className="gap-2 shadow-lg shadow-primary/20"
          >
            <Plus size={20} />
            Add Entry
          </Button>
        }
      />

      {/* Context Banner */}
      {selectedProjectId && (
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/10 dark:border-primary/20 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent p-8">
          <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10">
            <FolderKanban size={120} className="text-primary rotate-12" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-[10px] font-black uppercase tracking-widest text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Active Node: {linkedProject?.name || "Initializing..."}
              </div>
              <h3 className="text-xl font-black text-foreground tracking-tight">
                Project-Specific Registry
              </h3>
              <p className="text-sm text-muted-foreground font-medium max-w-xl">
                You are working within the dedicated thinking space for this project.
                All new entries will be automatically indexed to this registry node.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/dashboard/projects">
                <Button variant="outline" size="md" className="gap-2 shadow-sm rounded-xl">
                  <ArrowLeft size={16} />
                  Back to Hub
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="md"
                onClick={() => router.push("/dashboard/project-diary")}
                className="text-primary font-bold"
              >
                View All Entries
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Dashboard */}
      <ProjectDiaryStats diaries={filteredDiaries} />

      {/* Registry Controls */}
      <div className="space-y-6">
        <div className="grid lg:grid-cols-[1fr,200px,200px] gap-4">
          <Input
            placeholder="Search through thinking patterns and feature logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-4 h-4 text-slate-400" />}
            className="pl-11"
          />

          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Filter size={16} />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-2xl border border-border bg-card text-sm font-bold text-foreground outline-none focus:border-primary transition-all appearance-none cursor-pointer"
            >
              <option value="all">Every State</option>
              <option value="idea">Idea / Concept</option>
              <option value="scoping">Strategic Planning</option>
              <option value="in-progress">Execution</option>
              <option value="completed">Finalized</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Filter size={16} />
            </div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-2xl border border-border bg-card text-sm font-bold text-foreground outline-none focus:border-primary transition-all appearance-none cursor-pointer"
            >
              <option value="all">Any Priority</option>
              <option value="low">Standard</option>
              <option value="medium">Critical</option>
              <option value="high">Mission Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="min-h-[400px]">
        {loading && !diaries.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 rounded-3xl bg-muted/30 border border-border animate-pulse" />
            ))}
          </div>
        ) : filteredDiaries.length > 0 ? (
          <ProjectDiaryGrid
            diaries={filteredDiaries}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={deleting}
          />
        ) : (
          <ProjectDiaryEmptyState onAddDiary={handleAdd} />
        )}
      </div>

      {/* Entry Lifecycle Management */}
      <ProjectDiarySheet
        open={isSheetOpen}
        onOpenChange={closeSheet}
        formData={formData}
        errors={errors}
        touched={touched}
        isValid={isValid}
        isSubmitting={loading}
        isEditing={!!editingDiary}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        onBlur={handleBlur}
        onSubmit={onSubmit}
        onCancel={() => {
          closeSheet();
          resetForm();
        }}
        projects={projects}
        isProjectFixed={isProjectFixed}
      />

      <ProjectDiaryDeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        diaryTitle={diaryToDelete?.title}
        onConfirm={confirmDelete}
        isDeleting={loading}
      />
    </PageContainer>
  );
};

export default ProjectDiaryPageClient;
