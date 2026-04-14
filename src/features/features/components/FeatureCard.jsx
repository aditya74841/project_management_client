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
      className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500"
      onClick={() => onView(feature)}
    >
      {/* Visual Accent */}
      <div className={cn(
        "absolute top-0 left-12 w-12 h-1 px-4 rounded-b-full transition-all duration-500 group-hover:w-24 group-hover:h-1.5",
        isOverdue ? "bg-rose-500" : "bg-primary"
      )} />

      {/* Header: Identity & Actions */}
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1 pr-8">
           <h4 className="font-black text-slate-900 group-hover:text-primary transition-colors tracking-tight leading-snug line-clamp-2">
             {feature.title}
           </h4>
        </div>

        <DropdownMenu>
           <DropdownMenuTrigger asChild>
              <button 
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all"
              >
                 <MoreHorizontal size={18} />
              </button>
           </DropdownMenuTrigger>
           <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 border-slate-100 shadow-2xl">
              <DropdownMenuItem onClick={() => onView(feature)} className="rounded-xl gap-3 py-3 cursor-pointer">
                 <Eye size={16} className="text-slate-400" />
                 <span className="font-bold text-xs uppercase tracking-widest">Analyze Details</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(feature)} className="rounded-xl gap-3 py-3 cursor-pointer">
                 <Edit size={16} className="text-slate-400" />
                 <span className="font-bold text-xs uppercase tracking-widest">Modify Registry</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem 
                onClick={() => onDelete(feature._id)}
                className="rounded-xl gap-3 py-3 text-rose-600 focus:text-rose-600 focus:bg-rose-50 cursor-pointer"
              >
                 <Trash2 size={16} />
                 <span className="font-bold text-xs uppercase tracking-widest">Decommission</span>
              </DropdownMenuItem>
           </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Narrative Section */}
      <p className="text-[11px] font-medium text-slate-500 line-clamp-2 leading-relaxed mb-6 opacity-80">
        {feature.description || "Mission objectives not yet defined in registry..."}
      </p>

      {/* Execution Progress */}
      {totalTasks > 0 && (
         <div className="space-y-2 mb-6">
            <div className="flex justify-between items-end mb-1">
               <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Execution Phase</span>
               <span className="text-[10px] font-black text-primary">{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
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
        <div className="flex flex-wrap gap-1.5 mb-6">
          {feature.tags.slice(0, 2).map((tag, i) => (
            <div key={i} className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-500 text-[9px] font-black uppercase tracking-tighter border border-indigo-100/50">
               {tag}
            </div>
          ))}
          {feature.tags.length > 2 && (
             <div className="px-2 py-1 rounded-lg bg-slate-50 text-slate-400 text-[9px] font-black tracking-tighter">
                +{feature.tags.length - 2}
             </div>
          )}
        </div>
      )}

      {/* Meta Bar */}
      <div className="flex items-center justify-between pt-5 border-t border-slate-50">
         <div className="flex items-center gap-3">
            <div className={cn(
               "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border flex items-center gap-1.5",
               priority.color, priority.bg, priority.border
            )}>
               <div className={cn("w-1 h-1 rounded-full", priority.color.replace('text', 'bg'))} />
               {priority.label}
            </div>
            {commentCount > 0 && (
               <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-300">
                  <MessageSquare size={12} />
                  {commentCount}
               </div>
            )}
         </div>

         <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-xl border-dashed border transition-all duration-300",
            isOverdue 
              ? "bg-rose-50 text-rose-500 border-rose-200 animate-pulse" 
              : "bg-slate-50/50 text-slate-400 border-slate-100"
         )}>
            {isOverdue ? <AlertCircle size={10} /> : <Clock size={10} />}
            <span className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
               {feature.deadline ? new Date(feature.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Continuous'}
            </span>
         </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
