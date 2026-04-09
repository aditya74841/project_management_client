"use client";

import React from "react";
import { FolderPlus, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

const EmptyState = ({ onAddProject }) => (
  <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50">
      <FolderPlus className="h-8 w-8 text-cyan-700" />
    </div>
    <div className="mx-auto mt-6 max-w-xl space-y-3">
      <h3 className="text-3xl font-semibold tracking-tight text-slate-900">
        Start with just a project name.
      </h3>
      <p className="text-sm leading-7 text-slate-600">
        You do not need to fill everything up front anymore. Create the project shell now, then
        return later for description, deadlines, visibility, and the rest.
      </p>
    </div>
    <Button
      onClick={onAddProject}
      className="mt-8 h-11 rounded-lg bg-cyan-600 px-6 text-sm font-semibold text-white hover:bg-cyan-700"
    >
      <Sparkles className="mr-2 h-4 w-4" />
      Create Your First Project
    </Button>
  </div>
);

export default EmptyState;
