"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Code2,
  Clock,
  MoreVertical,
  Trash2,
  ExternalLink,
  Github,
  Target,
  ShieldCheck,
  Globe,
  ChevronRight,
  Zap,
} from "lucide-react";
import TagManager from "./TagManager";
import TechStackManager from "./TechStackManager";
import LinkManager from "./LinkManager";
import { useFeatureStore } from "@/store/featureStore";
import { useFeatureForm } from "../../features/hooks/useFeatureForm";
import FeatureKanban from "../../features/components/FeatureKanban";
import FeatureSheet from "../../features/components/FeatureSheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusConfig = {
  active: {
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    glow: "shadow-emerald-500/20",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-500",
    label: "Active Project",
  },
  completed: {
    gradient: "from-blue-500 via-indigo-600 to-violet-600",
    glow: "shadow-indigo-500/20",
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    dot: "bg-blue-500",
    label: "Mission Accomplished",
  },
  draft: {
    gradient: "from-amber-400 via-orange-500 to-rose-500",
    glow: "shadow-amber-500/20",
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    dot: "bg-amber-500",
    label: "Conceptual Phase",
  },
  archived: {
    gradient: "from-slate-400 via-slate-500 to-slate-600",
    glow: "shadow-slate-500/20",
    badge: "bg-muted text-muted-foreground border-border",
    dot: "bg-slate-400",
    label: "Historic Archive",
  },
};

