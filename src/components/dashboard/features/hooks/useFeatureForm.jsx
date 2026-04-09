import { useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { createFeature, updateFeatureDetails } from '@/redux/slices/featureSlice';
import { validateFeatureForm, getTodayDate } from '@/lib/validations/featureValidation';

export const useFeatureForm = () => {
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    benefits: '',
    priority: 'medium',
    status: 'pending',
    deadline: getTodayDate(),
    tags: [],
    projectId: '',
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const isValid = useMemo(() => {
    const validation = validateFeatureForm(formData);
    return validation.isValid;
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Immediate validation for errors display
    const validation = validateFeatureForm({ ...formData, [name]: value });
    setErrors(validation.errors);
  }, [formData]);

  const handleTagsChange = useCallback((e) => {
    const value = e.target.value;
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({ ...prev, tags }));
    
    const validation = validateFeatureForm({ ...formData, tags });
    setErrors(validation.errors);
  }, [formData]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const validation = validateFeatureForm(formData);
    setErrors(validation.errors);
  }, [formData]);

  const handleSubmit = useCallback(async (data, editingId = null) => {
    setTouched({ 
      title: true, 
      description: true, 
      benefits: true,
      priority: true, 
      status: true,
      deadline: true, 
      tags: true,
      projectId: true 
    });
    
    const finalValidation = validateFeatureForm(data);
    setErrors(finalValidation.errors);
    
    if (!finalValidation.isValid) return false;

    try {
      const featureData = {
        title: data.title.trim(),
        description: data.description?.trim() || '',
        benefits: data.benefits?.trim() || '',
        priority: data.priority,
        deadline: data.deadline || null,
        tags: Array.isArray(data.tags) ? data.tags : [],
        projectId: data.projectId,
      };

      if (editingId) {
        featureData.status = data.status;
        await dispatch(updateFeatureDetails({ 
          featureId: editingId, 
          ...featureData 
        })).unwrap();
      } else {
        await dispatch(createFeature(featureData)).unwrap();
      }
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      return false;
    }
  }, [dispatch]);

  const populateForm = useCallback((feature) => {
    setFormData({
      title: feature.title || '',
      description: feature.description || '',
      benefits: feature.benefits || '',
      priority: feature.priority || 'medium',
      status: feature.status || 'pending',
      deadline: feature.deadline ? feature.deadline.split('T')[0] : getTodayDate(),
      tags: feature.tags || [],
      projectId: feature.projectId?._id || feature.projectId || '',
    });
    setErrors({});
    setTouched({});
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      description: '',
      benefits: '',
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
    populateForm,
    resetForm,
  };
};
