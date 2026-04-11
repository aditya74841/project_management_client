"use client";

import React, { useEffect, useState, useCallback, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import ProjectDetail from "@/components/dashboard/projects/components/ProjectDetail";
import LoadingState from "@/components/dashboard/LoadingState";
import { showMessage } from "@/app/utils/showMessage";
import ProjectSheet from "@/components/dashboard/projects/components/ProjectSheet";
import DeleteConfirmDialog from "@/components/dashboard/projects/components/DeleteConfirmDialog";

import {
  getProjectById,
  deleteProject,
  changeProjectStatus,
  selectSelectedProject,
  selectProjectLoading,
  selectProjectUpdating,
  selectProjectDeleting,
  selectProjectError,
  selectProjectMessage,
  clearMessages,
} from "@/redux/slices/projectSlice";

import { useProjectForm } from "@/components/dashboard/projects/hooks/useProjectForm";

export default function ProjectPage({ params }) {
  const { projectId } = use(params);
  const dispatch = useDispatch();
  const router = useRouter();

  /* ─── Redux state ─── */
  const project = useSelector(selectSelectedProject);
  const loading = useSelector(selectProjectLoading);
  const updating = useSelector(selectProjectUpdating);
  const deleting = useSelector(selectProjectDeleting);
  const error = useSelector(selectProjectError);
  const message = useSelector(selectProjectMessage);

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
      dispatch(getProjectById(projectId));
    }
  }, [dispatch, projectId]);

  /* ─── Toast on messages ─── */
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

  /* ─── Handlers ─── */
  const handleOpenEdit = useCallback(() => {
    if (!project) return;
    setFormData({
      name: project.name || "",
      description: project.description || "",
      deadline: project.deadline ? project.deadline.split("T")[0] : "",
      status: project.status || "active",
      tags: (project.tags || []).join(", "),
      techStack: (project.techStack || []).join(", "),
    });
    setSheetOpen(true);
  }, [project, setFormData]);

  const handleSheetSubmit = useCallback(async (data) => {
    const success = await formSubmit(data, projectId);
    if (success) {
      setSheetOpen(false);
      // Refresh project data
      dispatch(getProjectById(projectId));
    }
  }, [projectId, formSubmit, dispatch]);

  const handleSheetCancel = useCallback(() => {
    setSheetOpen(false);
    resetForm();
  }, [resetForm]);

  const handleChangeStatus = useCallback((id, status) => {
    dispatch(changeProjectStatus({ projectId: id, status }));
  }, [dispatch]);

  const handleDeleteClick = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    try {
      await dispatch(deleteProject(projectId)).unwrap();
      setDeleteDialogOpen(false);
      router.push("/dashboard/projects");
    } catch {
      // error handled by Redux
    }
  }, [projectId, dispatch, router]);

  if (loading && !project) {
    return <LoadingState />;
  }

  if (!project && !loading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-slate-800">Project Not Found</h2>
        <p className="text-slate-500 mt-2">The project you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => router.push("/dashboard/projects")}
          className="mt-6 text-indigo-600 font-bold hover:underline"
        >
          Go back to projects
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
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
