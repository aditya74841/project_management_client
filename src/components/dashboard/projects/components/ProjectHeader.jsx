"use client";

import React from "react";
import { Filter, Plus, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const statusOptions = [
  { value: "all", label: "All statuses" },
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "archived", label: "Archived" },
];

const ProjectHeader = ({
  projectCount,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onAddProject,
}) => {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-sky-700">
            Project Workspace
          </p>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
              Keep projects lightweight at the start.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Start with a name, then layer in description, deadline, status, and visibility once the project has momentum.
            </p>
          </div>
        </div>

        <Button
          onClick={onAddProject}
          className="h-11 rounded-full bg-[linear-gradient(135deg,#0f172a_0%,#0f766e_55%,#06b6d4_100%)] px-5 text-sm font-semibold text-white shadow-md hover:opacity-95"
        >
          <Plus className="mr-2 h-4 w-4" />
          Quick Create
        </Button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_220px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            placeholder="Search by project name or description"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-11 rounded-2xl border-slate-200 bg-slate-50 pl-11 text-sm shadow-none focus-visible:border-sky-400 focus-visible:ring-4 focus-visible:ring-sky-100"
          />
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4">
          <SlidersHorizontal className="h-4 w-4 text-slate-500" />
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="h-11 w-full bg-transparent text-sm text-slate-700 outline-none"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
        <Filter className="h-4 w-4" />
        Showing {projectCount} project{projectCount === 1 ? "" : "s"} in this view
      </div>
    </div>
  );
};

export default ProjectHeader;
