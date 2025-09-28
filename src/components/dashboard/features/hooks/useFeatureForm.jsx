import { useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { createFeature, updateFeature } from '@/redux/slices/featureSlice';
import { validateFeatureForm, getTodayDate } from '@/lib/validations/featureValidation';

export const useFeatureForm = () => {
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending', // Add status back for editing
    deadline: getTodayDate(),
    tags: [],
    projectId: '',
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Calculate isValid reactively
  const isValid = useMemo(() => {
    const validation = validateFeatureForm(formData);
    return validation.isValid;
  }, [formData]);

  const validateForm = useCallback(() => {
    const validation = validateFeatureForm(formData);
    setErrors(validation.errors);
    return validation.isValid;
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    
    const validation = validateFeatureForm(newFormData);
    setErrors(validation.errors);
  }, [formData]);

  const handleTagsChange = useCallback((e) => {
    const value = e.target.value;
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    const newFormData = { ...formData, tags };
    setFormData(newFormData);
    
    const validation = validateFeatureForm(newFormData);
    setErrors(validation.errors);
  }, [formData]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const validation = validateFeatureForm(formData);
    setErrors(validation.errors);
  }, [formData]);

  const handleSubmit = useCallback(async (data, editingId = null) => {
    // Mark all fields as touched
    setTouched({ 
      title: true, 
      description: true, 
      priority: true, 
      status: true,
      deadline: true, 
      tags: true,
      projectId: true 
    });
    
    // Final validation
    const finalValidation = validateFeatureForm(data);
    setErrors(finalValidation.errors);
    
    if (!finalValidation.isValid) {
      console.log('Form submission blocked - validation errors:', finalValidation.errors);
      return false;
    }

    try {
      const featureData = {
        title: data.title.trim(),
        description: data.description?.trim() || '',
        priority: data.priority,
        deadline: data.deadline || null,
        tags: Array.isArray(data.tags) ? data.tags : [],
        projectId: data.projectId,
      };

      if (editingId) {
        // UPDATED: Implement feature update
        featureData.status = data.status; // Include status when updating
        await dispatch(updateFeature({ 
          featureId: editingId, 
          ...featureData 
        })).unwrap();
        console.log('Feature updated successfully');
      } else {
        // Create new feature (don't include status for creation)
        await dispatch(createFeature(featureData)).unwrap();
        console.log('Feature created successfully');
      }

      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      return false;
    }
  }, [dispatch]);

  // NEW: Function to populate form with existing feature data
  const populateForm = useCallback((feature) => {
    setFormData({
      title: feature.title || '',
      description: feature.description || '',
      priority: feature.priority || 'medium',
      status: feature.status || 'pending',
      deadline: feature.deadline ? feature.deadline.split('T')[0] : getTodayDate(),
      tags: feature.tags || [],
      projectId: feature.projectId?._id || feature.projectId || '',
    });
    // Clear errors and touched state when populating
    setErrors({});
    setTouched({});
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      status: 'pending',
      deadline: getTodayDate(),
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
    isValid,
    handleChange,
    handleTagsChange,
    handleBlur,
    handleSubmit,
    populateForm, // NEW: Add this function
    resetForm,
  };
};



// import { useState, useCallback, useMemo } from 'react';
// import { useDispatch } from 'react-redux';
// import { createFeature } from '@/redux/slices/featureSlice';
// import { validateFeatureForm, getTodayDate } from '@/lib/validations/featureValidation';

// export const useFeatureForm = () => {
//   const dispatch = useDispatch();
  
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     priority: 'medium',
//     deadline: getTodayDate(),
//     tags: [],
//     projectId: '',
//   });
  
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   // Calculate isValid reactively - this is the key fix
//   const isValid = useMemo(() => {
//     // Run full validation on current form data
//     const validation = validateFeatureForm(formData);
//     console.log('Validation result:', validation); // Debug log
//     console.log('Current errors state:', errors); // Debug log
    
//     // Button should be enabled when form data is valid (regardless of errors state)
//     return validation.isValid;
//   }, [formData]); // Only depend on formData, not errors state

//   const validateForm = useCallback(() => {
//     const validation = validateFeatureForm(formData);
//     setErrors(validation.errors);
//     return validation.isValid;
//   }, [formData]);

//   const handleChange = useCallback((e) => {
//     const { name, value } = e.target;
    
//     // Update form data first
//     const newFormData = { ...formData, [name]: value };
//     setFormData(newFormData);
    
//     // Then validate the updated form data
//     const validation = validateFeatureForm(newFormData);
    
//     // Update errors state - completely replace with new validation errors
//     setErrors(validation.errors);
    
//     console.log(`Field ${name} changed to: "${value}"`); // Debug log
//     console.log('New validation errors:', validation.errors); // Debug log
//   }, [formData]);

//   const handleTagsChange = useCallback((e) => {
//     const value = e.target.value;
//     const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
    
//     // Update form data
//     const newFormData = { ...formData, tags };
//     setFormData(newFormData);
    
//     // Validate updated form data
//     const validation = validateFeatureForm(newFormData);
//     setErrors(validation.errors);
    
//     console.log('Tags changed to:', tags); // Debug log
//     console.log('New validation errors:', validation.errors); // Debug log
//   }, [formData]);

//   const handleBlur = useCallback((e) => {
//     const { name } = e.target;
//     setTouched(prev => ({ ...prev, [name]: true }));
    
//     // Re-run validation to make sure errors are up to date
//     const validation = validateFeatureForm(formData);
//     setErrors(validation.errors);
//   }, [formData]);

//   const handleSubmit = useCallback(async (data, editingId = null) => {
//     // Mark all fields as touched
//     setTouched({ 
//       title: true, 
//       description: true, 
//       priority: true, 
//       deadline: true, 
//       tags: true,
//       projectId: true 
//     });
    
//     // Final validation
//     const finalValidation = validateFeatureForm(data);
//     setErrors(finalValidation.errors);
    
//     if (!finalValidation.isValid) {
//       console.log('Form submission blocked - validation errors:', finalValidation.errors);
//       return false;
//     }

//     try {
//       const featureData = {
//         title: data.title.trim(),
//         description: data.description?.trim() || '',
//         priority: data.priority,
//         deadline: data.deadline || null,
//         tags: Array.isArray(data.tags) ? data.tags : [],
//         projectId: data.projectId,
//       };

//       if (editingId && data.status) {
//         featureData.status = data.status;
//       }

//       if (editingId) {
//         console.log("Update not implemented yet");
//         return false;
//       } else {
//         await dispatch(createFeature(featureData)).unwrap();
//         console.log('Feature created successfully');
//       }

//       return true;
//     } catch (error) {
//       console.error('Form submission error:', error);
//       return false;
//     }
//   }, [dispatch]);

//   const resetForm = useCallback(() => {
//     setFormData({
//       title: '',
//       description: '',
//       priority: 'medium',
//       deadline: getTodayDate(),
//       tags: [],
//       projectId: '',
//     });
//     setErrors({});
//     setTouched({});
//   }, []);

//   // Debug log the current state
//   console.log('Form state - isValid:', isValid, 'formData:', formData, 'errors:', errors);

//   return {
//     formData,
//     setFormData,
//     errors,
//     touched,
//     isValid,
//     handleChange,
//     handleTagsChange,
//     handleBlur,
//     handleSubmit,
//     resetForm,
//   };
// };


