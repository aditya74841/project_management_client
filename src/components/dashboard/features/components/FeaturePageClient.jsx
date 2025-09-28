"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import FeatureHeader from "./FeatureHeader";
import FeatureKanban from "./FeatureKanban";
import FeatureSheet from "./FeatureSheet";
import { useFeatureForm } from "../hooks/useFeatureForm";

import {
  getProjectNames,
  getFeaturesByProjectId,
  deleteFeature,
  clearMessages,
  selectFeatures,
  selectProjectNames,
  selectFeatureLoading,
  selectProjectNamesLoading,
  selectFeatureCreating,
  selectFeatureUpdating, // Add this
  selectFeatureDeleting,
  selectFeatureError,
  selectFeatureMessage,
} from "@/redux/slices/featureSlice";

import { showMessage } from "@/app/utils/showMessage";

const FeaturePageClient = ({ initialData }) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState("");

  const dispatch = useDispatch();
  
  // Feature selectors
  const features = useSelector(selectFeatures);
  const featuresLoading = useSelector(selectFeatureLoading);
  const creating = useSelector(selectFeatureCreating);
  const updating = useSelector(selectFeatureUpdating); // Add this
  const deleting = useSelector(selectFeatureDeleting);
  const error = useSelector(selectFeatureError);
  const message = useSelector(selectFeatureMessage);

  // Project selectors
  const projectNames = useSelector(selectProjectNames);
  const projectNamesLoading = useSelector(selectProjectNamesLoading);

  const {
    formData,
    errors,
    touched,
    isValid,
    handleChange,
    handleTagsChange,
    handleBlur,
    handleSubmit,
    populateForm, // Add this
    resetForm,
    setFormData,
  } = useFeatureForm();

  // Fetch project names on mount
  useEffect(() => {
    dispatch(getProjectNames());
  }, [dispatch]);

  // Handle success/error messages
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

  // Fetch features when project changes
  useEffect(() => {
    if (selectedProjectId) {
      dispatch(getFeaturesByProjectId(selectedProjectId));
    }
  }, [dispatch, selectedProjectId]);

  const handleAddFeature = () => {
    if (!selectedProjectId) {
      showMessage("Please select a project first", "error");
      return;
    }
    resetForm();
    setFormData(prev => ({ ...prev, projectId: selectedProjectId }));
    setEditingFeature(null);
    setSheetOpen(true);
  };

  // UPDATED: Implement edit feature functionality
  const handleEditFeature = (feature) => {
    populateForm(feature); // Populate form with feature data
    setEditingFeature(feature);
    setSheetOpen(true);
  };

  // UPDATED: Implement view feature functionality
  const handleViewFeature = (feature) => {
    populateForm(feature); // Populate form with feature data
    setEditingFeature(feature);
    setSheetOpen(true);
  };

  // UPDATED: Implement delete feature functionality
  const handleDeleteFeature = async (featureId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the feature permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await dispatch(deleteFeature(featureId)).unwrap();
      } catch (err) {
        console.error("Delete feature error:", err);
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    const dataWithProjectId = {
      ...formData,
      projectId: selectedProjectId,
    };
    
    const success = await handleSubmit(dataWithProjectId, editingFeature?._id);
    if (success) {
      setSheetOpen(false);
      resetForm();
      setEditingFeature(null);
    }
  };

  const handleProjectChange = (projectId) => {
    setSelectedProjectId(projectId);
    if (sheetOpen) {
      setFormData(prev => ({ ...prev, projectId }));
    }
  };

  if (projectNamesLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-gray-500 mt-4">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FeatureHeader
        projects={projectNames}
        selectedProjectId={selectedProjectId}
        onProjectChange={handleProjectChange}
        onAddFeature={handleAddFeature}
        loading={projectNamesLoading}
      />

      {selectedProjectId ? (
        features?.length > 0 ? (
          <FeatureKanban
            features={features}
            onEdit={handleEditFeature}
            onDelete={handleDeleteFeature}
            onView={handleViewFeature}
            loading={deleting}
          />
        ) : featuresLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading features...</p>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">No features found</h3>
              <p>No features found for this project. Create your first feature!</p>
              <button
                onClick={handleAddFeature}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Feature
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="text-center py-12 text-gray-500 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <h3 className="text-lg font-medium">Select a project</h3>
          <p>Choose a project from the dropdown to view its features</p>
        </div>
      )}

      <FeatureSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        formData={formData}
        errors={errors}
        touched={touched}
        isValid={isValid}
        isSubmitting={creating || updating} // Include updating state
        isEditing={!!editingFeature}
        feature={editingFeature}
        onChange={handleChange}
        onTagsChange={handleTagsChange}
        onBlur={handleBlur}
        onSubmit={handleFormSubmit}
        onCancel={() => {
          setSheetOpen(false);
          resetForm();
          setEditingFeature(null);
        }}
      />
    </div>
  );
};

export default FeaturePageClient;


// "use client";

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import FeatureHeader from "./FeatureHeader";
// import FeatureKanban from "./FeatureKanban";
// import FeatureSheet from "./FeatureSheet";
// import { useFeatureForm } from "../hooks/useFeatureForm";

// import {
//   getProjectNames,
//   getFeaturesByProjectId,
//   clearMessages,
//   selectFeatures,
//   selectProjectNames,
//   selectFeatureLoading,
//   selectProjectNamesLoading,
//   selectFeatureCreating,
//   selectFeatureError,
//   selectFeatureMessage,
// } from "@/redux/slices/featureSlice";

