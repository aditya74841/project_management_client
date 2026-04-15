"use client";

import React from "react";
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Filter, BookOpen } from "lucide-react";
import { Button } from "@/components/ui-core";

const STATUS_OPTIONS = [
    { value: "all", label: "Every State" },
    { value: "idea", label: "Idea / Concept" },
    { value: "scoping", label: "Strategic Scoping" },
    { value: "in-progress", label: "Execution" },
    { value: "completed", label: "Finalized" },
    { value: "archived", label: "Archived" },
];

const PRIORITY_OPTIONS = [
    { value: "all", label: "Any Criticality" },
    { value: "low", label: "Standard" },
    { value: "medium", label: "Critical" },
    { value: "high", label: "Mission Critical" },
];

/**
 * Project Diary Header (Zen Prism Edition)
 * Standardized control bar for registry filtering and entry initialization.
 */
const ProjectDiaryHeader = ({
    onAddDiary,
    diaryCount,
    statusFilter,
    priorityFilter,
    onStatusChange,
    onPriorityChange,
}) => {
    return (
        <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-primary/10 p-3 shadow-sm">
                    <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-foreground tracking-tight leading-tight">Registry Feed</h2>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        {diaryCount} Active Perspective{diaryCount === 1 ? "" : "s"}
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <div className="flex flex-1 sm:flex-initial gap-3">
                    <Select value={statusFilter} onValueChange={onStatusChange}>
                        <SelectTrigger className="h-10 w-full sm:w-[160px] rounded-xl border-border bg-muted/30 font-bold text-xs uppercase tracking-widest text-muted-foreground focus:ring-primary/20">
                           <Filter size={14} className="mr-2" />
                           <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-slate-100 p-2 shadow-xl">
                            {STATUS_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value} className="rounded-xl py-2 font-bold text-[10px] uppercase tracking-widest focus:bg-primary/5 mb-1 last:mb-0">
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={priorityFilter} onValueChange={onPriorityChange}>
                        <SelectTrigger className="h-10 w-full sm:w-[160px] rounded-xl border-border bg-muted/30 font-bold text-xs uppercase tracking-widest text-muted-foreground focus:ring-primary/20">
                            <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-slate-100 p-2 shadow-xl">
                            {PRIORITY_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value} className="rounded-xl py-2 font-bold text-[10px] uppercase tracking-widest focus:bg-primary/5 mb-1 last:mb-0">
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button
                    onClick={onAddDiary}
                    variant="primary"
                    size="md"
                    className="h-10 px-5 gap-2 rounded-xl shadow-lg shadow-primary/10 w-full sm:w-auto font-black text-[11px] uppercase tracking-widest"
                >
                    <Plus className="h-4 w-4" />
                    Initialize Entry
                </Button>
            </div>
        </div>
    );
};

export default ProjectDiaryHeader;
