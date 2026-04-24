"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  MoreVertical,
  Users,
  Edit3,
  Trash2,
  Activity,
  ExternalLink,
  BookText,
  PlusSquare,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui-core";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useProjectStore } from "@/store/projectStore";
import { statusConfig, statusLabels } from "@/features/projects/config/statusConfig";

/**
 * Modern Project Card (Zen Prism Edition)
 * A premium card component with glassmorphism and subtle micro-animations.
 */
const ProgressBar = ({ value, color = "bg-primary" }) => (
  <div className="w-full space-y-2">
    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <Activity className="w-3 h-3 text-primary" />
        Velocity
      </span>
      <span className="text-foreground">{value}%</span>
    </div>
    <div className="h-2 w-full bg-muted rounded-full overflow-hidden shadow-inner">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        className={cn("h-full rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-500", color)}
      />
    </div>
  </div>
);

const ProjectCard = ({ project }) => {
  const router = useRouter();
  const { openEditSheet, setDeleteTarget, changeProjectStatus } = useProjectStore();

  const cfg = statusConfig[project.status] || statusConfig.active;
  const progress =
    project.progress !== undefined
      ? project.progress
      : project.status === "completed"
        ? 100
        : project.status === "active"
          ? 65
          : 15;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative flex flex-col bg-card border border-border rounded-[2rem] p-7 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 overflow-hidden"
    >
      {/* Decorative Gradient Background */}
      <div className={cn("absolute -top-12 -right-12 w-32 h-32 blur-[60px] opacity-10 transition-opacity group-hover:opacity-20", cfg.dot)} />

      {/* Header Area */}
      <div className="flex justify-between items-start mb-6">
        <div className={cn(
          "px-4 py-1.5 rounded-2xl border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm transition-colors",
          cfg.badge
        )}>
          <div className={cn("w-2 h-2 rounded-full animate-pulse", cfg.dot)} />
          {cfg.label}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2.5 rounded-xl hover:bg-accent text-muted-foreground hover:text-foreground transition-all">
              <MoreVertical size={18} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2.5 border-border bg-popover shadow-2xl">
            <DropdownMenuItem
              onSelect={() => {
                setTimeout(() => openEditSheet(project), 100);
              }}
              className="rounded-xl gap-3 py-3 cursor-pointer"
            >
              <Edit3 size={16} className="text-muted-foreground" />
              <span className="font-bold text-sm">Edit Registration</span>
            </DropdownMenuItem>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="rounded-xl gap-3 py-3">
                <Activity size={16} className="text-muted-foreground" />
                <span className="font-bold text-sm">Phase Transition</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="rounded-2xl p-2 border-border bg-popover shadow-xl">
                {statusLabels.map((s) => (
                  <DropdownMenuItem
                    key={s}
                    onSelect={() => changeProjectStatus(project._id, s)}
                    className={cn(
                      "rounded-xl capitalize gap-3 py-2.5 mb-1 last:mb-0",
                      project.status === s ? "bg-primary/5 text-primary" : "text-slate-600"
                    )}
                  >
                    <div className={cn("w-2 h-2 rounded-full", statusConfig[s].dot)} />
                    <span className="font-bold text-xs capitalize">{s}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSeparator className="my-2 bg-muted" />
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setTimeout(() => setDeleteTarget(project), 100);
              }}
              className="rounded-xl gap-3 py-3 text-rose-500 focus:text-rose-500 focus:bg-rose-500/10 cursor-pointer"
            >
              <Trash2 size={16} />
              <span className="font-bold text-sm">Decommission</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Narrative Section */}
      <div className="flex-1 space-y-4 mb-8">
        <div className="space-y-1.5">
          <h3 className="font-black text-xl text-foreground group-hover:text-primary transition-colors tracking-tight leading-tight">
            {project.name}
          </h3>
          <p className="text-sm text-muted-foreground font-medium line-clamp-2 leading-relaxed opacity-80">
            {project.description || "Project parameters initialized. Awaiting detailed strategic narrative."}
          </p>
        </div>

        {/* Dynamic Tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {(project.techStack || []).slice(0, 3).map((tech, i) => {
            const techName = typeof tech === "object" ? tech.name : tech;
            return (
              <span key={i} className="text-[10px] font-black px-3 py-1 rounded-xl bg-muted text-muted-foreground border border-border border-dashed uppercase tracking-wider">
                {techName}
              </span>
            );
          })}
          {(project.techStack?.length || 0) > 3 && (
            <span className="text-[10px] font-bold text-muted-foreground flex items-center bg-muted/50 px-2 rounded-lg">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Metrics Section */}
      <div className="mb-8 p-5 rounded-2xl bg-muted/50 border border-border/50">
        <ProgressBar
          value={progress}
          color={project.status === "completed" ? "bg-emerald-500" : "bg-primary"}
        />
      </div>

      {/* Actions & Attribution */}
      <div className="flex items-center justify-between">
        <div className="flex -space-x-3">
          {(project.members || [1, 2]).slice(0, 3).map((_, i) => (
            <div key={i} className="w-9 h-9 rounded-2xl border-2 border-card bg-muted flex items-center justify-center text-[10px] font-black text-foreground shadow-sm relative group/avatar">
              <Users size={14} className="text-muted-foreground" />
            </div>
          ))}
          {(project.members?.length || 0) > 3 && (
            <div className="w-9 h-9 rounded-2xl border-2 border-card bg-muted flex items-center justify-center text-[10px] font-black text-muted-foreground shadow-sm">
              +{project.members.length - 3}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/dashboard/project-diary?projectId=${project._id}`)}
            className="h-10 px-4 rounded-xl bg-indigo-600/10 text-indigo-600 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-600 hover:text-white transition-all active:scale-95"
          >
            <BookText size={14} />
            Open Diary
          </button>
          <button
            onClick={() => router.push(`/dashboard/projects/${project._id}`)}
            className="h-10 px-5 rounded-xl bg-slate-950 text-white font-black text-[11px] uppercase tracking-widest flex items-center gap-2 hover:bg-primary transition-colors shadow-lg shadow-slate-950/20 active:scale-95"
          >
            Open Hub
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
