// app/dashboard/companies/components/CompanySheet.jsx
import React, { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CompanyForm from './CompanyForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterForm from './CompanyUserForm';

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
  const [tabValue, setTabValue] = useState("companyForm");

  // Automatically switch to Members tab when editing an existing project
  useEffect(() => {
    if (isEditing) {
      setTabValue("AddUser");
    } else {
      setTabValue("companyForm");
    }
  }, [isEditing]);





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
          <Tabs value={tabValue} onValueChange={setTabValue}>
            <TabsList>
              <TabsTrigger value="companyForm">Company</TabsTrigger>
              <TabsTrigger value="AddUser" disabled={!isEditing}>
                Add User
              </TabsTrigger>
            </TabsList>

            <TabsContent value="companyForm">
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
            </TabsContent>

            <TabsContent value="AddUser">
              {isEditing ? (
                // <ProjectMemberPanel projectId={formData.id || formData._id} />
                // <div><p>Add user</p></div>
                <RegisterForm companyId={formData.id} onRegisterSuccess={() => router.push("/login")} />

              ) : (
                <p className="text-gray-500 text-center py-10">
                  Create the project first to manage members.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>



     
      </SheetContent>
    </Sheet>
  );
};

export default CompanySheet;
