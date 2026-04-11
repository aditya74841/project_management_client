"use client";

import React from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2, Sparkles } from "lucide-react";

/**
 * ProjectDiarySheet
 * 
 * A clean, minimalist drawer for editing project details.
 * Focuses on high data density and distraction-free entry.
 */

const STATUS_OPTIONS = [
    { value: "idea", label: "Idea" },
    { value: "scoping", label: "Scoping" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "archived", label: "Archived" },
];

const PRIORITY_OPTIONS = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
];

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
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-md w-full border-l border-slate-200/50 bg-white/95 backdrop-blur-md p-0 overflow-hidden flex flex-col">
                {/* Header Section */}
                <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-2 text-cyan-600 mb-2">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-xs font-semibold tracking-wider uppercase">Project Details</span>
                    </div>
                    <SheetHeader className="text-left space-y-1">
                        <SheetTitle className="text-2xl font-bold text-slate-900 tracking-tight">
                            {isEditing ? "Refine Entry" : "New Perspective"}
                        </SheetTitle>
                        <p className="text-sm text-slate-500 font-medium">
                            {isEditing
                                ? "Update the core details of your project diary."
                                : "Start documenting a new project journey."}
                        </p>
                    </SheetHeader>
                </div>

                {/* Form Section */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    <form id="project-diary-form" onSubmit={handleSubmit} className="space-y-8">
                        {/* Title - The most important field */}
                        <div className="space-y-3 group">
                            <Label htmlFor="title" className="text-xs font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-cyan-600 transition-colors">
                                Project Title
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="What's this project called?"
                                value={formData.title}
                                onChange={onChange}
                                onBlur={onBlur}
                                className={`h-12 text-lg border-0 border-b-2 rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-cyan-500 transition-all duration-300 ${
                                    touched.title && errors.title ? "border-red-400" : "border-slate-200"
                                }`}
                            />
                            {touched.title && errors.title && (
                                <p className="text-xs text-red-500 font-medium animate-in fade-in slide-in-from-top-1">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Description - Rich Content */}
                        <div className="space-y-3 group">
                            <Label htmlFor="description" className="text-xs font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-cyan-600 transition-colors">
                                Description & Vision
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Paint a picture of what success looks like..."
                                value={formData.description}
                                onChange={onChange}
                                onBlur={onBlur}
                                rows={5}
                                className={`resize-none border-slate-200 focus-visible:ring-1 focus-visible:ring-cyan-500/20 focus-visible:border-cyan-500 transition-all duration-300 ${
                                    touched.description && errors.description ? "border-red-400" : ""
                                }`}
                            />
                            {touched.description && errors.description && (
                                <p className="text-xs text-red-500 font-medium">{errors.description}</p>
                            )}
                        </div>

                        {/* Status & Priority - Split Row */}
                        <div className="grid grid-cols-2 gap-6 pt-2">
                            <div className="space-y-3">
                                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value) => onSelectChange("status", value)}
                                >
                                    <SelectTrigger className="border-slate-200 focus:ring-1 focus:ring-cyan-500/20 focus:border-cyan-500">
                                        <SelectValue placeholder="Current Stage" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {STATUS_OPTIONS.map((opt) => (
                                            <SelectItem key={opt.value} value={opt.value} className="focus:bg-cyan-50 focus:text-cyan-900">
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Priority</Label>
                                <Select
                                    value={formData.priority}
                                    onValueChange={(value) => onSelectChange("priority", value)}
                                >
                                    <SelectTrigger className="border-slate-200 focus:ring-1 focus:ring-cyan-500/20 focus:border-cyan-500">
                                        <SelectValue placeholder="Impact Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {PRIORITY_OPTIONS.map((opt) => (
                                            <SelectItem key={opt.value} value={opt.value} className="focus:bg-cyan-50 focus:text-cyan-900">
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer Section - Fixed at bottom */}
                <div className="p-8 border-t border-slate-100 bg-white shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)]">
                    <div className="flex gap-4">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onCancel}
                            className="flex-1 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                            disabled={isSubmitting}
                        >
                            Discard
                        </Button>
                        <Button
                            type="submit"
                            form="project-diary-form"
                            className="flex-[2] bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/10 active:scale-[0.98] transition-all"
                            disabled={!isValid || isSubmitting}
                        >
                            {isSubmitting ? (
                                <Loader2 className="h-4 w-4 animate-spin text-white/50" />
                            ) : (
                                <span>{isEditing ? "Preserve Changes" : "Create Entry"}</span>
                            )}
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default ProjectDiarySheet;
