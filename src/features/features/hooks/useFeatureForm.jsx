"use client";

import { useState, useCallback, useEffect } from "react";
import { useFeatureStore } from "@/store/featureStore";

const initialFormState = {
  title: "",
  description: "",
  priority: "medium",
  status: "pending",
  deadline: new Date().toISOString().split("T")[0],
  tags: [],
};

/**
 * useFeatureForm (Zen Prism Edition)
 * A mission-critical hook for managing the lifecycle of feature definitions.
 * Synchronizes with the global useFeatureStore for registry updates.
 */
export const useFeatureForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);

  const { createFeature, updateFeature, loading } = useFeatureStore();

  // Validate form data
  const validate = useCallback((data) => {
    const newErrors = {};
    if (!data.title?.trim()) newErrors.title = "Milestone designation is required";
    if (data.title?.length > 100) newErrors.title = "Title must be under 100 characters";
    if (data.description?.length > 1000) newErrors.description = "Description too long";
    
    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, []);

  useEffect(() => {
    validate(formData);
  }, [formData, validate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e) => {
    const value = e.target.value;
    const tagsArr = value.split(",").map((t) => t.trim()).filter(Boolean);
    setFormData((prev) => ({ ...prev, tags: tagsArr }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const populateForm = (feature) => {
    if (!feature) {
      setFormData(initialFormState);
      return;
    }
    setFormData({
      title: feature.title || "",
      description: feature.description || "",
      priority: feature.priority || "medium",
      status: feature.status || "pending",
      deadline: feature.deadline ? new Date(feature.deadline).toISOString().split("T")[0] : "",
      tags: feature.tags || [],
    });
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setErrors({});
    setTouched({});
  };

  const handleSubmit = async (submitData, featureId = null) => {
    if (featureId) {
      return await updateFeature(featureId, submitData);
    } else {
      return await createFeature(submitData);
    }
  };

  return {
    formData,
    errors,
    touched,
    isValid,
    loading,
    handleChange,
    handleTagsChange,
    handleBlur,
    handleSubmit,
    populateForm,
    resetForm,
    setFormData,
  };
};
