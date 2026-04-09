"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Filter, BookOpen } from "lucide-react";

const STATUS_OPTIONS = [
    { value: "all", label: "All Statuses" },
    { value: "idea", label: "Idea" },
    { value: "scoping", label: "Scoping" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "archived", label: "Archived" },
];

const PRIORITY_OPTIONS = [
    { value: "all", label: "All Priorities" },
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
];

const ProjectDiaryHeader = ({
    onAddDiary,
    diaryCount,
    statusFilter,
    priorityFilter,
    onStatusChange,
    onPriorityChange,
}) => {
    return (
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
                <div className="rounded-lg bg-cyan-50 p-2">
                    <BookOpen className="h-5 w-5 text-cyan-700" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold">Project Diaries</h2>
                    <p className="text-sm text-muted-foreground">
                        {diaryCount} {diaryCount === 1 ? "diary" : "diaries"}
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={onStatusChange}>
                    <SelectTrigger className="w-[150px] bg-white">
                        <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
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

                {/* Priority Filter */}
                <Select value={priorityFilter} onValueChange={onPriorityChange}>
                    <SelectTrigger className="w-[150px] bg-white">
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

                {/* Add Button */}
                <Button
                    onClick={onAddDiary}
                    className="gap-2 bg-cyan-600 text-white hover:bg-cyan-700"
                >
                    <Plus className="h-4 w-4" />
                    New Diary
                </Button>
            </div>
        </div>
    );
};

export default ProjectDiaryHeader;
