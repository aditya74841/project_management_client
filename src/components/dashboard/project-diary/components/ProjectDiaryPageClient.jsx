"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { ArrowLeft, FolderKanban } from "lucide-react";

import ProjectDiaryHeader from "./ProjectDiaryHeader";
import ProjectDiaryStats from "./ProjectDiaryStats";
import ProjectDiaryGrid from "./ProjectDiaryGrid";
import ProjectDiarySheet from "./ProjectDiarySheet";
import ProjectDiaryEmptyState from "./ProjectDiaryEmptyState";

import { useProjectDiaryForm } from "../hooks/useProjectDiaryForm";
import { showMessage } from "@/app/utils/showMessage";

import {
    getAllProjectDiaries,
    deleteProjectDiary,
    clearMessages,
    selectDiaries,
    selectDiaryLoading,
    selectDiaryCreating,
    selectDiaryDeleting,
    selectDiaryError,
    selectDiaryMessage,
} from "@/redux/slices/projectDiarySlice";
import { getProjects, selectProjects } from "@/redux/slices/projectSlice";

const ProjectDiaryPageClient = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedProjectId = searchParams.get("projectId");

    /* Redux state */
    const diaries = useSelector(selectDiaries);
    const loading = useSelector(selectDiaryLoading);
    const creating = useSelector(selectDiaryCreating);
    const deleting = useSelector(selectDiaryDeleting);
    const error = useSelector(selectDiaryError);
    const message = useSelector(selectDiaryMessage);
    const projects = useSelector(selectProjects);

    /* Local UI state */
    const [sheetOpen, setSheetOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");

    /* Form hook */
    const {
        formData,
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

    /* Fetch on mount */
    useEffect(() => {
        dispatch(
            getAllProjectDiaries(
                selectedProjectId ? { projectId: selectedProjectId } : {}
            )
        );
    }, [dispatch, selectedProjectId]);

    useEffect(() => {
        if (!projects.length) {
            dispatch(getProjects());
        }
    }, [dispatch, projects.length]);

    /* Show toast messages from Redux */
    useEffect(() => {
        if (message) {
            showMessage(message);
            dispatch(clearMessages());
        }
        if (error) {
            showMessage(error, "error");
            dispatch(clearMessages());
        }
    }, [message, error, dispatch]);

    const linkedProject =
        projects.find((project) => project._id === selectedProjectId) || null;

    /* Filter diaries client-side */
    const filteredDiaries = diaries.filter((d) => {
        if (statusFilter !== "all" && d.status !== statusFilter) return false;
        if (priorityFilter !== "all" && d.priority !== priorityFilter) return false;
        if (selectedProjectId && d.projectId !== selectedProjectId) return false;
        return true;
    });

    /* Handlers */
    const handleAdd = () => {
        resetForm();
        setEditing(null);
        setSheetOpen(true);
    };

    const handleEdit = (diary) => {
        populateForm(diary);
        setEditing(diary);
        setSheetOpen(true);
    };

    const handleDelete = async (id) => {
        const ok = await Swal.fire({
            title: "Delete project diary?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });
        if (ok.isConfirmed) {
            dispatch(deleteProjectDiary(id));
        }
    };

    const onSubmit = async (data) => {
        const success = await handleSubmit(
            {
                ...data,
                projectId: selectedProjectId || data.projectId,
            },
            editing?._id
        );
        if (success) {
            setSheetOpen(false);
            resetForm();
            setEditing(null);
        }
    };

    if (loading && diaries.length === 0) {
        return (
            <div className="px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Loading project diaries...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 px-1 py-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="max-w-3xl space-y-2">
                    <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-700">
                        Product Thinking Space
                    </p>
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                        Project diary
                    </h1>
                    <p className="text-sm leading-6 text-slate-600">
                        Keep product notes, status, questions, user flow, features, tags, links, and tech stack in one simple place.
                    </p>
                </div>
            </div>

            {selectedProjectId ? (
                <div className="flex flex-col gap-4 rounded-2xl border border-cyan-200 bg-cyan-50 p-5 shadow-sm md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-800">
                            <FolderKanban className="h-4 w-4" />
                            Linked Project Diary Flow
                        </div>
                        <p className="text-lg font-semibold text-slate-900">
                            {linkedProject?.name || "Selected project"}
                        </p>
                        <p className="text-sm leading-6 text-slate-600">
                            You are working inside the diary space for this project. Any new diary created here will be attached to this project automatically.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/dashboard/projects"
                            className="inline-flex h-10 items-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Projects
                        </Link>
                        <button
                            type="button"
                            onClick={() => router.push("/dashboard/project-diary")}
                            className="inline-flex h-10 items-center rounded-lg bg-cyan-600 px-4 text-sm font-medium text-white hover:bg-cyan-700"
                        >
                            View All Diaries
                        </button>
                    </div>
                </div>
            ) : null}

            {/* Stats */}
            <ProjectDiaryStats diaries={filteredDiaries} />

            {/* Header with Filters */}
            <ProjectDiaryHeader
                onAddDiary={handleAdd}
                diaryCount={filteredDiaries.length}
                statusFilter={statusFilter}
                priorityFilter={priorityFilter}
                onStatusChange={setStatusFilter}
                onPriorityChange={setPriorityFilter}
            />

            {/* Grid or Empty State */}
            {filteredDiaries.length ? (
                <ProjectDiaryGrid
                    diaries={filteredDiaries}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    loading={deleting}
                />
            ) : (
                <ProjectDiaryEmptyState onAddDiary={handleAdd} />
            )}

            {/* Create/Edit Sheet */}
            <ProjectDiarySheet
                open={sheetOpen}
                onOpenChange={setSheetOpen}
                formData={formData}
                errors={errors}
                touched={touched}
                isValid={isValid}
                isSubmitting={creating}
                isEditing={!!editing}
                onChange={handleChange}
                onSelectChange={handleSelectChange}
                onBlur={handleBlur}
                onSubmit={onSubmit}
                onCancel={() => {
                    setSheetOpen(false);
                    resetForm();
                    setEditing(null);
                }}
            />
        </div>
    );
};

export default ProjectDiaryPageClient;
