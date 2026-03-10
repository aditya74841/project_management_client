"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import ProjectDiaryHeader from "./ProjectDiaryHeader";
import ProjectDiaryStats from "./ProjectDiaryStats";
import ProjectDiaryGrid from "./ProjectDiaryGrid";
import ProjectDiarySheet from "./ProjectDiarySheet";
import ProjectDiaryEmptyState from "./ProjectDiaryEmptyState";

import { useProjectDiaryForm } from "../hooks/useProjectDiaryForm";
import { showMessage } from "@/app/utils/showMessage";

import {
    getAllProjectDiaries,
    createProjectDiary,
    deleteProjectDiary,
    clearMessages,
    selectDiaries,
    selectDiaryLoading,
    selectDiaryCreating,
    selectDiaryDeleting,
    selectDiaryError,
    selectDiaryMessage,
} from "@/redux/slices/projectDiarySlice";

const ProjectDiaryPageClient = () => {
    const dispatch = useDispatch();

    /* Redux state */
    const diaries = useSelector(selectDiaries);
    const loading = useSelector(selectDiaryLoading);
    const creating = useSelector(selectDiaryCreating);
    const deleting = useSelector(selectDiaryDeleting);
    const error = useSelector(selectDiaryError);
    const message = useSelector(selectDiaryMessage);

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
        resetForm,
    } = useProjectDiaryForm();

    /* Fetch on mount */
    useEffect(() => {
        dispatch(getAllProjectDiaries());
    }, [dispatch]);

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

    /* Filter diaries client-side */
    const filteredDiaries = diaries.filter((d) => {
        if (statusFilter !== "all" && d.status !== statusFilter) return false;
        if (priorityFilter !== "all" && d.priority !== priorityFilter) return false;
        return true;
    });

    /* Handlers */
    const handleAdd = () => {
        resetForm();
        setEditing(null);
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
        const result = await dispatch(
            createProjectDiary({
                title: data.title,
                description: data.description || "",
                status: data.status || "idea",
                priority: data.priority || "medium",
            })
        );

        if (!result.error) {
            setSheetOpen(false);
            resetForm();
            setEditing(null);
        }
    };

    if (loading && diaries.length === 0) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats */}
            <ProjectDiaryStats diaries={diaries} />

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
