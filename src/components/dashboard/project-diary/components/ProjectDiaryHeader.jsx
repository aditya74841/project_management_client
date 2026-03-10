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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                    <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold">Project Diaries</h2>
                    <p className="text-sm text-muted-foreground">
                        {diaryCount} {diaryCount === 1 ? "project" : "projects"}
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={onStatusChange}>
                    <SelectTrigger className="w-[150px]">
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
                    <SelectTrigger className="w-[150px]">
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
                    className="gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                    <Plus className="h-4 w-4" />
                    New Project
                </Button>
            </div>
        </div>
    );
};

export default ProjectDiaryHeader;
