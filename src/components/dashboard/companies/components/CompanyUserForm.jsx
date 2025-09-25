import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormField from "./FormField";
import { createUserBySuperAdmin } from "@/redux/slices/userClientSlice";
// import { registerUser } from "@/redux/slices/authSlice"; // Suppose you have a thunk

const RegisterForm = ({ companyId, onRegisterSuccess }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  // console.log("The companyUserForm.jsx formData is ",companyId)

  // --- Field Validation ---
  const validate = (data) => {
    const errs = {};
    if (!data.name.trim()) errs.name = "Name is required";
    if (!data.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = "Invalid email format";
    if (!data.password.trim()) errs.password = "Password is required";
    else if (data.password.length < 6) errs.password = "Password must be at least 6 characters";
    return errs;
  };

  // --- Change Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate({ ...formData, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  };

  // --- Submit Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched({ name: true, email: true, password: true });
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      // Submit with companyId and role ADMIN
      // Option 1: with redux thunk
      await dispatch(createUserBySuperAdmin({ ...formData, companyId, role: "ADMIN" })).unwrap();

      // Option 2: direct API call (replace with your API setup if not using RTK)
      /*
      await axios.post("/register", {
        ...formData,
        companyId,
        role: "ADMIN"
      });
      */
      // await dispatch(createUserBySuperAdmin(formData)).unwrap();

      // if (onRegisterSuccess) onRegisterSuccess();
    } catch (error) {
      setErrors({ api: error.message || "Registration failed" });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-center mb-2">Register Admin</h2>

      {/* --- Name --- */}
      <FormField
        id="name"
        name="name"
        label="Full Name"
        required
        value={formData.name}
        error={touched.name ? errors.name : null}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter your full name"
      />

      {/* --- Email --- */}
      <FormField
        id="email"
        name="email"
        label="Email"
        type="email"
        required
        value={formData.email}
        error={touched.email ? errors.email : null}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter your email"
      />

      {/* --- Password --- */}
      <div className="relative">
        <FormField
          id="password"
          name="password"
          label="Password"
          type={showPwd ? "text" : "password"}
          required
          value={formData.password}
          error={touched.password ? errors.password : null}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter password"
        />
        <button
          type="button"
          onClick={() => setShowPwd((v) => !v)}
          className="absolute right-3 top-9 text-gray-400 focus:outline-none"
          tabIndex={-1}
        >
          {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {errors.api && (
        <div className="text-red-500 text-sm mb-2">{errors.api}</div>
      )}

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
