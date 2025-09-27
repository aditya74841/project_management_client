import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createFeature } from '@/redux/slices/featureSlice';

export const useFeatureForm = () => {
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending',
    deadline: '',
    tags: [],
    projectId: '',
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.projectId) {
      newErrors.projectId = 'Project is required';
    }
    
    if (formData.deadline) {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (deadlineDate <= today) {
        newErrors.deadline = 'Deadline must be greater than today';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    
    if (name === 'tags') {
      const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
      setFormData(prev => ({ ...prev, tags }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }, [errors]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const handleSubmit = useCallback(async (data, editingId = null) => {
    setTouched({ 
      title: true, 
      description: true, 
      priority: true, 
      status: true, 
      deadline: true, 
      tags: true,
      projectId: true 
    });
    
    if (!validateForm()) {
      return false;
    }

    try {
      const featureData = {
        title: data.title.trim(),
        description: data.description?.trim() || '',
        priority: data.priority,
        status: data.status,
        deadline: data.deadline || null,
        tags: Array.isArray(data.tags) ? data.tags : [],
        projectId: data.projectId,
      };

      if (editingId) {
        // TODO: Implement update later
        console.log("Update not implemented yet");
        return false;
      } else {
        // Create new feature using Redux
        await dispatch(createFeature(featureData)).unwrap();
      }

      return true;
    } catch (error) {
      // Error is handled by Redux and shown via useEffect in component
      console.error('Form submission error:', error);
      return false;
    }
  }, [dispatch, validateForm]);

  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      status: 'pending',
      deadline: '',
      tags: [],
      projectId: '',
    });
    setErrors({});
    setTouched({});
  }, []);

  return {
    formData,
    setFormData,
    errors,
    touched,
    isValid: Object.keys(errors).length === 0,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
};




// import { useState, useCallback } from 'react';
// import { showMessage } from '@/app/utils/showMessage';

// export const useFeatureForm = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     priority: 'medium',
//     status: 'pending',
//     deadline: '',
//     tags: [],
//     projectId: '',
//   });
  
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   const validateForm = useCallback(() => {
//     const newErrors = {};
    
//     if (!formData.title.trim()) {
//       newErrors.title = 'Title is required';
//     }
    
//     if (!formData.projectId) {
//       newErrors.projectId = 'Project is required';
//     }
    
//     if (formData.deadline) {
//       const deadlineDate = new Date(formData.deadline);
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
      
//       if (deadlineDate <= today) {
//         newErrors.deadline = 'Deadline must be greater than today';
//       }
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   }, [formData]);

//   const handleChange = useCallback((e) => {
//     const { name, value } = e.target;
    
//     if (name === 'tags') {
//       const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
//       setFormData(prev => ({ ...prev, tags }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: null }));
//     }
//   }, [errors]);

//   const handleBlur = useCallback((e) => {
//     const { name } = e.target;
//     setTouched(prev => ({ ...prev, [name]: true }));
//   }, []);

//   const handleSubmit = useCallback(async (data, editingId = null, setFeatures, projects) => {
//     setTouched({ 
//       title: true, 
//       description: true, 
//       priority: true, 
//       status: true, 
//       deadline: true, 
//       tags: true,
//       projectId: true 
//     });
    
//     if (!validateForm()) {
//       return false;
//     }

//     try {
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       const selectedProject = projects.find(p => p._id === data.projectId);
      
//       const featureData = {
//         title: data.title.trim(),
//         description: data.description?.trim() || '',
//         priority: data.priority,
//         status: data.status,
//         deadline: data.deadline || null,
//         tags: Array.isArray(data.tags) ? data.tags : [],
//         projectId: { _id: data.projectId, name: selectedProject?.name || 'Unknown' },
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       };

//       if (editingId) {
//         // Update existing feature
//         setFeatures(prev => prev.map(f => 
//           f._id === editingId ? { ...f, ...featureData, _id: editingId } : f
//         ));
//         showMessage("Feature updated successfully");
//       } else {
//         // Add new feature
//         const newFeature = {
//           _id: `f${Date.now()}`,
//           ...featureData,
//         };
//         setFeatures(prev => [...prev, newFeature]);
//         showMessage("Feature created successfully");
//       }

//       return true;
//     } catch (error) {
//       console.error('Form submission error:', error);
//       showMessage(error.message || "Failed to save feature", "error");
//       return false;
//     }
//   }, [validateForm]);

//   const resetForm = useCallback(() => {
//     setFormData({
//       title: '',
//       description: '',
//       priority: 'medium',
//       status: 'pending',
//       deadline: '',
//       tags: [],
//       projectId: '',
//     });
//     setErrors({});
//     setTouched({});
//   }, []);

//   return {
//     formData,
//     setFormData,
//     errors,
//     touched,
//     isValid: Object.keys(errors).length === 0,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//     resetForm,
//   };
// };



// import { useState, useCallback } from 'react';
// import { useDispatch } from 'react-redux';
// import { createFeature, updateFeature } from '@/redux/slices/featureSlice';

// export const useFeatureForm = () => {
//   const dispatch = useDispatch();
  
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     priority: 'medium',
//     status: 'pending',
//     deadline: '',
//     tags: [],
//     projectId: '',
//   });
  
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   const validateForm = useCallback(() => {
//     const newErrors = {};
    
//     if (!formData.title.trim()) {
//       newErrors.title = 'Title is required';
//     }
    
//     if (!formData.projectId) {
//       newErrors.projectId = 'Project is required';
//     }
    
//     if (formData.deadline) {
//       const deadlineDate = new Date(formData.deadline);
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
      
//       if (deadlineDate <= today) {
//         newErrors.deadline = 'Deadline must be greater than today';
//       }
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   }, [formData]);

//   const handleChange = useCallback((e) => {
//     const { name, value } = e.target;
    
//     if (name === 'tags') {
//       const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
//       setFormData(prev => ({ ...prev, tags }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: null }));
//     }
//   }, [errors]);

//   const handleBlur = useCallback((e) => {
//     const { name } = e.target;
//     setTouched(prev => ({ ...prev, [name]: true }));
//   }, []);

//   const handleSubmit = useCallback(async (data, editingId = null) => {
//     setTouched({ 
//       title: true, 
//       description: true, 
//       priority: true, 
//       status: true, 
//       deadline: true, 
//       tags: true,
//       projectId: true 
//     });
    
//     if (!validateForm()) {
//       return false;
//     }

//     try {
//       const featureData = {
//         title: data.title.trim(),
//         description: data.description?.trim() || '',
//         priority: data.priority,
//         status: data.status,
//         deadline: data.deadline || null,
//         tags: Array.isArray(data.tags) ? data.tags : [],
//         projectId: data.projectId,
//       };

//       if (editingId) {
//         await dispatch(updateFeature({ 
//           featureId: editingId, 
//           ...featureData 
//         })).unwrap();
//       } else {
//         await dispatch(createFeature(featureData)).unwrap();
//       }

//       return true;
//     } catch (error) {
//       console.error('Form submission error:', error);
//       return false;
//     }
//   }, [dispatch, validateForm]);

//   const resetForm = useCallback(() => {
//     setFormData({
//       title: '',
//       description: '',
//       priority: 'medium',
//       status: 'pending',
//       deadline: '',
//       tags: [],
//       projectId: '',
//     });
//     setErrors({});
//     setTouched({});
//   }, []);

//   return {
//     formData,
//     setFormData,
//     errors,
//     touched,
//     isValid: Object.keys(errors).length === 0,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//     resetForm,
//   };
// };
