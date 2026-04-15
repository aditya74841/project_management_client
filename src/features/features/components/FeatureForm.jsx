"use client";

import React from "react";
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { 
    Plus, 
    Type, 
    AlignLeft, 
    Zap, 
    Calendar, 
    Tag, 
    AlertCircle,
    CheckCircle2,
    Clock,
    Box
} from "lucide-react";
import { Button, Input, Textarea } from "@/components/ui-core";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS = [
    { value: "pending", label: "Registry Pending" },
    { value: "in-progress", label: "Actively Executing" },
    { value: "completed", label: "Production Ready" },
    { value: "archived", label: "Archived" },
];

const PRIORITY_OPTIONS = [
    { value: "low", label: "Standard Utility" },
    { value: "medium", label: "Strategic Priority" },
    { value: "high", label: "Critical Milestone" },
    { value: "urgent", label: "Mission Critical" },
];

/**
 * Feature Construction Form (Zen Prism Edition)
 * A standardized engineering form for defining technical milestones.
 * Focused on rigorous data capture and strategic alignment.
 */
const FeatureForm = ({
    formData,
    errors,
    touched,
    isValid,
    isSubmitting,
    isEditing,
    onChange,
    onBlur,
    onSubmit,
    onCancel,
    onTagsChange,
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form id="feature-management-form" onSubmit={handleSubmit} className="space-y-10">
            {/* Core Identification */}
            <Input
                label="Milestone Designation"
                id="title"
                name="title"
                placeholder="Name of the technical feature..."
                required
                value={formData.title}
                onChange={onChange}
                onBlur={onBlur}
                error={touched.title ? errors.title : null}
                icon={<Type className="w-4 h-4 text-slate-400" />}
                className="h-14 text-sm"
            />

            <div className="grid md:grid-cols-1 gap-8">
                <Textarea
                    label="Technical Vision"
                    id="description"
                    name="description"
                    placeholder="Describe the architectural goals and implementation strategy..."
                    value={formData.description}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={touched.description ? errors.description : null}
                    className="min-h-[160px]"
                />
            </div>

            {/* Registry Metadata */}
            <div className={cn("grid gap-8 pt-4", isEditing ? "grid-cols-1" : "grid-cols-3")}>
                {!isEditing && (
                   <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                           Criticality
                       </label>
                       <Select
                           value={formData.priority}
                           onValueChange={(v) => onChange({ target: { name: "priority", value: v } })}
                       >
                           <SelectTrigger className="h-14 rounded-2xl border-2 border-slate-100 bg-white font-bold text-slate-700 focus:ring-4 focus:ring-primary/5 transition-all">
                               <SelectValue placeholder="Impact" />
                           </SelectTrigger>
                           <SelectContent className="rounded-2xl border-slate-100 p-2 shadow-2xl">
                               {PRIORITY_OPTIONS.map((opt) => (
                                   <SelectItem key={opt.value} value={opt.value} className="rounded-xl py-3 font-bold text-[10px] uppercase tracking-widest focus:bg-primary/5 focus:text-primary mb-1 last:mb-0">
                                       {opt.label}
                                   </SelectItem>
                               ))}
                           </SelectContent>
                       </Select>
                   </div>
                )}

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                        Target Deadline
                    </label>
                    <Input
                        id="deadline"
                        name="deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={touched.deadline ? errors.deadline : null}
                        className="h-14 font-bold text-slate-700 border-2"
                    />
                </div>

                {!isEditing && (
                   <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                           Status Registry
                       </label>
                       <Select
                           value={formData.status}
                           onValueChange={(v) => onChange({ target: { name: "status", value: v } })}
                           disabled={!isEditing}
                       >
                           <SelectTrigger className="h-14 rounded-2xl border-2 border-slate-100 bg-white font-bold text-slate-700 focus:ring-4 focus:ring-primary/5 transition-all disabled:bg-slate-50 disabled:text-slate-400">
                               <SelectValue placeholder="Phase" />
                           </SelectTrigger>
                           <SelectContent className="rounded-2xl border-slate-100 p-2 shadow-2xl">
                               {STATUS_OPTIONS.map((opt) => (
                                   <SelectItem key={opt.value} value={opt.value} className="rounded-xl py-3 font-bold text-[10px] uppercase tracking-widest focus:bg-primary/5 focus:text-primary mb-1 last:mb-0">
                                       {opt.label}
                                   </SelectItem>
                               ))}
                           </SelectContent>
                       </Select>
                   </div>
                )}
            </div>

            {/* Categorization Tags */}
            {!isEditing && (
               <div className="space-y-3 pt-4">
                   <Input
                       label="Categorization Registry (Tags)"
                       id="tags"
                       name="tags"
                       value={Array.isArray(formData.tags) ? formData.tags.join(", ") : ""}
                       onChange={onTagsChange}
                       onBlur={onBlur}
                       placeholder="e.g. backend, architecture, api..."
                       icon={<Tag className="w-4 h-4 text-slate-400" />}
                       className="h-14"
                   />
                   <div className="flex items-center gap-4 px-1">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                          Separate with commas for decentralized indexing.
                      </p>
                      {formData.tags?.length > 0 && (
                         <div className="flex gap-2">
                            {formData.tags.map((t, idx) => (
                               <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-[8px] font-black uppercase text-slate-500 tracking-tighter">
                                  {t}
                               </span>
                            ))}
                         </div>
                      )}
                   </div>
               </div>
            )}

            {/* Formal Action Registry */}
            <div className="flex gap-4 pt-10 border-t border-slate-50">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="flex-1 h-16 font-black text-[11px] uppercase tracking-widest rounded-3xl"
                >
                    Discard Changes
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    disabled={!isValid || isSubmitting}
                    isLoading={isSubmitting}
                    className="flex-[2] h-16 font-black text-[11px] uppercase tracking-widest rounded-3xl group"
                >
                    {isEditing ? "Synchronize Registry Entry" : "Initialize Feature Hub"}
                </Button>
            </div>
            
            <div className="flex items-center justify-center pt-2">
               <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 animate-pulse">
                  <Box size={14} />
                  System Integrated Entry Pattern
               </div>
            </div>
        </form>
    );
};

export default FeatureForm;
