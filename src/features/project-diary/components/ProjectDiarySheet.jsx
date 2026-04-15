"use client";

import React from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { 
    Sparkles, 
    X, 
    Type, 
    AlignLeft, 
    Activity, 
    Target,
    BookOpen
} from "lucide-react";
import { Button, Input, Textarea } from "@/components/ui-core";

const STATUS_OPTIONS = [
    { value: "idea", label: "Idea" },
    { value: "scoping", label: "Scoping" },
    { value: "in-progress", label: "Executing" },
    { value: "completed", label: "Finalized" },
    { value: "archived", label: "Archived" },
];

const PRIORITY_OPTIONS = [
    { value: "low", label: "Standard" },
    { value: "medium", label: "Critical" },
    { value: "high", label: "Mission Critical" },
];

/**
 * Project Diary Sheet (Zen Prism Edition)
 * A premium sidepanel for capturing engineering thought patterns 
 * and documenting registry updates.
 */
const ProjectDiarySheet = ({
    open,
    onOpenChange,
    formData,
    errors,
    touched,
    isValid,
    isSubmitting,
    isEditing,
    onChange,
    onSelectChange,
    onBlur,
    onSubmit,
    onCancel,
    projects = [],
    isProjectFixed = false,
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent 
                className="w-full overflow-y-auto border-l border-border bg-card p-0 shadow-2xl sm:max-w-xl"
            >
                {/* Header Section */}
                <div className="sticky top-0 z-20 border-b border-border bg-card/80 px-10 py-10 backdrop-blur-xl flex justify-between items-center">
                    <SheetHeader className="p-0 text-left">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2.5">
                                <div className="w-10 h-10 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-200 flex items-center justify-center text-white">
                                    <BookOpen size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
                                        {isEditing ? "Registry Core Refinement" : "Strategic Initialization"}
                                    </p>
                                    <SheetTitle className="text-3xl font-black tracking-tight text-slate-900">
                                        {isEditing ? "Edit Entry" : "New Perspective"}
                                    </SheetTitle>
                                </div>
                            </div>
                        </div>
                    </SheetHeader>
                    
                    <button 
                        onClick={onCancel}
                        className="p-3 rounded-2xl bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all active:scale-90"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form Logic */}
                <form id="project-diary-form" onSubmit={handleSubmit} className="px-10 py-12 space-y-10">
                    {!isEditing && (
                        <div className="space-y-2 pb-4">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                                Target Project
                            </label>
                            <Select
                                value={formData.projectId}
                                onValueChange={(value) => onSelectChange("projectId", value)}
                                disabled={isProjectFixed}
                            >
                                <SelectTrigger className="h-14 rounded-[1.5rem] border-border bg-muted/20 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-black text-sm text-foreground">
                                    <SelectValue placeholder="Select Project Node" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-border p-2 shadow-2xl bg-card max-h-[300px]">
                                    {projects.map((p) => (
                                        <SelectItem key={p._id} value={p._id} className="rounded-xl py-3 font-bold text-xs focus:bg-primary/5 focus:text-primary mb-1 last:mb-0">
                                            {p.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.projectId && (
                                <p className="text-[10px] font-bold text-rose-500 ml-1">{errors.projectId}</p>
                            )}
                            {isProjectFixed && (
                                <p className="text-[9px] font-medium text-muted-foreground ml-1 italic">Locked to current project context.</p>
                            )}
                        </div>
                    )}

                    <Input
                        label="Entry Designation"
                        id="title"
                        name="title"
                        placeholder="Define the theme of this perspective..."
                        required
                        value={formData.title}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={touched.title ? errors.title : null}
                        icon={<Type className="w-4 h-4 text-slate-400" />}
                    />

                    <Textarea
                        label="Strategic Narrative"
                        id="description"
                        name="description"
                        placeholder="Document the engineering thought process, identified patterns, or blockers..."
                        value={formData.description}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={touched.description ? errors.description : null}
                        className="min-h-[160px]"
                    />

                    <div className="grid grid-cols-2 gap-6 pt-4">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                                Lifecycle State
                            </label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => onSelectChange("status", value)}
                            >
                                <SelectTrigger className="h-12 rounded-2xl border-border bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-bold text-foreground">
                                    <SelectValue placeholder="Stage" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-border p-2 shadow-xl">
                                    {STATUS_OPTIONS.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value} className="rounded-xl py-2.5 font-bold text-xs uppercase tracking-widest focus:bg-primary/5 focus:text-primary mb-1 last:mb-0">
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                                Criticality
                            </label>
                            <Select
                                value={formData.priority}
                                onValueChange={(value) => onSelectChange("priority", value)}
                            >
                                <SelectTrigger className="h-12 rounded-2xl border-border bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-bold text-foreground">
                                    <SelectValue placeholder="Impact" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-border p-2 shadow-xl">
                                    {PRIORITY_OPTIONS.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value} className="rounded-xl py-2.5 font-bold text-xs uppercase tracking-widest focus:bg-primary/5 focus:text-primary mb-1 last:mb-0">
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Quick Access Actions */}
                    <div className="flex gap-4 pt-10 border-t border-border">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            disabled={isSubmitting}
                            className="flex-1 h-14 font-black text-xs uppercase tracking-widest"
                        >
                            Discard
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={!isValid || isSubmitting}
                            isLoading={isSubmitting}
                            className="flex-[2] h-14 font-black text-xs uppercase tracking-widest group"
                        >
                            {isEditing ? "Sync Perspective" : "Initialize Entry"}
                        </Button>
                    </div>
                </form>

                {/* Perspective Metadata */}
                <div className="px-10 py-8 border-t border-border bg-muted/30">
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="p-2 bg-background rounded-xl shadow-sm border border-border">
                            <Sparkles className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed max-w-sm">
                            Registry entries are version-controlled and immutable once finalized for production parity.
                        </p>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default ProjectDiarySheet;
