import React from 'react';
import { Calendar, Flag, User, Tag } from 'lucide-react';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../utils/constants';

const FeatureDetails = ({ feature }) => {
  if (!feature) {
    return (
      <div className="text-center text-gray-500 py-8">
        Select a feature to view details
      </div>
    );
  }

  const priorityInfo = PRIORITY_OPTIONS.find(p => p.value === feature.priority);
  const statusInfo = STATUS_OPTIONS.find(s => s.value === feature.status);

  return (
    <div className="bg-white p-6 space-y-6">
      {/* Title and Description */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {feature.description || 'No description provided'}
        </p>
      </div>

      {/* Priority and Status */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Flag className="w-4 h-4" />
            Priority
          </div>
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-${priorityInfo?.color}-100 text-${priorityInfo?.color}-800`}>
            {priorityInfo?.label}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <User className="w-4 h-4" />
            Status
          </div>
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-${statusInfo?.color}-100 text-${statusInfo?.color}-800`}>
            {statusInfo?.label}
          </div>
        </div>
      </div>

      {/* Deadline */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Calendar className="w-4 h-4" />
          Deadline
        </div>
        <div className="text-sm text-gray-600">
          {feature.deadline 
            ? new Date(feature.deadline).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            : 'No deadline set'
          }
        </div>
      </div>

      {/* Tags */}
      {feature.tags && feature.tags.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Tag className="w-4 h-4" />
            Tags
          </div>
          <div className="flex flex-wrap gap-2">
            {feature.tags.map((tag, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Project Info */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          Project
        </div>
        <div className="text-sm text-gray-600">
          {feature.projectId?.name || 'Unknown Project'}
        </div>
      </div>

      {/* Timestamps */}
      <div className="pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
          <div>
            <span className="block font-medium">Created</span>
            {feature.createdAt 
              ? new Date(feature.createdAt).toLocaleDateString()
              : 'Unknown'
            }
          </div>
          <div>
            <span className="block font-medium">Last Updated</span>
            {feature.updatedAt 
              ? new Date(feature.updatedAt).toLocaleDateString()
              : 'Unknown'
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureDetails;
