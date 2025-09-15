// utils/companyValidation.js
export const validateCompanyForm = (formData) => {
    const errors = {};
    
    // Company Name validation
    if (!formData.name || !formData.name.trim()) {
      errors.name = "Company name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Company name must be at least 2 characters long";
    } else if (formData.name.trim().length > 100) {
      errors.name = "Company name must be less than 100 characters";
    } else if (!/^[a-zA-Z0-9\s\-\&\.\,\_]+$/.test(formData.name.trim())) {
      errors.name = "Company name contains invalid characters";
    }
  
    // Company Email validation
    if (!formData.email || !formData.email.trim()) {
      errors.email = "Company email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = "Please enter a valid email address";
      } else if (formData.email.trim().length > 255) {
        errors.email = "Email address is too long";
      }
    }
  
    // Company Domain validation (optional)
    if (formData.domain && formData.domain.trim()) {
      const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])*$/;
      if (!domainRegex.test(formData.domain.trim())) {
        errors.domain = "Please enter a valid domain (e.g., company.com)";
      } else if (formData.domain.trim().length > 255) {
        errors.domain = "Domain is too long";
      }
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  
  // Real-time field validation
  export const validateField = (fieldName, value, existingData = {}) => {
    const tempData = { ...existingData, [fieldName]: value };
    const validation = validateCompanyForm(tempData);
    return validation.errors[fieldName] || null;
  };
  