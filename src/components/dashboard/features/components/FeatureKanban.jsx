import React from 'react';
import KanbanColumn from './KanbanColumn';
import { KANBAN_COLUMNS } from '../utils/constants';

const FeatureKanban = ({ features, onEdit, onDelete, onView, loading }) => {
  // Group features by status
  const featuresByStatus = KANBAN_COLUMNS.map(column => ({
    ...column,
    features: features.filter(feature => feature.status === column.id)
  }));

  const totalFeatures = features.length;
  const completedFeatures = features.filter(f => f.status === 'completed').length;
  const progress = totalFeatures > 0 ? Math.round((completedFeatures / totalFeatures) * 100) : 0;

  return (
    <div className="flex h-full flex-col space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-gray-800">Progress</h2>
            <p className="text-sm text-gray-500">
              {completedFeatures} of {totalFeatures} features completed
            </p>
          </div>

          <div className="flex-1 max-w-md w-full space-y-3">
             <div className="flex justify-between items-end">
                <span className="text-sm font-semibold text-cyan-700">Completion</span>
                <span className="text-3xl font-bold text-cyan-700 leading-none">{progress}<span className="text-lg opacity-50">%</span></span>
             </div>
             <div className="h-3 w-full rounded-full bg-slate-100">
               <div 
                 className="h-full rounded-full bg-cyan-600 transition-all duration-500"
                 style={{ width: `${progress}%` }}
               />
             </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 gap-4 overflow-x-auto pb-4">
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
    </div>
  );
};

export default FeatureKanban;
