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

  // Enhanced Company Domain validation (optional but strict when provided)
  if (formData.domain && formData.domain.trim()) {
    const domainError = validateDomain(formData.domain.trim());
    if (domainError) {
      errors.domain = domainError;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Enhanced domain validation function
export const validateDomain = (domain) => {
  if (!domain || !domain.trim()) {
    return null; // Optional field, empty is allowed
  }

  const trimmedDomain = domain.trim().toLowerCase();

  // Check for minimum length
  if (trimmedDomain.length < 4) {
    return "Domain is too short (minimum 4 characters)";
  }

  // Check for maximum length
  if (trimmedDomain.length > 255) {
    return "Domain is too long (maximum 255 characters)";
  }

  // Reject single words without dots
  if (!trimmedDomain.includes('.')) {
    return "Domain must include a dot (e.g., company.com)";
  }

  // Enhanced domain regex - enforces proper domain structure
  const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  
  if (!domainRegex.test(trimmedDomain)) {
    return "Please enter a valid domain format (e.g., company.com)";
  }

  // Additional checks for common issues
  if (trimmedDomain.startsWith('.') || trimmedDomain.endsWith('.')) {
    return "Domain cannot start or end with a dot";
  }

  if (trimmedDomain.includes('..')) {
    return "Domain cannot contain consecutive dots";
  }

  if (trimmedDomain.startsWith('-') || trimmedDomain.endsWith('-')) {
    return "Domain cannot start or end with a hyphen";
  }

  // Check for valid TLD (at least 2 characters)
  const parts = trimmedDomain.split('.');
  const tld = parts[parts.length - 1];
  if (tld.length < 2) {
    return "Domain must have a valid top-level domain (e.g., .com, .org)";
  }

  // Reject common invalid patterns
  const invalidPatterns = [
    /^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/, // IP addresses
    /localhost/i,                        // localhost
    /^\d+\.\d+$/,                       // incomplete patterns
  ];

  for (const pattern of invalidPatterns) {
    if (pattern.test(trimmedDomain)) {
      return "Please enter a valid domain name (not an IP address or localhost)";
    }
  }

  return null; // Valid domain
};

// Real-time field validation
export const validateField = (fieldName, value, existingData = {}) => {
  const tempData = { ...existingData, [fieldName]: value };
  const validation = validateCompanyForm(tempData);
  return validation.errors[fieldName] || null;
};

// Additional helper function for domain suggestions
export const getDomainSuggestions = (invalidDomain) => {
  if (!invalidDomain || !invalidDomain.trim()) return [];
  
  const domain = invalidDomain.trim().toLowerCase();
  const suggestions = [];
  
  // If it's just text without a dot, suggest common TLDs
  if (!domain.includes('.')) {
    suggestions.push(
      `${domain}.com`,
      `${domain}.org`,
      `${domain}.net`
    );
  }
  
  // If it ends with common incomplete patterns
  if (domain.endsWith('.co')) {
    suggestions.push(`${domain}m`); // .com
  }
  
  if (domain.endsWith('.or')) {
    suggestions.push(`${domain}g`); // .org
  }
  
  return suggestions.slice(0, 3); // Return max 3 suggestions
};
