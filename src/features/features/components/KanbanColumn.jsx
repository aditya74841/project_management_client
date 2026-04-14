"use client";

import React from 'react';
import FeatureCard from './FeatureCard';
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

/**
 * Modern Kanban Column (Zen Prism Edition)
 * A status-aware container for feature cards with premium header 
 * and empty state handling.
 */
const KanbanColumn = ({ column, features, onEdit, onDelete, onView, loading, onAdd }) => {
  return (
    <div className={cn(
      "flex h-full min-w-[340px] flex-1 flex-col rounded-[2.5rem] p-4 transition-all duration-300 border-2",
      column.color,
      column.border
    )}>
      {/* Column Header */}
      <div className="flex items-center justify-between mb-8 px-5 py-4 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/50">
        <div className="flex items-center gap-3">
          <div className={cn("w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]", column.dot)} />
          <h3 className={cn("text-xs font-black uppercase tracking-[0.2em]", column.text)}>
             {column.title}
          </h3>
          <div className="px-3 py-1 rounded-full bg-slate-950 text-white text-[10px] font-black shadow-lg">
            {features.length}
          </div>
        </div>
      </div>

      {/* Feature Lane */}
      <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar pb-6 px-1">
        {features.map((feature) => (
          <FeatureCard
            key={feature._id}
            feature={feature}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
            loading={loading}
          />
        ))}
        
        {features.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[300px] rounded-[2rem] border-2 border-dashed border-slate-200/50 bg-white/30 backdrop-blur-sm p-10 text-center">
            <div className="w-16 h-16 rounded-[1.25rem] bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-200 mb-6">
              <Plus size={24} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
               No Benchmarks in {column.title} Phase
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
