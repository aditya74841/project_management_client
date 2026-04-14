"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Target, X, Zap } from "lucide-react";
import ProjectForm from "./ProjectForm";

/**
 * Project Sheet (Zen Prism Edition)
 * Standardized side panel for project creation and lifecycle updates.
 */
const ProjectSheet = ({
  open,
  onOpenChange,
  formData,
  errors,
  touched,
  isValid,
  isSubmitting,
  isEditing,
  onChange,
  onBlur,
  onSubmit,
  onCancel,
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        className="w-full overflow-y-auto border-l border-border bg-background p-0 shadow-2xl sm:max-w-3xl"
      >
        {/* Header Section */}
        <div className="sticky top-0 z-20 border-b border-border bg-background/80 px-10 py-10 backdrop-blur-xl flex justify-between items-center">
          <SheetHeader className="p-0 text-left">
             <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-primary shadow-lg shadow-primary/20 flex items-center justify-center text-white">
                    {isEditing ? <Zap size={18} /> : <Target size={18} />}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                      {isEditing ? "Registry Core Update" : "System Initialization"}
                    </p>
                    <SheetTitle className="text-3xl font-black tracking-tight text-foreground">
                      {isEditing ? "Edit Metadata" : "New Project"}
                    </SheetTitle>
                  </div>
                </div>
             </div>
          </SheetHeader>
          
          <button 
            onClick={onCancel}
            className="p-3 rounded-2xl bg-muted text-muted-foreground hover:text-foreground hover:bg-accent transition-all active:scale-90"
          >
            <X size={24} />
          </button>
        </div>

        {/* Narrative & Form Content */}
        <div className="px-10 py-12">
          <ProjectForm
            formData={formData}
            errors={errors}
            touched={touched}
            isValid={isValid}
            isSubmitting={isSubmitting}
            isEditing={isEditing}
            onChange={onChange}
            onBlur={onBlur}
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
        </div>

        {/* Informational Footer */}
        <div className="px-10 py-8 border-t border-border bg-muted/50">
           <div className="flex items-center gap-4 text-muted-foreground">
              <div className="p-2 bg-card rounded-xl shadow-sm">
                 <Target className="w-4 h-4" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed max-w-sm">
                 All project updates are instantly synchronized across the network and mirrored in active embedded panels.
              </p>
           </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProjectSheet;
