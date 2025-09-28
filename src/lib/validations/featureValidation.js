// utils/featureValidation.js

export const validateFeatureForm = (formData, isEditing = false) => {
  const errors = {};
  
  // Feature Title validation
  if (!formData.title || !formData.title.trim()) {
    errors.title = "Feature title is required";
  } else if (formData.title.trim().length < 3) {
    errors.title = "Feature title must be at least 3 characters long";
  } else if (formData.title.trim().length > 100) {
    errors.title = "Feature title must be less than 100 characters";
  }

  // Priority validation
  const validPriorities = ['low', 'medium', 'high', 'urgent'];
  if (!formData.priority || !validPriorities.includes(formData.priority)) {
    errors.priority = "Please select a valid priority";
  }

  // Status validation (for editing)
  if (formData.status) {
    const validStatuses = ['pending', 'working', 'completed', 'blocked'];
    if (!validStatuses.includes(formData.status)) {
      errors.status = "Please select a valid status";
    }
  }

  // Project ID validation
  if (!formData.projectId || !formData.projectId.trim()) {
    errors.projectId = "Project selection is required";
  }

  // Deadline validation
  if (formData.deadline) {
    const deadlineError = validateDeadline(formData.deadline);
    if (deadlineError) {
      errors.deadline = deadlineError;
    }
  }

  // Tags validation
  if (formData.tags && Array.isArray(formData.tags) && formData.tags.length > 0) {
    const tagsError = validateTags(formData.tags);
    if (tagsError) {
      errors.tags = tagsError;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

  
  // Deadline validation function
  export const validateDeadline = (deadline) => {
    if (!deadline) {
      return null; // Optional field
    }
  
    const deadlineDate = new Date(deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    // Check if date is valid
    if (isNaN(deadlineDate.getTime())) {
      return "Please enter a valid date";
    }
  
    // Check if deadline is not in the past
    if (deadlineDate < today) {
      return "Deadline cannot be in the past";
    }
  
    // Check if deadline is not too far in the future (e.g., 5 years)
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 5);
    if (deadlineDate > maxDate) {
      return "Deadline cannot be more than 5 years in the future";
    }
  
    return null;
  };
  
  // Tags validation function
  export const validateTags = (tags) => {
    if (!Array.isArray(tags)) {
      return "Tags must be an array";
    }
  
    if (tags.length > 10) {
      return "Maximum 10 tags allowed";
    }
  
    for (const tag of tags) {
      if (typeof tag !== 'string') {
        return "All tags must be text";
      }
  
      if (tag.trim().length === 0) {
        return "Tags cannot be empty";
      }
  
      if (tag.trim().length > 20) {
        return "Each tag must be less than 20 characters";
      }
  
      if (!/^[a-zA-Z0-9\-\_]+$/.test(tag.trim())) {
        return "Tags can only contain letters, numbers, hyphens, and underscores";
      }
    }
  
    // Check for duplicate tags
    const uniqueTags = [...new Set(tags.map(tag => tag.trim().toLowerCase()))];
    if (uniqueTags.length !== tags.length) {
      return "Duplicate tags are not allowed";
    }
  
    return null;
  };
  
  // Real-time field validation
  export const validateField = (fieldName, value, existingData = {}) => {
    const tempData = { ...existingData, [fieldName]: value };
    const validation = validateFeatureForm(tempData);
    return validation.errors[fieldName] || null;
  };
  
  // Helper function to get today's date in YYYY-MM-DD format
  export const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  
  // Helper function to format deadline display
  export const formatDeadlineDisplay = (deadline) => {
    if (!deadline) return 'No deadline';
    
    const date = new Date(deadline);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} days`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else if (diffDays <= 7) {
      return `Due in ${diffDays} days`;
    } else {
      return date.toLocaleDateString();
    }
  };
  