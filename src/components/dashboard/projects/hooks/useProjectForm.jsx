import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  createProject,
  updateProject,
} from "../../../../redux/slices/projectSlice";

import {
  validateProjectForm,
  validateProjectField,
} from "@/lib/validations/projectValidation"; 

export const useProjectForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    deadline: "",
    status: "active",
  });
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});

  const validateForm = useCallback(() => {
    const { isValid, errors } = validateProjectForm(formData);
    setErrors(errors);
    return isValid;
  }, [formData]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((p) => ({ ...p, [name]: value }));
      const err = validateProjectField(name, value, formData);
      setErrors((prev) => ({ ...prev, [name]: err }));
    },
    [formData]
  );

  const handleBlur = useCallback((e) => {
    setTouched((p) => ({ ...p, [e.target.name]: true }));
  }, []);

  const handleSubmit = useCallback(
    async (data, id) => {
      setTouched({ name: true, description: true, status: true });
      if (!validateForm()) return false;

      const payload = {
        name:        data.name.trim(),
        description: data.description.trim(),
        deadline:    data.deadline || null,
        status:      data.status,
      };

      try {
        id
          ? await dispatch(updateProject({ projectId: id, ...payload })).unwrap()
          : await dispatch(createProject(payload)).unwrap();
        return true;
      } catch (err) {
        // console.error(err);
        return false;
      }
    },
    [dispatch, validateForm]
  );

  const resetForm = useCallback(() => {
    setFormData({ name: "", description: "", deadline: "", status: "active" });
    setErrors({});
    setTouched({});
  }, []);

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
  };
};
