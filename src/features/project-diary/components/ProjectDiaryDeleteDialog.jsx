"use client";

import React from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/**
 * Project Diary Delete Dialog (Zen Prism Edition)
 * A premium confirmation modal for decommissioning engineering perspectives.
 */
const ProjectDiaryDeleteDialog = ({
  open,
  onOpenChange,
  diaryTitle,
  onConfirm,
  isDeleting,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[2rem] border border-border bg-card p-0 shadow-2xl sm:max-w-md overflow-hidden">
        {/* Warning Accent */}
        <div className="h-1.5 w-full bg-rose-600/20">
            <div className="h-full bg-rose-600 animate-pulse w-1/3" />
        </div>

        {/* Hero Icon Area */}
        <div className="flex flex-col items-center px-8 pt-10">
          <div className="flex h-20 w-20 items-center justify-center rounded-[2.5rem] bg-rose-50 dark:bg-rose-500/10 shadow-sm border border-rose-100 dark:border-rose-500/20">
            <AlertTriangle className="h-10 w-10 text-rose-600 animate-bounce-subtle" />
          </div>
        </div>

        <DialogHeader className="px-8 pt-6 text-center">
          <DialogTitle className="text-2xl font-black tracking-tight text-foreground">
            Decommission Entry
          </DialogTitle>
          <DialogDescription className="mt-4 text-sm font-medium leading-6 text-muted-foreground">
            You are about to permanently remove{" "}
            <span className="font-black text-foreground">
              &ldquo;{diaryTitle || "this perspective"}&rdquo;
            </span>{" "}
            from the strategic registry. This action will purge all associated narratives and feature plans.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 px-10 pb-10 pt-8 mt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
            className="h-14 flex-1 rounded-2xl border-border text-xs font-black uppercase tracking-widest text-muted-foreground hover:bg-muted transition-all active:scale-[0.98]"
          >
            Abort
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="h-14 flex-1 rounded-2xl bg-rose-600 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-rose-600/20 transition-all hover:bg-rose-700 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:translate-y-0 group"
          >
            {isDeleting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Purging...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Trash2 size={16} />
                Delete Entry
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDiaryDeleteDialog;