// import { showMessage } from "@/app/utils/showMessage";

// const FeaturePageClient = ({ initialData }) => {
//   const [sheetOpen, setSheetOpen] = useState(false);
//   const [editingFeature, setEditingFeature] = useState(null);
//   const [selectedProjectId, setSelectedProjectId] = useState("");

//   const dispatch = useDispatch();
  
//   // Feature selectors
//   const features = useSelector(selectFeatures);
//   const featuresLoading = useSelector(selectFeatureLoading);
//   const creating = useSelector(selectFeatureCreating);
//   const error = useSelector(selectFeatureError);
//   const message = useSelector(selectFeatureMessage);

//   // Project selectors
//   const projectNames = useSelector(selectProjectNames);
//   const projectNamesLoading = useSelector(selectProjectNamesLoading);

//   const {
//     formData,
//     errors,
//     touched,
//     isValid,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//     resetForm,
//     setFormData,
//     handleTagsChange
//   } = useFeatureForm();

//   // Fetch project names on mount
//   useEffect(() => {
//     dispatch(getProjectNames());
//   }, [dispatch]);

//   // Handle success/error messages
//   useEffect(() => {
//     if (message) {
//       showMessage(message);
//       dispatch(clearMessages());
//     }
//     if (error) {
//       showMessage(error, "error");
//       dispatch(clearMessages());
//     }
//   }, [message, error, dispatch]);

//   // Fetch features when project changes
//   useEffect(() => {
//     if (selectedProjectId) {
//       dispatch(getFeaturesByProjectId(selectedProjectId));
//     }
//   }, [dispatch, selectedProjectId]);

//   const handleAddFeature = () => {
//     if (!selectedProjectId) {
//       showMessage("Please select a project first", "error");
//       return;
//     }
//     resetForm();
//     // Set the projectId in formData when opening the form
//     setFormData(prev => ({ ...prev, projectId: selectedProjectId }));
//     setEditingFeature(null);
//     setSheetOpen(true);
//   };

//   // Demo handlers for edit/view/delete (not implemented yet)
//   const handleEditFeature = (feature) => {
//     console.log("Edit feature:", feature);
//   };

//   const handleViewFeature = (feature) => {
//     console.log("View feature:", feature);
//   };

//   const handleDeleteFeature = (featureId) => {
//     console.log("Delete feature:", featureId);
//   };

//   const handleFormSubmit = async (formData) => {
//     // Ensure projectId is included in formData
//     const dataWithProjectId = {
//       ...formData,
//       projectId: selectedProjectId, // Make sure projectId is set
//     };
    
//     const success = await handleSubmit(dataWithProjectId, editingFeature?._id);
//     if (success) {
//       setSheetOpen(false);
//       resetForm();
//       setEditingFeature(null);
//     }
//   };

//   const handleProjectChange = (projectId) => {
//     setSelectedProjectId(projectId);
//     // Also update formData if form is open
//     if (sheetOpen) {
//       setFormData(prev => ({ ...prev, projectId }));
//     }
//   };

//   // Show loading state while fetching project names
//   if (projectNamesLoading) {
//     return (
//       <div className="text-center py-12">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//         <p className="text-gray-500 mt-4">Loading projects...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <FeatureHeader
//         projects={projectNames} // Now using real project names from Redux
//         selectedProjectId={selectedProjectId}
//         onProjectChange={handleProjectChange}
//         onAddFeature={handleAddFeature}
//         loading={projectNamesLoading}
//       />

//       {selectedProjectId ? (
//         features?.length > 0 ? (
//           <FeatureKanban
//             features={features}
//             onEdit={handleEditFeature}
//             onDelete={handleDeleteFeature}
//             onView={handleViewFeature}
//             loading={false}
//           />
//         ) : featuresLoading ? (
//           <div className="text-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//             <p className="text-gray-500 mt-4">Loading features...</p>
//           </div>
//         ) : (
//           <div className="text-center py-12 text-gray-500 bg-white rounded-lg border-2 border-dashed border-gray-300">
//             <div className="space-y-2">
//               <h3 className="text-lg font-medium">No features found</h3>
//               <p>No features found for this project. Create your first feature!</p>
//               <button
//                 onClick={handleAddFeature}
//                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Add Feature
//               </button>
//             </div>
//           </div>
//         )
//       ) : (
//         <div className="text-center py-12 text-gray-500 bg-white rounded-lg border-2 border-dashed border-gray-300">
//           <h3 className="text-lg font-medium">Select a project</h3>
//           <p>Choose a project from the dropdown to view its features</p>
//         </div>
//       )}

//       <FeatureSheet
//         open={sheetOpen}
//         onOpenChange={setSheetOpen}
//         formData={formData}
//         errors={errors}
//         touched={touched}
//         isValid={isValid}
//         isSubmitting={creating}
//         isEditing={!!editingFeature}
//         feature={editingFeature}
//         onChange={handleChange}
//         onTagsChange={handleTagsChange} // Add this

//         onBlur={handleBlur}
//         onSubmit={handleFormSubmit}
//         onCancel={() => {
//           setSheetOpen(false);
//           resetForm();
//           setEditingFeature(null);
//         }}
//       />
//     </div>
//   );
// };

// export default FeaturePageClient;
