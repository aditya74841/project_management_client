"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

import FeatureHeader from "./FeatureHeader";
import FeatureKanban from "./FeatureKanban";
import FeatureSheet from "./FeatureSheet";
import { useFeatureForm } from "../hooks/useFeatureForm";
import LoginModal from "./LoginModal";

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
  selectFeatureUpdating,
  selectFeatureDeleting,
  selectFeatureError,
  selectFeatureMessage,
} from "@/redux/slices/featureSlice";

import {
  userLogin,
  userProfile,
  clearMessages as clearAuthMessages,
} from "@/redux/slices/authSlice";

import { showMessage } from "@/app/utils/showMessage";

const FeaturePageClient = ({ initialData }) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Auth selector
  const {
    isLoggedIn,
    profile,
    loading: authLoading,
  } = useSelector((state) => state.auth);

  // Feature selectors
  const features = useSelector(selectFeatures);
  const featuresLoading = useSelector(selectFeatureLoading);
  const creating = useSelector(selectFeatureCreating);
  const updating = useSelector(selectFeatureUpdating);
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
    populateForm,
    resetForm,
    setFormData,
  } = useFeatureForm();

  // ✅ Fetch user profile on mount
  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  // ✅ Check authentication on mount and when isLoggedIn changes
  useEffect(() => {
    if (!isLoggedIn && !authLoading) {
      setShowLoginModal(true);
    }
  }, [isLoggedIn, authLoading]);

  // Get projectId from URL on mount
  useEffect(() => {
    const projectIdFromUrl = searchParams.get("projectId");
    if (projectIdFromUrl) {
      setSelectedProjectId(projectIdFromUrl);
    }
  }, [searchParams]);

  // Fetch project names on mount (only if logged in)
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProjectNames());
    }
  }, [dispatch, isLoggedIn]);

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

  // Fetch features when project changes (only if logged in)
  useEffect(() => {
    if (selectedProjectId && isLoggedIn) {
      dispatch(getFeaturesByProjectId(selectedProjectId));
    }
  }, [dispatch, selectedProjectId, isLoggedIn]);

  // ✅ Handle email/password login
  const handleLogin = async (data) => {
    try {
      const result = await dispatch(
        userLogin({
          email: data.emailOrPhone,
          password: data.password,
        })
      ).unwrap();

      // Fetch user profile after successful login
      await dispatch(userProfile());

      // Close the login modal
      setShowLoginModal(false);

      showMessage("Login successful!", "success");

      return result;
    } catch (err) {
      // Error will be shown in modal
      throw err;
    }
  };

  // ✅ Handle Google login
  const handleGoogleLogin = async () => {
    try {
      // Redirect to Google OAuth endpoint
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/google`;
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    }
  };

  const handleAddFeature = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (!selectedProjectId) {
      showMessage("Please select a project first", "error");
      return;
    }
    resetForm();
    setFormData((prev) => ({ ...prev, projectId: selectedProjectId }));
    setEditingFeature(null);
    setSheetOpen(true);
  };

  const handleEditFeature = (feature) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    populateForm(feature);
    setEditingFeature(feature);
    setSheetOpen(true);
  };

  const handleViewFeature = (feature) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    populateForm(feature);
    setEditingFeature(feature);
    setSheetOpen(true);
  };

  const handleDeleteFeature = async (featureId) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

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
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

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
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    setSelectedProjectId(projectId);

    const url = new URL(window.location.href);
    url.searchParams.set("projectId", projectId);
    window.history.pushState({}, "", url);

    if (sheetOpen) {
      setFormData((prev) => ({ ...prev, projectId }));
    }
  };

  // console.log("The LoggedIn user", isLoggedIn, authLoading);

  // Show login modal if not authenticated
  if (!isLoggedIn && !authLoading) {
    return (
      <>
        <LoginModal
          open={showLoginModal}
          onEmailLogin={handleLogin}
          onGoogleLogin={handleGoogleLogin}
          onClose={() => setShowLoginModal(false)}
        />
      </>
    );
  }

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-gray-500 mt-4">Checking authentication...</p>
      </div>
    );
  }

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
      {/* Login Modal - Can be triggered again if needed */}
      <LoginModal
        open={showLoginModal}
        onEmailLogin={handleLogin}
        onGoogleLogin={handleGoogleLogin}
        onClose={() => setShowLoginModal(false)}
      />

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
              <p>
                No features found for this project. Create your first feature!
              </p>
              <button
                onClick={handleAddFeature}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
        isSubmitting={creating || updating}
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
// import { useSearchParams, useRouter } from "next/navigation";
// import Swal from "sweetalert2";

// import FeatureHeader from "./FeatureHeader";
// import FeatureKanban from "./FeatureKanban";
// import FeatureSheet from "./FeatureSheet";
// import { useFeatureForm } from "../hooks/useFeatureForm";
// import LoginModal from "./LoginModal"; // ✅ New component

// import {
//   getProjectNames,
//   getFeaturesByProjectId,
//   deleteFeature,
//   clearMessages,
//   selectFeatures,
//   selectProjectNames,
//   selectFeatureLoading,
//   selectProjectNamesLoading,
//   selectFeatureCreating,
//   selectFeatureUpdating,
//   selectFeatureDeleting,
//   selectFeatureError,
//   selectFeatureMessage,
// } from "@/redux/slices/featureSlice";

// import { showMessage } from "@/app/utils/showMessage";

// const FeaturePageClient = ({ initialData }) => {
//   const [sheetOpen, setSheetOpen] = useState(false);
//   const [editingFeature, setEditingFeature] = useState(null);
//   const [selectedProjectId, setSelectedProjectId] = useState("");
//   const [showLoginModal, setShowLoginModal] = useState(false); // ✅ New state

//   const dispatch = useDispatch();
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   // ✅ Auth selector
//   const { isLoggedIn, profile } = useSelector((state) => state.auth);

//   // Feature selectors
//   const features = useSelector(selectFeatures);
//   const featuresLoading = useSelector(selectFeatureLoading);
//   const creating = useSelector(selectFeatureCreating);
//   const updating = useSelector(selectFeatureUpdating);
//   const deleting = useSelector(selectFeatureDeleting);
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
//     handleTagsChange,
//     handleBlur,
//     handleSubmit,
//     populateForm,
//     resetForm,
//     setFormData,
//   } = useFeatureForm();

//   // ✅ Check authentication on mount
//   useEffect(() => {
//     if (!isLoggedIn) {
//       setShowLoginModal(true);
//     }
//   }, [isLoggedIn]);

//   // Get projectId from URL on mount
//   useEffect(() => {
//     const projectIdFromUrl = searchParams.get("projectId");
//     if (projectIdFromUrl) {
//       setSelectedProjectId(projectIdFromUrl);
//     }
//   }, [searchParams]);

//   // Fetch project names on mount (only if logged in)
//   useEffect(() => {
//     if (isLoggedIn) {
//       dispatch(getProjectNames());
//     }
//   }, [dispatch, isLoggedIn]);

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

//   // Fetch features when project changes (only if logged in)
//   useEffect(() => {
//     if (selectedProjectId && isLoggedIn) {
//       dispatch(getFeaturesByProjectId(selectedProjectId));
//     }
//   }, [dispatch, selectedProjectId, isLoggedIn]);

//   const handleAddFeature = () => {
//     if (!isLoggedIn) {
//       setShowLoginModal(true);
//       return;
//     }
//     if (!selectedProjectId) {
//       showMessage("Please select a project first", "error");
//       return;
//     }
//     resetForm();
//     setFormData((prev) => ({ ...prev, projectId: selectedProjectId }));
//     setEditingFeature(null);
//     setSheetOpen(true);
//   };

//   const handleEditFeature = (feature) => {
//     if (!isLoggedIn) {
//       setShowLoginModal(true);
//       return;
//     }
//     populateForm(feature);
//     setEditingFeature(feature);
//     setSheetOpen(true);
//   };

//   const handleViewFeature = (feature) => {
//     if (!isLoggedIn) {
//       setShowLoginModal(true);
//       return;
//     }
//     populateForm(feature);
//     setEditingFeature(feature);
//     setSheetOpen(true);
//   };

//   const handleDeleteFeature = async (featureId) => {
//     if (!isLoggedIn) {
//       setShowLoginModal(true);
//       return;
//     }

//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "This will delete the feature permanently!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await dispatch(deleteFeature(featureId)).unwrap();
//       } catch (err) {
//         console.error("Delete feature error:", err);
//       }
//     }
//   };

//   const handleFormSubmit = async (formData) => {
//     if (!isLoggedIn) {
//       setShowLoginModal(true);
//       return;
//     }

//     const dataWithProjectId = {
//       ...formData,
//       projectId: selectedProjectId,
//     };

//     const success = await handleSubmit(dataWithProjectId, editingFeature?._id);
//     if (success) {
//       setSheetOpen(false);
//       resetForm();
//       setEditingFeature(null);
//     }
//   };

//   const handleProjectChange = (projectId) => {
//     if (!isLoggedIn) {
//       setShowLoginModal(true);
//       return;
//     }

//     setSelectedProjectId(projectId);

//     const url = new URL(window.location.href);
//     url.searchParams.set("projectId", projectId);
//     window.history.pushState({}, "", url);

//     if (sheetOpen) {
//       setFormData((prev) => ({ ...prev, projectId }));
//     }
//   };

//   // ✅ Handle login redirect
//   const handleLoginRedirect = () => {
//     router.push("/login");
//   };

//   // Show login modal if not authenticated
//   if (!isLoggedIn) {
//     return <LoginModal open={showLoginModal} onLogin={handleLoginRedirect} />;
//   }

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
//         projects={projectNames}
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
//             loading={deleting}
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
//               <p>
//                 No features found for this project. Create your first feature!
//               </p>
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
//         isSubmitting={creating || updating}
//         isEditing={!!editingFeature}
//         feature={editingFeature}
//         onChange={handleChange}
//         onTagsChange={handleTagsChange}
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
