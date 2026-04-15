"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  MoreVertical,
  Eye,
  Trash2,
  Lightbulb,
  Target,
  Zap,
  CheckCircle2,
  Archive,
  ChevronRight,
  Tag,
  Code2,
  Edit2
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui-core";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  idea: { label: "Idea", icon: Lightbulb, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10", border: "border-purple-100 dark:border-purple-500/20", dot: "bg-purple-500" },
  scoping: { label: "Scoping", icon: Target, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-100 dark:border-blue-500/20", dot: "bg-blue-500" },
  "in-progress": { label: "Executing", icon: Zap, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-100 dark:border-amber-500/20", dot: "bg-amber-500" },
  completed: { label: "Finalized", icon: CheckCircle2, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-100 dark:border-emerald-500/20", dot: "bg-emerald-500" },
  archived: { label: "Archived", icon: Archive, color: "text-slate-600 dark:text-slate-400", bg: "bg-slate-50 dark:bg-slate-500/10", border: "border-slate-100 dark:border-slate-500/20", dot: "bg-slate-500" },
};

const PRIORITY_CONFIG = {
  low: { label: "Standard", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  medium: { label: "Critical", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10" },
  high: { label: "Mission Critical", color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-500/10" },
};

/**
 * Modern Project Diary Card (Zen Prism Edition)
 * A premium entry card with detailed metadata and high-fidelity interactions.
 */
const ProjectDiaryCard = ({ diary, onEdit, onDelete }) => {
  const router = useRouter();
  const status = STATUS_CONFIG[diary.status] || STATUS_CONFIG.idea;
  const priority = PRIORITY_CONFIG[diary.priority] || PRIORITY_CONFIG.medium;
  const StatusIcon = status.icon;

  const featuresCount = diary.features?.length || 0;
  const completedFeatures = diary.features?.filter((f) => f.status === "completed").length || 0;

  const handleView = () => {
    const query = diary.projectId ? `?projectId=${diary.projectId}` : "";
    router.push(`/dashboard/project-diary/view/${diary._id}${query}`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative flex flex-col bg-card border border-border rounded-[2rem] p-7 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 overflow-hidden"
    >
      {/* Decorative Accent */}
      <div className={cn("absolute -top-12 -right-12 w-32 h-32 blur-[60px] opacity-10", status.dot)} />

      {/* Header: Status & Actions */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex flex-wrap gap-2">
          <div className={cn(
            "px-4 py-1.5 rounded-2xl border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm transition-colors",
            status.color, status.bg, status.border
          )}>
            <div className={cn("w-2 h-2 rounded-full animate-pulse", status.dot)} />
            <StatusIcon className="w-3 h-3" />
            {status.label}
          </div>
          <div className={cn(
            "px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2",
            priority.color, priority.bg
          )}>
            {priority.label}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2.5 rounded-xl bg-background/50 hover:bg-muted text-muted-foreground hover:text-primary border border-border/50 hover:border-primary/20 transition-all shadow-sm backdrop-blur-sm">
              <MoreVertical size={18} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2.5 border-border bg-card shadow-2xl relative z-50">
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setTimeout(handleView, 100);
              }}
              className="rounded-xl gap-3 py-3 cursor-pointer"
            >
              <Eye size={16} className="text-muted-foreground" />
              <span className="font-bold text-sm">Analyze Details</span>
            </DropdownMenuItem>
            {/* <DropdownMenuItem
              onSelect={(e) => {
                // e.preventDefault();
                setTimeout(() => onEdit(diary), 100);
              }}
              className="rounded-xl gap-3 py-3 cursor-pointer"
            >
              <Edit2 size={16} className="text-muted-foreground" />
              <span className="font-bold text-sm">Edit Metadata</span>
            </DropdownMenuItem> */}
            <DropdownMenuSeparator className="my-2 bg-border" />
            <DropdownMenuItem
              onSelect={() => {
                // e.preventDefault();
                setTimeout(() => onDelete(diary._id), 100);
              }}
              className="rounded-xl gap-3 py-3 text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-500/10 cursor-pointer"
            >
              <Trash2 size={16} />
              <span className="font-bold text-sm">Decommission</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Narrative Body */}
      <div className="flex-1 space-y-4 mb-8 text-left">
        <div className="space-y-1.5">
          <h3 className="font-black text-xl text-foreground group-hover:text-primary transition-colors tracking-tight leading-tight">
            {diary.title}
          </h3>
          <p className="text-sm text-muted-foreground font-medium line-clamp-3 leading-relaxed opacity-80">
            {diary.description || "Thinking pattern identified. Documenting strategic alignment..."}
          </p>
        </div>

        {/* Feature Progress if any */}
        {featuresCount > 0 && (
          <div className="flex items-center gap-3 py-2 px-4 rounded-xl bg-muted/50 border border-border w-fit">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Features: {completedFeatures} / {featuresCount}
            </span>
          </div>
        )}
      </div>

      {/* Metadata Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {(diary.tags || []).slice(0, 3).map((tag, i) => (
          <div key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-muted text-muted-foreground border border-border border-dashed">
            <Tag size={10} className="text-primary/40" />
            <span className="text-[10px] font-black uppercase tracking-tighter">{tag}</span>
          </div>
        ))}
        {(diary.techStack || []).slice(0, 2).map((tech, i) => {
          const techName = typeof tech === "object" ? tech.name : tech;
          return (
            <div key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 border-dashed">
              <Code2 size={10} />
              <span className="text-[10px] font-black uppercase tracking-tighter">{techName}</span>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="w-full gap-2 pt-6 border-t border-border flex flex-row">
        <button
          onClick={handleView}
          className="w-1/2 h-12 rounded-xl bg-foreground text-background font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all shadow-lg shadow-black/10 active:scale-[0.98]"
        >
          Open Registry
          <ChevronRight size={14} />
        </button>
        <button
          // onClick={handleView}
          onClick={() => {
            setTimeout(() => onEdit(diary), 100);
          }}
          className="w-1/2 h-12 rounded-xl bg-foreground text-background font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all shadow-lg shadow-black/10 active:scale-[0.98]"
        >
          <Edit2 size={14} />
          Edit Diary
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectDiaryCard;
