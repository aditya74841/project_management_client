"use client";

import React from "react";
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Calendar, 
  CheckSquare, 
  MessageSquare, 
  Tag, 
  ChevronRight,
  Eye,
  AlertCircle,
  Zap,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const PRIORITY_CONFIG = {
  low: { label: "Low", color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-100" },
  medium: { label: "Medium", color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" },
  high: { label: "High", color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-100" },
  urgent: { label: "Urgent", color: "text-rose-500", bg: "bg-rose-50", border: "border-rose-100" },
};

/**
 * Modern Feature Card (Zen Prism Edition)
 * A premium execution card with status-aware styling and high-fidelity progress tracking.
 */
const FeatureCard = ({ feature, onEdit, onDelete, onView, loading }) => {
  const priority = PRIORITY_CONFIG[feature.priority] || PRIORITY_CONFIG.medium;
  const isOverdue = feature.deadline && new Date(feature.deadline) < new Date() && feature.status !== 'completed';
  
  const completedTasks = feature.questions?.filter(q => q.isCompleted).length || 0;
  const totalTasks = feature.questions?.length || 0;
  const commentCount = feature.comments?.length || 0;
  const progressPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative bg-card border border-border/40 rounded-[2.5rem] p-6 shadow-sm hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 cursor-pointer overflow-hidden"
      onClick={() => onView(feature)}
    >
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Visual Accent */}
      <div className={cn(
        "absolute top-0 left-12 w-12 h-1 px-4 rounded-b-full transition-all duration-500 group-hover:w-24 group-hover:h-1.5",
        isOverdue ? "bg-rose-500" : "bg-primary"
      )} />

      {/* Header: Identity & Actions */}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="space-y-1 pr-8">
           <h4 className="font-black text-foreground group-hover:text-primary transition-colors tracking-tight leading-snug line-clamp-2">
             {feature.title}
           </h4>
        </div>

        <DropdownMenu>
           <DropdownMenuTrigger asChild>
              <button 
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-xl text-muted-foreground/30 hover:bg-muted hover:text-foreground transition-all"
              >
                 <MoreHorizontal size={18} />
              </button>
           </DropdownMenuTrigger>
           <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 border-border bg-card shadow-2xl">
              <DropdownMenuItem 
                onSelect={(e) => {
                   e.preventDefault();
                   setTimeout(() => onView(feature), 100);
                }} 
                className="rounded-xl gap-3 py-3 cursor-pointer"
              >
                 <Eye size={16} className="text-muted-foreground" />
                 <span className="font-bold text-[10px] uppercase tracking-widest">Analyze Details</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onSelect={(e) => {
                   e.preventDefault();
                   setTimeout(() => onEdit(feature), 100);
                }} 
                className="rounded-xl gap-3 py-3 cursor-pointer"
              >
                 <Edit size={16} className="text-muted-foreground" />
                 <span className="font-bold text-[10px] uppercase tracking-widest">Modify Registry</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-2 bg-muted" />
              <DropdownMenuItem 
                onSelect={(e) => {
                   e.preventDefault();
                   setTimeout(() => onDelete(feature._id), 100);
                }}
                className="rounded-xl gap-3 py-3 text-rose-500 focus:text-rose-500 focus:bg-rose-500/10 cursor-pointer"
              >
                 <Trash2 size={16} />
                 <span className="font-bold text-[10px] uppercase tracking-widest">Decommission</span>
              </DropdownMenuItem>
           </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Narrative Section */}
      <p className="text-[11px] font-medium text-muted-foreground line-clamp-2 leading-relaxed mb-6 opacity-70 relative z-10">
        {feature.description || "Mission objectives not yet defined in registry..."}
      </p>

      {/* Execution Progress */}
      {totalTasks > 0 && (
         <div className="space-y-2 mb-6 relative z-10">
            <div className="flex justify-between items-end mb-1">
               <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Execution Phase</span>
               <span className="text-[10px] font-black text-primary">{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${progressPercent}%` }}
                 className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.3)]"
               />
            </div>
         </div>
      )}

      {/* Tags Registry */}
      {feature.tags && feature.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-6 relative z-10">
          {feature.tags.slice(0, 2).map((tag, i) => (
            <div key={i} className="px-3 py-1 rounded-lg bg-primary/5 text-primary text-[10px] font-black uppercase tracking-tighter border border-primary/10">
               {tag}
            </div>
          ))}
          {feature.tags.length > 2 && (
             <div className="px-2 py-1 rounded-lg bg-muted text-muted-foreground/40 text-[9px] font-black tracking-tighter">
                +{feature.tags.length - 2}
             </div>
          )}
        </div>
      )}

      {/* Meta Bar */}
      <div className="flex items-center justify-between pt-5 border-t border-border/40 relative z-10">
         <div className="flex items-center gap-3">
            <div className={cn(
               "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border flex items-center gap-1.5",
               priority.value === 'high' || priority.value === 'urgent' ? "text-rose-500 bg-rose-500/10 border-rose-500/20" : "text-primary bg-primary/10 border-primary/20"
            )}>
               <div className={cn("w-1 h-1 rounded-full", priority.value === 'high' || priority.value === 'urgent' ? "bg-rose-500" : "bg-primary")} />
               {priority.label}
            </div>
            {commentCount > 0 && (
               <div className="flex items-center gap-1.5 text-[10px] font-black text-muted-foreground/30">
                  <MessageSquare size={12} />
                  {commentCount}
               </div>
            )}
         </div>

         <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-xl border-dashed border transition-all duration-300",
            isOverdue 
              ? "bg-rose-500/10 text-rose-500 border-rose-500/20 animate-pulse" 
              : "bg-muted text-muted-foreground/40 border-border"
         )}>
            {isOverdue ? <AlertCircle size={10} /> : <Clock size={10} />}
            <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
               {feature.deadline ? new Date(feature.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Continuous'}
            </span>
         </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
