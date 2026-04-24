"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, MoreVertical, Edit3, Trash2, Edit } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { statusConfig, statusLabels } from "@/features/projects/config/statusConfig";
import { useProjectStore } from "@/store/projectStore";

const ProjectListRow = ({ project }) => {
  const router = useRouter();
  const { openEditSheet, setDeleteTarget, changeProjectStatus } = useProjectStore();

  const cfg = statusConfig[project.status] || statusConfig.active;
  const progress = project.progress !== undefined ? project.progress : 45;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="group flex items-center gap-4 bg-card border border-border rounded-xl p-3 hover:border-primary/30 hover:shadow-sm transition-all"
    >
      {/* Name + Description */}
      <div className="flex-1 flex items-center gap-4 min-w-0">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-sm flex-shrink-0", cfg.dot)}>
          {project.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-bold text-foreground truncate group-hover:text-primary transition-colors">
            {project.name}
          </span>
          <span className="text-[10px] text-muted-foreground truncate max-w-[200px]">
            {project.description || "No metadata description available."}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="hidden lg:flex flex-[0.6] items-center gap-3">
        <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden max-w-[80px]">
          <div className="bg-primary h-full rounded-full" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-[10px] font-bold text-muted-foreground">{progress}%</span>
      </div>

      {/* Tech Stack */}
      <div className="hidden xl:flex items-center gap-2 flex-1">
        {(project.techStack || []).slice(0, 2).map((tech, i) => {
          const techName = typeof tech === "object" ? tech.name : tech;
          return (
            <span key={i} className="text-[9px] font-bold px-2 py-0.5 rounded bg-muted border border-border text-muted-foreground">
              {techName}
            </span>
          );
        })}
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-6 pr-2">
        <div className={cn("hidden sm:flex px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-widest gap-1.5 items-center whitespace-nowrap", cfg.badge)}>
          <div className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)} />
          {cfg.label}
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push(`/dashboard/projects/${project._id}`)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10"
          >
            <ArrowRight size={18} />
          </Button>
          <Button
            onClick={() => {
              setTimeout(() => openEditSheet(project), 100);
            }}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10"
          >
            <Edit size={18} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 rounded-xl p-2 border-border bg-popover shadow-2xl">

              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="rounded-lg gap-2 font-bold">
                  <Activity size={14} className="text-muted-foreground" /> State Change
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="rounded-xl p-1 border-border bg-popover shadow-xl">
                  {statusLabels.map((s) => (
                    <DropdownMenuItem
                      key={s}
                      onSelect={() => changeProjectStatus(project._id, s)}
                      className={cn(
                        "rounded-lg capitalize gap-2",
                        project.status === s && "font-bold text-primary bg-primary/10"
                      )}
                    >
                      <div className={cn("w-2 h-2 rounded-full", statusConfig[s].dot)} />
                      {s}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => {
                  setTimeout(() => setDeleteTarget(project), 100);
                }}
                className="rounded-lg gap-2 text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
              >
                <Trash2 size={14} /> Terminate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectListRow;
