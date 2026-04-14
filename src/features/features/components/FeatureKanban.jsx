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
  // Group features by status
  const featuresByStatus = useMemo(() => 
    KANBAN_COLUMNS.map(column => ({
      ...column,
      features: features.filter(feature => feature.status === column.id)
    }))
  , [features]);

  const totalFeatures = features.length;
  const completedFeatures = features.filter(f => f.status === 'completed').length;
  const progress = totalFeatures > 0 ? Math.round((completedFeatures / totalFeatures) * 100) : 0;

  return (
    <div className="flex h-full flex-col space-y-8 mt-10">
      {/* Telemetry Dashboard */}
      <div className="hidden md:block relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
         <div className="absolute top-0 right-0 p-8 opacity-5">
            <Zap size={100} className="text-primary rotate-12" />
         </div>

         <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 rounded-3xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100/50">
                  <TrendingUp size={28} />
               </div>
               <div className="space-y-1">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">Execution Velocity</h2>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    {completedFeatures} of {totalFeatures} Benchmarks Finalized
                  </p>
               </div>
            </div>

            <div className="flex-1 max-w-lg space-y-4">
               <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Global Synchronicity</span>
                  </div>
                  <span className="text-4xl font-black text-slate-900 tracking-tighter">
                    {progress}<span className="text-xl text-slate-300 ml-1">%</span>
                  </span>
               </div>
               <div className="h-2 w-full rounded-full bg-slate-50 border border-slate-100 overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${progress}%` }}
                   transition={{ duration: 1, ease: "easeOut" }}
                   className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                 />
               </div>
            </div>
         </div>
      </div>

      {/* Kanban Grid */}
      <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar scroll-smooth">
        {featuresByStatus.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            features={column.features}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
            loading={loading}
          />
        ))}
      </div>

      {/* Collaboration Insight */}
      <div className="flex items-center gap-3 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl w-fit self-center">
         <Info size={14} className="text-primary" />
         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Drag-and-drop actions are synchronized across the global registry in real-time.
         </p>
      </div>
    </div>
  );
};

export default FeatureKanban;
