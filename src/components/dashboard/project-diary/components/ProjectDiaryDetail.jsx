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
} from "lucide-react";
import Swal from "sweetalert2";

import {
    getProjectDiaryById,
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
    clearMessages,
    selectSelectedDiary,
    selectDiaryLoading,
    selectDiaryError,
    selectDiaryMessage,
} from "@/redux/slices/projectDiarySlice";

import { showMessage } from "@/app/utils/showMessage";

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

const ProjectDiaryDetail = ({ diaryId }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const diary = useSelector(selectSelectedDiary);
    const loading = useSelector(selectDiaryLoading);
    const error = useSelector(selectDiaryError);
    const message = useSelector(selectDiaryMessage);

    /* Fetch diary on mount */
    useEffect(() => {
        dispatch(getProjectDiaryById(diaryId));
    }, [dispatch, diaryId]);

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
        dispatch(updateDiaryStatus({ diaryId, status }));
    };

    const handlePriorityChange = (priority) => {
        dispatch(updateDiaryPriority({ diaryId, priority }));
    };

    const handleDelete = async () => {
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
            await dispatch(deleteProjectDiary(diaryId));
            router.push("/project-diary");
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
                    <Button onClick={() => router.push("/project-diary")}>
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-8">
                <div className="flex-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push("/project-diary")}
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

                    <h1 className="text-3xl font-bold">{diary.title}</h1>

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

                    <Button variant="destructive" size="icon" onClick={handleDelete}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                    <FeatureManager diaryId={diaryId} features={diary.features || []} dispatch={dispatch} />
                    <QuestionManager diaryId={diaryId} questions={diary.questions || []} dispatch={dispatch} />
                    <UserFlowManager diaryId={diaryId} userFlows={diary.userFlow || []} dispatch={dispatch} />
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <TechStackManager diaryId={diaryId} techStack={diary.techStack || []} dispatch={dispatch} />
                    <TagManager diaryId={diaryId} tags={diary.tags || []} dispatch={dispatch} />
                    <ReferenceLinksManager diaryId={diaryId} referenceLinks={diary.referenceLinks || []} dispatch={dispatch} />
                </div>
            </div>
        </div>
    );
};

