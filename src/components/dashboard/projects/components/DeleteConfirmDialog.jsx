"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteConfirmDialog = ({
  open,
  onOpenChange,
  projectName,
  onConfirm,
  isDeleting,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[28px] border-0 bg-white p-0 shadow-2xl sm:max-w-md">
        {/* Warning icon area */}
        <div className="flex flex-col items-center px-8 pt-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-red-50 shadow-inner">
            <AlertTriangle className="h-8 w-8 text-red-500 animate-pulse" />
          </div>
        </div>

        <DialogHeader className="px-8 pt-4 text-center">
          <DialogTitle className="text-2xl font-bold tracking-tight text-slate-900">
            Delete Project
          </DialogTitle>
          <DialogDescription className="mt-3 text-sm leading-6 text-slate-500">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-slate-900">
              &ldquo;{projectName}&rdquo;
            </span>
            ? This will permanently remove the project and all associated features.
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-3 px-8 pb-8 pt-4 sm:justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
            className="h-12 flex-1 rounded-2xl border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="h-12 flex-1 rounded-2xl bg-red-600 text-sm font-bold text-white shadow-lg shadow-red-200 transition-all hover:bg-red-700 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:translate-y-0"
          >
            {isDeleting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Deleting...
              </div>
            ) : (
              "Yes, Delete Project"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
