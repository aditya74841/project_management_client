// app/dashboard/companies/components/CompanySheet.jsx
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CompanyForm from './CompanyForm';

const CompanySheet = ({
  open,
  onOpenChange,
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
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full max-w-xl sm:w-[640px] bg-white shadow-xl">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className="text-2xl font-semibold text-gray-800">
            {isEditing ? "Edit Company" : "Add New Company"}
          </SheetTitle>
          <SheetDescription className="text-gray-500">
            {isEditing 
              ? "Update company information below" 
              : "Fill in the details to create a new company"
            }
          </SheetDescription>
        </SheetHeader>

        <div className="px-6 py-4">
          <CompanyForm
            formData={formData}
            errors={errors}
            touched={touched}
            isValid={isValid}
            isSubmitting={isSubmitting}
            isEditing={isEditing}
            onChange={onChange}
            onBlur={onBlur}
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CompanySheet;