// ─── Question Manager ─────────────────────────────────────────────────────────
const QuestionManager = ({ diaryId, questions, dispatch }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newQuestion, setNewQuestion] = useState({ name: "", answer: "" });
    const [expanded, setExpanded] = useState({});

    const handleAdd = () => {
        if (!newQuestion.name.trim()) return;
        dispatch(addQuestion({ diaryId, name: newQuestion.name.trim(), answer: newQuestion.answer.trim() }));
        setNewQuestion({ name: "", answer: "" });
        setIsAdding(false);
    };

    const handleRemove = (questionId) => {
        dispatch(removeQuestion({ diaryId, questionId }));
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-blue-500" />
                        Questions ({questions.length})
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setIsAdding(!isAdding)}>
                        <Plus className="h-4 w-4 mr-1" />Add
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {isAdding && (
                    <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
                        <Input placeholder="What's your question?" value={newQuestion.name} onChange={(e) => setNewQuestion((p) => ({ ...p, name: e.target.value }))} />
                        <Textarea placeholder="Answer (optional)" value={newQuestion.answer} onChange={(e) => setNewQuestion((p) => ({ ...p, answer: e.target.value }))} rows={2} />
                        <div className="flex gap-2">
                            <Button size="sm" onClick={handleAdd} disabled={!newQuestion.name.trim()}>Add Question</Button>
                            <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                        </div>
                    </div>
                )}
                {questions.length === 0 && !isAdding ? (
                    <p className="text-sm text-muted-foreground text-center py-4">No questions yet.</p>
                ) : (
                    questions.map((q) => (
                        <div key={q._id} className="group p-3 border rounded-lg hover:bg-muted/30">
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                    <button onClick={() => setExpanded((p) => ({ ...p, [q._id]: !p[q._id] }))} className="flex items-center gap-2 text-left font-medium text-sm w-full">
                                        {expanded[q._id] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                        {q.name}
                                    </button>
                                    {expanded[q._id] && q.answer && <p className="mt-2 text-sm text-muted-foreground ml-6">{q.answer}</p>}
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100" onClick={() => handleRemove(q._id)}>
                                    <TrashIcon className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
};

// ─── User Flow Manager ────────────────────────────────────────────────────────
const UserFlowManager = ({ diaryId, userFlows, dispatch }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newFlow, setNewFlow] = useState("");

    const handleAdd = () => {
        if (!newFlow.trim()) return;
        dispatch(addUserFlow({ diaryId, flow: newFlow.trim() }));
        setNewFlow("");
        setIsAdding(false);
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <GitBranch className="h-5 w-5 text-green-500" />
                        User Flows ({userFlows.length})
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setIsAdding(!isAdding)}>
                        <Plus className="h-4 w-4 mr-1" />Add
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {isAdding && (
                    <div className="flex gap-2">
                        <Input placeholder="Describe a user flow step..." value={newFlow} onChange={(e) => setNewFlow(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAdd()} autoFocus />
                        <Button size="sm" onClick={handleAdd} disabled={!newFlow.trim()}>Add</Button>
                        <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                    </div>
                )}
                {userFlows.length === 0 && !isAdding ? (
                    <p className="text-sm text-muted-foreground text-center py-4">No user flows yet.</p>
                ) : (
                    userFlows.map((flow, i) => (
                        <div key={flow._id} className="group flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/30">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium">{i + 1}</div>
                            <p className="flex-1 text-sm">{flow.flow}</p>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100" onClick={() => dispatch(removeUserFlow({ diaryId, flowId: flow._id }))}>
                                <TrashIcon className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
};

// ─── Feature Manager ──────────────────────────────────────────────────────────
const FeatureManager = ({ diaryId, features, dispatch }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newFeature, setNewFeature] = useState({ name: "", description: "", priority: "musthave", status: "pending" });

    const handleAdd = () => {
        if (!newFeature.name.trim()) return;
        dispatch(addFeature({ diaryId, ...newFeature }));
        setNewFeature({ name: "", description: "", priority: "musthave", status: "pending" });
        setIsAdding(false);
    };

    // Toggle completion via status — isCompleted removed from model
    const toggleComplete = (feature) => {
        const newStatus = feature.status === "completed" ? "pending" : "completed";
        dispatch(updateFeatureStatus({ diaryId, featureId: feature._id, status: newStatus }));
    };

    const completedCount = features.filter((f) => f.status === "completed").length;
    const progress = features.length > 0 ? (completedCount / features.length) * 100 : 0;

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Layers className="h-5 w-5 text-purple-500" />
                        Features ({completedCount}/{features.length})
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setIsAdding(!isAdding)}>
                        <Plus className="h-4 w-4 mr-1" />Add
                    </Button>
                </div>
                {features.length > 0 && (
                    <div className="mt-2">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all" style={{ width: `${progress}%` }} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{Math.round(progress)}% complete</p>
                    </div>
                )}
            </CardHeader>
            <CardContent className="space-y-3">
                {isAdding && (
                    <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
                        <Input placeholder="Feature name" value={newFeature.name} onChange={(e) => setNewFeature((p) => ({ ...p, name: e.target.value }))} />
                        <Textarea placeholder="Description (optional)" value={newFeature.description} onChange={(e) => setNewFeature((p) => ({ ...p, description: e.target.value }))} rows={2} />
                        <div className="flex gap-2">
                            <Button size="sm" onClick={handleAdd} disabled={!newFeature.name.trim()}>Add Feature</Button>
                            <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                        </div>
                    </div>
                )}
                {features.length === 0 && !isAdding ? (
                    <p className="text-sm text-muted-foreground text-center py-4">No features yet.</p>
                ) : (
                    features.map((feature) => {
                        const isCompleted = feature.status === "completed";
                        return (
                            <div key={feature._id} className={`group flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/30 ${isCompleted ? "opacity-60" : ""}`}>
                                <Checkbox checked={isCompleted} onCheckedChange={() => toggleComplete(feature)} className="mt-1" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className={`font-medium text-sm ${isCompleted ? "line-through" : ""}`}>{feature.name}</span>
                                        <Badge variant="secondary" className={feature.priority === "musthave" ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"}>
                                            {feature.priority === "musthave" ? "Must Have" : "Nice to Have"}
                                        </Badge>
                                    </div>
                                    {feature.description && <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>}
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100" onClick={() => dispatch(removeFeature({ diaryId, featureId: feature._id }))}>
                                    <TrashIcon className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        );
                    })
                )}
            </CardContent>
        </Card>
    );
};

// ─── Tag Manager ──────────────────────────────────────────────────────────────
const TagManager = ({ diaryId, tags, dispatch }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newTag, setNewTag] = useState("");

    const handleAdd = () => {
        if (!newTag.trim() || tags.includes(newTag.trim())) return;
        dispatch(addTag({ diaryId, tag: newTag.trim() }));
        setNewTag("");
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Tag className="h-5 w-5 text-amber-500" />
                        Tags ({tags.length})
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setIsAdding(!isAdding)}>
                        <Plus className="h-4 w-4 mr-1" />Add
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {isAdding && (
                    <div className="flex gap-2 mb-4">
                        <Input placeholder="Add a tag..." value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAdd()} autoFocus className="max-w-xs" />
                        <Button size="sm" onClick={handleAdd} disabled={!newTag.trim()}>Add</Button>
                        <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                    </div>
                )}
                {tags.length === 0 && !isAdding ? (
                    <p className="text-sm text-muted-foreground text-center py-4">No tags yet.</p>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="px-3 py-1.5 text-sm">
                                {tag}
                                <button onClick={() => dispatch(removeTag({ diaryId, tag }))} className="ml-2 hover:text-destructive">
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

// ─── Reference Links Manager ──────────────────────────────────────────────────
const ReferenceLinksManager = ({ diaryId, referenceLinks, dispatch }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newLink, setNewLink] = useState({ name: "", url: "" });

    const handleAdd = () => {
        if (!newLink.name.trim() || !newLink.url.trim()) return;
        dispatch(addReferenceLink({ diaryId, name: newLink.name.trim(), url: newLink.url.trim() }));
        setNewLink({ name: "", url: "" });
        setIsAdding(false);
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Link2 className="h-5 w-5 text-cyan-500" />
                        Reference Links ({referenceLinks.length})
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setIsAdding(!isAdding)}>
                        <Plus className="h-4 w-4 mr-1" />Add
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {isAdding && (
                    <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
                        <Input placeholder="Link name" value={newLink.name} onChange={(e) => setNewLink((p) => ({ ...p, name: e.target.value }))} />
                        <Input placeholder="https://..." value={newLink.url} onChange={(e) => setNewLink((p) => ({ ...p, url: e.target.value }))} />
                        <div className="flex gap-2">
                            <Button size="sm" onClick={handleAdd} disabled={!newLink.name.trim() || !newLink.url.trim()}>Add Link</Button>
                            <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                        </div>
                    </div>
                )}
                {referenceLinks.length === 0 && !isAdding ? (
                    <p className="text-sm text-muted-foreground text-center py-4">No reference links yet.</p>
                ) : (
                    referenceLinks.map((link) => (
                        <div key={link._id} className="group flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/30">
                            <Link2 className="h-4 w-4 text-muted-foreground" />
                            <div className="flex-1 min-w-0">
                                <a href={link.url} target="_blank" rel="noopener noreferrer" className="font-medium text-sm text-primary hover:underline flex items-center gap-1">
                                    {link.name}<ExternalLink className="h-3 w-3" />
                                </a>
                                <p className="text-xs text-muted-foreground truncate">{link.url}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100" onClick={() => dispatch(removeReferenceLink({ diaryId, linkId: link._id }))}>
                                <TrashIcon className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
};

// ─── Tech Stack Manager ───────────────────────────────────────────────────────
const TechStackManager = ({ diaryId, techStack, dispatch }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newTech, setNewTech] = useState("");

    const getTechColor = (tech) => {
        const t = tech.toLowerCase();
        if (t.includes("react")) return "bg-cyan-500/10 text-cyan-500";
        if (t.includes("next")) return "bg-gray-500/10 text-gray-400";
        if (t.includes("node")) return "bg-green-500/10 text-green-500";
        if (t.includes("mongo")) return "bg-green-600/10 text-green-600";
        if (t.includes("sql") || t.includes("postgres")) return "bg-blue-500/10 text-blue-500";
        if (t.includes("tailwind")) return "bg-teal-500/10 text-teal-500";
        return "bg-violet-500/10 text-violet-500";
    };

    const handleAdd = () => {
        if (!newTech.trim() || techStack.includes(newTech.trim())) return;
        dispatch(addTechStack({ diaryId, tech: newTech.trim() }));
        setNewTech("");
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Code className="h-5 w-5 text-violet-500" />
                        Tech Stack ({techStack.length})
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setIsAdding(!isAdding)}>
                        <Plus className="h-4 w-4 mr-1" />Add
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {isAdding && (
                    <div className="flex gap-2 mb-4">
                        <Input placeholder="Add technology..." value={newTech} onChange={(e) => setNewTech(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAdd()} autoFocus className="max-w-xs" />
                        <Button size="sm" onClick={handleAdd} disabled={!newTech.trim()}>Add</Button>
                        <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                    </div>
                )}
                {techStack.length === 0 && !isAdding ? (
                    <p className="text-sm text-muted-foreground text-center py-4">No tech stack yet.</p>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {techStack.map((tech, i) => (
                            <Badge key={i} variant="secondary" className={`px-3 py-1.5 text-sm ${getTechColor(tech)}`}>
                                {tech}
                                <button onClick={() => dispatch(removeTechStack({ diaryId, tech }))} className="ml-2 hover:text-destructive">
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ProjectDiaryDetail;
