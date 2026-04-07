"use client";

import React from "react";
import { FolderPlus, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

const EmptyState = ({ onAddProject }) => (
  <div className="rounded-[32px] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] bg-slate-100">
      <FolderPlus className="h-10 w-10 text-slate-700" />
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
      className="mt-8 h-12 rounded-full bg-[linear-gradient(135deg,#0f172a_0%,#0f766e_55%,#06b6d4_100%)] px-6 text-sm font-semibold text-white shadow-md hover:opacity-95"
    >
      <Sparkles className="mr-2 h-4 w-4" />
      Create Your First Project
    </Button>
  </div>
);

export default EmptyState;
