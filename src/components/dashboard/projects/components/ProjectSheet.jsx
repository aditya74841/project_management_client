// import React from "react";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetDescription,
// } from "@/components/ui/sheet";
// import ProjectForm from "./ProjectForm";
// import ProjectMemberPanel from "./ProjectMemberPanel";

// const ProjectSheet = ({
//   open,
//   onOpenChange,
//   formData,
//   errors,
//   touched,
//   isValid,
//   isSubmitting,
//   isEditing,
//   onChange,
//   onBlur,
//   onSubmit,
//   onCancel,
// }) => (
//   <Sheet open={open} onOpenChange={onOpenChange}>
//     <SheetContent className="w-full max-w-xl sm:w-[640px] bg-white shadow-xl">
//       <SheetHeader className="px-6 pt-6">
//         <SheetTitle className="text-2xl font-semibold text-gray-800">
//           {isEditing ? "Edit Project" : "Add New Project"}
//         </SheetTitle>
//         <SheetDescription className="text-gray-500">
//           {isEditing
//             ? "Update project information below"
//             : "Fill in the details to create a new project"}
//         </SheetDescription>
//       </SheetHeader>

//       <div className="px-6 py-4">
//         <ProjectForm
//           formData={formData}
//           errors={errors}
//           touched={touched}
//           isValid={isValid}
//           isSubmitting={isSubmitting}
//           isEditing={isEditing}
//           onChange={onChange}
//           onBlur={onBlur}
//           onSubmit={onSubmit}
//           onCancel={onCancel}
//         />
//       </div>
//     </SheetContent>
//     <ProjectMemberPanel projectId={formData.id} />
//   </Sheet>
// );

// export default ProjectSheet;


"use client";

import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import ProjectForm from "./ProjectForm";
import ProjectMemberPanel from "./ProjectMemberPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [tabValue, setTabValue] = useState("projectForm");

  // Automatically switch to Members tab when editing an existing project
  useEffect(() => {
    if (isEditing) {
      setTabValue("members");
    } else {
      setTabValue("projectForm");
    }
  }, [isEditing]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full max-w-xl sm:w-[640px] bg-white shadow-xl">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className="text-2xl font-semibold text-gray-800">
            {isEditing ? "Edit Project" : "Add New Project"}
          </SheetTitle>
          <SheetDescription className="text-gray-500">
            {isEditing
              ? "Manage project and members"
              : "Fill in the project details"}
          </SheetDescription>
        </SheetHeader>

        <div className="px-6 py-4">
          <Tabs value={tabValue} onValueChange={setTabValue}>
            <TabsList>
              <TabsTrigger value="projectForm">Project</TabsTrigger>
              <TabsTrigger value="members" disabled={!isEditing}>
                Members
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projectForm">
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
            </TabsContent>

            <TabsContent value="members">
              {isEditing ? (
                <ProjectMemberPanel projectId={formData.id || formData._id} />
              ) : (
                <p className="text-gray-500 text-center py-10">
                  Create the project first to manage members.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProjectSheet;
