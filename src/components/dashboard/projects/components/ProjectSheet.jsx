import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
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
}) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent className="w-full max-w-xl sm:w-[640px] bg-white shadow-xl">
      <SheetHeader className="px-6 pt-6">
        <SheetTitle className="text-2xl font-semibold text-gray-800">
          {isEditing ? "Edit Project" : "Add New Project"}
        </SheetTitle>
        <SheetDescription className="text-gray-500">
          {isEditing
            ? "Update project information below"
            : "Fill in the details to create a new project"}
        </SheetDescription>
      </SheetHeader>

      <div className="px-6 py-4">
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

export default ProjectSheet;
