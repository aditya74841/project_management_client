import React from "react";
import { Button } from "@/components/ui/button";
import FormField from "../../companies/components/FormField";

const statusOptions = [
  { value: "active",    label: "Active"    },
  { value: "draft",     label: "Draft"     },
  { value: "archived",  label: "Archived"  },
  { value: "completed", label: "Completed" },
];

const ProjectForm = ({
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
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        id="name"
        name="name"
        label="Project Name"
        required
        value={formData.name}
        error={touched.name ? errors.name : null}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Enter project name"
      />

      <FormField
        id="description"
        name="description"
        label="Description"
        value={formData.description}
        error={touched.description ? errors.description : null}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Short description"
      />

      <FormField
        id="deadline"
        name="deadline"
        type="date"
        label="Deadline"
        value={formData.deadline}
        error={touched.deadline ? errors.deadline : null}
        onChange={onChange}
        onBlur={onBlur}
      />

      <div className="space-y-2">
        <label className="text-gray-700 font-medium" htmlFor="status">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
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
            "Update Project"
          ) : (
            "Create Project"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
