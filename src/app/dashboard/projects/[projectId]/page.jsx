"use client";

import React, { useEffect, useState, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { useProjectStore } from "@/store/projectStore";
import ProjectDetail from "@/features/projects/components/ProjectDetail";
import ProjectSheet from "@/features/projects/components/ProjectSheet";
import DeleteConfirmDialog from "@/features/projects/components/DeleteConfirmDialog";
import LoadingState from "@/components/dashboard/LoadingState";
import { useProjectForm } from "@/features/projects/hooks/useProjectForm";


export default function ProjectPage({ params }) {
  const { projectId } = use(params);
  const router = useRouter();

  /* ─── Zustand store ─── */
  const {
    selectedProject: project,
    loading,
    updating,
    deleting,
    fetchProjectById,
    changeProjectStatus,
    deleteProject,
  } = useProjectStore();


  /* ─── Local UI state ─── */
  const [sheetOpen, setSheetOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  /* ─── Form hook ─── */
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

  /* ─── Fetch project on mount ─── */
  useEffect(() => {
    if (projectId) {
      fetchProjectById(projectId);
    }
  }, [projectId, fetchProjectById]);


  /* ─── Handlers ─── */
  const handleOpenEdit = useCallback(() => {
    if (!project) return;
    setFormData({
      name: project.name || "",
      description: project.description || "",
      deadline: project.deadline ? project.deadline.split("T")[0] : "",
      status: project.status || "active",
      tags: (project.tags || []).join(", "),
      techStack: (project.techStack || []).map(cat => {
        if (typeof cat === "string") return cat;
        return (cat.tech || []).map(t => t.name).join(", ");
      }).filter(Boolean).join(", "),
    });
    setSheetOpen(true);
  }, [project, setFormData]);

  const handleSheetSubmit = useCallback(async (data) => {
    const success = await formSubmit(data, projectId);
    if (success) {
      setSheetOpen(false);
      // Data in store is refreshed automatically inside the store's updateProject
    }
  }, [projectId, formSubmit]);

  const handleSheetCancel = useCallback(() => {
    setSheetOpen(false);
  }, []);

  // Unified Cleanup Effect: Handles state reset after drawer closing animation completes
  useEffect(() => {
    if (!sheetOpen) {
      const timer = setTimeout(() => {
        resetForm();
      }, 400); // Wait for Radix UI transition (300ms-400ms)
      return () => clearTimeout(timer);
    }
  }, [sheetOpen, resetForm]);

  const handleChangeStatus = useCallback((id, status) => {
    changeProjectStatus(id, status);
  }, [changeProjectStatus]);

  const handleDeleteClick = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    const success = await deleteProject(projectId);
    if (success) {
      setDeleteDialogOpen(false);
      router.push("/dashboard/projects");
    }
  }, [projectId, deleteProject, router]);

  if (loading && !project) {
    return <LoadingState />;
  }

  if (!project && !loading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-foreground">Project Not Found</h2>
        <p className="text-muted-foreground mt-2">The project you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => router.push("/dashboard/projects")}
          className="mt-6 text-primary font-bold hover:underline"
        >
          Go back to projects
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProjectDetail
        project={project}
        onEdit={handleOpenEdit}
        onDelete={handleDeleteClick}
        onChangeStatus={handleChangeStatus}
      />

      {/* Edit Sheet */}
      <ProjectSheet
        open={sheetOpen}
        onOpenChange={(open) => {
           if (!open) handleSheetCancel();
        }}
        formData={formData}
        errors={formErrors}
        touched={touched}
        isValid={isValid}
        isSubmitting={updating}
        isEditing={true}
        onChange={handleChange}
        onBlur={handleBlur}
        onSubmit={handleSheetSubmit}
        onCancel={handleSheetCancel}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        projectName={project?.name || ""}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleting}
      />
    </div>
  );
}
