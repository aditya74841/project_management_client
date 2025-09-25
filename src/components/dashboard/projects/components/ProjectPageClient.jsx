// "use client";

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import ProjectHeader from "./ProjectHeader";
// import ProjectTable from "./ProjectTable";
// import ProjectSheet from "./ProjectSheet";
// import LoadingState from "../../companies/components/LoadingState";
// import EmptyState   from "../../companies/components/EmptyState";
// import { useProjectForm } from "../hooks/useProjectForm";
// import {
//   deleteProject,
//   toggleProjectVisibility,
//   clearMessages,
//   selectProjects,
//   selectProjectLoading,
//   selectProjectCreating,
//   selectProjectUpdating,
//   selectProjectDeleting,
//   selectProjectMessage,
//   selectProjectError,
// } from "../../../../redux/slices/projectSlice";
// import { showMessage } from "@/app/utils/showMessage";

// const ProjectPageClient = () => {
//   const dispatch  = useDispatch();
//   const projects  = useSelector(selectProjects);
//   const loading   = useSelector(selectProjectLoading);
//   const creating  = useSelector(selectProjectCreating);
//   const updating  = useSelector(selectProjectUpdating);
//   const deleting  = useSelector(selectProjectDeleting);
//   const error     = useSelector(selectProjectError);
//   const message   = useSelector(selectProjectMessage);

//   const [sheetOpen, setSheetOpen]   = useState(false);
//   const [editing,   setEditing]     = useState(null);

//   const {
//     formData,
//     setFormData,
//     errors,
//     touched,
//     isValid,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//     resetForm,
//   } = useProjectForm();

//   /* feedback */
//   useEffect(() => {
//     if (message) { showMessage(message);    dispatch(clearMessages()); }
//     if (error)   { showMessage(error,"error"); dispatch(clearMessages()); }
//   }, [message, error, dispatch]);

//   /* handlers */
//   const handleAdd = () => { resetForm(); setEditing(null); setSheetOpen(true); };

//   const handleEdit = (p) => {
//     setFormData({
//       name: p.name || "",
//       description: p.description || "",
//       deadline: p.deadline ? p.deadline.split("T")[0] : "",
//       status: p.status || "active",
//     });
//     setEditing(p);
//     setSheetOpen(true);
//   };

//   const handleDelete = async (id) => {
//     const ok = await Swal.fire({
//       title:"Delete project?",
//       text:"This action cannot be undone.",
//       icon:"warning",
//       showCancelButton:true,
//       confirmButtonColor:"#d33",
//       cancelButtonColor:"#3085d6",
//       confirmButtonText:"Yes, delete it!",
//     });
//     if (ok.isConfirmed) dispatch(deleteProject(id));
//   };

//   const handleToggle = (id) => dispatch(toggleProjectVisibility(id));

//   const onSubmit = async (data) => {
//     const ok = await handleSubmit(data, editing?._id);
//     if (ok) { setSheetOpen(false); resetForm(); setEditing(null); }
//   };

//   if (loading && !projects.length) return <LoadingState />;

//   return (
//     <div className="space-y-6">
//       <ProjectHeader onAddProject={handleAdd} />

//       {projects.length ? (
//         <ProjectTable
//           projects={projects}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//           onToggle={handleToggle}
//           loading={deleting}
//         />
//       ) : (
//         <EmptyState onAddCompany={handleAdd} />
//       )}

//       <ProjectSheet
//         open={sheetOpen}
//         onOpenChange={setSheetOpen}
//         formData={formData}
//         errors={errors}
//         touched={touched}
//         isValid={isValid}
//         isSubmitting={creating || updating}
//         isEditing={!!editing}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         onSubmit={onSubmit}
//         onCancel={() => { setSheetOpen(false); resetForm(); setEditing(null); }}
//       />
//     </div>
//   );
// };

// export default ProjectPageClient;

"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import ProjectHeader from "./ProjectHeader";
import ProjectTable from "./ProjectTable";
import ProjectSheet from "./ProjectSheet";

import { useProjectForm } from "../hooks/useProjectForm";
import {
  getProjects, // NEW  ⟵
  deleteProject,
  toggleProjectVisibility,
  clearMessages,
  selectProjects,
  selectProjectLoading,
  selectProjectCreating,
  selectProjectUpdating,
  selectProjectDeleting,
  selectProjectMessage,
  selectProjectError,
} from "../../../../redux/slices/projectSlice";

import { showMessage } from "@/app/utils/showMessage";
import EmptyState from "../../EmptyState";
import LoadingState from "../../LoadingState";

const ProjectPageClient = () => {
  const dispatch = useDispatch();

  /* Redux state */
  const projects = useSelector(selectProjects);
  const loading = useSelector(selectProjectLoading);
  const creating = useSelector(selectProjectCreating);
  const updating = useSelector(selectProjectUpdating);
  const deleting = useSelector(selectProjectDeleting);
  const error = useSelector(selectProjectError);
  const message = useSelector(selectProjectMessage);

  /* Local state */
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  /* Form hook */
  const {
    formData,
    setFormData,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useProjectForm();

  /* -------- FETCH LIST ON FIRST MOUNT -------- */
  useEffect(() => {
    if (!projects.length) dispatch(getProjects());
  }, [dispatch, projects.length]);

  /* -------- Toast feedback -------- */
  useEffect(() => {
    if (message) {
      showMessage(message);
      dispatch(clearMessages());
    }
    if (error) {
      showMessage(error, "error");
      dispatch(clearMessages());
    }
  }, [message, error, dispatch]);

  /* handlers (add/edit/delete/toggle) — unchanged */
  const handleAdd = () => {
    resetForm();
    setEditing(null);
    setSheetOpen(true);
  };

  const handleEdit = (p) => {
    // console.log("The p is", p);
    setFormData({
      id: p._id,
      name: p.name || "",
      description: p.description || "",
      deadline: p.deadline ? p.deadline.split("T")[0] : "",
      status: p.status || "active",
    });
    setEditing(p);
    setSheetOpen(true);
  };

  const handleDelete = async (id) => {
    const ok = await Swal.fire({
      title: "Delete project?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (ok.isConfirmed) dispatch(deleteProject(id));
  };

  const handleToggle = (id) => dispatch(toggleProjectVisibility(id));

  const onSubmit = async (data) => {
    // console.log("The data is ", data);
    const ok = await handleSubmit(data, editing?._id);
    if (ok) {
      setSheetOpen(false);
      resetForm();
      setEditing(null);
    }
  };

  if (loading && !projects.length) return <LoadingState name="project" />;

  return (
    <div className="space-y-6">
      <ProjectHeader onAddProject={handleAdd} />

      {projects.length ? (
        <ProjectTable
          projects={projects}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggle={handleToggle}
          loading={deleting}
        />
      ) : (
        <EmptyState
          onAddCompany={handleAdd}
          pageName="Project"
          name="project"
        />
      )}

      <ProjectSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        formData={formData}
        errors={errors}
        touched={touched}
        isValid={isValid}
        isSubmitting={creating || updating}
        isEditing={!!editing}
        onChange={handleChange}
        onBlur={handleBlur}
        onSubmit={onSubmit}
        onCancel={() => {
          setSheetOpen(false);
          resetForm();
          setEditing(null);
        }}
      />
    </div>
  );
};

export default ProjectPageClient;
