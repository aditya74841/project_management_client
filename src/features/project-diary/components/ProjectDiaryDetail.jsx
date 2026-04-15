"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Target,
  Zap,
  Tag,
  Link2,
  Code2,
  Plus,
  Trash2,
  Pencil,
  PlusCircle,
  CheckCircle2,
  Circle,
  ChevronRight,
  Lightbulb,
  MousePointer2,
  BellRing,
  Check,
  X,
  ExternalLink,
  MessageSquare,
  Globe,
  Settings,
  MoreVertical,
  Activity,
  Sparkles,
  LayoutDashboard
} from "lucide-react";
import {
  Button,
  PageContainer,
  PageHeader,
  GlobalLoader
} from "@/components/ui-core";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useDiaryStore } from "@/store/diaryStore";
import { cn } from "@/lib/utils";

// ─── Sub-Components: Form Parts ───

const InlineInput = ({ value, onChange, placeholder, onSubmit, onCancel, type = "text", multiline = false }) => {
  const [val, setVal] = useState(value || "");
  const Tag = multiline ? "textarea" : "input";

  return (
    <div className={cn("flex items-center gap-2 w-full animate-in fade-in slide-in-from-left-2 duration-300", multiline && "items-start")}>
      <Tag
        autoFocus
        type={!multiline ? type : undefined}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (!multiline || e.ctrlKey)) {
            e.preventDefault();
            onSubmit(val);
          }
          if (e.key === "Escape") onCancel();
        }}
        placeholder={placeholder}
        className={cn(
          "flex-1 bg-card/50 border border-border rounded-xl px-4 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground",
          multiline && "min-h-[100px] resize-none leading-relaxed"
        )}
      />
      <div className={cn("flex flex-col gap-1", !multiline && "flex-row")}>
        <button onClick={() => onSubmit(val)} className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-colors">
          <Check size={18} />
        </button>
        <button onClick={onCancel} className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors">
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const ProjectDiaryDetail = ({ diaryId, projectId, basePath = "/dashboard/project-diary" }) => {
  const router = useRouter();
  const roadmapRef = useRef(null);
  const {
    selectedDiary,
    loading,
    isUpdating,
    fetchDiaryById,
    updateDiary,
    updateStatus,
    updatePriority,
    addQuestion,
    updateQuestion,
    removeQuestion,
    addNarrative,
    updateNarrative,
    removeNarrative,
    addDiaryFeature,
    updateDiaryFeature,
    removeDiaryFeature,
    promoteDiaryFeature,
    toggleDiaryFeature,
    syncMetadata
  } = useDiaryStore();

  const [activeTab, setActiveTab] = useState("blueprint");
  const [addingTo, setAddingTo] = useState(null); // 'question', 'idea', 'flow', 'update', 'feature', 'tag', 'link', 'tech'
  const [editingItem, setEditingItem] = useState(null); // { type, id, initialValue }
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [linkForm, setLinkForm] = useState({ name: "", url: "" });
  const [editingLinkId, setEditingLinkId] = useState(null);
  const [featureForm, setFeatureForm] = useState({ name: "", description: "" });
  const [editingFeatureId, setEditingFeatureId] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    title: "",
    description: "",
    onConfirm: null
  });

  // ─── Bootstrap ───
  useEffect(() => {
    if (diaryId) fetchDiaryById(diaryId);
  }, [diaryId, fetchDiaryById]);

  useEffect(() => {
    if (addingTo === "link") {
      setLinkForm({ name: "", url: "https://" });
    }
  }, [addingTo]);

  if (loading && !selectedDiary) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 rounded-full border-4 border-primary/10" />
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground animate-pulse">Syncing Registry Node...</p>
        </div>
      </div>
    );
  }
  if (!selectedDiary) return (
    <div className="flex flex-col items-center justify-center p-20 text-center space-y-4">
      <div className="p-6 bg-rose-50 rounded-full text-rose-500"><X size={48} /></div>
      <h2 className="text-2xl font-black">Entry Not Found</h2>
      <Button onClick={() => router.push(basePath)}>Back to Registry</Button>
    </div>
  );

  const d = selectedDiary;

  // ─── Status Config ───
  const statusConfig = {
    idea: { color: "bg-amber-500", label: "Idea" },
    scoping: { color: "bg-indigo-500", label: "Scoping" },
    "in-progress": { color: "bg-emerald-500", label: "Active" },
    completed: { color: "bg-blue-500", label: "Done" },
    archived: { color: "bg-slate-500", label: "Archived" }
  };

  const priorityConfig = {
    low: "text-muted-foreground border-border",
    medium: "text-amber-500 border-amber-200 dark:border-amber-500/20",
    high: "text-rose-500 border-rose-200 dark:border-rose-500/20"
  };

  // ─── Action Handlers ───

  const handleAddQuestion = (val) => {
    if (val.trim()) addQuestion(d._id, val);
    setAddingTo(null);
  };

  const handleUpdateQuestion = (qId, updates) => {
    updateQuestion(d._id, qId, updates);
    setEditingItem(null);
  };

  const handleUpdateFeatureDetails = (fId, updates) => {
    updateDiaryFeature(d._id, fId, updates, "details");
    setEditingFeatureId(null);
  };

  const handleOpenDeleteDialog = (title, description, onConfirm) => {
    setDeleteDialog({
      isOpen: true,
      title,
      description,
      onConfirm: () => {
        onConfirm();
        setDeleteDialog(p => ({ ...p, isOpen: false }));
      }
    });
  };

  const handleAddNarrative = (type, val) => {
    if (val.trim()) addNarrative(d._id, type, val);
    setAddingTo(null);
  };

  const handleUpdateNarrative = (type, itemId, val) => {
    updateNarrative(d._id, type, itemId, val);
    setEditingItem(null);
  };

  // ─── RENDER ───

  return (
    <PageContainer className="pb-24">
      {/* ─── Premium Header ─── */}
      <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(projectId ? `/dashboard/project-diary?projectId=${projectId}` : basePath)}
            className="rounded-2xl bg-card shadow-sm border border-border"
          >
            <ArrowLeft size={18} />
          </Button>
          <div className="flex items-center gap-2">


            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Created {new Date(d.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-3 max-w-3xl">
            {isEditingTitle ? (
              <InlineInput
                value={d.title}
                onSubmit={(v) => { updateDiary(d._id, { title: v }); setIsEditingTitle(false); }}
                onCancel={() => setIsEditingTitle(false)}
              />
            ) : (
              <h1
                className="text-4xl font-black text-foreground tracking-tight leading-tight cursor-pointer hover:text-primary transition-colors flex items-center gap-4 group"
                onClick={() => setIsEditingTitle(true)}
              >
                {d.title}
                <Pencil size={20} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
              </h1>
            )}

            {isEditingDesc ? (
              <InlineInput
                value={d.description}
                multiline={true}
                placeholder="Enter description..."
                onSubmit={(v) => { updateDiary(d._id, { description: v }); setIsEditingDesc(false); }}
                onCancel={() => setIsEditingDesc(false)}
              />
            ) : (
              <p
                className="text-lg text-muted-foreground font-medium leading-relaxed cursor-pointer hover:text-foreground transition-colors group flex items-center gap-3"
                onClick={() => setIsEditingDesc(true)}
              >
                {d.description || "Synthesizing product strategy and technical decisions for this entry node."}
                <Pencil size={14} className="text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-all" />
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-3 bg-card p-2 rounded-[2rem] border border-border shadow-sm">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-muted hover:bg-muted/80 transition-all font-black text-[11px] uppercase tracking-widest text-foreground">
                    <div className={cn("w-2 h-2 rounded-full", statusConfig[d.status]?.color)} />
                    {statusConfig[d.status]?.label}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-2xl p-2 border-border shadow-2xl bg-card">
                  {Object.keys(statusConfig).map(st => (
                    <DropdownMenuItem key={st} onClick={() => updateStatus(d._id, st)} className="rounded-xl py-2 font-bold text-[10px] uppercase tracking-widest focus:bg-muted">
                      <div className={cn("w-2 h-2 rounded-full mr-3", statusConfig[st].color)} />
                      {statusConfig[st].label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

            </div>
            <div className="flex items-center gap-3 bg-card p-2 rounded-[2rem] border border-border shadow-sm">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-muted hover:bg-muted/80 transition-all font-black text-[11px] uppercase tracking-widest text-foreground">
                    <div className={cn("w-2 h-2 rounded-full",
                      d.priority === "high" ? "bg-rose-500" :
                        d.priority === "medium" ? "bg-amber-500" : "bg-slate-400"
                    )} />
                    {d.priority} Priority
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-2xl p-2 border-border shadow-2xl bg-card">
                  {["low", "medium", "high"].map(p => (
                    <DropdownMenuItem key={p} onClick={() => updatePriority(d._id, p)} className="rounded-xl py-2 font-bold text-[10px] uppercase tracking-widest focus:bg-muted">
                      <div className={cn("w-2 h-2 rounded-full mr-3",
                        p === "high" ? "bg-rose-500" :
                          p === "medium" ? "bg-amber-500" : "bg-slate-400"
                      )} />
                      {p} Priority
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Unified Console ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* Left Sidebar: Registry & Stats */}
        <aside className="lg:col-span-3 space-y-8 order-2 lg:order-1">
          {/* Metadata Pulse */}
          <section className="bg-card rounded-[2.5rem] border border-border p-8 shadow-sm space-y-8">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">Registry Context</h4>

              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Tags</span>
                <div className="flex flex-wrap gap-2">
                  {d.tags?.map((tag, i) => (
                    <Badge key={`${tag}-${i}`} className="bg-muted text-muted-foreground border-transparent hover:bg-muted/80 transition-colors">
                      {tag}
                      <button onClick={() => syncMetadata(d._id, "tags", "delete", { tag })} className="ml-1 text-muted-foreground hover:text-rose-500">
                        <X size={10} />
                      </button>
                    </Badge>
                  ))}
                  <button onClick={() => setAddingTo("tag")} className="p-1.5 rounded-lg border border-dashed border-border text-muted-foreground hover:text-primary transition-all">
                    <Plus size={12} />
                  </button>
                  {addingTo === "tag" && (
                    <InlineInput
                      placeholder="New tag..."
                      onSubmit={(v) => { syncMetadata(d._id, "tags", "post", { tag: v }); setAddingTo(null); }}
                      onCancel={() => setAddingTo(null)}
                    />
                  )}
                </div>
              </div>

              <div className="h-px bg-border" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Reference Links</span>
                  <button onClick={() => setAddingTo("link")} className="text-primary hover:rotate-90 transition-transform"><Plus size={14} /></button>
                </div>
                <div className="space-y-2">
                  {d.referenceLinks?.map(link => (
                    <div key={link._id} className="group p-3 rounded-2xl bg-muted/50 hover:bg-muted transition-all border border-transparent hover:border-border">
                      {editingLinkId === link._id ? (
                        <div className="space-y-2 animate-in fade-in zoom-in-95">
                          <input
                            autoFocus
                            placeholder="Name"
                            className="w-full text-[11px] font-bold p-2 rounded-lg border-none focus:ring-1 focus:ring-primary/20 bg-background text-foreground"
                            value={linkForm.name}
                            onChange={(e) => setLinkForm(p => ({ ...p, name: e.target.value }))}
                          />
                          <input
                            placeholder="URL"
                            className="w-full text-[11px] font-bold p-2 rounded-lg border-none focus:ring-1 focus:ring-primary/20 bg-background text-foreground"
                            value={linkForm.url}
                            onChange={(e) => setLinkForm(p => ({ ...p, url: e.target.value }))}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                syncMetadata(d._id, "links", "patch", { id: link._id, name: linkForm.name, url: linkForm.url });
                                setEditingLinkId(null);
                              }
                              if (e.key === "Escape") setEditingLinkId(null);
                            }}
                          />
                          <div className="flex justify-end gap-2 text-[10px] font-bold uppercase tracking-widest mt-1">
                            <button onClick={() => setEditingLinkId(null)} className="text-muted-foreground hover:text-foreground">Discard</button>
                            <button onClick={() => {
                              syncMetadata(d._id, "links", "patch", { id: link._id, name: linkForm.name, url: linkForm.url });
                              setEditingLinkId(null);
                            }} className="text-primary">Sync Link</button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 truncate">
                            <Link2 size={14} className="text-indigo-500" />
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[11px] font-black text-foreground hover:underline truncate">{link.name}</a>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                            <button
                              onClick={() => {
                                setEditingLinkId(link._id);
                                setLinkForm({ name: link.name, url: link.url });
                              }}
                              className="p-1 text-muted-foreground hover:text-primary"
                            >
                              <Pencil size={10} />
                            </button>
                            <button
                              onClick={() => handleOpenDeleteDialog(
                                "Purge Reference",
                                `Are you sure you want to remove the link "${link.name}" from the registry?`,
                                () => syncMetadata(d._id, "links", "delete", { id: link._id })
                              )}
                              className="p-1 text-muted-foreground hover:text-rose-500"
                            >
                              <Trash2 size={10} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {addingTo === "link" && (
                    <div className="space-y-2 p-3 bg-muted rounded-2xl border border-primary/20 animate-in fade-in zoom-in-95">
                      <input
                        autoFocus
                        placeholder="Name"
                        className="w-full text-[11px] font-bold p-2 rounded-lg border-none focus:ring-1 focus:ring-primary/20 bg-background text-foreground"
                        value={linkForm.name}
                        onChange={(e) => setLinkForm(p => ({ ...p, name: e.target.value }))}
                      />
                      <input
                        placeholder="URL"
                        className="w-full text-[11px] font-bold p-2 rounded-lg border-none focus:ring-1 focus:ring-primary/20 bg-background text-foreground"
                        value={linkForm.url}
                        onChange={(e) => setLinkForm(p => ({ ...p, url: e.target.value }))}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            syncMetadata(d._id, "links", "post", { name: linkForm.name, url: linkForm.url });
                            setAddingTo(null);
                            setLinkForm({ name: "", url: "" });
                          }
                          if (e.key === "Escape") setAddingTo(null);
                        }}
                      />
                      <div className="flex justify-end gap-2 text-[10px] font-bold uppercase tracking-widest mt-1">
                        <button onClick={() => setAddingTo(null)} className="text-muted-foreground hover:text-foreground transition-colors">Abort</button>
                        <button
                          onClick={() => {
                            syncMetadata(d._id, "links", "post", { name: linkForm.name, url: linkForm.url });
                            setAddingTo(null);
                            setLinkForm({ name: "", url: "" });
                          }}
                          className="text-primary transition-colors"
                        >
                          Initialize
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="h-px bg-border" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Tech Stack</span>
                  <button onClick={() => setAddingTo("tech")} className="text-primary"><Plus size={14} /></button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {d.techStack?.map(tech => (
                    <Badge key={tech} variant="outline" className="border-indigo-500/20 text-indigo-500 bg-indigo-500/10">
                      {tech}
                      <button onClick={() => syncMetadata(d._id, "tech-stack", "delete", { tech })} className="ml-1 hover:text-rose-500"><X size={10} /></button>
                    </Badge>
                  ))}
                  {addingTo === "tech" && (
                    <InlineInput
                      placeholder="Platform/Tool..."
                      onSubmit={(v) => { syncMetadata(d._id, "tech-stack", "post", { tech: v }); setAddingTo(null); }}
                      onCancel={() => setAddingTo(null)}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Infrastructure Pulse */}
          <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-500/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 transform translate-x-12 -translate-y-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-700">
              <Activity size={180} className="text-white/5" />
            </div>
            <div className="relative z-10 space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Audit Logic</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[11px] font-bold">
                  <span className="text-white/40">Strategic Questions</span>
                  <span>{d.questions?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-bold">
                  <span className="text-white/40">Narrative Nodes</span>
                  <span>{(d.ideas?.length || 0) + (d.userFlow?.length || 0) + (d.projectUpdate?.length || 0)}</span>
                </div>
                <div className="h-px bg-white/5" />
                <p className="text-[10px] font-bold text-emerald-400 tracking-tight flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Synchronized with Server
                </p>
              </div>
            </div>
          </section>
        </aside>

        {/* Main Hub */}
        <div className="lg:col-span-9 space-y-8 order-1 lg:order-2">
          <div className="bg-card rounded-[3rem] border border-border shadow-sm min-h-[600px] flex flex-col overflow-hidden">
            <Tabs defaultValue="blueprint" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
              <div className="px-10 pt-8 border-b border-border/60">
                <TabsList className="bg-muted p-1.5 rounded-[1.5rem] border border-border w-fit gap-2">
                  <TabsTrigger value="blueprint" className="rounded-2xl px-6 py-2.5 font-bold data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all">
                    Blueprint
                  </TabsTrigger>
                  <TabsTrigger value="narrative" className="rounded-2xl px-6 py-2.5 font-bold data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all">
                    Narrative
                  </TabsTrigger>
                  <TabsTrigger value="roadmap" className="rounded-2xl px-6 py-2.5 font-bold data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all">
                    Roadmap
                  </TabsTrigger>
                </TabsList>
              </div>

              <AnimatePresence mode="wait">
                {/* ─── Tabs: Blueprint (Questions) ─── */}
                {activeTab === "blueprint" && (
                  <TabsContent key="blueprint" value="blueprint" className="flex-1 p-0 m-0 border-none outline-none">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -10 }}
                      className="p-10 space-y-10"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl"><Target size={22} /></div>
                          <div>
                            <h2 className="text-xl font-black text-foreground tracking-tight">Strategic Blueprint</h2>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">Foundational Engineering Questions</p>
                          </div>
                        </div>
                        <Button variant="ghost" className="rounded-xl text-primary font-black text-[11px] uppercase tracking-widest" onClick={() => setAddingTo("question")}>
                          <Plus size={16} className="mr-2" /> Inject Question
                        </Button>
                      </div>

                      <div className="space-y-6">
                        {addingTo === "question" && (
                          <InlineInput
                            placeholder="What is the core technical challenge...?"
                            onSubmit={handleAddQuestion}
                            onCancel={() => setAddingTo(null)}
                          />
                        )}

                        {d.questions?.map((q, idx) => (
                          <div key={q._id || `q-${idx}`} className={cn(
                            "group relative bg-muted/30 rounded-[2rem] p-8 border hover:bg-card hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500",
                            q.isCompleted ? "border-emerald-500/20 opacity-80" : "border-transparent hover:border-border"
                          )}>
                            <div className="flex items-start justify-between gap-6">
                              <div className="space-y-4 flex-1">
                                <div className="flex items-center gap-3">
                                  <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Question {idx + 1}</span>
                                  <button
                                    onClick={() => handleUpdateQuestion(q._id, { isCompleted: !q.isCompleted })}
                                    className={cn(
                                      "p-1.5 rounded-full transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest",
                                      q.isCompleted ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground hover:bg-emerald-500/10 hover:text-emerald-500"
                                    )}
                                  >
                                    {q.isCompleted ? <CheckCircle2 size={12} /> : <Circle size={12} />}
                                    {q.isCompleted ? "Resolved" : "Active"}
                                  </button>
                                </div>

                                {editingItem?.id === q._id && editingItem?.type === "question" ? (
                                  <div className="flex items-center gap-2">
                                    <input
                                      autoFocus
                                      className="bg-transparent border-none text-lg font-black text-foreground tracking-tight leading-snug p-0 focus:ring-0 w-full"
                                      defaultValue={q.name}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") handleUpdateQuestion(q._id, { name: e.target.value });
                                        if (e.key === "Escape") setEditingItem(null);
                                      }}
                                      onBlur={(e) => handleUpdateQuestion(q._id, { name: e.target.value })}
                                    />
                                  </div>
                                ) : (
                                  <h3
                                    onClick={() => setEditingItem({ id: q._id, type: "question" })}
                                    className={cn(
                                      "text-lg font-black text-foreground tracking-tight leading-snug cursor-text hover:text-primary transition-colors",
                                      q.isCompleted && "line-through opacity-50"
                                    )}
                                  >
                                    {q.name}
                                  </h3>
                                )}

                                <div className="relative group/answer">
                                  <textarea
                                    className="w-full bg-transparent border-none text-muted-foreground font-medium leading-relaxed resize-none focus:ring-0 placeholder:text-muted/50 min-h-[60px]"
                                    placeholder="Synthesize your answer here..."
                                    defaultValue={q.answer}
                                    onBlur={(e) => handleUpdateQuestion(q._id, { answer: e.target.value })}
                                  />
                                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-indigo-500/30 scale-x-0 group-focus-within/answer:scale-x-100 transition-transform origin-left duration-500" />
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleOpenDeleteDialog(
                                    "Purge Question",
                                    `Permanently remove "${q.name}"? All synthesized answers will be lost.`,
                                    () => removeQuestion(d._id, q._id)
                                  )}
                                  className="p-2 text-muted-foreground hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </TabsContent>
                )}

                {/* ─── Tabs: Narrative (Ideas, Flow, Updates) ─── */}
                {activeTab === "narrative" && (
                  <TabsContent key="narrative" value="narrative" className="flex-1 p-0 m-0 border-none outline-none">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -10 }}
                      className="p-10 space-y-12"
                    >
                      <section className="space-y-8">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl"><Lightbulb size={22} /></div>
                            <h2 className="text-xl font-black text-foreground tracking-tight">Ideation Stream</h2>
                          </div>
                          <button onClick={() => setAddingTo("idea")} className="p-2 bg-muted text-muted-foreground hover:text-amber-500 rounded-xl transition-all"><Plus size={20} /></button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {addingTo === "idea" && (
                            <div className="md:col-span-2">
                              <InlineInput placeholder="Capture a flash of insight..." onSubmit={(v) => handleAddNarrative("idea", v)} onCancel={() => setAddingTo(null)} />
                            </div>
                          )}
                          {d.ideas?.map((idea, idx) => (
                            <div key={idea._id || `idea-${idx}`} className="group p-6 rounded-[1.8rem] bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/10 hover:bg-card hover:border-amber-500/30 transition-all relative">
                              <textarea
                                className="w-full bg-transparent border-none text-[13px] font-bold text-foreground leading-relaxed resize-none focus:ring-0 p-0"
                                defaultValue={idea.idea}
                                onBlur={(e) => handleUpdateNarrative("idea", idea._id, e.target.value)}
                              />
                              <button
                                onClick={() => handleOpenDeleteDialog(
                                  "Purge Insight",
                                  "Remove this flash of insight from the ideation stream?",
                                  () => removeNarrative(d._id, "idea", idea._id)
                                )}
                                className="absolute top-4 right-4 text-amber-500/30 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </section>

                      <div className="h-px bg-border" />

                      <section className="space-y-8">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl"><MousePointer2 size={22} /></div>
                            <h2 className="text-xl font-black text-foreground tracking-tight">User Flow Logic</h2>
                          </div>
                          <button onClick={() => setAddingTo("flow")} className="p-2 bg-muted text-muted-foreground hover:text-blue-500 rounded-xl transition-all"><Plus size={20} /></button>
                        </div>
                        <div className="space-y-3">
                          {addingTo === "flow" && (
                            <InlineInput placeholder="Define interaction steps..." onSubmit={(v) => handleAddNarrative("flow", v)} onCancel={() => setAddingTo(null)} />
                          )}
                          {d.userFlow?.map((flow, i) => (
                            <div key={flow._id || `flow-${i}`} className="group flex items-center gap-4 p-4 rounded-2xl bg-muted/50 hover:bg-blue-500/10 transition-all">
                              <span className="text-[10px] font-black text-blue-500/40">0{i + 1}</span>
                              <input
                                className="flex-1 bg-transparent border-none text-[13px] font-bold text-foreground focus:ring-0 placeholder:text-muted-foreground/50"
                                defaultValue={flow.flow}
                                onBlur={(e) => handleUpdateNarrative("flow", flow._id, e.target.value)}
                              />
                              <button
                                onClick={() => handleOpenDeleteDialog(
                                  "Purge Flow Step",
                                  "Remove this logic step from the user flow mapping?",
                                  () => removeNarrative(d._id, "flow", flow._id)
                                )}
                                className="p-1.5 text-muted-foreground/30 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </section>

                      <div className="h-px bg-border" />

                      <section className="space-y-8">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl"><BellRing size={22} /></div>
                            <h2 className="text-xl font-black text-foreground tracking-tight">Update</h2>
                          </div>
                          <button onClick={() => setAddingTo("update")} className="p-2 bg-muted text-muted-foreground hover:text-emerald-500 rounded-xl transition-all"><Plus size={20} /></button>
                        </div>
                        <div className="space-y-6">
                          {addingTo === "update" && (
                            <InlineInput placeholder="Log a significant update..." onSubmit={(v) => handleAddNarrative("update", v)} onCancel={() => setAddingTo(null)} />
                          )}
                          {d.projectUpdate?.map((update, idx) => (
                            <div key={update._id || `upd-${idx}`} className="group flex gap-6 relative">
                              <div className="relative flex flex-col items-center">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)] mt-2" />
                                <div className="w-px h-full bg-border group-last:hidden" />
                              </div>
                              <div className="flex-1 pb-10">
                                <textarea
                                  className="w-full bg-transparent border-none text-[13px] font-medium text-muted-foreground leading-relaxed resize-none focus:ring-0 p-0"
                                  defaultValue={update.update}
                                  onBlur={(e) => handleUpdateNarrative("update", update._id, e.target.value)}
                                />
                                <button
                                  onClick={() => handleOpenDeleteDialog(
                                    "Purge Log",
                                    "Are you sure you want to remove this project update log?",
                                    () => removeNarrative(d._id, "update", update._id)
                                  )}
                                  className="text-[10px] font-black uppercase text-muted-foreground/30 hover:text-rose-500 mt-2 transition-colors"
                                >
                                  Purge Log
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    </motion.div>
                  </TabsContent>
                )}

                {/* ─── Tabs: Roadmap (Features) ─── */}
                {activeTab === "roadmap" && (
                  <TabsContent key="roadmap" value="roadmap" className="flex-1 p-0 m-0 border-none outline-none">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -10 }}
                      className="p-10 space-y-10"
                    >
                      <div ref={roadmapRef} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-rose-500/10 text-rose-500 rounded-2xl"><Zap size={22} /></div>
                          <h2 className="text-xl font-black text-foreground tracking-tight">
                            {editingFeatureId ? "Update Specification" : "Proposed Features"}
                          </h2>
                        </div>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setEditingFeatureId(null);
                            setFeatureForm({ name: "", description: "" });
                            setAddingTo("feature");
                          }}
                          className="font-black text-[11px] uppercase tracking-widest text-primary"
                        >
                          <Plus size={16} className="mr-2" /> Add Spec
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {(addingTo === "feature" || editingFeatureId) && (
                          <div className="md:col-span-2 p-8 bg-muted/50 rounded-[2.5rem] border border-primary/20 space-y-6 animate-in fade-in zoom-in-95 duration-500">
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Label</label>
                                <input
                                  placeholder="Core functionality name..."
                                  className="w-full h-14 rounded-2xl border-none font-bold px-6 bg-background text-foreground focus:ring-2 focus:ring-primary/20 transition-all text-lg"
                                  value={featureForm.name}
                                  onChange={(e) => setFeatureForm(p => ({ ...p, name: e.target.value }))}
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Technical Scope</label>
                                <textarea
                                  placeholder="Detailed engineering requirements and expected outcomes..."
                                  className="w-full rounded-2xl border-none font-medium px-6 py-4 min-h-[150px] bg-background text-foreground focus:ring-2 focus:ring-primary/20 transition-all leading-relaxed"
                                  value={featureForm.description}
                                  onChange={(e) => setFeatureForm(p => ({ ...p, description: e.target.value }))}
                                />
                              </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                              <Button
                                variant="outline"
                                className="rounded-xl font-black text-[10px] uppercase tracking-widest px-6"
                                onClick={() => {
                                  setAddingTo(null);
                                  setEditingFeatureId(null);
                                  setFeatureForm({ name: "", description: "" });
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                className={cn(
                                  "rounded-xl font-black text-[10px] uppercase tracking-widest px-8 shadow-lg transition-all",
                                  editingFeatureId ? "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20" : "bg-primary hover:bg-primary/90 shadow-primary/20"
                                )}
                                disabled={!featureForm.name.trim()}
                                onClick={() => {
                                  if (editingFeatureId) {
                                    updateDiaryFeature(d._id, editingFeatureId, featureForm, "details");
                                  } else {
                                    addDiaryFeature(d._id, featureForm);
                                  }
                                  setAddingTo(null);
                                  setEditingFeatureId(null);
                                  setFeatureForm({ name: "", description: "" });
                                }}
                              >
                                {editingFeatureId ? "Sync Update" : "Establish Spec"}
                              </Button>
                            </div>
                          </div>
                        )}

                        {d.features?.map((feat, idx) => (
                          <div key={feat._id || `feat-${idx}`} className={cn(
                            "p-8 rounded-[2.2rem] border transition-all duration-500 relative flex flex-col justify-between group/card",
                            feat.status === "completed" ? "bg-emerald-500/5 border-emerald-500/10" : "bg-card border-border shadow-xl shadow-black/5 hover:scale-[1.01]"
                          )}>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-6">
                                <div className="space-y-3">
                                  <Badge variant="outline" className={cn("uppercase text-[8px] font-black tracking-[0.15em] px-2 py-0.5",
                                    feat.priority === "musthave" ? "text-amber-500 border-amber-500/20 bg-amber-500/5" : "text-blue-500 border-blue-500/20 bg-blue-500/5"
                                  )}>
                                    {feat.priority === "musthave" ? "Must Have" : "Nice to Have"}
                                  </Badge>
                                  <h3 className={cn("text-xl font-black tracking-tight", feat.status === "completed" ? "line-through text-muted-foreground/30" : "text-foreground group-hover/card:text-primary transition-colors")}>
                                    {feat.name}
                                  </h3>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      setEditingFeatureId(feat._id);
                                      setFeatureForm({ name: feat.name, description: feat.description });
                                      roadmapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                                    }}
                                    className="p-2.5 rounded-xl bg-muted text-muted-foreground hover:bg-amber-500/10 hover:text-amber-500 transition-all opacity-0 group-hover/card:opacity-100"
                                  >
                                    <Pencil size={16} />
                                  </button>
                                  <button
                                    onClick={() => updateDiaryFeature(d._id, feat._id, { status: feat.status === "completed" ? "pending" : "completed" }, "status")}
                                    className={cn("p-2.5 rounded-xl transition-all",
                                      feat.status === "completed" ? "text-emerald-500 bg-emerald-500/10" : "text-muted-foreground/30 bg-muted hover:text-emerald-500 hover:bg-emerald-500/5"
                                    )}
                                  >
                                    <CheckCircle2 size={20} />
                                  </button>
                                </div>
                              </div>

                              <p className={cn(
                                "text-[13px] text-muted-foreground font-medium leading-relaxed mb-8",
                                feat.status === "completed" && "opacity-40"
                              )}>
                                {feat.description}
                              </p>
                            </div>

                            <div className="flex items-center justify-between border-t border-border/50 pt-5 mt-auto">
                              <div className="flex items-center gap-2">
                                {feat.spawnedFeatureId ? (
                                  <button 
                                    onClick={() => router.push(`/dashboard/features/view/${feat.spawnedFeatureId}`)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
                                  >
                                    <LayoutDashboard size={12} />
                                    Established
                                  </button>
                                ) : (
                                  <button 
                                    onClick={() => promoteDiaryFeature(d._id, feat._id)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20 hover:bg-primary/20 transition-all group/promote"
                                  >
                                    <Sparkles size={12} className="group-hover/promote:rotate-12 transition-transform" />
                                    Scale to Registry
                                  </button>
                                )}
                                
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <button className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 hover:text-foreground py-1.5 px-3 rounded-lg hover:bg-muted transition-all flex items-center gap-2 border border-transparent hover:border-border">
                                      <div className={cn("w-1.5 h-1.5 rounded-full", feat.priority === "musthave" ? "bg-amber-500" : "bg-blue-500")} />
                                      Priority
                                    </button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className="rounded-xl p-1 shadow-2xl border-border bg-card">
                                    <DropdownMenuItem onClick={() => updateDiaryFeature(d._id, feat._id, { priority: "musthave" }, "priority")} className="rounded-lg font-bold text-[10px] uppercase tracking-widest text-amber-500">Must Have</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => updateDiaryFeature(d._id, feat._id, { priority: "nicetohave" }, "priority")} className="rounded-lg font-bold text-[10px] uppercase tracking-widest text-blue-500">Nice to Have</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>

                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <button className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 hover:text-foreground py-1.5 px-3 rounded-lg hover:bg-muted transition-all border border-transparent hover:border-border">
                                      Status: <span className="text-foreground ml-1">{feat.status}</span>
                                    </button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className="rounded-xl p-1 shadow-2xl border-border bg-card">
                                    <DropdownMenuItem onClick={() => updateDiaryFeature(d._id, feat._id, { status: "pending" }, "status")} className="rounded-lg font-bold text-[10px] uppercase tracking-widest">Pending</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => updateDiaryFeature(d._id, feat._id, { status: "in-progress" }, "status")} className="rounded-lg font-bold text-[10px] uppercase tracking-widest text-indigo-500">In Progress</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => updateDiaryFeature(d._id, feat._id, { status: "completed" }, "status")} className="rounded-lg font-bold text-[10px] uppercase tracking-widest text-emerald-500">Completed</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>

                              <button
                                onClick={() => handleOpenDeleteDialog(
                                  "Purge Feature Spec",
                                  `Are you sure you want to remove "${feat.name}"? This will permanently delete the proposed specification.`,
                                  () => removeDiaryFeature(d._id, feat._id)
                                )}
                                className="p-2.5 text-muted-foreground/20 hover:text-rose-500 transition-colors opacity-0 group-hover/card:opacity-100"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </TabsContent>
                )}
              </AnimatePresence>
            </Tabs>
          </div>
        </div>
      </div>

      {/* ─── Deletion Confirmation Dialog ─── */}
      <Dialog open={deleteDialog.isOpen} onOpenChange={(open) => !open && setDeleteDialog(p => ({ ...p, isOpen: false }))}>
        <DialogContent className="rounded-3xl border-border bg-card p-0 overflow-hidden max-w-md">
          <div className="p-8 space-y-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-rose-500/10 rounded-2xl text-rose-500">
                <Trash2 size={32} />
              </div>
              <DialogHeader>
                <DialogTitle className="text-2xl font-black tracking-tight">{deleteDialog.title}</DialogTitle>
                <DialogDescription className="text-sm font-medium text-muted-foreground leading-relaxed">
                  {deleteDialog.description}
                </DialogDescription>
              </DialogHeader>
            </div>

            <DialogFooter className="flex gap-3 sm:justify-center">
              <Button
                variant="outline"
                className="flex-1 rounded-2xl font-black text-[11px] uppercase tracking-widest h-12 border-border"
                onClick={() => setDeleteDialog(p => ({ ...p, isOpen: false }))}
              >
                Nevermind
              </Button>
              <Button
                className="flex-1 rounded-2xl font-black text-[11px] uppercase tracking-widest h-12 bg-rose-500 hover:bg-rose-600 text-white border-none shadow-lg shadow-rose-500/20"
                onClick={deleteDialog.onConfirm}
              >
                Confirm Purge
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default ProjectDiaryDetail;
