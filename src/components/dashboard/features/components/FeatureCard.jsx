import React, { useState } from 'react';
import { MoreHorizontal, Edit, Trash2, Calendar, CheckSquare, MessageSquare, Tag, User } from 'lucide-react';
import { PRIORITY_OPTIONS } from '../utils/constants';

const FeatureCard = ({ feature, onEdit, onDelete, onView, loading }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const priorityInfo = PRIORITY_OPTIONS.find(p => p.value === feature.priority);
  const isOverdue = feature.deadline && new Date(feature.deadline) < new Date() && feature.status !== 'completed';
  
  const completedTasks = feature.questions?.filter(q => q.isCompleted).length || 0;
  const totalTasks = feature.questions?.length || 0;
  const commentCount = feature.comments?.length || 0;
  
  const progressPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const strokeDasharray = 2 * Math.PI * 14; // circumference for r=14
  const strokeDashoffset = strokeDasharray - (progressPercent / 100) * strokeDasharray;

  return (
    <div 
      className="group relative mb-4 cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-cyan-200"
      onClick={() => onView(feature)}
    >
      <div className="absolute left-0 top-0 h-full w-1 bg-cyan-600" />

      {/* Header */}
      <div className="flex items-start justify-between mb-3 relative z-10">
        <div className="flex-1 pr-4">
          <h4 className="line-clamp-2 text-sm font-semibold leading-tight text-gray-800 group-hover:text-cyan-700">
            {feature.title}
          </h4>
        </div>
        
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown(!showDropdown);
            }}
            className="rounded-lg border border-transparent bg-slate-50 p-1.5 text-gray-400 transition-all hover:border-slate-200 hover:bg-white hover:text-gray-600"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 z-30 mt-2 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(feature);
                  setShowDropdown(false);
                }}
                className="flex items-center w-full px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <Edit className="w-3.5 h-3.5 mr-2.5 text-blue-500" />
                Edit Feature
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(feature._id);
                  setShowDropdown(false);
                }}
                className="flex items-center w-full px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                disabled={loading}
              >
                <Trash2 className="w-3.5 h-3.5 mr-2.5 text-red-500" />
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      {feature.tags && feature.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4 relative z-10">
          {feature.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="rounded-full border border-cyan-100 bg-cyan-50 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-cyan-700">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Center Content: Description and Progress Ring */}
      <div className="flex items-center justify-between gap-4 mb-5 relative z-10">
        <p className="flex-1 line-clamp-2 text-[11px] leading-relaxed text-gray-500">
          {feature.description || "Set the vision for this feature..."}
        </p>
        
        {totalTasks > 0 && (
          <div className="relative w-10 h-10 flex-shrink-0 group/ring">
            <svg className="w-10 h-10 transform -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="currentColor"
                strokeWidth="3"
                fill="transparent"
                className="text-gray-100"
              />
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${2 * Math.PI * 16}`}
                strokeDashoffset={`${(1 - progressPercent / 100) * 2 * Math.PI * 16}`}
                strokeLinecap="round"
                fill="transparent"
                className="text-cyan-600 transition-all duration-500 ease-in-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[8px] font-black text-gray-700">
              {Math.round(progressPercent)}%
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2">
           <div className="rounded-lg bg-slate-100 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-700">
            {priorityInfo?.label || "Priority"}
          </div>
          {commentCount > 0 && (
            <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
              <MessageSquare className="w-3 h-3" />
              {commentCount}
            </div>
          )}
        </div>
        
        <div className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-xl shadow-sm border transition-colors ${
          isOverdue 
            ? 'bg-red-50 text-red-600 border-red-100' 
            : 'bg-white text-gray-500 border-gray-100'
        }`}>
          <Calendar className="w-3 h-3 text-blue-400" />
          {feature.deadline ? new Date(feature.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '∞'}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
