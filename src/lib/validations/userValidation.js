// utils/userValidation.js
export const validateUserForm = (d = {}) => {
    const errors = {};
  
    /* name ------------------------------------------------ */
    if (!d.name?.trim())        errors.name = "Name is required";
    else if (d.name.length < 2) errors.name = "Name must be ≥2 characters";
    else if (d.name.length > 100) errors.name = "Name ≤100 characters";
    else if (!/^[a-zA-Z\s.'-]+$/.test(d.name.trim()))
      errors.name = "Invalid characters in name";
  
    /* email ----------------------------------------------- */
    if (!d.email?.trim()) errors.email = "Email is required";
    else {
      const r = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!r.test(d.email))      errors.email = "Enter a valid email";
      else if (d.email.length > 255) errors.email = "Email too long";
    }
  
    /* password -------------------------------------------- */
    if (!d.password)               errors.password = "Password is required";
    else if (d.password.length < 8) errors.password = "≥8 characters";
    else if (!/[A-Z]/.test(d.password)) errors.password = "Add an uppercase letter";
    else if (!/[a-z]/.test(d.password)) errors.password = "Add a lowercase letter";
    else if (!/[0-9]/.test(d.password)) errors.password = "Add a digit";
    else if (!/[!@#$%^&*()_+\-=[\]{};':"|,.<>/?]/.test(d.password))
      errors.password = "Add a special character";
  
    /* role ------------------------------------------------ */
    const roles = ["USER", "ADMIN", "SUPERADMIN"];
    if (!d.role)                    errors.role = "Role is required";
    else if (!roles.includes(d.role)) errors.role = `Role must be ${roles.join(", ")}`;
  
    /* companyId ------------------------------------------- */
    if (!d.companyId) {
      errors.companyId = "Company ID missing";
    } else if (!/^[a-f\d]{24}$/i.test(d.companyId)) {
      errors.companyId = "Invalid company ID";
    }
  
    return { isValid: !Object.keys(errors).length, errors };
  };
  
  //--------------------------------------------------------
  // ❷  SINGLE-FIELD VALIDATOR (for real-time input)
  //--------------------------------------------------------
  export const validateUserField = (fieldName, value, existingData = {}) => {
    const tempData = { ...existingData, [fieldName]: value };
    const { errors } = validateUserForm(tempData);
    return errors[fieldName] || null;
  };
  
  //--------------------------------------------------------
  // ❸  HELPER – SUGGEST STRONGER PASSWORDS
  //--------------------------------------------------------
  export const getPasswordSuggestions = (weakPwd = "") => {
    const suggestions = [];
  
    if (weakPwd.length < 8) {
      suggestions.push(`${weakPwd}${"1Aa!"}`.slice(0, 8));
    }
    if (!/[A-Z]/.test(weakPwd)) {
      suggestions.push(`${weakPwd}A!`);
    }
    if (!/[a-z]/.test(weakPwd)) {
      suggestions.push(`${weakPwd.toLowerCase()}a1!`);
    }
    if (!/[0-9]/.test(weakPwd)) {
      suggestions.push(`${weakPwd}1!`);
    }
    if (!/[!@#$%^&*]/.test(weakPwd)) {
      suggestions.push(`${weakPwd}!`);
    }
  
    return suggestions.slice(0, 3);
  };
  