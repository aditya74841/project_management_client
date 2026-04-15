"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFeatureStore } from "@/store/featureStore";
import { useFeatureForm } from "@/features/features/hooks/useFeatureForm";
import FeatureDetails from "@/features/features/components/FeatureDetails";
import FeatureSheet from "@/features/features/components/FeatureSheet";
import { ArrowLeft, Loader2, Zap } from "lucide-react";
import { Button } from "@/components/ui-core";
import { toast } from "sonner";

/**
 * Standalone Feature Page
 * A dedicated, focused environment for analyzing and managing a single engineering node.
 */
export default function FeatureViewPage() {
  const { featureId } = useParams();
  const router = useRouter();

  const {
    fetchFeatureById,
    loading,
    features,
    deleteFeature,
    isSheetOpen,
    openEditSheet,
    closeSheet,
    editingFeature,
  } = useFeatureStore();

  const {
    formData,
    errors,
    touched,
    isValid,
    handleChange,
    handleTagsChange,
    handleBlur,
    handleSubmit: handleFormSubmit,
    populateForm,
  } = useFeatureForm();

  const [feature, setFeature] = useState(null);

  useEffect(() => {
    if (featureId) {
      const loadFeature = async () => {
        const data = await fetchFeatureById(featureId);
        if (data) setFeature(data);
      };
      loadFeature();
    }
  }, [featureId, fetchFeatureById]);

  // Sync with store if updates happen
  useEffect(() => {
    if (featureId && features.length > 0) {
      const updated = features.find(f => f._id === featureId);
      if (updated) setFeature(updated);
    }
  }, [features, featureId]);

  const handleEdit = () => {
    if (feature) {
      populateForm(feature);
      openEditSheet(feature);
    }
  };

  const handleUpdate = async (data) => {
    const success = await handleFormSubmit(data, featureId);
    if (success) {
      closeSheet();
    }
  };

  const handleDelete = async () => {
    if (window.confirm("ARE YOU SURE YOU WANT TO DECOMMISSION THIS NODE? \n\nThis will permanently extract this feature from the technical registry.")) {
      const success = await deleteFeature(featureId);
      if (success) {
        const projectId = feature.projectId?._id || feature.projectId;
        router.push(`/dashboard/projects/${projectId}?tab=registry`);
      }
    }
  };

  if (loading && !feature) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-6">
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 rounded-full border-4 border-primary/10" />
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap size={24} className="text-primary animate-pulse" />
            </div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground animate-pulse">Syncing Registry Node...</p>
        </div>
      </div>
    );
  }

  if (!feature && !loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-6 bg-background">
        <div className="p-8 bg-rose-500/10 rounded-[2.5rem] text-rose-500 border border-rose-500/20">
          <Zap size={48} />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black tracking-tight">Node Decommissioned</h2>
          <p className="text-muted-foreground font-medium">This registry entry could not be located or has been archived.</p>
        </div>
        <Button
          variant="primary"
          onClick={() => router.back()}
          className="h-14 px-8 rounded-2xl"
        >
          Return to Command Center
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Navigation Bridge */}
      <div className="absolute top-8 left-8 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all shadow-2xl"
        >
          <ArrowLeft size={20} />
        </Button>
      </div>

      <FeatureDetails
        feature={feature}
        standalone={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FeatureSheet
        open={isSheetOpen}
        onOpenChange={closeSheet}
        formData={formData}
        errors={errors}
        touched={touched}
        isValid={isValid}
        isSubmitting={loading}
        isEditing={true}
        feature={editingFeature}
        onChange={handleChange}
        onTagsChange={handleTagsChange}
        onBlur={handleBlur}
        onSubmit={handleUpdate}
        onCancel={closeSheet}
      />
    </div>
  );
}
