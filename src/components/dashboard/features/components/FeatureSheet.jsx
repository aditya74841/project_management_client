import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import FeatureForm from "./FeatureForm";
import FeatureDetails from "./FeatureDetails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FeatureSheet = ({
  open,
  onOpenChange,
  formData,
  errors,
  touched,
  isValid,
  isSubmitting,
  isEditing,
  feature,
  onChange,
  onBlur,
  onSubmit,
  onCancel,
}) => {
  const [tabValue, setTabValue] = useState("form");

  // Switch tabs based on editing state
  useEffect(() => {
    if (isEditing && feature) {
      setTabValue("details");
    } else {
      setTabValue("form");
    }
  }, [isEditing, feature]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full max-w-xl sm:w-[640px] bg-white shadow-xl">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className="text-2xl font-semibold text-gray-800">
            {isEditing ? "Edit Feature" : "Add New Feature"}
          </SheetTitle>
          <SheetDescription className="text-gray-500">
            {isEditing
              ? "Update feature information below"
              : "Fill in the details to create a new feature"}
          </SheetDescription>
        </SheetHeader>

        <div className="px-6 py-4">
          <Tabs value={tabValue} onValueChange={setTabValue}>
            <TabsList>
              <TabsTrigger value="form">
                {isEditing ? "Edit" : "Create"}
              </TabsTrigger>
              {feature && (
                <TabsTrigger value="details">Details</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="form">
              <FeatureForm
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

            {feature && (
              <TabsContent value="details">
                <FeatureDetails feature={feature} />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FeatureSheet;
