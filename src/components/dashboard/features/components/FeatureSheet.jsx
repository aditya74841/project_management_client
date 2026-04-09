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
import { Sparkles, Settings2 } from "lucide-react";

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
  onTagsChange,
  initialTab = "form"
}) => {
  const [tabValue, setTabValue] = useState(initialTab);

  // Sync tab value when sheet opens
  useEffect(() => {
    if (open) {
      setTabValue(initialTab);
    }
  }, [open, initialTab]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        className="w-full max-w-2xl sm:max-w-3xl bg-white/95 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.1)] border-l border-white/20 p-0 overflow-hidden flex flex-col"
        side="right"
      >
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {!feature || tabValue === "form" ? (
             <div className="p-8 md:p-12">
                <SheetHeader className="mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                     <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <SheetTitle className="text-4xl font-black text-gray-900 tracking-tight">
                    {isEditing ? "Refine Feature" : "Define Feature"}
                  </SheetTitle>
                  <SheetDescription className="text-lg font-medium text-gray-400">
                    {isEditing
                      ? "Polish the details and requirements of this milestone."
                      : "Start a new development track for your project."}
                  </SheetDescription>
                </SheetHeader>

                <div className="bg-gray-50/50 rounded-[2.5rem] p-4 border border-gray-100">
                  <FeatureForm
                    formData={formData}
                    errors={errors}
                    touched={touched}
                    isValid={isValid}
                    isSubmitting={isSubmitting}
                    isEditing={isEditing}
                    onTagsChange={onTagsChange}
                    onChange={onChange}
                    onBlur={onBlur}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                  />
                </div>
                
                {feature && (
                  <button 
                    onClick={() => setTabValue("details")}
                    className="mt-8 flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-colors"
                  >
                    <Settings2 className="w-4 h-4" />
                    Back to Details
                  </button>
                )}
             </div>
          ) : (
            <div className="h-full flex flex-col">
               <div className="flex-1">
                  <FeatureDetails feature={feature} />
               </div>
               <div className="p-8 bg-white border-t border-gray-50">
                  <button 
                    onClick={() => setTabValue("form")}
                    className="w-full py-4 rounded-2xl bg-gray-50 text-gray-500 font-black uppercase tracking-widest text-[11px] border border-gray-100 hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                  >
                    <Settings2 className="w-4 h-4" />
                    Edit Feature Configuration
                  </button>
               </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FeatureSheet;
