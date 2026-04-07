"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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
      <SheetContent className="w-full overflow-y-auto border-0 bg-[linear-gradient(180deg,_#f8fbff_0%,_#eef6ff_44%,_#ffffff_100%)] p-0 shadow-2xl sm:max-w-2xl">
        <div className="border-b border-slate-200/80 px-6 py-6">
          <SheetHeader className="p-0">
            <SheetTitle className="text-2xl font-semibold tracking-tight text-slate-900">
              {isEditing ? "Refine project" : "Start a new project"}
            </SheetTitle>
            <SheetDescription className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
              {isEditing
                ? "Update the project details when the structure becomes clearer."
                : "Give the project a clear name now. Everything else can be added after the shell exists."}
            </SheetDescription>
          </SheetHeader>
        </div>

        <div className="px-6 py-6">
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
