"use client";

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
import { 
  Sparkles, 
  Settings2, 
  X, 
  Zap, 
  Layers,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui-core";
import { cn } from "@/lib/utils";

/**
 * Feature Management Sheet (Zen Prism Edition)
 * A premium dual-state sidepanel for defining and analyzing engineering milestones.
 * Facilitates seamless transitions between configuration and detail analysis.
 */
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
        className="w-full max-w-2xl sm:max-w-3xl bg-card p-0 border-l border-border shadow-2xl overflow-hidden flex flex-col"
        side="right"
      >
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {!feature || tabValue === "form" ? (
             <div className="px-10 py-12">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-12">
                   <div className="space-y-3">
                      <div className="flex items-center gap-3">
                         <div className="w-12 h-12 rounded-[1.25rem] bg-primary shadow-xl shadow-primary/20 flex items-center justify-center text-background">
                            <Zap size={22} fill="currentColor" />
                         </div>
                         <div className="space-y-0.5">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                               Execution Registry Core
                            </p>
                            <SheetTitle className="text-3xl font-black text-foreground tracking-tight">
                               {isEditing ? "Refine Milestone" : "Define Feature"}
                            </SheetTitle>
                         </div>
                      </div>
                      <SheetDescription className="text-sm font-medium text-muted-foreground/60 max-w-md leading-relaxed">
                         {isEditing
                           ? "Optimize the technical requirements and strategic alignment for this registry node."
                           : "Initialize a new development track for your project's feature distribution."}
                      </SheetDescription>
                   </div>

                   <button 
                     onClick={onCancel}
                     className="p-3 rounded-2xl bg-muted text-muted-foreground/30 hover:text-foreground hover:bg-muted/80 transition-all active:scale-95 border border-transparent hover:border-border"
                   >
                     <X size={24} />
                   </button>
                </div>

                {/* Form Wrapper */}
                <div className="relative">
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
                   <div className="mt-12 pt-8 border-t border-border/50">
                      <button 
                        onClick={() => setTabValue("details")}
                        className="flex items-center gap-2 text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest hover:text-primary transition-all group"
                      >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Analysis Details
                      </button>
                   </div>
                )}
             </div>
          ) : (
            <div className="h-full flex flex-col bg-muted/20">
               <div className="flex-1 overflow-y-auto no-scrollbar">
                  <FeatureDetails feature={feature} />
               </div>
               <div className="p-8 bg-card border-t border-border shadow-[0_-10px_30px_rgba(0,0,0,0.02)] relative z-10">
                  <Button 
                    variant="outline"
                    onClick={() => setTabValue("form")}
                    className="w-full h-14 rounded-2xl gap-3 font-black text-[11px] uppercase tracking-widest border-2 border-border/50 hover:border-primary/20 hover:bg-primary/5 hover:text-primary transition-all"
                  >
                    <Settings2 className="w-4 h-4" />
                    Modify Technical Configuration
                  </Button>
               </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FeatureSheet;
