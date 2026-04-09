import React from 'react';
import FeatureCard from './FeatureCard';

const KanbanColumn = ({ column, features, onEdit, onDelete, onView, loading }) => {
  const accentClass = column.id === 'completed'
    ? 'bg-emerald-500'
    : column.id === 'in-progress'
      ? 'bg-amber-500'
      : column.id === 'on-hold'
        ? 'bg-rose-500'
        : 'bg-cyan-600';

  return (
    <div className="flex h-full min-w-[300px] flex-1 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-3">
          <div className={`h-2.5 w-2.5 rounded-full ${accentClass}`} />
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-800">{column.title}</h3>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-700">
            {features.length}
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-1 pb-4">
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
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 py-16">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <div className="h-2 w-2 rounded-full bg-slate-300" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Empty {column.title}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
