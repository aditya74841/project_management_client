// app/dashboard/users/components/UserForm.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import FormField from "../../companies/components/FormField";

const roleOptions = [
  { value: "USER",  label: "User"  },
  { value: "ADMIN", label: "Admin" },
];

const UserForm = ({
  formData,
  errors,
  touched,
  isValid,
  isSubmitting,
  isEditing,
  onChange,
  onBlur,
  onSubmit,
  onCancel,
}) => {
  const [showPwd, setShowPwd] = useState(false);

  /* -------- get companyId from auth slice -------- */
  const { profile } = useSelector((state) => state.auth);
  const companyId   = profile?.company?.id;              // adjust path if different

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, companyId });                // ← include companyId
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ---------- NAME ---------- */}
      <FormField
        id="name"
        name="name"
        label="Full Name"
        value={formData.name}
        error={touched.name ? errors.name : null}
        onChange={onChange}
        onBlur={onBlur}
        required
        placeholder="Enter full name"
      />

      {/* ---------- EMAIL ---------- */}
      <FormField
        id="email"
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        error={touched.email ? errors.email : null}
        onChange={onChange}
        onBlur={onBlur}
        required
        placeholder="Enter email address"
      />

      {/* ---------- PASSWORD (only on create) ---------- */}
      {!isEditing && (
        <div className="relative">
          <FormField
            id="password"
            name="password"
            label="Temporary Password"
            type={showPwd ? "text" : "password"}
            value={formData.password}
            error={touched.password ? errors.password : null}
            onChange={onChange}
            onBlur={onBlur}
            required
            placeholder="Enter password"
          />
          {/* Eye / Eye-off icon */}
          <button
            type="button"
            onClick={() => setShowPwd((v) => !v)}
            className="absolute right-3 top-9 text-gray-400 focus:outline-none"
            tabIndex={-1}
          >
            {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      )}

      {/* ---------- ROLE ---------- */}
      <div className="space-y-2">
        <label htmlFor="role" className="text-gray-700 font-medium">
          Role
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {roleOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* ---------- ACTION BUTTONS ---------- */}
      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button
          type="submit"
          // disabled={!isValid || isSubmitting}
          className={`flex-1 ${
            isValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {isEditing ? "Updating..." : "Creating..."}
            </div>
          ) : isEditing ? (
            "Update User"
          ) : (
            "Create User"
          )}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
