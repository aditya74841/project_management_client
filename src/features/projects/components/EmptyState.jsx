"use client";

import React from "react";
import { FolderPlus, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

const EmptyState = ({ onAddProject }) => (
  <div className="rounded-2xl border-2 border-dashed border-border bg-card p-12 text-center shadow-sm animate-in fade-in zoom-in-95 duration-500">
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
      <FolderPlus className="h-8 w-8 text-primary" />
    </div>
    <div className="mx-auto mt-6 max-w-sm space-y-2">
      <h3 className="text-xl font-bold tracking-tight text-foreground">
        No active projects found
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Initialize your first project instance to begin tracking features, activities, and development diaries.
      </p>
    </div>
    <Button
      onClick={onAddProject}
      className="mt-8 h-10 rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20"
    >
      <Sparkles className="mr-2 h-4 w-4" />
      Initialize Project
    </Button>
  </div>
);

export default EmptyState;
