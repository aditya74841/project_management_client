"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Target, X, Zap } from "lucide-react";
import ProjectForm from "./ProjectForm";

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
        className="w-full overflow-y-auto border-l border-white/20 bg-white/80 p-0 shadow-2xl backdrop-blur-2xl sm:max-w-2xl animate-in slide-in-from-right duration-500"
      >
        <div className="sticky top-0 z-10 border-b border-indigo-50/50 bg-white/40 px-8 py-10 backdrop-blur-md">
          <SheetHeader className="p-0 text-left">
             <div className="flex items-center gap-2 mb-2">
               <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 animate-pulse">
                 {isEditing ? <Zap size={18} /> : <Target size={18} />}
               </div>
               <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-indigo-500">
                 {isEditing ? "Project Refinement" : "New Initiative"}
               </p>
             </div>
            
            <SheetTitle className="text-3xl font-bold tracking-tight text-slate-900">
              {isEditing ? "Refine Project Details" : "Start a New Project"}
            </SheetTitle>
            <SheetDescription className="mt-3 max-w-lg text-[15px] leading-relaxed text-slate-500 italic">
              {isEditing
                ? "Perfect your project strategy as requirements evolve and your product starts to take its final shape."
                : "Create a focused project shell to begin brainstorming. You can layer in the finer details as you grow."}
            </SheetDescription>
          </SheetHeader>
        </div>

        <div className="px-8 py-10">
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
      </SheetContent>
    </Sheet>
  );
};

export default ProjectSheet;
