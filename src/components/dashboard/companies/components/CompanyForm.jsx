// app/dashboard/companies/components/CompanyForm.jsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FormField from './FormField';

const CompanyForm = ({
  formData,
  errors,
  touched,
  isValid,
  isSubmitting,
  isEditing,
  onChange,
  onBlur,
  onSubmit,
  onCancel
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
        label="Company Name"
        type="text"
        required
        value={formData.name}
        error={touched.name ? errors.name : null}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Enter company name"
      />

      <FormField
        id="email"
        name="email"
        label="Company Email"
        type="email"
        required
        value={formData.email}
        error={touched.email ? errors.email : null}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Enter company email"
      />

      <FormField
        id="domain"
        name="domain"
        label="Company Domain"
        type="text"
        value={formData.domain}
        error={touched.domain ? errors.domain : null}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Enter company domain (e.g., company.com)"
        helpText="Optional field"
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
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {isEditing ? "Updating..." : "Creating..."}
            </div>
          ) : (
            isEditing ? "Update Company" : "Create Company"
          )}
        </Button>
      </div>
    </form>
  );
};

export default CompanyForm;
