"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    ArrowLeft,
    Lightbulb,
    Target,
    Zap,
    CheckCircle2,
    Archive,
    Calendar,
    Trash2,
    Plus,
    Trash2 as TrashIcon,
    HelpCircle,
    GitBranch,
    Layers,
    Tag,
    Link2,
    Code,
    ChevronDown,
    ChevronUp,
    X,
    ExternalLink,
    Pencil,
    Settings
} from "lucide-react";
import Swal from "sweetalert2";
import { showMessage } from "@/app/utils/showMessage";

// Manager Components
import FeatureManager from "./managers/FeatureManager";
import QuestionManager from "./managers/QuestionManager";
import UserFlowManager from "./managers/UserFlowManager";
import TagManager from "./managers/TagManager";
import TechStackManager from "./managers/TechStackManager";
import ReferenceLinksManager from "./managers/ReferenceLinksManager";

import {
    getProjectDiaryById,
    getOrCreateDiaryForProject,
    deleteProjectDiary,
    updateDiaryStatus,
    updateDiaryPriority,
    addQuestion,
    removeQuestion,
    addUserFlow,
    removeUserFlow,
    addFeature,
    removeFeature,
    updateFeatureStatus,
    addTag,
    removeTag,
    addReferenceLink,
    removeReferenceLink,
    addTechStack,
    removeTechStack,
    updateProjectDiary,
    clearMessages,
    selectSelectedDiary,
    selectDiaryLoading,
    selectDiaryUpdating,
    selectDiaryError,
    selectDiaryMessage,
} from "@/redux/slices/projectDiarySlice";

import { useProjectDiaryForm } from "../hooks/useProjectDiaryForm";
import ProjectDiarySheet from "./ProjectDiarySheet";

const STATUS_OPTIONS = [
    { value: "idea", label: "Idea", icon: Lightbulb, color: "text-purple-500" },
    { value: "scoping", label: "Scoping", icon: Target, color: "text-blue-500" },
    { value: "in-progress", label: "In Progress", icon: Zap, color: "text-amber-500" },
    { value: "completed", label: "Completed", icon: CheckCircle2, color: "text-green-500" },
    { value: "archived", label: "Archived", icon: Archive, color: "text-gray-500" },
];

const PRIORITY_OPTIONS = [
    { value: "low", label: "Low", color: "bg-green-500/10 text-green-500" },
    { value: "medium", label: "Medium", color: "bg-amber-500/10 text-amber-500" },
    { value: "high", label: "High", color: "bg-red-500/10 text-red-500" },
];

const ProjectDiaryDetail = ({ projectId, basePath = "/dashboard/projects" }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const diary = useSelector(selectSelectedDiary);
    const loading = useSelector(selectDiaryLoading);
    const updating = useSelector(selectDiaryUpdating);
    const error = useSelector(selectDiaryError);
    const message = useSelector(selectDiaryMessage);

    const [editSheetOpen, setEditSheetOpen] = useState(false);

    const {
        formData,
        errors,
        touched,
        isValid,
        handleChange,
        handleSelectChange,
        handleBlur,
        handleSubmit,
        populateForm,
        resetForm,
    } = useProjectDiaryForm();

    /* Fetch diary on mount */
    useEffect(() => {
        if (projectId) {
            dispatch(getOrCreateDiaryForProject(projectId));
        }
    }, [dispatch, projectId]);

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

    const handleStatusChange = (status) => {
        if (!diary) return;
        dispatch(updateDiaryStatus({ diaryId: diary._id, status }));
    };

    const handlePriorityChange = (priority) => {
        if (!diary) return;
        dispatch(updateDiaryPriority({ diaryId: diary._id, priority }));
    };

    const handleDelete = async () => {
        if (!diary) return;
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
            await dispatch(deleteProjectDiary(diary._id));
            router.push(basePath);
        }
    };

    const handleEdit = () => {
        if (!diary) return;
        populateForm(diary);
        setEditSheetOpen(true);
    };

    const onFormSubmit = async (data) => {
        const success = await handleSubmit(data, diary._id);
        if (success) {
            setEditSheetOpen(false);
        }
    };

    if (loading && !diary) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Loading project diary...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!diary) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-16">
                    <h2 className="text-xl font-semibold mb-2">Project Diary Not Found</h2>
                    <p className="text-muted-foreground mb-4">
                        The project diary you're looking for doesn't exist or has been deleted.
                    </p>
                    <Button onClick={() => router.push(basePath)}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Project Diaries
                    </Button>
                </div>
            </div>
        );
    }

    const statusConfig = STATUS_OPTIONS.find((s) => s.value === diary.status) || STATUS_OPTIONS[0];
    const StatusIcon = statusConfig.icon;

    return (
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                <div className="flex-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(basePath)}
                        className="mb-4"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>

                    <div className="flex items-center gap-3 flex-wrap mb-2">
                        <Badge
                            variant="outline"
                            className={`${statusConfig.color} border-current/30 bg-current/5`}
                        >
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig.label}
                        </Badge>
                        {diary.priority && (
                            <Badge
                                variant="secondary"
                                className={PRIORITY_OPTIONS.find((p) => p.value === diary.priority)?.color}
                            >
                                {diary.priority.charAt(0).toUpperCase() + diary.priority.slice(1)} Priority
                            </Badge>
                        )}
                    </div>

                    <h1 className="text-3xl font-bold text-slate-900">{diary.title}</h1>

                    {diary.description && (
                        <p className="text-muted-foreground mt-2 max-w-2xl">
                            {diary.description}
                        </p>
                    )}

                    <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Created {new Date(diary.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-wrap">
                    <Select value={diary.status} onValueChange={handleStatusChange}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {STATUS_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={diary.priority} onValueChange={handlePriorityChange}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                            {PRIORITY_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button variant="outline" size="sm" onClick={handleEdit} className="border-cyan-200 text-cyan-700 hover:bg-cyan-50">
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Details
                    </Button>

                    <Button variant="destructive" size="icon" onClick={handleDelete}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                    <FeatureManager diaryId={diary._id} features={diary.features || []} />
                    <QuestionManager diaryId={diary._id} questions={diary.questions || []} />
                    <UserFlowManager diaryId={diary._id} userFlows={diary.userFlow || []} />
                </div>
                
                {/* Right Column */}
                <div className="space-y-6">
                    <TechStackManager diaryId={diary._id} techStack={diary.techStack || []} />
                    <TagManager diaryId={diary._id} tags={diary.tags || []} />
                    <ReferenceLinksManager diaryId={diary._id} referenceLinks={diary.referenceLinks || []} />
                </div>

            </div>

            {/* Edit Sheet */}
            <ProjectDiarySheet
                open={editSheetOpen}
                onOpenChange={setEditSheetOpen}
                formData={formData}
                errors={errors}
                touched={touched}
                isValid={isValid}
                isSubmitting={updating}
                isEditing={true}
                onChange={handleChange}
                onSelectChange={handleSelectChange}
                onBlur={handleBlur}
                onSubmit={onFormSubmit}
                onCancel={() => setEditSheetOpen(false)}
            />
        </div>
    );
};

export default ProjectDiaryDetail;
