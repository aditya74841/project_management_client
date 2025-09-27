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
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Project Progress</span>
          <span>{completedFeatures} of {totalFeatures} completed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-right mt-1">
          <span className="text-lg font-bold text-green-600">{progress}%</span>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {featuresByStatus.map((column) => (
          <div key={column.id} className="min-w-[280px]">
            <KanbanColumn
              column={column}
              features={column.features}
              onEdit={onEdit}
              onDelete={onDelete}
              onView={onView}
              loading={loading}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureKanban;
