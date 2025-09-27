import React from "react";
import { Button } from "@/components/ui/button";
import FormField from "./FormField";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../utils/constants";

const FeatureForm = ({
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

  const handleTagsChange = (e) => {
    const value = e.target.value;
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
    onChange({ target: { name: 'tags', value: tags } });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow max-w-md mx-auto space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-2">
          <h2 className="text-2xl font-bold">
            {isEditing ? "Edit Feature" : "Create New Feature"}
          </h2>
          <p className="text-gray-500 text-sm">
            {isEditing
              ? "Update feature details"
              : "Add a new feature to your project"}
          </p>
        </div>

        <FormField
          id="title"
          name="title"
          label="Feature Title"
          required
          value={formData.title}
          error={touched.title ? errors.title : null}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Enter feature title"
        />

        <FormField
          id="description"
          name="description"
          label="Description"
          value={formData.description}
          error={touched.description ? errors.description : null}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Describe what this feature does..."
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Priority <span className="text-red-500">*</span>
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={onChange}
              onBlur={onBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {PRIORITY_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={onChange}
              onBlur={onBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {STATUS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <FormField
          id="deadline"
          name="deadline"
          label="Deadline"
          type="date"
          value={formData.deadline}
          error={touched.deadline ? errors.deadline : null}
          onChange={onChange}
          onBlur={onBlur}
        />

        <FormField
          id="tags"
          name="tags"
          label="Tags"
          value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''}
          onChange={handleTagsChange}
          onBlur={onBlur}
          placeholder="Enter tags separated by commas"
          helpText="e.g., frontend, auth, api"
        />

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`flex-1 ${
              isValid
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {isEditing ? "Updating..." : "Creating..."}
              </div>
            ) : isEditing ? (
              "Update Feature"
            ) : (
              "Create Feature"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FeatureForm;
