import { useState, useCallback } from "react";
import { useProjectStore } from "@/store/projectStore";
import {
  validateProjectForm,
  validateProjectField,
} from "@/lib/validations/projectValidation";

/**
 * useProjectForm Hook (Zen Prism Edition)
 * Manages the logic for Project creation and updates.
 * Directly synchronized with the global projectStore.
 */
export const useProjectForm = () => {
  const { 
    createProject, 
    updateProject,
    formData,
    setFormData,
    formErrors: errors,
    setFormErrors: setErrors,
    formTouched: touched,
    setFormTouched: setTouched,
    openCreateSheet,
    openEditSheet,
    resetFormState,
    clearSheetContext,
  } = useProjectStore();

  /** 
   * Form Validation 
   */
  const validateForm = useCallback(() => {
    const { isValid, errors: validationErrors } = validateProjectForm(formData);
    setErrors(validationErrors);
    return isValid;
  }, [formData, setErrors]);

  /**
   * Field Change Handler
   */
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      
      // Update store state
      setFormData({ [name]: value });
      
      // Real-time validation
      const err = validateProjectField(name, value, formData);
      setErrors((prev) => ({ ...prev, [name]: err }));
    },
    [formData, setFormData, setErrors]
  );

  /**
   * Field Blur Handler (Touch tracking)
   */
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
  }, [setTouched]);

  /** 
   * Parse comma-separated strings 
   */
  const parseCSV = (str) =>
    str ? str.split(",").map((s) => s.trim()).filter(Boolean) : [];

  /**
   * Submission Logic
   */
  const handleSubmit = useCallback(
    async (data, id, options = {}) => {
      const { quickCreate = false } = options;
      
      // Mark fields as touched on submit
      setTouched(
        quickCreate
          ? { name: true }
          : { 
              name: true, 
              description: true, 
              deadline: true, 
              status: true, 
              tags: true, 
              techStack: true 
              }
      );

      if (!validateForm()) return false;

      // Sanitize Payload
      const payload = quickCreate
        ? { 
            name: data.name.trim(), 
            status: "draft" 
          }
        : {
            name: data.name.trim(),
            description: data.description.trim(),
            deadline: data.deadline || null,
            status: data.status,
            tags: parseCSV(data.tags),
          };

      // Dispatch to store
      return id
        ? await updateProject(id, payload)
        : await createProject(payload);
    },
    [validateForm, createProject, updateProject, setTouched]
  );

  /**
   * Reset Utility
   */
  const resetForm = useCallback(() => {
    resetFormState();
  }, [resetFormState]);

  const { isValid } = validateProjectForm(formData);

  return {
    formData,
    setFormData,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    clearSheetContext,
    handleOpenEdit: openEditSheet,
    handleOpenCreate: openCreateSheet,
  };
};
