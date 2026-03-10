// lib/validations/projectDiaryValidation.js

/**
 * Validate Project Diary form
 * @param {Object} formData - The form data to validate
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export const validateProjectDiaryForm = (formData) => {
    const errors = {};

    // Title validation - required
    if (!formData.title || formData.title.trim() === "") {
        errors.title = "Title is required";
    } else if (formData.title.trim().length < 3) {
        errors.title = "Title must be at least 3 characters";
    } else if (formData.title.trim().length > 100) {
        errors.title = "Title must be less than 100 characters";
    }

    // Description validation - optional but with max length
    if (formData.description && formData.description.trim().length > 1000) {
        errors.description = "Description must be less than 1000 characters";
    }

    // Status validation
    const validStatuses = ["idea", "scoping", "in-progress", "completed", "archived"];
    if (formData.status && !validStatuses.includes(formData.status)) {
        errors.status = "Invalid status value";
    }

    // Priority validation
    const validPriorities = ["low", "medium", "high"];
    if (formData.priority && !validPriorities.includes(formData.priority)) {
        errors.priority = "Invalid priority value";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

/**
 * Validate a single field
 * @param {string} name - Field name
 * @param {any} value - Field value
 * @param {Object} formData - Complete form data (for cross-field validation)
 * @returns {string|null} Error message or null
 */
export const validateProjectDiaryField = (name, value, formData = {}) => {
    switch (name) {
        case "title":
            if (!value || value.trim() === "") return "Title is required";
            if (value.trim().length < 3) return "Title must be at least 3 characters";
            if (value.trim().length > 100) return "Title must be less than 100 characters";
            return null;

        case "description":
            if (value && value.trim().length > 1000) return "Description must be less than 1000 characters";
            return null;

        case "status":
            const validStatuses = ["idea", "scoping", "in-progress", "completed", "archived"];
            if (value && !validStatuses.includes(value)) return "Invalid status value";
            return null;

        case "priority":
            const validPriorities = ["low", "medium", "high"];
            if (value && !validPriorities.includes(value)) return "Invalid priority value";
            return null;

        default:
            return null;
    }
};

/**
 * Validate question form
 */
export const validateQuestionForm = (formData) => {
    const errors = {};
    if (!formData.name || formData.name.trim() === "") {
        errors.name = "Question is required";
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

/**
 * Validate user flow form
 */
export const validateUserFlowForm = (formData) => {
    const errors = {};
    if (!formData.flow || formData.flow.trim() === "") {
        errors.flow = "Flow description is required";
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

/**
 * Validate feature form
 */
export const validateFeatureForm = (formData) => {
    const errors = {};
    if (!formData.name || formData.name.trim() === "") {
        errors.name = "Feature name is required";
    }
    const validPriorities = ["musthave", "nicetohave"];
    if (formData.priority && !validPriorities.includes(formData.priority)) {
        errors.priority = "Invalid priority";
    }
    const validStatuses = ["pending", "in-progress", "completed"];
    if (formData.status && !validStatuses.includes(formData.status)) {
        errors.status = "Invalid status";
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

/**
 * Validate reference link form
 */
export const validateReferenceLinkForm = (formData) => {
    const errors = {};
    if (!formData.name || formData.name.trim() === "") {
        errors.name = "Link name is required";
    }
    if (!formData.url || formData.url.trim() === "") {
        errors.url = "URL is required";
    } else {
        try {
            new URL(formData.url);
        } catch {
            errors.url = "Invalid URL format";
        }
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

/**
 * Status display options
 */
export const STATUS_OPTIONS = [
    { value: "idea", label: "Idea", color: "bg-purple-500" },
    { value: "scoping", label: "Scoping", color: "bg-blue-500" },
    { value: "in-progress", label: "In Progress", color: "bg-amber-500" },
    { value: "completed", label: "Completed", color: "bg-green-500" },
    { value: "archived", label: "Archived", color: "bg-gray-500" },
];

/**
 * Priority display options
 */
export const PRIORITY_OPTIONS = [
    { value: "low", label: "Low", color: "bg-green-500" },
    { value: "medium", label: "Medium", color: "bg-amber-500" },
    { value: "high", label: "High", color: "bg-red-500" },
];

/**
 * Feature priority options
 */
export const FEATURE_PRIORITY_OPTIONS = [
    { value: "musthave", label: "Must Have" },
    { value: "nicetohave", label: "Nice to Have" },
];

/**
 * Feature status options
 */
export const FEATURE_STATUS_OPTIONS = [
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
];
