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
      <DialogContent className="rounded-[28px] border border-border bg-card p-0 shadow-2xl sm:max-w-md">
        {/* Warning icon area */}
        <div className="flex flex-col items-center px-8 pt-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-destructive/10 shadow-inner">
            <AlertTriangle className="h-8 w-8 text-destructive animate-pulse" />
          </div>
        </div>

        <DialogHeader className="px-8 pt-4 text-center">
          <DialogTitle className="text-2xl font-bold tracking-tight text-foreground">
            Delete Project
          </DialogTitle>
          <DialogDescription className="mt-3 text-sm leading-6 text-muted-foreground">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
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
            className="h-12 flex-1 rounded-2xl border-border text-sm font-bold text-muted-foreground hover:bg-muted transition-all"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="h-12 flex-1 rounded-2xl bg-destructive text-sm font-bold text-destructive-foreground shadow-lg shadow-destructive/20 transition-all hover:bg-destructive/90 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:translate-y-0"
          >
            {isDeleting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
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
