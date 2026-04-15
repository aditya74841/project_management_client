"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Zap, 
  Plus, 
  LayoutGrid, 
  List, 
  Search, 
  Filter,
  ArrowRight,
  TrendingUp,
  Brain
} from "lucide-react";

import FeatureKanban from "./FeatureKanban";
import FeatureSheet from "./FeatureSheet";
import { useFeatureForm } from "../hooks/useFeatureForm";
import { useFeatureStore } from "@/store/featureStore";
import { useProjectStore } from "@/store/projectStore";
import { useAuthStore } from "@/store/authStore";
import { Button, Input, PageContainer, PageHeader } from "@/components/ui-core";
import { cn } from "@/lib/utils";

/**
 * Features Page Client (Zen Prism Edition)
 * A mission-critical hub for engineering execution. 
 * Facilitates Kanban-based phase tracking and feature-level collaboration.
 */
const FeaturePageClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectIdFromUrl = searchParams.get("projectId");

  // ─── Global State ───
  const { 
    features, 
    loading, 
    fetchFeatures, 
    viewType, 
    setViewType,
    isSheetOpen,
    openCreateSheet,
    closeSheet,
    editingFeature
  } = useFeatureStore();

  const { projects, fetchProjects } = useProjectStore();
  const { isLoggedIn } = useAuthStore();

  // ─── Local UI State ───
  const [selectedProjectId, setSelectedProjectId] = useState(projectIdFromUrl || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("form");

  // ─── Form Hook ───
  const {
    formData,
    errors,
    touched,
    isValid,
    handleChange,
    handleTagsChange,
    handleBlur,
    handleSubmit,
    populateForm,
    resetForm,
    setFormData,
  } = useFeatureForm();

  // ─── Lifecycle ───
  useEffect(() => {
    if (isLoggedIn) fetchProjects();
  }, [isLoggedIn, fetchProjects]);

  useEffect(() => {
    if (selectedProjectId && isLoggedIn) {
      fetchFeatures(selectedProjectId);
    }
  }, [selectedProjectId, isLoggedIn, fetchFeatures]);

  // Handle URL Sync
  useEffect(() => {
    if (projectIdFromUrl && projectIdFromUrl !== selectedProjectId) {
      setSelectedProjectId(projectIdFromUrl);
    }
  }, [projectIdFromUrl, selectedProjectId]);

  const selectedProject = useMemo(() => 
    projects.find(p => p._id === selectedProjectId) || null
  , [projects, selectedProjectId]);

  // ─── Handlers ───
  const handleProjectChange = (id) => {
    setSelectedProjectId(id);
    const url = new URL(window.location.href);
    if (id) {
       url.searchParams.set("projectId", id);
    } else {
       url.searchParams.delete("projectId");
    }
    window.history.pushState({}, "", url);
  };

  const handleAddFeature = () => {
    if (!selectedProjectId) return;
    resetForm();
    setFormData((prev) => ({ ...prev, projectId: selectedProjectId }));
    setActiveTab("form");
    openCreateSheet();
  };

  const onFormSubmit = async (data) => {
    const success = await handleSubmit(data, editingFeature?._id);
    if (success) {
      closeSheet();
      resetForm();
    }
  };

  // ─── UI Partial: Project Banner ───
  const RenderProjectContext = () => {
    if (!selectedProject) return null;
    return (
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-10 text-white shadow-2xl">
         <div className="absolute top-0 right-0 p-10 opacity-10 blur-2xl">
            <TrendingUp size={180} />
         </div>
         
         <div className="relative z-10 grid lg:grid-cols-[1fr,300px] gap-12 items-center">
            <div className="space-y-6">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 text-[10px] font-black uppercase tracking-widest text-indigo-400 border border-indigo-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  Execution Realm: {selectedProject.name}
               </div>
               <h2 className="text-4xl font-black tracking-tight leading-tight max-w-2xl">
                  Engineering the Next Generation of Product Features.
               </h2>
               <p className="text-slate-400 font-medium max-w-xl leading-relaxed">
                  You are viewing the decentralized execution board for this registry node. 
                  Monitor phases, tackle blockers, and synchronize your engineering output.
               </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center backdrop-blur-sm">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Queue</p>
                  <p className="text-3xl font-black">{features.length}</p>
               </div>
               <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center backdrop-blur-sm">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Status</p>
                  <p className="text-sm font-black text-emerald-400 uppercase tracking-widest mt-1">Active</p>
               </div>
            </div>
         </div>
      </div>
    );
  };

  return (
    <PageContainer>
      <PageHeader
        title="Execution Board"
        subtitle="The mission-control for your feature engineering. Transition from ideation to production-ready code."
        icon={Zap}
        actions={
          <div className="flex items-center gap-3">
             <div className="bg-slate-50 p-1.5 rounded-2xl flex items-center gap-1 border border-slate-100 shadow-sm">
                <button 
                  onClick={() => setViewType("kanban")}
                  className={cn(
                    "p-2.5 rounded-xl transition-all",
                    viewType === "kanban" ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                   <LayoutGrid size={18} />
                </button>
                <button 
                  onClick={() => setViewType("list")}
                  className={cn(
                    "p-2.5 rounded-xl transition-all",
                    viewType === "list" ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                   <List size={18} />
                </button>
             </div>
             <Button
                variant="primary"
                size="lg"
                onClick={handleAddFeature}
                className="gap-2 shadow-lg shadow-primary/20"
                disabled={!selectedProjectId}
             >
                <Plus size={20} />
                Initialize Feature
             </Button>
          </div>
        }
      />

      {/* Project Configuration */}
      <div className="grid lg:grid-cols-[1fr,350px] gap-6 items-end">
         <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
               Active Development Node
            </label>
            <div className="relative group">
               <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary p-2 bg-primary/10 rounded-lg">
                  <Brain size={18} />
               </div>
               <select
                 value={selectedProjectId}
                 onChange={(e) => handleProjectChange(e.target.value)}
                 className="w-full h-14 pl-16 pr-6 rounded-2xl border-2 border-slate-100 bg-white text-sm font-bold text-slate-900 outline-none focus:border-primary transition-all appearance-none cursor-pointer"
               >
                  <option value="">Select a registry node...</option>
                  {projects.map((p, index) => (
                    <option key={p._id || index} value={p._id}>{p.name}</option>
                  ))}
               </select>
            </div>
         </div>

         <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
               <Search size={18} />
            </div>
            <Input 
               placeholder="Search registry logs..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="h-14 pl-12 border-2 border-slate-100"
            />
         </div>
      </div>

      <RenderProjectContext />

      {/* Main Execution Flow */}
      <div className="min-h-[500px]">
         {!selectedProjectId ? (
            <div className="flex flex-col items-center justify-center min-h-[500px] border-2 border-dashed border-slate-100 rounded-[3rem] bg-slate-50/50">
               <div className="w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center text-slate-300 border border-slate-100 mb-6">
                  <LayoutGrid size={32} />
               </div>
               <h3 className="text-xl font-black text-slate-900 tracking-tight">Node Not Selected</h3>
               <p className="text-sm text-slate-500 font-medium mt-2">Choose a project to synchronize its execution board.</p>
            </div>
         ) : loading && !features.length ? (
            <div className="flex items-center justify-center min-h-[500px]">
               <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                  <p className="text-sm font-black uppercase tracking-widest text-slate-400">Syncing Registry...</p>
               </div>
            </div>
         ) : (
            <FeatureKanban
              features={features.filter(f => 
                 f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                 f.description?.toLowerCase().includes(searchQuery.toLowerCase())
              )}
              onEdit={(f) => {
                 populateForm(f);
                 setActiveTab("form");
                 openCreateSheet(f);
              }}
              onView={(f) => {
                 populateForm(f);
                 setActiveTab("details");
                 openCreateSheet(f);
              }}
            />
         )}
      </div>

      {/* Lifecycle Stage Management */}
      <FeatureSheet
        open={isSheetOpen}
        onOpenChange={closeSheet}
        formData={formData}
        errors={errors}
        touched={touched}
        isValid={isValid}
        isSubmitting={loading}
        isEditing={!!editingFeature}
        feature={editingFeature}
        onChange={handleChange}
        onTagsChange={handleTagsChange}
        onBlur={handleBlur}
        onSubmit={onFormSubmit}
        initialTab={activeTab}
        onCancel={() => {
          closeSheet();
          resetForm();
        }}
      />
    </PageContainer>
  );
};

export default FeaturePageClient;
