"use client";

import React, { useMemo } from 'react';
import KanbanColumn from './KanbanColumn';
import { KANBAN_COLUMNS } from '../utils/constants';
import { motion } from "framer-motion";
import { Zap, CheckCircle2, TrendingUp, Info } from "lucide-react";

/**
 * Tactical Kanban Board (Zen Prism Edition)
 * A high-fidelity execution board for tracking engineering phases. 
 * Features a global progress telemetry bar and status-aware columns.
 */
const FeatureKanban = ({ features, onEdit, onDelete, onView, loading }) => {
  const completedCount = features.filter((f) => f.status === "completed").length;
  const progressPercent = features.length > 0 ? (completedCount / features.length) * 100 : 0;

  return (
    <div className="space-y-10">
      {/* Registry Telemetry Deck */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-[2rem] p-8 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
              <Zap size={80} className="text-primary" />
           </div>
           <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Queue Displacement</p>
           <h3 className="text-3xl font-black text-foreground">{features.length} <span className="text-sm text-muted-foreground font-medium ml-1">Nodes</span></h3>
        </div>

        <div className="bg-card border border-border rounded-[2rem] p-8 shadow-sm relative overflow-hidden group">
           <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Execution Velocity</p>
           <h3 className="text-3xl font-black text-foreground">{Math.round(progressPercent)}% <span className="text-sm text-muted-foreground font-medium ml-1">Complete</span></h3>
           <div className="mt-4 h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.3)]" 
                style={{ width: `${progressPercent}%` }}
              />
           </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-8 shadow-sm relative overflow-hidden group">
           <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Mission Status</p>
           <h3 className="text-2xl font-black text-primary capitalize tracking-tight">Active Deployment</h3>
           <p className="text-xs font-bold text-primary/60 mt-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Registry Synchronized
           </p>
        </div>
      </div>

      <div className="flex gap-8 overflow-x-auto pb-10 no-scrollbar min-h-[700px]">
        {KANBAN_COLUMNS.map((col) => (
          <KanbanColumn
            key={col.id}
            column={col}
            features={features.filter((f) => f.status === col.id)}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
            loading={loading}
          />
        ))}
      </div>

      {/* Collaboration Insight */}
      <div className="flex items-center gap-3 px-6 py-4 bg-muted/20 border border-border rounded-2xl w-fit self-center">
         <Info size={14} className="text-primary" />
         <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
            Drag-and-drop actions are synchronized across the global registry in real-time.
         </p>
      </div>
    </div>
  );
};

export default FeatureKanban;
