// utils/projectValidation.js

/* ---------------------------------------------------
   MAIN FORM VALIDATOR
--------------------------------------------------- */
export const validateProjectForm = (formData) => {
    const errors = {};
  
    /* ---------- Project Name ---------- */
    if (!formData.name || !formData.name.trim()) {
      errors.name = "Project name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Project name must be at least 2 characters long";
    } else if (formData.name.trim().length > 100) {
      errors.name = "Project name must be less than 100 characters";
    } else if (!/^[a-zA-Z0-9\s\-&.,_]+$/.test(formData.name.trim())) {
      errors.name = "Project name contains invalid characters";
    }
  
    /* ---------- Description (optional) ---------- */
    if (formData.description && formData.description.trim().length > 1000) {
      errors.description = "Description must be less than 1000 characters";
    }
  
    /* ---------- Status ---------- */
    const allowedStatus = ["draft", "active", "archived", "completed"];
    if (!formData.status) {
      errors.status = "Status is required";
    } else if (!allowedStatus.includes(formData.status)) {
      errors.status = `Status must be one of: ${allowedStatus.join(", ")}`;
    }
  
    /* ---------- Deadline (optional) ---------- */
    if (formData.deadline) {
      const date = new Date(formData.deadline);
      if (Number.isNaN(date.getTime())) {
        errors.deadline = "Deadline must be a valid date";
      }
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };
  
  /* ---------------------------------------------------
     SINGLE-FIELD VALIDATOR (real-time)
  --------------------------------------------------- */
  export const validateProjectField = (fieldName, value, existingData = {}) => {
    const temp = { ...existingData, [fieldName]: value };
    return validateProjectForm(temp).errors[fieldName] || null;
  };
  