import React from 'react';
import FeatureCard from './FeatureCard';

const KanbanColumn = ({ column, features, onEdit, onDelete, onView, loading }) => {
  return (
    <div className="flex-1 bg-gray-50 rounded-lg p-4">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-900">{column.title}</h3>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
            {features.length}
          </span>
        </div>
      </div>

      {/* Column Content */}
      <div className="space-y-2 min-h-[400px]">
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
          <div className="text-center text-gray-400 text-sm py-8">
            No {column.title.toLowerCase()} features
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
