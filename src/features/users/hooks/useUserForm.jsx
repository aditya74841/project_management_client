import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "@/redux/slices/userClientSlice";
import {
  validateUserForm,
  validateUserField,
} from "@/lib/validations/userValidation";

export const useUserForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    role: "USER",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const isValid = !Object.keys(errors).length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateUserField(name, value, formData),
    }));
  };

  const handleBlur = (e) =>
    setTouched((p) => ({ ...p, [e.target.name]: true }));

  const handleSubmit = async (data, editId) => {
    try {
      const { isValid, errors: validationErrors } = validateUserForm(data);
      if (!isValid) {
        setErrors(validationErrors);
        return false;
      }

      if (editId) {
        // dispatch update thunk if implemented
        return true;
      } else {
        await dispatch(createUser(data)).unwrap();
        return true;
      }
    } catch {
      return false;
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      username: "",
      role: "USER",
      password: "",
    });
    setErrors({});
    setTouched({});
  };

  return {
    formData,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFormData,
  };
};