const ProjectDetail = ({ project, onEdit, onDelete, onChangeStatus }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("blueprint");

  // ─── Feature Execution Store ───
  const {
    features,
    loading: featuresLoading,
    fetchFeatures,
    isSheetOpen,
    openCreateSheet,
    closeSheet,
    editingFeature,
    populateForm: populateStoreForm
  } = useFeatureStore();

  const {
    formData: featureData,
    errors: featureErrors,
    touched: featureTouched,
    isValid: featureIsValid,
    handleChange: handleFeatureChange,
    handleTagsChange: handleFeatureTagsChange,
    handleBlur: handleFeatureBlur,
    handleSubmit: handleFeatureSubmit,
    populateForm: populateLocalForm,
    resetForm: resetFeatureForm,
    setFormData: setFeatureData
  } = useFeatureForm();

  const searchParams = useSearchParams();

  // ─── Lifecycle: Handle Tab Redirection ───
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["blueprint", "registry", "activity"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // ─── Lifecycle: Sync Features ───
  useEffect(() => {
    if (project?._id) {
      fetchFeatures(project._id);
    }
  }, [project?._id, fetchFeatures]);

  // ─── Handlers: Feature Bridge ───
  const handleAddFeature = () => {
    resetFeatureForm();
    setFeatureData(prev => ({ ...prev, projectId: project._id }));
    openCreateSheet();
  };

  const handleEditFeature = (feat) => {
    populateLocalForm(feat);
    openCreateSheet(feat);
  };

  const handleFeatureFormSubmit = async (data) => {
    const success = await handleFeatureSubmit(data, editingFeature?._id);
    if (success) {
      closeSheet();
      resetFeatureForm();
      fetchFeatures(project._id);
    }
  };

  if (!project) return null;

  const cfg = statusConfig[project.status] || statusConfig.active;

  const formatDate = (date) => {
    if (!date) return "Not Defined";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      {/* ─── Ultra-Premium Sticky Header ─── */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="container mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/dashboard/projects")}
              className="rounded-2xl hover:bg-accent text-muted-foreground hover:text-primary transition-all"
            >
              <ArrowLeft size={20} />
            </Button>

            <div className="h-8 w-[1px] bg-border" />

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Project Console</span>
                <ChevronRight size={10} className="text-muted-foreground/50" />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md">
                      <Badge className={`h-4 text-[9px] font-black uppercase px-1.5 border-none shadow-sm cursor-pointer hover:brightness-95 transition-all ${cfg.badge}`}>
                        {project.status}
                      </Badge>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-40 rounded-xl p-1 shadow-2xl border-border bg-popover">
                    {Object.keys(statusConfig).map((status) => (
                      <DropdownMenuItem
                        key={status}
                        onClick={() => onChangeStatus(project._id, status)}
                        className="rounded-lg py-2 cursor-pointer capitalize font-bold text-xs"
                      >
                        <div className={`w-2 h-2 rounded-full mr-3 ${statusConfig[status].dot}`} />
                        {status}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <h1 className="text-xl font-black text-foreground tracking-tight leading-none">
                {project.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 mr-4 text-xs font-bold text-muted-foreground bg-muted px-4 py-2 rounded-2xl border border-border">
              <Clock size={14} className="text-primary" />
              <span>Due: {formatDate(project.deadline)}</span>
            </div>
            <Button
              onClick={handleAddFeature}
              className="rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-11 px-6 transition-all active:scale-95"
            >
              Create Feature
            </Button>

            <Button
              onClick={() => router.push(`/dashboard/project-diary?projectId=${project._id}`)}
              className="rounded-2xl bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-600 font-bold h-11 px-6 transition-all active:scale-95 border border-indigo-500/20"
            >
              Open Diary
            </Button>

            <Button
              onClick={() => onEdit(project)}
              className="rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-11 px-6 transition-all active:scale-95"
            >
              Edit Project
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="group rounded-2xl border-border h-11 w-11 hover:border-primary/50 transition-all bg-background">
                  <MoreVertical size={18} className="text-muted-foreground group-hover:text-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-border bg-popover shadow-2xl">
                <DropdownMenuItem className="rounded-xl py-3 cursor-pointer">
                  <Github size={16} className="mr-3 text-muted-foreground" /> Repository Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl py-3 cursor-pointer">
                  <ExternalLink size={16} className="mr-3 text-muted-foreground" /> View Live Deployment
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2 bg-muted" />
                <DropdownMenuItem onClick={() => onDelete(project._id)} className="rounded-xl py-3 text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer">
                  <Trash2 size={16} className="mr-3" /> Terminate Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-6 py-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10"
        >
          {/* ─── Left Column: Sidebar Metadata ─── */}
          <aside className="lg:col-span-3 space-y-8">
            {/* Project Status Pulse */}
            <motion.section variants={itemVariants} className="bg-card rounded-[2.5rem] border border-border p-8 shadow-sm">
              <div className={`w-full aspect-square rounded-[2rem] bg-gradient-to-br ${cfg.gradient} ${cfg.glow} p-1 mb-6`}>
                <div className="w-full h-full rounded-[1.8rem] bg-card flex items-center justify-center text-4xl font-black tracking-tighter overflow-hidden relative group">
                  <span className={`bg-gradient-to-br ${cfg.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-700`}>
                    {project.name?.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="absolute inset-0 bg-card/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-2">Phase Status</span>
                  <div className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot} animate-pulse shadow-[0_0_8px_rgba(0,0,0,0.1)] dark:shadow-primary/20`} />
                    <span className="text-sm font-black text-foreground/80 tracking-tight">{cfg.label}</span>
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                <div className="grid grid-cols-1 gap-4 text-xs">
                  <div className="flex justify-between items-center text-slate-500">
                    <span className="flex items-center gap-2"><Calendar size={14} /> Created</span>
                    <span className="font-bold text-slate-900">{formatDate(project.createdAt)}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500">
                    <span className="flex items-center gap-2"><Clock size={14} /> Expected</span>
                    <span className="font-bold text-slate-900 underline decoration-indigo-200 underline-offset-4">{formatDate(project.deadline)}</span>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Quick Actions / Integration */}
            {/* <motion.section variants={itemVariants} className="bg-primary rounded-[2.5rem] p-8 text-primary-foreground shadow-xl shadow-primary/10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
              <h3 className="text-lg font-black mb-6 flex items-center gap-3">
                <Zap size={20} className="text-primary-foreground/70 fill-primary-foreground/20" /> Actions
              </h3>
              <div className="space-y-3">
                <Button
                  onClick={() => router.push(`/dashboard/features?projectId=${project._id}&addNew=true`)}
                  className="w-full rounded-2xl bg-white dark:bg-slate-950 text-slate-950 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900 font-black h-12 shadow-md transition-all active:scale-[0.98] border-none"
                >
                  Generate Feature
                </Button>
                <Button
                  onClick={() => router.push(`/dashboard/project-diary/${project._id}`)}
                  variant="ghost"
                  className="w-full rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black h-12"
                >
                  Open Diary
                </Button>
              </div>
            </motion.section> */}

            <LinkManager projectId={project._id} links={project.links || []} />
          </aside>

          {/* ─── Right Column: Main Content Hub ─── */}
          <div className="lg:col-span-9 space-y-8">
            {/* Unified Tabs Container */}
            <div className="bg-card rounded-[3rem] border border-border shadow-sm min-h-[600px] flex flex-col overflow-hidden">
              <Tabs defaultValue="blueprint" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
                <div className="px-10 pt-8 border-b border-border/60">
                  <TabsList className="bg-muted/50 p-1.5 rounded-[1.5rem] border border-border w-fit gap-2">
                    <TabsTrigger value="blueprint" className="rounded-2xl px-6 py-2.5 font-bold data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all">
                      Blueprint
                    </TabsTrigger>
                    <TabsTrigger value="registry" className="rounded-2xl px-6 py-2.5 font-bold data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all">
                      Registry
                    </TabsTrigger>
                    <TabsTrigger value="activity" className="rounded-2xl px-6 py-2.5 font-bold data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all">
                      Activity
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="rounded-2xl px-6 py-2.5 font-bold data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all">
                      Audit
                    </TabsTrigger>
                  </TabsList>
                </div>

                <AnimatePresence mode="wait">
                  <TabsContent value="blueprint" className="flex-1 p-0 focus-visible:outline-none">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.99 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.99 }}
                      transition={{ duration: 0.3 }}
                      className="p-10 space-y-12"
                    >
                      {/* Section: Project Vision */}
                      <section>
                        <div className="flex items-center gap-4 mb-8">
                          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl"><Target size={22} /></div>
                          <div>
                            <h2 className="text-xl font-black text-foreground tracking-tight">Project Vision</h2>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Core Narrative & Goals</p>
                          </div>
                        </div>

                        <div className="relative group">
                          <div className="absolute -inset-4 bg-muted/30 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                          <div className="text-foreground/70 leading-relaxed text-lg max-w-4xl font-medium tracking-tight">
                            {project.description || "Every great project needs a narrative. Define your project's soul, goals, and core logic here to maintain absolute alignment throughout the development lifecycle."}
                          </div>
                        </div>

                        <div className="mt-8">
                          <TagManager projectId={project._id} tags={project.tags} />
                        </div>
                      </section>

                      {/* Section: Technical Registry */}
                      <section>
                        <div className="h-px bg-border mb-12" />

                        <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 text-primary rounded-2xl"><Code2 size={22} /></div>
                            <div>
                              <h2 className="text-xl font-black text-foreground tracking-tight">Technical Registry</h2>
                              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Categorized Architecture & Decisions</p>
                            </div>
                          </div>
                        </div>

                        <TechStackManager projectId={project._id} techStack={project.techStack} />
                      </section>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="registry" className="flex-1 p-0 focus-visible:outline-none">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-10"
                    >
                      <FeatureKanban
                        features={features}
                        loading={featuresLoading}
                        onEdit={handleEditFeature}
                        onView={handleEditFeature}
                      />
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="activity" className="flex-1 flex flex-col items-center justify-center p-20 focus-visible:outline-none">
                    <div className="text-center space-y-6">
                      <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto animate-pulse">
                        <ShieldCheck size={40} />
                      </div>
                      <h3 className="text-2xl font-black text-foreground">Infrastructure Monitoring</h3>
                      <p className="text-muted-foreground max-w-sm font-medium tracking-tight">
                        We are establishing a secure connection to your activity stream. Full audit logs and deployment events will appear here shortly.
                      </p>
                      <Button variant="outline" className="rounded-xl border-border font-bold px-8 bg-background">Sync Stream</Button>
                    </div>
                  </TabsContent>
                </AnimatePresence>
              </Tabs>
            </div>

            {/* Global Context Indicator */}
            <motion.div variants={itemVariants} className="flex items-center justify-between px-10 py-6 bg-slate-950 dark:bg-black border border-white/5 rounded-[2.5rem] text-white overflow-hidden relative">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-white/10 rounded-xl"><Globe size={20} className="text-primary" /></div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 block">Digital Footprint</span>
                  <p className="text-xs font-bold tracking-tight">Global Visibility Active • Version 1.0.4-Zen</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 block">Connectivity</span>
                  <p className="text-xs font-bold tracking-tight text-emerald-400 flex items-center gap-2 justify-end">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Synchronized
                  </p>
                </div>
                <ChevronRight size={20} className="text-white/20" />
              </div>

              {/* Decorative Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] -mr-32 -mt-32" />
            </motion.div>
          </div>
        </motion.div>
      </main>
      {/* Feature Lifecycle Management */}
      <FeatureSheet
        open={isSheetOpen}
        onOpenChange={closeSheet}
        formData={featureData}
        errors={featureErrors}
        touched={featureTouched}
        isValid={featureIsValid}
        isSubmitting={featuresLoading}
        isEditing={!!editingFeature}
        feature={editingFeature}
        onChange={handleFeatureChange}
        onTagsChange={handleFeatureTagsChange}
        onBlur={handleFeatureBlur}
        onSubmit={handleFeatureFormSubmit}
        onCancel={() => {
          closeSheet();
          resetFeatureForm();
        }}
      />
    </div>
  );
};

export default ProjectDetail;
