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
      "flex h-full min-w-[340px] flex-1 flex-col rounded-[2.5rem] p-5 transition-all duration-500 border border-border/40 bg-card/30 backdrop-blur-sm shadow-sm",
    )}>
      {/* Column Header */}
      <div className="flex items-center justify-between mb-8 px-6 py-4 bg-muted/30 rounded-3xl border border-border/50">
        <div className="flex items-center gap-3">
          <div className={cn("w-2 h-2 rounded-full shadow-lg animate-pulse", column.dot)} />
          <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground/70">
             {column.title}
          </h3>
          <div className="px-2.5 py-1 rounded-lg bg-foreground text-background text-[10px] font-black shadow-lg">
            {features.length}
          </div>
        </div>
      </div>

      {/* Feature Lane */}
      <div className="flex-1 space-y-5 overflow-y-auto no-scrollbar pb-6 px-1">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature._id || index}
            feature={feature}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
            loading={loading}
          />
        ))}
        
        {features.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[300px] rounded-[2rem] border-2 border-dashed border-border/30 bg-muted/10 p-10 text-center group/empty">
            <div className="w-16 h-16 rounded-[1.25rem] bg-card shadow-sm border border-border flex items-center justify-center text-muted-foreground/20 mb-6 group-hover/empty:scale-110 transition-transform">
              <Plus size={24} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">
               No Nodes in {column.title}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
